import { ITodo, ITodoHandlers } from "@/types";
import { Todo } from "@/components/Todos/Todo";

interface TodoListProps {
  todos: ITodo[]
  activeTodoId: string;
  todoHandlers: ITodoHandlers;
}

export const TodoList = ({ todos, activeTodoId, todoHandlers }: TodoListProps) => (
  <ol className="grid gap-3">
    {todos.map((todoItem) => (
      <Todo
        key={todoItem.id}
        todo={todoItem}
        isActive={todoItem.id === activeTodoId}
        handlers={todoHandlers}
      />
    ))}
  </ol>
);