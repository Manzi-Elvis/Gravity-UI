import { motion } from "framer-motion"
import { type PropsWithChildren } from "react"
import { useGravity } from "./useGravity"

type GravityCardProps = {
  className?: string
  maxRotation?: number
}

export function GravityCard({
  children,
  className = "",
  maxRotation,
}: PropsWithChildren<GravityCardProps>) {
  const { ref, motionStyle, handlers } = useGravity({
    maxRotation,
  })

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{
        ...motionStyle,
        perspective: 1000,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={`
        relative
        rounded-xl
        bg-zinc-900
        p-6
        shadow-xl
        will-change-transform
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}