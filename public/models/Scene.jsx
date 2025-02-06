import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";

function Scene() {
  const [rotationY, setRotationY] = useState(0);
  
  // Configuración de sensibilidad del scroll
  const scrollSensitivity = 0.001;

  useEffect(() => {
    const handleWheel = (e) => {
      // Actualiza la rotación basada en el scroll
      setRotationY(prev => {
        const newValue = prev + e.deltaY * scrollSensitivity;
        // Limita la rotación entre -180 y 180 grados (en radianes)
        return Math.max(-Math.PI, Math.min(Math.PI, newValue));
      });
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={10} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Modelo con rotación controlada por scroll */}
      <Model 
        scale={2.5}
        position={[0, -1, 0]}
        rotation={[0, rotationY, 0]} // Rotación en el eje Y
      />
      
      {/* Desactivamos OrbitControls para usar solo el scroll */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default Scene;