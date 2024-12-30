interface TimeProps {
  minutes: number;
  seconds: number;
}

function formatTime(time: number) {
  if (time < 0) {
    time = 0;
  }
  return time >= 10 ? time : "0" + time;
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
