import { useEffect, useState } from "react";
import { useTodoContext } from "@/context";
import { TodoForm } from "@/components/Todos/TodoForm";
import {
  ActiveTodoMessage,
  TodoList,
  AddTodoButton,
  TodosViews,
  TodosActions,
} from "@/components/Todos";
import { Confetti } from "@/common/components/Confetti";
import { showToast } from "@/common/components/Toast";

const Celebrate = () => {
  const { allTodosCompleted } = useTodoContext();

  useEffect(() => {
    if (allTodosCompleted) {
      showToast("Congrats", "success");
    }
  }, [allTodosCompleted]);

  if (!allTodosCompleted) return null;

  return <Confetti />;
};

const Todos = () => {
  const todoContext = useTodoContext();
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  return (
    <section
      className="mx-auto max-w-[var(--max-w-container)]"
      aria-label="Todos section"
    >
      {/* Celebrate component */}
      <Celebrate />

      {/* ActiveTodoMessage */}
      <ActiveTodoMessage
        activeTodo={todoContext.selectedTodo}
        todos={todoContext.todos}
      />

      {/* Header */}
      <header className="flex justify-between border-b-2 py-4">
        <h2 className="text-lg font-bold text-white">Tasks</h2>
      </header>

      {/* Action Buttons for todos */}
      {/* !going to work on this one */}
      <div className="grid gap-2 pb-6 pt-4">
        {/* See different todo views with filters */}
        <TodosViews todosHandlers={todoContext.todosHandlers} />
        {/* Advanced actions for entire todo list */}
        <TodosActions todosHandlers={todoContext.todosHandlers} />
      </div>

      {/* Todo List */}
      <TodoList
        todos={todoContext.visibleTodos}
        activeTodoId={todoContext.selectedTodoId}
        todoHandlers={todoContext.todoHandlers}
      />

      {/* Add Todo Section*/}
      <div className="mt-5">
        {!showAddTodoForm ? (
          <AddTodoButton onClick={() => setShowAddTodoForm(true)} />
        ) : (
          <TodoForm
            onSubmit={(addTodoFormData) => {
              todoContext.todoHandlers.addTodo(addTodoFormData);
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
