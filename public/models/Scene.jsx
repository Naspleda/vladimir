// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, MeshReflectorMaterial, ContactShadows } from "@react-three/drei";
import { Model } from "./Model";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { animate } from "motion";

import Ground from "../../src/components/Ground";
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

      <ambientLight intensity={0.1} castShadow/>
      <directionalLight
        position={[mousePosition.x, mousePosition.y, 100]} // Aumenté la distancia para cubrir más área
        color="white"
        intensity={1.5} // Un poco más de intensidad para sombras más notorias
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500} // Aumentado para asegurar que el castillo esté dentro del frustum
        shadow-camera-left={-100} // Aumentado para cubrir el ancho del castillo
        shadow-camera-right={100} // Aumentado para cubrir el ancho del castillo
        shadow-camera-top={100} // Aumentado para cubrir la altura del castillo
        shadow-camera-bottom={-100} // Aumentado para cubrir la altura del castillo
        shadow-bias={-0.001} // Ayuda a prevenir artefactos en las sombras
      />

         {/* <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} /> */}

      <Model 
      castShadow
        scale={1.5}
        position={[0, -25, -80]} // x, y, z (horinzontal, vertical, distancia)
        // rotation={[0, rotationY, 0]} // Rotación en el eje Y // cambiar 2do param a rotationY para la rotar con scroll
      />

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