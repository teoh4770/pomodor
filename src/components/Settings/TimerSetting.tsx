import { useSettingContext } from "@/context";

const TimerSetting = () => {
  // does not matter, because setting is not in sync with timer timerMode value
  const { timerSetting } = useSettingContext();

  return (
    <div className="space-y-4 border-b py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Timer
      </h3>

      <div className="grid gap-1">
        <p className="font-bold">Time (minutes)</p>
        <div className="flex flex-wrap justify-between">
          <label className="grid">
            <span className="text-sm font-bold text-gray-400">Pomodoro</span>
            <input
              type="number"
              className="block border border-black"
              name="pomodoro-duration"
              defaultValue={timerSetting.pomodoroDuration}
              min={1}
              step={0.1}
              required
            />
          </label>

          <label className="grid">
            <span className="text-sm font-bold text-gray-400">Short Break</span>
            <input
              type="number"
              className="block border border-black"
              name="break-duration"
              defaultValue={timerSetting.breakDuration}
              min={1}
              step={0.1}
              required
            />
          </label>
        </div>
      </div>

      <label className="flex items-center justify-between">
        <span>Auto Start Breaks</span>
        <input type="checkbox" name="auto-start-break" className="checkbox" />
      </label>

      <label className="flex items-center justify-between">
        <span>Auto Start Pomodoros</span>
        <input
          type="checkbox"
          name="auto-start-pomodoro"
          className="checkbox"
        />
      </label>
    </div>
  );
};

export { TimerSetting };
