// useTheme.ts
import { useEffect } from "react";
import { ThemeEnum, TimerModeEnum } from "@/types";
import { getThemeColor, applyThemeColor } from "@/services/themeService";

const useTheme = (mode: TimerModeEnum, themes: { pomodoro: ThemeEnum; break: ThemeEnum }) => {
  useEffect(() => {
    const themeColor = getThemeColor(mode, themes);
    applyThemeColor(themeColor);
  }, [mode, themes, themes.break, themes.pomodoro]);
};

export { useTheme };
