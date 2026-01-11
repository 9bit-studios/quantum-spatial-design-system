/**
 * Quantum-Spatial Design System
 * PixelViewer Component - M4-Optimized
 * 
 * This component provides an interactive view of the Quantum Pixel system,
 * allowing users to explore pixel behaviors across different quantum states.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QuantumPixel, QuantumState } from './QuantumPixel';

// Types for the PixelViewer component
export interface PixelViewerProps {
  /** Initial quantum state */
  initialState?: QuantumState;
  /** Number of columns in the grid */
  columns?: number;
  /** Number of rows in the grid */
  rows?: number;
  /** Pixel size */
  pixelSize?: 'xs' | 'sm' | 'md' | 'lg';
  /** Gap between pixels */
  gap?: number;
  /** Interactive mode lets users interact with pixels */
  interactive?: boolean;
  /** Show control panel for state transitions */
  showControls?: boolean;
  /** Optional class name for styling */
  className?: string;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Enable M4 optimization when available */
  m4Optimized?: boolean;
  /** State transition duration in milliseconds */
  transitionDuration?: number;
  /** Optional ID for the component */
  id?: string;
}

/**
 * PixelViewer Component
 * 
 * An interactive grid of quantum pixels that can be used to visualize
 * the quantum-spatial design system across different states.
 */
export const PixelViewer: React.FC<PixelViewerProps> = ({
  initialState = 'transitional',
  columns = 8,
  rows = 6,
  pixelSize = 'sm',
  gap = 4,
  interactive = true,
  showControls = true,
  className = '',
  responsive = true,
  m4Optimized = true,
  transitionDuration = 300,
  id,
}) => {
  // State for current quantum state
  const [state, setState] = useState<QuantumState>(initialState);
  // State for tracking which pixels are active
  const [activePixels, setActivePixels] = useState<{[key: string]: boolean}>({});
  // Reference to container for measuring
  const containerRef = useRef<HTMLDivElement>(null);
  // State for tracking container dimensions for responsive sizing
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  // Is device M4 compatible (Apple Silicon)
  const [isM4Compatible, setIsM4Compatible] = useState(false);
  
  // Size map for pixels
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64
  };
  
  // Actual pixel size to use
  const pixelDimension = sizeMap[pixelSize];
  
  // Detect M4 capability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const isMac = userAgent.includes('Mac');
      const isSiliconMac = userAgent.includes('Apple Silicon') || 
                         (isMac && !userAgent.includes('Intel'));
      
      setIsM4Compatible(isSiliconMac);
    }
  }, []);
  
  // Handle responsive sizing
  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [responsive]);
  
  // Calculate responsive columns and rows if needed
  const getResponsiveGrid = () => {
    if (!responsive || containerDimensions.width === 0) {
      return { cols: columns, rows };
    }
    
    // Available space
    const availableWidth = containerDimensions.width;
    const availableHeight = containerDimensions.height;
    
    // Calculate how many columns and rows will fit
    const maxCols = Math.floor(availableWidth / (pixelDimension + gap));
    const maxRows = Math.floor(availableHeight / (pixelDimension + gap));
    
    // Use the smaller of the specified or calculated values
    return {
      cols: Math.min(columns, maxCols),
      rows: Math.min(rows, maxRows)
    };
  };
  
  // Get responsive grid dimensions
  const { cols, rows: responsiveRows } = getResponsiveGrid();
  
  // Change state for all pixels
  const changeGlobalState = (newState: QuantumState) => {
    setState(newState);
  };
  
  // Toggle active state for a pixel
  const togglePixel = (row: number, col: number) => {
    if (!interactive) return;
    
    const key = `${row}-${col}`;
    setActivePixels(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // State color mapping
  const stateColors = {
    heritage: '#3DFF74',
    transitional: '#5AC8FA',
    quantum: '#BF4080',
    superposition: '#6A3093'
  };
  
  // Generate grid of pixels
  const renderPixelGrid = () => {
    const grid = [];
    
    for (let row = 0; row < responsiveRows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = `${row}-${col}`;
        const isActive = activePixels[key] || false;
        const pixelState = isActive ? 'quantum' : state;
        
        grid.push(
          <div
            key={key}
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
              transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            }}
            onClick={() => togglePixel(row, col)}
          >
            <QuantumPixel
              state={pixelState}
              size={pixelSize}
              interactive={false}
              animationDuration={4 + (row + col) % 3} // Slightly different animation timing for visual interest
              glowIntensity={isActive ? 6 : 4}
              m4Optimized={m4Optimized && isM4Compatible}
            />
          </div>
        );
      }
    }
    
    return grid;
  };
  
  // Component ID generation
  const componentId = id || `pixel-viewer-${Math.random().toString(36).substring(2, 11)}`;
  
  return (
    <div
      ref={containerRef}
      className={`quantum-spatial-pixel-viewer ${className}`}
      data-state={state}
      data-m4-optimized={m4Optimized && isM4Compatible}
      id={componentId}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#131A36',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background grid effect */}
      <div 
        className="dimensional-background-grid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 
            `linear-gradient(to right, ${stateColors[state]}10 1px, transparent 1px),
             linear-gradient(to bottom, ${stateColors[state]}10 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.2,
          zIndex: 0
        }}
      />
      
      {/* Title */}
      <div 
        className="title" 
        style={{ 
          color: stateColors[state], 
          fontSize: '16px', 
          fontWeight: 500,
          marginBottom: '16px',
          zIndex: 1
        }}
      >
        Quantum-Spatial Pixel System ({state})
      </div>
      
      {/* Pixel grid */}
      <div 
        className="pixel-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${pixelDimension}px)`,
          gridTemplateRows: `repeat(${responsiveRows}, ${pixelDimension}px)`,
          gap: `${gap}px`,
          padding: '16px',
          backgroundColor: '#0A0D1510',
          borderRadius: '8px',
          zIndex: 1,
          boxShadow: `0 0 20px ${stateColors[state]}20`
        }}
      >
        {renderPixelGrid()}
      </div>
      
      {/* Controls */}
      {showControls && (
        <div 
          className="controls"
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '16px',
            zIndex: 1
          }}
        >
          {(['heritage', 'transitional', 'quantum', 'superposition'] as QuantumState[]).map(quantumState => (
            <motion.button
              key={quantumState}
              className={`state-button ${state === quantumState ? 'active' : ''}`}
              onClick={() => changeGlobalState(quantumState)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: state === quantumState ? stateColors[quantumState] : '#131A36',
                color: state === quantumState ? '#131A36' : stateColors[quantumState],
                border: `1px solid ${stateColors[quantumState]}`,
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
              }}
            >
              {quantumState.charAt(0).toUpperCase() + quantumState.slice(1)}
            </motion.button>
          ))}
        </div>
      )}
      
      {/* M4 optimization indicator */}
      {m4Optimized && isM4Compatible && (
        <div 
          className="m4-badge"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: '#00000040',
            color: '#FFFFFF',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: '#34C759' 
          }} />
          M4 Optimized
        </div>
      )}
    </div>
  );
};

export default PixelViewer;