import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";
import { Effect } from "../animate-ui/primitives/effects/effect";
import LocalImage from "../../assets/images/blue_bg.png";
import useSceneControls from "../../store/useSceneControls";
// import { Mouse } from "lucide-react";

function Home() {

  const { setFov, setAzimuthDeg, setPolarDeg, setRadius, setTarget, setDuration } = useSceneControls();

  const moveCamera = () => {
    setFov(50); //FOV
    setAzimuthDeg(45); //Azimuth
    setPolarDeg(75); //Polar
    setRadius(5); //Distancia de la cámara
    setTarget({ x: 1, y: 0.35, z: 0 }); //Position
    setDuration(3); //Duración de la animación
  };

  const containerStyle = {
    backgroundImage: `url(${LocalImage})`, // Using template literals for dynamic URL
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    height: '100vh', // Example: full viewport height
    width: '100vw', // Example: full viewport width
  };

  const buttonClass = "pointer-events-auto transform -translate-x-1/2 rounded-3xl border border-white/20 bg-white/20 backdrop-blur px-6 py-3 text-white hover:bg-white/30 transition"


  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div style={containerStyle} className="h-[100%] w-full mx-auto flex flex-col lg:flex-row md:flex-row justify-between gap-4 bg-gradient-to-b from-[#00011e] to-[#000000] relative">
        <div className="text-[red] absolute top-4 left-4 z-20">
          {/* <MouseMoveEffect /> */}
          <div  className="">

          </div>
          <Effect
            delay={1500}
            blur
            slide
            fade
            zoom
          >
            <div className="text-white bg-black/10 backdrop-blur rounded-lg border border-white/20 p-6 max-w-[600px]">
            <h1 className="bg-gradient-to-r from-pink-600 to-violet-800 text-transparent bg-clip-text font-extrabold text-1xl py-2">Science Division</h1>
            <h3 className="text-4xl pb-2">Estrategias de Traders para Traders</h3>
              <div className="text-md leading-6">
                Usamos profesionales altamente calificados que han sido entrenados con nuestros procesos para maximizar los rendimientos en Crypto
              </div>
            </div>
          </Effect>
        </div>

        {/* Contenedor de la Scene con máscara */}
        <div className="relative w-full h-full">
          <Scene />

            {/* Overlay para el botón */}
            {/* <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"> */}
              <button
                onClick={moveCamera}
                className={buttonClass}
                style={{ position: 'absolute', top: '20%', left: '45%' }}
              >
                Home
              </button>
            {/* </div> */}

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <button
                onClick={moveCamera}
                className={buttonClass}
                style={{ position: 'absolute', top: '50%', left: '30%' } }
              >
                Comenzar
              </button>
            </div>

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <button
                onClick={moveCamera}
                className={buttonClass}
                style={{ position: 'absolute', top: '60%', left: '70%' }}
              >
                Boton 3
              </button>
            </div>

        </div>
      </div>
    </div>

  )
}

export default Home;