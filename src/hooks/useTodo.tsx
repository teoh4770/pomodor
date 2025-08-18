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
import { useEffect, useMemo } from "react";

import { setDoc, doc, getDoc } from "firebase/firestore";
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
  getFinishedTime: () => {
    hours: number,
    minutes: number
  }
  incrementSession: () => void;
  todoHandlers: ITodoHandlers;
  todosHandlers: ITodosHandlers;
}

const useTodo = (user: User | null, timerSetting: ITimerSetting, taskSetting: ITaskSetting): TodoHook => {
  const userDocRef = useMemo(() => {
    if (user) {
      return doc(db, "users", user.uid);
    }
    return null;
  }, [user]);


  // States with default values for logged-out users
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [selectedTodoId, setSelectedTodoId] = useLocalStorage('selected-todo-id', '');
  const [currentViewType, setCurrentViewType] = useLocalStorage<TodosViewTypeEnum>(
    'current-view-type',
    TodosViewTypeEnum.ALL,
  );

  const getTodos = async () => {
    if (!userDocRef) return;

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setTodos(docSnap.data().todos);
    } else {
      console.log("No such document!");
    }
  };

  const getSelectedTodoId = async () => {
    if (!userDocRef) return;

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setSelectedTodoId(docSnap.data().selectedTodoId);
    } else {
      console.log("No such document!");
    }
  };

  const getCurrentViewType = async () => {
    if (!userDocRef) return;

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setCurrentViewType(docSnap.data().currentViewType);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getTodos();
    getSelectedTodoId();
    getCurrentViewType();
  }, []);

  // Derived variables
  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId) || null;

  // Categorize todos based on view type
  const todosViews: Record<TodosViewTypeEnum, ITodo[]> = {
    [TodosViewTypeEnum.ALL]: todos,
    [TodosViewTypeEnum.COMPLETED]: todos.filter((todo) => todo.completed),
    [TodosViewTypeEnum.ACTIVE]: todos.filter((todo) => !todo.completed),
  };
  const visibleTodos = todosViews[currentViewType];

  // Check if all todos are completed
  const allTodosCompleted =
    todos.length > 0 && todos.every((todo) => todo.completed);

  // Calculate sessions
  const totalPomodoroSessions = todos.reduce(
    (acc, todo) => acc + todo.targetSessions,
    0,
  );
  const completedPomodoroSessions = todos.reduce(
    (acc, todo) => todo.completed ? acc : acc + todo.completedSessions,
    0,
  )
  const incompletePomodoroSessions = totalPomodoroSessions - completedPomodoroSessions;

  // Calculate the total remaining time (in minutes) needed to complete all remaining pomodoro sessions
  // Formula: (remainingPomodoroCount * pomodoroDuration) + (breakCount * breakDuration)
  const totalRemainingTimeInMinutes = incompletePomodoroSessions * timerSetting.pomodoroDuration + incompletePomodoroSessions * timerSetting.breakDuration;

  // Calculates the estimated finishing time based on the total remaining time
  const getFinishedTime = () => {
    const date = new Date();
    date.setTime(date.getTime() + totalRemainingTimeInMinutes * 60_000);

    return {
      hours: date.getHours(),
      minutes: date.getMinutes()
    }
  }

  /******************/
  /* Todos Handlers */
  /******************/
  function selectTodo(todoId: string) {
    setSelectedTodoId(todoId);

    if (userDocRef) {
      setDoc(userDocRef, { selectedTodoId: todoId }, { merge: true });
    }
  }

  function addTodo(formData: ITodoForm) {
    const newTodoId = self.crypto.randomUUID();
    const newTodos: ITodo[] = [
      ...todos,
      {
        id: newTodoId,
        title: formData.title.trim(),
        description: formData.description ? formData.description.trim() : "",
        completed: false,
        targetSessions: formData.targetSessions,
        completedSessions: 0
      }
    ];
    const selectedTodo = newTodos.find(todo => !todo.completed);

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: newTodos }, { merge: true });

      if (selectedTodo) {
        setDoc(userDocRef, { selectedTodoId: selectedTodo.id }, { merge: true });
      }
    }

    // localstorage
    setTodos(newTodos);
    if (selectedTodo) {
      setSelectedTodoId(selectedTodo.id);
    }
  }

  function editTodo(id: string, formData: ITodoForm) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, ...formData };
    });

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: updatedTodos }, { merge: true });
    }

    // localstorage
    setTodos(applyAutoSwitch(applyAutoCheck(updatedTodos)));
  }

  function removeTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: updatedTodos }, { merge: true });
    }

    // localstorage
    setTodos(applyAutoSwitch(updatedTodos));
  }

  function toggleTodoCompletion(id: string) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, completed: !todo.completed };
    });
    const selectedTodo = updatedTodos.find(todo => !todo.completed);

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: updatedTodos }, { merge: true });

      if (selectedTodo) {
        setDoc(userDocRef, { selectedTodoId: selectedTodo.id }, { merge: true });
      }
    }

    // localstorage
    setTodos(updatedTodos);

    if (selectedTodo) {
      setSelectedTodoId(selectedTodo.id);
    }
  }

  function changeViewType(viewType: TodosViewTypeEnum) {
    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { currentViewType: viewType }, { merge: true });
    }

    // localstorage
    setCurrentViewType(viewType);
  }

  function resetTodos() {
    const resetTodos = todos.map((todo) => {
      todo.completed = false;
      todo.completedSessions = 0;
      return todo;
    });

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: resetTodos }, { merge: true });
    }

    // localstorage
    setTodos(applyAutoSwitch(resetTodos));
  }

  function clearAllTodos() {
    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: [] }, { merge: true });
    }

    // localstorage
    setTodos([]);
  }

  function clearCompletedTodos() {
    const incompleteTodos = todos.filter((todo) => !todo.completed);

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: incompleteTodos }, { merge: true });
    }

    // localstorage
    setTodos(applyAutoSwitch(incompleteTodos));
  }

  function incrementSession() {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodoId) {
        todo.completedSessions += 1;
      }
      return todo;
    });

    // firestore
    if (userDocRef) {
      setDoc(userDocRef, { todos: updatedTodos }, { merge: true });
    }

    // localstorage
    setTodos(applyAutoSwitch(applyAutoCheck(updatedTodos)));
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
    if (!taskSetting.autoSwitchTasks) return updatedTodos;

    const isSelectedTodoCompleted = updatedTodos.find((todo) => todo.id === selectedTodoId)?.completed;
    if (isSelectedTodoCompleted) {
      const firstIncompleteTodo = updatedTodos.find(todo => !todo.completed);
      if (firstIncompleteTodo) {
        // firestore
        if (userDocRef) {
          setDoc(userDocRef, { selectedTodoId: firstIncompleteTodo.id }, { merge: true });
        }
        // localstorage
        setSelectedTodoId(firstIncompleteTodo.id);
      }
    }

    return updatedTodos;
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
    getFinishedTime,
    incrementSession,
    todoHandlers: {
      selectTodo,
      addTodo,
      editTodo,
      removeTodo,
      toggleTodoCompletion,
    },
    todosHandlers: {
      changeViewType,
      resetTodos,
      clearAllTodos,
      clearCompletedTodos,
    },
  };
};

export { useTodo };
