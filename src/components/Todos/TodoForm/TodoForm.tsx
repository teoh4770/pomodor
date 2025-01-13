import { useState } from "react";
import { AddTodoFormProps } from "@/components/Todos/TodoForm/TodoForm.types";
import { extractFormData } from "@/components/Todos/TodoForm/TodoForm.utils";
import {
  handleValidationErrors,
  hasValidationErrors,
  validateForm,
} from "@/components/Todos/TodoForm/TodoFormValidation";

const TodoForm = ({ todo, onSubmit, onCancel, onDelete }: AddTodoFormProps) => {
  const [showNoteComponent, setShowNoteComponent] = useState(
    todo ? todo.description?.length > 0 : false,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = extractFormData(form);
    const validationErrors = validateForm(formData);

    if (hasValidationErrors(validationErrors)) {
      handleValidationErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    form.reset();
  };

  return (
    <form
      className="overflow-hidden rounded-lg bg-white text-slate-700"
      onSubmit={handleSubmit}
    >
      {/* form inputs container */}
      <div className="grid gap-4 px-5 py-7" aria-label="Form inputs">
        <div>
          <label className="sr-only" htmlFor={"title-" + todo?.id}>
            Title
          </label>
          <input
            type="text"
            id={"title-" + todo?.id}
            className="offset-1 w-full -translate-x-0.5 rounded-lg border-2 border-transparent bg-transparent p-0.5 text-xl font-bold placeholder:italic hover:border-slate-300 focus:border-transparent focus:outline-slate-400"
            name="title"
            defaultValue={todo ? todo.title : ""}
            placeholder="What are you working on?"
            autoFocus
          />
        </div>

        {todo && onDelete && (
          <div>
            <label htmlFor={"completedSessions-" + todo?.id}>
              Completed Sessions
            </label>
            <input
              type="number"
              id={"completedSessions-" + todo?.id}
              className="block border border-black"
              name="completedSessions"
              defaultValue={todo ? todo.completedSessions : 0}
            />
          </div>
        )}

        <div>
          <label htmlFor={"targetSessions-" + todo?.id}>Target Sessions</label>
          <input
            type="number"
            id={"targetSessions-" + todo?.id}
            className="block border border-black"
            name="targetSessions"
            defaultValue={todo ? todo.targetSessions : 1}
          />
        </div>

        {showNoteComponent ? (
          <div>
            <label className="sr-only" htmlFor={"description-" + todo?.id}>
              Description
            </label>
            <textarea
              id={"description-" + todo?.id}
              className="w-full resize-none rounded-lg bg-[#efefef] p-3 text-sm placeholder:text-gray-300"
              name="description"
              defaultValue={todo ? todo.description : ""}
              placeholder="Some notes..."
              onFocus={(e) => {
                const textLength = e.currentTarget.value.length;
                e.currentTarget.setSelectionRange(textLength, textLength);
              }}
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
        <div className="mr-auto">
          {todo && onDelete && (
            <button
              type="button"
              className="button font-bold !uppercase tracking-wide active:translate-y-[0.125rem] active:!bg-transparent"
              data-type="naked"
              data-size="sm"
              aria-label="Delete button"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>

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
