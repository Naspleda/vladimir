import { useState } from "react";
import { ThreeDCardDemo } from "../ThreeD-Card/3d-cardComponent";
import { ButtonBorder } from "../buttonBorder";
import { GoldCard } from "../ThreeD-Card/goldCard";
import bgGradient from "../../assets/img/bg_point.jpg";
import gear from "../../assets/img/gear_png.png";
import gear_second from "../../assets/img/gear_second.png";
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
        <div className="relative h-screen w-full overflow-hidden">
            <MouseMoveEffect />
            {/* Fondo */}
            <img src={bgGradient} alt="Background Image" className="absolute inset-0 object-cover object-center w-full h-full z-0 opacity-[30%]"/>
            {/* <Scene></Scene> */}
            {/* Cards */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pt-32">
                <div className="w-full mx-auto  flex flex-col lg:flex-row md:flex-row justify-between gap-4 grid grid-cols-12">
                    <div className='col-span-3'>
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                    <div className='col-span-6'>
                    <Scene></Scene>
                    </div>
                    <div className='col-span-3'>
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;