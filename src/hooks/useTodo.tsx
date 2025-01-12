import { useEffect, useState } from "react";
import {
  ITodo,
  ITodoForm,
  ITodoHandlers,
  ITodosHandlers,
  TodosViewTypeEnum,
} from "@/types";

export interface TodoHook {
  todos: ITodo[];
  visibleTodos: ITodo[];
  selectedTodo: ITodo | null;
  allTodosCompleted: boolean;
  selectedTodoId: string;
  incrementSession: () => void;
  currentViewType: TodosViewTypeEnum;
  todoHandlers: ITodoHandlers;
  todosHandlers: ITodosHandlers;
}

const useTodo = (): TodoHook => {
  // States
  const [todos, setTodos] = useState<ITodo[]>([
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

  const [selectedTodoId, setSelectedTodoId] = useState("");

  const [currentViewType, setCurrentViewType] = useState<TodosViewTypeEnum>(
    TodosViewTypeEnum.all,
  );

  // Derived variables
  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId) || null;
  const todosViews: Record<TodosViewTypeEnum, ITodo[]> = {
    [TodosViewTypeEnum.all]: todos,
    [TodosViewTypeEnum.completed]: todos.filter((todo) => todo.completed),
    [TodosViewTypeEnum.active]: todos.filter((todo) => !todo.completed),
  };
  const visibleTodos = todosViews[currentViewType];
  const allTodosCompleted = todos.every((todo) => todo.completed);

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
        title: formData.title,
        description: formData.description,
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

    setTodos(updatedTodos);
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
    // todo: select next incomplete todo
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

    setTodos(updatedTodos);
  }

  /******************/
  /* Todos Effects  */
  /******************/
  // Update todos in localstorage
  useEffect(() => {
    console.log("Update todos in localstorage.");
    console.dir(todos);
  }, [todos]);

  // Update selectedTodoId in localstorage
  useEffect(() => {
    console.log("Update selectedTodoId.");
    console.dir(selectedTodoId);
  }, [selectedTodoId]);

  return {
    todos,
    visibleTodos,
    selectedTodoId,
    selectedTodo,
    allTodosCompleted,
    incrementSession,
    currentViewType,
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
