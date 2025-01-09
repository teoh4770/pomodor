import { Time } from "@/components/Timer/Time";
import { Controls } from "@/components/Timer/Controls";
import { Modes } from "@/components/Timer/Modes";
import { useSessionContext, useTimerContext } from "@/context";

const Timer = () => {
  const timer = useTimerContext();
  const session = useSessionContext();

  return (
    <div>
      <article
        className="mx-auto max-w-[30rem] space-y-6 rounded-lg bg-white/10 px-4 py-6 text-center text-white sm:space-y-8 sm:py-8"
        aria-label="Timer"
      >
        <p>Session count: {session.sessionCount}</p>
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
          isRunning={timer.isRunning}
          onToggle={timer.handleToggle}
          onSkip={timer.handleNextMode}
        />
      </article>
    </div>
  );
};

export { Timer };
