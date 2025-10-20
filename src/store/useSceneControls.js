import { button } from 'leva';
import { create } from 'zustand';

const useSceneControls = create((set) => ({
  // Estado para la cámara
  fov: 50,
  azimuthDeg: 0,
  polarDeg: 75,
  radius: 5,
  target: { x: 0, y: 0.35, z: 0 },
  cameraPosition: [0, 2, 5],
  cameraTarget: [0, 0, 0],

  // Estado para las luces
  mainLightIntensity: 1,
  spotlightColor: '#ffffff',
  isSpotlightOn: true,

  // Estado para las animaciones
  animationsEnabled: true,
  animationSpeed: 1,
  kremlinAnimationFinished: false, // Nuevo estado para la animación del Kremlin

  // Las funciones para modificar el estado se mantienen separadas,
  // pero el store necesita una forma de ser actualizado.
  // Estas son las acciones que lo permiten.
  duration: 5, // segundos
  setDuration: (duration) => set({ duration }),
  setFov: (fov) => set({ fov }),
  setAzimuthDeg: (azimuthDeg) => set({ azimuthDeg }),
  setPolarDeg: (polarDeg) => set({ polarDeg }),
  setRadius: (radius) => set({ radius }),
  setTarget: (target) => set({ target }),
  setKremlinAnimationFinished: (finished) => set({ kremlinAnimationFinished: finished }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setMainLightIntensity: (intensity) => set({ mainLightIntensity: intensity }),
  setSpotlightColor: (color) => set({ spotlightColor: color }),
  toggleSpotlight: () => set((state) => ({ isSpotlightOn: !state.isSpotlightOn })),
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  triggerCameraAnimation: (target) => set({ cameraAnimationTrigger: { target, timestamp: Date.now() } }),

  // Estado para el texto
  textVisible: false,
  toggleText: () => set((state) => ({ textVisible: !state.textVisible })),

  // Reemplaza el estado de texto por uno para manejar múltiples cards
  activeCard: null, // 'card1', 'card2', 'card3' o null
  setActiveCard: (cardId) => set({ activeCard: cardId }),

  // Estado de botones
  button1Visible: true,
  button2Visible: true,
  button3Visible: true,
  showButton1: () => set(state => ({ button1Visible: !state.button1Visible })),
  showButton2: () => set(state => ({ button2Visible: !state.button2Visible })),
  showButton3: () => set(state => ({ button3Visible: !state.button3Visible })),
}));

export default useSceneControls;
