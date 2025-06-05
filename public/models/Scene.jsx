// import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { Camera } from "./Camera";

function Scene() {

  return (
    <Canvas 
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        // paddingTop: '200px',
        zIndex: 10000, // Asegura que el canvas esté detrás de otros elementos
      }}
      camera={{ position: [0, 100, 280], fov: 15 }}>
      <Environment preset="sunset" background={false} />
      {/* <Camera 
        position={[0, 10, 85]} // x, y, z (horinzontal, vertical, distancia)
        zoomSpeed={1.0} 
        zoomDistance={0.5} 
      /> */}
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      {/* Desactivamos OrbitControls para usar solo el scroll */}

      {/* Modelo con rotación controlada por scroll */}

      <Model 
        scale={1.5}
        position={[0, -40, -50]} // x, y, z (horinzontal, vertical, distancia)
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