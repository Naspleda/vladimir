import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import PropTypes from 'prop-types';
import useSceneControls from "../store/useSceneControls";

// --- Controlador con transición (botón y panel) ---
function CameraTransitioner({ controlsRef, camRef, isMobile }) {
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
        // En mobile prevenimos movimientos automáticos de cámara
        if (isMobile) return;

        if (cameraAnimationTrigger) {
            setTarget(cameraAnimationTrigger.target);
            // setDuration(2); // 2 segundos de transición
            animateToTargets();
        }
    }, [cameraAnimationTrigger, isMobile]);

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

    return null;
}

CameraTransitioner.propTypes = {
    controlsRef: PropTypes.object.isRequired,
    camRef: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
};

export default CameraTransitioner;
