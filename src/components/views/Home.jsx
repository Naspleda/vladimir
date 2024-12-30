import { useState } from "react";
import { AuroraBackgroundDemo } from "../auroraBackground/auroraBackgroundComponent";
import { ThreeDCardDemo } from "../ThreeD-Card/3d-cardComponent";
import { InfiniteMovingCardsDemo } from "../movingCards/movingCardComponent";
import { BackgroundBeamsDemo } from "../backgroundBeams/backgroundBeamsComponent";
import { VortexDemo } from "../vortexBackground/vortexBackgroundComponent";

function Home() {
    const [darkMode, setDarkMode] = useState(false);

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

    const principal = {
        height: '100vh',
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // flexDirection: 'column',
        
    }


    return (
        <div style={principal}>
            {/* <AuroraBackgroundDemo></AuroraBackgroundDemo> */}
            {/* <BackgroundBeamsDemo></BackgroundBeamsDemo> */}
            <VortexDemo></VortexDemo>
            <div className=" bg-gray-100 dark:bg-gray-900">
                <button
                onClick={toggleDarkMode}
                className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <div>
                <InfiniteMovingCardsDemo></InfiniteMovingCardsDemo>
                </div>

                <div className="container columns-3 mx-auto" >
                    <div className='break-inside-avoid-column mx-auto max-w-full'>
                        <ThreeDCardDemo title="titulo"></ThreeDCardDemo>
                    </div>
                    <div className='break-inside-avoid-column mx-auto max-w-full'>
                        <ThreeDCardDemo></ThreeDCardDemo>
                    </div>
                    <div className='break-inside-avoid-column mx-auto max-w-full'>
                        <ThreeDCardDemo></ThreeDCardDemo>
                    </div>
                </div>
            </div>
                {/* </LanternEffect> */}
        </div>
    )
}

export default Home;