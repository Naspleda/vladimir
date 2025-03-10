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

    // const canvas = {
    //     'position': 'absolute',
    //     'width': '80%',
    //     'height': '100%',
    //     'top': '1000px'
    // }

    const description = 'Join the future of trading with our state-of-the-art bot trading platform. Our advanced algorithms and AI-driven strategies ensure you stay ahead of the market, maximizing your profits with minimal effort. Experience seamless, automated trading like never before. Sign up today and take control of your financial future with confidence.'


    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* <MouseMoveEffect /> */}
            {/* Fondo */}
            {/* <img src={bgGradient} alt="Background Image" className="absolute inset-0 object-cover object-center w-full h-full z-0"/> */}
            <Scene></Scene>
            {/* Gear Giratorio */}
            <div className="absolute inset-0 size-full isolate">
                {/* <img
                    src={gear_second}
                    alt=""
                    className="absolute inset-0 object-cover w-[40%] h-[90%] justify-self-center
                    animate-[spin_70s_linear_infinite]
                    opacity-[0.7]
                    origin-center
                    !overflow-visible"
                /> */}
            </div>
            {/* Cards */}
            {/* <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                <div className="w-full mx-auto  flex flex-col lg:flex-row md:flex-row justify-between gap-4">
                    <div className='break-inside-avoid-column'>
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                    <div className='break-inside-avoid-column'>
                        <GoldCard title="Kremlin Trading" description={description}></GoldCard>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Home;