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
    </li>
  );
};

export { Todo };
