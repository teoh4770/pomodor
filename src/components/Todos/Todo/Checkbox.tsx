interface CheckboxProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

const Checkbox = ({ id, title, completed, onToggle }: CheckboxProps) => (
  <label
    className="form-control"
    htmlFor={"todo-" + id}
    onClick={(e) => e.stopPropagation()}
  >
    <input
      type="checkbox"
      id={"todo-" + id}
      className="checkbox peer"
      checked={completed}
      onChange={() => {
        onToggle();
      }}
    />
    <span className="peer-checked:line-through">{title}</span>
  </label>
);

export { Checkbox };
