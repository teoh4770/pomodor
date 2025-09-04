import * as React from "react";
import { createContext } from "react";
import { useAuth, useSession, useSetting, useTheme, useTimer, useTodo } from "@/hooks";
import { SessionHook } from "@/hooks/useSession";
import { TimerHook } from "@/hooks/useTimer";
import { TodoHook } from "@/hooks/useTodo";
import { SettingHook } from "@/hooks/useSetting";
import { TimerModeEnum } from "@/types";
import { User } from "firebase/auth";

interface IAppContext {
  timer: TimerHook | undefined;
  session: SessionHook | undefined;
  todo: TodoHook | undefined;
  setting: SettingHook | undefined;
  user: User | null;
}

// Create app context with default value
const AppContext = createContext<IAppContext>({
  timer: undefined,
  session: undefined,
  todo: undefined,
  setting: undefined,
  user: null
});

// Create AppProvider to provide hooks to the consumers
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const setting = useSetting();
  const user = useAuth();
  const timer = useTimer(setting, handleTimerEnd);
  const session = useSession();
  const todo = useTodo(user, setting.timerSetting, setting.taskSetting);

  useTheme(timer.mode, setting.themeSetting.themes);

  function handleTimerEnd() {
    if (timer.mode === TimerModeEnum.POMODORO) {
      session.increment();
      todo.incrementSession();
    }
  }

  return (
    <AppContext.Provider value={{ timer, session, todo, setting, user }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
