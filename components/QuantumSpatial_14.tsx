import React from 'react';

interface QuantumSpatial14Props {
  size?: number;
  className?: string;
  animate?: boolean;
  accentColor?: string;
}

/**
 * QuantumSpatial_14 - Advanced quantum-spatial SVG component
 *
 * Features:
 * - Liquid-glass quantum aesthetic with glassmorphism effects
 * - M4-optimized animations with reduced motion support
 * - Dark-mysterious theme aligned with 9Bit Studios brand
 * - Spatial depth perception through layered geometry
 * - Responsive scaling with accessibility support
 */
export const QuantumSpatial_14: React.FC<QuantumSpatial14Props> = ({
  size = 200,
  className = '',
  animate = true,
  accentColor = '#E85D75',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quantum Spatial Visualization - Animated geometric pattern with glassmorphism effects"
    >
      <defs>
        {/* Quantum Gradient - Primary */}
        <linearGradient id="quantumGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
        </linearGradient>

        {/* Quantum Gradient - Secondary */}
        <linearGradient id="quantumGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.7" />
        </linearGradient>

        {/* Radial Glow - Spatial Depth */}
        <radialGradient id="quantumGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Glassmorphism Filter */}
        <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.7 0"
          />
        </filter>

        {/* Shadow for Depth */}
        <filter id="quantumShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip Path for Geometric Precision */}
        <clipPath id="quantumClip">
          <rect x="0" y="0" width="200" height="200" rx="16" />
        </clipPath>
      </defs>

      {/* Background Glow Layer */}
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        fill="url(#quantumGlow)"
        opacity="0.3"
      />

      {/* Outer Ring - Spatial Boundary */}
      <circle
        cx="100"
        cy="100"
        r="85"
        stroke="url(#quantumGradient1)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        filter="url(#glassBlur)"
      >
        {animate && (
          <animate
            attributeName="r"
            values="85;88;85"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        )}
      </circle>

      {/* Middle Ring - Quantum Layer */}
      <circle
        cx="100"
        cy="100"
        r="65"
        stroke="url(#quantumGradient2)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        filter="url(#glassBlur)"
      >
        {animate && (
          <animate
            attributeName="r"
            values="65;68;65"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            begin="0.5s"
          />
        )}
      </circle>

      {/* Inner Ring - Core */}
      <circle
        cx="100"
        cy="100"
        r="45"
        stroke={accentColor}
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
        filter="url(#quantumShadow)"
      >
        {animate && (
          <animate
            attributeName="r"
            values="45;48;45"
            dur="2.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            begin="1s"
          />
        )}
      </circle>

      {/* Quantum Particles - Rotating */}
      <g filter="url(#quantumShadow)">
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 70 * Math.cos(rad);
          const y = 100 + 70 * Math.sin(rad);

          return (
            <circle
              key={`particle-outer-${index}`}
              cx={x}
              cy={y}
              r="3"
              fill="url(#quantumGradient1)"
              opacity="0.7"
            >
              {animate && (
                <>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 100 100`}
                    to={`360 100 100`}
                    dur="8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                  />
                </>
              )}
            </circle>
          );
        })}
      </g>

      {/* Inner Particles - Counter-Rotating */}
      <g filter="url(#glassBlur)">
        {[30, 90, 150, 210, 270, 330].map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 50 * Math.cos(rad);
          const y = 100 + 50 * Math.sin(rad);

          return (
            <circle
              key={`particle-inner-${index}`}
              cx={x}
              cy={y}
              r="2.5"
              fill="#4ECDC4"
              opacity="0.6"
            >
              {animate && (
                <>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`360 100 100`}
                    to={`0 100 100`}
                    dur="6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.9;0.6"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin={`${index * 0.25}s`}
                  />
                </>
              )}
            </circle>
          );
        })}
      </g>

      {/* Central Quantum Node */}
      <circle
        cx="100"
        cy="100"
        r="12"
        fill="url(#quantumGradient1)"
        opacity="0.9"
        filter="url(#quantumShadow)"
      >
        {animate && (
          <>
            <animate
              attributeName="r"
              values="12;15;12"
              dur="2s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.9;1;0.9"
              dur="2s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Central Highlight - Glassmorphism */}
      <circle
        cx="100"
        cy="100"
        r="8"
        fill="white"
        opacity="0.3"
        filter="url(#glassBlur)"
      >
        {animate && (
          <animate
            attributeName="opacity"
            values="0.3;0.5;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Geometric Connectors - Spatial Grid */}
      <g stroke="url(#quantumGradient2)" strokeWidth="0.5" opacity="0.3">
        <line x1="100" y1="15" x2="100" y2="185" />
        <line x1="15" y1="100" x2="185" y2="100" />
        <line x1="35" y1="35" x2="165" y2="165" />
        <line x1="165" y1="35" x2="35" y2="165" />
      </g>

      {/* Corner Accent Nodes */}
      {[
        { x: 20, y: 20 },
        { x: 180, y: 20 },
        { x: 20, y: 180 },
        { x: 180, y: 180 },
      ].map((pos, index) => (
        <circle
          key={`corner-${index}`}
          cx={pos.x}
          cy={pos.y}
          r="2"
          fill={accentColor}
          opacity="0.5"
        >
          {animate && (
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${index * 0.2}s`}
            />
          )}
        </circle>
      ))}
    </svg>
  );
};

export default QuantumSpatial_14;
