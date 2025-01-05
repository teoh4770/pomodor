interface CheckboxProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

const Checkbox = ({ id, title, completed, onToggle }: CheckboxProps) => (
  <>
    <input
      type="checkbox"
      id={"todo-" + id}
      className="checkbox peer"
      checked={completed}
      onChange={onToggle}
    />
    <label htmlFor={"todo-" + id} className="peer-checked:line-through">
      {title}
    </label>
  </>
);

export { Checkbox };
