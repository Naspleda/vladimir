import { Canvas } from "@react-three/fiber";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Kremlin } from "./Kremlin";
import { FloatingGrid } from "../../src/components/FloatingGrid";
import { Luces } from "../../src/components/Luces";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controlsRef = useRef(null);
  const camRef = useRef(null);
  const { kremlinAnimationFinished } = useSceneControls();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: x * 20, y: y * 20 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas shadows gl={{ alpha: true }} style={{ background: "transparent" }}>

        <OrbitControls
          ref={controlsRef}
          target={[0, -0.25, 0]}
          maxPolarAngle={Math.PI - 0.1}
          enableDamping
          dampingFactor={0.08}
          enabled={false}
        />

        <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[0, 2, 5]} />

        <CubeCamera resolution={256} frames={1} >
          {(texture) => (
            <>
              <Environment map={texture} />
              <Kremlin />
            </>
          )}
        </CubeCamera>

        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.5} />
        </EffectComposer>

        <FloatingGrid />

        {/* LUCES BASE - Solo se renderizan cuando la animación del Kremlin termina */}
        {kremlinAnimationFinished && (
          <>
            <Luces />
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={10.5}
              angle={0.6}
              penumbra={0.5}
              position={[5, 5, 0]}
              castShadow
              shadow-bias={-0.0001}
            />
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={20}
              angle={0.6}
              penumbra={0.5}
              position={[-5, 5, 3]}
              castShadow
              shadow-bias={-0.0001}
            />
            <hemisphereLight position={[0, -1, 0]} skyColor="white" groundColor="black" intensity={1} />
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={1000}
              angle={0.8}
              penumbra={0.5}
              position={[0, 5, 30]}
              castShadow
              shadow-bias={-0.0001}
            />
          </>
        )}
      </Canvas>

      <CameraTransitioner controlsRef={controlsRef} camRef={camRef} />
    </div>
  );
}

export default Scene;
