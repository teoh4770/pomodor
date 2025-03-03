import { forwardRef, useState } from "react";
import { SettingsHeader } from "./SettingsHeader";
import { TimerSetting } from "./TimerSetting";
import { SoundSetting } from "./SoundSetting";
import { TaskSetting } from "./TaskSetting";
import { SettingsFooter } from "./SettingsFooter";
import { useSettingContext } from "@/context";

type SettingProps = object;

type Ref = HTMLDialogElement;

const Settings = forwardRef<Ref, SettingProps>((_, ref) => {
  const setting = useSettingContext();
  const [isFormValid, setIsFormValid] = useState(true);

  const handleFormChange = (e: React.FormEvent) => {
    const form = e.currentTarget as HTMLFormElement;
    setIsFormValid(form.checkValidity()); // Updates based on built-in HTML5 validation
  };

  return (
    <dialog
      ref={ref}
      className="h-fit w-full max-w-[25rem] rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-md"
      id="modal"
    >
      <form
        method="dialog"
        onChange={handleFormChange} // Trigger validation on change
        onSubmit={(e) => {
          // Handle form value here
          const settingFormData = new FormData(e.currentTarget);

          // Update timer setting
          setting.timerSettingHandler(
            Number(settingFormData.get("pomodoro-duration")!),
            Number(settingFormData.get("break-duration")!),
            Boolean(settingFormData.get("auto-start-pomodoro")!),
            Boolean(settingFormData.get("auto-start-break")!),
          );
        }}
      >
        {/* SettingsHeader gets the same ref so it can use to close the model */}
        <SettingsHeader dialogRef={ref as React.RefObject<HTMLDialogElement>} />

        <div className="px-5">
          <TimerSetting />
          <TaskSetting />
          <SoundSetting />
        </div>

        <SettingsFooter isFormValid={isFormValid} />
      </form>
    </dialog>
  );
});

export { Settings };
