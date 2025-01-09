interface EditButtonProps {
  onToggleEditView: () => void;
}

const EditButton = ({ onToggleEditView }: EditButtonProps) => (
  <button
    type="button"
    className="button border !text-black/60 hover:bg-black/10"
    data-type="secondary"
    data-size="sm"
    title="Click to edit this task"
    aria-label="Edit todo button"
    onClick={(e) => {
      e.stopPropagation();
      onToggleEditView();
    }}
  >
    Edit
  </button>
);

export { EditButton };