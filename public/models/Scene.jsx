// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { CubeCamera, Environment, Float, OrbitControls, PerspectiveCamera, Backdrop } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { animate } from "motion";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Model } from "./Model";


import Ground from "../../src/components/Ground";
import GradientBackground from '../../src/components/GradientBackground';
import { Kremlin } from "./Kremlin";
import { text } from "framer-motion/client";
import { texture } from "three/tsl";
import { FloatingGrid } from "../../src/components/FloatingGrid";
import { Luces } from "../../src/components/Luces";
// import { Effects } from "../../src/components/Effects";

// export function CameraAnimation({ from, to, duration = 5 }) {
//   const { camera } = useThree();

//   useEffect(() => {
//     // Coloca la cámara en la posición "from" al inicio
//     camera.position.set(...from);
//     camera.lookAt(0, -25, -80); // ajusta el target si lo necesitas

//     // Anima a la posición "to" en `duration` segundos
//     const controls = animate(
//       camera.position,
//       { x: to[0], y: to[1], z: to[2] },
//       {
//         duration,
//         easing: 'ease-out',
//         onUpdate: () => camera.updateProjectionMatrix(),
//       }
//     );
//     return () => controls.stop();
//   }, [camera, from, to, duration]);

//   return null; // no renderiza nada
// }

// CameraAnimation.propTypes = {
//   from: PropTypes.array.isRequired,
//   to: PropTypes.array.isRequired,
//   duration: PropTypes.number,
// };

function Scene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalizar las coordenadas del mouse de -1 a 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Escalar para obtener posiciones de luz más dramáticas
      setMousePosition({
        x: x * 20, // Ajusta el multiplicador según necesites
        y: y * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas 
      shadows
      >

      {/* <directionalLight
        castShadow
        position={[mousePosition.x, mousePosition.y, 100]}
        intensity={0.5}
        color="#white" //#0267fd
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.001}
      /> */}
      
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[0, 2, 5]} />

      <color args={[0, 0, 0]} attach={"background"} />
      {/* <ambientLight intensity={0.5} /> */}

      <CubeCamera resolution={256} frames={Infinity} >
      {(texture) => (
        <>
        <Environment map={texture} />
        <Kremlin />
        </>
      )}
      </CubeCamera>

      {/* <Backdrop castShadow floor={3} position={[0, -1.9, -3]} scale={[50, 10, 4]}>
        <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
      </Backdrop> */}
      <Luces />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.1}
          intensity={0.5}
        />
      </EffectComposer>

      <Ground />
      <FloatingGrid />

      {/* LUCES BASE */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={10.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={20}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 3]}
        castShadow
        shadow-bias={-0.0001}
      />
      <hemisphereLight 
        position={[0, -1, 0]}
        skyColor="white" 
        groundColor="black" 
        intensity={1} 
      />
      
      {/* LUCES CUSTOM */}
      {/* <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1000}
        angle={0.8}
        penumbra={0.5}
        position={[10, 5, -30]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1000}
        angle={0.8}
        penumbra={0.5}
        position={[0, 5, 30]}
        castShadow
        shadow-bias={-0.0001}
      /> */}
      
    </Canvas>
  );
}

export default Scene;