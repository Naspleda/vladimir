import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function Cubo() {
  const meshRef = useRef();

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

  return (
    <mesh ref={meshRef}
         position={[0.94, 0.3, 0]}
         scale={0.2}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
      color={"orange"} 
      emissive={"orange"} 
      emissiveIntensity={2}
      toneMapped={false}
      />
    </mesh>
  );
}
