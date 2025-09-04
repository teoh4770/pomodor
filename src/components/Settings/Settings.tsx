import * as React from "react";
import { forwardRef, useState } from "react";
import { SettingsHeader } from "./SettingsHeader";
import { TimerSetting } from "./TimerSetting";
import { SoundSetting } from "./SoundSetting";
import { TaskSetting } from "./TaskSetting";
import { SettingsFooter } from "./SettingsFooter";
import { useSettingContext } from "@/context";
import { ThemeSetting } from "@/components/Settings/ThemeSetting.tsx";

type SettingProps = object;

type Ref = HTMLDialogElement;

const Settings = forwardRef<Ref, SettingProps>((_, ref) => {
  const setting = useSettingContext();
  const [isFormValid, setIsFormValid] = useState(true);

  // Trigger validation on form change
  const handleFormChange = (e: React.FormEvent) => {
    const form = e.currentTarget as HTMLFormElement;
    setIsFormValid(form.checkValidity()); // Updates based on built-in HTML5 validation
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Handle form value here
    const form = e.currentTarget as HTMLFormElement;
    const settingFormData = new FormData(form);

    // Update timer setting
    setting.timerSettingHandler(
      Number(settingFormData.get("pomodoro-duration")!),
      Number(settingFormData.get("break-duration")!),
      Boolean(settingFormData.get("auto-start-break")!),
      Boolean(settingFormData.get("auto-start-pomodoro")!)
    );

    // Update task setting
    setting.taskSettingHandlers.taskSettingHandler(
      Boolean(settingFormData.get("auto-check-tasks")),
      Boolean(settingFormData.get("auto-switch-tasks"))
    );

    // Update sound setting
    setting.soundSettingHandlers.soundSettingHandler(
      Number(settingFormData.get("alarm-sound-volume")),
      Number(settingFormData.get("alarm-sound"))
    );

    // Update theme setting
    setting.themeSettingHandlers.themeSettingHandler(
      Boolean(settingFormData.get("dark-mode")),
      Number(settingFormData.get("pomodoro-bg-color")),
      Number(settingFormData.get("short-break-bg-color"))
    );
  };

  return (
    <dialog
      ref={ref}
      className="h-fit w-full max-w-[25rem] rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-md"
      id="modal"
    >
      <form
        method="dialog"
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      >
        <SettingsHeader dialogRef={ref as React.RefObject<HTMLDialogElement>} />

        <div className="px-5">
          <TimerSetting />
          <ThemeSetting />
          <TaskSetting />
          <SoundSetting />
        </div>

        <SettingsFooter isFormValid={isFormValid} />
      </form>
    </dialog>
  );
});

export { Settings };
