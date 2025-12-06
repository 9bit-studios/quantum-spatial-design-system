/**
 * Quantum-Spatial Pixel Viewer Component
 * 
 * This component provides a viewer for the quantum-spatial pixel system,
 * allowing visualization of different pixel states and dimensions.
 */

// Utility function to generate a simplified viewer API
function generateViewerHTML(options = {}) {
  const {
    state = 'transitional',
    columns = 8,
    rows = 6,
    pixelSize = 'sm',
    interactive = true,
    showControls = true,
    responsive = true,
    m4Optimized = true
  } = options;

  // Map pixel sizes to actual dimensions
  const pixelSizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  // Map state to color schemes
  const stateColors = {
    heritage: {
      primary: '#2C5F2D',
      accent: '#3DFF74',
      secondary: '#1B3D1A'
    },
    transitional: {
      primary: '#331F4A',
      accent: '#5AC8FA',
      secondary: '#1E1F5C'
    },
    quantum: {
      primary: '#6A3093',
      accent: '#BF4080',
      secondary: '#FF2D55'
    },
    superposition: {
      primary: '#FFFFFF',
      accent: '#5AC8FA',
      secondary: '#FF2D55'
    }
  };

  // Get size value
  const actualSize = pixelSizeMap[pixelSize] || pixelSizeMap.sm;
  const colors = stateColors[state] || stateColors.transitional;

  // Create HTML template for the viewer
  const viewerHTML = `
    <div class="quantum-pixel-viewer ${state}-state" style="display: flex; flex-direction: column; align-items: center; background: #0A0621; color: white; border-radius: 12px; padding: 20px; width: 100%; height: 100%; overflow: hidden;">
      ${showControls ? `
        <div class="viewer-controls" style="display: flex; gap: 8px; margin-bottom: 16px;">
          <button class="state-button ${state === 'heritage' ? 'active' : ''}" data-state="heritage" style="background: ${state === 'heritage' ? 'rgba(61, 255, 116, 0.2)' : 'rgba(19, 26, 54, 0.4)'}; color: white; border: 1px solid rgba(61, 255, 116, 0.4); border-radius: 8px; padding: 8px 12px; cursor: pointer;">Heritage</button>
          <button class="state-button ${state === 'transitional' ? 'active' : ''}" data-state="transitional" style="background: ${state === 'transitional' ? 'rgba(90, 200, 250, 0.2)' : 'rgba(19, 26, 54, 0.4)'}; color: white; border: 1px solid rgba(90, 200, 250, 0.4); border-radius: 8px; padding: 8px 12px; cursor: pointer;">Transitional</button>
          <button class="state-button ${state === 'quantum' ? 'active' : ''}" data-state="quantum" style="background: ${state === 'quantum' ? 'rgba(191, 64, 128, 0.2)' : 'rgba(19, 26, 54, 0.4)'}; color: white; border: 1px solid rgba(191, 64, 128, 0.4); border-radius: 8px; padding: 8px 12px; cursor: pointer;">Quantum</button>
          <button class="state-button ${state === 'superposition' ? 'active' : ''}" data-state="superposition" style="background: ${state === 'superposition' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(19, 26, 54, 0.4)'}; color: white; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 8px; padding: 8px 12px; cursor: pointer;">Superposition</button>
        </div>
      ` : ''}

      <div class="pixel-grid" style="display: grid; grid-template-columns: repeat(${columns}, ${actualSize}px); grid-template-rows: repeat(${rows}, ${actualSize}px); gap: 4px; background: rgba(19, 26, 54, 0.4); padding: 16px; border-radius: 8px; border: 1px solid ${colors.accent}40;">
        ${generatePixelGrid(columns, rows, state, actualSize)}
      </div>

      <div class="pixel-info" style="margin-top: 16px; background: rgba(19, 26, 54, 0.6); border: 1px solid ${colors.accent}40; border-radius: 8px; padding: 16px; width: 100%; max-width: 400px;">
        <h3 style="margin-top: 0; color: ${colors.accent}; font-size: 18px; font-weight: 600;">
          ${state.charAt(0).toUpperCase() + state.slice(1)} State
        </h3>
        <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.5;">
          ${getStateDescription(state)}
        </p>
      </div>
    </div>
  `;

  return viewerHTML;
}

// Generate a grid of pixels
function generatePixelGrid(columns, rows, state, size) {
  let grid = '';
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid += generatePixel(state, size, i, j);
    }
  }
  
  return grid;
}

