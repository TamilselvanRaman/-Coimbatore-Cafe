import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  intensity?: number;
  className?: string;
}

export function FloatingElement({ 
  children, 
  duration = 6, 
  delay = 0, 
  intensity = 20,
  className 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity/2, intensity, -intensity/2],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function CoffeeBean({ className, size = "sm" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-6 h-6",
  };

  return (
    <FloatingElement 
      className={className}
      duration={Math.random() * 4 + 4}
      delay={Math.random() * 2}
      intensity={Math.random() * 15 + 10}
    >
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-amber-600 to-amber-800 opacity-60`} />
    </FloatingElement>
  );
}

export function SteamEffect({ className }: { className?: string }) {
  return (
    <div className={className}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-8 bg-white/30 rounded-full"
          style={{ 
            marginLeft: i * 8,
            marginTop: i * -4,
          }}
          animate={{
            scaleY: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
