import { ButtonBorder } from "../buttonBorder";
import Scene from "../../../public/models/Scene";
import MouseMoveEffect from "../mouseMoveEffect";
import { Effect } from "../animate-ui/primitives/effects/effect";
import LocalImage from "../../assets/images/blue_bg_hd.png";
import Logo from "../../assets/images/logo1.png";
import useSceneControls from "../../store/useSceneControls";
// import { Mouse } from "lucide-react";

function Home() {

  const { setFov, setAzimuthDeg, setPolarDeg, setRadius, setTarget, setCameraPosition, setCameraTarget, setDuration, triggerCameraAnimation } = useSceneControls();

  const showButton1 = useSceneControls(s => s.showButton1);
  const button1Visible = useSceneControls(s => s.button1Visible);

  const moveCamera = () => {
    console.log("Move Camera");

    setFov(50); //FOV
    setAzimuthDeg(45); //Azimuth
    setPolarDeg(75); //Polar
    setRadius(5); //Distancia de la cámara
    setTarget({ x: 1, y: 0.35, z: 0 }); //Position
    setDuration(1); //Duración de la animación
    triggerCameraAnimation({ x:1, y: 0.35, z:0 });

    showButton1();
  };

  const moveCameraInitial = () => {
    console.log("Move Camera Initial");

    setFov(50);
    setAzimuthDeg(0);
    setPolarDeg(75);
    setRadius(5);
    setTarget({ x: 0, y: 0.35, z: 0 });
    setDuration(1); //Duración de la animación
    setCameraPosition([0, 2, 5]);
    setCameraTarget([0, 0, 0]);
    triggerCameraAnimation({ x:0, y: 0.35, z:0 });

    showButton1();
  }

  const containerStyle = {
    backgroundImage: `url(${LocalImage})`, // Using template literals for dynamic URL
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    height: '100vh', // Example: full viewport height
    width: '100vw', // Example: full viewport width
  };

  const prueba = "inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-2xl font-semibold tracking-wide text-white bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 ring-1 ring-white/10 shadow-lg transition-colors duration-200 hover:ring-white/20 hover:shadow-xl active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/60"

  const prueba1 = "transition inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold tracking-wide text-white bg-[radial-gradient(120%_160%_at_50%_-20%,#0B2540_0%,#071A30_55%,#061426_100%)] ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,120,255,0.35)] transition-all duration-200 hover:ring-white/20 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_14px_38px_-12px_rgba(0,120,255,0.45)] active:scale-[0.18]"

  const buttonClass = "pointer-events-none transform rounded-md border border-white/20 bg-white/5 backdrop-blur px-5 py-1 text-white hover:bg-white/30 transition"

  const text1 = "Nuestro núcleo reservado, el ScienceDivision, es una célula de analistas, matemáticos y traders que desarrollan tácticas propias, probadas en escenarios reales.";

  const text2 = "No explicamos teorías: activamos estrategias que combinan estadística avanzada, trading algorítmico y experiencia de campo. Aquí la matemática se convierte en poder, y tu rol es decidir cuándo ser parte.";

return (
  <div className="absolute inset-0">
    <div className="relative h-full w-full">
      {/* Fondo */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${LocalImage})` }}
      />

      {/* Blur general */}
      <div aria-hidden className="snow absolute inset-0 z-10 pointer-events-none backdrop-blur-2xl bg-black/25" />

      {/* Contenido */}
      <div className="relative z-20 h-full">

        {/* Header: logo (izq) + menú (centrado) */}
        <header className="absolute top-0 inset-x-0 h-16">
          <div className="relative h-full flex items-center justify-center">
            {/* Logo */}
            <div className="absolute left-6 top-[3.5rem] -translate-y-1/2">
              <div className="px-3 py-1 rounded-full text-white/90 backdrop-blur text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-100 to-yellow-500 bg-clip-text text-transparent">Kremlin Trading</h1>
                <h1 className="text-2xl">Science Division</h1>
              </div>
            </div>

            <div className="absolute right-6 top-4">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </div>

            {/* Menú centrado */}
            {/* <nav className="rounded-full bg-white/10 border border-white/20 backdrop-blur px-4 py-2">
              <ul className="flex items-center gap-48 text-sm text-white/90">
                <li><button className="hover:text-white transition">Home</button></li>
                <li><button className="hover:text-white transition">Servicios</button></li>
                <li><button className="hover:text-white transition">Sobre Nosotros</button></li>
                <li><button className="hover:text-white transition">Contacto</button></li>
              </ul>
            </nav> */}
          </div>
        </header>

        {/* Escena (edificio) como elemento principal */}
        <div className="relative w-full h-full">
          <Scene />

          {/* Título + descripción debajo del edificio */}
          {/* <div className="absolute left-1/2 top-[80%] -translate-x-1/2 w-full max-w-3xl text-center px-6">
            <h2 className="text-white md:text-4xl font-bold leading-tight">
              Maximiza tus Inversiones en Cripto
            </h2>
            <p className="mt-3 text-white/80 text-base md:text-lg">
              Ofrecemos estrategias de trading de alta precisión desarrolladas por expertos.
            </p> */}

            {/* CTA principal dorado */}
            {/* <div className="mt-6">
              <button
                onClick={moveCameraInitial}
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl font-semibold tracking-wide text-slate-900 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 ring-1 ring-amber-200/70 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)] transition-transform active:scale-95 hover:shadow-[0_14px_38px_-12px_rgba(245,158,11,0.75)]"
              >
                Comenzar Ahora
              </button>
            </div>
          </div> */}

          {/* Panel flotante inferior izquierdo */}
           <div className="absolute bottom-6 left-6 max-w-md">
            <div className="bg-black/30 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 text-white">
            <h1 className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent inline-block bg-clip-text font-extrabold text-1xl py-2">Science Division</h1>
              <h3 className="text-4xl font-semibold">El cerebro detrás de la máquina</h3>
              <p className="mt-1 text-white/80">
                {text1}
              </p>
              <br />
              <p className="mt-1 text-white/80">
                {text2}
              </p>
            </div>
          </div>

          {/* Botón flotante inferior derecho */}
          <div className="absolute bottom-[60%] right-[42%]">
            <button type="button" class="text-blue-300 border-2 border-blue-300 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>

          <div className="absolute bottom-[40%] right-[65%]">
            <button type="button" class="text-blue-300 border-2 border-blue-300 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>

          <div className="absolute bottom-[28%] right-[37%]">
            <button type="button" class="text-blue-300 border-2 border-blue-300 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>


        </div>
      </div>
    </div>
  </div>
);
}

export default Home;