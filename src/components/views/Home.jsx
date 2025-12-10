import { Suspense, lazy, useEffect } from 'react';

import useSceneControls from "../../store/useSceneControls";
import ContextCard from "../ui/ContextCard";
const Scene = lazy(() => import("../3d/Scene"));
import LocalImage from "../../assets/images/blue_bg_hd.png";
import BinanceLogo from "../../assets/images/binancelogo.png";
import BingxLogo from "../../assets/images/bingxlogo.png";
import BitgetLogo from "../../assets/images/bitgetlogo.png";
import RefImage from "../../assets/images/ref.jpg";
import Header from "../Header";
import Footer2 from "../layout/Footer2";
import HeroVideo from "../../assets/video/hero-production.mp4";

import { Effect } from "../animate-ui/primitives/effects/effect";


// Importa los iconos para el RadialNav
import { BrainCircuit, Bot, Globe } from 'lucide-react';

// 1. Estructura de datos centralizada para los puntos de interés
const pointsOfInterest = [
  {
    id: 'point1',
    // ... (buttonPosition y cardPosition ya no son necesarios para los botones)
    cameraConfig: {
      fov: 50,
      azimuth: 45,
      polar: 75,
      radius: 5,
      target: { x: 20, y: 30.05, z: 75 },
      duration: 1.5,
    },
    cardContent: {
      title: "Estrategia y Análisis",
      subtitle: "El Núcleo de la Operación",
      text: "Nuestro ScienceDivision desarrolla tácticas propias, probadas en escenarios reales, combinando estadística avanzada y trading algorítmico.",
      text2: "Aquí la matemática se convierte en poder de mercado.",
      imageUrl: RefImage,
      gradientColors: {
        primary: 'bg-purple-700',
        secondary: 'bg-blue-600'
      }
    },
    // Propiedades para RadialNav
    cardPosition: 'md:top-4 md:left-4', // Posición para desktop
    navItem: {
      icon: BrainCircuit,
      label: 'Estrategia',
      angle: 115,
    }
  },
  {
    id: 'point2',
    // ...
    cameraConfig: {
      fov: 30,
      azimuth: 0,
      polar: 75,
      radius: 5,
      target: { x: 20, y: 30.05, z: 75 },
      duration: 1.5,
    },
    cardContent: {
      title: "Tecnología Propietaria",
      subtitle: "La Ventaja Algorítmica",
      text: "Utilizamos sistemas de ejecución automática y análisis de datos en tiempo real para capitalizar oportunidades antes que el resto.",
      text2: "La velocidad y la precisión son nuestra firma.",
      imageUrl: LocalImage,
      gradientColors: {
        primary: 'bg-emerald-600',
        secondary: 'bg-cyan-500'
      }
    },
    // Propiedades para RadialNav
    cardPosition: 'md:top-[50%] md:left-[20%]', // Posición para desktop
    navItem: {
      icon: Bot,
      label: 'Tecnología',
      angle: 0,
    }
  },
  {
    id: 'point3',
    // ...
    cameraConfig: {
      fov: 50,
      azimuth: -45,
      polar: 75,
      radius: 5,
      target: { x: -20, y: 30.05, z: 75 },
      duration: 1.5,
    },
    cardContent: {
      title: "Acceso al Mercado Global",
      subtitle: "Oportunidades sin Fronteras",
      text: "Nuestra infraestructura nos permite operar en los principales mercados financieros del mundo, 24/7.",
      text2: "Tu rol es decidir cuándo y dónde ser parte del juego.",
      imageUrl: LocalImage,
      gradientColors: {
        primary: 'bg-orange-600',
        secondary: 'bg-red-500'
      }
    },
    // Propiedades para RadialNav
    cardPosition: 'md:top-4 md:right-4', // Posición para desktop
    navItem: {
      icon: Globe,
      label: 'Mercados',
      angle: -115,
    }
  }
];


import { useMediaQuery } from "../../hooks/use-media-query";

// 2. Configuración inicial de la cámara
const INITIAL_CAMERA_CONFIG = {
  fov: 90,
  azimuth: 0,
  polar: 75,
  radius: 35,
  target: { x: 0, y: 10.25, z: 0 },
  duration: 1.5,
};

