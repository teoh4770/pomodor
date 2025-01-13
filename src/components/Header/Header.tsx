import IconWhite from "/icon-white.png";
import ConfigWhite from "/config-white.png";
import GraphWhite from "/graph-white.png";
import { Setting } from "@/components";
import { useRef } from "react";

const Header = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <header className="relative mx-auto mb-8 flex max-w-2xl justify-between gap-2 py-4">
      {/* Logo */}
      <div className="flex items-center gap-1">
        <img className="aspect-square h-5 w-5" src={IconWhite} alt="" />
        <span className="text-xl font-bold text-white">Pomodor</span>
      </div>

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

      {/* Progress bar for timer */}
      <div className="absolute bottom-0 h-0.5 w-full bg-white/20"></div>

      {/* Setting */}
      <Setting ref={dialogRef} />
    </header>
  );
};

export { Header };
