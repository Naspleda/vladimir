import React, { useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Kremlin() {
    const gltf = useLoader(GLTFLoader, "/models/kremlin.glb");
    const groupRef = useRef();
    const animationProgress = useRef(0);
    
    useEffect(() => {
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);
    
    useFrame((state, delta) => {
        if (animationProgress.current < 1 && groupRef.current) {
            // Incrementar el progreso (5 segundos = progreso de 0 a 1)
            animationProgress.current += delta / 5;
            animationProgress.current = Math.min(animationProgress.current, 1);
            
            // Interpolar escala (desde 0.01 hasta 0.07)
            const scale = 0.01 + (0.06 * animationProgress.current);
            groupRef.current.scale.set(scale, scale, scale);
            
            // Interpolar posición Z (desde 50 hasta 0, acercándose a la cámara)
            const posZ = -50 + (50 * animationProgress.current);
            groupRef.current.position.set(0, -1.03, posZ);
        }
    });
    
    return <primitive ref={groupRef} object={gltf.scene} />;
}