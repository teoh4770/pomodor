import { useTodo } from "../../hooks";
import { ITodo, ITodoHandlers } from "../../types";

interface TodoItemProp {
  todo: ITodo;
  handlers: ITodoHandlers;
}

const TodoItem = ({ todo, handlers }: TodoItemProp) => {
  const Checkbox = (
    <>
      <input
        type="checkbox"
        id={"todo-" + todo.id}
        className="checkbox peer"
        checked={todo.completed}
        onClick={() => handlers.handleToggle(todo.id)}
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
        className="pointer-events-none w-full cursor-none resize-none rounded-lg bg-[#feff9c]/80 p-3 text-sm shadow-md"
      ></textarea>
    </div>
  );

  return (
    <li>
      <div
        className="cursor-pointer space-y-2 rounded-lg bg-white px-5 py-3"
        role="button"
        tabIndex={0}
        data-active={false}
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
      </div>
    </li>
  );
};

/* Should contain message, label, action buttons, list, form, form toggle button */
const Todos = () => {
  const { todos, handlers } = useTodo();

  const TodoList = todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} handlers={handlers} />
  ));

  return (
    <section className="mx-auto max-w-[30rem]" aria-label="Todos section">
      <div className="mt-4 py-4 text-center">{/* activeTodoMsg */}</div>
      {/* header */}
      {/* list */}
      <ol className="grid gap-2">{TodoList}</ol>
      {/* form */}
      {/* button */}
    </section>
  );
};

export { Todos };
