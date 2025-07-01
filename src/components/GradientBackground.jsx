import { GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

const GradientBackground = () => {
  return (
    <mesh scale={[1000, 1000, 1000]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial side={THREE.BackSide}>
        <GradientTexture
          stops={[0, 0.6, 1]} // Corresponde al 0%, 60%, 100% del CSS
          colors={['#001f4c', '#000b1a', '#000000']} // Los colores de tu clase bg-radial-center
          size={1024}
        />
      </meshBasicMaterial>
    </mesh>
  );
};

export default GradientBackground;
