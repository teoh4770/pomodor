import { useTodo } from "../../hooks";
import { Todo } from "./Todo";

/* Should contain message, label, action buttons, list, form, form toggle button */
const Todos = () => {
  const { todos, activeTodo, activeTodoId, handlers } = useTodo();

  const activeTodoMessage = activeTodo ? (
    <p className="text-slate-300">
      Currently focusing on:
      <br />
      <b className="text-lg text-white">{activeTodo.title}</b>
    </p>
  ) : (
    <p className="text-lg text-slate-300">
      {todos.length > 0
        ? "You didn't select any tasks 🥱"
        : "You don't have any tasks 😭"}
    </p>
  );

  const TodoList = todos.map((todo, index) => (
    <Todo
      key={index}
      todo={todo}
      isActive={todo.id === activeTodoId}
      handlers={handlers}
    />
  ));

  return (
    <section className="mx-auto max-w-[30rem]" aria-label="Todos section">
      <div className="mt-4 py-4 text-center">{activeTodoMessage}</div>
      {/* header */}
      {/* list */}
      <ol className="grid gap-3">{TodoList}</ol>
      {/* form */}
      {/* button */}
    </section>
  );
};

export { Todos };
