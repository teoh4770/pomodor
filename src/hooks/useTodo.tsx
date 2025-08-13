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

const useTodo = (timerSetting: ITimerSetting, taskSetting: ITaskSetting): TodoHook => {
  // States
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', [
    {
      id: "1",
      title: "Study React.js",
      description: "Go through React documentation and build a small project.",
      completed: false,
      targetSessions: 10,
      completedSessions: 2,
    },
    {
      id: "2",
      title: "Write Blog Post",
      description:
        "Write and publish a technical blog post about JavaScript closures.",
      completed: false,
      targetSessions: 5,
      completedSessions: 3,
    },
    {
      id: "3",
      title: "Exercise",
      description:
        "Complete a 30-minute workout focusing on strength training.",
      completed: false,
      targetSessions: 3,
      completedSessions: 1,
    },
  ]);

  const [selectedTodoId, setSelectedTodoId] = useLocalStorage('selected-todo-id', '');

  const [currentViewType, setCurrentViewType] = useLocalStorage<TodosViewTypeEnum>(
    'current-view-type',
    TodosViewTypeEnum.ALL,
  );

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
        completedSessions: 0,
      },
    ];

    setTodos(newTodos);
    setSelectedTodoId(newTodoId);
  }

  function editTodo(id: string, formData: ITodoForm) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        ...formData,
      };
    });

    setTodos(applyAutoCheck(updatedTodos));
  }

  function removeTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  function toggleTodoCompletion(id: string) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(updatedTodos);
  }

  function setTodoCompletion(id: string, completed: boolean) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        completed: completed
      };
    });

    setTodos(updatedTodos);
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

    setTodos(resetTodos);
  }

  function clearAllTodos() {
    setTodos([]);
  }

  function clearCompletedTodos() {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    setTodos(incompleteTodos);
  }

  function incrementSession() {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodoId) {
        todo.completedSessions += 1;
      }
      return todo;
    });

    setTodos(applyAutoCheck(updatedTodos));
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
      setTodoCompletion
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
