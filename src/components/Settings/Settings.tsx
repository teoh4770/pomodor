import { forwardRef } from "react";
import { SettingsHeader } from "./SettingsHeader";
import { TimerSetting } from "./TimerSetting";
import { SoundSetting } from "./SoundSetting";
import { TaskSetting } from "./TaskSetting";
import { SettingsFooter } from "./SettingsFooter";

type SettingProps = object;

type Ref = HTMLDialogElement;

const Settings = forwardRef<Ref, SettingProps>((_, ref) => {
  return (
    <dialog
      ref={ref}
      className="h-fit w-full max-w-[25rem] rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-md"
      id="modal"
    >
      <form method="dialog">
        <SettingsHeader />

        <div className="px-5">
          <TimerSetting />
          <TaskSetting />
          <SoundSetting />
        </div>

        <SettingsFooter />
      </form>
    </dialog>
  );
});

export { Settings };
