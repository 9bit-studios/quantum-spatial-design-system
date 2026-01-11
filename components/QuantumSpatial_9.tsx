import React from 'react';

interface QuantumSpatial9Props {
  /** Size in pixels (default: 200) */
  size?: number;
  /** Enable animation (default: true) */
  animated?: boolean;
  /** Primary accent color (default: quantum pink) */
  accentColor?: string;
  /** Secondary accent color (default: quantum cyan) */
  secondaryColor?: string;
  /** Animation speed multiplier (default: 1) */
  animationSpeed?: number;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * QuantumSpatial_9 Component
 *
 * A visually stunning animated SVG showcasing 9Bit Studios' quantum-spatial aesthetic.
 * Features:
 * - Liquid-glass glassmorphism effects
 * - Orbital particle system with quantum glow
 * - Pulsating energy waves
 * - Dark-mysterious quantum theme
 * - M4-optimized rendering with reduced complexity for performance
 *
 * @component
 * @example
 * ```tsx
 * <QuantumSpatial_9 size={300} animated={true} />
 * ```
 */
export const QuantumSpatial_9: React.FC<QuantumSpatial9Props> = ({
  size = 200,
  animated = true,
  accentColor = '#E85D75',
  secondaryColor = '#4ECDC4',
  animationSpeed = 1,
  ariaLabel = '9Bit Studios Quantum Spatial Logo'
}) => {
  const viewBoxSize = 400;
  const scale = size / viewBoxSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      style={{
        filter: 'drop-shadow(0 10px 30px rgba(232, 93, 117, 0.3))',
        willChange: animated ? 'transform' : 'auto'
      }}
    >
      <title>9Bit Studios Quantum Spatial</title>

      {/* Gradient Definitions */}
      <defs>
        {/* Primary Glass Gradient */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.9" />
        </linearGradient>

        {/* Quantum Glow Gradient */}
        <radialGradient id="quantumGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Liquid Glass Effect */}
        <linearGradient id="liquidGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>

        {/* Blur Filter for Glassmorphism */}
        <filter id="glassBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
        </filter>

        {/* Glow Filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Quantum Field */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="url(#quantumGlow)"
        opacity="0.3"
      >
        {animated && (
          <animate
            attributeName="r"
            values="180;200;180"
            dur={`${4 / animationSpeed}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Orbital Rings */}
      {[1, 2, 3].map((ring, index) => {
        const radius = 120 + (index * 30);
        const rotationSpeed = 15 - (index * 3);

        return (
          <g key={`ring-${ring}`}>
            <circle
              cx="200"
              cy="200"
              r={radius}
              stroke={index === 1 ? accentColor : secondaryColor}
              strokeWidth="1"
              strokeOpacity="0.3"
              fill="none"
              strokeDasharray="5,10"
            >
              {animated && (
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 200 200"
                  to="360 200 200"
                  dur={`${rotationSpeed / animationSpeed}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Orbital Particles */}
            {[0, 90, 180, 270].map((angle, particleIndex) => {
              const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <circle
                  key={`particle-${ring}-${particleIndex}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={particleIndex % 2 === 0 ? accentColor : secondaryColor}
                  filter="url(#glow)"
                >
                  {animated && (
                    <>
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from={`0 200 200`}
                        to={`360 200 200`}
                        dur={`${rotationSpeed / animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur={`${2 / animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                    </>
                  )}
                </circle>
              );
            })}
          </g>
        );
      })}

      {/* Central Number "9" with Liquid Glass Effect */}
      <g transform="translate(200, 200)">
        {/* Glass Background Layer */}
        <path
          d="M 0,-80 A 40,40 0 1,1 0,-40 L 0,60 A 15,15 0 0,1 -15,75 A 15,15 0 0,1 -30,60 L -30,-40 A 70,70 0 1,1 30,-40 L 30,60 A 15,15 0 0,1 15,75 A 15,15 0 0,1 0,60 Z"
          fill="rgba(10, 14, 39, 0.4)"
          stroke="url(#liquidGlass)"
          strokeWidth="2"
          filter="url(#glassBlur)"
        />

        {/* Main "9" Shape */}
        <path
          d="M 0,-80 A 40,40 0 1,1 0,0 L 0,60 C 0,70 -10,80 -20,80 C -30,80 -40,70 -40,60 L -40,0 A 60,60 0 1,1 40,0 L 40,60 C 40,70 30,80 20,80 C 10,80 0,70 0,60 Z"
          fill="url(#glassGradient)"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        >
          {animated && (
            <>
              <animate
                attributeName="stroke-width"
                values="3;5;3"
                dur={`${3 / animationSpeed}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur={`${2 / animationSpeed}s`}
                repeatCount="indefinite"
              />
            </>
          )}
        </path>

        {/* Glass Highlight Overlay */}
        <path
          d="M -20,-70 Q -10,-80 10,-75 Q 20,-70 20,-50"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Inner Glow Accent */}
        <circle
          cx="0"
          cy="-40"
          r="25"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="2"
          opacity="0.4"
        >
          {animated && (
            <animate
              attributeName="r"
              values="25;30;25"
              dur={`${3 / animationSpeed}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Energy Wave Pulses */}
      {animated && [1, 2, 3].map((wave) => (
        <circle
          key={`wave-${wave}`}
          cx="200"
          cy="200"
          r="50"
          fill="none"
          stroke={wave % 2 === 0 ? accentColor : secondaryColor}
          strokeWidth="2"
          opacity="0"
        >
          <animate
            attributeName="r"
            values="50;200"
            dur={`${4 / animationSpeed}s`}
            begin={`${wave * 1.2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur={`${4 / animationSpeed}s`}
            begin={`${wave * 1.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Corner Accent Elements */}
      {[
        { x: 30, y: 30 },
        { x: 370, y: 30 },
        { x: 30, y: 370 },
        { x: 370, y: 370 }
      ].map((corner, index) => (
        <g key={`corner-${index}`} transform={`translate(${corner.x}, ${corner.y})`}>
          <circle
            r="4"
            fill={index % 2 === 0 ? accentColor : secondaryColor}
            filter="url(#glow)"
          >
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur={`${2 / animationSpeed}s`}
                begin={`${index * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle
            r="8"
            fill="none"
            stroke={index % 2 === 0 ? accentColor : secondaryColor}
            strokeWidth="1"
            opacity="0.3"
          />
        </g>
      ))}
    </svg>
  );
};

export default QuantumSpatial_9;
