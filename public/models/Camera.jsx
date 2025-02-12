"use client"

import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

export const Camera = ({ position = [0, 0, 5], fov = 75, near = 0.1, far = 1000, lookAt = [0, 0, 0] }) => {
  const cameraRef = useRef(null)
  const { set, size } = useThree()

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position)
      cameraRef.current.lookAt(new THREE.Vector3(...lookAt))
      set({ camera: cameraRef.current })
    }
  }, [position, lookAt, set])

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

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateMatrixWorld()
    }
  })

  return <PerspectiveCamera ref={cameraRef} fov={fov} near={near} far={far} />
}

