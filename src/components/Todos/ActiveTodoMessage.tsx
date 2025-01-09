import { ITodo } from "../../types";

interface ActiveTodoMessageProps {
  activeTodo: ITodo | null;
  todos: ITodo[];
}

const ActiveTodoMessage = ({ activeTodo, todos }: ActiveTodoMessageProps) => {
  if (activeTodo) {
    return (
      <p className="mt-4 py-4 text-center text-slate-300">
        Currently focusing on:
        <br />
        <b className="text-lg text-white">{activeTodo.title}</b>
      </p>
    );
  }

  return (
    <p className="mt-4 py-4 text-center text-lg text-slate-300">
      {todos.length > 0
        ? "You didn't select any tasks 🥱"
        : "You don't have any tasks 😭"}
    </p>
  );
};

export { ActiveTodoMessage };
