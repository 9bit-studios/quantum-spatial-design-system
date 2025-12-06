// Enhanced test script to generate the PixelViewer HTML preview
// Uses functions from the pixel-viewer.js service
const fs = require('fs');

// Import the pixel-viewer service
const pixelViewer = require('./src/services/pixel-viewer');

// Generate HTML previews for different states
const states = ['heritage', 'transitional', 'quantum', 'superposition'];

// Create output directory if it doesn't exist
if (!fs.existsSync('enhanced-pixel-viewer-previews')) {
  fs.mkdirSync('enhanced-pixel-viewer-previews');
}

// Generate and save HTML previews for each state
states.forEach(state => {
  // Generate HTML using the imported functions
  const options = {
    state: state,
    columns: 8,
    rows: 6,
    pixelSize: 'sm',
    interactive: true,
    showControls: true,
    responsive: true,
    m4Optimized: true
  };
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum-Spatial Pixel Viewer - ${state.charAt(0).toUpperCase() + state.slice(1)} State</title>
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
            padding: 20px;
        }
        
        h1 {
            font-size: 2.5rem;
            color: var(--accent-color);
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Quantum-Spatial Pixel Viewer - ${state.charAt(0).toUpperCase() + state.slice(1)} State</h1>
        
        ${pixelViewer.generateViewerHTML(options)}
        
        <script>
            ${pixelViewer.pixelViewerClientJS}
        </script>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(`enhanced-pixel-viewer-previews/${state}.html`, html);
  console.log(`Generated enhanced preview for ${state} state`);
});

console.log('All enhanced previews generated successfully.');