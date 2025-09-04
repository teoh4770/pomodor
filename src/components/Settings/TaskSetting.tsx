import { useSettingContext } from "@/context";

const TaskSetting = () => {
  const { taskSetting } = useSettingContext();

  return (
    <div className="space-y-4 border-b py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Task
      </h3>

      <label
        className="flex items-center justify-between"
        htmlFor="auto-check-tasks"
      >
        <span>Auto Check Tasks</span>
        <input
          type="checkbox"
          name="auto-check-tasks"
          id="auto-check-tasks"
          className="checkbox"
          defaultChecked={taskSetting.autoCheckTasks}
        />
      </label>

      <label
        className="flex items-center justify-between"
        htmlFor="auto-switch-tasks"
      >
        <span>Auto Switch Tasks</span>
        <input
          className="checkbox"
          type="checkbox"
          name="auto-switch-tasks"
          id="auto-switch-tasks"
          defaultChecked={taskSetting.autoSwitchTasks}
        />
      </label>
    </div>
  );
};

export { TaskSetting };
