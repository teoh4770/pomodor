import { formatTime } from "@/utils";

interface TimeProps {
  minutes: number;
  seconds: number;
}

const Time = ({ minutes, seconds }: TimeProps) => {
  const formattedMinutes = formatTime(minutes);
  const formattedSeconds = formatTime(seconds);

  return (
    <div className="text-8xl font-extrabold leading-none sm:text-[7.5rem]">
      {formattedMinutes}:{formattedSeconds}
    </div>
  );
};

export { Time };
