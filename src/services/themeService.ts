import { ThemeEnum, TimerModeEnum } from "@/types";

const themeColors: Record<ThemeEnum, string> = {
  [ThemeEnum.RED]: "var(--bg-color-1)",
  [ThemeEnum.GREEN]: "var(--bg-color-2)",
  [ThemeEnum.BLUE]: "var(--bg-color-3)",
  [ThemeEnum.BROWN]: "var(--bg-color-4)",
  [ThemeEnum.PURPLE]: "var(--bg-color-5)"
};

export function getThemeColor(
  mode: TimerModeEnum,
  themes: { pomodoro: ThemeEnum; break: ThemeEnum }
): string | null {
  if (mode === TimerModeEnum.POMODORO) {
    return themeColors[themes.pomodoro];
  }
  if (mode === TimerModeEnum.BREAK) {
    return themeColors[themes.break];
  }
  return null;
}

export function applyThemeColor(color: string | null) {
  if (color) {
    document.documentElement.style.setProperty("--primary-color", color);
  }
}
