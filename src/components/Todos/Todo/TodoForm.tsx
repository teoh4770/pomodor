import { useState } from "react";
import { ITodo } from "../../../types";
import { toast } from "react-toastify";
import { validateTitle } from "../../../utils/validations/CompletedSessionsValidation";
import { validateTargetSessions } from "../../../utils/validations/TargetSessionsValidation";
import { validateCompletedSessions } from "../../../utils/validations/TitleValidation";

// Type definitions
type TodoFormData = {
  title: string;
  description: string;
  targetSessions: number;
  completedSessions: number;
}

interface TodoFormProps {
  todo: ITodo;
  onSubmit: (formData: TodoFormData) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type ValidationErrors = Record<string, string[]>;

const validateForm = (data: TodoFormData): ValidationErrors => {
  return {
    title: validateTitle(data.title),
    targetSessions: validateTargetSessions(data.targetSessions),
    completedSessions: validateCompletedSessions(data.completedSessions, data.targetSessions)
  }
}

const TodoForm = ({ todo, onSubmit, onCancel, onDelete }: TodoFormProps) => {
  // States
  const [showNoteComponent, setShowNoteComponent] = useState(
    todo.description.length > 0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todoFormData: TodoFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      targetSessions: parseInt(formData.get("targetSessions") as string),
      completedSessions: parseInt(formData.get("completedSessions") as string),
    };

    const validationErrors = validateForm(todoFormData);
    
    const hasErrors = Object.values(validationErrors).some(
      (error) => error.length > 0,
    );

    if (hasErrors) {
      toast.error("You have invalid entry, try again!");
      console.error(validationErrors);
      return;
    }

    onSubmit(todoFormData);
  };

  return (
    <form
      className="overflow-hidden rounded-lg bg-white text-slate-700"
      onSubmit={handleSubmit}
    >
      {/* form inputs container */}
      <div className="grid gap-4 px-5 py-7" aria-label="Form inputs">
        <div>
          <label className="sr-only" htmlFor={"title-" + todo.id}>
            Title
          </label>
          <input
            type="text"
            id={"title-" + todo.id}
            className="offset-1 w-full -translate-x-0.5 rounded-lg border-2 border-transparent bg-transparent p-0.5 text-xl font-bold placeholder:italic hover:border-slate-300 focus:border-transparent focus:outline-slate-400"
            name="title"
            defaultValue={todo.title}
            placeholder="What are you working on?"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor={"completedSessions-" + todo.id}>
            Completed Sessions
          </label>
          <input
            type="number"
            id={"completedSessions-" + todo.id}
            className="block border border-black"
            name="completedSessions"
            defaultValue={todo.completedSessions}
          />
        </div>

        <div>
          <label htmlFor={"targetSessions-" + todo.id}>Target Sessions</label>
          <input
            type="number"
            id={"targetSessions-" + todo.id}
            className="block border border-black"
            name="targetSessions"
            defaultValue={todo.targetSessions}
          />
        </div>

        {showNoteComponent ? (
          <div>
            <label className="sr-only" htmlFor={"description-" + todo.id}>
              Description
            </label>
            <textarea
              id={"description-" + todo.id}
              className="w-full resize-none rounded-lg bg-[#efefef] p-3 text-sm placeholder:text-gray-300"
              name="description"
              placeholder="Some notes..."
              defaultValue={todo.description}
            />
          </div>
        ) : (
          <a
            href="#"
            className="text-sm text-slate-500 underline"
            onClick={(e) => {
              e.preventDefault();
              setShowNoteComponent(true);
            }}
          >
            + Add Note
          </a>
        )}
      </div>

      {/* footer buttons container */}
      <footer className="flex bg-slate-200 px-5 py-3" aria-label="Form buttons">
        <button
          type="button"
          className="button mr-auto font-bold !uppercase tracking-wide active:translate-y-[0.125rem] active:!bg-transparent"
          data-type="naked"
          data-size="sm"
          aria-label="Delete button"
          onClick={onDelete}
        >
          Delete
        </button>

        <button
          type="button"
          className="button font-bold !uppercase tracking-wide active:translate-y-[0.125rem] active:!bg-transparent"
          data-type="naked"
          data-size="sm"
          aria-label="Cancel button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="button font-bold !uppercase tracking-wide"
          data-type="confirm"
          data-size="sm"
          aria-label="Save button"
        >
          Save
        </button>
      </footer>
    </form>
  );
};

export { TodoForm };
