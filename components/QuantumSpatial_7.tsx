import React, { useEffect, useRef, useState } from 'react';
import styles from './QuantumSpatial_7.module.css';

/**
 * QuantumSpatial_7: Animated quantum-spatial "7" component
 * Brand: 9Bit Studios
 * Design System: Quantum Spatial with glassmorphism aesthetic
 * Performance: Optimized for M4 Neural Engine rendering
 */

interface QuantumSpatial7Props {
  /** Component size in pixels (default: 800) */
  size?: number;
  /** Disable animations for reduced motion accessibility */
  enableReducedMotion?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const QuantumSpatial_7: React.FC<QuantumSpatial7Props> = ({
  size = 800,
  enableReducedMotion = false,
  className = '',
  ariaLabel = 'Quantum Spatial Seven Animation'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Respect user's reduced motion preference
  const prefersReducedMotion =
    enableReducedMotion ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!prefersReducedMotion) {
      // Trigger animations after mount
      const timer = setTimeout(() => setIsAnimating(true), 100);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  // Scale factor for responsive sizing
  const scale = size / 800;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.quantumSpatial7} ${className}`}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: size,
        height: size,
        // Optimize for M4 rendering
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <defs>
        {/* Quantum Spatial Gradient Definitions */}
        <linearGradient id="quantumGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#A076F9', stopOpacity: 0.8 }} />
        </linearGradient>

        <linearGradient id="quantumGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.7 }} />
          <stop offset="50%" style={{ stopColor: '#E85D75', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#0A0E27', stopOpacity: 0.9 }} />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#0A0E27', stopOpacity: 0 }} />
        </radialGradient>

        {/* Glassmorphism Blur Effect */}
        <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0" />
        </filter>

        {/* Liquid Glass Border Effect */}
        <filter id="liquidGlass" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
        </filter>

        {/* Shadow Definition */}
        <filter id="quantumShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
          <feOffset dx="0" dy="10" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Animated Gradient for Flow Effect */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }}>
            {!prefersReducedMotion && (
              <animate
                attributeName="stop-color"
                values="#E85D75;#4ECDC4;#A076F9;#E85D75"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.6 }}>
            {!prefersReducedMotion && (
              <animate
                attributeName="stop-color"
                values="#4ECDC4;#A076F9;#E85D75;#4ECDC4"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" style={{ stopColor: '#A076F9', stopOpacity: 0.8 }}>
            {!prefersReducedMotion && (
              <animate
                attributeName="stop-color"
                values="#A076F9;#E85D75;#4ECDC4;#A076F9"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>
      </defs>

      {/* Background Dark Layer */}
      <rect width="800" height="800" fill="#0A0E27" />

      {/* Ambient Glow Orbs (Background Layer) */}
      <circle cx="200" cy="200" r="150" fill="url(#glowGradient)" opacity="0.3" filter="url(#glassBlur)">
        {!prefersReducedMotion && (
          <>
            <animate attributeName="cx" values="200;250;200" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;150;200" dur="8s" repeatCount="indefinite" />
          </>
        )}
      </circle>

      <circle cx="600" cy="600" r="180" fill="url(#glowGradient)" opacity="0.25" filter="url(#glassBlur)">
        {!prefersReducedMotion && (
          <>
            <animate attributeName="cx" values="600;550;600" dur="10s" repeatCount="indefinite" />
            <animate attributeName="cy" values="600;650;600" dur="10s" repeatCount="indefinite" />
          </>
        )}
      </circle>

      {/* Central Quantum Spatial Figure "7" */}
      <g filter="url(#quantumShadow)">
        {/* Main "7" Structure with Glassmorphism */}
        <path
          d="M 250 150 L 550 150 L 550 200 L 350 200 L 450 650 L 380 650 L 250 200 Z"
          fill="url(#quantumGradient1)"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="2"
          opacity="0.85"
        >
          {!prefersReducedMotion && (
            <animate attributeName="opacity" values="0.85;0.95;0.85" dur="4s" repeatCount="indefinite" />
          )}
        </path>

        {/* Liquid Glass Overlay on "7" */}
        <path
          d="M 250 150 L 550 150 L 550 200 L 350 200 L 450 650 L 380 650 L 250 200 Z"
          fill="rgba(255, 255, 255, 0.05)"
          filter="url(#liquidGlass)"
          opacity="0.7"
        />

        {/* Inner Glow on "7" */}
        <path
          d="M 270 170 L 530 170 L 530 190 L 360 190 L 440 630 L 400 630 L 270 190 Z"
          fill="url(#flowGradient)"
          opacity="0.6"
        >
          {!prefersReducedMotion && (
            <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
          )}
        </path>
      </g>

      {/* Quantum Particles (Floating Elements) */}
      <g opacity="0.7">
        {[
          { cx: 300, cy: 300, r: 4, color: '#E85D75', dur: '3s', values: '300;280;300' },
          { cx: 500, cy: 250, r: 3, color: '#4ECDC4', dur: '4s', values: '250;230;250' },
          { cx: 350, cy: 450, r: 5, color: '#A076F9', dur: '5s', values: '450;470;450' },
          { cx: 480, cy: 380, r: 3, color: '#E85D75', dur: '3.5s', values: '380;360;380' },
          { cx: 420, cy: 520, r: 4, color: '#4ECDC4', dur: '4.5s', values: '520;540;520' }
        ].map((particle, index) => (
          <circle key={index} cx={particle.cx} cy={particle.cy} r={particle.r} fill={particle.color}>
            {!prefersReducedMotion && (
              <>
                <animate attributeName="cy" values={particle.values} dur={particle.dur} repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.7;1;0.7"
                  dur={particle.dur}
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        ))}
      </g>

      {/* Spatial Grid Lines (Subtle Background Detail) */}
      <g opacity="0.1" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1">
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="0" y1="600" x2="800" y2="600" />
        <line x1="200" y1="0" x2="200" y2="800" />
        <line x1="400" y1="0" x2="400" y2="800" />
        <line x1="600" y1="0" x2="600" y2="800" />
      </g>

      {/* Quantum Energy Rings Around "7" */}
      <g opacity="0.4" fill="none" stroke="url(#flowGradient)" strokeWidth="1.5">
        <ellipse cx="400" cy="400" rx="280" ry="280">
          {!prefersReducedMotion && (
            <>
              <animate attributeName="rx" values="280;300;280" dur="6s" repeatCount="indefinite" />
              <animate attributeName="ry" values="280;300;280" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="6s" repeatCount="indefinite" />
            </>
          )}
        </ellipse>

        <ellipse cx="400" cy="400" rx="320" ry="320">
          {!prefersReducedMotion && (
            <>
              <animate attributeName="rx" values="320;340;320" dur="8s" repeatCount="indefinite" />
              <animate attributeName="ry" values="320;340;320" dur="8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite" />
            </>
          )}
        </ellipse>
      </g>

      {/* Top Accent Glow */}
      <circle cx="400" cy="150" r="60" fill="url(#glowGradient)" opacity="0.35" filter="url(#glassBlur)">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="60;70;60" dur="5s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Bottom Accent Glow */}
      <circle cx="415" cy="650" r="50" fill="url(#glowGradient)" opacity="0.3" filter="url(#glassBlur)">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="50;60;50" dur="6s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
};

export default QuantumSpatial_7;
