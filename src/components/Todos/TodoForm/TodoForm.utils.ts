import { TodoFormData } from "./TodoForm.types";

const extractFormData = (form: HTMLFormElement): TodoFormData => {
  const formData = new FormData(form);

  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    targetSessions: parseInt(formData.get("targetSessions") as string, 10),
    completedSessions: parseInt(formData.get("completedSessions") as string, 10),
  };
};

export { extractFormData };
