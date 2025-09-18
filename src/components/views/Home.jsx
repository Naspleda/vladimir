import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";
import { Effect } from "../animate-ui/primitives/effects/effect";
import LocalImage from "../../assets/images/blue_bg.png";
// import { Mouse } from "lucide-react";

function Home() {

  const containerStyle = {
    backgroundImage: `url(${LocalImage})`, // Using template literals for dynamic URL
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    height: '100vh', // Example: full viewport height
    width: '100vw', // Example: full viewport width
  };


  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div style={containerStyle} className="h-[100%] w-full mx-auto flex flex-col lg:flex-row md:flex-row justify-between gap-4 bg-gradient-to-b from-[#00011e] to-[#000000] relative">
        <div className="text-[red] absolute top-4 left-4 z-20">
          {/* <MouseMoveEffect /> */}
          <div  className="">

          </div>
          <div className="text-white">lorem
            <>
              <Effect
                delay={1500}
                blur
                slide
                fade
                zoom
                className="px-6 py-4 bg-blur max-w-[500px]"
              >


                KremlinTrading es una plataforma de trading algorítmico que conecta automáticamente con múltiples exchanges disponibles (Binance, BingX y Bitget) para ejecutar estrategias de futuros en criptomonedas con máxima precisión y velocidad.

                🤖 Detrás del sistema hay un núcleo reservado de analistas, matemáticos y traders que han desarrollado tácticas propias, probadas en entornos reales. Las estrategias no se explican: se activan. Tu único rol es decidir cuándo quieres formar parte.
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