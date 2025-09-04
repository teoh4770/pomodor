import { useLocalStorage } from "usehooks-ts";

export interface SessionHook {
  sessionCount: number;
  increment: (condition?: boolean) => void;
  decrement: (condition?: boolean) => void;
  set: (amount: number) => void;
  reset: () => void;
}

// To keep track of the user sessions for every completed Pomodoro session
const useSession = (): SessionHook => {
  const [sessionCount, setSessionCount] = useLocalStorage("session-count", 0);

  const increment = (condition?: boolean) => {
    if (condition === undefined || condition) {
      setSessionCount((prev) => prev + 1);
    }
  };

  const decrement = (condition?: boolean) => {
    if (condition === undefined || condition) {
      setSessionCount((prev) => (prev <= 0 ? 0 : prev - 1));
    }
  };

  const set = (amount: number) => {
    if (amount < 0) {
      console.warn("Session count cannot be negative");
      return;
    }
    setSessionCount(amount);
  };

  const reset = () => {
    setSessionCount(0);
  };

  return {
    sessionCount,
    increment,
    decrement,
    set,
    reset,
  };
};

export { useSession };
