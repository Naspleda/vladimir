// "use client"

// import { useRef, useEffect } from "react"
// import { useThree, useFrame } from "@react-three/fiber"
// import { PerspectiveCamera } from "@react-three/drei"
// import * as THREE from "three"

// export const Camera = ({ position = [0, 0, 5], fov = 75, near = 0.1, far = 1000, lookAt = [0, 0, 0] }) => {
//   const cameraRef = useRef(null)
//   const { set, size } = useThree()

//   useEffect(() => {
//     if (cameraRef.current) {
//       cameraRef.current.position.set(...position)
//       cameraRef.current.lookAt(new THREE.Vector3(...lookAt))
//       set({ camera: cameraRef.current })
//     }
//   }, [position, lookAt, set])

//   useEffect(() => {
//     const handleResize = () => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = size.width / size.height
//         cameraRef.current.updateProjectionMatrix()
//       }
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [size])

//   useFrame(() => {
//     if (cameraRef.current) {
//       cameraRef.current.updateMatrixWorld()
//     }
//   })

//   return <PerspectiveCamera ref={cameraRef} fov={fov} near={near} far={far} />
// }

"use client"

import { useRef, useEffect, useMemo } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

export const Camera = ({
  position = [0, 0, 5],
  fov = 75,
  near = 0.1,
  far = 1000,
  lookAt = [0, 0, 0],
  zoomSpeed = 1,
  zoomDistance = 2
}) => {
  const cameraRef = useRef(null)
  const { set, size } = useThree()
  const target = useMemo(() => new THREE.Vector3(...lookAt), [lookAt])
  const initialPosition = useRef(new THREE.Vector3(...position))

  useEffect(() => {
    initialPosition.current.set(...position)
  }, [position])

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position)
      cameraRef.current.lookAt(target)
      set({ camera: cameraRef.current })
    }
  }, [position, set, target])

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current) {
        cameraRef.current.aspect = size.width / size.height
        cameraRef.current.updateProjectionMatrix()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [size])

  useFrame((state) => {
    if (!cameraRef.current) return
    
    // Animación de zoom
    const t = state.clock.getElapsedTime()
    const zoomOffset = Math.sin(t * zoomSpeed) * zoomDistance
    cameraRef.current.position.z = initialPosition.current.z + zoomOffset
    cameraRef.current.lookAt(target)
    cameraRef.current.updateMatrixWorld()
  })

  return <PerspectiveCamera ref={cameraRef} fov={fov} near={near} far={far} />
}
