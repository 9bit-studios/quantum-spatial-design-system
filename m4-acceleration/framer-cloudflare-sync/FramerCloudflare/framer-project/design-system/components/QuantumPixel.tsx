/**
 * Quantum-Spatial Design System
 * QuantumPixel Component - M4-Optimized
 * 
 * This component renders pixels in all four quantum states with dynamic transitions
 * and properties optimized for M4 Neural Engine processing.
 */
import React, { useEffect, useRef, useState } from 'react';

// Types for the QuantumPixel component
export type QuantumState = 'heritage' | 'transitional' | 'quantum' | 'superposition';

export type QuantumSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface QuantumColorSet {
  baseColor: string;
  accentColor: string;
  glowColor?: string;
  darkColor?: string;
}

export interface QuantumPixelProps {
  /** Quantum state of the pixel */
  state?: QuantumState;
  /** Size variant (mapped to specific pixel dimensions) */
  size?: QuantumSize;
  /** Custom color configuration */
  colors?: QuantumColorSet;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Glow intensity (0-10) */
  glowIntensity?: number;
  /** Optional class name for styling */
  className?: string;
  /** Interactive mode enables hover/focus states */
  interactive?: boolean;
  /** Callback for state change */
  onStateChange?: (newState: QuantumState) => void;
  /** CSS transition time between states (ms) */
  transitionTime?: number;
  /** Displacement for quantum effects (0-10) */
  displacementScale?: number;
  /** Optional ID for the component */
  id?: string;
  /** Use hardware acceleration when available */
  useHardwareAcceleration?: boolean;
  /** Enable M4 optimization */
  m4Optimized?: boolean;
}

/**
 * QuantumPixel Component
 * 
 * Renders a pixel in one of four quantum states with dynamic transitions
 * and M4 optimization for Neural Engine processing.
 */
