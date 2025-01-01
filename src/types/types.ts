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
  handleActive: (id: string) => void;
  handleAdd: (formData: ITodoForm) => void;
  handleEdit: (id: string, formData: ITodoForm) => void;
  handleRemove: (id: string) => void;
  handleToggle: (id: string) => void;
}

export type { ITodo, ITodoForm, ITodoHandlers };
