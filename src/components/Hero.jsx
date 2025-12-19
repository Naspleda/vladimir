import { useEffect, useState } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <>
      <div
        className={`hero-text text-center pt-20 font-bold tracking-tight font-title tracking-wider transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
          }`}
      >
        <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-3xl md:text-6xl lg:text-6xl">
          Kremlin Trading
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]">
          QUANTUM TECHNOLOGIES
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#ffda9b] to-[#bd8321] bg-clip-text text-transparent text-2xl md:text-5xl lg:text-3xl tracking-[0.2em]">
          Work in progress...
        </span>
      </div>
    </>
  );
}