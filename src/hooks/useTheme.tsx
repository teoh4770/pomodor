// useTheme.ts
import { useEffect } from "react";
import { ThemeEnum, TimerModeEnum } from "@/types";
import { applyThemeColor, getThemeColor } from "@/services/themeService";

const useTheme = (
  mode: TimerModeEnum,
  themes: { pomodoro: ThemeEnum; break: ThemeEnum }
) => {
  useEffect(() => {
    const themeColor = getThemeColor(mode, themes);
    applyThemeColor(themeColor);
  }, [mode, themes, themes.break, themes.pomodoro]);
};

export { useTheme };
