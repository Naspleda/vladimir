"use client"

import { useEffect, useRef } from "react"

export default function NeonCircle() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      constructor(radius) {
        this.angle = Math.random() * Math.PI * 2
        this.radius = radius + (Math.random() * 15 - 7.5)
        this.x = Math.cos(this.angle) * this.radius + canvas.width / 2
        this.y = Math.sin(this.angle) * this.radius + canvas.height / 2
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Slowly move back to circle
        const dx = this.x - canvas.width / 2
        const dy = this.y - canvas.height / 2
        const distance = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        if (Math.abs(distance - this.radius) > 10) {
          this.x -= (distance - this.radius) * Math.cos(angle) * 0.03
          this.y -= (distance - this.radius) * Math.sin(angle) * 0.03
        }

        if (this.size > 0.2) this.size -= 0.01
        if (this.opacity > 0) this.opacity -= 0.002
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 195, 255, ${this.opacity})`
        ctx.fill()
      }

      isAlive() {
        return this.size > 0.2 && this.opacity > 0
      }
    }

    const particles = []
    const radius = Math.min(canvas.width, canvas.height) * 0.3
    let animationId
    let hue = 180 // Starting hue for cyan/blue

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw main circle
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw glow effect
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`
      ctx.lineWidth = 10
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.shadowBlur = 0

      // Add new particles
      if (Math.random() < 0.2) {
        particles.push(new Particle(radius))
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()

        if (!particle.isAlive()) {
          particles.splice(index, 1)
        }
      })

      // Animate hue
      hue = (hue + 0.2) % 360

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center" id="HOLAAAA">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="relative z-10 text-white">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 flex items-center justify-center">
        <h1>HOLIS</h1>
        </div>
      </div>
    </div>
  )
}
