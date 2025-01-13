const TimerSetting = () => {
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
            <input type="number" className="block border border-black" />
          </label>
          <label className="grid">
            <span className="text-sm font-bold text-gray-400">Short Break</span>
            <input type="number" className="block border border-black" />
          </label>
        </div>
      </div>

      <label className="flex items-center justify-between" htmlFor="">
        <span>Auto Start Breaks</span>
        <input type="checkbox" name="" id="" className="checkbox" />
      </label>

      <label className="flex items-center justify-between" htmlFor="">
        <span>Auto Start Pomodoros</span>
        <input type="checkbox" name="" id="" className="checkbox" />
      </label>

      <label className="flex items-center justify-between">
        <span>Short Break</span>
        <input type="number" className="block border border-black" />
      </label>
    </div>
  );
};

export { TimerSetting };
