import { ITodosHandlers, TodosViewTypeEnum } from "@/types";
import { useState } from "react";

interface TodosViewsProps {
  todosHandlers: ITodosHandlers;
}

const TodosViews = ({ todosHandlers }: TodosViewsProps) => {
  const [activeView, setActiveView] = useState<TodosViewTypeEnum>(
    TodosViewTypeEnum.all,
  );

  return (
    <div className="flex gap-2" aria-label="action buttons for todos">
      <p className="py-1 text-sm text-white">Filters:</p>
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          data-active={activeView === TodosViewTypeEnum.all}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.all);
            setActiveView(TodosViewTypeEnum.all);
          }}
        >
          Show All
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          data-active={activeView === TodosViewTypeEnum.active}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.active);
            setActiveView(TodosViewTypeEnum.active);
          }}
        >
          Show Active
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          data-active={activeView === TodosViewTypeEnum.completed}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.completed);
            setActiveView(TodosViewTypeEnum.completed);
          }}
        >
          Show Completed
        </button>
      </div>
    </div>
  );
};

export { TodosViews };
