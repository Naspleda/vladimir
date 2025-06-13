// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { animate } from "motion";

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

      {/* <CameraAnimation from={[0, 0, 0]} to={[0, 60, 300]} duration={4} /> */}
      <Environment preset="city" background={true} ground={true} environmentIntensity={10} backgroundIntensity={5} />
      {/* Preset must be one of: apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse */}
      
      <ambientLight intensity={0.3} />
      {/* <directionalLight position={[-5, -5, 5]} color="blue" /> */}

       <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      <hemisphereLight 
        skyColor="#lightblue" 
        groundColor="#lightyellow" 
        intensity={2.6} 
      />

      <pointLight 
        position={[-5, 5, 5]} 
        intensity={0.8} 
        distance={100}
        color="blue" 
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