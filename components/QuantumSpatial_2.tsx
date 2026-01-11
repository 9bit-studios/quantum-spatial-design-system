/**
 * QuantumSpatial_2 React Component
 * 9Bit Studios - Quantum Spatial Design System
 *
 * Animated SVG background with liquid-glass quantum aesthetics
 * Optimized for M4 Neural Engine acceleration
 */

import React from 'react';

export interface QuantumSpatial_2Props {
  /** Width of the component (default: 800) */
  width?: number;
  /** Height of the component (default: 600) */
  height?: number;
  /** Animation speed multiplier (default: 1) */
  animationSpeed?: number;
  /** Enable reduced motion for accessibility (default: false) */
  reducedMotion?: boolean;
  /** Custom class name for styling */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const QuantumSpatial_2: React.FC<QuantumSpatial_2Props> = ({
  width = 800,
  height = 600,
  animationSpeed = 1,
  reducedMotion = false,
  className = '',
  ariaLabel = 'Quantum spatial animated background'
}) => {
  // Calculate animation durations based on speed multiplier
  const getDuration = (baseDuration: number) => {
    if (reducedMotion) return '0s'; // Disable animations for accessibility
    return `${baseDuration / animationSpeed}s`;
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto'
      }}
    >
      <defs>
        {/* Quantum Spatial Gradients */}
        <linearGradient id="quantumGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }}>
            {!reducedMotion && (
              <animate
                attributeName="stop-opacity"
                values="0.8;1;0.8"
                dur={getDuration(4)}
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.6 }}>
            {!reducedMotion && (
              <animate
                attributeName="stop-opacity"
                values="0.6;0.9;0.6"
                dur={getDuration(4)}
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>

        <linearGradient id="quantumGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.7 }} />
          <stop offset="50%" style={{ stopColor: '#9B59B6', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }} />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#4ECDC4', stopOpacity: 0 }} />
        </radialGradient>

        {/* Glassmorphism Filters */}
        <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0" />
        </filter>

        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feFlood floodColor="#4ECDC4" floodOpacity="0.5" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Quantum Particle Pattern */}
        <pattern id="quantumParticles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill="#4ECDC4" opacity="0.3">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={getDuration(3)}
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="50" cy="30" r="1" fill="#E85D75" opacity="0.4">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur={getDuration(2.5)}
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="80" cy="60" r="1.2" fill="#9B59B6" opacity="0.35">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.35;0.85;0.35"
                dur={getDuration(3.5)}
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="30" cy="80" r="0.8" fill="#FFFFFF" opacity="0.5">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={getDuration(2)}
                repeatCount="indefinite"
              />
            )}
          </circle>
        </pattern>

        {/* Liquid Glass Mask */}
        <mask id="liquidMask">
          <rect width="800" height="600" fill="white" />
          <ellipse cx="400" cy="300" rx="280" ry="200" fill="black" opacity="0.3">
            {!reducedMotion && (
              <>
                <animate
                  attributeName="rx"
                  values="280;320;280"
                  dur={getDuration(8)}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="ry"
                  values="200;240;200"
                  dur={getDuration(6)}
                  repeatCount="indefinite"
                />
              </>
            )}
          </ellipse>
        </mask>
      </defs>

      {/* Dark Mysterious Background */}
      <rect width="800" height="600" fill="#0A0E27" />

      {/* Quantum Particle Field */}
      <rect width="800" height="600" fill="url(#quantumParticles)" opacity="0.6" />

      {/* Animated Liquid Glass Orbs */}
      <g mask="url(#liquidMask)">
        {/* Large Central Orb */}
        <ellipse
          cx="400"
          cy="300"
          rx="250"
          ry="180"
          fill="url(#quantumGradient1)"
          filter="url(#glassBlur)"
          opacity="0.4"
        >
          {!reducedMotion && (
            <>
              <animate
                attributeName="rx"
                values="250;280;250"
                dur={getDuration(8)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="ry"
                values="180;210;180"
                dur={getDuration(6)}
                repeatCount="indefinite"
              />
            </>
          )}
        </ellipse>

        {/* Secondary Orb (Top Right) */}
        <ellipse
          cx="600"
          cy="150"
          rx="150"
          ry="120"
          fill="url(#quantumGradient2)"
          filter="url(#glassBlur)"
          opacity="0.35"
        >
          {!reducedMotion && (
            <>
              <animate
                attributeName="cx"
                values="600;620;600"
                dur={getDuration(7)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="150;130;150"
                dur={getDuration(5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </ellipse>

        {/* Tertiary Orb (Bottom Left) */}
        <ellipse
          cx="200"
          cy="450"
          rx="180"
          ry="140"
          fill="url(#quantumGradient1)"
          filter="url(#glassBlur)"
          opacity="0.3"
        >
          {!reducedMotion && (
            <>
              <animate
                attributeName="cx"
                values="200;180;200"
                dur={getDuration(9)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="450;470;450"
                dur={getDuration(6.5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </ellipse>
      </g>

      {/* Quantum Spatial Grid Lines */}
      <g stroke="#4ECDC4" strokeWidth="0.5" opacity="0.2">
        <line x1="0" y1="200" x2="800" y2="200">
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={getDuration(4)}
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="0" y1="400" x2="800" y2="400">
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={getDuration(3.5)}
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="200" y1="0" x2="200" y2="600">
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={getDuration(5)}
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="600" y1="0" x2="600" y2="600">
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={getDuration(4.5)}
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>

      {/* Central Quantum Node */}
      <g transform="translate(400, 300)">
        {/* Outer Rings */}
        <circle r="120" fill="none" stroke="url(#quantumGradient2)" strokeWidth="1" opacity="0.4">
          {!reducedMotion && (
            <>
              <animate
                attributeName="r"
                values="120;140;120"
                dur={getDuration(6)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0.7;0.4"
                dur={getDuration(6)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        <circle r="80" fill="none" stroke="#E85D75" strokeWidth="1.5" opacity="0.5">
          {!reducedMotion && (
            <>
              <animate
                attributeName="r"
                values="80;95;80"
                dur={getDuration(5)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0.8;0.5"
                dur={getDuration(5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        {/* Inner Core */}
        <circle r="40" fill="url(#glowGradient)" filter="url(#innerGlow)">
          {!reducedMotion && (
            <animate
              attributeName="r"
              values="40;48;40"
              dur={getDuration(4)}
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Quantum Connections */}
        <g opacity="0.6">
          <line x1="0" y1="0" x2="100" y2="-80" stroke="#4ECDC4" strokeWidth="1">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur={getDuration(3)}
                repeatCount="indefinite"
              />
            )}
          </line>
          <circle cx="100" cy="-80" r="4" fill="#4ECDC4">
            {!reducedMotion && (
              <animate
                attributeName="r"
                values="4;6;4"
                dur={getDuration(3)}
                repeatCount="indefinite"
              />
            )}
          </circle>

          <line x1="0" y1="0" x2="-120" y2="60" stroke="#E85D75" strokeWidth="1">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur={getDuration(3.5)}
                repeatCount="indefinite"
              />
            )}
          </line>
          <circle cx="-120" cy="60" r="4" fill="#E85D75">
            {!reducedMotion && (
              <animate
                attributeName="r"
                values="4;6;4"
                dur={getDuration(3.5)}
                repeatCount="indefinite"
              />
            )}
          </circle>

          <line x1="0" y1="0" x2="90" y2="100" stroke="#9B59B6" strokeWidth="1">
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur={getDuration(4)}
                repeatCount="indefinite"
              />
            )}
          </line>
          <circle cx="90" cy="100" r="4" fill="#9B59B6">
            {!reducedMotion && (
              <animate
                attributeName="r"
                values="4;6;4"
                dur={getDuration(4)}
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>
      </g>

      {/* Floating Quantum Particles */}
      <g opacity="0.8">
        <circle cx="150" cy="100" r="3" fill="#4ECDC4">
          {!reducedMotion && (
            <>
              <animate
                attributeName="cy"
                values="100;80;100"
                dur={getDuration(5)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur={getDuration(5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        <circle cx="650" cy="500" r="2.5" fill="#E85D75">
          {!reducedMotion && (
            <>
              <animate
                attributeName="cy"
                values="500;480;500"
                dur={getDuration(4.5)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur={getDuration(4.5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        <circle cx="100" cy="300" r="2" fill="#9B59B6">
          {!reducedMotion && (
            <>
              <animate
                attributeName="cx"
                values="100;120;100"
                dur={getDuration(6)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur={getDuration(6)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        <circle cx="700" cy="250" r="3" fill="#FFFFFF">
          {!reducedMotion && (
            <>
              <animate
                attributeName="cx"
                values="700;680;700"
                dur={getDuration(5.5)}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur={getDuration(5.5)}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      </g>

      {/* Edge Glow Effects */}
      <rect x="0" y="0" width="800" height="2" fill="url(#quantumGradient1)" opacity="0.3" />
      <rect x="0" y="598" width="800" height="2" fill="url(#quantumGradient2)" opacity="0.3" />
      <rect x="0" y="0" width="2" height="600" fill="url(#quantumGradient1)" opacity="0.3" />
      <rect x="798" y="0" width="2" height="600" fill="url(#quantumGradient2)" opacity="0.3" />
    </svg>
  );
};

export default QuantumSpatial_2;
