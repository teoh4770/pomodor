import { useState } from "react";
import { useTodoContext } from "../../context";
import { Todo } from "./Todo/Todo";
import { TodoForm } from "./TodoForm";

const Todos = () => {
  const todo = useTodoContext();
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

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

  const todoHeader = <h2 className="text-lg font-bold text-white">Tasks</h2>;

  const todoList = (
    <ol className="grid gap-3">
      {todo.todos.map((item, index) => (
        <Todo
          key={index}
          todo={item}
          isActive={item.id === todo.activeTodoId}
          handlers={todo.handlers}
        />
      ))}
    </ol>
  );

  const addTodoFormButton = (
    <button
      type="button"
      className="button w-full border-2 border-dashed !bg-black/10 !py-4 font-bold !text-white/80 hover:!text-white"
      data-type="secondary"
      data-size="md"
      title="Click to add a new todo"
      aria-label="Show todo form button"
      onClick={() => setShowAddTodoForm(true)}
    >
      Add Todo
    </button>
  );

  return (
    <section className="mx-auto max-w-[30rem]" aria-label="Todos section">
      {/* ActiveTodoMessage */}
      <div className="mt-4 py-4 text-center">{activeTodoMessage}</div>

      {/* Header */}
      <header className="mb-4 flex justify-between border-b-2 py-4">
        {todoHeader}
      </header>

      {/* Action Buttons for todos */}

      {/* List */}
      {todoList}

      {/* Show todo form button */}
      <div className="mt-5">
        {!showAddTodoForm ? (
          addTodoFormButton
        ) : (
          <TodoForm
            onSubmit={(addTodoFormData) => {
              todo.handlers.handleAdd(addTodoFormData);
              setShowAddTodoForm(false);
            }}
            onCancel={() => setShowAddTodoForm(false)}
          />
        )}
      </div>
    </section>
  );
};

export { Todos };
