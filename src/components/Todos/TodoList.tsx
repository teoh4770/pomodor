import { ITodo, ITodoHandlers } from "@/types";
import { Todo } from "@/components/Todos/Todo";

interface TodoListProps {
  todos: ITodo[];
  activeTodoId: string;
  todoHandlers: ITodoHandlers;
}

export const TodoList = ({
                           todos,
                           activeTodoId,
                           todoHandlers
                         }: TodoListProps) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <ol className="grid gap-3">
      {incompleteTodos.map((todoItem) => (
        <Todo
          key={todoItem.id}
          todo={todoItem}
          isActive={todoItem.id === activeTodoId}
          todoHandlers={todoHandlers}
        />
      ))}
      {completedTodos.map((todoItem) => (
        <Todo
          key={todoItem.id}
          todo={todoItem}
          isActive={todoItem.id === activeTodoId}
          todoHandlers={todoHandlers}
        />
      ))}
    </ol>
  );
};
