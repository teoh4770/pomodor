import { useCallback, useEffect, useRef } from "react";
import ClickSound from "/sounds/click/modern.mp3";
import { ThemeEnum, TimerModeEnum } from "@/types";
import { playAlarmSound } from "@/services/soundService";
import { formatTime, playSound } from "@/utils";
import { showToast } from "@/common/components/Toast";
import { useLocalStorage } from "usehooks-ts";
import { SettingHook } from "@/hooks/useSetting.tsx";

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
  setting: SettingHook,
  onTimerEnd?: () => void,
): TimerHook => {
  // States
  const [elapsedTime, setElapsedTime] = useLocalStorage('elapsedTime', 0);
  const [isTimerRunning, setIsTimerRunning] = useLocalStorage('isTimerRunning', false);
  const [mode, setMode] = useLocalStorage<TimerModeEnum>('timer-mode', TimerModeEnum.POMODORO);

  // Derived variables
  const MINUTE = 60;
  const timerConfig = {
    [TimerModeEnum.POMODORO]: setting.timerSetting.pomodoroDuration * MINUTE,
    [TimerModeEnum.BREAK]: setting.timerSetting.breakDuration * MINUTE
  };
  const interval = timerConfig[mode];
  const remainingTime = interval - elapsedTime;
  const isTimerEnd = interval <= elapsedTime;

  /******************/
  /* Timer Handlers */
  /******************/
  const handleToggle = () => {
    setIsTimerRunning((prev) => !prev);
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
      playAlarmSound(setting.soundSetting.alarmSoundType, setting.soundSetting.alarmSoundVolume);
      showToast("You have finish a session!", "success");
    }

    function handleAutoStartNextSession(nextMode: TimerModeEnum) {
      setIsTimerRunning(shouldAutoStart(nextMode));
    }

    function shouldAutoStart(nextMode: TimerModeEnum) {
      return (
        (setting.timerSetting.autoStartBreak && nextMode === TimerModeEnum.BREAK) ||
        (setting.timerSetting.autoStartPomodoros && nextMode === TimerModeEnum.POMODORO)
      );
    }
  }, [
    mode,
    onTimerEnd,
    setting.timerSetting.autoStartBreak,
    setting.timerSetting.autoStartPomodoros
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
    setIsTimerRunning(false);
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

  // Mode switching
  useEffect(() => {
    // we can abstract this into a color service?
    const themeColors = {
      [ThemeEnum.RED]: "var(--bg-color-1)",
      [ThemeEnum.GREEN]: "var(--bg-color-2)",
      [ThemeEnum.BLUE]: "var(--bg-color-3)",
      [ThemeEnum.BROWN]: "var(--bg-color-4)",
      [ThemeEnum.PURPLE]: "var(--bg-color-5)"
    };

    let themeColor = null;
    if (mode === TimerModeEnum.POMODORO) {
      themeColor = themeColors[setting.themeSetting.themes.pomodoro];
    } else if (mode === TimerModeEnum.BREAK) {
      themeColor = themeColors[setting.themeSetting.themes.break];
    }

    if (themeColor) {
      document.documentElement.style.setProperty("--primary-color", themeColor);
    }
  }, [mode, setting.themeSetting.themes.break, setting.themeSetting.themes.pomodoro]);

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
