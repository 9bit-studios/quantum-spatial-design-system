// Simplified Quantum-Spatial Design System Worker with PixelViewer component

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handle the request and route to appropriate handlers
 * @param {Request} request - The request object
 */
async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleCORS(request)
  }

  // Parse URL to determine which handler to use
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle different endpoints
  if (path === '/health') {
    return handleHealth();
  } else if (path === '/framer-components') {
    return handleFramerComponents();
  } else if (path === '/pixel-viewer') {
    return handlePixelViewer(url.searchParams);
  } else if (path === '/quantum-pixel') {
    return handleQuantumPixel(url.searchParams);
  }

  // Default response
  return new Response(
    JSON.stringify({ 
      message: 'Quantum-Spatial Design System Worker',
      endpoints: ['/health', '/framer-components', '/pixel-viewer', '/quantum-pixel']
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Handle CORS preflight requests
 * @param {Request} request - The request object
 */
function handleCORS(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Framer-Project-ID',
    'Access-Control-Max-Age': '86400'
  };
  
  return new Response(null, { headers, status: 204 });
}

/**
 * Handle health check endpoint
 */
function handleHealth() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: 'staging',
      version: '1.0.0',
      features: {
        designSystem: true,
        pixelViewer: true,
        framerSupport: true
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Handle Framer components registry
 */
function handleFramerComponents() {
  const framerComponents = [
    {
      name: "PixelViewer",
      displayName: "Pixel Viewer",
      description: "Interactive quantum-spatial pixel viewer",
      importPath: "design-system/PixelViewer",
      isFramerComponent: true,
      props: {
        initialState: {
          type: "enum",
          options: ["heritage", "transitional", "quantum", "superposition"],
          defaultValue: "transitional"
        },
        columns: {
          type: "number",
          defaultValue: 8
        },
        rows: {
          type: "number",
          defaultValue: 6
        },
        showControls: {
          type: "boolean",
          defaultValue: true
        }
      }
    },
    {
      name: "QuantumPixel",
      displayName: "Quantum Pixel",
      description: "Base quantum-spatial pixel component",
      importPath: "design-system/QuantumPixel",
      isFramerComponent: true,
      props: {
        state: {
          type: "enum",
          options: ["heritage", "transitional", "quantum", "superposition"],
          defaultValue: "transitional"
        },
        size: {
          type: "number",
          defaultValue: 64
        }
      }
    }
  ];

  return new Response(
    JSON.stringify(framerComponents),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Framer-Project-ID, Content-Type'
      }
    }
  );
}

/**
 * Handle PixelViewer component
 * @param {URLSearchParams} params - URL parameters
 */
function handlePixelViewer(params) {
  const state = params.get('state') || 'transitional';
  const format = params.get('format') || 'json';
  
  // Base component definition
  const component = {
    name: "PixelViewer",
    type: "component",
    props: {
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
      showControls: {
        type: "boolean",
        defaultValue: true,
        description: "Show control panel for state transitions"
      }
    },
    defaultSize: {
      width: 400,
      height: 350
    },
    defaultState: state,
    description: "Interactive viewer for the Quantum-Spatial pixel system"
  };
  
  // HTML preview for the component
  if (format === 'html') {
    const previewHtml = generatePreviewHtml(state);
    return new Response(
      previewHtml,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
  
  // React component code
  if (format === 'react') {
    const reactCode = generateReactCode(state);
    return new Response(
      reactCode,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
  
  // Default: return component definition
  return new Response(
    JSON.stringify(component),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Handle QuantumPixel component
 * @param {URLSearchParams} params - URL parameters
 */
function handleQuantumPixel(params) {
  const state = params.get('state') || 'transitional';
  
  // Quantum Pixel component definition
  const component = {
    name: "QuantumPixel",
    type: "component",
    props: {
      state: {
        type: "string",
        options: ["heritage", "transitional", "quantum", "superposition"],
        defaultValue: state,
        description: "Quantum state"
      },
      size: {
        type: "number",
        min: 16,
        max: 128,
        defaultValue: 64,
        description: "Size in pixels"
      }
    },
    defaultSize: {
      width: 64,
      height: 64
    },
    defaultState: state,
    description: "Base quantum-spatial pixel component"
  };
  
  return new Response(
    JSON.stringify(component),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Generate HTML preview for the PixelViewer component
 * @param {string} state - Quantum state
 * @returns {string} - HTML preview
 */
function generatePreviewHtml(state) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum-Spatial Pixel Viewer</title>
    <style>
        :root {
            --primary-color: #131A36;
            --accent-color: #5AC8FA;
            --background-color: #0A0621;
            --text-color: #FFFFFF;
        }
        
        body {
            font-family: 'SF Pro Text', -apple-system, system-ui, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            font-size: 2.5rem;
            color: var(--accent-color);
            margin-bottom: 1rem;
        }
        
        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .btn {
            background-color: rgba(19, 26, 54, 0.6);
            color: var(--text-color);
            border: 1px solid rgba(90, 200, 250, 0.4);
            border-radius: 6px;
            padding: 5px 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: rgba(19, 26, 54, 0.8);
            border-color: rgba(90, 200, 250, 0.8);
        }
        
        .btn.active {
            background-color: rgba(90, 200, 250, 0.2);
            border-color: rgba(90, 200, 250, 1);
        }
        
        .pixel-viewer {
            width: 100%;
            height: 300px;
            border: 1px solid rgba(90, 200, 250, 0.4);
            border-radius: 8px;
            margin-top: 1rem;
            background-color: rgba(19, 26, 54, 0.4);
        }
        
        .pixel-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(6, 1fr);
            gap: 4px;
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
        
        .mini-pixel {
            background-color: #331F4A;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .mini-pixel:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 0 8px rgba(90, 200, 250, 0.8);
        }
        
        .mini-pixel.heritage {
            background-color: #2C5F2D;
            box-shadow: 0 0 5px rgba(61, 255, 116, 0.6);
        }
        
        .mini-pixel.transitional {
            background-color: #331F4A;
            box-shadow: 0 0 5px rgba(90, 200, 250, 0.6);
        }
        
        .mini-pixel.quantum {
            background-color: #6A3093;
            box-shadow: 0 0 5px rgba(191, 64, 128, 0.6);
        }
        
        .mini-pixel.superposition {
            background-color: #6A3093;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Quantum-Spatial Pixel Viewer</h1>
        
        <div class="controls">
            <button class="btn ${state === 'heritage' ? 'active' : ''}" data-state="heritage">Heritage</button>
            <button class="btn ${state === 'transitional' ? 'active' : ''}" data-state="transitional">Transitional</button>
            <button class="btn ${state === 'quantum' ? 'active' : ''}" data-state="quantum">Quantum</button>
            <button class="btn ${state === 'superposition' ? 'active' : ''}" data-state="superposition">Superposition</button>
        </div>
        
        <div class="pixel-viewer">
            <div class="pixel-grid" id="pixel-grid"></div>
        </div>
    </div>

    <script>
        // Generate the pixel grid
        const pixelGrid = document.getElementById('pixel-grid');
        const rows = 6;
        const columns = 8;
        let currentState = '${state}';
        
        function generateGrid() {
            pixelGrid.innerHTML = '';
            
            for (let i = 0; i < rows * columns; i++) {
                const pixel = document.createElement('div');
                pixel.className = 'mini-pixel ' + currentState;
                pixelGrid.appendChild(pixel);
            }
        }
        
        // State buttons functionality
        const stateBtns = document.querySelectorAll('.btn');
        stateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                stateBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update current state
                currentState = btn.dataset.state;
                
                // Regenerate grid
                generateGrid();
            });
        });
        
        // Initialize grid
        generateGrid();
    </script>
</body>
</html>`;
}

/**
 * Generate React component code for the PixelViewer
 * @param {string} state - Quantum state
 * @returns {string} - React component code
 */
function generateReactCode(state) {
  return `import React, { useState, useEffect } from 'react';
import './PixelViewer.css';

interface PixelViewerProps {
  initialState?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  columns?: number;
  rows?: number;
  showControls?: boolean;
}

/**
 * Quantum-Spatial Pixel Viewer Component
 * Displays an interactive grid of quantum pixels
 */
const PixelViewer: React.FC<PixelViewerProps> = ({
  initialState = '${state}',
  columns = 8,
  rows = 6,
  showControls = true
}) => {
  // State management
  const [activeState, setActiveState] = useState(initialState);
  
  // Generate pixel grid
  const renderGrid = () => {
    const grid = [];
    
    for (let i = 0; i < rows * columns; i++) {
      grid.push(
        <div 
          key={\`pixel-\${i}\`}
          className={\`quantum-pixel \${activeState}-pixel\`}
          style={{
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            boxShadow: activeState === 'heritage' 
              ? '0 0 5px rgba(61, 255, 116, 0.6)'
              : activeState === 'transitional'
                ? '0 0 5px rgba(90, 200, 250, 0.6)'
                : activeState === 'quantum'
                  ? '0 0 5px rgba(191, 64, 128, 0.6)'
                  : '0 0 5px rgba(255, 255, 255, 0.6)',
            backgroundColor: activeState === 'heritage'
              ? '#2C5F2D'
              : activeState === 'transitional'
                ? '#331F4A'
                : activeState === 'quantum'
                  ? '#6A3093'
                  : '#6A3093'
          }}
        />
      );
    }
    
    return grid;
  };
  
  return (
    <div className="pixel-viewer-container">
      {showControls && (
        <div className="state-controls">
          <button 
            className={\`state-btn \${activeState === 'heritage' ? 'active' : ''}\`}
            onClick={() => setActiveState('heritage')}
          >
            Heritage
          </button>
          <button 
            className={\`state-btn \${activeState === 'transitional' ? 'active' : ''}\`}
            onClick={() => setActiveState('transitional')}
          >
            Transitional
          </button>
          <button 
            className={\`state-btn \${activeState === 'quantum' ? 'active' : ''}\`}
            onClick={() => setActiveState('quantum')}
          >
            Quantum
          </button>
          <button 
            className={\`state-btn \${activeState === 'superposition' ? 'active' : ''}\`}
            onClick={() => setActiveState('superposition')}
          >
            Superposition
          </button>
        </div>
      )}
      
      <div 
        className="pixel-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
          gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
          gap: '4px',
          width: '100%',
          height: '100%',
          padding: '10px',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(19, 26, 54, 0.4)',
          borderRadius: '8px',
          border: '1px solid rgba(90, 200, 250, 0.4)',
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );
};

export default PixelViewer;`;
}