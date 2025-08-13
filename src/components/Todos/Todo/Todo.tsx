import clsx from "clsx";

import { ITodo, ITodoHandlers } from "@/types";
import { useState } from "react";
import { TodoForm } from "@/components/Todos/TodoForm";
import {
  Checkbox,
  Description,
  EditButton,
  Session,
} from "@/components/Todos/Todo";

interface TodoProp {
  todo: ITodo;
  isActive: boolean;
  todoHandlers: ITodoHandlers;
}

const Todo = ({ todo, isActive, todoHandlers }: TodoProp) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleAutoChecked = true;

  const todoStyle = clsx(
    "cursor-pointer space-y-2 rounded-lg bg-white px-5 py-3 -outline-offset-4 hover:outline hover:outline-4",
    {
      "outline outline-4 outline-black hover:outline-black": isActive,
      "hover:outline-slate-300": !isActive,
    },
  );

  function hideEditForm() {
    setIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <div className="rounded-lg bg-white">
        <TodoForm
          todo={todo}
          onSubmit={(formData) => {
            todoHandlers.editTodo(todo.id, formData);
            hideEditForm();
          }}
          onCancel={() => hideEditForm()}
          onDelete={() => {
            todoHandlers.removeTodo(todo.id);
            hideEditForm();
          }}
        />
      </div>
    );
  }

  return (
    <li
      className={todoStyle}
      role="button"
      tabIndex={0}
      data-active={isActive}
      onClick={() => todoHandlers.selectTodo(todo.id)}
    >
      {/* contains checkbox, session and edit button */}
      <div className="flex items-center justify-between">
        <Checkbox
          id={todo.id}
          title={todo.title}
          completed={todo.completed || (toggleAutoChecked && todo.targetSessions === todo.completedSessions)}
          onToggle={() => {
            todoHandlers.toggleTodoCompletion(todo.id);
          }}
        />
        <div className="flex items-center gap-4">
          <Session
            completedSessions={todo.completedSessions}
            targetSessions={todo.targetSessions}
          />
          <EditButton onToggleEditView={() => setIsEditMode(true)} />
        </div>
      </div>

      {/* contain description */}
      <Description id={todo.id} description={todo.description} />
    </li>
  );
};

export { Todo };
