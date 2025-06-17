import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { scene } = useGLTF("/models/sorete2.glb");
  return <primitive object={scene} {...props} />;
}