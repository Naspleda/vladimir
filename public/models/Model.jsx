import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { scene } = useGLTF("/models/Castillo.glb");
  return <primitive object={scene} {...props} />;
}