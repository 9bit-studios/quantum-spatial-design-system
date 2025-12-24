/**
 * Quantum-Spatial Design System
 * DimensionalGrid Component - M4-Optimized
 * 
 * This component implements the quantum-spatial grid system with
 * multiple grid types, densities, and advanced visual effects.
 * Fully optimized for Apple Silicon's Neural Engine.
 */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Import grid utilities
import { 
  GRID, 
  generateOptimalGridLayout, 
  perspectiveOffset, 
  calculateDistanceOpacity,
  alignToGrid
} from '../../Documents//foundation/grid-systems/grid-utilities';

// Types for the DimensionalGrid component
export type GridType = 'background' | 'interface' | 'feature';
export type GridDensity = 'fine' | 'medium' | 'coarse';
export type GridState = 'heritage' | 'transitional' | 'quantum';

export interface DimensionalGridProps {
  /** Type of grid to render */
  type?: GridType;
  /** Grid density (fine: 8px, medium: 16px, coarse: 32px) */
  density?: GridDensity;
  /** Quantum state style */
  state?: GridState;
  /** Width of the grid container (defaults to 100%) */
  width?: number | string;
  /** Height of the grid container (defaults to 100%) */
  height?: number | string;
  /** Enable distance-based opacity falloff */
  enableFalloff?: boolean;
  /** Enable perspective shift with mouse/device movement */
  enablePerspectiveShift?: boolean;
  /** Perspective shift intensity (0-1) */
  perspectiveIntensity?: number;
  /** Enable secondary overlay grid for depth */
  enableSecondaryGrid?: boolean;
  /** Opacity of the grid (0-1) */
  opacity?: number;
  /** Secondary grid opacity multiplier (0-1) */
  secondaryOpacityMultiplier?: number;
  /** CSS class name */
  className?: string;
  /** Perspective angle X (degrees) */
  perspectiveAngleX?: number;
  /** Perspective angle Y (degrees) */
  perspectiveAngleY?: number;
  /** Primary grid color */
  primaryColor?: string;
  /** Secondary grid color */
  secondaryColor?: string;
  /** Z-index for positioning */
  zIndex?: number;
  /** Fixed position (true) or absolute (false) */
  fixed?: boolean;
  /** Enable M4 optimization */
  m4Optimized?: boolean;
  /** Optional ID for the component */
  id?: string;
}

/**
 * DimensionalGrid Component
 * 
 * Implements the quantum-spatial grid system with multiple types,
 * densities, and advanced visual effects. Optimized for M4.
 */
