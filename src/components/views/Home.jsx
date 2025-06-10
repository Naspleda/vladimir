import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";


function Home({ startScene = false }) {
    

    return (
        <div className="relative h-screen w-full min-h-screen
        ">
            {/* <MouseMoveEffect /> */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="h-[100%] w-full mx-auto  flex flex-col lg:flex-row md:flex-row justify-between gap-4">
                    <Scene />
                    <div className="h-[80%] w-full flex items-end justify-center text-center px-4 pb-12 z-[60]">
                        <ButtonBorder title="Enter" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 inset-x-0 flex justify-center">
            </div>
        </div>
    )
}

export default Home;