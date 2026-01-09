import * as React from "react"
import { motion } from "framer-motion"
import type { PropsWithChildren, ReactNode } from "react"
import { useGravity } from "./useGravity"

type GravityCardProps = {
  className?: string
  maxRotation?: number
  children: ReactNode
}

export function GravityCard({
  children,
  className = "",
  maxRotation,
}: PropsWithChildren<GravityCardProps>) {
  const { ref, motionStyle, handlers } = useGravity({ maxRotation })

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{ ...motionStyle, perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        relative
        rounded-xl
        bg-zinc-900
        p-6
        shadow-xl
        will-change-transform
        overflow-hidden
        ${className}
      `}
    >
      {/* Wrap children in layers */}
      {React.Children.map(children, (child, index) => {
        // Each layer moves less the deeper it is
        const depthFactor = 1 - index * 0.2 // front = 1, back = 0.6
        const { rotateX, rotateY } = getLayerTransform(depthFactor)
        
        return (
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative z-10 pointer-events-none"
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}