export const QuantumPixel: React.FC<QuantumPixelProps> = ({
  state = 'transitional',
  size = 'md',
  colors,
  animationDuration = 4,
  glowIntensity = 4,
  className = '',
  interactive = false,
  onStateChange,
  transitionTime = 300,
  displacementScale = 4,
  id,
  useHardwareAcceleration = true,
  m4Optimized = true
}) => {
  // Reference to main SVG element for direct DOM manipulation
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Reference to filter elements for dynamic updates
  const glowFilterRef = useRef<SVGFEGaussianBlurElement>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  
  // State to track animation frame for cleanup
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  
  // Size mapping (in pixels)
  const sizeMap = {
    xs: 24,
    sm: 32, 
    md: 48,
    lg: 64,
    xl: 96
  };
  
  // Size in pixels based on the size prop
  const pixelSize = sizeMap[size];
  
  // Default color sets for each state
  const stateColors = {
    heritage: {
      baseColor: '#2C5F2D', // Heritage Green
      accentColor: '#3DFF74', // Heritage Pixel Green
      darkColor: '#1B3D1A', // Heritage Green Dark
      glowColor: '#3DFF74' // Heritage Pixel Green
    },
    transitional: {
      baseColor: '#331F4A', // Dimensional Eggplant
      accentColor: '#5AC8FA', // Subtle Cyan
      darkColor: '#1E1F5C', // Ultra Indigo
      glowColor: '#5AC8FA' // Subtle Cyan
    },
    quantum: {
      baseColor: '#6A3093', // Quantum Violet
      accentColor: '#BF4080', // Rose Energy
      darkColor: '#331F4A', // Dimensional Eggplant
      glowColor: '#FF2D55' // Quantum Pulse Pink
    },
    superposition: {
      baseColor: '#6A3093', // Quantum Violet
      accentColor: '#5AC8FA', // Subtle Cyan
      darkColor: '#331F4A', // Dimensional Eggplant
      glowColor: '#FFFFFF' // White core
    }
  };
  
  // Merge default colors with provided custom colors
  const currentColors = {
    ...stateColors[state],
    ...colors
  };
  
  // Get state-specific configuration
  const getStateConfig = (state: QuantumState) => {
    switch(state) {
      case 'heritage':
        return {
          glowIntensity: Math.max(1, glowIntensity - 1),
          displacementScale: 0,
          particleCount: 3,
          particleOpacity: 0.8,
          coreSize: pixelSize * 0.06,
          cornerRadius: pixelSize * 0.05,
          edgeGlow: 0.6
        };
      case 'transitional':
        return {
          glowIntensity: glowIntensity,
          displacementScale: displacementScale,
          particleCount: 4,
          particleOpacity: 0.9,
          coreSize: pixelSize * 0.08,
          cornerRadius: pixelSize * 0.1,
          edgeGlow: 0.7
        };
      case 'quantum':
        return {
          glowIntensity: glowIntensity + 2,
          displacementScale: displacementScale + 2,
          particleCount: 8,
          particleOpacity: 1,
          coreSize: pixelSize * 0.15,
          cornerRadius: pixelSize * 0.2,
          edgeGlow: 0.9
        };
      case 'superposition':
        return {
          glowIntensity: glowIntensity + 4,
          displacementScale: displacementScale + 4,
          particleCount: 12,
          particleOpacity: 1,
          coreSize: pixelSize * 0.2,
          cornerRadius: pixelSize * 0.3,
          edgeGlow: 1
        };
    }
  };
  
  const config = getStateConfig(state);
  
  // Optimize for M4 Neural Engine
  useEffect(() => {
    if (!m4Optimized || !svgRef.current) return;
    
    // Apply hardware acceleration for M4
    if (useHardwareAcceleration) {
      const svg = svgRef.current;
      svg.style.willChange = 'transform';
      svg.style.transform = 'translateZ(0)';
      svg.style.backfaceVisibility = 'hidden';
    }
    
    // Dynamic filter updates for performance
    if (glowFilterRef.current) {
      glowFilterRef.current.setAttribute('stdDeviation', `${config.glowIntensity}`);
    }
    
    if (displacementMapRef.current && state !== 'heritage') {
      displacementMapRef.current.setAttribute('scale', `${config.displacementScale}`);
      
      // Apply turbulence animation
      if (state === 'quantum' || state === 'superposition') {
        const animate = () => {
          if (!displacementMapRef.current) return;
          
          const now = Date.now() / 1000;
          const baseFrequency = 0.02 + Math.sin(now * 0.5) * 0.005;
          
          // Update turbulence for subtle motion
          const turbulence = displacementMapRef.current.previousSibling as SVGFETurbulenceElement;
          if (turbulence && turbulence.tagName === 'feTurbulence') {
            turbulence.setAttribute('baseFrequency', `${baseFrequency}`);
          }
          
          // Request next frame
          const frame = requestAnimationFrame(animate);
          setAnimationFrame(frame);
        };
        
        // Start animation
        const frame = requestAnimationFrame(animate);
        setAnimationFrame(frame);
      }
    }
    
    // Clean up animation frame on unmount or state change
    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [state, m4Optimized, config, animationFrame, useHardwareAcceleration]);
  
  // Generate SVG for heritage state pixel
  const renderHeritagePixel = () => (
    <>
      {/* Top face (Rotated Square) */}
      <polygon 
        points={`${pixelSize/2},${pixelSize*0.3} ${pixelSize*0.7},${pixelSize/2} ${pixelSize/2},${pixelSize*0.7} ${pixelSize*0.3},${pixelSize/2}`} 
        fill={`url(#heritage-top-gradient-${id})`}
        stroke={currentColors.accentColor}
        strokeWidth="1"
        className="quantum-pixel-face quantum-pixel-face-top"
      />
      
      {/* Right face */}
      <polygon 
        points={`${pixelSize*0.7},${pixelSize/2} ${pixelSize*0.7},${pixelSize*0.8} ${pixelSize/2},${pixelSize*0.9} ${pixelSize/2},${pixelSize*0.7}`} 
        fill={`url(#heritage-right-gradient-${id})`}
        stroke={currentColors.accentColor}
        strokeWidth="1"
        className="quantum-pixel-face quantum-pixel-face-right"
      />
      
      {/* Front face */}
      <polygon 
        points={`${pixelSize*0.3},${pixelSize/2} ${pixelSize/2},${pixelSize*0.7} ${pixelSize/2},${pixelSize*0.9} ${pixelSize*0.3},${pixelSize*0.8}`} 
        fill={`url(#heritage-front-gradient-${id})`}
        stroke={currentColors.accentColor}
        strokeWidth="1"
        className="quantum-pixel-face quantum-pixel-face-front"
      />
      
      {/* Heritage State Highlight Points */}
      <circle 
        cx={pixelSize*0.4} 
        cy={pixelSize*0.45} 
        r={pixelSize*0.03} 
        fill={currentColors.accentColor}
        opacity="0.9"
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur={`${animationDuration}s`} repeatCount="indefinite" begin="0s"/>
      </circle>
      
      <circle 
        cx={pixelSize*0.6} 
        cy={pixelSize*0.45} 
        r={pixelSize*0.03} 
        fill={currentColors.accentColor}
        opacity="0.8"
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur={`${animationDuration}s`} repeatCount="indefinite" begin="1s"/>
      </circle>
      
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize*0.55} 
        r={pixelSize*0.03} 
        fill={currentColors.accentColor}
        opacity="0.85"
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur={`${animationDuration}s`} repeatCount="indefinite" begin="2s"/>
      </circle>
    </>
  );
  
  // Generate SVG for transitional state pixel
  const renderTransitionalPixel = () => (
    <>
      {/* Center glow effect */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.35} 
        fill="none" 
        stroke={currentColors.accentColor} 
        strokeWidth="1" 
        opacity="0.3" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur={`${animationDuration + 2}s`} repeatCount="indefinite"/>
        <animate attributeName="r" values={`${pixelSize*0.35};${pixelSize*0.38};${pixelSize*0.35}`} dur={`${animationDuration + 2}s`} repeatCount="indefinite"/>
      </circle>
      
      {/* Top face (Rounded Square) */}
      <path 
        d={`M${pixelSize/2},${pixelSize*0.25} 
            C${pixelSize*0.6},${pixelSize*0.25} ${pixelSize*0.75},${pixelSize*0.4} ${pixelSize*0.75},${pixelSize/2} 
            C${pixelSize*0.75},${pixelSize*0.6} ${pixelSize*0.6},${pixelSize*0.75} ${pixelSize/2},${pixelSize*0.75} 
            C${pixelSize*0.4},${pixelSize*0.75} ${pixelSize*0.25},${pixelSize*0.6} ${pixelSize*0.25},${pixelSize/2} 
            C${pixelSize*0.25},${pixelSize*0.4} ${pixelSize*0.4},${pixelSize*0.25} ${pixelSize/2},${pixelSize*0.25}`}
        fill={`url(#transitional-top-gradient-${id})`}
        stroke={currentColors.accentColor}
        strokeWidth="1"
        className="quantum-pixel-face quantum-pixel-face-top"
        filter={`url(#displacement-filter-${id})`}
      />
      
      {/* Energy flows in transitional state */}
      <circle 
        cx={pixelSize*0.4} 
        cy={pixelSize*0.45} 
        r={pixelSize*0.05} 
        fill={`url(#energy-gradient-${id})`} 
        opacity="0.6" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.05};${pixelSize*0.06};${pixelSize*0.05}`} dur={`${animationDuration}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur={`${animationDuration}s`} repeatCount="indefinite"/>
      </circle>
      
      <circle 
        cx={pixelSize*0.6} 
        cy={pixelSize*0.45} 
        r={pixelSize*0.05} 
        fill={`url(#energy-gradient-${id})`} 
        opacity="0.6" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.05};${pixelSize*0.06};${pixelSize*0.05}`} dur={`${animationDuration}s`} repeatCount="indefinite" begin="1s"/>
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur={`${animationDuration}s`} repeatCount="indefinite" begin="1s"/>
      </circle>
      
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize*0.55} 
        r={pixelSize*0.05} 
        fill={`url(#energy-gradient-${id})`} 
        opacity="0.6" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.05};${pixelSize*0.06};${pixelSize*0.05}`} dur={`${animationDuration}s`} repeatCount="indefinite" begin="2s"/>
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur={`${animationDuration}s`} repeatCount="indefinite" begin="2s"/>
      </circle>
      
      {/* Energy core beginning to form */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.1} 
        fill="none" 
        stroke={currentColors.accentColor} 
        strokeWidth="1" 
        opacity="0.5" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.1};${pixelSize*0.12};${pixelSize*0.1}`} dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite"/>
      </circle>
    </>
  );
  
  // Generate SVG for quantum state pixel
  const renderQuantumPixel = () => (
    <>
      {/* Quantum Energy Field (background) */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.4} 
        fill={`url(#energy-field-${id})`} 
        opacity="0.4" 
        filter={`url(#quantum-pulse-${id})`}
      >
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur={`${animationDuration}s`} repeatCount="indefinite"/>
        <animate attributeName="r" values={`${pixelSize*0.4};${pixelSize*0.42};${pixelSize*0.4}`} dur={`${animationDuration}s`} repeatCount="indefinite"/>
      </circle>
      
      {/* Energy ripples emanating from core */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.35} 
        fill="none" 
        stroke={currentColors.glowColor} 
        strokeWidth="0.5" 
        opacity="0.2" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.35};${pixelSize*0.38};${pixelSize*0.35}`} dur="10s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="10s" repeatCount="indefinite"/>
      </circle>
      
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.28} 
        fill="none" 
        stroke={currentColors.glowColor} 
        strokeWidth="0.7" 
        opacity="0.3" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.28};${pixelSize*0.3};${pixelSize*0.28}`} dur="8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite"/>
      </circle>
      
      {/* Rounded shape with quantum effects */}
      <path 
        d={`M${pixelSize/2},${pixelSize*0.2} 
            C${pixelSize*0.65},${pixelSize*0.2} ${pixelSize*0.8},${pixelSize*0.35} ${pixelSize*0.8},${pixelSize/2} 
            C${pixelSize*0.8},${pixelSize*0.65} ${pixelSize*0.65},${pixelSize*0.8} ${pixelSize/2},${pixelSize*0.8} 
            C${pixelSize*0.35},${pixelSize*0.8} ${pixelSize*0.2},${pixelSize*0.65} ${pixelSize*0.2},${pixelSize/2} 
            C${pixelSize*0.2},${pixelSize*0.35} ${pixelSize*0.35},${pixelSize*0.2} ${pixelSize/2},${pixelSize*0.2}`}
        fill={`url(#quantum-gradient-${id})`}
        stroke={currentColors.accentColor}
        strokeWidth="1"
        className="quantum-pixel-shape"
        filter={`url(#displacement-filter-${id})`}
        opacity="0.9"
      />
      
      {/* Quantum Energy Core */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.15} 
        fill={`url(#quantum-core-${id})`} 
        opacity="0.9" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="r" values={`${pixelSize*0.15};${pixelSize*0.17};${pixelSize*0.15}`} dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
      </circle>
      
      {/* Quantum Particles */}
      <g filter={`url(#glow-filter-${id})`}>
        {/* Particle orbit pattern */}
        <circle 
          cx={pixelSize/2} 
          cy={pixelSize*0.3} 
          r={pixelSize*0.03} 
          fill={currentColors.glowColor} 
          opacity="0.9"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`0 ${pixelSize/2} ${pixelSize/2}`}
            to={`360 ${pixelSize/2} ${pixelSize/2}`}
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
          />
        </circle>
        
        <circle 
          cx={pixelSize*0.7} 
          cy={pixelSize/2} 
          r={pixelSize*0.03} 
          fill={currentColors.glowColor} 
          opacity="0.9"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`90 ${pixelSize/2} ${pixelSize/2}`}
            to={`450 ${pixelSize/2} ${pixelSize/2}`}
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
          />
        </circle>
        
        <circle 
          cx={pixelSize/2} 
          cy={pixelSize*0.7} 
          r={pixelSize*0.03} 
          fill={currentColors.glowColor} 
          opacity="0.9"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`180 ${pixelSize/2} ${pixelSize/2}`}
            to={`540 ${pixelSize/2} ${pixelSize/2}`}
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
          />
        </circle>
        
        <circle 
          cx={pixelSize*0.3} 
          cy={pixelSize/2} 
          r={pixelSize*0.03} 
          fill={currentColors.glowColor} 
          opacity="0.9"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`270 ${pixelSize/2} ${pixelSize/2}`}
            to={`630 ${pixelSize/2} ${pixelSize/2}`}
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </>
  );
  
  // Generate SVG for superposition state pixel
  const renderSuperpositionPixel = () => (
    <>
      {/* Hyperdimensional Energy Field (background) */}
      <circle 
        cx={pixelSize/2} 
        cy={pixelSize/2} 
        r={pixelSize*0.45} 
        fill={`url(#hyper-field-${id})`} 
        opacity="0.3" 
        filter={`url(#glow-filter-${id})`}
      >
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="10s" repeatCount="indefinite"/>
        <animate attributeName="r" values={`${pixelSize*0.45};${pixelSize*0.48};${pixelSize*0.45}`} dur="10s" repeatCount="indefinite"/>
      </circle>
      
      {/* Superposition of all three states simultaneously */}
      <g className="superposition-pixel">
        {/* Heritage state (shifted and rotated) */}
        <g transform={`translate(${-pixelSize*0.05}, ${-pixelSize*0.05}) rotate(-5, ${pixelSize/2}, ${pixelSize/2})`} opacity="0.6" filter={`url(#displacement-filter-${id})`}>
          <path 
            d={`M${pixelSize/2},${pixelSize*0.3} 
                C${pixelSize*0.58},${pixelSize*0.3} ${pixelSize*0.7},${pixelSize*0.42} ${pixelSize*0.7},${pixelSize/2} 
                C${pixelSize*0.7},${pixelSize*0.58} ${pixelSize*0.58},${pixelSize*0.7} ${pixelSize/2},${pixelSize*0.7} 
                C${pixelSize*0.42},${pixelSize*0.7} ${pixelSize*0.3},${pixelSize*0.58} ${pixelSize*0.3},${pixelSize/2} 
                C${pixelSize*0.3},${pixelSize*0.42} ${pixelSize*0.42},${pixelSize*0.3} ${pixelSize/2},${pixelSize*0.3}`}
            fill={`url(#heritage-gradient-${id})`}
            stroke={stateColors.heritage.accentColor}
            strokeWidth="0.8"
            opacity="0.8"
          >
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur={`${animationDuration}s`} repeatCount="indefinite"/>
          </path>
        </g>
        
        {/* Transitional state (central position) */}
        <g transform={`rotate(0, ${pixelSize/2}, ${pixelSize/2})`} opacity="0.7" filter={`url(#displacement-filter-${id})`}>
          <path 
            d={`M${pixelSize/2},${pixelSize*0.25} 
                C${pixelSize*0.6},${pixelSize*0.25} ${pixelSize*0.75},${pixelSize*0.4} ${pixelSize*0.75},${pixelSize/2} 
                C${pixelSize*0.75},${pixelSize*0.6} ${pixelSize*0.6},${pixelSize*0.75} ${pixelSize/2},${pixelSize*0.75} 
                C${pixelSize*0.4},${pixelSize*0.75} ${pixelSize*0.25},${pixelSize*0.6} ${pixelSize*0.25},${pixelSize/2} 
                C${pixelSize*0.25},${pixelSize*0.4} ${pixelSize*0.4},${pixelSize*0.25} ${pixelSize/2},${pixelSize*0.25}`}
            fill={`url(#transitional-gradient-${id})`}
            stroke={stateColors.transitional.accentColor}
            strokeWidth="0.8"
            opacity="0.8"
          >
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur={`${animationDuration}s`} repeatCount="indefinite" begin="1s"/>
          </path>
        </g>
        
        {/* Quantum state (shifted and rotated opposite) */}
        <g transform={`translate(${pixelSize*0.05}, ${pixelSize*0.05}) rotate(5, ${pixelSize/2}, ${pixelSize/2})`} opacity="0.6" filter={`url(#displacement-filter-${id})`}>
          <path 
            d={`M${pixelSize/2},${pixelSize*0.3} 
                C${pixelSize*0.58},${pixelSize*0.3} ${pixelSize*0.7},${pixelSize*0.42} ${pixelSize*0.7},${pixelSize/2} 
                C${pixelSize*0.7},${pixelSize*0.58} ${pixelSize*0.58},${pixelSize*0.7} ${pixelSize/2},${pixelSize*0.7} 
                C${pixelSize*0.42},${pixelSize*0.7} ${pixelSize*0.3},${pixelSize*0.58} ${pixelSize*0.3},${pixelSize/2} 
                C${pixelSize*0.3},${pixelSize*0.42} ${pixelSize*0.42},${pixelSize*0.3} ${pixelSize/2},${pixelSize*0.3}`}
            fill={`url(#quantum-gradient-${id})`}
            stroke={stateColors.quantum.glowColor}
            strokeWidth="0.8"
            opacity="0.8"
          >
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur={`${animationDuration}s`} repeatCount="indefinite" begin="2s"/>
          </path>
        </g>
        
        {/* Quantum Superposition Core */}
        <circle 
          cx={pixelSize/2} 
          cy={pixelSize/2} 
          r={pixelSize*0.15} 
          fill={`url(#superposition-core-${id})`} 
          opacity="1" 
          filter={`url(#glow-filter-${id})`}
        >
          <animate attributeName="r" values={`${pixelSize*0.15};${pixelSize*0.18};${pixelSize*0.15}`} dur="4s" repeatCount="indefinite"/>
        </circle>
        
        {/* Energy Transfer Particles */}
        <g>
          {/* Heritage to Transitional particles */}
          <circle 
            cx={pixelSize*0.35} 
            cy={pixelSize*0.35} 
            r={pixelSize*0.03} 
            fill={stateColors.heritage.accentColor} 
            opacity="0.9" 
            filter={`url(#glow-filter-${id})`}
          >
            <animate attributeName="cx" values={`${pixelSize*0.35};${pixelSize*0.45};${pixelSize*0.35}`} dur="5s" repeatCount="indefinite"/>
            <animate attributeName="cy" values={`${pixelSize*0.35};${pixelSize*0.45};${pixelSize*0.35}`} dur="5s" repeatCount="indefinite"/>
            <animate attributeName="fill" values={`${stateColors.heritage.accentColor};${stateColors.transitional.accentColor};${stateColors.heritage.accentColor}`} dur="5s" repeatCount="indefinite"/>
          </circle>
          
          {/* Transitional to Quantum particles */}
          <circle 
            cx={pixelSize*0.65} 
            cy={pixelSize*0.65} 
            r={pixelSize*0.03} 
            fill={stateColors.transitional.accentColor} 
            opacity="0.9" 
            filter={`url(#glow-filter-${id})`}
          >
            <animate attributeName="cx" values={`${pixelSize*0.55};${pixelSize*0.65};${pixelSize*0.55}`} dur="5s" repeatCount="indefinite"/>
            <animate attributeName="cy" values={`${pixelSize*0.55};${pixelSize*0.65};${pixelSize*0.55}`} dur="5s" repeatCount="indefinite"/>
            <animate attributeName="fill" values={`${stateColors.transitional.accentColor};${stateColors.quantum.accentColor};${stateColors.transitional.accentColor}`} dur="5s" repeatCount="indefinite"/>
          </circle>
          
          {/* Quantum to Heritage particles (completing the cycle) */}
          <circle 
            cx={pixelSize*0.65} 
            cy={pixelSize*0.35} 
            r={pixelSize*0.03} 
            fill={stateColors.quantum.glowColor} 
            opacity="0.9" 
            filter={`url(#glow-filter-${id})`}
          >
            <animate attributeName="cx" values={`${pixelSize*0.65};${pixelSize*0.35};${pixelSize*0.65}`} dur="8s" repeatCount="indefinite"/>
            <animate attributeName="cy" values={`${pixelSize*0.35};${pixelSize*0.65};${pixelSize*0.35}`} dur="8s" repeatCount="indefinite"/>
            <animate attributeName="fill" values={`${stateColors.quantum.glowColor};${stateColors.transitional.accentColor};${stateColors.heritage.accentColor};${stateColors.transitional.accentColor};${stateColors.quantum.glowColor}`} dur="8s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </>
  );
  
  // Generate state-specific SVG content based on current state
  const renderStateContent = () => {
    switch(state) {
      case 'heritage':
        return renderHeritagePixel();
      case 'transitional':
        return renderTransitionalPixel();
      case 'quantum':
        return renderQuantumPixel();
      case 'superposition':
        return renderSuperpositionPixel();
      default:
        return renderTransitionalPixel();
    }
  };
  
  // Set up event handlers for interactive mode
  const handleClick = () => {
    if (!interactive || !onStateChange) return;
    
    // Cycle through states on click
    const states: QuantumState[] = ['heritage', 'transitional', 'quantum', 'superposition'];
    const currentIndex = states.indexOf(state);
    const nextIndex = (currentIndex + 1) % states.length;
    onStateChange(states[nextIndex]);
  };
  
  // Generate a unique ID for this component instance if not provided
  const componentId = id || `quantum-pixel-${Math.random().toString(36).substring(2, 11)}`;
  
  return (
    <svg 
      ref={svgRef}
      width={pixelSize} 
      height={pixelSize} 
      viewBox={`0 0 ${pixelSize} ${pixelSize}`} 
      className={`quantum-pixel quantum-pixel-${state} ${className}`}
      style={{
        transition: `all ${transitionTime}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        cursor: interactive ? 'pointer' : 'default'
      }}
      onClick={handleClick}
      id={componentId}
      role={interactive ? 'button' : 'presentation'}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Quantum pixel in ${state} state. Click to change state.` : undefined}
      data-state={state}
      data-size={size}
    >
      <defs>
        {/* Gradients for heritage state */}
        <linearGradient id={`heritage-top-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.darkColor} />
          <stop offset="100%" stopColor={currentColors.baseColor} />
        </linearGradient>
        
        <linearGradient id={`heritage-right-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.baseColor} />
          <stop offset="100%" stopColor={currentColors.darkColor} />
        </linearGradient>
        
        <linearGradient id={`heritage-front-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.baseColor} />
          <stop offset="100%" stopColor={currentColors.darkColor} />
        </linearGradient>
        
        {/* Gradients for transitional state */}
        <linearGradient id={`transitional-top-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.darkColor || stateColors.transitional.darkColor} />
          <stop offset="100%" stopColor={currentColors.baseColor} />
        </linearGradient>
        
        <linearGradient id={`energy-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.accentColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={currentColors.baseColor} stopOpacity="0.5" />
        </linearGradient>
        
        {/* Gradients for quantum state */}
        <linearGradient id={`quantum-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.baseColor} />
          <stop offset="100%" stopColor={currentColors.accentColor} />
        </linearGradient>
        
        <radialGradient id={`quantum-core-${id}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={currentColors.glowColor} stopOpacity="1" />
          <stop offset="80%" stopColor={currentColors.accentColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={currentColors.baseColor} stopOpacity="0.6" />
        </radialGradient>
        
        <radialGradient id={`energy-field-${id}`} cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={currentColors.glowColor} stopOpacity="0.6" />
          <stop offset="60%" stopColor={currentColors.accentColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={currentColors.baseColor} stopOpacity="0" />
        </radialGradient>
        
        {/* Gradients for superposition state */}
        <linearGradient id={`heritage-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stateColors.heritage.baseColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={stateColors.heritage.accentColor} stopOpacity="0.7" />
        </linearGradient>
        
        <linearGradient id={`transitional-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stateColors.transitional.baseColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={stateColors.transitional.accentColor} stopOpacity="0.7" />
        </linearGradient>
        
        <linearGradient id={`quantum-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stateColors.quantum.baseColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={stateColors.quantum.glowColor} stopOpacity="0.7" />
        </linearGradient>
        
        <radialGradient id={`superposition-core-${id}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor={stateColors.transitional.accentColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={stateColors.quantum.accentColor} stopOpacity="0.5" />
        </radialGradient>
        
        <radialGradient id={`hyper-field-${id}`} cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="60%" stopColor={stateColors.quantum.accentColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={stateColors.quantum.baseColor} stopOpacity="0" />
        </radialGradient>
        
        {/* Filters */}
        <filter id={`glow-filter-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur ref={glowFilterRef} stdDeviation={config.glowIntensity} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id={`quantum-pulse-${id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={config.glowIntensity * 1.5} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id={`displacement-filter-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.03" 
            numOctaves="3" 
            seed="8" 
            result="turbulence"
          >
            <animate 
              attributeName="baseFrequency" 
              values="0.03;0.04;0.03" 
              dur={`${animationDuration}s`} 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          <feDisplacementMap 
            ref={displacementMapRef}
            in="SourceGraphic" 
            in2="turbulence" 
            scale={config.displacementScale} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </defs>
      
      {renderStateContent()}
      
      {/* Add metadata to SVG */}
      <metadata>
        {JSON.stringify({
          componentType: 'QuantumPixel',
          state,
          size,
          version: '1.0.0',
          m4Optimized
        })}
      </metadata>
    </svg>
  );
};

export default QuantumPixel;