import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Se define la geometria y el material una sola vez para reutilizarlos
const windowGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
const windowMaterial = new THREE.MeshStandardMaterial({
  color: "orange",
  emissive: "orange",
  emissiveIntensity: 0.8,
  toneMapped: false,
});

// Posiciones de las ventanas
const windowPositions = [
  [0.94, 0.25, -0.05],   // ADELANTE DERECHA
  [-0.94, 0.25, -0.05],  // ADELANTE IZQUIERDA
  [0.94, 0.25, -1.923],  // ATRAS DERECHA
  [-0.94, 0.25, -1.923]  // ATRAS IZQUIERDA
];

export function Luces() {
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
        emissiveIntensity={0.7}
        toneMapped={true}
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
        emissiveIntensity={0.7}
        toneMapped={true}
        />
    </mesh>

    {/* Mapeo de las ventanas para crear los meshes */}
    {windowPositions.map((position, i) => (
      <mesh
        key={i}
        geometry={windowGeometry}
        material={windowMaterial}
        position={position}
        scale={[0.30, 0.4, 0.35]}
      />
    ))}

    
    </>
  );
}