// Generate a single pixel
function generatePixel(state, size, row, col) {
  // Determine colors based on state
  const colors = {
    heritage: {
      primary: '#2C5F2D',
      accent: '#3DFF74',
      secondary: '#1B3D1A'
    },
    transitional: {
      primary: '#331F4A',
      accent: '#5AC8FA',
      secondary: '#1E1F5C'
    },
    quantum: {
      primary: '#6A3093',
      accent: '#BF4080',
      secondary: '#FF2D55'
    },
    superposition: {
      primary: '#6A3093',
      accent: '#5AC8FA',
      secondary: '#FF2D55'
    }
  }[state] || colors.transitional;

  // Generate pixel HTML with inline styles
  return `
    <div class="quantum-pixel ${state}-pixel" 
         data-row="${row}" 
         data-col="${col}" 
         style="
           width: ${size}px;
           height: ${size}px;
           background: ${colors.primary};
           border-radius: ${Math.max(4, size * 0.13)}px;
           position: relative;
           display: flex;
           align-items: center;
           justify-content: center;
           overflow: hidden;
           box-shadow: 0 0 ${state === 'quantum' ? 8 : state === 'superposition' ? 12 : 6}px ${colors.accent}${state === 'superposition' ? '80' : state === 'heritage' ? '60' : '40'};
           transition: all 0.3s ease;
           cursor: pointer;
         "
    >
      <div class="pixel-inner" 
           style="
             width: ${size * 0.6}px;
             height: ${size * 0.6}px;
             background: ${state === 'heritage' ? 'transparent' : 'radial-gradient(circle, ' + colors.accent + '40, ' + colors.primary + '90)'};
             border-radius: ${Math.max(2, size * 0.1)}px;
             opacity: ${state === 'quantum' ? 0.9 : state === 'superposition' ? 0.7 : 0.5};
             ${state === 'heritage' ? 'border: 1px solid ' + colors.accent + ';' : ''}
           "
      ></div>

      ${state === 'quantum' || state === 'superposition' ? `
        <div class="energy-particle" 
             style="
               position: absolute;
               width: ${size * 0.2}px;
               height: ${size * 0.2}px;
               background: ${colors.accent};
               border-radius: 50%;
               top: ${size * 0.25}px;
               left: ${size * 0.25}px;
               opacity: 0.8;
             "
        ></div>
      ` : ''}
    </div>
  `;
}

// Get description for each state
function getStateDescription(state) {
  const descriptions = {
    heritage: "The Heritage state represents the foundational 8-bit pixel aesthetic with structured layout and subtle energy highlights.",
    transitional: "The Transitional state shows the evolution from structured heritage to quantum fluidity with softened edges and animated energy particles.",
    quantum: "The Quantum state represents advanced energy materialization with organic forms, featuring a glowing energy core and orbiting particles.",
    superposition: "The Superposition state represents multiple states simultaneously, truly embracing quantum principles with overlapping forms and energy transfer."
  };
  
  return descriptions[state] || descriptions.transitional;
}

// Client-side functionality (for documentation only - actual implementation would be in React/JS)
const pixelViewerClientJS = `
  // Select all pixel viewer components
  const viewers = document.querySelectorAll('.quantum-pixel-viewer');
  
  viewers.forEach(viewer => {
    // Get UI elements
    const stateButtons = viewer.querySelectorAll('.state-button');
    const pixels = viewer.querySelectorAll('.quantum-pixel');
    
    // Add event listeners to state buttons
    stateButtons.forEach(button => {
      button.addEventListener('click', () => {
        const state = button.dataset.state;
        
        // Update active state
        stateButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update viewer state class
        viewer.className = viewer.className.replace(/\\w+-state/, state + '-state');
        
        // Update pixels
        pixels.forEach(pixel => {
          // Update pixel classes and styles based on new state
          pixel.className = pixel.className.replace(/\\w+-pixel/, state + '-pixel');
          // Additional style updates would be implemented here
        });
        
        // Update info section
        const infoTitle = viewer.querySelector('.pixel-info h3');
        const infoDesc = viewer.querySelector('.pixel-info p');
        
        if (infoTitle) {
          infoTitle.textContent = state.charAt(0).toUpperCase() + state.slice(1) + ' State';
        }
        
        if (infoDesc) {
          infoDesc.textContent = getStateDescription(state);
        }
      });
    });
    
    // Add interaction to pixels
    pixels.forEach(pixel => {
      pixel.addEventListener('mouseenter', () => {
        pixel.style.transform = 'scale(1.1)';
        pixel.style.zIndex = '10';
      });
      
      pixel.addEventListener('mouseleave', () => {
        pixel.style.transform = 'scale(1)';
        pixel.style.zIndex = '1';
      });
    });
  });
  
  function getStateDescription(state) {
    const descriptions = {
      heritage: "The Heritage state represents the foundational 8-bit pixel aesthetic with structured layout and subtle energy highlights.",
      transitional: "The Transitional state shows the evolution from structured heritage to quantum fluidity with softened edges and animated energy particles.",
      quantum: "The Quantum state represents advanced energy materialization with organic forms, featuring a glowing energy core and orbiting particles.",
      superposition: "The Superposition state represents multiple states simultaneously, truly embracing quantum principles with overlapping forms and energy transfer."
    };
    
    return descriptions[state] || descriptions.transitional;
  }
`;

