import { ThemeEnum } from "@/types";
import { useSettingContext } from "@/context";

const ThemeSetting = () => {
  const setting = useSettingContext();
  const colors = Object.keys(ThemeEnum).filter((key) => isNaN(Number(key)));

  return (
    <div className="space-y-4 py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Theme
      </h3>

      <label className="flex items-center justify-between" htmlFor="dark-mode">
        <span>Dark Mode when running</span>
        <input className="checkbox" type="checkbox" name="dark-mode" id="dark-mode"
               defaultChecked={setting.themeSetting.darkModeWhenRunning} />
      </label>

      <label className="flex items-center justify-between" htmlFor="pomodoro-bg-color">
        <span>Pomodoro Background Color</span>
        <select name="pomodoro-bg-color" id="pomodoro-bg-color" defaultValue={setting.themeSetting.themes.pomodoro}>
          {
            colors.map((color, index) => <option key={index} value={index}>{color.toLowerCase()}</option>)
          }
        </select>
      </label>

      <label className="flex items-center justify-between" htmlFor="short-break-bg-color">
        <span>Short Break Background Color</span>
        <select name="short-break-bg-color" id="short-break-bg-color" defaultValue={setting.themeSetting.themes.break}>
          {
            colors.map((color, index) => <option key={index} value={index}>{color.toLowerCase()}</option>)
          }
        </select>
      </label>
    </div>
  );
};

export { ThemeSetting }
