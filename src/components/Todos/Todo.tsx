import clsx from "clsx";

import { ITodo, ITodoHandlers } from "../../types";

interface TodoProp {
  todo: ITodo;
  isActive: boolean;
  handlers: ITodoHandlers;
}

const Todo = ({ todo, isActive, handlers }: TodoProp) => {
  const Checkbox = (
    <>
      <input
        type="checkbox"
        id={"todo-" + todo.id}
        className="checkbox peer"
        checked={todo.completed}
        onChange={() => handlers.handleToggle(todo.id)}
      />
      <label htmlFor={"todo-" + todo.id} className="peer-checked:line-through">
        {todo.title}
      </label>
    </>
  );

  const Session = (
    <div className="text-right text-sm">
      <p>
        <b className="text-lg font-bold">{todo.completedSessions}</b>/
        {todo.targetSessions}
      </p>
      <p>round{todo.targetSessions > 1 && "s"}</p>
    </div>
  );

  const EditButton = (
    <button
      type="button"
      className="button border !text-black/60 hover:bg-black/10"
      data-type="secondary"
      data-size="sm"
      title="Click to edit this task"
      aria-label="Edit todo button"
      onClick={() => console.log("open edit menu")}
    >
      Edit
    </button>
  );

  const Description = todo.description && (
    <div aria-label="Todo description">
      <label className="hidden" htmlFor={"description-" + todo.id}>
        description
      </label>
      <textarea
        id={"description-" + todo.id}
        name="description"
        value={todo.description}
        onChange={() => console.log("update description")}
        className="pointer-events-none w-full cursor-none resize-none rounded-lg bg-[#feff9c]/80 p-3 text-sm shadow-md"
      ></textarea>
    </div>
  );

  // Todo: making it a non-controlled form
  const TodoForm = (
    <form
      className="grid gap-4 rounded-lg border bg-white text-slate-700"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const todoFormdata = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          targetSessions: parseInt(
            formData.get("targetSessions") as string,
          ) as number,
        };
        handlers.handleEdit(todo.id, todoFormdata);
      }}
    >
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

      <div>
        <button
          type="button"
          className="button font-bold !uppercase tracking-wide active:translate-y-[0.125rem] active:!bg-transparent"
          data-type="naked"
          data-size="sm"
          aria-label="Delete button"
          onClick={() => handlers.handleRemove(todo.id)}
        >
          Delete
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
      </div>
    </form>
  );

  const todoStyle = clsx(
    "cursor-pointer space-y-2 rounded-lg bg-white px-5 py-3 -outline-offset-4 hover:outline hover:outline-4",
    {
      "outline outline-4 outline-black hover:outline-black": isActive,
      "hover:outline-slate-300": !isActive,
    },
  );

  return (
    <li
      className={todoStyle}
      role="button"
      tabIndex={0}
      data-active={isActive}
      onClick={() => handlers.handleActive(todo.id)}
    >
      {/* contains checkbox, session and edit button */}
      <div className="flex items-center justify-between">
        <div className="form-control">{Checkbox}</div>
        <div className="flex items-center gap-4">
          {Session}
          {EditButton}
        </div>
      </div>

      {/* contain description */}
      {Description}

      {/* todo: temporarily, will be removed */}
      <div className="p-1"></div>

      {TodoForm}
    </li>
  );
};

export { Todo };