/**
 * Generate a React component for the pixel viewer
 * @param {Object} options - Configuration options
 * @returns {string} - React component code
 */
function generateReactComponent(options = {}) {
  const {
    state = 'transitional',
    columns = 8,
    rows = 6,
    pixelSize = 'sm',
    interactive = true,
    showControls = true,
    responsive = true,
    m4Optimized = true
  } = options;

  // Generate React component code
  const reactComponent = `
import React, { useState, useEffect, useRef } from 'react';
import './PixelViewer.css';

// Define types
interface PixelViewerProps {
  initialState?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  columns?: number;
  rows?: number;
  pixelSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  showControls?: boolean;
  responsive?: boolean;
  m4Optimized?: boolean;
}

/**
 * Quantum-Spatial Pixel Viewer Component
 * Displays a grid of quantum pixels with different states
 */
const PixelViewer: React.FC<PixelViewerProps> = ({
  initialState = '${state}',
  columns = ${columns},
  rows = ${rows},
  pixelSize = '${pixelSize}',
  interactive = ${interactive},
  showControls = ${showControls},
  responsive = ${responsive},
  m4Optimized = ${m4Optimized}
}) => {
  // State management
  const [activeState, setActiveState] = useState<'heritage' | 'transitional' | 'quantum' | 'superposition'>(initialState);
  
  // Map pixel sizes to dimensions
  const pixelSizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };
  
  // Get actual pixel size
  const actualSize = pixelSizeMap[pixelSize] || pixelSizeMap.sm;
  
  // Default color configurations for each state
  const stateColors = {
    heritage: {
      primary: '#2C5F2D',
      accent: '#3DFF74',
      secondary: '#1B3D1A',
      glow: 4
    },
    transitional: {
      primary: '#331F4A',
      accent: '#5AC8FA',
      secondary: '#1E1F5C',
      glow: 6
    },
    quantum: {
      primary: '#6A3093',
      accent: '#BF4080',
      secondary: '#FF2D55',
      glow: 8
    },
    superposition: {
      primary: '#FFFFFF',
      accent: '#5AC8FA',
      secondary: '#FF2D55',
      glow: 10
    }
  };
  
  // Get colors for current state
  const colors = stateColors[activeState];
  
  // Get state description
  const getStateDescription = (state) => {
    const descriptions = {
      heritage: "The Heritage state represents the foundational 8-bit pixel aesthetic with structured layout and subtle energy highlights.",
      transitional: "The Transitional state shows the evolution from structured heritage to quantum fluidity with softened edges and animated energy particles.",
      quantum: "The Quantum state represents advanced energy materialization with organic forms, featuring a glowing energy core and orbiting particles.",
      superposition: "The Superposition state represents multiple states simultaneously, truly embracing quantum principles with overlapping forms and energy transfer."
    };
    
    return descriptions[state] || descriptions.transitional;
  };
  
  // Generate pixel grid
  const renderPixelGrid = () => {
    const grid = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        grid.push(renderPixel(i, j));
      }
    }
    
    return grid;
  };
  
  // Render a single pixel
  const renderPixel = (row, col) => {
    return (
      <div 
        key={\`pixel-\${row}-\${col}\`}
        className={\`quantum-pixel \${activeState}-pixel\`}
        data-row={row}
        data-col={col}
        style={{
          width: actualSize,
          height: actualSize,
          background: colors.primary,
          borderRadius: Math.max(4, actualSize * 0.13),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: \`0 0 \${colors.glow}px \${colors.accent}\${activeState === 'superposition' ? '80' : activeState === 'heritage' ? '60' : '40'}\`,
          transition: 'all 0.3s ease',
          cursor: interactive ? 'pointer' : 'default'
        }}
      >
        <div 
          className="pixel-inner"
          style={{
            width: actualSize * 0.6,
            height: actualSize * 0.6,
            background: activeState === 'heritage' 
              ? 'transparent' 
              : \`radial-gradient(circle, \${colors.accent}40, \${colors.primary}90)\`,
            borderRadius: Math.max(2, actualSize * 0.1),
            opacity: activeState === 'quantum' ? 0.9 : activeState === 'superposition' ? 0.7 : 0.5,
            border: activeState === 'heritage' ? \`1px solid \${colors.accent}\` : 'none'
          }}
        />
        
        {(activeState === 'quantum' || activeState === 'superposition') && (
          <div 
            className="energy-particle"
            style={{
              position: 'absolute',
              width: actualSize * 0.2,
              height: actualSize * 0.2,
              background: colors.accent,
              borderRadius: '50%',
              top: actualSize * 0.25,
              left: actualSize * 0.25,
              opacity: 0.8
            }}
          />
        )}
      </div>
    );
  };
  
  return (
    <div className={\`quantum-pixel-viewer \${activeState}-state\`}>
      {showControls && (
        <div className="viewer-controls">
          <button 
            className={\`state-button \${activeState === 'heritage' ? 'active' : ''}\`}
            onClick={() => setActiveState('heritage')}
          >
            Heritage
          </button>
          <button 
            className={\`state-button \${activeState === 'transitional' ? 'active' : ''}\`}
            onClick={() => setActiveState('transitional')}
          >
            Transitional
          </button>
          <button 
            className={\`state-button \${activeState === 'quantum' ? 'active' : ''}\`}
            onClick={() => setActiveState('quantum')}
          >
            Quantum
          </button>
          <button 
            className={\`state-button \${activeState === 'superposition' ? 'active' : ''}\`}
            onClick={() => setActiveState('superposition')}
          >
            Superposition
          </button>
        </div>
      )}
      
      <div className="pixel-grid" style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${columns}, \${actualSize}px)\`,
        gridTemplateRows: \`repeat(\${rows}, \${actualSize}px)\`,
        gap: '4px'
      }}>
        {renderPixelGrid()}
      </div>
      
      <div className={\`pixel-info pixel-info-\${activeState}\`}>
        <h3>{activeState.charAt(0).toUpperCase() + activeState.slice(1)} State</h3>
        <p>{getStateDescription(activeState)}</p>
      </div>
    </div>
  );
};

export default PixelViewer;
  `;

  return reactComponent;
}

