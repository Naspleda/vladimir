import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"; // Agregamos ContactShadows
import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import { MetallicKremlin } from "./MetallicKremlin";
import { CustomKremlin } from "./CustomKremlin";
// import { Luces } from "../Luces"; // Vamos a reemplazar esto por luces más eficientes aquí mismo
import useSceneControls from "../../store/useSceneControls";
import kremlinImg from "../../assets/images/kremlin-cycles.png";

import CameraTransitioner from "../CameraTransitioner";


// --- Escena ---
function Scene() {
  const controlsRef = useRef(null);
  const camRef = useRef(null);
  const { kremlinAnimationFinished } = useSceneControls();

  // Optimización de Performance para móviles
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check on mount and on resize
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile fallback - show static image instead of 3D
  // if (isMobile) {
  //   return (
  //     <div className="absolute w-full h-screen">
  //       <img
  //         src={kremlinImg}
  //         alt="Kremlin Trading"
  //         className="pt-[50dvh] object-cover object-center"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas
        // 1. OPTIMIZACIÓN CRÍTICA: Pixel Ratio adaptativo
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        // Desactivamos sombras por defecto (shadows={false}) porque usaremos ContactShadows
        gl={{ powerPreference: "high-performance", antialias: false }}
        style={{ background: "transparent" }}
      >

        {/* Luces Ambientales (Baratas) */}
        <ambientLight intensity={1} />

        {/* Environment reemplaza a CubeCamera para reflejos más baratos */}
        <Environment preset="night" />

        <OrbitControls
          ref={controlsRef}
          target={[0, 10.25, 0]}
          maxPolarAngle={Math.PI - 0.1}
          enableDamping
          enabled={!isMobile} // Desactivado en mobile para que no gire ni rote
          enableZoom={!isMobile}
          enableRotate={!isMobile}
          enablePan={!isMobile}
        />

        <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[-1, 35, 75]} />

        {/* Renderizado del Modelo */}
        <CustomKremlin
          isMobile={isMobile}
          scale={isMobile ? 0.55 : 1}
          position={isMobile ? [0, -8, 0] : [0, 0, 0]}
        />

        {/* 2. OPTIMIZACIÓN: Bloom Selectivo - Solo en Desktop */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            luminanceThreshold={1}
            mipmapBlur
            intensity={0.5}
          />
        </EffectComposer>

        {/* <FloatingGrid /> */}

        {/* Lógica de luces optimizada */}
        {kremlinAnimationFinished && (
          <>
            {/* EN LUGAR DE CASTSHADOW EN CADA LUZ: */}
            {/* <ContactShadows
              resolution={512}
              scale={20}
              blur={2}
              opacity={0.5}
              far={10}
              color="#000000"
            /> */}

            {/* Luces de acento (SIN castShadow) */}
            {/* La intensidad en R3F a veces requiere ajustes si no usas toneMapping correcto. 
                Si usas valores como 1000, asumo que no tienes toneMapping. */}
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={5} // Bajamos intensidad relativa
              angle={0.6}
              penumbra={1} // Penumbra 1 suaviza los bordes "gratis"
              position={[5, 5, 0]}
            // castShadow={false} -> Default
            />

            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={8}
              position={[-5, 5, 3]}
            />

            {/* Luz Principal (Rim Light) */}
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={15}
              angle={0.8}
              position={[0, 5, 10]}
            />
          </>
        )}
      </Canvas>

      <CameraTransitioner controlsRef={controlsRef} camRef={camRef} isMobile={isMobile} />
    </div>
  );
}

export default Scene;
