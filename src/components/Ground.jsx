import React, { useEffect } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader, LinearSRGBColorSpace } from "three";

function Ground() {
     const [roughness, normal] = useLoader(TextureLoader, [
          "/textures/terrain-roughness.jpg",
          "/textures/terrain-normal.jpg"
      ]);
  
      useEffect(() => {
          [normal, roughness].forEach((t) => {
              t.wrapS = RepeatWrapping;
              t.wrapT = RepeatWrapping;
              t.repeat.set(5, 5);
      });
      normal.colorSpace = LinearSRGBColorSpace;
      }, [normal, roughness]);
  return (
    <>
      {/* Plano del suelo */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]} //0, -1.16, 0 -- ORIGINAL
        scale={1} // 0 ORIGINAL
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        {/* <meshStandardMaterial color="grey" roughness={0.1} metalness={0} /> */}
        <MeshReflectorMaterial
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[0.1, 0.1, 0.1]}
                        roughness={0.8}
                        blur={[512, 128]} // Valores de blur mucho más bajos y razonables
                        mixBlur={10} // Reducido para que el blur no sea tan extremo
                        mixStrength={50} // Reducido para que el reflejo no sea tan intenso
                        mixContrast={1}
                        resolution={512} // Reducida la resolución del reflejo
                        mirror={0}
                        depthScale={0.01}
                        minDepthThreshold={0.9}
                        maxDepthThreshold={1}
                        depthToBlurRatioBias={0.25}
                        debug={0}
                        reflectorOffset={0.2}
                    />

        {/* <ambientLight intensity={1} /> */}
      </mesh>

      {/* Pared */}
      <mesh position={[0, 14, -10]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#04182e" />
          //#04182e
      </mesh>
    </>
  )
}

export default Ground;