
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
// import { Effects } from './Effects'
// import { Lamborghini } from './Lamborghini'

function Ground() {
  return (
    <>
      {/* Plano del suelo */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -24, -100]} //0, -1.16, 0 -- ORIGINAL
        scale={10} // 0 ORIGINAL
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#001f4c"
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Líneas de neón: un “ring” con 4 segmentos es un cuadrado, con 3 segmentos un triángulo, etc. */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -23.99, -100]} // 0, -1.159, 0 -- ORIGINAL
        scale={70}
      >
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshBasicMaterial
          color="white"
          toneMapped={false}   // para que no se apague con el post-processing
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

export default Ground;