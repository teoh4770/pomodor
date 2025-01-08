import { useState } from "react";
import { ITodo } from "../../../types";
import { toast } from "react-toastify";

interface TodoFormProps {
  todo: ITodo;
  onSubmit: (formData: {
    title: string;
    description: string;
    targetSessions: number;
    completedSessions: number;
  }) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type TodoFormLabel =
  | "title"
  | "description"
  | "targetSessions"
  | "completedSessions";

const TodoForm = ({ todo, onSubmit, onCancel, onDelete }: TodoFormProps) => {
  // Constant
  const defaultErrors = {
    title: [],
    description: [],
    targetSessions: [],
    completedSessions: [],
  };

  // States
  const [showNoteComponent, setShowNoteComponent] = useState(
    todo.description.length > 0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const targetSessions = parseInt(formData.get("targetSessions") as string);
    const completedSessions = parseInt(
      formData.get("completedSessions") as string,
    );

    let formErrors: Record<TodoFormLabel, string[]> = defaultErrors;

    // validate title
    if (title.length === 0) {
      formErrors = {
        ...formErrors,
        title: [...formErrors.title, "Cannot be empty"],
      };
    }

    // validate target sessions property
    if (targetSessions <= 0) {
      formErrors = {
        ...formErrors,
        targetSessions: [
          ...formErrors.targetSessions,
          "Cannot accept negative value",
        ],
      };
    }

    // validate complete sessions property
    if (completedSessions <= 0) {
      formErrors = {
        ...formErrors,
        completedSessions: [
          ...formErrors.completedSessions,
          "Cannot accept negative value",
        ],
      };
    }

    if (completedSessions >= targetSessions) {
      formErrors = {
        ...formErrors,
        completedSessions: [
          ...formErrors.completedSessions,
          "Cannot larger than or equal to target sessions",
        ],
      };
    }

    const hasErrors = Object.values(formErrors).some(
      (error) => error.length > 0,
    );

    if (hasErrors) {
      // handle errors here
      toast.error("You have invalid entry, try again!");
      console.error(formErrors);
      return;
    }

    // If no error, then pass the correct todo form data to the submit listener
    const todoFormdata = {
      title,
      description,
      targetSessions,
      completedSessions,
    };
    onSubmit(todoFormdata);
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
        {/* write here */}
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
