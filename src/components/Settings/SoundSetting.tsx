import { useSettingContext } from "@/context";
import { alarmSoundOptions } from "@/services/soundService";

const SoundSetting = () => {
  const { soundSetting, soundSettingHandlers } = useSettingContext();

  return (
    <div className="space-y-4 border-b py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Sound
      </h3>

      <div>
        <label className="flex items-center justify-between" htmlFor="alarm-sound">
          <span>Alarm Sound</span>
          <select name="alarm-sound" id="alarm-sound" defaultValue={soundSetting.alarmSoundType}>
            {alarmSoundOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center justify-between" htmlFor="alarm-sound-volume">
          <span className="invisible">Volume</span>
          <div>
            <span>{soundSetting.alarmSoundVolume}</span>
            <input type="range" name="alarm-sound-volume" id="alarm-sound-volume" min={0} max={100}
                   onChange={(e) => soundSettingHandlers.setAlarmSoundVolume(Number(e.currentTarget.value))}
                   value={soundSetting.alarmSoundVolume} />
          </div>
        </label>
      </div>

      {/*<div>*/}
      {/*  <label className="flex items-center justify-between" htmlFor="">*/}
      {/*    <span>Ticking Sound</span>*/}
      {/*    <select name="" id="">*/}
      {/*      <option value="">None</option>*/}
      {/*      <option value="">Ticking Fast</option>*/}
      {/*      <option value="">Ticking Slow</option>*/}
      {/*      <option value="">White Noise</option>*/}
      {/*      <option value="">Brown Noise</option>*/}
      {/*    </select>*/}
      {/*  </label>*/}
      {/*  <label className="flex items-center justify-between" htmlFor="">*/}
      {/*    <span className="invisible">Volume</span>*/}
      {/*    <input type="range" name="" id="" />*/}
      {/*  </label>*/}
      {/*</div>*/}
    </div>
  );
};

export { SoundSetting };
