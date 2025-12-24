// Fixed Quantum-Spatial Design System Worker
// Using M4-Optimized design tokens

// Import design tokens
const designTokens = require('../Documents//foundation/design-tokens.js');

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
 * Using M4-Optimized design tokens
 * @param {string} state - Quantum state
 * @returns {string} - HTML preview
 */
function generatePreviewHtml(state) {
  // Get colors for the current state from M4-optimized design tokens
  const colors = designTokens.color[state] || designTokens.color.transitional;
  const baseColors = designTokens.color.base;
  const accentColors = designTokens.color.accent;
  const pixelSizes = designTokens.pixelSystem.sizes;
  const typographyTokens = designTokens.typography;
  const animationTokens = designTokens.animation;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M4-Optimized Quantum-Spatial Pixel Viewer - ${state.charAt(0).toUpperCase() + state.slice(1)} State</title>
    <style>
        :root {
            /* Base color variables */
            --color-void-black: ${baseColors.voidBlack};
            --color-deep-space-indigo: ${baseColors.deepSpaceIndigo};
            --color-ultra-indigo: ${baseColors.ultraIndigo};
            --color-dimensional-eggplant: ${baseColors.dimensionalEggplant};
            --color-midnight-richness: ${baseColors.midnightRichness};
            --color-quantum-violet: ${baseColors.quantumViolet};
            
            /* Accent color variables */
            --color-subtle-aqua: ${accentColors.subtleAqua};
            --color-subtle-cyan: ${accentColors.subtleCyan};
            --color-dimensional-teal: ${accentColors.dimensionalTeal};
            --color-rose-energy: ${accentColors.roseEnergy};
            --color-quantum-pulse-pink: ${accentColors.quantumPulsePink};
            
            /* State-specific colors */
            --state-primary: ${colors.primary};
            --state-secondary: ${colors.secondary};
            --state-accent: ${colors.accent};
            --state-glow: ${colors.glow}px;
        }
        
        body {
            font-family: ${typographyTokens.fontFamily.base};
            background-color: ${colors.background};
            color: ${colors.text};
            margin: 0;
            padding: 20px;
            line-height: ${typographyTokens.lineHeight.normal};
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            font-size: ${typographyTokens.fontSize.xxl};
            color: ${colors.accent};
            margin-bottom: 1rem;
        }
        
        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .btn {
            background-color: rgba(19, 26, 54, 0.6);
            color: ${colors.text};
            border: 1px solid ${colors.accent}40;
            border-radius: 6px;
            padding: 5px 10px;
            cursor: pointer;
            transition: all ${animationTokens.duration.normal} ${animationTokens.easing.easeInOut};
        }
        
        .btn:hover {
            background-color: rgba(19, 26, 54, 0.8);
            border-color: ${colors.accent}80;
        }
        
        .btn.active {
            background-color: ${colors.accent}20;
            border-color: ${colors.accent};
        }
        
        .pixel-viewer {
            width: 100%;
            height: 300px;
            border: 1px solid ${colors.accent}40;
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
            position: relative;
            background-color: ${colors.primary};
            border-radius: ${designTokens.pixelSystem.borderRadius[state]}px;
            transition: all ${animationTokens.duration.normal} ${animationTokens.easing.easeInOut};
            box-shadow: 0 0 var(--state-glow) ${colors.accent}40;
            overflow: hidden;
        }
        
        .mini-pixel:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 0 calc(var(--state-glow) * 2) ${colors.accent}80;
        }
        
        .mini-pixel::after {
            content: '';
            position: absolute;
            top: 20%;
            left: 20%;
            width: 60%;
            height: 60%;
            background: ${state === 'heritage' ? 'transparent' : 
                        state === 'transitional' ? `radial-gradient(circle, ${colors.accent}40, ${colors.primary}90)` :
                        state === 'quantum' ? `radial-gradient(circle, ${colors.accent}60, ${colors.primary}70)` :
                        `radial-gradient(circle, ${colors.accent}40, ${colors.secondary}60, ${colors.primary}90)`};
            border-radius: ${designTokens.pixelSystem.borderRadius[state] - 1}px;
            ${state === 'heritage' ? `border: 1px solid ${colors.accent};` : ''}
            ${state === 'superposition' ? `animation: pulse 3s infinite ${animationTokens.easing.easeInOut};` : ''}
        }
        
        ${state === 'quantum' || state === 'superposition' ? `
        .mini-pixel::before {
            content: '';
            position: absolute;
            top: 30%;
            left: 30%;
            width: 20%;
            height: 20%;
            background-color: ${colors.accent};
            border-radius: 50%;
            opacity: 0.8;
            ${state === 'superposition' ? `animation: orbit 5s infinite linear;` : ''}
        }` : ''}
        
        @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.9); }
            50% { opacity: 0.8; transform: scale(1.1); }
            100% { opacity: 0.5; transform: scale(0.9); }
        }
        
        @keyframes orbit {
            0% { transform: translate(0, 0); }
            25% { transform: translate(100%, 0); }
            50% { transform: translate(100%, 100%); }
            75% { transform: translate(0, 100%); }
            100% { transform: translate(0, 0); }
        }
        
        .state-info {
            margin-top: 20px;
            background-color: rgba(19, 26, 54, 0.6);
            border: 1px solid ${colors.accent}40;
            border-radius: 8px;
            padding: 15px;
        }
        
        .state-info h3 {
            color: ${colors.accent};
            margin-top: 0;
        }
        
        .state-info p {
            margin-bottom: 0;
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
        
        <div class="state-info">
            <h3>${state.charAt(0).toUpperCase() + state.slice(1)} State</h3>
            <p>${getStateDescription(state)}</p>
        </div>
    </div>

    <script>
        // Generate the pixel grid
        const pixelGrid = document.getElementById('pixel-grid');
        const rows = 6;
        const columns = 8;
        let currentState = '${state}';
        
        // State properties
        const stateProperties = {
            heritage: {
                primary: '${designTokens.color.heritage.primary}',
                accent: '${designTokens.color.heritage.accent}',
                secondary: '${designTokens.color.heritage.secondary}',
                glow: ${designTokens.color.heritage.glow},
                borderRadius: ${designTokens.pixelSystem.borderRadius.heritage}
            },
            transitional: {
                primary: '${designTokens.color.transitional.primary}',
                accent: '${designTokens.color.transitional.accent}',
                secondary: '${designTokens.color.transitional.secondary}',
                glow: ${designTokens.color.transitional.glow},
                borderRadius: ${designTokens.pixelSystem.borderRadius.transitional}
            },
            quantum: {
                primary: '${designTokens.color.quantum.primary}',
                accent: '${designTokens.color.quantum.accent}',
                secondary: '${designTokens.color.quantum.secondary}',
                glow: ${designTokens.color.quantum.glow},
                borderRadius: ${designTokens.pixelSystem.borderRadius.quantum}
            },
            superposition: {
                primary: '${designTokens.color.superposition.primary}',
                accent: '${designTokens.color.superposition.accent}',
                secondary: '${designTokens.color.superposition.secondary}',
                glow: ${designTokens.color.superposition.glow},
                borderRadius: ${designTokens.pixelSystem.borderRadius.superposition}
            }
        };
        
        function generateGrid() {
            pixelGrid.innerHTML = '';
            
            for (let i = 0; i < rows * columns; i++) {
                const pixel = document.createElement('div');
                pixel.className = 'mini-pixel ' + currentState;
                
                // Apply state-specific styling
                const state = stateProperties[currentState];
                pixel.style.backgroundColor = state.primary;
                pixel.style.borderRadius = state.borderRadius + 'px';
                pixel.style.boxShadow = \`0 0 \${state.glow}px \${state.accent}40\`;
                
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
                
                // Update state info
                const stateInfo = document.querySelector('.state-info');
                stateInfo.querySelector('h3').textContent = currentState.charAt(0).toUpperCase() + currentState.slice(1) + ' State';
                stateInfo.querySelector('p').textContent = getStateDescription(currentState);
                
                // Change CSS variables for dynamic styling updates
                document.documentElement.style.setProperty('--state-primary', stateProperties[currentState].primary);
                document.documentElement.style.setProperty('--state-secondary', stateProperties[currentState].secondary);
                document.documentElement.style.setProperty('--state-accent', stateProperties[currentState].accent);
                document.documentElement.style.setProperty('--state-glow', stateProperties[currentState].glow + 'px');
                
                // Regenerate grid
                generateGrid();
            });
        });
        
        // Initialize grid
        generateGrid();
        
        // Get state description
        function getStateDescription(state) {
            const descriptions = {
                heritage: "The Heritage state represents the foundational 8-bit pixel aesthetic with structured layout and subtle energy highlights.",
                transitional: "The Transitional state shows the evolution from structured heritage to quantum fluidity with softened edges and animated energy particles.",
                quantum: "The Quantum state represents advanced energy materialization with organic forms, featuring a glowing energy core and orbiting particles.",
                superposition: "The Superposition state represents multiple states simultaneously, truly embracing quantum principles with overlapping forms and energy transfer."
            };
            
            return descriptions[state] || descriptions.transitional;
        }
    </script>
</body>
</html>`;
}