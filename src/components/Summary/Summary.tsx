const Summary = () => {
  return (
    <section
      className="mx-auto mt-7 max-w-[var(--max-w-container)] border-t-2 bg-white/10 px-3 py-5 text-white"
      aria-label="Pomodoro summary section"
    >
      {/* Render the summary details, if got todos */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {/* Pomodoro infos */}
        <p className="flex items-center">
          <span className="mr-1 text-white/70">Pomodoros:</span>
          <span className="text-2xl font-bold">3</span>
          <span className="mx-1 font-extralight">/</span>
          <span className="text-2xl font-bold">5</span>
        </p>
        {/* Finish time info */}
        <p className="flex items-center space-x-1">
          <span className="text-white/70">Finish At:</span>
          <span className="text-2xl font-bold">3:45</span>
          <span className="text-sm text-white/70">(Remaining Time)</span>
        </p>
      </div>

      {/* If no todos, then provide a fallback UI */}
      <p className="text-center text-sm">
        Please add some tasks to track your progress.
      </p>
    </section>
  );
};

export { Summary };
