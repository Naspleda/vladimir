import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three";


export function FloatingGrid() {
    const diffuse = useLoader(
        TextureLoader,
        "/textures/grid-texture.png"
    );

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30, 30);
        diffuse.offset.set(0, 0);
    }, [diffuse]);

    return (
        <>
        <mesh rotation-x={-Math.PI * 0.5 } position={[0, -.995, 0]} receiveShadow>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial
            color={[1, 1, 1]}
            opacity={0.015}
            map={diffuse}
            alphaMap={diffuse}
            transparent={true}
            />
        </mesh>
        </>
    );
}