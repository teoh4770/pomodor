const ThemeSetting = () => {
  return (
    <div className="space-y-4 py-6">
      <h3 className="mb-3 font-bold uppercase tracking-wider underline">
        Theme
      </h3>

      <label className="flex items-center justify-between" htmlFor="">
        <span>Dark Mode when running</span>
        <input className="checkbox" type="checkbox" name="" id="" />
      </label>
    </div>
  );
};

export { ThemeSetting }
