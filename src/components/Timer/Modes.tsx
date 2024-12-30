import { TimerModeEnum } from "../../types/enums";

interface TabsProps {
  mode: TimerModeEnum;
  onPomodoroClick: () => void;
  onBreakClick: () => void;
}

// Switch between pomodoro mode and break time mode
const Modes = ({ mode, onPomodoroClick, onBreakClick }: TabsProps) => {
  return (
    <div>
      <button
        className="button"
        data-type="naked"
        data-size="sm"
        data-active={mode === TimerModeEnum.pomodoro}
        onClick={onPomodoroClick}
      >
        Pomodoro
      </button>
      <button
        className="button"
        data-type="naked"
        data-size="sm"
        data-active={mode === TimerModeEnum.break}
        onClick={onBreakClick}
      >
        Short Break
      </button>
    </div>
  );
};

export { Modes };
