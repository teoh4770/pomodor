import { createContext } from "react";
import { useTimer, useSession, useTodo } from "../hooks";
import { SessionHook } from "../hooks/useSession";
import { TimerHook } from "../hooks/useTimer";
import { TodoHook } from "../hooks/useTodo";
import { TimerModeEnum } from "../types";

interface IAppContext {
  timer: TimerHook | undefined;
  session: SessionHook | undefined;
  todo: TodoHook | undefined;
}

// Create app context with default value
const AppContext = createContext<IAppContext>({
  timer: undefined,
  session: undefined,
  todo: undefined,
});

// Create AppProvider to provide hooks to the consumers
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const timer = useTimer(handleTimerEnd);
  const session = useSession();
  const todo = useTodo();

  function handleTimerEnd() {
    if (timer.mode === TimerModeEnum.pomodoro) {
      session.increment();
      todo.incrementSession();
    }
  }

  return (
    <AppContext.Provider value={{ timer, session, todo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
