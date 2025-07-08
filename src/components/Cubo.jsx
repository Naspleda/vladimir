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
    <>

    {/* LUZ DE TECHO */}
    <mesh ref={meshRef}
         position={[0, 0.71, -0.99]}
         scale={[0.30, 0.4, 0.30]}
    >
      <cylinderGeometry args={[1.47, 1.47, 0.55, 32]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

    {/* RECTANGULO HORIZONTAL */}
    <mesh
         position={[0, -0.2, -0.15]}
    >
      <boxGeometry args={[2.4, 0.35, 0.5]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

    {/*  ADELANTE DERECHA */}
    <mesh ref={meshRef}
         position={[0.94, 0.25, -0.05]}
         scale={[0.30, 0.4, 0.35]}
    >
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

     {/*  ADELANTE IZQUIERDA */}
    <mesh ref={meshRef}
         position={[-0.94, 0.25, -0.05]}
         scale={[0.30, 0.4, 0.35]}
    >
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

    {/* ATRAS DERECHA */}
    <mesh ref={meshRef}
         position={[0.94, 0.25, -1.923]}
         scale={[0.30, 0.4, 0.35]}
    >
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

    {/* ATRAS IZQUIERDA */}
    <mesh ref={meshRef}
         position={[-0.94, 0.25, -1.923]}
         scale={[0.30, 0.4, 0.35]}
    >
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial 
        color={"orange"} 
        emissive={"orange"} 
        emissiveIntensity={0.8}
        toneMapped={false}
        />
    </mesh>

    
    </>
  );
}
