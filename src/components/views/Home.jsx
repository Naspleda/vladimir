import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";

function Home() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    const description = 'Join the future of trading with our state-of-the-art bot trading platform. Our advanced algorithms and AI-driven strategies ensure you stay ahead of the market, maximizing your profits with minimal effort. Experience seamless, automated trading like never before. Sign up today and take control of your financial future with confidence.'
    return (
        <div className="relative h-screen w-full min-h-screen
        ">
            {/* <MouseMoveEffect /> */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="h-[100%] w-full mx-auto  flex flex-col lg:flex-row md:flex-row justify-between gap-4">
                    <Scene />
                </div>
            </div>
        </div>
    )
}

function Botoncopado(){
    <>
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Start Trading!
            </span>
    </button> 
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110"><span>Hover me</span><div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div class="relative h-full w-8 bg-white/20"></div></div></button>
</>
}

export default Home;