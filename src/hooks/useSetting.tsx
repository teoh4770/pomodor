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

import { useLocalStorage } from "usehooks-ts";

export interface SettingHook {
  timerSetting: ITimerSetting;
  timerSettingHandler: (
    pomodoroDuration: number,
    breakDuration: number,
    autoStartBreak: boolean,
    autoStartPomodoros: boolean,
  ) => void;

  soundSetting: ISoundSetting;
  soundSettingHandlers: {
    soundSettingHandler: (alarmSoundVolume: number, alarmSoundType: AlarmSoundEnum) => void;
    setAlarmSoundVolume: (volume: number) => void;
    setAlarmSoundType: (soundType: AlarmSoundEnum) => void;
    setTickingSoundType: (soundType: TickingSoundEnum) => void;
  };

  taskSetting: ITaskSetting;
  taskSettingHandlers: {
    taskSettingHandler: (
      autoCheckTasks: boolean,
      autoSwitchTasks: boolean
    ) => void;
    toggleAutoCheckTasks: () => void;
    toggleAutoSwitchTasks: () => void;
  };

  themeSetting: IThemeSettings;
  themeSettingHandlers: {
    toggleDarkMode: () => void;
    themeSettingHandler: (darkMode: boolean, pomodoroColor: ThemeEnum, shortBreakColor: ThemeEnum) => void;
  };
}

const useSetting = (): SettingHook => {
  // Timer Setting
  const [timerSetting, setTimerSetting] = useLocalStorage<ITimerSetting>('timer-setting', {
    pomodoroDuration: 30, // in minutes
    breakDuration: 5, // in minutes
    autoStartBreak: false,
    autoStartPomodoros: false,
  });

  const timerSettingHandler = (
    pomodoroDuration: number,
    breakDuration: number,
    autoStartBreak: boolean,
    autoStartPomodoros: boolean,
  ) => {
    setTimerSetting({
      ...timerSetting,
      pomodoroDuration: pomodoroDuration,
      breakDuration: breakDuration,
      autoStartBreak: autoStartBreak,
      autoStartPomodoros: autoStartPomodoros,
    });
  };

  // Sound Settings
  const [soundSetting, setSoundSetting] = useLocalStorage<ISoundSetting>('sound-setting', {
    // should take an alarm sound enum that contains 5 sound options -> which we can do alarmSound[alarmSoundType] -> gives us the sound
    // should take a ticking sound enum that contains 5 sound options -> which we can do tickingSound[tickingSoundType] -> gives us the sound
    alarmSoundVolume: 100,
    alarmSoundType: AlarmSoundEnum.BELL,
    tickingSoundType: TickingSoundEnum.NONE,
  });


  const soundSettingHandler = (
    alarmSoundVolume: number,
    alarmSoundType: AlarmSoundEnum,
  ) => {
    setSoundSetting({
      ...soundSetting,
      alarmSoundVolume: alarmSoundVolume,
      alarmSoundType: alarmSoundType,
    })
  };

  const setAlarmSoundVolume = (volume: number) => {
    setSoundSetting({ ...soundSetting, alarmSoundVolume: volume });
  };

  const setAlarmSoundType = (soundType: AlarmSoundEnum) => {
    setSoundSetting({ ...soundSetting, alarmSoundType: soundType });
  };
  const setTickingSoundType = (soundType: TickingSoundEnum) => {
    setSoundSetting({ ...soundSetting, tickingSoundType: soundType });
  };

  // Task Settings
  const [taskSetting, setTaskSetting] = useLocalStorage<ITaskSetting>('task-setting', {
    autoCheckTasks: false,
    autoSwitchTasks: false,
  });

  const taskSettingHandler = (
    autoCheckTasks: boolean,
    autoSwitchTasks: boolean,
  ) => {
    setTaskSetting({
      ...taskSetting,
      autoCheckTasks: autoCheckTasks,
      autoSwitchTasks: autoSwitchTasks,
    })
  };

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

  const [themeSetting, setThemeSetting] = useLocalStorage<IThemeSettings>('theme-settting', {
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

  const themeSettingHandler = (darkMode: boolean, pomodoroColor: ThemeEnum, shortBreakColor: ThemeEnum) => {
    setThemeSetting({
      darkModeWhenRunning: darkMode,
      themes: {
        [TimerModeEnum.POMODORO]: pomodoroColor,
        [TimerModeEnum.BREAK]: shortBreakColor
      }
    });
  };

  return {
    timerSetting,
    timerSettingHandler,
    soundSetting,
    soundSettingHandlers: {
      soundSettingHandler,
      setAlarmSoundVolume,
      setAlarmSoundType,
      setTickingSoundType,
    },
    taskSetting,
    taskSettingHandlers: {
      taskSettingHandler,
      toggleAutoCheckTasks,
      toggleAutoSwitchTasks,
    },
    themeSetting,
    themeSettingHandlers: {
      toggleDarkMode,
      themeSettingHandler
    },
  };
};

export { useSetting };
