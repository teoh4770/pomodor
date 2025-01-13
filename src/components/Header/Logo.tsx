import IconWhite from "/icon-white.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img className="aspect-square h-5 w-5" src={IconWhite} alt="" />
      <span className="text-xl font-bold text-white">Pomodor</span>
    </div>
  );
};

export { Logo }
