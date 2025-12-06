import React from 'react';

interface QuantumSpatial_4Props {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * QuantumSpatial_4 - Premium Quantum-Spatial SVG Component
 *
 * Design Philosophy:
 * - Liquid-glass quantum-spatial aesthetic
 * - Glassmorphism with depth and layering
 * - M4-optimized animations with reduced motion support
 * - Dark-mysterious theme with cosmic elements
 *
 * Brand Alignment: 9Bit Studios
 * Design System: Quantum Spatial
 * Accessibility: Respects prefers-reduced-motion
 */
export const QuantumSpatial_4: React.FC<QuantumSpatial_4Props> = ({
  size = 240,
  className = '',
  animated = true
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quantum Spatial Design Element - Layered glass morphism with cosmic energy flows"
    >
      <defs>
        {/* Quantum Glass Gradient */}
        <linearGradient id="quantumGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E85D75" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
        </linearGradient>

        {/* Cosmic Energy Gradient */}
        <radialGradient id="cosmicEnergy" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#E85D75" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
        </radialGradient>

        {/* Liquid Glass Blur Filter */}
        <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.7 0"
          />
        </filter>

        {/* Inner Glow Filter */}
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>

        {/* Shimmer Animation */}
        {animated && (
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
            <animate
              attributeName="x1"
              values="-100%;200%"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="0%;300%"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        )}
      </defs>

      {/* Background Quantum Field */}
      <rect
        width="240"
        height="240"
        fill="url(#quantumGlass)"
        opacity="0.1"
      />

      {/* Outer Ring - Quantum Boundary */}
      <circle
        cx="120"
        cy="120"
        r="100"
        stroke="url(#cosmicEnergy)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        filter="url(#glassBlur)"
      >
        {animated && (
          <>
            <animate
              attributeName="r"
              values="100;105;100"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.5;0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Middle Ring - Spatial Layer */}
      <circle
        cx="120"
        cy="120"
        r="70"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeDasharray="4 4"
      >
        {animated && (
          <>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 120 120"
              to="360 120 120"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;8"
              dur="1s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Quantum Core - Glass Sphere */}
      <g filter="url(#innerGlow)">
        <circle
          cx="120"
          cy="120"
          r="50"
          fill="url(#quantumGlass)"
          opacity="0.6"
        />
        <circle
          cx="120"
          cy="120"
          r="50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="1"
        />
        {animated && (
          <circle
            cx="120"
            cy="120"
            r="50"
            fill="url(#shimmer)"
            opacity="0.5"
          />
        )}
      </g>

      {/* Energy Nodes - Quantum Particles */}
      {[0, 72, 144, 216, 288].map((angle, index) => {
        const x = 120 + 70 * Math.cos((angle * Math.PI) / 180);
        const y = 120 + 70 * Math.sin((angle * Math.PI) / 180);

        return (
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r="6"
              fill="#E85D75"
              opacity="0.6"
              filter="url(#innerGlow)"
            >
              {animated && (
                <>
                  <animate
                    attributeName="r"
                    values="6;8;6"
                    dur="2s"
                    begin={`${index * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    begin={`${index * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
            {/* Connection Lines */}
            <line
              x1="120"
              y1="120"
              x2={x}
              y2={y}
              stroke="#4ECDC4"
              strokeWidth="0.5"
              opacity="0.2"
            >
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.2;0.5;0.2"
                  dur="2s"
                  begin={`${index * 0.4}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          </g>
        );
      })}

      {/* Center Quantum Singularity */}
      <circle
        cx="120"
        cy="120"
        r="12"
        fill="url(#cosmicEnergy)"
        filter="url(#innerGlow)"
      >
        {animated && (
          <>
            <animate
              attributeName="r"
              values="12;14;12"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Orbital Paths */}
      {[40, 60].map((radius, index) => (
        <circle
          key={`orbit-${index}`}
          cx="120"
          cy="120"
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2 4"
        >
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 120 120"
              to={index % 2 === 0 ? "360 120 120" : "-360 120 120"}
              dur={`${15 + index * 5}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}

      {/* Quantum Particles - Small Orbs */}
      {[30, 90, 150, 210, 270, 330].map((angle, index) => {
        const orbitRadius = 85;
        const x = 120 + orbitRadius * Math.cos((angle * Math.PI) / 180);
        const y = 120 + orbitRadius * Math.sin((angle * Math.PI) / 180);

        return (
          <circle
            key={`particle-${index}`}
            cx={x}
            cy={y}
            r="2"
            fill="#A855F7"
            opacity="0.5"
          >
            {animated && (
              <>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 120 120"
                  to="360 120 120"
                  dur="12s"
                  begin={`${index * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.9;0.5"
                  dur="2s"
                  begin={`${index * 0.3}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        );
      })}

      {/* Reduced Motion Support */}
      {animated && (
        <style>
          {`
            @media (prefers-reduced-motion: reduce) {
              svg * {
                animation: none !important;
              }
            }
          `}
        </style>
      )}
    </svg>
  );
};

export default QuantumSpatial_4;
