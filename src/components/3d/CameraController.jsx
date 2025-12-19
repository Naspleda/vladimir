import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import useSceneControls from "../../src/store/useSceneControls";

// --- Controlador principal de cámara ---
function CameraController({ controlsRef, camRef }) {
  const [showPanel, setShowPanel] = useState(false);
  const rafRef = useRef(null);
  const animatingRef = useRef(false);

  // Estados del store
  const {
    fov,
    azimuthDeg,
    polarDeg,
    radius,
    target,
    cameraAnimation, // { target: {x,y,z}, duration: number, fov?, radius?, azimuth?, polar? }
    setFov,
    setAzimuthDeg,
    setPolarDeg,
    setRadius,
    setTarget,
    clearCameraAnimation
  } = useSceneControls();

  // Inicializar estado desde la cámara actual
  useEffect(() => {
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
  }, [controlsRef, camRef]);

  // Aplicar cambios manuales a la cámara
  useEffect(() => {
    if (animatingRef.current) return; // No interferir con animaciones

    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    const azimuth = THREE.MathUtils.degToRad(azimuthDeg);
    const polar = THREE.MathUtils.degToRad(polarDeg);
    const tgt = new THREE.Vector3(target.x, target.y, target.z);

    const spherical = new THREE.Spherical(radius, polar, azimuth);
    const newPos = new THREE.Vector3().setFromSpherical(spherical).add(tgt);

    cam.position.copy(newPos);
    ctr.target.copy(tgt);
    cam.fov = fov;
    cam.updateProjectionMatrix();
    ctr.update();
  }, [fov, azimuthDeg, polarDeg, radius, target, camRef, controlsRef]);

  // Ejecutar animación cuando se recibe del store
  useEffect(() => {
    if (!cameraAnimation) return;

    animateToPosition(cameraAnimation);
    clearCameraAnimation(); // Limpiar después de iniciar la animación
  }, [cameraAnimation]);

  // Funciones de animación
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpVec3 = (a, b, t) => new THREE.Vector3(
    lerp(a.x, b.x, t), 
    lerp(a.y, b.y, t), 
    lerp(a.z, b.z, t)
  );

  const lerpAngle = (a, b, t) => {
    let diff = (b - a + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    return a + diff * t;
  };

  const stopAnimation = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    animatingRef.current = false;
    rafRef.current = null;
  };

  const animateToPosition = (animation) => {
    const cam = camRef.current;
    const ctr = controlsRef.current;
    if (!cam || !ctr) return;

    stopAnimation();
    animatingRef.current = true;

    const start = performance.now();
    const duration = Math.max(0.1, animation.duration) * 1000;

    // Estado inicial
    const fromFov = cam.fov;
    const fromTarget = ctr.target.clone();
    const fromRel = cam.position.clone().sub(fromTarget);
    const fromSph = new THREE.Spherical().setFromVector3(fromRel);

    // Estado objetivo
    const toTarget = new THREE.Vector3(
      animation.target.x, 
      animation.target.y, 
      animation.target.z
    );
    const toFov = animation.fov ?? fromFov;
    const toRadius = animation.radius ?? fromSph.radius;
    const toAzimuth = animation.azimuth !== undefined 
      ? THREE.MathUtils.degToRad(animation.azimuth) 
      : fromSph.theta;
    const toPolar = animation.polar !== undefined 
      ? THREE.MathUtils.degToRad(animation.polar) 
      : fromSph.phi;

    const tick = (now) => {
      if (!animatingRef.current) return;
      
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(progress);

      // Interpolar valores
      const currentTarget = lerpVec3(fromTarget, toTarget, eased);
      const currentRadius = lerp(fromSph.radius, toRadius, eased);
      const currentPolar = lerp(fromSph.phi, toPolar, eased);
      const currentAzimuth = lerpAngle(fromSph.theta, toAzimuth, eased);
      const currentFov = lerp(fromFov, toFov, eased);

      // Aplicar a la cámara
      const currentPos = new THREE.Vector3()
        .setFromSpherical(new THREE.Spherical(currentRadius, currentPolar, currentAzimuth))
        .add(currentTarget);

      cam.position.copy(currentPos);
      ctr.target.copy(currentTarget);
      cam.fov = currentFov;
      cam.updateProjectionMatrix();
      ctr.update();

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Actualizar el store con los valores finales
        setTarget({ x: toTarget.x, y: toTarget.y, z: toTarget.z });
        setRadius(toRadius);
        setAzimuthDeg(THREE.MathUtils.radToDeg(toAzimuth));
        setPolarDeg(THREE.MathUtils.radToDeg(toPolar));
        setFov(toFov);
        
        animatingRef.current = false;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const resetCamera = () => {
    stopAnimation();
    setFov(50);
    setAzimuthDeg(0);
    setPolarDeg(75);
    setRadius(5);
    setTarget({ x: 0, y: 0.35, z: 0 });
  };

  return (
    <>
      {/* Botón principal */}
      <button
        onClick={() => setShowPanel(!showPanel)}
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
        title="Controles de cámara"
      >
        🎥 Cámara
      </button>

      {/* Panel de controles */}
      {showPanel && (
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
          <div style={{
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: 8
          }}>
            <strong>Controles de Cámara</strong>
            <button 
              onClick={resetCamera} 
              style={{
                background: "transparent", 
                color: "#aaa", 
                border: "none", 
                cursor: "pointer"
              }} 
              title="Reset"
            >
              Reiniciar
            </button>
          </div>

          {animatingRef.current && (
            <div style={{
              background: "rgba(255,165,0,0.2)",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "10px",
              fontSize: "12px",
              textAlign: "center"
            }}>
              🎬 Animando cámara...
              <button 
                onClick={stopAnimation}
                style={{
                  marginLeft: "8px",
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  cursor: "pointer",
                  fontSize: "10px"
                }}
              >
                Detener
              </button>
            </div>
          )}

          <label style={{display:"block", fontSize:12, marginTop:8}}>
            FOV: {fov.toFixed(0)}°
          </label>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value={fov} 
            onChange={e => setFov(Number(e.target.value))} 
            style={{width:"100%"}} 
            disabled={animatingRef.current}
          />

          <label style={{display:"block", fontSize:12, marginTop:8}}>
            Azimut: {azimuthDeg.toFixed(0)}°
          </label>
          <input 
            type="range" 
            min="-180" 
            max="180" 
            value={azimuthDeg} 
            onChange={e => setAzimuthDeg(Number(e.target.value))} 
            style={{width:"100%"}}
            disabled={animatingRef.current}
          />

          <label style={{display:"block", fontSize:12, marginTop:8}}>
            Polar: {polarDeg.toFixed(0)}°
          </label>
          <input 
            type="range" 
            min="5" 
            max="175" 
            value={polarDeg} 
            onChange={e => setPolarDeg(Number(e.target.value))} 
            style={{width:"100%"}}
            disabled={animatingRef.current}
          />

          <label style={{display:"block", fontSize:12, marginTop:8}}>
            Distancia: {radius.toFixed(2)}
          </label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            step="0.1" 
            value={radius} 
            onChange={e => setRadius(Number(e.target.value))} 
            style={{width:"100%"}}
            disabled={animatingRef.current}
          />

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:10}}>
            {["x","y","z"].map(axis => (
              <div key={axis}>
                <label style={{display:"block", fontSize:12}}>
                  Target {axis.toUpperCase()}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={target[axis]}
                  onChange={e => setTarget(prev => ({
                    ...prev, 
                    [axis]: Number(e.target.value)
                  }))}
                  style={{
                    width:"100%", 
                    background:"#0f0f0f", 
                    color:"#fff", 
                    border:"1px solid #333", 
                    borderRadius:8, 
                    padding:"6px 8px"
                  }}
                  disabled={animatingRef.current}
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

export default CameraController;