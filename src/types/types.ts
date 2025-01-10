// ? maybe i need to move the type to the Todos folder?

import { TodosViewTypeEnum } from "@/types";

interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  targetSessions: number;
  completedSessions: number;
}

interface ITodoForm {
  title: string;
  description: string;
  targetSessions: number;
}

interface ITodoHandlers {
  selectTodo: (id: string) => void;
  addTodo: (formData: ITodoForm) => void;
  editTodo: (id: string, formData: ITodoForm) => void;
  removeTodo: (id: string) => void;
  toggleTodoCompletion: (id: string) => void;
}

interface ITodosHandlers {
  changeViewType: (viewType: TodosViewTypeEnum) => void;
  resetTodos: () => void;
  clearAllTodos: () => void;
  clearCompletedTodos: () => void;
}

export type { ITodo, ITodoForm, ITodoHandlers, ITodosHandlers };
