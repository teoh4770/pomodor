enum TimerModeEnum {
  POMODORO = "pomodoro",
  BREAK = "break",
}
enum TodoFormModeEnum {
  ADD = "add",
  EDIT = "edit",
}

enum TodosViewTypeEnum {
  ALL = "all",
  COMPLETED = "completed",
  ACTIVE = "active",
}

enum AlarmSoundEnum {
  BELL,
  BIRD,
  DIGITAL,
  KITCHEN,
  WOOD,
}

enum TickingSoundEnum {
  NONE,
  FAST,
  SLOW,
  WHITE_NOISE,
  BROWN_NOISE,
}

enum ThemeEnum {
  RED,
  GREEN,
  BLUE,
  BROWN,
  PURPLE,
}

export {
  TimerModeEnum,
  TodoFormModeEnum,
  TodosViewTypeEnum,
  AlarmSoundEnum,
  TickingSoundEnum,
  ThemeEnum,
};
