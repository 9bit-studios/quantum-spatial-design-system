/**
 * Pixel Viewer Preview Test Tool
 * 
 * Tests the Pixel Viewer functionality with all design states
 * in the Quantum-Spatial Design System Cloudflare Worker
 */

require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Default test environment
const environment = process.env.NODE_ENV || 'development';

// Test URLs
const URLS = {
  development: 'http://localhost:8787',
  staging: 'https://design-system-staging.9bitstudios.io',
  production: 'https://design-system.9bitstudios.io'
};

// Design states to test
const STATES = ['heritage', 'transitional', 'quantum', 'superposition'];

// Set the base URL
const baseUrl = URLS[environment];

// Create output directory if it doesn't exist
function ensureOutputDirectory() {
  if (!fs.existsSync('pixel-viewer-previews')) {
    fs.mkdirSync('pixel-viewer-previews');
  }
  console.log('Output directory ready');
}

// Save test output to file
function savePixelViewerHtml(state, html) {
  try {
    const filePath = path.join('pixel-viewer-previews', `${state}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Saved ${state} pixel viewer preview to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`Error saving HTML file: ${error.message}`);
    throw error;
  }
}

// Generate HTML preview for the PixelViewer component (local fallback)
function generatePreviewHtml(state) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum-Spatial Pixel Viewer - ${state}</title>
    <style>
        :root {
            --primary-color: #131A36;
            --accent-color: ${state === 'heritage' ? '#3DFF74' : 
                           state === 'transitional' ? '#5AC8FA' : 
                           state === 'quantum' ? '#BF4080' : 
                           state === 'superposition' ? '#FFFFFF' : '#5AC8FA'};
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

        .state-info {
            margin-top: 20px;
            background-color: rgba(19, 26, 54, 0.6);
            border: 1px solid rgba(90, 200, 250, 0.4);
            border-radius: 8px;
            padding: 15px;
        }
        
        .state-info h3 {
            color: var(--accent-color);
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

                // Update state info
                const stateInfo = document.querySelector('.state-info');
                stateInfo.querySelector('h3').textContent = currentState.charAt(0).toUpperCase() + currentState.slice(1) + ' State';
                stateInfo.querySelector('p').textContent = getStateDescription(currentState);
                
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

// Get state description helper
function getStateDescription(state) {
  const descriptions = {
    heritage: "The Heritage state represents the foundational 8-bit pixel aesthetic with structured layout and subtle energy highlights.",
    transitional: "The Transitional state shows the evolution from structured heritage to quantum fluidity with softened edges and animated energy particles.",
    quantum: "The Quantum state represents advanced energy materialization with organic forms, featuring a glowing energy core and orbiting particles.",
    superposition: "The Superposition state represents multiple states simultaneously, truly embracing quantum principles with overlapping forms and energy transfer."
  };
  
  return descriptions[state] || descriptions.transitional;
}

// Test the API
async function runTests() {
  console.log(`Testing Pixel Viewer functionality on: ${baseUrl}`);
  console.log('='.repeat(60) + '');

  // Ensure output directory exists
  ensureOutputDirectory();

  // Test health endpoint
  try {
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log(`Health status: ${healthData.status}`);
    console.log(`Features: ${JSON.stringify(healthData.features, null, 2)}`);
  } catch (error) {
    console.error(`Error testing health endpoint: ${error.message}`);
  }

  // Test pixel-viewer endpoint with different states
  console.log('Testing Pixel Viewer with different design states:');
  console.log('-'.repeat(60));

  // Test and save previews for all states
  for (const state of STATES) {
    try {
      console.log(`Testing ${state} state...`);
      
      // Get HTML preview from the API
      let html;
      try {
        const pixelViewerResponse = await fetch(`${baseUrl}/pixel-viewer?state=${state}&format=html`);
        
        if (!pixelViewerResponse.ok) {
          console.error(`Error: ${pixelViewerResponse.status} ${pixelViewerResponse.statusText}`);
          console.log('Using local fallback for preview generation');
          html = generatePreviewHtml(state);
        } else {
          html = await pixelViewerResponse.text();
        }
      } catch (error) {
        console.error(`Error fetching HTML preview: ${error.message}`);
        console.log('Using local fallback for preview generation');
        html = generatePreviewHtml(state);
      }
      
      // Save the HTML preview
      const filePath = savePixelViewerHtml(state, html);
      
      // Try to get JSON component definition
      try {
        const componentResponse = await fetch(`${baseUrl}/pixel-viewer?state=${state}&format=json`);
        const componentData = await componentResponse.json();
        
        console.log(`- State: ${state}`);
        console.log(`- Component Name: ${componentData.name}`);
        console.log(`- Default Size: ${JSON.stringify(componentData.defaultSize)}`);
        console.log(`- M4 Optimized: ${componentData.m4Optimized || false}`);
        
        if (componentData.m4Optimizations) {
          console.log(`- M4 Optimization Features: ${Object.keys(componentData.m4Optimizations).join(', ')}`);
        }
      } catch (error) {
        console.error(`Error fetching component data: ${error.message}`);
      }
      
      console.log(`- Preview saved to: ${filePath}`);
      
    } catch (error) {
      console.error(`Error testing pixel-viewer with ${state} state: ${error.message}`);
    }
  }
  
  console.log('Tests completed!');
  console.log('To view the pixel viewer previews, open the HTML files in the pixel-viewer-previews directory.');
}

// Run the tests
runTests().catch(error => {
  console.error(`Error running tests: ${error.message}`);
  console.log('Generating static previews as fallback...');
  
  // Fallback to local preview generation
  ensureOutputDirectory();
  
  // Generate and save HTML previews for each state
  STATES.forEach(state => {
    const html = generatePreviewHtml(state);
    savePixelViewerHtml(state, html);
    console.log(`Generated fallback preview for ${state} state`);
  });
  
  console.log('All fallback previews generated successfully.');
});