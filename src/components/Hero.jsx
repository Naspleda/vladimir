import { useEffect } from "react";
import { animate } from "motion";

import Typewriter from "./Typewriter";

export function Hero() {
  useEffect(() => {
    const controls = animate(
      ".hero-text",
      { opacity: [0, 1], y: [-50, 0] },
      { duration: 1.5, easing: "ease-out" }
    );
    // controls.finished.then(() => {
    //   if (onComplete) onComplete();
    // });
    return () => controls.stop();
  },);

return (
  <>
  <div className="z-[99999] opacity-[10%]">
    <h1>Soy un idiota</h1>
  </div>
  <div className="hero-text text-center pt-20  font-bold tracking-tight font-title tracking-wider">
    <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-3xl md:text-6xl lg:text-6xl">
      <Typewriter
        text="W0RK IN PROGRESS..."
        speed={500}
        className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]"
      />
    </span>
    <br/>
    <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]">
    {/* QUANTUM TECHNOLOGIES */}
    </span>
    {/* <br />
     <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]">
      Work in progress...
    </span> */}
  </div>
  </>
  );
}