import { useEffect, useRef, useState } from "react";
import ClickSound from "/sounds/click/modern.mp3";
import RingSound from "/sounds/ring/bell.mp3";
import { TimerModeEnum } from "../types/enums";
import { playSound } from "../utils";

interface IUseTimer {
  mode: TimerModeEnum;
  remainingTime: number;
  isRunning: boolean;
  handleToggle: () => void;
  handleReset: () => void;
  handlePomodoroClick: () => void;
  handleBreakClick: () => void;
}

const useTimer = (): IUseTimer => {
  // Constants (If exists)
  const timerMode = {
    [TimerModeEnum.pomodoro]: 25,
    [TimerModeEnum.break]: 5,
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
  // Timer Logic
  const timerRef = useRef<number>();
  useEffect(() => {
    // Guard: Handle timer end state
    if (isTimerEnd) {
      clearInterval(timerRef.current);
      handleReset();
      playSound(RingSound);
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

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const handlePomodoroClick = () => {
    setMode(TimerModeEnum.pomodoro);
  };

  const handleBreakClick = () => {
    setMode(TimerModeEnum.break);
  };

  return {
    mode,
    remainingTime,
    isRunning,
    handleToggle,
    handleReset,
    handlePomodoroClick,
    handleBreakClick,
  };
};

export { useTimer };
