const playSound = (src: string) => {
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

export { playSound };
