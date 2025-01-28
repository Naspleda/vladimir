import { useState } from "react";
import { ThreeDCardDemo } from "../ThreeD-Card/3d-cardComponent";
import { HeroExample } from "../heroExample/heroExample";
import { ButtonBorder } from "../buttonBorder";
import { GoldCard } from "../ThreeD-Card/goldCard";
import bgGradient from "../../assets/img/bg_point.jpg";
import gear from "../../assets/img/gear_png.png";
import gear_second from "../../assets/img/gear_second.png";

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
            {/* Fondo */}
            <img src={bgGradient} alt="Background Image" className="absolute inset-0 object-cover object-center w-full h-full z-0"/>
            {/* Gear Giratorio */}
            <div className="absolute inset-0 size-full isolate">
                <img
                    src={gear_second}
                    alt=""
                    className="absolute inset-0 object-cover w-[40%] h-[90%] justify-self-center
                    animate-[spin_20s_linear_infinite]
                    origin-center
                    !overflow-visible"
                />
            </div>
            {/* Cards */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                <div className="columns-3 w-full mx-auto">
                    <div className='break-inside-avoid-column'>
                        {/* <ThreeDCardDemo title="titulo"></ThreeDCardDemo> */}
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                    <div className='break-inside-avoid-column'>
                        aaa
                        {/* <ThreeDCardDemo></ThreeDCardDemo> */}
                    </div>

                    <div className='break-inside-avoid-column'>
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;