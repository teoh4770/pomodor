import {
  ITaskSetting,
  ITimerSetting,
  ITodo,
  ITodoForm,
  ITodoHandlers,
  ITodosHandlers,
  TodosViewTypeEnum
} from "@/types";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useMemo, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase.ts";
import { User } from "firebase/auth";

export interface TodoHook {
  todos: ITodo[];
  visibleTodos: ITodo[];
  selectedTodo: ITodo | null;
  allTodosCompleted: boolean;
  selectedTodoId: string;
  currentViewType: TodosViewTypeEnum;
  totalPomodoroSessions: number;
  completedPomodoroSessions: number;
  totalRemainingTimeInMinutes: number;
  estimatedFinishTime: {
    hours: number;
    minutes: number;
  };
  incrementSession: () => void;
  todoHandlers: ITodoHandlers;
  todosHandlers: ITodosHandlers;
}

const useTodo = (
  user: User | null,
  timerSetting: ITimerSetting,
  taskSetting: ITaskSetting
): TodoHook => {
  // Log-in user state
  const userDocRef = useMemo(() => {
    if (user) {
      return doc(db, "users", user.uid);
    }
    return null;
  }, [user]);
  // Add a state to track if we are done with initial hydration for a logged-in user
  const [isHydrated, setIsHydrated] = useState(false);

  // States with default values for logged-out users
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [selectedTodoId, setSelectedTodoId] = useLocalStorage(
    "selected-todo-id",
    ""
  );
  const [currentViewType, setCurrentViewType] =
    useLocalStorage<TodosViewTypeEnum>(
      "current-view-type",
      TodosViewTypeEnum.ALL
    );

  // Hydrate local todo state from Firestore when the user changes.
  useEffect(() => {
    async function hydrateTodoState() {
      if (!userDocRef) {
        setIsHydrated(false); // Reset when user logs out
        return;
      }

      const user = await getDoc(userDocRef);

      if (user && user.exists()) {
        const data = user.data();
        setTodos(data.todos);
        setSelectedTodoId(data.selectedTodoId);
        setCurrentViewType(data.currentViewType);
      }
      setIsHydrated(true); // Mark hydration as complete
    }

    hydrateTodoState();
  }, [user, userDocRef]);

  // Persistence logic in one place: Watches for changes in the local state (todos, selectedTodoId, currentViewType) and persists those changes to Firestore automatically.
  useEffect(() => {
    function persistUserData(value: Partial<TodoHook>) {
      if (userDocRef) {
        setDoc(userDocRef, value, { merge: true });
      }
    }

    if (!userDocRef || !isHydrated) return;

    const stateToPersist = {
      todos,
      selectedTodoId,
      currentViewType
    };

    persistUserData(stateToPersist);
  }, [currentViewType, selectedTodoId, todos, userDocRef]);

  // Derived variables
  const selectedTodo = useMemo(
    () => todos.find((todo) => todo.id === selectedTodoId) || null,
    [todos, selectedTodoId]
  );

  const visibleTodos = useMemo(() => {
    const todosViews: Record<TodosViewTypeEnum, ITodo[]> = {
      [TodosViewTypeEnum.ALL]: todos,
      [TodosViewTypeEnum.COMPLETED]: todos.filter((todo) => todo.completed),
      [TodosViewTypeEnum.ACTIVE]: todos.filter((todo) => !todo.completed)
    };

    return todosViews[currentViewType];
  }, [currentViewType, todos]);

  const {
    allTodosCompleted,
    totalPomodoroSessions,
    completedPomodoroSessions,
    totalRemainingTimeInMinutes,
    estimatedFinishTime
  } = useMemo(() => {
    const allCompleted =
      todos.length > 0 && todos.every((todo) => todo.completed);

    const totalSessions = todos.reduce(
      (acc, todo) => todo.completed || todo.completedSessions >= todo.targetSessions ? acc : acc + todo.targetSessions,
      0
    );

    const completedSessions = todos.reduce(
      (acc, todo) => todo.completed || todo.completedSessions >= todo.targetSessions ? acc : acc + todo.completedSessions,
      0
    );

    const incompleteSessions = totalSessions - completedSessions;

    const totalRemainingTimeInMinutes =
      incompleteSessions * timerSetting.pomodoroDuration +
      incompleteSessions * timerSetting.breakDuration;

    const date = new Date();
    date.setTime(date.getTime() + totalRemainingTimeInMinutes * 60_000);
    const finishTime = {
      hours: date.getHours(),
      minutes: date.getMinutes()
    };

    return {
      allTodosCompleted: allCompleted,
      totalPomodoroSessions: totalSessions,
      completedPomodoroSessions: completedSessions,
      totalRemainingTimeInMinutes: totalRemainingTimeInMinutes,
      estimatedFinishTime: finishTime
    };
  }, [todos, timerSetting]);

  // Todo handlers

  function selectTodo(todoId: string) {
    setSelectedTodoId(todoId);
  }

  function addTodo(formData: ITodoForm) {
    const newTodos: ITodo[] = [
      ...todos,
      {
        id: self.crypto.randomUUID(),
        title: formData.title.trim(),
        description: formData.description ? formData.description.trim() : "",
        completed: false,
        targetSessions: formData.targetSessions,
        completedSessions: 0
      }
    ];
    const selectedTodo = newTodos.find((todo) => !todo.completed);

    setTodos(newTodos);
    if (selectedTodo) {
      setSelectedTodoId(selectedTodo.id);
    }
  }

  function editTodo(id: string, formData: ITodoForm) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, ...formData };
    });

    updatedTodos = applyAutoCheck(updatedTodos);
    const { todos: finalTodos, newSelectedId } = applyAutoSwitch(updatedTodos);

    setTodos(finalTodos);
    if (newSelectedId) {
      setSelectedTodoId(newSelectedId);
    }
  }

  function removeTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    const { todos: finalTodos, newSelectedId } = applyAutoSwitch(updatedTodos);

    setTodos(finalTodos);
    if (newSelectedId) {
      setSelectedTodoId(newSelectedId);
    }
  }

  function toggleTodoCompletion(id: string) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, completed: !todo.completed };
    });
    const selectedTodo = updatedTodos.find((todo) => !todo.completed);

    const updatesToPersist: Partial<TodoHook> = { todos: updatedTodos };
    if (selectedTodo) {
      updatesToPersist.selectedTodoId = selectedTodo.id;
    }

    setTodos(updatedTodos);
    if (selectedTodo) {
      setSelectedTodoId(selectedTodo.id);
    }
  }

  function changeViewType(viewType: TodosViewTypeEnum) {
    setCurrentViewType(viewType);
  }

  function resetTodos() {
    const resetTodos = todos.map((todo) => {
      todo.completed = false;
      todo.completedSessions = 0;
      return todo;
    });

    const { todos: finalTodos, newSelectedId } = applyAutoSwitch(resetTodos);

    setTodos(finalTodos);
    if (newSelectedId) {
      setSelectedTodoId(newSelectedId);
    }
  }

  function clearAllTodos() {
    setTodos([]);
  }

  function clearCompletedTodos() {
    const incompleteTodos = todos.filter((todo) => !todo.completed);

    const { todos: finalTodos, newSelectedId } =
      applyAutoSwitch(incompleteTodos);

    setTodos(finalTodos);
    if (newSelectedId) {
      setSelectedTodoId(newSelectedId);
    }
  }

  function incrementSession() {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodoId) {
        todo.completedSessions += 1;
      }
      return todo;
    });

    updatedTodos = applyAutoCheck(updatedTodos);
    const { todos: finalTodos, newSelectedId } = applyAutoSwitch(updatedTodos);

    setTodos(finalTodos);
    if (newSelectedId) {
      setSelectedTodoId(newSelectedId);
    }
  }

  function applyAutoCheck(updatedTodos: ITodo[]) {
    if (!taskSetting.autoCheckTasks) return updatedTodos;

    return updatedTodos.map((todo) => {
      const shouldBeCompleted =
        todo.targetSessions > 0 &&
        todo.completedSessions === todo.targetSessions;

      if (shouldBeCompleted && !todo.completed) {
        return { ...todo, completed: true };
      }

      if (!shouldBeCompleted && todo.completed) {
        return { ...todo, completed: false };
      }

      return todo;
    });
  }

  function applyAutoSwitch(updatedTodos: ITodo[]) {
    if (!taskSetting.autoSwitchTasks) return { todos: updatedTodos };

    const isSelectedTodoComplete = updatedTodos.find(
      (todo) => todo.id === selectedTodoId
    )?.completed;
    const incompleteTodo = updatedTodos.find((todo) => !todo.completed);

    if (isSelectedTodoComplete && incompleteTodo) {
      return { todos: updatedTodos, newSelectedId: incompleteTodo.id };
    }

    return { todos: updatedTodos };
  }

  return {
    todos,
    visibleTodos,
    selectedTodoId,
    selectedTodo,
    allTodosCompleted,
    currentViewType,
    totalPomodoroSessions,
    completedPomodoroSessions,
    totalRemainingTimeInMinutes,
    estimatedFinishTime,
    incrementSession,
    todoHandlers: {
      selectTodo,
      addTodo,
      editTodo,
      removeTodo,
      toggleTodoCompletion
    },
    todosHandlers: {
      changeViewType,
      resetTodos,
      clearAllTodos,
      clearCompletedTodos
    }
  };
};

export { useTodo };
