// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { Camera } from "./Camera";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { animate } from "motion";

export function CameraAnimation({ from, to, duration = 5, play }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!play) return;
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
  }, [camera, from, to, duration, play]);

  return null; // no renderiza nada
}

function Scene({ play }) {

  return (
    <Canvas 
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        // paddingTop: '200px',
        zIndex: 50, // Asegura que el canvas esté detrás de otros elementos
      }}
      camera={{ position: [0, 60, 300], fov: 15 }}
      shadows
      >

      <CameraAnimation from={[0, 0, 0]} to={[0, 60, 300]} duration={4} play={play} />
      <Environment preset="apartment" background={false} />
      {/* Preset must be one of: apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse */}
      
      <ambientLight intensity={0.8} />
      <hemisphereLight 
        skyColor="#lightblue" 
        groundColor="#lightyellow" 
        intensity={2.6} 
      />
      <Model 
        scale={1.5}
        position={[0, -25, -80]} // x, y, z (horinzontal, vertical, distancia)
        // rotation={[0, rotationY, 0]} // Rotación en el eje Y // cambiar 2do param a rotationY para la rotar con scroll
      />

      
    
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