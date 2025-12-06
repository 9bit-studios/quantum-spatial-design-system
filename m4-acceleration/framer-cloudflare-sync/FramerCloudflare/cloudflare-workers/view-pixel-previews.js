// Script to open the pixel viewer previews in the default browser
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Platform-specific open command
const openCommand = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';

// Open the enhanced previews
const states = ['heritage', 'transitional', 'quantum', 'superposition'];
const previewDir = path.join(__dirname, 'enhanced-pixel-viewer-previews');

// Check if the preview directory exists
if (!fs.existsSync(previewDir)) {
  console.error('The enhanced-pixel-viewer-previews directory does not exist.');
  console.log('Please run test-enhanced-pixel-preview.js first to generate the previews.');
  process.exit(1);
}

// Open each preview
states.forEach(state => {
  const previewPath = path.join(previewDir, `${state}.html`);
  
  if (!fs.existsSync(previewPath)) {
    console.error(`Preview file for ${state} state does not exist.`);
    return;
  }
  
  // Open the file in the default browser
  exec(`${openCommand} "${previewPath}"`, (error) => {
    if (error) {
      console.error(`Error opening ${state} preview: ${error.message}`);
    } else {
      console.log(`Opened ${state} preview in the default browser.`);
    }
  });
});

console.log('Opening all previews in the default browser...');