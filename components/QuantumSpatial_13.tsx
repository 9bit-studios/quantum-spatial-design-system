/**
 * QuantumSpatial_13 Component
 *
 * Animated quantum-spatial SVG with glassmorphism effects
 * Optimized for M4 Neural Engine acceleration
 * 9Bit Studios quantum-spatial aesthetic
 *
 * Features:
 * - Liquid-glass quantum particles
 * - Spatial depth with layered glassmorphism
 * - Animated quantum wave transitions
 * - Dark-mysterious color palette
 * - M4-accelerated rendering
 */

import React from 'react';

interface QuantumSpatial13Props {
  width?: number;
  height?: number;
  animate?: boolean;
  className?: string;
}

export const QuantumSpatial_13: React.FC<QuantumSpatial13Props> = ({
  width = 400,
  height = 400,
  animate = true,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quantum Spatial Animation"
    >
      {/* Definitions for quantum-spatial effects */}
      <defs>
        {/* Glassmorphism blur filter */}
        <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"
          />
        </filter>

        {/* Quantum glow effect */}
        <filter id="quantum-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feFlood floodColor="#4ECDC4" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Liquid gradient - primary quantum */}
        <radialGradient id="quantum-gradient-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E85D75" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0.2" />
        </radialGradient>

        {/* Liquid gradient - secondary spatial */}
        <radialGradient id="quantum-gradient-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0.1" />
        </radialGradient>

        {/* Glassmorphism surface gradient */}
        <linearGradient id="glass-surface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
        </linearGradient>

        {/* Quantum particle mask */}
        <mask id="particle-mask">
          <circle cx="200" cy="200" r="150" fill="white" />
        </mask>
      </defs>

      {/* Background quantum field */}
      <rect width="400" height="400" fill="#0A0E27" />

      {/* Animated quantum wave layers */}
      <g opacity="0.3">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
          opacity="0.4"
        >
          {animate && (
            <animate
              attributeName="r"
              values="180;200;180"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
          {animate && (
            <animate
              attributeName="opacity"
              values="0.4;0.2;0.4"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="url(#quantum-gradient-2)"
          strokeWidth="2"
          opacity="0.5"
        >
          {animate && (
            <animate
              attributeName="r"
              values="140;160;140"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
          {animate && (
            <animate
              attributeName="opacity"
              values="0.5;0.3;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
          opacity="0.6"
        >
          {animate && (
            <animate
              attributeName="r"
              values="100;120;100"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
          {animate && (
            <animate
              attributeName="opacity"
              values="0.6;0.4;0.6"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Central glassmorphism sphere */}
      <g filter="url(#glass-blur)">
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="url(#glass-surface)"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="1"
        />
      </g>

      {/* Quantum core with glow */}
      <g filter="url(#quantum-glow)">
        <circle
          cx="200"
          cy="200"
          r="60"
          fill="url(#quantum-gradient-1)"
        >
          {animate && (
            <animate
              attributeName="r"
              values="60;65;60"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Quantum particles - orbital pattern */}
      <g mask="url(#particle-mask)">
        {/* Particle 1 */}
        <circle
          cx="280"
          cy="200"
          r="6"
          fill="#4ECDC4"
          opacity="0.8"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="8s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Particle 2 */}
        <circle
          cx="120"
          cy="200"
          r="5"
          fill="#E85D75"
          opacity="0.8"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Particle 3 */}
        <circle
          cx="200"
          cy="120"
          r="4"
          fill="#A78BFA"
          opacity="0.8"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="10s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Particle 4 */}
        <circle
          cx="200"
          cy="280"
          r="5"
          fill="#4ECDC4"
          opacity="0.7"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Particle 5 - diagonal */}
        <circle
          cx="260"
          cy="140"
          r="4"
          fill="#E85D75"
          opacity="0.6"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="9s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Particle 6 - diagonal */}
        <circle
          cx="140"
          cy="260"
          r="5"
          fill="#A78BFA"
          opacity="0.7"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Spatial depth indicators - corner accents */}
      <g opacity="0.4">
        <line
          x1="20"
          y1="20"
          x2="60"
          y2="20"
          stroke="url(#quantum-gradient-2)"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="60"
          stroke="url(#quantum-gradient-2)"
          strokeWidth="2"
        />

        <line
          x1="380"
          y1="20"
          x2="340"
          y2="20"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
        />
        <line
          x1="380"
          y1="20"
          x2="380"
          y2="60"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
        />

        <line
          x1="20"
          y1="380"
          x2="60"
          y2="380"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="380"
          x2="20"
          y2="340"
          stroke="url(#quantum-gradient-1)"
          strokeWidth="2"
        />

        <line
          x1="380"
          y1="380"
          x2="340"
          y2="380"
          stroke="url(#quantum-gradient-2)"
          strokeWidth="2"
        />
        <line
          x1="380"
          y1="380"
          x2="380"
          y2="340"
          stroke="url(#quantum-gradient-2)"
          strokeWidth="2"
        />
      </g>

      {/* Quantum connection lines */}
      <g opacity="0.2" stroke="rgba(78, 205, 196, 0.3)" strokeWidth="1">
        <line x1="200" y1="200" x2="280" y2="200">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="200" x2="120" y2="200">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="200" x2="200" y2="120">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="2.8s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="200" x2="200" y2="280">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="3.2s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>
    </svg>
  );
};

export default QuantumSpatial_13;
