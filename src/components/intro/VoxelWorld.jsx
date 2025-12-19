import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Voxel Components ---

const VoxelCar = (props) => {
    return (
        <group {...props}>
            {/* Chassis */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.5, 4]} />
                <meshStandardMaterial color="#333" roughness={0.5} />
            </mesh>

            {/* Cabin */}
            <mesh position={[0, 1.25, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 1, 2]} />
                <meshStandardMaterial color="#555" roughness={0.2} metalness={0.5} />
            </mesh>

            {/* Wheels */}
            {/* FL */}
            <mesh position={[1.1, 0.4, 1.2]} castShadow>
                <boxGeometry args={[0.4, 0.8, 0.8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* FR */}
            <mesh position={[-1.1, 0.4, 1.2]} castShadow>
                <boxGeometry args={[0.4, 0.8, 0.8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* RL */}
            <mesh position={[1.1, 0.4, -1.2]} castShadow>
                <boxGeometry args={[0.4, 0.8, 0.8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* RR */}
            <mesh position={[-1.1, 0.4, -1.2]} castShadow>
                <boxGeometry args={[0.4, 0.8, 0.8]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Headlights */}
            <group position={[0, 0.6, 2.1]}>
                {/* Left Light */}
                <mesh position={[0.6, 0, 0]}>
                    <boxGeometry args={[0.4, 0.2, 0.1]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
                <spotLight
                    position={[0.6, 0, 0]}
                    angle={0.5}
                    penumbra={0.5}
                    intensity={2}
                    distance={15}
                    color="#fff"
                    cardShadow
                    target-position={[0.6, -2, 10]}
                />

                {/* Right Light */}
                <mesh position={[-0.6, 0, 0]}>
                    <boxGeometry args={[0.4, 0.2, 0.1]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
                <spotLight
                    position={[-0.6, 0, 0]}
                    angle={0.5}
                    penumbra={0.5}
                    intensity={2}
                    distance={15}
                    color="#fff"
                    castShadow
                    target-position={[-0.6, -2, 10]}
                />
            </group>
        </group>
    );
};

const VoxelTree = (props) => {
    return (
        <group {...props}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.6, 3, 0.6]} />
                <meshStandardMaterial color="#4a3c31" />
            </mesh>

            {/* Foliage - Main Block */}
            <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 2, 2.5]} />
                {/* Radioactive/Pink leaves */}
                <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={0.2} roughness={0.8} />
            </mesh>

            {/* Foliage - Top Block */}
            <mesh position={[0, 4.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 1, 1.5]} />
                <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={0.2} roughness={0.8} />
            </mesh>

            {/* Light coming from tree */}
            <pointLight position={[0, 4, 0]} distance={10} intensity={2} color="#ff0055" decay={2} />
        </group>
    );
};


const VoxelWorld = () => {
    return (
        <group>
            {/* Environment / Background */}
            <color attach="background" args={['#050510']} />
            <fog attach="fog" args={['#050510', 5, 25]} />

            {/* Floor Grid */}
            <Grid
                args={[30, 30]}
                sectionSize={1}
                sectionThickness={1}
                sectionColor="#222"
                cellColor="#111"
                fadeDistance={20}
                infiniteGrid
            />

            {/* Objects */}
            <VoxelCar position={[2, 0, 2]} rotation={[0, -0.5, 0]} />

            <VoxelTree position={[-2, 0, -2]} scale={1.5} />

            {/* Extra Ambient */}
            <ambientLight intensity={0.2} color="#ccf" />
        </group>
    );
};

export default VoxelWorld;
