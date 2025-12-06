// component-batch-processor.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Directories
  svgInputDir: path.join(__dirname, 'assets/svg'),
  tsxInputDir: path.join(__dirname, 'components/src'),
  outputDir: path.join(__dirname, 'components/processed'),
  
  // Processing queues
  svgQueue: [], // Will be populated with SVG files to process
  tsxQueue: [], // Will be populated with TSX files to process
  
  // Framer config
  framerProjectId: process.env.FRAMER_PROJECT_ID || '',
  framerApiKey: process.env.FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN= || '',
  
  // States to process
  states: ['heritage', 'transitional', 'quantum', 'superposition']
};

// Initialize directories
function initDirectories() {
  [config.svgInputDir, config.tsxInputDir, config.outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

// Scan directories and build queues
function buildQueues() {
  // Scan SVG directory
  config.svgQueue = fs.readdirSync(config.svgInputDir)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.join(config.svgInputDir, file));
  
  console.log(`Found ${config.svgQueue.length} SVG files to process`);
  
  // Scan TSX directory
  config.tsxQueue = fs.readdirSync(config.tsxInputDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(config.tsxInputDir, file));
  
  console.log(`Found ${config.tsxQueue.length} TSX files to process`);
}

// Process SVG files to TSX components
function processSvgToTsx() {
  console.log('Processing SVG to TSX...');
  
  config.svgQueue.forEach(svgFile => {
    const fileName = path.basename(svgFile, '.svg');
    const componentName = fileName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const outputFile = path.join(config.outputDir, `${componentName}.tsx`);
    
    console.log(`Converting ${svgFile} to ${outputFile}`);
    
    try {
      // Use the svg-to-tsx script for conversion
      execSync(`node scripts/svg-to-tsx.js --input="${svgFile}" --output="${outputFile}" --name="${componentName}"`);
      console.log(`✅ Successfully converted ${fileName} to ${componentName}.tsx`);
    } catch (error) {
      console.error(`❌ Error converting ${fileName}:`, error.message);
    }
  });
}

// Process TSX components into optimized versions
function processTsx() {
  console.log('Processing TSX components...');
  
  config.tsxQueue.forEach(tsxFile => {
    const fileName = path.basename(tsxFile);
    const outputFile = path.join(config.outputDir, fileName);
    
    console.log(`Optimizing ${tsxFile} to ${outputFile}`);
    
    try {
      // For each quantum state, create a state-specific version
      config.states.forEach(state => {
        const stateOutputFile = path.join(
          config.outputDir, 
          `${path.basename(fileName, '.tsx')}-${state}.tsx`
        );
        
        // Use the component enhancement script
        execSync(`node scripts/enhance-component.js --input="${tsxFile}" --output="${stateOutputFile}" --state="${state}"`);
      });
      
      console.log(`✅ Successfully processed ${fileName} for all states`);
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  });
}

// Sync to Framer
function syncToFramer() {
  if (!config.framerProjectId || !config.framerApiKey) {
    console.warn('⚠️ Framer sync skipped: missing project ID or API key');
    return;
  }
  
  console.log('Syncing to Framer...');
  
  try {
    execSync(`node scripts/framer-quantum-spatial-sync.js --framer-project=${config.framerProjectId}`);
    console.log('✅ Successfully synced to Framer');
  } catch (error) {
    console.error('❌ Error syncing to Framer:', error.message);
  }
}

// Main process
function main() {
  console.log('Starting Quantum-Spatial component batch processing...');
  
  // Initialize
  initDirectories();
  
  // Build processing queues
  buildQueues();
  
  // Process queues
  processSvgToTsx();
  processTsx();
  
  // Sync to Framer
  syncToFramer();
  
  console.log('Batch processing complete!');
}

// Run the process
main();
