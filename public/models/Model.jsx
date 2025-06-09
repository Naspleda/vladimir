import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { scene } = useGLTF("/models/metal.glb");
  return <primitive object={scene} {...props} />;
}