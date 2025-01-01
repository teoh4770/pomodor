import { useEffect, useState } from "react";
import { ITodo, ITodoForm, ITodoHandlers } from "../types/types";

interface IUseTodo {
  todos: ITodo[];
  activeTodo: ITodo | null;
  activeTodoId: string;
  handlers: ITodoHandlers;
}

const useTodo = (): IUseTodo => {
  // Constants

  // States
  // todo: remove the temporary todo list
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
    {
      id: "4",
      title: "Learn TypeScript",
      description:
        "Follow the TypeScript tutorial and practice by converting JavaScript code.",
      completed: false,
      targetSessions: 8,
      completedSessions: 4,
    },
    {
      id: "5",
      title: "Read 'Clean Code'",
      description: "Read 3 chapters of 'Clean Code' by Robert C. Martin.",
      completed: false,
      targetSessions: 6,
      completedSessions: 2,
    },
  ]);

  const [activeTodoId, setActiveTodoId] = useState("");

  // Derived variables
  const activeTodo =
    todos.find((todo) => todo.id === activeTodoId) || todos[0] || null;

  /******************/
  /* Todos Handlers */
  /******************/
  function handleActive(todoId: string) {
    setActiveTodoId(todoId);
  }

  function handleAdd(formData: ITodoForm) {
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
    setActiveTodoId(newTodoId);
  }

  function handleEdit(id: string, formData: ITodoForm) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        ...formData,
      };
    });

    setTodos(updatedTodos);
  }

  function handleRemove(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function handleToggle(id: string) {
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

  /******************/
  /* Todos Effects  */
  /******************/
  // Update todos in localstorage
  useEffect(() => {
    console.dir(todos);
  }, [todos]);

  // Update activeTodoId in localstorage
  useEffect(() => {
    console.dir(activeTodoId);
  }, [activeTodoId]);

  return {
    todos,
    activeTodoId,
    activeTodo,
    handlers: {
      handleActive,
      handleAdd,
      handleEdit,
      handleRemove,
      handleToggle,
    },
  };
};

export { useTodo };
