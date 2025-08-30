import { create } from 'zustand';

const useSceneControls = create((set) => ({
  // Estado para la cámara
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
  setKremlinAnimationFinished: (finished) => set({ kremlinAnimationFinished: finished }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setMainLightIntensity: (intensity) => set({ mainLightIntensity: intensity }),
  setSpotlightColor: (color) => set({ spotlightColor: color }),
  toggleSpotlight: () => set((state) => ({ isSpotlightOn: !state.isSpotlightOn })),
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
}));

export default useSceneControls;
