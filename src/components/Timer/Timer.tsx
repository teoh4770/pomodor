import { Time } from "@/components/Timer/Time";
import { Controls } from "@/components/Timer/Controls";
import { Modes } from "@/components/Timer/Modes";
import { useTimerContext } from "@/context";

const Timer = () => {
  const timer = useTimerContext();

  return (
    <div>
      <article
        className="mx-auto max-w-[var(--max-w-container)] space-y-6 rounded-lg bg-white/10 px-4 py-6 text-center text-white sm:space-y-8 sm:py-8"
        aria-label="Timer"
      >
        {/* <p>Session count: {session.sessionCount}</p> */}
        <Modes
          mode={timer.mode}
          onPomodoroClick={timer.handlePomodoroMode}
          onBreakClick={timer.handleBreakMode}
        />
        <Time
          minutes={Math.floor(timer.remainingTime / 60)}
          seconds={Math.floor(timer.remainingTime % 60)}
        />
        <Controls
          isRunning={timer.isTimerRunning}
          onToggle={timer.handleToggle}
          onSkip={timer.handleNextMode}
        />
      </article>
    </div>
  );
};

export { Timer };
