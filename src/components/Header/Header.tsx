import { Logo } from "./Logo";
import { TimerProgress } from "./TimerProgress";
import ConfigWhite from "/config-white.png";
import GraphWhite from "/graph-white.png";
import { Settings } from "@/components";
import { useRef } from "react";

const Header = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <header className="relative mx-auto mb-8 flex max-w-2xl justify-between gap-2 py-4">
      <Logo />

      {/* Header buttons: report, setting, profile */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
        >
          <div className="flex items-center gap-1">
            <img className="aspect-square h-4 w-4" src={GraphWhite} alt="" />
            <span>Report</span>
          </div>
        </button>

        {/* click on the setting button, open the setting modal */}
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          onClick={() => dialogRef.current?.showModal()}
        >
          <div className="flex items-center gap-1">
            <img className="aspect-square h-4 w-4" src={ConfigWhite} alt="" />
            <span>Setting</span>
          </div>
        </button>

        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
        >
          Profile
        </button>
      </div>

      <TimerProgress />

      <Settings ref={dialogRef} />
    </header>
  );
};

export { Header };
