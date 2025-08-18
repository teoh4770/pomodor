import { useContext } from "react";
import { AppContext } from "@/context";

function useTodoContext() {
  const { todo } = useContext(AppContext);

  if (todo === undefined) {
    throw new Error("useTodoContext must be used within an AppContext");
  }

  return todo;
}

function useSessionContext() {
  const { session } = useContext(AppContext);

  if (session === undefined) {
    throw new Error("useSessionContext must be used within an AppContext");
  }

  return session;
}

function useTimerContext() {
  const { timer } = useContext(AppContext);

  if (timer === undefined) {
    throw new Error("useTimerContext must be used with an AppContext");
  }

  return timer;
}

function useSettingContext() {
  const { setting } = useContext(AppContext);

  if (setting === undefined) {
    throw new Error("useSettingContext must be used with an AppContext");
  }

  return setting;
}

function useAuthContext() {
  const { user } = useContext(AppContext);

  if (user === undefined) {
    throw new Error("useAuthContext must be used with an AppContext");
  }

  return user;
}

export {
  useTodoContext,
  useSessionContext,
  useTimerContext,
  useSettingContext,
  useAuthContext
};
