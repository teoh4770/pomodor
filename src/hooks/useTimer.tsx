import { useCallback, useEffect, useRef, useState } from "react";
import ClickSound from "/sounds/click/modern.mp3";
import RingSound from "/sounds/ring/bell.mp3";
import { ITimerSetting, TimerModeEnum } from "@/types";
import { formatTime, playSound } from "@/utils";
import { showToast } from "@/common/components/Toast";

export interface TimerHook {
  mode: TimerModeEnum;
  remainingTime: number;
  isTimerRunning: boolean;
  handleToggle: () => void;
  handleNextMode: () => void;
  handlePomodoroMode: () => void;
  handleBreakMode: () => void;
}

// autoStartPomodoros: when break finish, start pomodoro
// autoStartBreaks: when pomodoro finish, start break

const useTimer = (
  timerSetting: ITimerSetting,
  onTimerEnd?: () => void,
): TimerHook => {
  // States
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setisTimerRunning] = useState(false);
  const [mode, setMode] = useState<TimerModeEnum>(TimerModeEnum.POMODORO);

  // Derived variables
  const MINUTE = 60;
  const timerConfig = {
    [TimerModeEnum.POMODORO]: timerSetting.pomodoroDuration * MINUTE,
    [TimerModeEnum.BREAK]: timerSetting.breakDuration * MINUTE,
  };
  const interval = timerConfig[mode];
  const remainingTime = interval - elapsedTime;
  const isTimerEnd = interval <= elapsedTime;

  /******************/
  /* Timer Handlers */
  /******************/
  const handleToggle = () => {
    setisTimerRunning((prev) => !prev);
    playSound(ClickSound);
  };

  const handleNextMode = useCallback(() => {
    // Timer end event runs first
    if (onTimerEnd) onTimerEnd();

    const nextMode = getNextMode(mode);
    notifyUser();
    handleAutoStartNextSession(nextMode);

    setMode(nextMode); // why spacing out

    function getNextMode(currentMode: TimerModeEnum) {
      return currentMode === TimerModeEnum.POMODORO
        ? TimerModeEnum.BREAK
        : TimerModeEnum.POMODORO;
    }

    function notifyUser() {
      showToast("You have finish a session!", "success");
      playSound(RingSound);
    }

    function handleAutoStartNextSession(nextMode: TimerModeEnum) {
      setisTimerRunning(shouldAutoStart(nextMode));
    }

    function shouldAutoStart(nextMode: TimerModeEnum) {
      return (
        (timerSetting.autoStartBreak && nextMode === TimerModeEnum.BREAK) ||
        (timerSetting.autoStartPomodoros && nextMode === TimerModeEnum.POMODORO)
      );
    }
  }, [
    mode,
    onTimerEnd,
    timerSetting.autoStartBreak,
    timerSetting.autoStartPomodoros,
  ]);

  const handlePomodoroMode = () => {
    setMode(TimerModeEnum.POMODORO);
    resetTimer();
  };

  const handleBreakMode = () => {
    setMode(TimerModeEnum.BREAK);
    resetTimer();
  };

  /********************/
  /* Helper Functions */
  /********************/

  const resetTimer = () => {
    setisTimerRunning(false);
    setElapsedTime(0);
  }

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
      resetTimer();
      handleNextMode();
      return;
    }

    if (isTimerRunning) {
      startTimer();
    }

    return stopTimer;
  }, [handleNextMode, isTimerRunning, isTimerEnd]);

  return {
    mode,
    remainingTime,
    isTimerRunning,
    handleToggle,
    handleNextMode,
    handlePomodoroMode,
    handleBreakMode,
  };
};

export { useTimer };
