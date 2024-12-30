import NextIcon from "/next-white.png";

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onSkip: () => void;
}

const Controls = ({ isRunning, onToggle, onSkip }: ControlsProps) => {
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

        <button
          className="button absolute -right-2 h-full translate-x-full"
          data-size="sm"
          onClick={onSkip}
          aria-label="Skip current session"
        >
          <img className="h-8 w-8" src={NextIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export { Controls };
