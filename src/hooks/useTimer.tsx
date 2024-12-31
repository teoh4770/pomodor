import { useCallback, useEffect, useRef, useState } from "react";
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

const useTimer = (onTimerEnd?: () => void): IUseTimer => {
  // Constants
  const timerMode = {
    [TimerModeEnum.pomodoro]: 2,
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
  /* Timer Handlers */
  /******************/
  const handleToggle = () => {
    setIsRunning((prev) => !prev);
    playSound(ClickSound);
  };

  const handleNextMode = useCallback(() => {
    if (onTimerEnd) onTimerEnd();

    toggleMode();
    reset();
    notifyUser();

    function toggleMode() {
      setMode((prev) =>
        prev === TimerModeEnum.pomodoro
          ? TimerModeEnum.break
          : TimerModeEnum.pomodoro,
      );
    }

    function reset() {
      setIsRunning(false);
      setElapsedTime(0);
    }

    function notifyUser() {
      toast.success("You have finished a session!");
      playSound(RingSound);
    }
  }, [onTimerEnd]);

  const handlePomodoroMode = () => {
    setMode(TimerModeEnum.pomodoro);
  };

  const handleBreakMode = () => {
    setMode(TimerModeEnum.break);
  };

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
    const startTimer = () => {
      const MILLISECONDS = 1000;
      timerRef.current = window.setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, MILLISECONDS);
    };

    const stopTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };

    // Guard: Handle timer end state
    if (isTimerEnd) {
      stopTimer();
      handleNextMode();
      return;
    }

    if (isRunning) {
      startTimer();
    }

    return stopTimer;
  }, [handleNextMode, isRunning, isTimerEnd]);

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
