import { createContext } from "react";
import { useTimer, useSession, useTodo, useSetting } from "@/hooks";
import { SessionHook } from "@/hooks/useSession";
import { TimerHook } from "@/hooks/useTimer";
import { TodoHook } from "@/hooks/useTodo";
import { SettingHook } from "@/hooks/useSetting";
import { TimerModeEnum } from "@/types";

interface IAppContext {
  timer: TimerHook | undefined;
  session: SessionHook | undefined;
  todo: TodoHook | undefined;
  setting: SettingHook | undefined;
}

// Create app context with default value
const AppContext = createContext<IAppContext>({
  timer: undefined,
  session: undefined,
  todo: undefined,
  setting: undefined,
});

// Create AppProvider to provide hooks to the consumers
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const setting = useSetting();
  const timer = useTimer(setting.timerSetting, setting.soundSetting, handleTimerEnd);
  const session = useSession();
  const todo = useTodo(setting.timerSetting, setting.taskSetting);

  function handleTimerEnd() {
    if (timer.mode === TimerModeEnum.POMODORO) {
      session.increment();
      todo.incrementSession();
    }
  }

  return (
    <AppContext.Provider value={{ timer, session, todo, setting }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
