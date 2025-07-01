import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Model(props) {
  const { scene } = useGLTF("/models/model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Precargar el modelo
useGLTF.preload("/models/model.glb");