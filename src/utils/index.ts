const playSound = (src: string, volume: number = 100) => {
  try {
    const milliseconds = 1000;
    const interval = 2 * milliseconds;

    const audio = new Audio(src);
    audio.volume = volume / 100; // convert 0-100 to 0-1
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
