import { createContext } from "react";
import { useTimer, useSession, useTodo } from "../hooks";
import { SessionHook } from "../hooks/useSession";
import { TimerHook } from "../hooks/useTimer";
import { TodoHook } from "../hooks/useTodo";
import { TimerModeEnum } from "../types";

const AppContext = createContext<{
  timer: TimerHook | null;
  session: SessionHook | null;
  todo: TodoHook | null;
}>({ timer: null, session: null, todo: null });

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
