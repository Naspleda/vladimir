import gsap from "gsap";

export function Hero() {
  gsap.registerPlugin();

  // GSAP animation for the hero section
  gsap.fromTo(
    ".hero-text",
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
  );

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