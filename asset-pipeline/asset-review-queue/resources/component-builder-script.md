# component-builder-script

/**
* Component Builder
* Builds and optimizes components for the Quantum-Spatial design system
*/

const fs = require(‘fs’);
const path = require(‘path’);
const { execSync } = require(‘child_process’);
const SVGO = require(‘svgo’);

class ComponentBuilder {
constructor(config) {
this.componentsPath = config.componentsPath;
this.outputPath = config.outputPath;
this.tokensPath = config.tokensPath;

```
// Configure SVG optimizer
this.svgo = new SVGO({
  plugins: [
    { name: 'removeDoctype', active: true },
    { name: 'removeComments', active: true },
    { name: 'removeMetadata', active: true },
    { name: 'removeEditorsNSData', active: true },
    { name: 'cleanupAttrs', active: true },
    { name: 'inlineStyles', active: true },
    { name: 'minifyStyles', active: true },
    { name: 'removeUselessDefs', active: true },
    { name: 'cleanupNumericValues', active: true },
    { name: 'convertColors', active: true },
    { name: 'removeUnknownsAndDefaults', active: true },
    { name: 'removeNonInheritableGroupAttrs', active: true },
    { name: 'removeUselessStrokeAndFill', active: true },
    { name: 'cleanupEnableBackground', active: true },
    { name: 'removeHiddenElems', active: true },
    { name: 'removeEmptyText', active: true },
    { name: 'convertShapeToPath', active: false }, // Keep shapes as is
    { name: 'collapseGroups', active: false }, // Keep group structure
    { name: 'convertPathData', active: true },
    { name: 'convertTransform', active: true },
    { name: 'removeEmptyAttrs', active: true },
    { name: 'removeEmptyContainers', active: true },
    { name: 'mergePaths', active: false }, // Keep paths separate for animation
    { name: 'removeUnusedNS', active: true },
    { name: 'sortAttrs', active: true },
    { name: 'removeTitle', active: false }, // Keep titles for accessibility
    { name: 'removeDesc', active: false } // Keep descriptions for accessibility
  ]
});
```

}

/**
* Build all components
*/
async buildAllComponents() {
console.log(‘🔨 Building all components…’);

```
// Ensure output directory exists
if (!fs.existsSync(this.outputPath)) {
  fs.mkdirSync(this.outputPath, { recursive: true });
}

// Check if components directory exists
if (!fs.existsSync(this.componentsPath)) {
  throw new Error(`Components directory not found: ${this.componentsPath}`);
}

// Get core components
const coreComponents = this.getCoreComponents();

// Process each component
for (const component of coreComponents) {
  await this.buildComponent(component);
}

// Build index file
this.buildIndexFile(coreComponents);

console.log('✅ All components built successfully');
```

}

/**
* Get core components
*/
getCoreComponents() {
// Read the components directory and filter for TSX files
const files = fs.readdirSync(this.componentsPath);

```
return files
  .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'))
  .map(file => ({
    name: path.basename(file, path.extname(file)),
    filePath: path.join(this.componentsPath, file),
    type: this.categorizeComponent(file)
  }));
```

}

/**
* Categorize component
*/
categorizeComponent(fileName) {
// Categorize based on naming conventions
if (fileName.includes(‘Grid’)) {
return ‘grid’;
} else if (fileName.includes(‘Pixel’)) {
return ‘pixel’;
} else if (fileName.includes(‘Button’)) {
return ‘button’;
} else if (fileName.includes(‘Card’)) {
return ‘card’;
} else if (fileName.includes(‘Input’)) {
return ‘input’;
} else if (fileName.includes(‘Navbar’) || fileName.includes(‘Nav’)) {
return ‘navigation’;
} else {
return ‘other’;
}
}

/**
* Build a single component
*/
async buildComponent(component) {
console.log(`Building component: ${component.name}`);

```
try {
  // Read the component file
  const componentCode = fs.readFileSync(component.filePath, 'utf8');

  // Create optimized component
  const optimizedCode = await this.optimizeComponent(componentCode);

  // Write optimized component to output directory
  const outputFilePath = path.join(this.outputPath, `${component.name}.tsx`);
  fs.writeFileSync(outputFilePath, optimizedCode);

  // Generate SVG version if applicable
  await this.generateSvgVersion(component);

  console.log(`✅ Built component: ${component.name}`);

  return outputFilePath;
} catch (error) {
  console.error(`❌ Error building component ${component.name}:`, error.message);
  throw error;
}
```

}

/**
* Optimize component
*/
async optimizeComponent(componentCode) {
// This is a simple implementation
// In a real system, you would use a proper TS/JS transformer

```
// Replace hardcoded colors with token references
let optimizedCode = componentCode;

// Replace hex colors with token references
const colorPattern = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})([^0-9A-Fa-f]|$)/g;

// Load color tokens to map hex values to token names
const colorTokens = this.loadColorTokens();

// Replace color hex codes with token references
optimizedCode = componentCode.replace(colorPattern, (match, hex, suffix) => {
  const token = this.findTokenForColor(`#${hex}`, colorTokens);
  if (token) {
    return `{theme.colors.${token}}${suffix}`;
  }
  return match;
});

// Add M4 optimization comments
optimizedCode = optimizedCode
```