function Home() {
  const {
    setFov,
    setAzimuthDeg,
    setPolarDeg,
    setRadius,
    setTarget,
    setDuration,
    activeCard,
    setActiveCard,
    triggerCameraAnimation,
    kremlinAnimationFinished, // Importar el estado de la animación
    setKremlinAnimationFinished,
  } = useSceneControls();

  useEffect(() => {
    setKremlinAnimationFinished(true);
  }, [setKremlinAnimationFinished]);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const radialSize = isMobile ? 300 : 480;

  // La función handlePointClick ahora solo se encarga de aplicar los cambios
  const applyCameraAndCardState = (point) => {
    if (point) {
      // Abrir o cambiar a una nueva card
      const { cameraConfig, id } = point;
      setActiveCard(id);
      setFov(cameraConfig.fov);
      setAzimuthDeg(cameraConfig.azimuth);
      setPolarDeg(cameraConfig.polar);
      setRadius(cameraConfig.radius);
      setTarget(cameraConfig.target);
      setDuration(cameraConfig.duration);
      triggerCameraAnimation({ target: cameraConfig.target, timestamp: Date.now() });
    } else {
      // Cerrar todo y volver al estado inicial
      setActiveCard(null);
      setFov(INITIAL_CAMERA_CONFIG.fov);
      setAzimuthDeg(INITIAL_CAMERA_CONFIG.azimuth);
      setPolarDeg(INITIAL_CAMERA_CONFIG.polar);
      setRadius(INITIAL_CAMERA_CONFIG.radius);
      setTarget(INITIAL_CAMERA_CONFIG.target);
      setDuration(INITIAL_CAMERA_CONFIG.duration);
      // Trigger animation to initial state
      triggerCameraAnimation({ target: INITIAL_CAMERA_CONFIG.target, timestamp: Date.now() });
    }
  };

  // handleNavChange ahora contiene la lógica de toggle
  const handleNavChange = (id) => {
    // Si se clica el botón ya activo, se cierra.
    if (id === activeCard) {
      applyCameraAndCardState(null);
    } else {
      // Si se clica un botón nuevo (o el primero), se busca y se abre.
      const point = pointsOfInterest.find(p => p.id === id);
      applyCameraAndCardState(point);
    }
  };

  // Transforma los datos para el RadialNav
  const navItems = pointsOfInterest.map(p => ({
    id: p.id,
    ...p.navItem
  }));

  // 3. Encontrar el contenido de la card activa
  const activePointData = pointsOfInterest.find(p => p.id === activeCard);

  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full bg-black/60">
        {/* Fondo y Blur */}
        <div aria-hidden className="absolute inset-0 z-10 pointer-events-none" />

        {/* Video Background */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 pointer-events-none"
        >
          <source src={HeroVideo} type="video/mp4" />
        </video> */}



        {/* Contenido */}
        <div className="relative z-20 h-full w-full">
          {/* Header - Con animación fade-in */}
          {kremlinAnimationFinished && <Header onLogoClick={() => applyCameraAndCardState(null)} />}

          {/* Hero Text Section - Mobile */}
          {kremlinAnimationFinished && (
            <div className="absolute top-20 left-0 right-0 z-30 px-4 md:px-8 pointer-events-none">
              <div className="max-w-lg">
                {/* Título Principal */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  Precisión Algorítmica para tus Inversiones
                </h1>

                {/* Subtítulo / Descripción */}
                <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
                  Deja de mirar gráficos todo el día. Conecta tu cuenta y deja que una estrategia probada opere el mercado por ti con disciplina matemática. Sin emociones.
                </p>

                {/* Botones CTA */}
                {/* <div className="flex flex-col gap-3 pointer-events-auto max-w-[180px]">
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg">
                    Stopt on Now
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-full hover:bg-amber-400/10 transition-all duration-300">
                    Ogan Now
                  </button>
                </div> */}
              </div>
            </div>
          )}

          {/* Escena 3D */}
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          {/* <div className="absolute inset-0 flex items-center justify-center -z-10">
            <img src={KremlinStatic} alt="Metallic Kremlin" className="w-full h-full object-cover" />
          </div> */}

          {/* ContextCard con animación CSS */}
          {activePointData && kremlinAnimationFinished && (
            <div className={`fixed inset-x-4 top-[10vh] bottom-[10vh] z-40 flex items-center justify-center md:static md:block md:inset-auto md:w-auto md:h-auto`}>
              {/* Wrapper for positioning */}
              <div
                key={activePointData.id}
                className={`w-full max-h-full md:w-auto md:h-auto md:absolute md:translate-y-[-120%] md:${activePointData.cardPosition} md:max-w-6xl md:m-4 animate-in fade-in duration-200`}
              >
                {/* Inner wrapper for Scale/Spring animation simulation */}
                <div
                  className="animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out fill-mode-forwards"
                >
                  <ContextCard
                    title={activePointData.cardContent.title}
                    subtitle={activePointData.cardContent.subtitle}
                    text={activePointData.cardContent.text}
                    text2={activePointData.cardContent.text2}
                    imageUrl={activePointData.cardContent.imageUrl}
                    className={activePointData.cardClassName}
                    gradientColors={activePointData.cardContent.gradientColors}
                  />
                </div>
              </div>
            </div>
          )}


          {/* Footer con logos - Con animación fade-in */}
          {kremlinAnimationFinished && (
            <Footer2
              items={navItems}
              activeId={activeCard}
              onItemClick={handleNavChange}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default Home;