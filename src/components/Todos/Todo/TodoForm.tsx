import { useState } from "react";
import { ITodo } from "../../../types";

interface TodoFormProps {
  todo: ITodo;
  onSubmit: (formData: {
    title: string;
    description: string;
    targetSessions: number;
  }) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const TodoForm = ({ todo, onSubmit, onCancel, onDelete }: TodoFormProps) => {
  const [showNoteComponent, setShowNoteComponent] = useState(
    todo.description.length > 0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todoFormdata = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      targetSessions: parseInt(formData.get("targetSessions") as string, 10),
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
            className="w-full bg-transparent text-xl font-bold placeholder:italic"
            name="title"
            defaultValue={todo.title}
            autoFocus
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
              className="w-full resize-none rounded-lg bg-[#efefef] p-3 text-sm font-light"
              name="description"
              placeholder="Some notes..."
              defaultValue={todo.description}
            />
          </div>
        ) : (
          <a
            href="#"
            className="underline text-sm text-slate-500"
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
