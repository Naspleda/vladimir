import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { object } from "framer-motion/client";

export function Kremlin() {
    const gltf = useLoader(GLTFLoader, "/models/kremlin.glb");
    
    useEffect(() => {
        gltf.scene.scale.set(0.07, 0.07, 0.07); // Ajusta la escala del modelo
        gltf.scene.position.set(0, -1.1, 0); // Ajusta la posición del modelo
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true; // Habilita las sombras
                object.receiveShadow = true; // Habilita la recepción de sombras
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);
    
    return <primitive object={gltf.scene} />;
    }