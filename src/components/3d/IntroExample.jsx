import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Define the custom shader material
const IntroCircleMaterial = shaderMaterial(
    {
        uProgress: 0,
        uColor: new THREE.Color("#ffffff"),
        uIntensity: 1.0,
    },
    // Vertex Shader
    `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    varying vec3 vPosition;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform float uIntensity;

    #define PI 3.1415926535897932384626433832795

    void main() {
      float angle = atan(vPosition.y, vPosition.x);
      
      // Normalize angle to 0-1 range
      float angleProgress = (angle / (2.0 * PI)) + 0.5;
      
      // Invert it
      angleProgress = 1.0 - angleProgress;

      if (uProgress < angleProgress) discard;

      gl_FragColor = vec4(uColor * uIntensity, 1.0);
    }
  `
);

extend({ IntroCircleMaterial });

const IntroExample = ({ onComplete }) => {
    const materialRef = useRef();

    // Animation state
    const progress = useRef(0);
    const completed = useRef(false);

    useFrame((state, delta) => {
        if (materialRef.current && !completed.current) {
            // Simple easing: Lerp towards 1
            // Equivalent to: value += (target - value) * factor
            // Adjust speed factor (e.g., 2.0) to control duration

            const target = 1.0;
            const speed = 2.0;

            // Linear approach (simpler to verify first)
            // progress.current = Math.min(progress.current + delta * 0.5, 1);

            // Smooth approach (Power / Ease Out)
            // Lerping is standard for "Slide into place" feel
            progress.current = THREE.MathUtils.lerp(progress.current, target, delta * speed);

            // Check for completion
            if (Math.abs(1 - progress.current) < 0.001) {
                progress.current = 1;
                completed.current = true;

                // Slight delay before calling onComplete to let the full ring show for a moment?
                // Or just call immediately. Let's call immediately for responsiveness.
                if (onComplete) onComplete();
            }

            materialRef.current.uProgress = progress.current;
        }
    });

    // Geometry: RingGeometry(radius - thickness, radius, 128, 1)
    const radius = 3.5;
    const thickness = 0.04;

    return (
        <mesh
            position={[0, 0.001, 0]}
            rotation={[-Math.PI * 0.5, 0, Math.PI * 0.5]}
        >
            <ringGeometry args={[radius - thickness, radius, 128, 1]} />
            {/* @ts-ignore */}
            <introCircleMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                uColor="#ffffff"
                uIntensity={2.0}
            />
        </mesh>
    );
};

export default IntroExample;
