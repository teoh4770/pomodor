interface AddTodoButtonProps {
  onClick: () => void;
}

const AddTodoButton = ({onClick}: AddTodoButtonProps) => (
  <button
    type="button"
    className="button w-full border-2 border-dashed !bg-black/10 !py-4 font-bold !text-white/80 hover:!text-white"
    data-type="secondary"
    data-size="md"
    title="Click to add a new todo"
    aria-label="Show todo form button"
    onClick={onClick}
  >
    Add Todo
  </button>
);

export { AddTodoButton }