import bgGradient from '../../assets/img/bg_point.jpg';
export function HeroExample() {

return (
    <div className="relative h-screen w-full">
        <img src={bgGradient} alt="Background Image" className="object-cover object-center w-full h-full" />
        <img src="" alt="Background Image" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
             {/* <div
                   className="h-[100vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased"> */}
                   <div className="max-w-2xl mx-auto p-4 absolute justify-end">
                     <h1
                       className="relative text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-600 text-center font-sans font-bold">
                       Kremlin Trading
                     </h1>
                     <p></p>
                     <p
                       className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                     Join the future of trading with our state-of-the-art bot trading platform. Our advanced algorithms and AI-driven strategies ensure you stay ahead of the market, maximizing your profits with minimal effort. Experience seamless, automated trading like never before. Sign up today and take control of your financial future with confidence.
                     </p>
                   </div>
                 </div>
        </div>
    // </div>
);
}