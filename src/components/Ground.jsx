
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
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
          metalness={0.1}
          roughness={0.5}
          receiveShadow // Habilitar la recepción de sombras
        />

        {/* <ambientLight intensity={1} /> */}
      </mesh>

      {/* Líneas de neón: un “ring” con 4 segmentos es un cuadrado, con 3 segmentos un triángulo, etc. */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -23.99, -100]} // 0, -1.159, 0 -- ORIGINAL
        scale={70}
        receiveShadow
      >
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshBasicMaterial
          receiveShadow
          color="white"
          toneMapped={false}   // para que no se apague con el post-processing
        />
      </mesh>
    </>
  )
}

export default Ground;