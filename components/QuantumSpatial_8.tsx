'use client';

import React, { useEffect, useRef } from 'react';
import styles from './QuantumSpatial_8.module.css';

/**
 * Quantum Spatial Figure-8 Component
 *
 * Animated infinity symbol with liquid-glass aesthetics
 * Optimized for React 19 and Next.js 15 with M4 acceleration
 *
 * @example
 * ```tsx
 * <QuantumSpatial8 size={400} />
 * ```
 */

interface QuantumSpatial8Props {
  /** Component size in pixels (default: 400) */
  size?: number;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Enable reduced motion mode (default: false) */
  reducedMotion?: boolean;
  /** Custom className for styling */
  className?: string;
}

export const QuantumSpatial8: React.FC<QuantumSpatial8Props> = ({
  size = 400,
  speed = 1,
  reducedMotion = false,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || reducedMotion) {
      // Disable animations for accessibility
      svgRef.current?.querySelectorAll('animate, animateTransform, animateMotion').forEach(el => {
        el.setAttribute('repeatCount', '0');
      });
    }
  }, [reducedMotion]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.quantumSpatial8} ${className}`}
      role="img"
      aria-label="Quantum Spatial infinity symbol animation"
      style={{ '--animation-speed': speed } as React.CSSProperties}
    >
      <defs>
        {/* Quantum Gradient - Liquid Glass Effect */}
        <linearGradient id="quantumGradient-8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }}>
            <animate
              attributeName="stop-color"
              values="#E85D75;#4ECDC4;#A78BFA;#E85D75"
              dur={`${6 / speed}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.9 }}>
            <animate
              attributeName="stop-color"
              values="#4ECDC4;#A78BFA;#E85D75;#4ECDC4"
              dur={`${6 / speed}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" style={{ stopColor: '#A78BFA', stopOpacity: 0.8 }}>
            <animate
              attributeName="stop-color"
              values="#A78BFA;#E85D75;#4ECDC4;#A78BFA"
              dur={`${6 / speed}s`}
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Glassmorphism Blur Filter */}
        <filter id="glassBlur-8">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0.7" />
          </feComponentTransfer>
        </filter>

        {/* Glow Effect for Quantum Particles */}
        <filter id="glow-8">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radial Gradient for Particles */}
        <radialGradient id="particleGradient-8">
          <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4ECDC4', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Background - Dark Mysterious */}
      <rect width="400" height="400" fill="#0A0E27" />

      {/* Quantum Spatial Figure-8 / Infinity Symbol */}
      <g id="quantumEight">
        {/* Outer Glow Ring */}
        <path
          d="M 200 80
             C 260 80, 300 120, 300 170
             C 300 220, 260 260, 200 260
             C 140 260, 100 220, 100 170
             C 100 120, 140 80, 200 80

             M 200 140
             C 260 140, 300 180, 300 230
             C 300 280, 260 320, 200 320
             C 140 320, 100 280, 100 230
             C 100 180, 140 140, 200 140"
          fill="none"
          stroke="url(#quantumGradient-8)"
          strokeWidth="2"
          opacity="0.3"
          filter="url(#glow-8)"
        >
          <animate
            attributeName="stroke-width"
            values="2;4;2"
            dur={`${3 / speed}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Main Figure-8 Structure */}
        <path
          id="mainEight"
          d="M 200 100
             C 250 100, 280 130, 280 170
             C 280 210, 250 240, 200 240
             C 150 240, 120 210, 120 170
             C 120 130, 150 100, 200 100

             M 200 160
             C 250 160, 280 190, 280 230
             C 280 270, 250 300, 200 300
             C 150 300, 120 270, 120 230
             C 120 190, 150 160, 200 160"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="url(#quantumGradient-8)"
          strokeWidth="3"
          filter="url(#glassBlur-8)"
        >
          {/* Rotation Animation */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur={`${20 / speed}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Inner Glass Layer */}
        <path
          d="M 200 120
             C 240 120, 260 140, 260 170
             C 260 200, 240 220, 200 220
             C 160 220, 140 200, 140 170
             C 140 140, 160 120, 200 120

             M 200 180
             C 240 180, 260 200, 260 230
             C 260 260, 240 280, 200 280
             C 160 280, 140 260, 140 230
             C 140 200, 160 180, 200 180"
          fill="rgba(255, 255, 255, 0.08)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          filter="url(#glassBlur-8)"
        >
          {/* Counter-rotation for depth */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="-360 200 200"
            dur={`${15 / speed}s`}
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Quantum Particles - Orbiting Elements */}
      <g id="particles">
        {/* Particle 1 */}
        <circle r="4" fill="url(#particleGradient-8)" filter="url(#glow-8)">
          <animateMotion
            dur={`${8 / speed}s`}
            repeatCount="indefinite"
            path="M 200 100
                  C 250 100, 280 130, 280 170
                  C 280 210, 250 240, 200 240
                  C 150 240, 120 210, 120 170
                  C 120 130, 150 100, 200 100"
          />
        </circle>

        {/* Particle 2 */}
        <circle r="3" fill="#E85D75" opacity="0.8" filter="url(#glow-8)">
          <animateMotion
            dur={`${10 / speed}s`}
            repeatCount="indefinite"
            path="M 200 160
                  C 250 160, 280 190, 280 230
                  C 280 270, 250 300, 200 300
                  C 150 300, 120 270, 120 230
                  C 120 190, 150 160, 200 160"
          />
        </circle>

        {/* Particle 3 */}
        <circle r="5" fill="#A78BFA" opacity="0.6" filter="url(#glow-8)">
          <animateMotion
            dur={`${12 / speed}s`}
            repeatCount="indefinite"
            path="M 200 120
                  C 240 120, 260 140, 260 170
                  C 260 200, 240 220, 200 220
                  C 160 220, 140 200, 140 170
                  C 140 140, 160 120, 200 120"
          />
        </circle>

        {/* Particle 4 */}
        <circle r="3.5" fill="#4ECDC4" opacity="0.9" filter="url(#glow-8)">
          <animateMotion
            dur={`${14 / speed}s`}
            repeatCount="indefinite"
            path="M 200 180
                  C 240 180, 260 200, 260 230
                  C 260 260, 240 280, 200 280
                  C 160 280, 140 260, 140 230
                  C 140 200, 160 180, 200 180"
          />
        </circle>
      </g>

      {/* Center Focal Point - Quantum Nexus */}
      <circle cx="200" cy="200" r="8" fill="rgba(255, 255, 255, 0.9)" filter="url(#glow-8)">
        <animate attributeName="r" values="8;12;8" dur={`${2 / speed}s`} repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur={`${2 / speed}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* Subtle Grid Lines - Spatial Context */}
      <g opacity="0.1" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5">
        <line x1="0" y1="200" x2="400" y2="200" />
        <line x1="200" y1="0" x2="200" y2="400" />
        <circle cx="200" cy="200" r="100" fill="none" />
        <circle cx="200" cy="200" r="150" fill="none" />
      </g>
    </svg>
  );
};

export default QuantumSpatial8;
