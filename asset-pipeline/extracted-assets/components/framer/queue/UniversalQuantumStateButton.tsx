import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuantumStateButton({
  label = "Activate",
  onClick,
  state = "heritage", // heritage, transitional, quantum
  variant = "primary", // primary, secondary, ghost
  size = "md", // sm, md, lg
  isLoading = false
}) {
  const [hovered, setHovered] = useState(false);

  // Color mapping
  const variantColors = {
    primary: {
      bg: "#331F4A",
      text: "#FFFFFF",
      border: "#5AC8FA",
      accent: "#BF4080"
    },
    secondary: {
      bg: "#131A36",
      text: "#FFFFFF",
      border: "#6A3093",
      accent: "#5AC8FA"
    },
    ghost: {
      bg: "transparent",
      text: "#FFFFFF",
      border: "#5AC8FA",
      accent: "#5AC8FA"
    }
  };

  // Size mapping
  const sizeStyles = {
    sm: {
      py: "py-1",
      px: "px-3",
      text: "text-xs",
      height: "h-8"
    },
    md: {
      py: "py-2",
      px: "px-4",
      text: "text-sm",
      height: "h-10"
    },
    lg: {
      py: "py-3",
      px: "px-6",
      text: "text-base",
      height: "h-12"
    }
  };

  // State-based styling
  const stateStyles = {
    heritage: {
      borderRadius: "0px",
      opacity: 0.9,
      shadow: "none"
    },
    transitional: {
      borderRadius: "4px",
      opacity: 1,
      shadow: `0 2px 6px ${variantColors[variant].accent}33`
    },
    quantum: {
      borderRadius: "8px",
      opacity: 1,
      shadow: `0 4px 12px ${variantColors[variant].accent}66`
    }
  };

  return (
    <motion.button
      className={`relative ${sizeStyles[size].height} ${sizeStyles[size].py} ${sizeStyles[size].px} ${sizeStyles[size].text} font-medium flex items-center justify-center overflow-hidden`}
      style={{
        background: variant === "ghost" ? "transparent" : variantColors[variant].bg,
        color: variantColors[variant].text,
        borderRadius: stateStyles[state].borderRadius,
        boxShadow: stateStyles[state].shadow,
        border: variant === "ghost" ? `1px solid ${variantColors[variant].border}` : "none"
      }}
      animate={{
        borderRadius: stateStyles[state].borderRadius,
        opacity: isLoading ? 0.7 : stateStyles[state].opacity,
        boxShadow: hovered
          ? `0 6px 16px ${variantColors[variant].accent}88`
          : stateStyles[state].shadow
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      disabled={isLoading}
    >
      {/* Background Grid for non-ghost buttons */}
      {variant !== "ghost" && (
        <div className="absolute inset-0 opacity-10">
          <GridSystem />
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          className="absolute left-3 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={variantColors[variant].accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="15 85"
            />
          </svg>
        </motion.div>
      )}

      {/* Label */}
      <span className="relative z-10">
        {label}
      </span>

      {/* Edge glow for quantum state */}
      {state === "quantum" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: hovered
              ? `inset 0 0 8px ${variantColors[variant].accent}aa`
              : `inset 0 0 4px ${variantColors[variant].accent}66`
          }}
          style={{ borderRadius: "8px" }}
        />
      )}

      {/* Energy particles for hover */}
      {hovered && state !== "heritage" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <EnergyParticles color={variantColors[variant].accent} />
        </div>
      )}
    </motion.button>
  );
}

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const EnergyParticles = ({ color }) => {
  const particles = Array(5).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random()
          }}
        />
      ))}
    </>
  );
};
