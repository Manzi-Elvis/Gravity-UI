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
  const { ref, handlers, getLayerTransform, glowX, glowY, glowOpacity } = useGravity({ maxRotation })

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative rounded-xl bg-zinc-900 p-6 shadow-xl will-change-transform overflow-hidden ${className}`}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)",
          translateX: glowX,
          translateY: glowY,
          opacity: glowOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Inner parallax layers */}
      {React.Children.map(children, (child, index) => {
        const depthFactor = 1 - index * 0.2
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