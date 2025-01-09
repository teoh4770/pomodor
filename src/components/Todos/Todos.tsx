import { useState } from "react";
import { useTodoContext } from "../../context";
import { Todo } from "./Todo/Todo";
import { TodoForm } from "./TodoForm";
import { ActiveTodoMessage } from "./ActiveTodoMessage";
import { TodoList } from "./TodoList";
import { AddTodoButton } from "./AddTodoButton";

const Todos = () => {
  const todoContext = useTodoContext();
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  return (
    <section className="mx-auto max-w-[30rem]" aria-label="Todos section">
      {/* ActiveTodoMessage */}
      <ActiveTodoMessage
        activeTodo={todoContext.activeTodo}
        todos={todoContext.todos}
      />

      {/* Header */}
      <header className="mb-4 flex justify-between border-b-2 py-4">
        <h2 className="text-lg font-bold text-white">Tasks</h2>;
      </header>

      {/* Action Buttons for todos */}

      {/* Todo List */}
      <TodoList
        todos={todoContext.todos}
        activeTodoId={todoContext.activeTodoId}
        todoHandlers={todoContext.handlers}
      />

      {/* Add Todo Section*/}
      <div className="mt-5">
        {!showAddTodoForm ? (
          <AddTodoButton onClick={() => setShowAddTodoForm(true)} />
        ) : (
          <TodoForm
            onSubmit={(addTodoFormData) => {
              todoContext.handlers.handleAdd(addTodoFormData);
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
