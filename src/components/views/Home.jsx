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

// 1. Estructura de datos centralizada para los puntos de interés
const pointsOfInterest = [
  {
    id: 'point1',
    buttonPosition: "md:bottom-[55%] md:right-[65%] z-0",
    cardPosition: "md:bottom-12 md:left-6 z-0",
    cardClassName: "w-full",
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
      imageUrl: RefImage, // Reemplazar con imagen específica si se desea
      gradientColors: {
        primary: 'bg-purple-700',
        secondary: 'bg-blue-600'
      }
    }
  },
  {
    id: 'point2',
    buttonPosition: "md:bottom-[70%] md:right-[42%] z-0",
    cardPosition: "md:bottom-12 md:left-6 z-0",
    cardClassName: "w-full",
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
      imageUrl: LocalImage, // Reemplazar con imagen específica si se desea
      gradientColors: {
        primary: 'bg-emerald-600',
        secondary: 'bg-cyan-500'
      }
    }
  },
  {
    id: 'point3',
    buttonPosition: "md:bottom-[38%] md:right-[37%] z-0",
    cardPosition: "md:bottom-12 md:right-6",
    cardClassName: "w-full",
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
      imageUrl: LocalImage, // Reemplazar con imagen específica si se desea
      gradientColors: {
        primary: 'bg-orange-600',
        secondary: 'bg-red-500'
      }
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
    triggerCameraAnimation, // Añadir trigger
  } = useSceneControls();

  // 2. Única función para manejar clics en los botones
  const handlePointClick = (point) => {
    const { cameraConfig, id } = point;
    
    // Si la card activa es la misma que la clickeada, la cerramos. Si no, activamos la nueva.
    const nextActiveCard = activeCard === id ? null : id;
    
    setActiveCard(nextActiveCard);

    if (nextActiveCard) {
      // Movemos la cámara a la posición del punto de interés
      setFov(cameraConfig.fov);
      setAzimuthDeg(cameraConfig.azimuth);
      setPolarDeg(cameraConfig.polar);
      setRadius(cameraConfig.radius);
      setTarget(cameraConfig.target);
      setDuration(cameraConfig.duration);
      // ¡Disparamos la animación!
      triggerCameraAnimation({ target: cameraConfig.target, timestamp: Date.now() });
    } else {
      // Opcional: Volver a la posición inicial cuando se cierra una card
      setFov(50);
      setAzimuthDeg(0);
      setPolarDeg(75);
      setRadius(5);
      setTarget({ x: 0, y: 0.35, z: 0 });
      setDuration(1.5);
    }
  };

  // 3. Encontrar el contenido de la card activa
  const activePointData = pointsOfInterest.find(p => p.id === activeCard);

  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full bg-black/60">
        {/* Fondo y Blur */}
        <div aria-hidden className="absolute inset-0 z-10 pointer-events-none" />

        {/* Contenido */}
        <div className="relative z-20 h-full w-full">
          {/* Header */}
          <Header />

          {/* Botones Mobile - En fila debajo del título */}
          <div className="absolute top-28 inset-x-0 flex justify-center gap-4 z-30 md:hidden">
            {pointsOfInterest.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => handlePointClick(point)}
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

          {/* 4. Renderizar la ContextCard si hay un punto activo */}
          {activePointData && (
            <div className={`absolute translate-y-[-120%] md:${activePointData.cardPosition} max-w-6xl m-4`}>
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

          {/* 5. Renderizar los botones dinámicamente */}
          {pointsOfInterest.map((point) => (
            <div key={point.id} className={`absolute ${point.buttonPosition}`}>
              <button
                type="button"
                onClick={() => handlePointClick(point)}
                className={`border-2 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center transition-all duration-300 ${activeCard === point.id ? 'bg-blue-800 text-white border-blue-300' : 'text-blue-300 border-blue-300'}`}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span className="sr-only">Botón para {point.cardContent.title}</span>
              </button>
            </div>
          ))}

          {/* Footer con logos */}
          <div className="absolute bottom-0 inset-x-0 h-8 md:h-16 flex items-center justify-center space-x-8 md:space-x-32 ">
            <img src={BinanceLogo} alt="Binance Logo" className="h-4 md:h-6 w-auto text-shadow-lg" />
            <img src={BingxLogo} alt="BingX Logo" className="h-4 md:h-6 w-auto" />
            <img src={BitgetLogo} alt="Bitget Logo" className="h-4 md:h-6 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
