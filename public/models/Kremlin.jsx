import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import useSceneControls from "../../src/store/useSceneControls";

export function Kremlin() {
    const gltf = useGLTF("/models/Untitled2.glb");
    const groupRef = useRef();
    const animationProgress = useRef(0);
    const hasCompleted = useRef(false);
    const { setKremlinAnimationFinished } = useSceneControls();

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
            animationProgress.current += delta / 2;
            animationProgress.current = Math.min(animationProgress.current, 1);

            // Interpolar escala (desde 0.01 hasta 0.07)
            const scale = 0.01 + (0.06 * animationProgress.current);
            groupRef.current.scale.set(scale, scale, scale);

            // Interpolar posición Z (desde -50 hasta 0, acercándose desde atrás)
            const posZ = -50 + (50 * animationProgress.current);
            groupRef.current.position.set(0, -1.03, posZ);

            // Notificar al store cuando termina la animación
            if (animationProgress.current >= 1 && !hasCompleted.current) {
                hasCompleted.current = true;
                setKremlinAnimationFinished(true);
            }
        }
    });

    return <primitive ref={groupRef} object={gltf.scene} />;
}

useGLTF.preload("/models/CustomKremlin.glb");