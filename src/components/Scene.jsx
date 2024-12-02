import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Para controlar la cámara
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/models/phoenix_bird.glb'); // Cambia la ruta del modelo
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    modelRef.current.position.y = Math.sin(time) * 10; // Ajusta la amplitud del movimiento
  });

  return <primitive ref={modelRef} object={gltf.scene} scale={0.1} />;
};

const Scene = () => {
  return (
    <Canvas style={{ width: '50vw', height: '50vh' }} camera={{ position: [10, 40, -30] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 1, 5]} intensity={1} />
        <Model />
        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI} // Permite rotar completamente en el eje vertical
          minPolarAngle={0}      // Permite rotar completamente en el eje vertical
          enablePan={false} 
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
