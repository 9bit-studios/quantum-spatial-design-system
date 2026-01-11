/**
 * QuantumSpatial_6 - Animated Quantum-Spatial SVG Component
 *
 * Design System: Quantum Spatial
 * Brand: 9Bit Studios
 * Theme: Dark-mysterious quantum-spatial with glassmorphism
 *
 * Features:
 * - M4-optimized animations with reduced motion support
 * - Quantum spatial particle effects
 * - Liquid-glass aesthetic with depth
 * - Responsive scaling and adaptive performance
 */

import React, { useEffect, useRef } from 'react';

interface QuantumSpatial6Props {
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  accentColor?: string;
}

export const QuantumSpatial_6: React.FC<QuantumSpatial6Props> = ({
  width = 600,
  height = 600,
  className = '',
  animated = true,
  accentColor = '#E85D75'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (svgRef.current && animated && !prefersReducedMotion) {
      // M4-optimized animation initialization
      const animations = svgRef.current.querySelectorAll('animate, animateTransform');
      animations.forEach(anim => {
        (anim as SVGAnimateElement).beginElement();
      });
    }
  }, [animated]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quantum Spatial animated graphic showing interconnected quantum particles with glassmorphism effects"
    >
      <defs>
        {/* Quantum Gradient - Primary */}
        <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8">
            {animated && (
              <animate
                attributeName="stopOpacity"
                values="0.8;1;0.8"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.6">
            {animated && (
              <animate
                attributeName="stopOpacity"
                values="0.6;0.9;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.7">
            {animated && (
              <animate
                attributeName="stopOpacity"
                values="0.7;1;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>

        {/* Glassmorphism Gradient */}
        <radialGradient id="glassGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
        </radialGradient>

        {/* Quantum Glow Filter */}
        <filter id="quantumGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="glow"
          />
          <feBlend in="SourceGraphic" in2="glow" mode="screen" />
        </filter>

        {/* Liquid Glass Blur */}
        <filter id="liquidGlass" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
          <feColorMatrix
            in="blur"
            type="saturate"
            values="1.5"
            result="saturate"
          />
          <feBlend in="SourceGraphic" in2="saturate" mode="overlay" />
        </filter>

        {/* Depth Shadow */}
        <filter id="depthShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.5" />
        </filter>

        {/* Particle System Pattern */}
        <pattern id="particleField" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill="rgba(255, 255, 255, 0.3)">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="50" cy="30" r="1" fill="rgba(78, 205, 196, 0.4)">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur="2.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="80" cy="70" r="1.2" fill="rgba(232, 93, 117, 0.3)">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="3.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </pattern>
      </defs>

      {/* Background Particle Field */}
      <rect
        x="0"
        y="0"
        width="600"
        height="600"
        fill="url(#particleField)"
        opacity="0.4"
      />

      {/* Central Quantum Sphere */}
      <g filter="url(#quantumGlow)">
        <circle
          cx="300"
          cy="300"
          r="120"
          fill="url(#quantumGradient)"
          opacity="0.3"
          filter="url(#liquidGlass)"
        >
          {animated && (
            <animate
              attributeName="r"
              values="120;135;120"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Orbital Rings */}
      {[180, 220, 260].map((radius, index) => (
        <circle
          key={`ring-${index}`}
          cx="300"
          cy="300"
          r={radius}
          fill="none"
          stroke="url(#quantumGradient)"
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeDasharray="10 15"
        >
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 300 300"
              to="360 300 300"
              dur={`${20 + index * 5}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}

      {/* Quantum Nodes */}
      {[
        { cx: 300, cy: 180, delay: 0 },
        { cx: 420, cy: 300, delay: 1 },
        { cx: 300, cy: 420, delay: 2 },
        { cx: 180, cy: 300, delay: 3 },
        { cx: 380, cy: 220, delay: 1.5 },
        { cx: 220, cy: 380, delay: 2.5 }
      ].map((node, index) => (
        <g key={`node-${index}`} filter="url(#depthShadow)">
          <circle
            cx={node.cx}
            cy={node.cy}
            r="16"
            fill="url(#glassGradient)"
            stroke="url(#quantumGradient)"
            strokeWidth="2"
          >
            {animated && (
              <>
                <animate
                  attributeName="r"
                  values="16;20;16"
                  dur="4s"
                  begin={`${node.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;1;0.7"
                  dur="4s"
                  begin={`${node.delay}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
          <circle
            cx={node.cx}
            cy={node.cy}
            r="8"
            fill={accentColor}
            opacity="0.6"
          >
            {animated && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3s"
                begin={`${node.delay}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>
      ))}

      {/* Connecting Lines */}
      <g stroke="url(#quantumGradient)" strokeWidth="1.5" opacity="0.4">
        <line x1="300" y1="180" x2="420" y2="300">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="420" y1="300" x2="300" y2="420">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="5s"
              begin="1s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="300" y1="420" x2="180" y2="300">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="5s"
              begin="2s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="180" y1="300" x2="300" y2="180">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="5s"
              begin="3s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="300" y1="180" x2="380" y2="220">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="4s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="380" y1="220" x2="420" y2="300">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="4s"
              begin="2.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>

      {/* Floating Energy Particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360;
        const startX = 300 + Math.cos((angle * Math.PI) / 180) * 200;
        const startY = 300 + Math.sin((angle * Math.PI) / 180) * 200;

        return (
          <circle
            key={`particle-${i}`}
            cx={startX}
            cy={startY}
            r="3"
            fill={i % 3 === 0 ? accentColor : i % 3 === 1 ? '#4ECDC4' : '#9B59B6'}
            opacity="0.6"
            filter="url(#quantumGlow)"
          >
            {animated && (
              <>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 300 300`}
                  to={`360 300 300`}
                  dur={`${15 + i * 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="3s"
                  begin={`${i * 0.25}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        );
      })}

      {/* Central Glow Core */}
      <g filter="url(#quantumGlow)">
        <circle
          cx="300"
          cy="300"
          r="40"
          fill="url(#quantumGradient)"
          opacity="0.8"
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle
          cx="300"
          cy="300"
          r="25"
          fill="rgba(255, 255, 255, 0.9)"
          opacity="0.9"
        >
          {animated && (
            <animate
              attributeName="r"
              values="25;30;25"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
    </svg>
  );
};

export default QuantumSpatial_6;
