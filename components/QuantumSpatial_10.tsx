import React from 'react';

interface QuantumSpatial10Props {
  width?: number;
  height?: number;
  className?: string;
  animate?: boolean;
}

/**
 * QuantumSpatial_10 Component
 *
 * Quantum-spatial animated SVG with:
 * - Glassmorphism liquid-glass effects
 * - Dark-mysterious 9Bit Studios aesthetic
 * - M4-optimized animations (GPU-accelerated)
 * - Responsive scaling with preserved aspect ratio
 */
export const QuantumSpatial_10: React.FC<QuantumSpatial10Props> = ({
  width = 400,
  height = 400,
  className = '',
  animate = true,
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
      aria-label="Quantum Spatial geometric pattern with animated liquid-glass effects"
    >
      <title>Quantum Spatial 10</title>

      {/* Definitions for gradients, filters, and masks */}
      <defs>
        {/* Quantum Gradient - Primary */}
        <linearGradient id="quantum-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E85D75" stopOpacity="0.8">
            {animate && (
              <animate
                attributeName="stopOpacity"
                values="0.8;1;0.8"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.6">
            {animate && (
              <animate
                attributeName="stopOpacity"
                values="0.6;0.9;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8">
            {animate && (
              <animate
                attributeName="stopOpacity"
                values="0.8;1;0.8"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>

        {/* Quantum Gradient - Secondary */}
        <radialGradient id="quantum-gradient-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#E85D75" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0.1" />
        </radialGradient>

        {/* Glassmorphism Blur Filter */}
        <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>
        </filter>

        {/* Glow Effect Filter */}
        <filter id="quantum-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feFlood floodColor="#4ECDC4" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Liquid Glass Pattern */}
        <pattern id="liquid-glass" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="rgba(255, 255, 255, 0.1)" />
          <circle cx="10" cy="30" r="1.5" fill="rgba(78, 205, 196, 0.15)" />
          <circle cx="30" cy="10" r="1.5" fill="rgba(232, 93, 117, 0.15)" />
        </pattern>
      </defs>

      {/* Background - Dark Mysterious Base */}
      <rect width="400" height="400" fill="#0A0E27" />

      {/* Radial Ambient Glow */}
      <circle cx="200" cy="200" r="180" fill="url(#quantum-gradient-radial)" opacity="0.6">
        {animate && (
          <animate
            attributeName="r"
            values="180;200;180"
            dur="6s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Quantum Spatial Geometric Structure */}
      <g id="quantum-geometry">
        {/* Outer Hexagon Ring */}
        <path
          d="M 200 40 L 280 90 L 280 190 L 200 240 L 120 190 L 120 90 Z"
          stroke="url(#quantum-gradient-primary)"
          strokeWidth="2"
          fill="rgba(255, 255, 255, 0.03)"
          filter="url(#quantum-glow)"
        >
          {animate && (
            <>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.6;1;0.6"
                dur="3s"
                repeatCount="indefinite"
              />
            </>
          )}
        </path>

        {/* Middle Hexagon */}
        <path
          d="M 200 80 L 250 115 L 250 185 L 200 220 L 150 185 L 150 115 Z"
          stroke="#4ECDC4"
          strokeWidth="1.5"
          fill="rgba(78, 205, 196, 0.08)"
          filter="url(#glass-blur)"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 200 200"
              to="0 200 200"
              dur="15s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Inner Hexagon */}
        <path
          d="M 200 120 L 230 140 L 230 180 L 200 200 L 170 180 L 170 140 Z"
          stroke="#E85D75"
          strokeWidth="1.5"
          fill="rgba(232, 93, 117, 0.1)"
          filter="url(#glass-blur)"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="12s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Central Core */}
        <circle
          cx="200"
          cy="160"
          r="20"
          fill="url(#quantum-gradient-primary)"
          filter="url(#quantum-glow)"
          opacity="0.8"
        >
          {animate && (
            <>
              <animate
                attributeName="r"
                values="20;25;20"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      </g>

      {/* Connecting Lines - Quantum Entanglement */}
      <g id="quantum-lines" opacity="0.4">
        <line x1="200" y1="40" x2="200" y2="120" stroke="#4ECDC4" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="280" y1="90" x2="230" y2="140" stroke="#E85D75" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="280" y1="190" x2="230" y2="180" stroke="#A78BFA" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="240" x2="200" y2="200" stroke="#4ECDC4" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="120" y1="190" x2="170" y2="180" stroke="#E85D75" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="2s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="120" y1="90" x2="170" y2="140" stroke="#A78BFA" strokeWidth="1">
          {animate && (
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              begin="2.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>

      {/* Orbital Particles - Quantum Dots */}
      <g id="quantum-particles">
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const radius = 140;
          const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 160 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill={index % 2 === 0 ? "#4ECDC4" : "#E85D75"}
              opacity="0.6"
              filter="url(#quantum-glow)"
            >
              {animate && (
                <>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 200 160`}
                    to={`360 200 160`}
                    dur="10s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="2s"
                    begin={`${index * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
          );
        })}
      </g>

      {/* Liquid Glass Overlay */}
      <rect
        width="400"
        height="400"
        fill="url(#liquid-glass)"
        opacity="0.3"
      />

      {/* Glassmorphism Border Effect */}
      <rect
        x="10"
        y="10"
        width="380"
        height="380"
        rx="20"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
        fill="none"
        filter="url(#glass-blur)"
      />
    </svg>
  );
};

export default QuantumSpatial_10;
