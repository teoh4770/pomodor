import { TimerModeEnum, TodosViewTypeEnum, AlarmSoundEnum, ThemeEnum, TickingSoundEnum } from "@/types";

interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  targetSessions: number;
  completedSessions: number;
}

interface ITodoForm {
  title: string;
  description: string;
  targetSessions: number;
}

interface ITodoHandlers {
  selectTodo: (id: string) => void;
  addTodo: (formData: ITodoForm) => void;
  editTodo: (id: string, formData: ITodoForm) => void;
  removeTodo: (id: string) => void;
  toggleTodoCompletion: (id: string) => void;
  setTodoCompletion: (id: string, completed: boolean) => void;
}

interface ITodosHandlers {
  changeViewType: (viewType: TodosViewTypeEnum) => void;
  resetTodos: () => void;
  clearAllTodos: () => void;
  clearCompletedTodos: () => void;
}

interface ITimerSetting {
  pomodoroDuration: number;
  breakDuration: number;
  autoStartBreak: boolean;
  autoStartPomodoros: boolean;
}

interface ISoundSetting {
  alarmSoundVolume: number;
  alarmSoundType: AlarmSoundEnum;
  tickingSoundType: TickingSoundEnum;
}

interface ITaskSetting {
  autoCheckTasks: boolean;
  autoSwitchTasks: boolean;
}

interface IThemeSettings {
  darkModeWhenRunning: boolean;
  themes: Record<TimerModeEnum, ThemeEnum>;
}

export type {
  ITodo,
  ITodoForm,
  ITodoHandlers,
  ITodosHandlers,
  ITimerSetting,
  ISoundSetting,
  ITaskSetting,
  IThemeSettings,
};