export const DimensionalGrid: React.FC<DimensionalGridProps> = ({
  type = 'background',
  density = 'medium',
  state = 'transitional',
  width = '100%', 
  height = '100%',
  enableFalloff = true,
  enablePerspectiveShift = true,
  perspectiveIntensity = 0.05,
  enableSecondaryGrid = true,
  opacity: userOpacity,
  secondaryOpacityMultiplier = 0.5,
  className = '',
  perspectiveAngleX = 60,
  perspectiveAngleY = 0,
  primaryColor,
  secondaryColor,
  zIndex = -5,
  fixed = true,
  m4Optimized = true,
  id
}) => {
  // Create refs for canvas and container
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSecondaryRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for tracking dimensions and mouse position
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  
  // Grid type opacity ranges based on the specification
  const opacityRanges = useMemo(() => ({
    background: { min: 0.08, max: 0.12 },
    interface: { min: 0.15, max: 0.20 },
    feature: { min: 0.20, max: 0.25 }
  }), []);
  
  // Base opacity from grid type or user override
  const baseOpacity = useMemo(() => {
    if (userOpacity !== undefined) return userOpacity;
    const range = opacityRanges[type];
    return (range.min + range.max) / 2;
  }, [type, userOpacity, opacityRanges]);
  
  // Grid density in pixels
  const gridSize = useMemo(() => {
    switch (density) {
      case 'fine': return GRID.BASE_UNIT; // 8px
      case 'medium': return GRID.BASE_UNIT * 2; // 16px
      case 'coarse': return GRID.BASE_UNIT * 4; // 32px
      default: return GRID.BASE_UNIT * 2; // 16px default
    }
  }, [density]);
  
  // State-specific colors
  const stateColors = useMemo(() => ({
    heritage: {
      primary: '#3DFF74', // Heritage Pixel Green
      secondary: '#00FFC8' // Heritage Pixel Aqua
    },
    transitional: {
      primary: '#5AC8FA', // Subtle Cyan
      secondary: '#613FE7' // Ultra Violet
    },
    quantum: {
      primary: '#BF4080', // Rose Energy
      secondary: '#FF2D55' // Quantum Pulse Pink
    }
  }), []);
  
  // Get final colors (user overrides or state defaults)
  const gridColors = useMemo(() => ({
    primary: primaryColor || stateColors[state].primary,
    secondary: secondaryColor || stateColors[state].secondary
  }), [primaryColor, secondaryColor, state, stateColors]);
  
  // Generate a unique ID for this component instance if not provided
  const componentId = useMemo(
    () => id || `dimensional-grid-${Math.random().toString(36).substring(2, 11)}`,
    [id]
  );
  
  // Handle window resize
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions({ width, height });
    }
  }, []);
  
  // Handle mouse movement for perspective shift
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!enablePerspectiveShift) return;
    
    // Get container position for relative mouse coordinates
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate relative position (-1 to 1 range)
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePosition({ x, y });
  }, [enablePerspectiveShift]);
  
  // Handle device orientation changes for mobile perspective shift
  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (!enablePerspectiveShift) return;
    
    // Beta: front to back motion (0 to ~90/-90)
    // Gamma: left to right motion (-90 to 90)
    const beta = event.beta ?? 0;
    const gamma = event.gamma ?? 0;
    
    // Normalize values to -1 to 1 range
    const normalizedBeta = Math.min(Math.max(beta / 45, -1), 1);
    const normalizedGamma = Math.min(Math.max(gamma / 45, -1), 1);
    
    setDeviceOrientation({ beta: normalizedBeta, gamma: normalizedGamma });
  }, [enablePerspectiveShift]);
  
  // Calculate perspective shift based on mouse/device input
  const calculatePerspectiveShift = useCallback(() => {
    if (!enablePerspectiveShift) return { x: perspectiveAngleX, y: perspectiveAngleY };
    
    // Use device orientation if available, otherwise use mouse position
    const hasMoved = Math.abs(mousePosition.x) + Math.abs(mousePosition.y) > 0;
    const hasOrientation = Math.abs(deviceOrientation.beta) + Math.abs(deviceOrientation.gamma) > 0;
    
    let xShift = 0;
    let yShift = 0;
    
    if (hasOrientation) {
      // Use device orientation
      xShift = deviceOrientation.gamma * 10 * perspectiveIntensity;
      yShift = deviceOrientation.beta * 10 * perspectiveIntensity;
    } else if (hasMoved) {
      // Use mouse position
      xShift = mousePosition.x * 10 * perspectiveIntensity;
      yShift = mousePosition.y * 10 * perspectiveIntensity;
    }
    
    return {
      x: perspectiveAngleX + xShift,
      y: perspectiveAngleY + yShift
    };
  }, [
    enablePerspectiveShift, perspectiveAngleX, perspectiveAngleY,
    mousePosition, deviceOrientation, perspectiveIntensity
  ]);
  
  // Render the primary grid
  const renderPrimaryGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style based on grid type and state
    ctx.strokeStyle = gridColors.primary;
    ctx.lineWidth = 1;
    ctx.globalAlpha = baseOpacity;
    
    // Get center point for distance calculations
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Calculate perspective shift
    const perspectiveShift = calculatePerspectiveShift();
    const skewX = (90 - perspectiveShift.x) * (Math.PI / 180);
    
    // Calculate grid size with alignment to base unit
    const effectiveGridSize = alignToGrid(gridSize, GRID.BASE_UNIT);
    
    // Render vertical grid lines
    for (let x = 0; x <= canvas.width; x += effectiveGridSize) {
      // Calculate distance-based opacity if enabled
      if (enableFalloff) {
        const distance = Math.abs(x - centerX);
        const maxDistance = centerX;
        const opacityFactor = 1 - (distance / maxDistance) * 0.5; // Reduce opacity by up to 50%
        ctx.globalAlpha = baseOpacity * opacityFactor;
      }
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Render horizontal grid lines
    for (let y = 0; y <= canvas.height; y += effectiveGridSize) {
      // Calculate distance-based opacity if enabled
      if (enableFalloff) {
        const distance = Math.abs(y - centerY);
        const maxDistance = centerY;
        const opacityFactor = 1 - (distance / maxDistance) * 0.5; // Reduce opacity by up to 50%
        ctx.globalAlpha = baseOpacity * opacityFactor;
      }
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [
    baseOpacity, enableFalloff, gridSize, gridColors.primary,
    calculatePerspectiveShift
  ]);
  
  // Render the secondary grid (depth enhancement)
  const renderSecondaryGrid = useCallback(() => {
    if (!enableSecondaryGrid) return;
    
    const canvas = canvasSecondaryRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style for secondary grid
    ctx.strokeStyle = gridColors.secondary;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = baseOpacity * secondaryOpacityMultiplier;
    
    // Get center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Calculate perspective shift
    const perspectiveShift = calculatePerspectiveShift();
    
    // Calculate skew factors
    const skewX = (90 - perspectiveShift.x) * (Math.PI / 180);
    const skewY = perspectiveShift.y * (Math.PI / 180);
    
    // Diagonal grid lines for depth enhancement
    // Using larger grid size for secondary grid
    const secondaryGridSize = gridSize * 2;
    
    // Draw diagonal lines from top-left to bottom-right
    for (let i = -canvas.height; i < canvas.width; i += secondaryGridSize) {
      // Calculate starting and ending points with perspective offset
      let startX = i;
      let startY = 0;
      let endX = i + canvas.height;
      let endY = canvas.height;
      
      // Adjust for perspective
      if (startX < 0) {
        startX = 0;
        startY = -i;
      }
      
      if (endX > canvas.width) {
        endX = canvas.width;
        endY = canvas.height - (endX - (i + canvas.height));
      }
      
      // Apply distance-based opacity if enabled
      if (enableFalloff) {
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const distance = Math.sqrt(
          Math.pow(midX - centerX, 2) + Math.pow(midY - centerY, 2)
        );
        const maxDistance = Math.sqrt(
          Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)
        ) / 2;
        const opacityFactor = 1 - (distance / maxDistance) * 0.7; // More dramatic falloff
        ctx.globalAlpha = baseOpacity * secondaryOpacityMultiplier * opacityFactor;
      }
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    
    // Draw diagonal lines from top-right to bottom-left
    for (let i = 0; i < canvas.width + canvas.height; i += secondaryGridSize) {
      // Calculate starting and ending points with perspective offset
      let startX = i;
      let startY = 0;
      let endX = i - canvas.height;
      let endY = canvas.height;
      
      // Adjust for perspective
      if (startX > canvas.width) {
        startX = canvas.width;
        startY = i - canvas.width;
      }
      
      if (endX < 0) {
        endX = 0;
        endY = canvas.height - (i - canvas.height);
      }
      
      // Apply distance-based opacity if enabled
      if (enableFalloff) {
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const distance = Math.sqrt(
          Math.pow(midX - centerX, 2) + Math.pow(midY - centerY, 2)
        );
        const maxDistance = Math.sqrt(
          Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)
        ) / 2;
        const opacityFactor = 1 - (distance / maxDistance) * 0.7;
        ctx.globalAlpha = baseOpacity * secondaryOpacityMultiplier * opacityFactor;
      }
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }, [
    enableSecondaryGrid, baseOpacity, secondaryOpacityMultiplier,
    gridSize, gridColors.secondary, enableFalloff, calculatePerspectiveShift
  ]);
  
  // Update animation frame for continuous rendering
  const updateAnimationFrame = useCallback(() => {
    // Render grids
    renderPrimaryGrid();
    renderSecondaryGrid();
    
    // Request next frame
    const frameId = requestAnimationFrame(updateAnimationFrame);
    setAnimationFrame(frameId);
  }, [renderPrimaryGrid, renderSecondaryGrid]);
  
  // Initialize canvases and event listeners
  useEffect(() => {
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation as any);
    
    // Initial size calculation
    handleResize();
    
    // Optimize for M4 Neural Engine by enabling hardware acceleration
    if (m4Optimized) {
      if (canvasRef.current) {
        canvasRef.current.style.willChange = 'transform';
        canvasRef.current.style.transform = 'translateZ(0)';
        canvasRef.current.style.backfaceVisibility = 'hidden';
      }
      
      if (canvasSecondaryRef.current) {
        canvasSecondaryRef.current.style.willChange = 'transform';
        canvasSecondaryRef.current.style.transform = 'translateZ(0)';
        canvasSecondaryRef.current.style.backfaceVisibility = 'hidden';
      }
    }
    
    // Start animation frame for continuous rendering if perspective shift is enabled
    if (enablePerspectiveShift) {
      const frameId = requestAnimationFrame(updateAnimationFrame);
      setAnimationFrame(frameId);
    } else {
      // Single render for static grid
      renderPrimaryGrid();
      renderSecondaryGrid();
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation as any);
      
      // Cancel animation frame if active
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    handleResize, handleMouseMove, handleDeviceOrientation,
    enablePerspectiveShift, m4Optimized, updateAnimationFrame,
    renderPrimaryGrid, renderSecondaryGrid, animationFrame
  ]);
  
  // Update canvas dimensions when container dimensions change
  useEffect(() => {
    const { width, height } = dimensions;
    
    // Set canvas dimensions
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
    
    if (canvasSecondaryRef.current) {
      canvasSecondaryRef.current.width = width;
      canvasSecondaryRef.current.height = height;
    }
    
    // Render grids with new dimensions
    renderPrimaryGrid();
    renderSecondaryGrid();
  }, [dimensions, renderPrimaryGrid, renderSecondaryGrid]);
  
  // Calculate perspective values for container style
  const perspective = useMemo(() => {
    const shift = calculatePerspectiveShift();
    
    return {
      transform: `perspective(1000px) rotateX(${shift.x}deg) rotateY(${shift.y}deg)`,
      transformOrigin: 'center bottom'
    };
  }, [calculatePerspectiveShift]);
  
  // Determine positioning style based on fixed prop
  const positionStyle = useMemo(() => ({
    position: fixed ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex,
    pointerEvents: 'none' // Allow interaction with elements beneath the grid
  }), [fixed, zIndex]);
  
  // Generate class name based on props
  const gridClassName = useMemo(() => (
    `dimensional-grid dimensional-grid-${type} dimensional-grid-${density} dimensional-grid-${state} ${className}`
  ), [type, density, state, className]);
  
  return (
    <div
      ref={containerRef}
      className={gridClassName}
      id={componentId}
      style={{
        width,
        height,
        ...positionStyle,
        overflow: 'hidden'
      }}
      data-grid-type={type}
      data-grid-density={density}
      data-grid-state={state}
      aria-hidden="true" // Hide from screen readers as this is decorative
    >
      {/* Primary Grid Layer */}
      <canvas
        ref={canvasRef}
        className="dimensional-grid-primary"
        style={{
          ...perspective,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Secondary Grid Layer (if enabled) */}
      {enableSecondaryGrid && (
        <canvas
          ref={canvasSecondaryRef}
          className="dimensional-grid-secondary"
          style={{
            ...perspective,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
};

export default DimensionalGrid;