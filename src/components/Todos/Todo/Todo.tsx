import clsx from "clsx";

import { ITodo, ITodoHandlers } from "../../../types";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { Session } from "./Session";
import { EditButton } from "./EditButton";
import { Description } from "./Description";
import { TodoForm } from "./TodoForm";

interface TodoProp {
  todo: ITodo;
  isActive: boolean;
  handlers: ITodoHandlers;
}

const Todo = ({ todo, isActive, handlers }: TodoProp) => {
  const [isEditMode, setIsEditMode] = useState(false);

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
        <div className="form-control">
          <Checkbox
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() => handlers.handleToggle(todo.id)}
          />
        </div>
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

      {/* todo: temporarily, will be removed */}
      <div className="p-1"></div>

      {isEditMode && (
        <TodoForm
          todo={todo}
          onSubmit={(formData) => handlers.handleEdit(todo.id, formData)}
          onCancel={() => setIsEditMode(false)}
          onDelete={() => {
            handlers.handleRemove(todo.id);
            setIsEditMode(false);
          }}
        />
      )}
    </li>
  );
};

export { Todo };
