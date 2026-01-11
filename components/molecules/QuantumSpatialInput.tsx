'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface QuantumSpatialInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search' | 'email' | 'password';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  quantum?: boolean;
  loading?: boolean;
}

/**
 * Apple HIG Compliant Quantum-Spatial Input Component
 * - 44px minimum height for touch targets
 * - Glassmorphism design for Petersen Games
 * - Full accessibility support with proper labeling
 * - Real-time validation feedback
 * - M4 optimized animations
 */
export const QuantumSpatialInput = forwardRef<HTMLInputElement, QuantumSpatialInputProps>(({
  variant = 'default',
  size = 'md',
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  quantum = true,
  loading = false,
  className,
  disabled,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = "w-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-500/50",
    search: "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900/70 focus:border-blue-500/50",
    email: "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-500/50",
    password: "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-500/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[44px] rounded-lg",
    md: "px-4 py-3 text-base min-h-[44px] rounded-xl",
    lg: "px-5 py-4 text-lg min-h-[48px] rounded-xl"
  };

  const quantumStyles = quantum ? {
    backdropFilter: "blur(10px)",
    boxShadow: error 
      ? "0 0 0 1px rgba(239, 68, 68, 0.5), 0 4px 16px rgba(0, 0, 0, 0.1)"
      : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
  } : {};

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <motion.label
          htmlFor={inputId}
          className="block text-sm font-medium text-white mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
            iconSize[size]
          )}>
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={ref}
          id={inputId}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            leftIcon && "pl-10",
            (rightIcon || loading) && "pr-10",
            error && "border-red-500/50 focus:border-red-500",
            className
          )}
          style={quantumStyles}
          disabled={disabled || loading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileFocus={{ 
            scale: 1.01,
            boxShadow: quantum 
              ? "0 0 0 2px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(0, 0, 0, 0.15)"
              : "0 0 0 2px rgba(59, 130, 246, 0.5)"
          }}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {/* Right Icon / Loading */}
        {(rightIcon || loading) && (
          <div className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            iconSize[size]
          )}>
            {loading ? (
              <motion.div
                className="text-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg className={iconSize[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </motion.div>
            ) : (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        )}

        {/* Quantum border effect */}
        {quantum && !error && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none opacity-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
              backgroundSize: "200% 1px",
              backgroundPosition: "-100% 0",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to bottom, transparent, black 50%, black 50%, transparent)"
            }}
            whileFocus={{
              opacity: 1,
              backgroundPosition: "100% 0"
            }}
            transition={{ duration: 0.6 }}
          />
        )}
      </div>

      {/* Helper Text / Error */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="alert"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

QuantumSpatialInput.displayName = 'QuantumSpatialInput';

export default QuantumSpatialInput;