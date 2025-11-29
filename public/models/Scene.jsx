import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"; // Agregamos ContactShadows
import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Kremlin } from "./Kremlin";
import { MetallicKremlin } from "./MetallicKremlin";
import { FloatingGrid } from "../../src/components/FloatingGrid";
// import { Luces } from "../../src/components/Luces"; // Vamos a reemplazar esto por luces más eficientes aquí mismo
import useSceneControls from "../../src/store/useSceneControls";

// --- Controlador con transición (botón y panel) ---
function CameraTransitioner({ controlsRef, camRef }) {
  const [open, setOpen] = useState(false);

  // Valores objetivo desde el store
  const {
    fov,
    azimuthDeg,
    polarDeg,
    radius,
    target,
    setFov,
    setAzimuthDeg,
    setPolarDeg,
    setRadius,
    setTarget,
  } = useSceneControls();
  // const [duration, setDuration] = useState(5); // segundos
  const { duration } = useSceneControls();

  const rafRef = useRef(null);
  const animatingRef = useRef(false);

  // Cargar el estado actual de la cámara al abrir el panel
  useEffect(() => {
    if (!open) return;
    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    setFov(cam.fov);
    const t = ctr.target.clone();
    setTarget({ x: t.x, y: t.y, z: t.z });

    const rel = cam.position.clone().sub(t);
    const sph = new THREE.Spherical().setFromVector3(rel);
    setRadius(sph.radius);
    setAzimuthDeg(THREE.MathUtils.radToDeg(sph.theta));
    setPolarDeg(THREE.MathUtils.radToDeg(sph.phi));
  }, [open, camRef, controlsRef]);

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpVec3 = (a, b, t) => new THREE.Vector3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
  // Interpolación angular corta (radianes)
  const lerpAngle = (a, b, t) => {
    let diff = (b - a + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    return a + diff * t;
  };

  const { cameraAnimationTrigger } = useSceneControls();

  useEffect(() => {
    if (cameraAnimationTrigger) {
      setTarget(cameraAnimationTrigger.target);
      // setDuration(2); // 2 segundos de transición
      animateToTargets();
    }
  }, [cameraAnimationTrigger]);

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    animatingRef.current = false;
    rafRef.current = null;
  };

  const animateToTargets = () => {
    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    stop(); // por si había una animación previa
    animatingRef.current = true;

    const start = performance.now();
    const dur = Math.max(0.1, Number(duration)) * 1000;

    // FROM (estado actual)
    const fromFov = cam.fov;
    const fromTarget = ctr.target.clone();
    const fromRel = cam.position.clone().sub(fromTarget);
    const fromSph = new THREE.Spherical().setFromVector3(fromRel);

    // TO (objetivo configurado)
    const toFov = Number(fov);
    const toTarget = new THREE.Vector3(target.x, target.y, target.z);
    const toSph = new THREE.Spherical(
      Number(radius),
      THREE.MathUtils.degToRad(Number(polarDeg)),
      THREE.MathUtils.degToRad(Number(azimuthDeg))
    );

    const tick = (now) => {
      if (!animatingRef.current) return;
      const tNorm = Math.min(1, (now - start) / dur);
      const e = easeInOutCubic(tNorm);

      const curTarget = lerpVec3(fromTarget, toTarget, e);
      const curRadius = lerp(fromSph.radius, toSph.radius, e);
      const curPolar = lerp(fromSph.phi, toSph.phi, e);
      const curAzimuth = lerpAngle(fromSph.theta, toSph.theta, e);
      const curFov = lerp(fromFov, toFov, e);

      const curPos = new THREE.Vector3()
        .setFromSpherical(new THREE.Spherical(curRadius, curPolar, curAzimuth))
        .add(curTarget);

      cam.position.copy(curPos);
      ctr.target.copy(curTarget);
      cam.fov = curFov;
      cam.updateProjectionMatrix();
      ctr.update();

      if (tNorm < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        animatingRef.current = false;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

}

CameraTransitioner.propTypes = {
  controlsRef: PropTypes.object.isRequired,
  camRef: PropTypes.object.isRequired,
};


// --- Escena ---
function Scene() {
  const controlsRef = useRef(null);
  const camRef = useRef(null);
  const { kremlinAnimationFinished } = useSceneControls();

  // Optimización de Performance para móviles
  // Detectar si es móvil para bajar calidad si es necesario (opcional)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas
        // 1. OPTIMIZACIÓN CRÍTICA: Pixel Ratio
        dpr={[1, isMobile ? 1.5 : 2]}
        // Desactivamos sombras por defecto (shadows={false}) porque usaremos ContactShadows
        gl={{ powerPreference: "high-performance", antialias: false }}
        style={{ background: "transparent" }}
      >

        {/* Luces Ambientales (Baratas) */}
        <ambientLight intensity={1} />

        {/* Environment reemplaza a CubeCamera para reflejos más baratos */}
        <Environment preset="night" />

        <OrbitControls
          ref={controlsRef}
          target={[0, -0.25, 0]}
          maxPolarAngle={Math.PI - 0.1}
          enableDamping
          enabled={true} // Enabled para pruebas
        />

        <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[0, 2, 5]} />

        {/* Renderizado del Modelo */}
        {/* <Kremlin /> */}
        <MetallicKremlin />

        {/* 2. OPTIMIZACIÓN: Bloom Selectivo */}
        {/* disableNormalPass ahorra recursos si no usas efectos que requieran normales */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            luminanceThreshold={1} // Subimos esto para que solo brillen cosas MUY brillantes
            mipmapBlur // Hace que el bloom sea mas suave y a veces más performante que el kernel estándar
            intensity={0.5}
          />
        </EffectComposer>

        {/* <FloatingGrid /> */}

        {/* Lógica de luces optimizada */}
        {kremlinAnimationFinished && (
          <>
            {/* EN LUGAR DE CASTSHADOW EN CADA LUZ: */}
            {/* <ContactShadows
              resolution={512}
              scale={20}
              blur={2}
              opacity={0.5}
              far={10}
              color="#000000"
            /> */}

            {/* Luces de acento (SIN castShadow) */}
            {/* La intensidad en R3F a veces requiere ajustes si no usas toneMapping correcto. 
                Si usas valores como 1000, asumo que no tienes toneMapping. */}
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={5} // Bajamos intensidad relativa
              angle={0.6}
              penumbra={1} // Penumbra 1 suaviza los bordes "gratis"
              position={[5, 5, 0]}
            // castShadow={false} -> Default
            />

            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={8}
              position={[-5, 5, 3]}
            />

            {/* Luz Principal (Rim Light) */}
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={15}
              angle={0.8}
              position={[0, 5, 10]}
            />
          </>
        )}
      </Canvas>

      <CameraTransitioner controlsRef={controlsRef} camRef={camRef} />
    </div>
  );
}

export default Scene;
