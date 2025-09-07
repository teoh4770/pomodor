import ConfigWhite from "/config-solid-white.png";
import AnalyticsWhite from "/analytics-solid-white.png";

import { Logo } from "./Logo";
import { TimerProgress } from "./TimerProgress";
import { Settings } from "@/components";
import { useRef } from "react";
import { Auth } from "@/components/Auth/Auth.tsx";

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
            <img className="aspect-square h-4 w-4" src={AnalyticsWhite} alt="" />
            <span className="hidden md:inline">Report</span>
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
            <span className="hidden md:inline">Setting</span>
          </div>
        </button>

        <Auth />
      </div>

      <TimerProgress />

      <Settings ref={dialogRef} />
    </header>
  );
};

export { Header };
