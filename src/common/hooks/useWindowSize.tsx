import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
  });

  // attach a resize event to the window itself
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export { useWindowSize };
