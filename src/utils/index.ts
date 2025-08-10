const playSound = (src: string | null) => {
  if (!src) {
    return;
  }

  try {
    const milliseconds = 1000;
    const interval = 2 * milliseconds;

    const audio = new Audio(src);
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, interval);
  } catch (error) {
    console.error("Failed to play sound: ", error);
  }
};

function formatTime(time: number) {
  if (time < 0) {
    time = 0;
  }
  return time >= 10 ? time : "0" + time;
}

export { playSound, formatTime };
