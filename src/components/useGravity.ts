import { useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"

type UseGravityOptions = {
  maxRotation?: number
}

export function useGravity(options: UseGravityOptions = {}) {
  const { maxRotation = 15 } = options

  // Reference to the card DOM element
  const ref = useRef<HTMLDivElement | null>(null)

  // Raw motion values (targets)
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  // Spring-smoothed values (what we actually render)
  const rotateX = useSpring(rawRotateX, {
    stiffness: 150,
    damping: 20,
  })

  const rotateY = useSpring(rawRotateY, {
    stiffness: 150,
    damping: 20,
  })

  function handleMouseMove(event: React.MouseEvent) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    // Mouse position relative to card
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top

    // Center the coordinates
    const centerX = relativeX - rect.width / 2
    const centerY = relativeY - rect.height / 2

    // Normalize to [-1, 1]
    const normalizedX = centerX / (rect.width / 2)
    const normalizedY = centerY / (rect.height / 2)

    // Clamp (safety)
    const clampedX = Math.max(-1, Math.min(1, normalizedX))
    const clampedY = Math.max(-1, Math.min(1, normalizedY))

    // Convert to rotation
    rawRotateY.set(clampedX * maxRotation)
    rawRotateX.set(-clampedY * maxRotation)
  }

  function handleMouseLeave() {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return {
    ref,
    motionStyle: {
      rotateX,
      rotateY,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}