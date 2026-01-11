import React from 'react';

interface QuantumSpatial5Props {
  size?: number;
  animate?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * QuantumSpatial_5 SVG Component
 *
 * A quantum-spatial themed animated SVG featuring:
 * - Liquid-glass glassmorphism effects
 * - Orbital quantum particle system
 * - Dark-mysterious aesthetic
 * - M4-optimized animations
 *
 * @component
 * @example
 * <QuantumSpatial5 size={200} animate={true} variant="dark" />
 */
export const QuantumSpatial5: React.FC<QuantumSpatial5Props> = ({
  size = 200,
  animate = true,
  variant = 'dark',
  className = '',
}) => {
  const colors = {
    dark: {
      primary: '#E85D75',
      secondary: '#4ECDC4',
      accent: '#A78BFA',
      background: '#0A0E27',
      glass: 'rgba(255, 255, 255, 0.05)',
      glow: 'rgba(232, 93, 117, 0.4)',
    },
    light: {
      primary: '#E85D75',
      secondary: '#4ECDC4',
      accent: '#7C3AED',
      background: '#F8FAFC',
      glass: 'rgba(0, 0, 0, 0.03)',
      glow: 'rgba(232, 93, 117, 0.3)',
    },
  };

  const theme = colors[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quantum Spatial design element with animated orbital particles"
    >
      <defs>
        {/* Glassmorphism blur filter */}
        <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>
        </filter>

        {/* Quantum glow effect */}
        <filter id="quantum-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feFlood floodColor={theme.primary} floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Primary gradient - quantum spatial */}
        <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.8" />
          <stop offset="50%" stopColor={theme.accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={theme.secondary} stopOpacity="0.8" />
        </linearGradient>

        {/* Secondary gradient - liquid glass */}
        <radialGradient id="glass-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={theme.glass} stopOpacity="0.8" />
          <stop offset="70%" stopColor={theme.glass} stopOpacity="0.4" />
          <stop offset="100%" stopColor={theme.glass} stopOpacity="0.1" />
        </radialGradient>

        {/* Orbital path for animation */}
        <path
          id="orbit-path-1"
          d="M 100,40 a 60,60 0 1,1 0,120 a 60,60 0 1,1 0,-120"
          fill="none"
        />
        <path
          id="orbit-path-2"
          d="M 100,60 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"
          fill="none"
        />
        <path
          id="orbit-path-3"
          d="M 100,75 a 25,25 0 1,1 0,50 a 25,25 0 1,1 0,-50"
          fill="none"
        />
      </defs>

      {/* Background quantum field */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill={theme.background}
        opacity="0.3"
      />

      {/* Outer orbital ring - glassmorphism */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="url(#glass-gradient)"
        strokeWidth="2"
        opacity="0.6"
        filter="url(#glass-blur)"
      />

      {/* Middle orbital ring */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#primary-gradient)"
        strokeWidth="1.5"
        opacity="0.5"
        strokeDasharray="4 4"
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="8"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Inner orbital ring */}
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="none"
        stroke={theme.secondary}
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="3 3"
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Central quantum core */}
      <circle
        cx="100"
        cy="100"
        r="12"
        fill="url(#primary-gradient)"
        filter="url(#quantum-glow)"
      >
        {animate && (
          <>
            <animate
              attributeName="r"
              values="12;14;12"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Quantum particles - Outer orbit */}
      <circle r="4" fill={theme.primary} filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 100,40 a 60,60 0 1,1 0,120 a 60,60 0 1,1 0,-120"
          />
        )}
        {!animate && <circle cx="160" cy="100" r="4" />}
      </circle>

      <circle r="3" fill={theme.accent} filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 100,40 a 60,60 0 1,1 0,120 a 60,60 0 1,1 0,-120"
            begin="1s"
          />
        )}
        {!animate && <circle cx="40" cy="100" r="3" />}
      </circle>

      {/* Quantum particles - Middle orbit */}
      <circle r="3.5" fill={theme.secondary} filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 100,60 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"
          />
        )}
        {!animate && <circle cx="140" cy="100" r="3.5" />}
      </circle>

      <circle r="3" fill={theme.primary} opacity="0.8" filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 100,60 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"
            begin="1.5s"
          />
        )}
        {!animate && <circle cx="60" cy="100" r="3" />}
      </circle>

      {/* Quantum particles - Inner orbit */}
      <circle r="2.5" fill={theme.accent} filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path="M 100,75 a 25,25 0 1,1 0,50 a 25,25 0 1,1 0,-50"
          />
        )}
        {!animate && <circle cx="125" cy="100" r="2.5" />}
      </circle>

      <circle r="2.5" fill={theme.secondary} opacity="0.9" filter="url(#quantum-glow)">
        {animate && (
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path="M 100,75 a 25,25 0 1,1 0,50 a 25,25 0 1,1 0,-50"
            begin="1s"
          />
        )}
        {!animate && <circle cx="75" cy="100" r="2.5" />}
      </circle>

      {/* Quantum field lines - decorative elements */}
      <path
        d="M 100,20 Q 130,100 100,180"
        stroke={theme.primary}
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      >
        {animate && (
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <path
        d="M 100,20 Q 70,100 100,180"
        stroke={theme.secondary}
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      >
        {animate && (
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="3s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        )}
      </path>

      {/* Outer glassmorphism frame */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="url(#glass-gradient)"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
};

export default QuantumSpatial5;
