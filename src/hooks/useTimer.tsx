import { useEffect, useRef, useState } from "react";
import ClickSound from "/sounds/click/modern.mp3";
import RingSound from "/sounds/ring/bell.mp3";
import { TimerModeEnum } from "../types/enums";
import { formatTime, playSound } from "../utils";
import { toast } from "react-toastify";

interface IUseTimer {
  mode: TimerModeEnum;
  remainingTime: number;
  isRunning: boolean;
  handleToggle: () => void;
  handleNextMode: () => void;
  handlePomodoroMode: () => void;
  handleBreakMode: () => void;
}

const useTimer = (): IUseTimer => {
  // Constants
  const timerMode = {
    [TimerModeEnum.pomodoro]: 25,
    [TimerModeEnum.break]: 1,
  };

  // States
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerModeEnum>(TimerModeEnum.pomodoro);

  // Derived variables
  const interval = timerMode[mode];
  const remainingTime = interval - elapsedTime;
  const isTimerEnd = interval <= elapsedTime;

  /******************/
  /* Timer Effects  */
  /******************/
  // Show remaining time on title
  useEffect(() => {
    const minutes = formatTime(Math.floor(remainingTime / 60));
    const seconds = formatTime(remainingTime % 60);

    document.title = `${minutes}:${seconds}`;
  }, [remainingTime]);

  // Timer Logic
  const timerRef = useRef<number>();
  useEffect(() => {
    const notifyUser = () => {
      toast.success("You have finish a session!");
      playSound(RingSound);
    };

    // Guard: Handle timer end state
    if (isTimerEnd) {
      clearInterval(timerRef.current);
      handleReset();
      notifyUser();
      return;
    }

    if (isRunning) {
      const MILLISECONDS = 1000;
      timerRef.current = window.setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, MILLISECONDS);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning, isTimerEnd]);

  /******************/
  /* Timer Handlers */
  /******************/
  const handleToggle = () => {
    setIsRunning((prev) => !prev);
    playSound(ClickSound);
  };

  const handleNextMode = () => {
    setMode((prev) =>
      prev === TimerModeEnum.pomodoro
        ? TimerModeEnum.break
        : TimerModeEnum.pomodoro,
    );
    handleReset();
  };

  const handlePomodoroMode = () => {
    setMode(TimerModeEnum.pomodoro);
  };

  const handleBreakMode = () => {
    setMode(TimerModeEnum.break);
  };

  /******************/
  /*  Helper func   */
  /******************/
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return {
    mode,
    remainingTime,
    isRunning,
    handleToggle,
    handleNextMode,
    handlePomodoroMode,
    handleBreakMode,
  };
};

export { useTimer };
