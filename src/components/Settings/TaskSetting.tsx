const TaskSetting = () => {
  return (
    <div className="space-y-4 border-b py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Task
      </h3>

      <label className="flex items-center justify-between" htmlFor="">
        <span>Auto Check Tasks</span>
        <input className="checkbox" type="checkbox" name="" id="" />
      </label>

      <label className="flex items-center justify-between" htmlFor="">
        <span>Auto Switch Tasks</span>
        <input className="checkbox" type="checkbox" name="" id="" />
      </label>
    </div>
  );
};

export { TaskSetting };
