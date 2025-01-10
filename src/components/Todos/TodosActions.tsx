import { ITodosHandlers } from "@/types";

interface TodosActionsProps {
  todosHandlers: ITodosHandlers;
}

const TodosActions = ({ todosHandlers }: TodosActionsProps) => {
  return (
    <div className="flex gap-2" aria-label="action buttons for todos">
      <p className="py-1 text-sm text-white">Actions:</p>
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          // data-active={selectedAction === TodosActionsEnum.RESET}
          onClick={() => {
            todosHandlers.resetTodos();
            // setSelectedAction(TodosActionsEnum.RESET);
          }}
        >
          Reset All
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          // data-active={selectedAction === TodosActionsEnum.CLEAR_ALL}
          onClick={() => {
            todosHandlers.clearAllTodos();
            // setSelectedAction(TodosActionsEnum.CLEAR_ALL);
          }}
        >
          Clear All
        </button>
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          // data-active={selectedAction === TodosActionsEnum.CLEAR_COMPLETED}
          onClick={() => {
            todosHandlers.clearCompletedTodos();
            // setSelectedAction(TodosActionsEnum.CLEAR_COMPLETED);
          }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export { TodosActions };
