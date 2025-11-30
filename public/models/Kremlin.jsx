import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";


export function Kremlin() {
    const gltf = useGLTF("/models/PruebaSol.glb");
    const groupRef = useRef();

    useEffect(() => {
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);

    useEffect(() => {
        if (groupRef.current) {
            // Set final scale and position immediately
            const scale = 0.07;
            groupRef.current.scale.set(scale, scale, scale);
            groupRef.current.position.set(0, -1.03, 0);
        }
    }, []);

    return <primitive ref={groupRef} object={gltf.scene} />;
}

useGLTF.preload("/models/CustomKremlin.glb");