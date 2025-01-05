import { useTodoContext } from "../../context";
import { Todo } from "./Todo/Todo";

const Todos = () => {
  const todo = useTodoContext();

  const activeTodoMessage = todo.activeTodo ? (
    <p className="text-slate-300">
      Currently focusing on:
      <br />
      <b className="text-lg text-white">{todo.activeTodo.title}</b>
    </p>
  ) : (
    <p className="text-lg text-slate-300">
      {todo.todos.length > 0
        ? "You didn't select any tasks 🥱"
        : "You don't have any tasks 😭"}
    </p>
  );

  const TodoList = todo.todos.map((item, index) => (
    <Todo
      key={index}
      todo={item}
      isActive={item.id === todo.activeTodoId}
      handlers={todo.handlers}
    />
  ));

  return (
    <section className="mx-auto max-w-[30rem]" aria-label="Todos section">
      {/* ActiveTodoMessage */}
      <div className="mt-4 py-4 text-center">{activeTodoMessage}</div>

      {/* Header */}
      <header className="mb-4 flex justify-between border-b-2 py-4">
        <h2 className="text-lg font-bold text-white">Tasks</h2>
      </header>

      {/* Action Buttons for todos */}

      {/* List */}
      <ol className="grid gap-3">{TodoList}</ol>

      {/* Form */}

      {/* Button */}
    </section>
  );
};

export { Todos };
