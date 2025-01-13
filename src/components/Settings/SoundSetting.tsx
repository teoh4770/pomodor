const SoundSetting = () => {
  return (
    <div className="space-y-4 border-b py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
        Sound
      </h3>

      <div>
        <label className="flex items-center justify-between" htmlFor="">
          <span>Alarm Sound</span>
          <select name="" id="">
            <option value="">Bell</option>
            <option value="">Bird</option>
            <option value="">Digital</option>
            <option value="">Kitchen</option>
            <option value="">Wood</option>
          </select>
        </label>
        <label className="flex items-center justify-between" htmlFor="">
          <span className="invisible">Volume</span>
          <input type="range" name="" id="" />
        </label>
      </div>

      <div>
        <label className="flex items-center justify-between" htmlFor="">
          <span>Ticking Sound</span>
          <select name="" id="">
            <option value="">None</option>
            <option value="">Ticking Fast</option>
            <option value="">Ticking Slow</option>
            <option value="">White Noise</option>
            <option value="">Brown Noise</option>
          </select>
        </label>
        <label className="flex items-center justify-between" htmlFor="">
          <span className="invisible">Volume</span>
          <input type="range" name="" id="" />
        </label>
      </div>
    </div>
  );
};

export { SoundSetting };
