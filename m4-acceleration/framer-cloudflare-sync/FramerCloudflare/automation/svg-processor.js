// quantum-svg-processor.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { execSync } = require('child_process');
const svgo = require('svgo');

// Configuration
const config = {
  // Input/output directories
  svgDir: path.join(__dirname, 'assets/svg'),
  processedDir: path.join(__dirname, 'assets/processed-svg'),
  componentsDir: path.join(__dirname, 'components'),
  
  // Type-specific settings
  typeSettings: {
    'ar-interfaces': {
      svgoPlugins: [
        // AR components often need precise measurements and positions
        { name: 'removeViewBox', active: false },
        { name: 'removeDimensions', active: false },
        // Preserve interactivity attributes
        { name: 'removeAttrs', params: { attrs: ['data-name', 'id'] } },
        // Optimize for performance
        { name: 'collapseGroups', active: true },
      ],
      componentTemplate: 'ar-component-template.js',
      stateImplementation: true, // Implement quantum states
    },
    
    'dashboards': {
      svgoPlugins: [
        // Dashboard components need preservation of structure
        { name: 'removeViewBox', active: false },
        // Keep IDs for interactions
        { name: 'cleanupIDs', active: false },
        // Optimize paths
        { name: 'mergePaths', active: true },
      ],
      componentTemplate: 'dashboard-component-template.js',
      stateImplementation: false, // Typically doesn't need state transitions
    },
    
    'brand-visuals': {
      svgoPlugins: [
        // Brand visuals need high fidelity
        { name: 'removeViewBox', active: false },
        { name: 'convertShapeToPath', active: false },
        // Preserve colors exactly
        { name: 'convertColors', active: false },
      ],
      componentTemplate: 'brand-component-template.js',
      stateImplementation: true, // Implement quantum states
    },
    
    'animations': {
      svgoPlugins: [
        // Preserve animation elements
        { name: 'removeViewBox', active: false },
        { name: 'removeUnknownsAndDefaults', active: false },
        { name: 'removeUselessDefs', active: false },
        // Keep animation attributes
        { name: 'removeAttrs', params: { attrs: [] } },
      ],
      componentTemplate: 'animation-component-template.js',
      stateImplementation: true, // Implement quantum states
    }
  },
  
  // Default settings
  defaultSettings: {
    svgoPlugins: [
      { name: 'removeViewBox', active: false },
      { name: 'cleanupIDs', active: true },
      { name: 'removeUnknownsAndDefaults', active: true },
    ],
    componentTemplate: 'default-component-template.js',
    stateImplementation: false,
  }
};

// Initialize directories
function initDirectories() {
  // Create processed directory if it doesn't exist
  if (!fs.existsSync(config.processedDir)) {
    fs.mkdirSync(config.processedDir, { recursive: true });
  }
  
  // Create components directory if it doesn't exist
  if (!fs.existsSync(config.componentsDir)) {
    fs.mkdirSync(config.componentsDir, { recursive: true });
  }
  
  // Create type-specific directories
  Object.keys(config.typeSettings).forEach(type => {
    const typeDir = path.join(config.svgDir, type);
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true });
    }
    
    const processedTypeDir = path.join(config.processedDir, type);
    if (!fs.existsSync(processedTypeDir)) {
      fs.mkdirSync(processedTypeDir, { recursive: true });
    }
    
    const componentsTypeDir = path.join(config.componentsDir, type);
    if (!fs.existsSync(componentsTypeDir)) {
      fs.mkdirSync(componentsTypeDir, { recursive: true });
    }
  });
}

// Process SVG files by type
function processSvgFiles() {
  // Process each type directory
  Object.keys(config.typeSettings).forEach(type => {
    const typeDir = path.join(config.svgDir, type);
    if (!fs.existsSync(typeDir)) {
      console.warn(`Directory not found: ${typeDir}`);
      return;
    }
    
    const files = fs.readdirSync(typeDir).filter(file => file.endsWith('.svg'));
    console.log(`Found ${files.length} SVG files in ${type}`);
    
    files.forEach(file => processSvgFile(file, type));
  });
}

