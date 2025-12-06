import React from 'react';

export interface QuantumSpatial11Props {
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

/**
 * QuantumSpatial_11 Component
 *
 * An animated SVG component featuring quantum-spatial aesthetics with:
 * - Liquid-glass morphing geometry
 * - Glassmorphism effects with depth layers
 * - M4-optimized animations (reduced motion support)
 * - Dark-mysterious quantum theme
 * - 9Bit Studios brand alignment
 *
 * @component
 * @example
 * <QuantumSpatial_11 width={400} height={400} animated={true} />
 */
export const QuantumSpatial_11: React.FC<QuantumSpatial11Props> = ({
  width = 400,
  height = 400,
  className = '',
  animated = true,
  primaryColor = '#E85D75',
  secondaryColor = '#4ECDC4',
  accentColor = '#A78BFA'
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
      aria-label="Quantum Spatial Abstract Design 11"
    >
      <title>QuantumSpatial_11</title>
      <desc>Animated quantum-spatial design with liquid-glass morphing geometry and glassmorphism effects</desc>

      {/* Definitions for gradients, filters, and effects */}
      <defs>
        {/* Radial gradient for background glow */}
        <radialGradient id="qs11-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.15" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0A0E27" stopOpacity="0" />
        </radialGradient>

        {/* Linear gradient for quantum orb */}
        <linearGradient id="qs11-orb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
        </linearGradient>

        {/* Glassmorphism gradient */}
        <linearGradient id="qs11-glass-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>

        {/* Blur filter for glassmorphism */}
        <filter id="qs11-glass-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>
        </filter>

        {/* Glow filter for quantum effects */}
        <filter id="qs11-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feFlood floodColor={primaryColor} floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Mask for liquid-glass morphing */}
        <mask id="qs11-morph-mask">
          <rect x="0" y="0" width="400" height="400" fill="white" />
          <circle cx="200" cy="200" r="120" fill="black">
            {animated && (
              <animate
                attributeName="r"
                values="120;140;120"
                dur="4s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            )}
          </circle>
        </mask>

        {/* Clip path for geometric shapes */}
        <clipPath id="qs11-hex-clip">
          <path d="M200,80 L280,130 L280,230 L200,280 L120,230 L120,130 Z" />
        </clipPath>
      </defs>

      {/* Background gradient glow */}
      <rect width="400" height="400" fill="url(#qs11-bg-glow)" />

      {/* Quantum spatial grid (subtle background) */}
      <g opacity="0.15" stroke={secondaryColor} strokeWidth="0.5">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <line x1={50 * i} y1="0" x2={50 * i} y2="400" />
            <line x1="0" y1={50 * i} x2="400" y2={50 * i} />
          </React.Fragment>
        ))}
      </g>

      {/* Outer rotating ring with glassmorphism */}
      <g opacity="0.7" filter="url(#qs11-glass-blur)">
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#qs11-glass-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
        >
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="20s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Middle hexagonal ring */}
      <g opacity="0.8">
        <path
          d="M200,80 L280,130 L280,230 L200,280 L120,230 L120,130 Z"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          opacity="0.6"
        >
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="-360 200 200"
              dur="15s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>

      {/* Liquid-glass morphing geometry layer */}
      <g mask="url(#qs11-morph-mask)">
        {/* Outer morphing blob */}
        <ellipse
          cx="200"
          cy="200"
          rx="130"
          ry="110"
          fill="url(#qs11-glass-gradient)"
          opacity="0.3"
          filter="url(#qs11-glass-blur)"
        >
          {animated && (
            <>
              <animate
                attributeName="rx"
                values="130;145;130"
                dur="6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              />
              <animate
                attributeName="ry"
                values="110;125;110"
                dur="7s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            </>
          )}
        </ellipse>

        {/* Inner morphing blob */}
        <ellipse
          cx="200"
          cy="200"
          rx="90"
          ry="100"
          fill="url(#qs11-glass-gradient)"
          opacity="0.4"
          filter="url(#qs11-glass-blur)"
        >
          {animated && (
            <>
              <animate
                attributeName="rx"
                values="90;105;90"
                dur="5s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              />
              <animate
                attributeName="ry"
                values="100;85;100"
                dur="6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            </>
          )}
        </ellipse>
      </g>

      {/* Central quantum orb with glow */}
      <g filter="url(#qs11-glow)">
        <circle
          cx="200"
          cy="200"
          r="60"
          fill="url(#qs11-orb-gradient)"
          opacity="0.7"
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="0.7;0.9;0.7"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          )}
        </circle>

        {/* Inner orb highlight */}
        <circle
          cx="185"
          cy="185"
          r="20"
          fill="rgba(255, 255, 255, 0.4)"
          filter="url(#qs11-glass-blur)"
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.7;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Orbiting quantum particles */}
      {[0, 120, 240].map((rotation, index) => (
        <g key={`particle-${index}`} opacity="0.8">
          <circle
            cx="200"
            cy="110"
            r="4"
            fill={index === 0 ? primaryColor : index === 1 ? secondaryColor : accentColor}
            filter="url(#qs11-glow)"
          >
            {animated && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${rotation} 200 200`}
                to={`${rotation + 360} 200 200`}
                dur="8s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>
      ))}

      {/* Connecting energy lines */}
      <g opacity="0.4" stroke={primaryColor} strokeWidth="1" fill="none">
        {[30, 150, 270].map((angle, index) => {
          const x1 = 200 + 60 * Math.cos((angle * Math.PI) / 180);
          const y1 = 200 + 60 * Math.sin((angle * Math.PI) / 180);
          const x2 = 200 + 110 * Math.cos((angle * Math.PI) / 180);
          const y2 = 200 + 110 * Math.sin((angle * Math.PI) / 180);

          return (
            <line key={`line-${index}`} x1={x1} y1={y1} x2={x2} y2={y2}>
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="3s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}
      </g>

      {/* Accessibility support for reduced motion */}
      {animated && (
        <style>
          {`
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}
        </style>
      )}
    </svg>
  );
};

export default QuantumSpatial_11;
