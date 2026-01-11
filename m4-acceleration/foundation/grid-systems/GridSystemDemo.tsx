/**
 * Quantum-Spatial Design System
 * Grid System Demonstration
 * 
 * This component showcases the DimensionalGrid with various
 * configurations and demonstrates integration with QuantumPixel.
 */
import React, { useState, useEffect, useRef } from 'react';
import DimensionalGrid, { GridType, GridDensity, GridState } from '../../components/core/DimensionalGrid';
import QuantumPixel, { QuantumState } from '../../components/core/QuantumPixel';

interface GridDemoProps {
  /** Width of the demo container */
  width?: number | string;
  /** Height of the demo container */
  height?: number | string;
  /** Initial grid type */
  initialGridType?: GridType;
  /** Initial grid density */
  initialGridDensity?: GridDensity;
  /** Initial grid state */
  initialGridState?: GridState;
}

/**
 * GridSystemDemo Component
 * 
 * Showcases the DimensionalGrid with various configurations and
 * demonstrates integration with QuantumPixel components.
 * Allows toggling between different grid types, densities, states,
 * and features like perspective shift and opacity falloff.
 */
const GridSystemDemo: React.FC<GridDemoProps> = ({
  width = '100%',
  height = '600px',
  initialGridType = 'background',
  initialGridDensity = 'medium',
  initialGridState = 'transitional'
}) => {
  // State for interactive controls
  const [gridType, setGridType] = useState<GridType>(initialGridType);
  const [gridDensity, setGridDensity] = useState<GridDensity>(initialGridDensity);
  const [gridState, setGridState] = useState<GridState>(initialGridState);
  
  // Advanced features controls
  const [perspectiveShift, setPerspectiveShift] = useState(true);
  const [secondaryGrid, setSecondaryGrid] = useState(true);
  const [distanceFalloff, setDistanceFalloff] = useState(true);
  const [perspectiveIntensity, setPerspectiveIntensity] = useState(0.05);
  const [aspectRatio, setAspectRatio] = useState('landscape');
  
  // Quantum pixel integration
  const [pixelQuantumState, setPixelQuantumState] = useState<QuantumState>('transitional');
  const [pixelSize, setPixelSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [pixelCount, setPixelCount] = useState(6);
  const [pixelGlowIntensity, setPixelGlowIntensity] = useState(4);
  
  // Container dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Sync grid state with pixel state for cohesive design language
  useEffect(() => {
    // Map grid state to corresponding quantum state
    if (gridState === 'heritage') {
      setPixelQuantumState('heritage');
    } else if (gridState === 'transitional') {
      setPixelQuantumState('transitional');
    } else if (gridState === 'quantum') {
      setPixelQuantumState('quantum');
    }
  }, [gridState]);
  
  // Generate pixel array based on count
  const generatePixels = () => {
    const pixels = [];
    
    // Determine arrangement based on pixel count
    const arrangement = pixelCount <= 4 ? 'horizontal' : 'grid';
    const rowSize = Math.ceil(Math.sqrt(pixelCount));
    
    for (let i = 0; i < pixelCount; i++) {
      // For grid arrangement, calculate position
      const row = Math.floor(i / rowSize);
      const col = i % rowSize;
      
      // Add variant to pixels for more interesting display
      let pixelVariant: QuantumState = pixelQuantumState;
      if (i % 4 === 0) pixelVariant = 'heritage';
      if (i % 4 === 1) pixelVariant = 'transitional';
      if (i % 4 === 2) pixelVariant = 'quantum';
      if (i % 4 === 3) pixelVariant = 'superposition';
      
      pixels.push(
        <div 
          key={`pixel-${i}`} 
          className="pixel-container"
          style={{
            margin: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ...(arrangement === 'grid' ? {
              gridRow: row + 1,
              gridColumn: col + 1
            } : {})
          }}
        >
          <QuantumPixel
            state={pixelVariant}
            size={pixelSize}
            glowIntensity={pixelGlowIntensity}
            interactive={true}
            onStateChange={(newState) => {
              // When a pixel changes state, update all pixels if it's the same pixel type
              if (pixelVariant === pixelQuantumState) {
                setPixelQuantumState(newState);
              }
            }}
          />
          <p style={{ 
            marginTop: '8px', 
            textAlign: 'center',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            {pixelVariant}
          </p>
        </div>
      );
    }
    
    return (
      <div 
        style={{ 
          display: arrangement === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: arrangement === 'grid' ? `repeat(${rowSize}, 1fr)` : 'auto',
          gridTemplateRows: arrangement === 'grid' ? `repeat(${Math.ceil(pixelCount / rowSize)}, auto)` : 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        {pixels}
      </div>
    );
  };
  
  // Button style helper for consistent styling
  const getButtonStyle = (isActive: boolean, colorClass: string) => {
    let borderColor = 'rgba(90, 200, 250, 0.3)';
    let activeBackground = 'rgba(90, 200, 250, 0.2)';
    
    if (colorClass === 'heritage') {
      borderColor = 'rgba(61, 255, 116, 0.3)';
      activeBackground = 'rgba(61, 255, 116, 0.2)';
    } else if (colorClass === 'quantum') {
      borderColor = 'rgba(191, 64, 128, 0.3)';
      activeBackground = 'rgba(191, 64, 128, 0.2)';
    }
    
    return {
      padding: '8px 16px',
      borderRadius: '8px',
      border: `1px solid ${borderColor}`,
      background: isActive ? activeBackground : 'rgba(19, 26, 54, 0.4)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    };
  };
  
  return (
    <div 
      ref={containerRef}
      className="grid-system-demo"
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0621, #131A36, #1E1F5C)',
        borderRadius: '12px',
        padding: '32px',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
      }}
    >
      {/* Main heading */}
      <h1 
        style={{ 
          fontSize: '28px', 
          marginBottom: '16px',
          fontWeight: 600,
          background: 'linear-gradient(to right, #3DFF74, #5AC8FA, #BF4080)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Quantum-Spatial Grid System
      </h1>
      
      <p style={{ marginBottom: '32px', maxWidth: '640px' }}>
        A dimensional grid system with perspective, state-specific styling, and M4 optimization.
        The grid provides spatial organization while maintaining quantum aesthetic principles.
      </p>
      
      {/* Primary grid controls */}
      <div 
        style={{ 
          marginBottom: '32px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '24px'
        }}
      >
        {/* Grid Type Selection */}
        <div className="control-group">
          <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Grid Type</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`control-button ${gridType === 'background' ? 'active' : ''}`}
              onClick={() => setGridType('background')}
              style={getButtonStyle(gridType === 'background', 'transitional')}
            >
              Background
            </button>
            <button 
              className={`control-button ${gridType === 'interface' ? 'active' : ''}`}
              onClick={() => setGridType('interface')}
              style={getButtonStyle(gridType === 'interface', 'transitional')}
            >
              Interface
            </button>
            <button 
              className={`control-button ${gridType === 'feature' ? 'active' : ''}`}
              onClick={() => setGridType('feature')}
              style={getButtonStyle(gridType === 'feature', 'transitional')}
            >
              Feature
            </button>
          </div>
        </div>
        
        {/* Grid Density Selection */}
        <div className="control-group">
          <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Grid Density</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`control-button ${gridDensity === 'fine' ? 'active' : ''}`}
              onClick={() => setGridDensity('fine')}
              style={getButtonStyle(gridDensity === 'fine', 'transitional')}
            >
              Fine (8px)
            </button>
            <button 
              className={`control-button ${gridDensity === 'medium' ? 'active' : ''}`}
              onClick={() => setGridDensity('medium')}
              style={getButtonStyle(gridDensity === 'medium', 'transitional')}
            >
              Medium (16px)
            </button>
            <button 
              className={`control-button ${gridDensity === 'coarse' ? 'active' : ''}`}
              onClick={() => setGridDensity('coarse')}
              style={getButtonStyle(gridDensity === 'coarse', 'transitional')}
            >
              Coarse (32px)
            </button>
          </div>
        </div>
        
        {/* Grid State Selection */}
        <div className="control-group">
          <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Grid State</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`control-button ${gridState === 'heritage' ? 'active' : ''}`}
              onClick={() => setGridState('heritage')}
              style={getButtonStyle(gridState === 'heritage', 'heritage')}
            >
              Heritage
            </button>
            <button 
              className={`control-button ${gridState === 'transitional' ? 'active' : ''}`}
              onClick={() => setGridState('transitional')}
              style={getButtonStyle(gridState === 'transitional', 'transitional')}
            >
              Transitional
            </button>
            <button 
              className={`control-button ${gridState === 'quantum' ? 'active' : ''}`}
              onClick={() => setGridState('quantum')}
              style={getButtonStyle(gridState === 'quantum', 'quantum')}
            >
              Quantum
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced controls */}
      <div 
        style={{ 
          marginBottom: '32px',
          background: 'rgba(19, 26, 54, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid rgba(90, 200, 250, 0.2)'
        }}
      >
        <h3 style={{ 
          fontSize: '18px', 
          marginTop: '0',
          marginBottom: '16px',
          fontWeight: 500,
          opacity: 0.9
        }}>
          Advanced Grid Features
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {/* Feature toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={perspectiveShift}
                onChange={() => setPerspectiveShift(!perspectiveShift)}
              />
              Perspective Shift
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={secondaryGrid}
                onChange={() => setSecondaryGrid(!secondaryGrid)}
              />
              Secondary Grid
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={distanceFalloff}
                onChange={() => setDistanceFalloff(!distanceFalloff)}
              />
              Distance Falloff
            </label>
          </div>
          
          {/* Sliders for values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                Perspective Intensity: {perspectiveIntensity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.10"
                step="0.01"
                value={perspectiveIntensity}
                onChange={(e) => setPerspectiveIntensity(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                Pixel Count: {pixelCount}
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={pixelCount}
                onChange={(e) => setPixelCount(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                Glow Intensity: {pixelGlowIntensity}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={pixelGlowIntensity}
                onChange={(e) => setPixelGlowIntensity(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          
          {/* Pixel size selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Pixel Size</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPixelSize('sm')}
                style={getButtonStyle(pixelSize === 'sm', 'transitional')}
              >
                Small
              </button>
              <button
                onClick={() => setPixelSize('md')}
                style={getButtonStyle(pixelSize === 'md', 'transitional')}
              >
                Medium
              </button>
              <button
                onClick={() => setPixelSize('lg')}
                style={getButtonStyle(pixelSize === 'lg', 'transitional')}
              >
                Large
              </button>
            </div>
          </div>
          
          {/* Aspect ratio selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Grid Aspect Ratio</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setAspectRatio('landscape')}
                style={getButtonStyle(aspectRatio === 'landscape', 'transitional')}
              >
                Landscape
              </button>
              <button
                onClick={() => setAspectRatio('square')}
                style={getButtonStyle(aspectRatio === 'square', 'transitional')}
              >
                Square
              </button>
              <button
                onClick={() => setAspectRatio('portrait')}
                style={getButtonStyle(aspectRatio === 'portrait', 'transitional')}
              >
                Portrait
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* The main display area with grid and pixels */}
      <div 
        style={{ 
          position: 'relative',
          height: aspectRatio === 'portrait' ? '600px' : aspectRatio === 'square' ? '400px' : '300px',
          overflow: 'hidden',
          borderRadius: '8px',
          border: `1px solid rgba(${
            gridState === 'heritage' ? '61, 255, 116' : 
            gridState === 'transitional' ? '90, 200, 250' : 
            '191, 64, 128'
          }, 0.3)`
        }}
      >
        {/* The dimensional grid */}
        <DimensionalGrid
          type={gridType}
          density={gridDensity}
          state={gridState}
          enablePerspectiveShift={perspectiveShift}
          enableSecondaryGrid={secondaryGrid}
          enableFalloff={distanceFalloff}
          fixed={false}
          perspectiveIntensity={perspectiveIntensity}
          perspectiveAngleX={60}
          zIndex={1}
        />
        
        {/* Quantum Pixel Showcase */}
        <div 
          style={{ 
            position: 'relative', 
            zIndex: 2,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          {/* Show pixels based on current configuration */}
          {generatePixels()}
        </div>
      </div>
      
      {/* Information Panel */}
      <div 
        style={{ 
          marginTop: '32px',
          background: 'rgba(19, 26, 54, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid rgba(${
            gridState === 'heritage' ? '61, 255, 116' : 
            gridState === 'transitional' ? '90, 200, 250' : 
            '191, 64, 128'
          }, 0.3)`
        }}
      >
        <h3 style={{ 
          margin: '0 0 16px 0',
          fontWeight: 500,
          color: gridState === 'heritage' ? '#3DFF74' : 
                 gridState === 'transitional' ? '#5AC8FA' : 
                 '#BF4080'
        }}>
          About Quantum-Spatial Grid System
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ marginTop: 0 }}>Key Features</h4>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Multiple grid densities (8px, 16px, 32px)</li>
              <li>Three quantum states (heritage, transitional, quantum)</li>
              <li>Perspective shift based on user interaction</li>
              <li>Secondary grid for enhanced spatial depth</li>
              <li>Distance-based opacity falloff</li>
              <li>M4-optimized rendering with Metal acceleration</li>
              <li>Seamless integration with QuantumPixel components</li>
            </ul>
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ marginTop: 0 }}>Usage Guidelines</h4>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Use <strong>background</strong> type for subtle environmental grids</li>
              <li>Use <strong>interface</strong> type for UI component alignment</li>
              <li>Use <strong>feature</strong> type for highlighted sections</li>
              <li>Match grid state with QuantumPixel state for visual coherence</li>
              <li>Enable perspective shift for interactive experiences</li>
              <li>Use finer grid density for detail-oriented layouts</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '14px', opacity: 0.7 }}>
          <p>Move your mouse over the display area to see the perspective shift effect in action.</p>
          <p>Click on individual pixels to cycle through quantum states and see how they interact with the grid.</p>
        </div>
      </div>
      
      {/* Technical footer */}
      <div 
        style={{ 
          position: 'absolute',
          bottom: '20px',
          left: '32px',
          fontSize: '14px',
          opacity: 0.6
        }}
      >
        <p>M4 Neural Engine optimization: active</p>
        <p>Component size: {containerDimensions.width}x{containerDimensions.height}px</p>
      </div>
    </div>
  );
};

export default GridSystemDemo;