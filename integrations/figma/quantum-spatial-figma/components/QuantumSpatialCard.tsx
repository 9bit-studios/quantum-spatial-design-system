'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface QuantumSpatialCardProps {
  variant?: 'glass' | 'elevated' | 'outlined' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  quantum?: boolean;
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Apple HIG Compliant Quantum-Spatial Card Component
 * - Glassmorphism effects for Petersen Games aesthetic
 * - Proper contrast ratios for accessibility
 * - M4 optimized animations and transitions
 * - Responsive design with safe area support
 */
export const QuantumSpatialCard: React.FC<QuantumSpatialCardProps> = ({
  variant = 'glass',
  padding = 'md',
  quantum = true,
  hover = true,
  children,
  className,
  onClick,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300 ease-out";
  
  const variants = {
    glass: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl",
    elevated: "bg-gray-900/90 backdrop-blur-sm border border-white/5 shadow-2xl",
    outlined: "bg-transparent border-2 border-white/20",
    solid: "bg-gray-900 border border-gray-800 shadow-lg"
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const quantumEffects = quantum ? {
    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(90, 200, 250, 0.1) 0%, transparent 50%)",
    boxShadow: variant === 'glass' 
      ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      : undefined
  } : {};

  const isInteractive = !!onClick;

  return (
    <motion.div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        "rounded-2xl", // Apple-style rounded corners
        isInteractive && "cursor-pointer",
        className
      )}
      style={quantumEffects}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover && isInteractive ? {
        y: -4,
        scale: 1.02,
        boxShadow: quantum 
          ? "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "0 12px 40px rgba(0, 0, 0, 0.3)"
      } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...props}
    >
      {/* Quantum gradient overlay */}
      {quantum && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(90, 200, 250, 0.15) 0%, transparent 50%)"
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Quantum border effect */}
      {quantum && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(90, 200, 250, 0.4), transparent)",
            backgroundSize: "200% 1px",
            backgroundPosition: "-100% 0",
            backgroundRepeat: "no-repeat",
            maskImage: "linear-gradient(to right, transparent, black, transparent)"
          }}
          animate={{
            backgroundPosition: ["100% 0", "-100% 0"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* iOS-style inner shadow for depth */}
      {variant === 'glass' && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)"
          }}
        />
      )}
    </motion.div>
  );
};

export default QuantumSpatialCard;