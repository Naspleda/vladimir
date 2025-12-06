import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"; // Agregamos ContactShadows
import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MetallicKremlin } from "./MetallicKremlin";
// import { Luces } from "../Luces"; // Vamos a reemplazar esto por luces más eficientes aquí mismo
import useSceneControls from "../../store/useSceneControls";

import CameraTransitioner from "../CameraTransitioner";


// --- Escena ---
function Scene() {
  const controlsRef = useRef(null);
  const camRef = useRef(null);
  const { kremlinAnimationFinished } = useSceneControls();

  // Optimización de Performance para móviles
  // Detectar si es móvil para bajar calidad si es necesario (opcional)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas
        // 1. OPTIMIZACIÓN CRÍTICA: Pixel Ratio
        dpr={[1, isMobile ? 1.5 : 2]}
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
          enabled={true} // Enabled para pruebas
        />

        <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[-1, 35, 75]} />

        {/* Renderizado del Modelo */}
        {/* <Kremlin /> */}
        <MetallicKremlin />

        {/* 2. OPTIMIZACIÓN: Bloom Selectivo */}
        {/* 2. OPTIMIZACIÓN: Bloom Selectivo - Solo en Desktop */}
        {!isMobile && (
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              luminanceThreshold={1}
              mipmapBlur
              intensity={0.5}
            />
          </EffectComposer>
        )}

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

      <CameraTransitioner controlsRef={controlsRef} camRef={camRef} />
    </div>
  );
}

export default Scene;
