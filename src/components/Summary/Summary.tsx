import { useTodoContext } from "@/context";
import { formatTime } from "@/utils";

const Summary = () => {
  const {
    todos,
    totalPomodoroSessions,
    completedPomodoroSessions,
    totalRemainingTimeInMinutes,
    estimatedFinishTime
  } = useTodoContext();

  const { hours, minutes } = estimatedFinishTime;

  const remainingHours = (totalRemainingTimeInMinutes / 60).toFixed(1);

  return (
    <section
      className="mx-auto mt-7 max-w-[var(--max-w-container)] border-t-2 bg-white/10 px-3 py-5 text-white"
      aria-label="Pomodoro summary section"
    >
      {todos.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {/* Pomodoro Progress */}
          <p className="flex items-center">
            <span className="mr-1 text-white/70">Pomodoros:</span>
            <span className="text-2xl font-bold">
              {completedPomodoroSessions}
            </span>
            <span className="mx-1 font-extralight">/</span>
            <span className="text-2xl font-bold">{totalPomodoroSessions}</span>
          </p>

          {/* Estimate Finish Time */}
          <p className="flex items-center space-x-1">
            <span className="text-white/70">Finish At:</span>
            <span className="text-2xl font-bold">
              {formatTime(hours)}:{formatTime(minutes)}
            </span>
            <span className="text-sm text-white/70">({remainingHours}h)</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-sm">
          Please add some tasks to track your progress.
        </p>
      )}
    </section>
  );
};

export { Summary };
