import RemoveBlackSm from "/remove-black-sm.png";

const SettingsHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-solid px-5 py-3">
      <div></div>
      <h2 className="text-md font-bold uppercase">Setting</h2>
      <button className="aspect-square h-3 w-3" aria-label="Close button">
        <img src={RemoveBlackSm} alt="" />
      </button>
    </div>
  );
};

export { SettingsHeader };