// Process a single SVG file
function processSvgFile(file, type) {
  const inputPath = path.join(config.svgDir, type, file);
  const processedPath = path.join(config.processedDir, type, file);
  
  // Get settings for this type
  const settings = config.typeSettings[type] || config.defaultSettings;
  
  console.log(`Processing ${file} as ${type}...`);
  
  try {
    // Read SVG file
    const svgContent = fs.readFileSync(inputPath, 'utf8');
    
    // Process SVG content based on type
    const processedSvg = processSvgContent(svgContent, type, settings);
    
    // Write processed SVG
    fs.writeFileSync(processedPath, processedSvg);
    
    // Convert to TSX component
    convertToTsxComponent(processedPath, type, settings);
    
    console.log(`✅ Successfully processed ${file}`);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

// Process SVG content based on type
function processSvgContent(svgContent, type, settings) {
  // Step 1: Use SVGO to optimize SVG
  const optimizedSvg = svgo.optimize(svgContent, {
    plugins: settings.svgoPlugins
  }).data;
  
  // Step 2: Parse the SVG DOM
  const dom = new JSDOM(optimizedSvg);
  const document = dom.window.document;
  const svgElement = document.querySelector('svg');
  
  // Step 3: Apply type-specific modifications
  if (type === 'ar-interfaces') {
    // Add AR-specific attributes
    svgElement.setAttribute('data-ar-interface', 'true');
    svgElement.setAttribute('data-visionos-ready', 'true');
    
    // Ensure viewBox is properly set
    if (!svgElement.hasAttribute('viewBox')) {
      const width = svgElement.getAttribute('width') || '100%';
      const height = svgElement.getAttribute('height') || '100%';
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  } else if (type === 'dashboards') {
    // Add dashboard-specific attributes
    svgElement.setAttribute('data-dashboard', 'true');
    
    // Add class for styling
    svgElement.classList.add('quantum-dashboard');
  } else if (type === 'animations') {
    // Ensure animation elements are preserved
    const animations = svgElement.querySelectorAll('animate, animateTransform, animateMotion');
    animations.forEach(animation => {
      animation.setAttribute('data-preserved', 'true');
    });
  }
  
  // If this is a component that needs state implementation
  if (settings.stateImplementation) {
    // Add attributes for state transition
    svgElement.setAttribute('data-quantum-states', 'true');
    
    // Add defs section for gradients if it doesn't exist
    let defsElement = svgElement.querySelector('defs');
    if (!defsElement) {
      defsElement = document.createElement('defs');
      svgElement.insertBefore(defsElement, svgElement.firstChild);
    }
    
    // Add quantum state gradients
    addQuantumStateGradients(defsElement, document);
  }
  
  // Return the processed SVG as a string
  return svgElement.outerHTML;
}

// Add quantum state gradients to defs
function addQuantumStateGradients(defsElement, document) {
  // Heritage gradient
  const heritageGradient = document.createElement('linearGradient');
  heritageGradient.id = 'heritage-gradient';
  heritageGradient.setAttribute('x1', '0%');
  heritageGradient.setAttribute('y1', '0%');
  heritageGradient.setAttribute('x2', '100%');
  heritageGradient.setAttribute('y2', '0%');
  
  const heritageStop1 = document.createElement('stop');
  heritageStop1.setAttribute('offset', '0%');
  heritageStop1.setAttribute('stop-color', '#1B3D1A');
  
  const heritageStop2 = document.createElement('stop');
  heritageStop2.setAttribute('offset', '50%');
  heritageStop2.setAttribute('stop-color', '#2C5F2D');
  
  const heritageStop3 = document.createElement('stop');
  heritageStop3.setAttribute('offset', '100%');
  heritageStop3.setAttribute('stop-color', '#3DFF74');
  
  heritageGradient.appendChild(heritageStop1);
  heritageGradient.appendChild(heritageStop2);
  heritageGradient.appendChild(heritageStop3);
  
  // Transitional gradient
  const transitionalGradient = document.createElement('linearGradient');
  transitionalGradient.id = 'transitional-gradient';
  transitionalGradient.setAttribute('x1', '0%');
  transitionalGradient.setAttribute('y1', '0%');
  transitionalGradient.setAttribute('x2', '100%');
  transitionalGradient.setAttribute('y2', '0%');
  
  const transStop1 = document.createElement('stop');
  transStop1.setAttribute('offset', '0%');
  transStop1.setAttribute('stop-color', '#331F4A');
  
  const transStop2 = document.createElement('stop');
  transStop2.setAttribute('offset', '50%');
  transStop2.setAttribute('stop-color', '#405de5');
  
  const transStop3 = document.createElement('stop');
  transStop3.setAttribute('offset', '100%');
  transStop3.setAttribute('stop-color', '#5AC8FA');
  
  transitionalGradient.appendChild(transStop1);
  transitionalGradient.appendChild(transStop2);
  transitionalGradient.appendChild(transStop3);
  
  // Quantum gradient
  const quantumGradient = document.createElement('linearGradient');
  quantumGradient.id = 'quantum-gradient';
  quantumGradient.setAttribute('x1', '0%');
  quantumGradient.setAttribute('y1', '0%');
  quantumGradient.setAttribute('x2', '100%');
  quantumGradient.setAttribute('y2', '0%');
  
  const quantumStop1 = document.createElement('stop');
  quantumStop1.setAttribute('offset', '0%');
  quantumStop1.setAttribute('stop-color', '#6A3093');
  
  const quantumStop2 = document.createElement('stop');
  quantumStop2.setAttribute('offset', '50%');
  quantumStop2.setAttribute('stop-color', '#BF4080');
  
  const quantumStop3 = document.createElement('stop');
  quantumStop3.setAttribute('offset', '100%');
  quantumStop3.setAttribute('stop-color', '#FF2D55');
  
  quantumGradient.appendChild(quantumStop1);
  quantumGradient.appendChild(quantumStop2);
  quantumGradient.appendChild(quantumStop3);
  
  // Add gradients to defs
  defsElement.appendChild(heritageGradient);
  defsElement.appendChild(transitionalGradient);
  defsElement.appendChild(quantumGradient);
}

// Convert processed SVG to TSX component
function convertToTsxComponent(svgPath, type, settings) {
  const fileName = path.basename(svgPath, '.svg');
  const componentName = fileName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  const outputDir = path.join(config.componentsDir, type);
  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  
  try {
    // Use the svg-to-tsx conversion script
    execSync(`node scripts/svg-to-tsx.js --input="${svgPath}" --output="${outputPath}" --name="${componentName}" --template="${settings.componentTemplate}" --stateImplementation=${settings.stateImplementation}`);
    
    console.log(`Successfully converted ${fileName} to ${componentName}.tsx`);
    
    // If state implementation is required, create state-specific files
    if (settings.stateImplementation) {
      createStateSpecificComponents(componentName, type, outputPath);
    }
  } catch (error) {
    console.error(`Error converting ${fileName} to TSX:`, error.message);
  }
}

// Create state-specific component variants
function createStateSpecificComponents(componentName, type, basePath) {
  const states = ['heritage', 'transitional', 'quantum'];
  const outputDir = path.join(config.componentsDir, type);
  
  states.forEach(state => {
    const stateComponentPath = path.join(outputDir, `${componentName}-${state}.tsx`);
    
    try {
      // Use the component enhancement script to create state-specific version
      execSync(`node scripts/enhance-component.js --input="${basePath}" --output="${stateComponentPath}" --state="${state}"`);
      
      console.log(`Created ${state} variant: ${componentName}-${state}.tsx`);
    } catch (error) {
      console.error(`Error creating ${state} variant:`, error.message);
    }
  });
}

// Main function
function main() {
  console.log('Starting Quantum-Spatial SVG Processing...');
  
  // Initialize directories
  initDirectories();
  
  // Process SVG files
  processSvgFiles();
  
  console.log('SVG processing complete!');
}

// Run the main function
main();
