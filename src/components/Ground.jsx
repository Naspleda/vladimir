
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
        <planeGeometry args={[50, 50]} receiveShadow/>
        {/* <meshStandardMaterial
          color="#001f4c" //rgb(0, 47, 118)
          metalness={0.1}
          roughness={0.5}
        /> */}
        <MeshReflectorMaterial
          blur={[100, 10]}        // Reducido de [300, 30]
          resolution={512}        // Reducido de 2048
          mixBlur={1}          // Reducido de 1
          mixStrength={40}       // Reducido de 180
          roughness={0.8}        // Reducido de 1
          depthScale={0.8}       // Reducido de 1.2
          minDepthThreshold={0.2} // Reducido de 0.4
          maxDepthThreshold={1.0} // Reducido de 1.4
          color="#001f4c" // #202020
          metalness={1}

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