/**
 * Get pixel viewer component definition
 * @param {string} state - Pixel state
 * @returns {object} - Component definition
 */
function getPixelViewerComponent(state = 'transitional') {
  // Base component properties
  const baseProps = {
    id: {
      type: "string",
      description: "Optional ID for the component"
    },
    initialState: {
      type: "string",
      options: ["heritage", "transitional", "quantum", "superposition"],
      defaultValue: state,
      description: "Initial quantum state"
    },
    columns: {
      type: "number",
      min: 1,
      max: 20,
      defaultValue: 8,
      description: "Number of columns in the grid"
    },
    rows: {
      type: "number",
      min: 1,
      max: 20,
      defaultValue: 6,
      description: "Number of rows in the grid"
    },
    pixelSize: {
      type: "string",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "sm",
      description: "Pixel size"
    },
    gap: {
      type: "number",
      min: 0,
      max: 20,
      defaultValue: 4,
      description: "Gap between pixels"
    },
    interactive: {
      type: "boolean",
      defaultValue: true,
      description: "Interactive mode lets users interact with pixels"
    },
    showControls: {
      type: "boolean",
      defaultValue: true,
      description: "Show control panel for state transitions"
    },
    responsive: {
      type: "boolean",
      defaultValue: true,
      description: "Enable responsive behavior"
    },
    m4Optimized: {
      type: "boolean",
      defaultValue: true,
      description: "Enable M4 optimization when available"
    }
  };

  // State-specific color configurations
  const stateColors = {
    heritage: {
      primary: '#2C5F2D',
      accent: '#3DFF74',
      secondary: '#1B3D1A',
      glow: 4
    },
    transitional: {
      primary: '#331F4A',
      accent: '#5AC8FA',
      secondary: '#1E1F5C',
      glow: 6
    },
    quantum: {
      primary: '#6A3093',
      accent: '#BF4080',
      secondary: '#FF2D55',
      glow: 8
    },
    superposition: {
      primary: '#FFFFFF',
      accent: '#5AC8FA',
      secondary: '#FF2D55',
      glow: 10
    }
  };

  // Generate sample React component code
  const reactImplementation = generateReactComponent({
    state,
    columns: 8,
    rows: 6,
    pixelSize: 'sm',
    interactive: true,
    showControls: true,
    responsive: true,
    m4Optimized: true
  });

  // Create component configuration for Framer
  return {
    name: "PixelViewer",
    type: "component",
    props: baseProps,
    defaultSize: {
      width: 400,
      height: 350
    },
    defaultState: state,
    stateColors: stateColors[state] || stateColors.transitional,
    description: "Interactive viewer for the Quantum-Spatial pixel system",
    m4Optimized: true,
    implementation: {
      type: "react",
      source: "inline",
      code: reactImplementation,
      dependencies: ["framer-motion"]
    },
    preview: generateViewerHTML({
      state,
      columns: 4,
      rows: 3,
      pixelSize: 'sm',
      interactive: true,
      showControls: true
    }),
    clientCode: pixelViewerClientJS
  };
}

// Export module functions
module.exports = {
  generateViewerHTML,
  pixelViewerClientJS,
  generateReactComponent,
  getPixelViewerComponent
};