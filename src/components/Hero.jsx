import { useEffect } from "react";
import { animate } from "motion";

export function Hero() {
  useEffect(() => {
    const controls = animate(
      ".hero-text",
      { opacity: [0, 1], y: [-50, 0] },
      { duration: 1.5, easing: "ease-out" }
    );
    return () => controls.stop();
  }, []);

return (
  <>
  <div className="hero-text text-center pt-20  font-bold tracking-tight font-title tracking-wider">
    <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-3xl md:text-6xl lg:text-6xl">
      KREMLIN TRADING
    </span>
    <br/>
    <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]">
    QUANTUM TECHNOLOGIES
    </span>
  </div>
  </>
  );
}