import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";
import { Effect } from "../animate-ui/primitives/effects/effect";

function Home() {
    

    return (
<div className="absolute inset-0 z-10 flex items-center justify-center">
  <div className="h-[100%] w-full mx-auto flex flex-col lg:flex-row md:flex-row justify-between gap-4 bg-gradient-to-b from-[#00011e] to-[#000000] relative"> 
    <div className="text-[red] absolute top-4 left-4 z-20">
    <div className="text-white">lorem
        <>
          <Effect
      delay={1500}
      blur
      slide
      fade
      zoom
      className="px-6 py-4 bg-red-500"
    >
      
   
            {[...Array(3)].map((_, index) => (
                <p key={index} className="mb-2 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            ))}
             </Effect>
        </>
    </div>

    </div>
    
    {/* Contenedor de la Scene con máscara */}
    <div className="relative w-full h-full">
      <Scene />
      
      {/* Overlay con gradiente para fusionar bordes */}
      {/* <div className="pointer-events-none absolute inset-0 
        bg-gradient-to-r from-[#000000] via-transparent to-[#00011e]">
      </div> */}
    </div>
  </div>
</div>

    )
}

export default Home;