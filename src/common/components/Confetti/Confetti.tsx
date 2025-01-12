import { useWindowSize } from "@/common/hooks";
import ConfettiLib from "react-confetti";

const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <ConfettiLib
      width={width}
      height={height}
      numberOfPieces={1000}
      recycle={false}
    />
  );
};

export { Confetti };
