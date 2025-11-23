import useSceneControls from "../../store/useSceneControls";
import ContextCard from "../ui/ContextCard";
import Scene from "../../../public/models/Scene";
import LocalImage from "../../assets/images/blue_bg_hd.png";
import BImage from "../../assets/images/blackcircle.png";
import Logo from "../../assets/images/logo1.png";
import BinanceLogo from "../../assets/images/binancelogo.png";
import BingxLogo from "../../assets/images/bingxlogo.png";
import BitgetLogo from "../../assets/images/bitgetlogo.png";
import RefImage from "../../assets/images/ref.jpg";
import Header from "../Header";

import { Effect } from "../animate-ui/primitives/effects/effect";
import { RadialNav } from "../animate-ui/components/community/radial-nav";

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
      target: { x: -1.8, y: -0.05, z: 0.8 },
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
      fov: 50,
      azimuth: 0,
      polar: 75,
      radius: 5,
      target: { x: 0, y: -0.25, z: 0 },
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
      azimuth: 15,
      polar: 75,
      radius: 5,
      target: { x: 3.8, y: 0.35, z: 1 },
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
    navItem: {
      icon: Globe,
      label: 'Mercados',
      angle: -115,
    }
  }
];


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
  } = useSceneControls();

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
      setFov(50);
      setAzimuthDeg(0);
      setPolarDeg(75);
      setRadius(5);
      setTarget({ x: 0, y: 0.35, z: 0 });
      setDuration(1.5);
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
        {/* Contenedor para centrar RadialNav */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <RadialNav 
            items={navItems}
            onActiveChange={handleNavChange}
            defaultActiveId={activeCard}
          />
        </div>
        {/* Contenido */}
        <div className="relative z-20 h-full w-full">
          {/* Header - Con animación fade-in */}
          <Effect 
            fade={{ initialOpacity: 0, opacity: 1 }}
            slide={{ direction: 'up', offset: 50 }}
            zoom={{ initialScale: 0.8, scale: 1 }}
            inView={kremlinAnimationFinished} 
            inViewOnce={true}
            delay={2500}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <Header />
          </Effect>

          {/* Botones Mobile - Con animación fade-in */}
          <div className={`absolute top-28 inset-x-0 flex justify-center gap-4 z-30 md:hidden transition-opacity duration-1000 delay-300 ${kremlinAnimationFinished ? 'opacity-100' : 'opacity-0'}`}>
            {pointsOfInterest.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => handlePointClick(point)}
                disabled={!kremlinAnimationFinished}
                className={`border-2 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center transition-all duration-300 ${activeCard === point.id ? 'bg-blue-800 text-white border-blue-300' : 'text-blue-300 border-blue-300'}`}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span className="sr-only">Botón para {point.cardContent.title}</span>
              </button>
            ))}
          </div>

          {/* Escena 3D */}
          <Scene />

          {/* 4. ContextCard con animación */}
          {activePointData && kremlinAnimationFinished && (
            <div className={`absolute translate-y-[-120%] md:${activePointData.cardPosition} max-w-6xl m-4 animate-fade-in`}>
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
          )}

          {/* 5. Botones desktop - Con animación fade-in escalonada */}
          {pointsOfInterest.map((point, index) => (
            <div 
              key={point.id} 
              className={`absolute ${point.buttonPosition} transition-opacity duration-1000 ${kremlinAnimationFinished ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <button
                type="button"
                onClick={() => handlePointClick(point)}
                disabled={!kremlinAnimationFinished}
                className={`border-2 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center transition-all duration-300 ${activeCard === point.id ? 'bg-blue-800 text-white border-blue-300' : 'text-blue-300 border-blue-300'}`}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span className="sr-only">Botón para {point.cardContent.title}</span>
              </button>
            </div>
          ))}

          {/* Footer con logos - Con animación fade-in */}
          <Effect 
            fade={{ initialOpacity: 0, opacity: 1 }}
            slide={{ direction: 'down', offset: 50 }}
            zoom={{ initialScale: 0.8, scale: 1 }}
            inView={kremlinAnimationFinished} 
            inViewOnce={true}
            delay={2500}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className={`absolute bottom-0 inset-x-0 h-8 md:h-16 flex items-center justify-center space-x-8 md:space-x-32 transition-opacity duration-1000 delay-500 ${kremlinAnimationFinished ? 'opacity-100' : 'opacity-0'}`}>
              <img src={BinanceLogo} alt="Binance Logo" className="h-4 md:h-6 w-auto text-shadow-lg" />
              <img src={BingxLogo} alt="BingX Logo" className="h-4 md:h-6 w-auto" />
              <img src={BitgetLogo} alt="Bitget Logo" className="h-4 md:h-6 w-auto" />
            </div>
          </Effect>
          
        </div>
      </div>
    </div>
  );
}

export default Home;