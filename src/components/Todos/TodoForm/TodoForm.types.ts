import { ITodo } from "@/types";

export type TodoFormData = {
  title: string;
  description: string;
  targetSessions: number;
  completedSessions?: number; // For EditTodoForm
};

export interface AddTodoFormProps {
  todo?: ITodo;
  onSubmit: (formData: TodoFormData) => void;
  onCancel: () => void;
  onDelete?: () => void; // Only needed for EditTodoForm
}

export type ValidationErrors = Record<string, string[]>;
