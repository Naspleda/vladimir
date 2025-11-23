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
import Footer from "../layout/Footer";

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
          <Header kremlinAnimationFinished={kremlinAnimationFinished} />

          {/* Escena 3D */}
          <Scene />

          {/* ContextCard con animación */}
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


          {/* Footer con logos - Con animación fade-in */}
          <Footer kremlinAnimationFinished={kremlinAnimationFinished} />
          
        </div>
      </div>
    </div>
  );
}

export default Home;