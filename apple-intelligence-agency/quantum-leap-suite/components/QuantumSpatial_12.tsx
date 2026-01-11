import React from 'react';
import styles from './QuantumSpatial_12.module.css';

/**
 * QuantumSpatial_12: Animated quantum-spatial themed component
 * Design System: Quantum Spatial (9Bit Studios)
 * Theme: Dark-mysterious with liquid-glass glassmorphism
 * Performance: M4-optimized with GPU acceleration
 */

interface QuantumSpatial_12Props {
  /** Component width in pixels */
  width?: number;
  /** Component height in pixels */
  height?: number;
  /** Disable animations (respects prefers-reduced-motion) */
  static?: boolean;
  /** Custom class name */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

export const QuantumSpatial_12: React.FC<QuantumSpatial_12Props> = ({
  width = 800,
  height = 800,
  static: isStatic = false,
  className = '',
  ariaLabel = 'Quantum Spatial visualization with animated energy fields'
}) => {
  return (
    <div
      className={`${styles.container} ${isStatic ? styles.static : ''} ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={ariaLabel}
      aria-hidden="true" // Decorative element
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          {/* Quantum Spatial Gradients */}
          <radialGradient id="quantumCore-12" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#E85D75', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#0A0E27', stopOpacity: 0.2 }} />
          </radialGradient>

          <linearGradient id="glassMorphism-12" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.05 }} />
            <stop offset="100%" style={{ stopColor: '#E85D75', stopOpacity: 0.15 }} />
          </linearGradient>

          <radialGradient id="energyField-12" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 0.9 }} />
            <stop offset="70%" style={{ stopColor: '#E85D75', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#0A0E27', stopOpacity: 0 }} />
          </radialGradient>

          {/* Liquid Glass Blur Effects */}
          <filter id="liquidGlass-12">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"
              result="glass"
            />
            <feBlend in="SourceGraphic" in2="glass" mode="normal" />
          </filter>

          <filter id="glowEffect-12">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background: Deep Quantum Space */}
        <rect width="800" height="800" fill="#0A0E27" />

        {/* Outer Energy Field (Rotating) */}
        <g filter="url(#liquidGlass-12)" className={styles.energyField}>
          <circle cx="400" cy="400" r="350" fill="url(#energyField-12)" opacity="0.3" />
        </g>

        {/* Quantum Spatial Grid Layer */}
        <g opacity="0.4" stroke="url(#glassMorphism-12)" strokeWidth="1.5" fill="none">
          <line x1="100" y1="400" x2="700" y2="400" className={styles.gridLineH} />
          <line x1="400" y1="100" x2="400" y2="700" className={styles.gridLineV} />
          <circle cx="400" cy="400" r="250" className={styles.gridCircle1} />
          <circle cx="400" cy="400" r="180" className={styles.gridCircle2} />
        </g>

        {/* Fibonacci Spiral Elements */}
        <g filter="url(#glowEffect-12)" opacity="0.6">
          <path
            d="M 400 400 Q 500 300 550 400 Q 500 500 400 550 Q 300 500 250 400 Q 300 300 400 250"
            stroke="#4ECDC4"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className={styles.spiralPath}
          />
        </g>

        {/* Central Quantum Core (Glassmorphic Sphere) */}
        <g filter="url(#liquidGlass-12)">
          <circle
            cx="400"
            cy="400"
            r="120"
            fill="url(#quantumCore-12)"
            opacity="0.8"
            className={styles.coreCircle}
          />
          {/* Glass Reflection Layer */}
          <ellipse
            cx="380"
            cy="370"
            rx="80"
            ry="50"
            fill="#FFFFFF"
            opacity="0.15"
            className={styles.reflection}
          />
        </g>

        {/* Orbiting Quantum Particles */}
        <g filter="url(#glowEffect-12)">
          {/* Particle 1: Cyan */}
          <circle
            cx="400"
            cy="280"
            r="8"
            fill="#4ECDC4"
            opacity="0.9"
            className={styles.particle1}
          />
          {/* Particle 2: Coral */}
          <circle
            cx="520"
            cy="400"
            r="6"
            fill="#E85D75"
            opacity="0.9"
            className={styles.particle2}
          />
          {/* Particle 3: White */}
          <circle
            cx="400"
            cy="520"
            r="5"
            fill="#FFFFFF"
            opacity="0.8"
            className={styles.particle3}
          />
          {/* Particle 4: Cyan (Counter-orbit) */}
          <circle
            cx="280"
            cy="400"
            r="7"
            fill="#4ECDC4"
            opacity="0.7"
            className={styles.particle4}
          />
        </g>

        {/* Quantum Field Lines */}
        <g stroke="url(#glassMorphism-12)" strokeWidth="1" fill="none" opacity="0.3">
          <path d="M 400 400 L 550 250" className={styles.fieldLine1} />
          <path d="M 400 400 L 250 550" className={styles.fieldLine2} />
          <path d="M 400 400 L 550 550" className={styles.fieldLine3} />
          <path d="M 400 400 L 250 250" className={styles.fieldLine4} />
        </g>

        {/* Outer Glassmorphic Ring */}
        <g filter="url(#liquidGlass-12)">
          <circle
            cx="400"
            cy="400"
            r="300"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            className={styles.outerRing}
          />
        </g>

        {/* Quantum Data Streams */}
        <g opacity="0.4">
          <path
            d="M 150 400 Q 275 300 400 400 T 650 400"
            stroke="#4ECDC4"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5,10"
            className={styles.dataStream1}
          />
          <path
            d="M 400 150 Q 500 275 400 400 T 400 650"
            stroke="#E85D75"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5,10"
            className={styles.dataStream2}
          />
        </g>

        {/* Corner Quantum Nodes */}
        <g filter="url(#glowEffect-12)" opacity="0.6">
          <circle cx="150" cy="150" r="12" fill="#4ECDC4" className={styles.node1} />
          <circle cx="650" cy="150" r="12" fill="#E85D75" className={styles.node2} />
          <circle cx="150" cy="650" r="12" fill="#E85D75" className={styles.node3} />
          <circle cx="650" cy="650" r="12" fill="#4ECDC4" className={styles.node4} />
        </g>
      </svg>
    </div>
  );
};

// Component Variants

export const QuantumSpatial_12_Compact: React.FC<
  Omit<QuantumSpatial_12Props, 'width' | 'height'>
> = (props) => <QuantumSpatial_12 {...props} width={400} height={400} />;

export const QuantumSpatial_12_Static: React.FC<QuantumSpatial_12Props> = (props) => (
  <QuantumSpatial_12 {...props} static />
);

export default QuantumSpatial_12;
