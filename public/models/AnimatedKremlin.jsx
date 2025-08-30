import React, { useEffect, useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import useSceneControls from "../../src/store/useSceneControls";

export function AnimatedKremlin() {
    const gltf = useLoader(GLTFLoader, "/models/kremlin.glb");
    const modelRef = useRef();
    const clock = useRef(new THREE.Clock());
    const { setKremlinAnimationFinished } = useSceneControls();
    const animationCompletedRef = useRef(false);

    // Almacena los datos de transformación inicial y final para cada malla
    const animationData = useMemo(() => {
        const data = new Map();
        gltf.scene.traverse((object) => {
            if (object.isMesh) {
                // Estado final (original)
                const finalPosition = object.position.clone();
                const finalQuaternion = object.quaternion.clone();

                // Estado inicial (roto/disperso)
                const initialPosition = new THREE.Vector3(
                    finalPosition.x + (Math.random() - 0.5) * 10,
                    finalPosition.y + Math.random() * 5,
                    finalPosition.z + (Math.random() - 0.5) * 10
                );
                const initialRotation = new THREE.Euler(
                    (Math.random() - 0.5) * Math.PI * 2,
                    (Math.random() - 0.5) * Math.PI * 2,
                    (Math.random() - 0.5) * Math.PI * 2
                );
                const initialQuaternion = new THREE.Quaternion().setFromEuler(initialRotation);

                data.set(object.uuid, {
                    finalPosition,
                    finalQuaternion,
                    initialPosition,
                    initialQuaternion,
                });
            }
        });
        return data;
    }, [gltf]);

    // Aplicar propiedades iniciales y escala/posición global
    useEffect(() => {
        const model = modelRef.current;
        if (!model) return;

        model.scale.set(0.07, 0.07, 0.07);
        model.position.set(0, -1.03, 0);

        model.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;

                // Aplicar el estado inicial calculado
                const data = animationData.get(object.uuid);
                if (data) {
                    object.position.copy(data.initialPosition);
                    object.quaternion.copy(data.initialQuaternion);
                }
            }
        });
        
        // Iniciar el reloj cuando el componente se monta
        clock.current.start();
    }, [gltf, animationData]);

    // Bucle de animación
    useFrame(() => {
        const elapsedTime = clock.current.getElapsedTime();
        const animationDuration = 10; // 10 segundos

        // El factor de progreso va de 0 a 1
        const progress = Math.min(elapsedTime / animationDuration, 1);
        
        // Función de suavizado para una animación más natural
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        if (modelRef.current) {
            modelRef.current.traverse((object) => {
                if (object.isMesh) {
                    const data = animationData.get(object.uuid);
                    if (data) {
                        // Interpolar posición
                        object.position.lerpVectors(
                            data.initialPosition,
                            data.finalPosition,
                            easedProgress
                        );

                        // Interpolar rotación
                        object.quaternion.copy(data.initialQuaternion).slerp(
                            data.finalQuaternion,
                            easedProgress
                        );
                    }
                }
            });
        }
        
        // Detener la animación y actualizar el estado cuando termine
        if (progress >= 1 && !animationCompletedRef.current) {
            clock.current.stop();
            setKremlinAnimationFinished(true);
            animationCompletedRef.current = true; // Marcar como completado
        }
    });

    return <primitive ref={modelRef} object={gltf.scene} />;
}
