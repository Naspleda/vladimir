import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Model(props) {
  const { scene } = useGLTF("/models/model.glb");

  useEffect(() => {
    // Habilitar sombras para todos los meshes del modelo
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;    // El objeto proyecta sombras
        child.receiveShadow = true; // El objeto puede recibir sombras
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Precargar el modelo
useGLTF.preload("/models/model.glb");