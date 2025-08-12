import { Canvas } from "@react-three/fiber";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Ground from "../../src/components/Ground";
import GradientBackground from '../../src/components/GradientBackground';
import { Kremlin } from "./Kremlin";
import { FloatingGrid } from "../../src/components/FloatingGrid";
import { Luces } from "../../src/components/Luces";

// --- UI de cámara (panel flotante) ---
function CameraController({ controlsRef, camRef }) {
  const [open, setOpen] = useState(false);

  // Estados controlables
  const [fov, setFov] = useState(50);
  const [azimuthDeg, setAzimuthDeg] = useState(0);     // -180..180
  const [polarDeg, setPolarDeg] = useState(75);        // 5..175
  const [radius, setRadius] = useState(5);             // 1..50
  const [target, setTarget] = useState({ x: 0, y: 0.35, z: 0 });

  // Inicializar sliders con el estado real de la escena cuando ya montó todo
  useEffect(() => {
    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    // FOV actual
    setFov(cam.fov);

    // Target actual (OrbitControls guarda el target)
    const t = ctr.target.clone();
    setTarget({ x: t.x, y: t.y, z: t.z });

    // Convertir posición de cámara a esféricas relativas al target
    const rel = cam.position.clone().sub(t);
    const sph = new THREE.Spherical().setFromVector3(rel);
    setRadius(sph.radius);
    setAzimuthDeg(THREE.MathUtils.radToDeg(sph.theta)); // theta = azimut
    setPolarDeg(THREE.MathUtils.radToDeg(sph.phi));     // phi   = polar
  }, [controlsRef, camRef]);

  // Aplicar cambios a la cámara/controles cuando cambian los sliders
  useEffect(() => {
    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    const azimuth = THREE.MathUtils.degToRad(azimuthDeg);
    const polar = THREE.MathUtils.degToRad(polarDeg);
    const tgt = new THREE.Vector3(target.x, target.y, target.z);

    // Posición = target + (vector esférico)
    const spherical = new THREE.Spherical(radius, polar, azimuth);
    const newPos = new THREE.Vector3().setFromSpherical(spherical).add(tgt);

    cam.position.copy(newPos);
    ctr.target.copy(tgt);

    cam.fov = fov;
    cam.updateProjectionMatrix();

    // Mantener OrbitControls sincronizado
    ctr.update();
  }, [fov, azimuthDeg, polarDeg, radius, target, camRef, controlsRef]);

  const reset = () => {
    setFov(50);
    setAzimuthDeg(0);
    setPolarDeg(75);
    setRadius(5);
    setTarget({ x: 0, y: 0.35, z: 0 });
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "absolute",
          left: 16,
          bottom: 16,
          zIndex: 20,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #333",
          background: "#111",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
        }}
        title="Abrir controles de cámara"
      >
        🎥 Cámara
      </button>

      {/* Panel flotante */}
      {open && (
        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 60,
            zIndex: 20,
            width: 280,
            padding: 14,
            borderRadius: 16,
            border: "1px solid #2a2a2a",
            background: "rgba(15,15,15,0.95)",
            color: "#eaeaea",
            backdropFilter: "blur(6px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)"
          }}
        >
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
            <strong>Controles de Cámara</strong>
            <button onClick={reset} style={{background:"transparent", color:"#aaa", border:"none", cursor:"pointer"}} title="Reset">
              Reiniciar
            </button>
          </div>

          <label style={{display:"block", fontSize:12, marginTop:8}}>FOV: {fov.toFixed(0)}°</label>
          <input type="range" min="20" max="100" value={fov} onChange={e => setFov(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Azimut: {azimuthDeg.toFixed(0)}°</label>
          <input type="range" min="-180" max="180" value={azimuthDeg} onChange={e => setAzimuthDeg(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Polar: {polarDeg.toFixed(0)}°</label>
          <input type="range" min="5" max="175" value={polarDeg} onChange={e => setPolarDeg(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Distancia: {radius.toFixed(2)}</label>
          <input type="range" min="1" max="50" step="0.1" value={radius} onChange={e => setRadius(Number(e.target.value))} style={{width:"100%"}} />

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:10}}>
            {["x","y","z"].map(axis => (
              <div key={axis}>
                <label style={{display:"block", fontSize:12}}>Target {axis.toUpperCase()}</label>
                <input
                  type="number"
                  step="0.1"
                  value={target[axis]}
                  onChange={e => setTarget(prev => ({...prev, [axis]: Number(e.target.value)}))}
                  style={{width:"100%", background:"#0f0f0f", color:"#fff", border:"1px solid #333", borderRadius:8, padding:"6px 8px"}}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
CameraController.propTypes = {
  controlsRef: PropTypes.object.isRequired,
  camRef: PropTypes.object.isRequired,
};

// --- Controlador con transición (botón y panel) ---
function CameraTransitioner({ controlsRef, camRef }) {
  const [open, setOpen] = useState(false);

  // Valores objetivo (no se aplican hasta "Animar")
  const [fov, setFov] = useState(50);
  const [azimuthDeg, setAzimuthDeg] = useState(0);
  const [polarDeg, setPolarDeg] = useState(75);
  const [radius, setRadius] = useState(5);
  const [target, setTarget] = useState({ x: 0, y: 0.35, z: 0 });
  const [duration, setDuration] = useState(5); // segundos

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

  return (
    <>
      {/* Botón flotante, colocado "al lado" del primero */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "absolute",
          left: 120,            // <- desplazado respecto del primero
          bottom: 16,
          zIndex: 20,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #333",
          background: "#111",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
        }}
        title="Abrir transición de cámara"
      >
        ⏩ Transición
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            left: 120,
            bottom: 60,
            zIndex: 20,
            width: 280,
            padding: 14,
            borderRadius: 16,
            border: "1px solid #2a2a2a",
            background: "rgba(15,15,15,0.95)",
            color: "#eaeaea",
            backdropFilter: "blur(6px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)"
          }}
        >
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
            <strong>Transición de Cámara</strong>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={animateToTargets} style={{background:"#1a1a1a", color:"#fff", border:"1px solid #333", borderRadius:8, padding:"6px 10px", cursor:"pointer"}}>Animar</button>
              <button onClick={stop} style={{background:"transparent", color:"#aaa", border:"none", cursor:"pointer"}} title="Detener">Detener</button>
            </div>
          </div>

          <label style={{display:"block", fontSize:12, marginTop:6}}>Duración (s)</label>
          <input type="number" min="0.1" step="0.1" value={duration} onChange={e => setDuration(e.target.value)} style={{width:"100%", background:"#0f0f0f", color:"#fff", border:"1px solid #333", borderRadius:8, padding:"6px 8px"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>FOV: {Number(fov).toFixed(0)}°</label>
          <input type="range" min="20" max="100" value={fov} onChange={e => setFov(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Azimut: {Number(azimuthDeg).toFixed(0)}°</label>
          <input type="range" min="-180" max="180" value={azimuthDeg} onChange={e => setAzimuthDeg(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Polar: {Number(polarDeg).toFixed(0)}°</label>
          <input type="range" min="5" max="175" value={polarDeg} onChange={e => setPolarDeg(Number(e.target.value))} style={{width:"100%"}} />

          <label style={{display:"block", fontSize:12, marginTop:8}}>Distancia: {Number(radius).toFixed(2)}</label>
          <input type="range" min="1" max="50" step="0.1" value={radius} onChange={e => setRadius(Number(e.target.value))} style={{width:"100%"}} />

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:10}}>
            {["x","y","z"].map(axis => (
              <div key={axis}>
                <label style={{display:"block", fontSize:12}}>Target {axis.toUpperCase()}</label>
                <input
                  type="number"
                  step="0.1"
                  value={target[axis]}
                  onChange={e => setTarget(prev => ({...prev, [axis]: Number(e.target.value)}))}
                  style={{width:"100%", background:"#0f0f0f", color:"#fff", border:"1px solid #333", borderRadius:8, padding:"6px 8px"}}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
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
    <div style={{position:"relative", width:"100%", height:"100vh"}}>
      <Canvas shadows>

        <OrbitControls
          ref={controlsRef}
          target={[0, 0.35, 0]}
          maxPolarAngle={Math.PI - 0.1}
          enableDamping
          dampingFactor={0.08}
        />

        <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[0, 2, 5]} />

        <color args={[0, 0, 0]} attach="background" />

        <CubeCamera resolution={256} frames={Infinity} >
          {(texture) => (
            <>
              <Environment map={texture} />
              <Kremlin />
            </>
          )}
        </CubeCamera>

        <Luces />

        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.5} />
        </EffectComposer>

        <Ground />
        <FloatingGrid />

        {/* LUCES BASE */}
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
      </Canvas>

      {/* Panel/control superpuesto al Canvas */}
      <CameraController controlsRef={controlsRef} camRef={camRef} />

      {/* NUEVO: panel con transición de 5s */}
    <CameraTransitioner controlsRef={controlsRef} camRef={camRef} />
    </div>
  );
}

export default Scene;
