/**
 * Framer Component Synchronization Script
 * 
 * Synchronizes Quantum-Spatial core components with Framer
 * 
 * Usage: node framer-component-sync.js --state=transitional
 */

const fs = require('fs');
const path = require('path');
const config = require('./framer-sync-config');

// Parse command line arguments
const args = process.argv.slice(2);
let state = config.defaultState || 'transitional';
let dryRun = false;

args.forEach(arg => {
  if (arg.startsWith('--state=')) {
    state = arg.split('=')[1];
  } else if (arg === '--dry-run') {
    dryRun = true;
    console.log('Running in dry-run mode - no files will be modified');
  }
});

// Validate state
if (!config.designSystemStates.includes(state)) {
  console.error(`Error: Invalid state "${state}". Valid states are: ${config.designSystemStates.join(', ')}`);
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.join(process.cwd(), 'framer-components');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

/**
 * Process components for the selected state
 */
async function processComponents() {
  console.log(`Processing components for state: ${state}...`);
  
  // Get components directory
  const componentsDir = config.paths.componentsPath;
  if (!fs.existsSync(componentsDir)) {
    console.error(`Error: Components directory not found: ${componentsDir}`);
    process.exit(1);
  }
  
  // Load core components
  const components = [];
  
  for (const componentName of config.coreComponents) {
    const componentPath = path.join(componentsDir, `${componentName}.tsx`);
    
    if (fs.existsSync(componentPath)) {
      console.log(`Processing component: ${componentName}`);
      
      // Read component file
      const code = fs.readFileSync(componentPath, 'utf8');
      
      // Extract component metadata
      const metadata = extractComponentMetadata(code, componentName);
      
      // Generate Framer-compatible version
      const framerComponent = createFramerComponent(metadata, state);
      
      // Save to output directory (unless dry-run)
      if (!dryRun) {
        const outputPath = path.join(outputDir, `${componentName}-${state}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(framerComponent, null, 2));
        console.log(`Saved to: ${outputPath}`);
      }
      
      components.push({
        name: componentName,
        state: state,
        outputPath: `${componentName}-${state}.json`
      });
    } else {
      console.warn(`Warning: Component file not found: ${componentPath}`);
    }
  }
  
  // Create manifest file
  const manifest = {
    state,
    components,
    generatedAt: new Date().toISOString()
  };
  
  if (!dryRun) {
    const manifestPath = path.join(outputDir, `manifest-${state}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Created manifest: ${manifestPath}`);
  }
  
  return {
    componentsCount: components.length,
    manifest
  };
}

/**
 * Extract component metadata from code
 * @param {string} code - Component source code
 * @param {string} name - Component name
 * @returns {Object} - Component metadata
 */
function extractComponentMetadata(code, name) {
  // Extract props interface
  const propsMatch = code.match(/interface\s+(\w+)Props\s*{([^}]*)}/s);
  const props = [];
  
  if (propsMatch) {
    const propsBlock = propsMatch[2];
    const propLines = propsBlock.split('');
    
    // Process each prop line
    propLines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//')) return;
      
      // Match prop name, type, and optional flag
      const propMatch = trimmed.match(/(\w+)(\?)?:\s*(.*?)(;|$)/);
      if (!propMatch) return;
      
      const [_, name, optional, type] = propMatch;
      
      props.push({
        name,
        type: type.trim(),
        optional: Boolean(optional)
      });
    });
  }
  
  // Extract description from comments
  let description = '';
  const descriptionMatch = code.match(/\/\*\*([\s\S]*?)\*\//);
  if (descriptionMatch) {
    description = descriptionMatch[1]
      .split('')
      .map(line => line.trim().replace(/^\*\s*/, ''))
      .filter(line => line)
      .join(' ');
  }
  
  return {
    name,
    code,
    props,
    description: description || `Quantum-Spatial ${name} component`
  };
}

/**
 * Create Framer-compatible component
 * @param {Object} metadata - Component metadata
 * @param {string} state - Design system state
 * @returns {Object} - Framer component
 */
function createFramerComponent(metadata, state) {
  return {
    name: metadata.name,
    description: metadata.description,
    state,
    code: metadata.code,
    props: metadata.props.map(prop => ({
      name: prop.name,
      type: mapTypeToFramer(prop.type),
      required: !prop.optional,
      description: `${prop.name} property`
    })),
    variants: {
      state: {
        options: config.designSystemStates,
        default: state
      }
    },
    version: "1.0.0"
  };
}

/**
 * Map TypeScript type to Framer type
 * @param {string} tsType - TypeScript type
 * @returns {string} - Framer type
 */
function mapTypeToFramer(tsType) {
  // Common type mappings
  const typeMap = {
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean'
  };
  
  // Check for enum types
  if (tsType.includes('|')) {
    return 'enum';
  }
  
  // Check for React types
  if (tsType.includes('React') || tsType.includes('ReactNode')) {
    return 'reactNode';
  }
  
  // Default to string
  return typeMap[tsType] || 'string';
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Quantum-Spatial Design System - Framer Component Sync');
    console.log('===============================================');
    console.log(`State: ${state}`);
    console.log(`Components directory: ${config.paths.componentsPath}`);
    console.log(`Output directory: ${outputDir}`);
    console.log('');
    
    const result = await processComponents();
    
    console.log('');
    console.log(`Successfully processed ${result.componentsCount} components for state "${state}"`);
    console.log('');
    console.log('Next Steps:');
    console.log('1. Upload the components to your Framer project');
    console.log(`2. In Framer, create a new code component and import the components from ${outputDir}`);
    console.log('3. Use the DesignSystemProvider component to provide design tokens to your components');
    console.log('');
    console.log('Done!');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
main();