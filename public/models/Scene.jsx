// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useThree } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { animate } from "motion";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';


import Ground from "../../src/components/Ground";
import GradientBackground from '../../src/components/GradientBackground';
// import { Effects } from "../../src/components/Effects";

export function CameraAnimation({ from, to, duration = 5 }) {
  const { camera } = useThree();

  useEffect(() => {
    // Coloca la cámara en la posición "from" al inicio
    camera.position.set(...from);
    camera.lookAt(0, -25, -80); // ajusta el target si lo necesitas

    // Anima a la posición "to" en `duration` segundos
    const controls = animate(
      camera.position,
      { x: to[0], y: to[1], z: to[2] },
      {
        duration,
        easing: 'ease-out',
        onUpdate: () => camera.updateProjectionMatrix(),
      }
    );
    return () => controls.stop();
  }, [camera, from, to, duration]);

  return null; // no renderiza nada
}

CameraAnimation.propTypes = {
  from: PropTypes.array.isRequired,
  to: PropTypes.array.isRequired,
  duration: PropTypes.number,
};

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
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        // paddingTop: '200px',
        zIndex: 0, // Asegura que el canvas esté detrás de otros elementos
      }}
      camera={{ position: [0, 60, 300], fov: 15 }}
      shadows
      >

      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[mousePosition.x, mousePosition.y, 100]}
        intensity={0.5}
        color="white"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.001}
      />

         {/* <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} /> */}
      <EffectComposer>
        <Bloom 
        intensity={0.1} 
        luminanceThreshold={0.9} 
        luminanceSmoothing={0.5} 
        kernelSize={1}
        height={2000} />
        <Model 
        castShadow
          scale={1.5}
          position={[0, -25, -80]} // x, y, z (horinzontal, vertical, distancia)
          // rotation={[0, rotationY, 0]} // Rotación en el eje Y // cambiar 2do param a rotationY para la rotar con scroll
        />
      </EffectComposer>

      {/* <GradientBackground /> */}
      <Ground />
    
      <OrbitControls
        makeDefault
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={4.0}
        rotateSpeed={0.4}
        minPolarAngle={1} // Límite inferior de rotación vertical (0 grados)
        maxPolarAngle={Math.PI / 2} // Límite superior de rotación vertical (90 grados)
        minAzimuthAngle={-Math.PI / 4} // Límite izquierdo de rotación horizontal (-45 grados)
        maxAzimuthAngle={Math.PI / 4} // Límite derecho de rotación horizontal (45 grados)
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export default Scene;