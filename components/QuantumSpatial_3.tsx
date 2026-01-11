import React from 'react';

interface QuantumSpatial3Props {
  width?: number;
  height?: number;
  animate?: boolean;
  className?: string;
}

/**
 * QuantumSpatial_3 SVG Component
 *
 * Quantum-spatial themed animated SVG featuring:
 * - Liquid-glass morphing geometry
 * - Spatial depth layers with glassmorphism
 * - M4-optimized animations
 * - Dark-mysterious quantum aesthetic
 *
 * Design System: Quantum Spatial
 * Brand: 9Bit Studios
 * Theme: Dark-mysterious, tech-forward, spatial intelligence
 */
export const QuantumSpatial_3: React.FC<QuantumSpatial3Props> = ({
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
      aria-label="Quantum Spatial Intelligence visualization with animated geometric patterns"
    >
      <defs>
        {/* Quantum Glow Gradient */}
        <radialGradient id="quantumGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#E85D75" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0" />
        </radialGradient>

        {/* Glassmorphism Gradient */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
        </linearGradient>

        {/* Spatial Depth Gradient */}
        <radialGradient id="spatialDepth" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#E85D75" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#4ECDC4" stopOpacity="0.3" />
          <stop offset="80%" stopColor="#7B68EE" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0" />
        </radialGradient>

        {/* Liquid Glass Filter */}
        <filter id="liquidGlass" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="glow" />
          <feBlend in="SourceGraphic" in2="glow" mode="screen" />
        </filter>

        {/* Quantum Particle Effect */}
        <filter id="quantumParticle">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" />
        </filter>

        {/* Animated Path Morphing */}
        {animate && (
          <>
            <animate
              id="morphAnimation"
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
            />
          </>
        )}
      </defs>

      {/* Background Quantum Field */}
      <rect width="400" height="400" fill="#0A0E27" />

      {/* Ambient Glow Layer */}
      <circle cx="200" cy="200" r="180" fill="url(#quantumGlow)" opacity="0.3">
        {animate && (
          <animate
            attributeName="r"
            values="180;200;180"
            dur="6s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Primary Spatial Geometry - Hexagonal Framework */}
      <g filter="url(#liquidGlass)">
        <path
          d="M 200 60 L 280 110 L 280 210 L 200 260 L 120 210 L 120 110 Z"
          fill="url(#glassGradient)"
          stroke="rgba(78, 205, 196, 0.5)"
          strokeWidth="2"
        >
          {animate && (
            <>
              <animate
                attributeName="d"
                values="M 200 60 L 280 110 L 280 210 L 200 260 L 120 210 L 120 110 Z;
                        M 200 70 L 270 115 L 270 205 L 200 250 L 130 205 L 130 115 Z;
                        M 200 60 L 280 110 L 280 210 L 200 260 L 120 210 L 120 110 Z"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            </>
          )}
        </path>

        {/* Inner Hexagon Layer */}
        <path
          d="M 200 100 L 250 130 L 250 190 L 200 220 L 150 190 L 150 130 Z"
          fill="url(#spatialDepth)"
          stroke="rgba(232, 93, 117, 0.6)"
          strokeWidth="1.5"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 160"
              to="360 200 160"
              dur="20s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Core Hexagon */}
        <path
          d="M 200 130 L 230 150 L 230 180 L 200 200 L 170 180 L 170 150 Z"
          fill="rgba(78, 205, 196, 0.2)"
          stroke="rgba(78, 205, 196, 0.8)"
          strokeWidth="2"
        >
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.8;1;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>

      {/* Spatial Connection Lines */}
      <g stroke="rgba(123, 104, 238, 0.4)" strokeWidth="1" opacity="0.6">
        <line x1="200" y1="60" x2="200" y2="130">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="280" y1="110" x2="230" y2="150">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="280" y1="210" x2="230" y2="180">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="260" x2="200" y2="200">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="120" y1="210" x2="170" y2="180">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="2s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="120" y1="110" x2="170" y2="150">
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="2.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>

      {/* Quantum Particles - Orbital System */}
      <g filter="url(#quantumParticle)">
        {/* Primary Orbit */}
        <circle cx="200" cy="80" r="4" fill="#4ECDC4">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 160"
              to="360 200 160"
              dur="12s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Secondary Orbit */}
        <circle cx="260" cy="160" r="3" fill="#E85D75">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="120 200 160"
              to="480 200 160"
              dur="12s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Tertiary Orbit */}
        <circle cx="140" cy="160" r="3" fill="#7B68EE">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="240 200 160"
              to="600 200 160"
              dur="12s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Spatial Depth Rings */}
      <g stroke="rgba(255, 255, 255, 0.1)" fill="none" strokeWidth="1">
        <circle cx="200" cy="160" r="90">
          {animate && (
            <animate
              attributeName="r"
              values="90;95;90"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="200" cy="160" r="120">
          {animate && (
            <animate
              attributeName="r"
              values="120;125;120"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="200" cy="160" r="150">
          {animate && (
            <animate
              attributeName="r"
              values="150;155;150"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Energy Flow Paths - Liquid Glass Effect */}
      <g stroke="rgba(78, 205, 196, 0.3)" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 120 110 Q 160 130 200 130">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M 230 150 Q 255 130 280 110">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M 280 210 Q 255 190 230 180">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M 200 200 Q 200 230 200 260">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              begin="0.9s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M 170 180 Q 145 195 120 210">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M 170 150 Q 145 130 120 110">
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="2s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>

      {/* Central Core Glow */}
      <circle cx="200" cy="165" r="15" fill="url(#spatialDepth)">
        {animate && (
          <>
            <animate
              attributeName="r"
              values="15;18;15"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="3s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Micro Details - Quantum Dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const radius = 100;
        const cx = 200 + radius * Math.cos(angle);
        const cy = 160 + radius * Math.sin(angle);

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="rgba(255, 255, 255, 0.4)"
          >
            {animate && (
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="2s"
                begin={`${i * 0.166}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        );
      })}
    </svg>
  );
};

export default QuantumSpatial_3;
