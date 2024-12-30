import NextIcon from "/next-white.png";

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}
// !instead of reset button, go to the next mode
const Controls = ({ isRunning, onToggle, onReset }: ControlsProps) => {
  return (
    <div className="flex justify-center" aria-label="Timer controls">
      <div className="relative">
        <button
          className="button"
          data-type="primary"
          data-size="lg"
          data-active={isRunning}
          onClick={onToggle}
          aria-label="Toggle timer"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        {/* ?fixed here */}
        <button
          className="button absolute -right-2 h-full translate-x-full"
          data-size="sm"
          onClick={onReset}
          aria-label="Reset timer"
        >
          <img className="h-8 w-8" src={NextIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export { Controls };
