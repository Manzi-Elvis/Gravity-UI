import { useRef } from "react"
import { useMotionValue, useSpring, useTransform } from "framer-motion"

type UseGravityOptions = {
  maxRotation?: number
}

export function useGravity(options: UseGravityOptions = {}) {
  const { maxRotation = 15 } = options
  const ref = useRef<HTMLDivElement | null>(null)

  // Base rotation
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 })

  // Glow motion values
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glowOpacity = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  function handleMouseMove(event: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top

    // Centered coordinates
    const centerX = relativeX - rect.width / 2
    const centerY = relativeY - rect.height / 2

    const normalizedX = Math.max(-1, Math.min(1, centerX / (rect.width / 2)))
    const normalizedY = Math.max(-1, Math.min(1, centerY / (rect.height / 2)))

    // Rotation
    rawRotateY.set(normalizedX * maxRotation)
    rawRotateX.set(-normalizedY * maxRotation)

    // Glow offsets
    glowX.set(centerX / 2) // slower than cursor
    glowY.set(centerY / 2)
    glowOpacity.set(1)
  }

  function handleMouseLeave() {
    rawRotateX.set(0)
    rawRotateY.set(0)
    glowOpacity.set(0)
  }

  // For inner parallax layers
  function getLayerTransform(depthFactor: number) {
    return {
      rotateX: useTransform(rotateX, (v) => v * depthFactor),
      rotateY: useTransform(rotateY, (v) => v * depthFactor),
    }
  }

  return {
    ref,
    motionStyle: { rotateX, rotateY },
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
    getLayerTransform,
    glowX,
    glowY,
    glowOpacity,
  }
}