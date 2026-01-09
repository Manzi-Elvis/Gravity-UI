import { motion } from "framer-motion"
import type { PropsWithChildren, ReactNode } from "react"
import { useGravity } from "./useGravity"
import React from "react"

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
  const { ref, handlers, getLayerTransform } = useGravity({ maxRotation })

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative rounded-xl bg-zinc-900 p-6 shadow-xl will-change-transform overflow-hidden ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        const depthFactor = 1 - index * 0.2 // front = 1, back = 0.6
        const { rotateX, rotateY } = getLayerTransform(depthFactor)

        return (
          <motion.div
            key={index}
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
