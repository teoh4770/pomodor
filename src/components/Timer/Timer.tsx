import { Time } from "./Time";
import { Controls } from "./Controls";
import { Modes } from "./Modes";
import { useSession, useTimer } from "../../hooks";
import { TimerModeEnum } from "../../types/enums";

const Timer = () => {
  const timer = useTimer(handleTimerEnd);
  const session = useSession();

  function handleTimerEnd() {
    if (timer.mode === TimerModeEnum.pomodoro) {
      session.increment();
    }
  }

  return (
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
  );
};

export { Timer };
