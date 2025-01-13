import { ITodosHandlers, TodosViewTypeEnum } from "@/types";
import { useState } from "react";

interface TodosViewsProps {
  todosHandlers: ITodosHandlers;
}

const TodosViews = ({ todosHandlers }: TodosViewsProps) => {
  const [activeView, setActiveView] = useState<TodosViewTypeEnum>(
    TodosViewTypeEnum.ALL,
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
          data-active={activeView === TodosViewTypeEnum.ALL}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.ALL);
            setActiveView(TodosViewTypeEnum.ALL);
          }}
        >
          Show All
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          data-active={activeView === TodosViewTypeEnum.ACTIVE}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.ACTIVE);
            setActiveView(TodosViewTypeEnum.ACTIVE);
          }}
        >
          Show Active
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          data-active={activeView === TodosViewTypeEnum.COMPLETED}
          onClick={() => {
            todosHandlers.changeViewType(TodosViewTypeEnum.COMPLETED);
            setActiveView(TodosViewTypeEnum.COMPLETED);
          }}
        >
          Show Completed
        </button>
      </div>
    </div>
  );
};

export { TodosViews };
