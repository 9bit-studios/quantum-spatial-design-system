/**
 * QuantumSpatial_1 Component
 * 9Bit Studios - Quantum Spatial Design System
 *
 * An animated SVG component featuring liquid-glass aesthetics,
 * quantum particle systems, and dark-mysterious theming.
 * Optimized for M4 Neural Engine rendering.
 */

import React from 'react';

interface QuantumSpatial1Props {
  /** Component width in pixels */
  width?: number;
  /** Component height in pixels */
  height?: number;
  /** Enable/disable animations (reduce for mobile performance) */
  animate?: boolean;
  /** Opacity level (0-1) for glassmorphism effects */
  glassOpacity?: number;
  /** Custom CSS class for container */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

export const QuantumSpatial_1: React.FC<QuantumSpatial1Props> = ({
  width = 800,
  height = 600,
  animate = true,
  glassOpacity = 0.7,
  className = '',
  ariaLabel = '9Bit Studios Quantum Spatial Visual Element'
}) => {
  const animationState = animate ? 'running' : 'paused';

  return (
    <div
      className={`quantum-spatial-container ${className}`}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          animationPlayState: animationState
        }}
      >
        <defs>
          {/* Quantum Spatial Gradients */}
          <linearGradient id="quantumPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }}>
              {animate && (
                <animate
                  attributeName="stop-opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.6 }}>
              {animate && (
                <animate
                  attributeName="stop-opacity"
                  values="0.6;0.9;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>

          <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.4 }} />
            <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#0A0E27', stopOpacity: 0 }} />
          </radialGradient>

          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.02)', stopOpacity: 1 }} />
          </linearGradient>

          {/* Glassmorphism Blur Filter */}
          <filter id="glassmorphism" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            <feColorMatrix
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${glassOpacity} 0`}
            />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>

          {/* Quantum Particle System */}
          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Liquid Flow Animation Path */}
          <path id="flowPath" d="M 100,300 Q 250,200 400,300 T 700,300" fill="none" />
        </defs>

        {/* Background */}
        <rect width="800" height="600" fill="#0A0E27"/>

        {/* Quantum Spatial Grid */}
        <g opacity="0.1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
          <line x1="0" y1="150" x2="800" y2="150" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="0" y1="450" x2="800" y2="450" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="400" y1="0" x2="400" y2="600" />
          <line x1="600" y1="0" x2="600" y2="600" />
        </g>

        {/* Radial Glow Background */}
        <circle cx="400" cy="300" r="300" fill="url(#glowEffect)" opacity="0.6">
          {animate && (
            <animate attributeName="r" values="280;320;280" dur="5s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Quantum Spatial Core */}
        <g id="quantumCore">
          {/* Central Hexagon */}
          <polygon
            points="400,200 480,240 480,320 400,360 320,320 320,240"
            fill="url(#glassGradient)"
            stroke="url(#quantumPrimary)"
            strokeWidth="2"
            filter="url(#glassmorphism)"
          >
            {animate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 400 280"
                to="360 400 280"
                dur="20s"
                repeatCount="indefinite"
              />
            )}
          </polygon>

          {/* Orbital Rings */}
          <circle
            cx="400"
            cy="280"
            r="120"
            fill="none"
            stroke="rgba(232,93,117,0.3)"
            strokeWidth="1.5"
          >
            {animate && (
              <>
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 400 280"
                  to="360 400 280"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>

          <circle
            cx="400"
            cy="280"
            r="160"
            fill="none"
            stroke="rgba(78,205,196,0.3)"
            strokeWidth="1.5"
          >
            {animate && (
              <>
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 400 280"
                  to="0 400 280"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>

          {/* Quantum Particles */}
          <g filter="url(#particleGlow)">
            <circle cx="400" cy="160" r="4" fill="#E85D75">
              {animate && (
                <animateMotion dur="8s" repeatCount="indefinite">
                  <mpath href="#flowPath"/>
                </animateMotion>
              )}
            </circle>

            <circle cx="320" cy="240" r="3" fill="#4ECDC4">
              {animate && (
                <animateMotion dur="10s" repeatCount="indefinite" begin="1s">
                  <mpath href="#flowPath"/>
                </animateMotion>
              )}
            </circle>

            <circle cx="480" cy="320" r="3.5" fill="#E85D75">
              {animate && (
                <animateMotion dur="12s" repeatCount="indefinite" begin="2s">
                  <mpath href="#flowPath"/>
                </animateMotion>
              )}
            </circle>

            <circle cx="400" cy="400" r="3" fill="#4ECDC4">
              {animate && (
                <animateMotion dur="9s" repeatCount="indefinite" begin="1.5s">
                  <mpath href="#flowPath"/>
                </animateMotion>
              )}
            </circle>
          </g>

          {/* Inner Geometric Pattern */}
          <g opacity="0.6">
            <path
              d="M 400,240 L 440,260 L 440,300 L 400,320 L 360,300 L 360,260 Z"
              fill="none"
              stroke="url(#quantumPrimary)"
              strokeWidth="1.5"
            >
              {animate && (
                <>
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1;1.1;1"
                    additive="sum"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 400 280"
                    to="-360 400 280"
                    additive="sum"
                    dur="25s"
                    repeatCount="indefinite"
                  />
                </>
              )}
            </path>
          </g>
        </g>

        {/* Floating Liquid Glass Elements */}
        <g id="floatingElements">
          <ellipse
            cx="150"
            cy="150"
            rx="40"
            ry="60"
            fill="url(#glassGradient)"
            filter="url(#glassmorphism)"
            opacity="0.5"
          >
            {animate && (
              <>
                <animate attributeName="cy" values="150;130;150" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
              </>
            )}
          </ellipse>

          <ellipse
            cx="650"
            cy="450"
            rx="50"
            ry="70"
            fill="url(#glassGradient)"
            filter="url(#glassmorphism)"
            opacity="0.5"
          >
            {animate && (
              <>
                <animate attributeName="cy" values="450;470;450" dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" />
              </>
            )}
          </ellipse>

          <rect
            x="100"
            y="450"
            width="80"
            height="80"
            rx="12"
            fill="url(#glassGradient)"
            filter="url(#glassmorphism)"
            opacity="0.4"
          >
            {animate && (
              <>
                <animate attributeName="y" values="450;430;450" dur="6s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 140 490"
                  to="10 140 490"
                  dur="3s"
                  repeatCount="indefinite"
                  direction="alternate"
                />
              </>
            )}
          </rect>

          <circle
            cx="680"
            cy="120"
            r="35"
            fill="url(#glassGradient)"
            filter="url(#glassmorphism)"
            opacity="0.4"
          >
            {animate && (
              <animate attributeName="cy" values="120;100;120" dur="5.5s" repeatCount="indefinite" />
            )}
          </circle>
        </g>

        {/* Quantum Energy Waves */}
        <g opacity="0.3" fill="none" stroke="url(#quantumPrimary)" strokeWidth="2">
          <path d="M 50,300 Q 200,250 350,300 T 650,300">
            {animate && (
              <animate
                attributeName="d"
                values="M 50,300 Q 200,250 350,300 T 650,300;
                        M 50,300 Q 200,350 350,300 T 650,300;
                        M 50,300 Q 200,250 350,300 T 650,300"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>

        {/* Light Leak Effects */}
        <g opacity="0.15">
          <rect x="0" y="0" width="2" height="600" fill="url(#quantumPrimary)">
            {animate && (
              <animate attributeName="x" values="-2;800" dur="8s" repeatCount="indefinite" />
            )}
          </rect>
          <rect x="0" y="0" width="3" height="600" fill="url(#quantumPrimary)">
            {animate && (
              <animate attributeName="x" values="-3;800" dur="12s" repeatCount="indefinite" begin="2s" />
            )}
          </rect>
        </g>
      </svg>

      <style jsx>{`
        .quantum-spatial-container {
          display: inline-block;
          user-select: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .quantum-spatial-container svg * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 768px) {
          .quantum-spatial-container svg {
            filter: contrast(1.1) brightness(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumSpatial_1;