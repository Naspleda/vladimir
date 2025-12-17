import React, { useRef, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Custom Shader Material ---
const MaskShaderMaterial = shaderMaterial(
    {
        uRadius: 0.0, // Initial radius (closed or very small)
        uEdgeColor: new THREE.Color('rgba(6, 19, 56, 1)'), // Neon Blue
        uResolution: new THREE.Vector2(1, 1), // Screen aspect ratio correction
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0); // Draw directly in clip space (full screen)
    }
  `,
    // Fragment Shader
    `
    uniform float uRadius;
    uniform vec3 uEdgeColor;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      // Normalize UVs to be centered (-0.5 to 0.5)
      vec2 st = vUv - 0.5;
      
      // Correct aspect ratio so the circle isn't oval
      st.x *= uResolution.x / uResolution.y;

      // Calculate distance from center
      float dist = length(st);

      // --- Mask Logic ---
      // We want opacity=1 (black) when dist > radius
      // We want opacity=0 (transparent) when dist < radius
      
      // Smooth edge for the mask
      float edgeWidth = 0.02;
      float alpha = smoothstep(uRadius, uRadius + edgeWidth, dist);

      // --- Glowing Edge Logic ---
      // Create a thin band right at the radius boundary
      float glow = 1.0 - smoothstep(0.0, 0.05, abs(dist - uRadius));
      vec3 glowColor = uEdgeColor * glow * 2.0; // Boost intensity

      // Final Color
      // Base color is black (0,0,0)
      // When alpha is 1 (outside), we see black
      // When alpha is 0 (inside), we see transparent
      // We add the glow on top
      
      vec3 finalColor = glowColor;

      gl_FragColor = vec4(finalColor, alpha); // Use alpha for transparency
    }
  `
);

extend({ MaskShaderMaterial });

const MaskOverlay = ({ onRevealStart, onRevealComplete }) => {
    const materialRef = useRef();
    const { viewport, size } = useThree();

    const [revealing, setRevealing] = useState(false);
    const radius = useRef(0.15); // Start with a small peephole

    const handleReveal = () => {
        if (!revealing) {
            setRevealing(true);
            if (onRevealStart) onRevealStart();
        }
    };

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Update Resolution uniform
            materialRef.current.uResolution.set(size.width, size.height);

            if (revealing) {
                // Animate radius expansion
                // Target: enough to cover corners. For aspect ratio 16:9, ~1.0 is safe but let's go 1.5
                const target = 1.5;
                const speed = 1.5; // Adjustable speed

                radius.current = THREE.MathUtils.lerp(radius.current, target, delta * speed);

                // Completion check
                if (radius.current > 1.4) {
                    if (onRevealComplete) onRevealComplete();
                }
            }

            materialRef.current.uRadius = radius.current;
        }
    });

    return (
        <>
            <mesh onClick={handleReveal} renderOrder={1}>
                {/* Full screen plane */}
                <planeGeometry args={[2, 2]} />
                {/* @ts-ignore */}
                <maskShaderMaterial
                    ref={materialRef}
                    transparent
                    depthTest={false}
                    uEdgeColor="#244393"
                />
            </mesh>

            {/* HTML Text Overlay */}
            {!revealing && (
                <Html center position={[0, -0.2, 0]} pointerEvents="none">
                    <div className="flex flex-col items-center gap-2 animate-pulse whitespace-nowrap">
                        <span className="text-white font-bold tracking-[0.2em] text-sm md:text-lg drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">
                            CLICK TO START
                        </span>
                        {/* Sound Icon placeholder */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                    </div>
                </Html>
            )}
        </>
    );
};

export default MaskOverlay;
