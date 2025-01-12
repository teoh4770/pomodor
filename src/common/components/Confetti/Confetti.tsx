import { useWindowSize } from "@/common/hooks";
import ConfettiLib from "react-confetti";

const Confetti = () => {
  const { width, height } = useWindowSize();

  return <ConfettiLib width={width} height={height} recycle={false} />;
};

export { Confetti };
