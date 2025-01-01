import { useTodo } from "../../hooks";
import { Todo } from "./Todo";

/* Should contain message, label, action buttons, list, form, form toggle button */
const Todos = () => {
  const { todos, activeTodoId, handlers } = useTodo();

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
      <div className="mt-4 py-4 text-center">{/* activeTodoMsg */}</div>
      {/* header */}
      {/* list */}
      <ol className="grid gap-3">{TodoList}</ol>
      {/* form */}
      {/* button */}
    </section>
  );
};

export { Todos };
