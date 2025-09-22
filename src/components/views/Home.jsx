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

  const showButton1 = useSceneControls(s => s.showButton1);
  const button1Visible = useSceneControls(s => s.button1Visible);

  const moveCamera = () => {
    setFov(50); //FOV
    setAzimuthDeg(45); //Azimuth
    setPolarDeg(75); //Polar
    setRadius(5); //Distancia de la cámara
    setTarget({ x: 1, y: 0.35, z: 0 }); //Position
    setDuration(3); //Duración de la animación

    showButton1();
  };

  const containerStyle = {
    backgroundImage: `url(${LocalImage})`, // Using template literals for dynamic URL
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    height: '100vh', // Example: full viewport height
    width: '100vw', // Example: full viewport width
  };

  const prueba = "inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-2xl font-semibold tracking-wide text-white bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 ring-1 ring-white/10 shadow-lg transition-colors duration-200 hover:ring-white/20 hover:shadow-xl active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/60"

  const prueba1 = "transition inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-2xl font-semibold tracking-wide text-white bg-[radial-gradient(120%_160%_at_50%_-20%,#0B2540_0%,#071A30_55%,#061426_100%)] ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,120,255,0.35)] transition-all duration-200 hover:ring-white/20 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_14px_38px_-12px_rgba(0,120,255,0.45)] active:scale-[0.98]"

  const buttonClass = "pointer-events-auto transform rounded-3xl border border-white/20 bg-white/20 backdrop-blur px-5 py-1 text-white hover:bg-white/30 transition"


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
            <h1 className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent inline-block bg-clip-text font-extrabold text-1xl py-2">Science Division</h1>
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
              {button1Visible && (
                <button
                  onClick={moveCamera}
                  className={buttonClass}
                  style={{ position: 'absolute', top: '35%', left: '55%' }}
                >
                  Home
                </button>
              )}
            {/* </div> */}

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <button
                onClick={moveCamera}
                className={buttonClass}
                style={{ position: 'absolute', top: '55%', left: '30%' } }
              >
                Comenzar
              </button>
            </div>

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <button
                onClick={moveCamera}
                className={buttonClass}
                style={{ position: 'absolute', top: '65%', left: '62%' }}
              >
                Boton 3
              </button>
            </div>

            {/* <!-- Contenedor con “borde” degradado y leve glow --> */}
<div class="absolute inline-block p-[2px] rounded-2xl bg-gradient-to-br from-sky-300/20 via-cyan-400/10 to-blue-500/20 shadow-[0_0_25px_0_rgba(0,120,255,0.1)] top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
  {/* <!-- Botón --> */}
  <button
    className={prueba1}>
    Comenzar
  </button>

  <ButtonBorder title="Comenzar"  />
</div>

        </div>
      </div>
    </div>

  )
}

export default Home;