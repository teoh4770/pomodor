import {
  AlarmSoundEnum,
  ThemeEnum,
  TickingSoundEnum,
  TimerModeEnum,
  ITimerSetting,
  ISoundSetting,
  ITaskSetting,
  IThemeSettings,
} from "@/types";
import { useState } from "react";

export interface SettingHook {
  timerSetting: ITimerSetting;
  timerSettingHandler: (
    pomodoroDuration: number,
    breakDuration: number,
    autoStartPomodoros: boolean,
    autoStartBreak: boolean,
  ) => void;
  soundSetting: ISoundSetting;
  soundSettingHandlers: {
    setAlarmSoundType: (soundType: AlarmSoundEnum) => void;
    setTickingSoundType: (soundType: TickingSoundEnum) => void;
  };
  taskSetting: ITaskSetting;
  taskSettingHandlers: {
    toggleAutoCheckTasks: () => void;
    toggleAutoSwitchTasks: () => void;
  };
  themeSetting: IThemeSettings;
  themeSettingHandlers: {
    toggleDarkMode: () => void;
  };
}

const useSetting = (): SettingHook => {
  // Timer Setting
  const [timerSetting, setTimerSetting] = useState<ITimerSetting>({
    pomodoroDuration: 30, // in minutes
    breakDuration: 5, // in minutes
    autoStartBreak: false,
    autoStartPomodoros: false,
  });

  const timerSettingHandler = (
    pomodoroDuration: number,
    breakDuration: number,
    autoStartPomodoros: boolean,
    autoStartBreak: boolean,
  ) => {
    setTimerSetting({
      ...timerSetting,
      pomodoroDuration,
      breakDuration,
      autoStartPomodoros,
      autoStartBreak,
    });
  };

  // Sound Settings
  const [soundSetting, setSoundSetting] = useState<ISoundSetting>({
    // should take a alarm sound enum that contains 5 sound options -> which we can do alarmSound[alarmSoundType] -> gives us the sound
    // should take a ticking sound enum that contains 5 sound options -> which we can do tickingSound[tickingSoundType] -> gives us the sound
    alarmSoundType: AlarmSoundEnum.BELL,
    tickingSoundType: TickingSoundEnum.NONE,
  });

  const setAlarmSoundType = (soundType: AlarmSoundEnum) => {
    setSoundSetting({ ...soundSetting, alarmSoundType: soundType });
  };
  const setTickingSoundType = (soundType: TickingSoundEnum) => {
    setSoundSetting({ ...soundSetting, tickingSoundType: soundType });
  };

  // Task Settings
  const [taskSetting, setTaskSetting] = useState<ITaskSetting>({
    autoCheckTasks: false,
    autoSwitchTasks: false,
  });

  const toggleAutoCheckTasks = () => {
    setTaskSetting({
      ...taskSetting,
      autoCheckTasks: !taskSetting.autoCheckTasks,
    });
  };

  const toggleAutoSwitchTasks = () => {
    setTaskSetting({
      ...taskSetting,
      autoSwitchTasks: !taskSetting.autoSwitchTasks,
    });
  };

  const [themeSetting, setThemeSetting] = useState<IThemeSettings>({
    darkModeWhenRunning: false,
    themes: {
      // should have a theme enum that contain 5 color options -> which we can do themes[color] -> gives us the theme color
      [TimerModeEnum.POMODORO]: ThemeEnum.RED,
      [TimerModeEnum.BREAK]: ThemeEnum.BLUE,
    },
  });

  const toggleDarkMode = () => {
    setThemeSetting({
      ...themeSetting,
      darkModeWhenRunning: !themeSetting.darkModeWhenRunning,
    });
  };

  // Effects
  // support localStorage, declare it in an effect

  // Return consolidated settings and handlers
  return {
    timerSetting,
    timerSettingHandler,
    soundSetting,
    soundSettingHandlers: {
      setAlarmSoundType,
      setTickingSoundType,
    },
    taskSetting,
    taskSettingHandlers: {
      toggleAutoCheckTasks,
      toggleAutoSwitchTasks,
    },
    themeSetting,
    themeSettingHandlers: {
      toggleDarkMode,
    },
  };
};

export { useSetting };
