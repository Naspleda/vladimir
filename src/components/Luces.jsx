import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import useSceneControls from '../store/useSceneControls';

// Posiciones de las ventanas
const windowPositions = [
  [0.94, 0.09, -0.05],   // ADELANTE DERECHA
  [-0.94, 0.09, -0.05],  // ADELANTE IZQUIERDA
  [0.94, 0.09, -1.923],  // ATRAS DERECHA
  [-0.94, 0.09, -1.923]  // ATRAS IZQUIERDA
];

export function Luces() {
  const meshRef = useRef();
  const { kremlinAnimationFinished } = useSceneControls();


  return (
    <>

    {/* Mapeo de las ventanas para crear los meshes */}
    {windowPositions.map((position, i) => (
      <mesh key={i} position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial
          color={"orange"}
          emissive={"orange"}
          emissiveIntensity={kremlinAnimationFinished ? 0.8 : 0}
          toneMapped={false}
        />
        <pointLight
        color="orange"
        intensity={kremlinAnimationFinished ? 0.2 : 0}
        distance={1}
        position={[0, 0, 0.2]} // La luz apunta hacia arriba
      />
      </mesh>
      
    ))}

    {/* CIRCULO DE LUZ */}
    <mesh position={[0, 0.60, -0.99]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.45, 32]} />
      <meshStandardMaterial
        color={"orange"}
        emissive={"orange"}
        emissiveIntensity={kremlinAnimationFinished ? 0.8 : 0}
        toneMapped={false}
      />
      <pointLight
        color="orange"
        intensity={kremlinAnimationFinished ? 1 : 0}
        distance={5}
        position={[0, 0, 0.2]} // La luz apunta hacia arriba
      />
    </mesh>
    </>
  );
}
