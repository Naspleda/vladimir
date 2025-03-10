import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { scene } = useGLTF("/models/PruebaCopia.glb"); // Ruta relativa desde la carpeta public
  return <primitive object={scene} {...props} />;
}