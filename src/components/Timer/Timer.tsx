import { Time } from "./Time";
import { Controls } from "./Controls";
import { Modes } from "./Modes";
import { useTimer } from "../../hooks";

const Timer = () => {
  const timer = useTimer();

  return (
    <article
      className="mx-auto max-w-[30rem] space-y-6 rounded-lg bg-white/10 px-4 py-6 text-center text-white sm:space-y-8 sm:py-8"
      aria-label="Timer"
    >
      <Modes
        mode={timer.mode}
        onPomodoroClick={timer.handlePomodoroClick}
        onBreakClick={timer.handleBreakClick}
      />
      <Time
        minutes={Math.floor(timer.remainingTime / 60)}
        seconds={Math.floor(timer.remainingTime % 60)}
      />
      <Controls
        isRunning={timer.isRunning}
        onToggle={timer.handleToggle}
        onReset={timer.handleReset}
      />
    </article>
  );
};

export { Timer };
