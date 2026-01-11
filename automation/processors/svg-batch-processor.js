/**
 * 9Bit Studios Quantum-Spatial Design System
 * SVG Batch Processing Utility - M4-Optimized
 */

// Import design tokens
import { designTokens, designSystem } from './design-tokens.js';
import fs from 'fs/promises';
import path from 'path';
import { DOMParser, XMLSerializer } from 'xmldom';

/**
 * Processes a batch of SVGs with quantum-spatial style updates
 * @param {Array<string>} fileList - List of SVG files to process
 * @param {Object} styleUpdates - Style updates to apply to the SVGs
 * @param {string} outputDir - Directory to save processed SVGs
 * @returns {Promise<Array>} - Array of processed file info
 */
export async function processSVGBatch(fileList, styleUpdates, outputDir = 'processed') {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    const results = [];
    
    for (const file of fileList) {
      try {
        // Read SVG content
        const svgContent = await fs.readFile(file, 'utf8');
        
        // Apply style updates
        const updatedSVG = applySVGStyles(svgContent, styleUpdates);
        
        // Create output path
        const fileName = path.basename(file);
        const outputPath = path.join(outputDir, fileName);
        
        // Save processed file
        await fs.writeFile(outputPath, updatedSVG);
        
        results.push({
          file,
          outputPath,
          status: 'processed'
        });
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        results.push({
          file,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in batch processing:', error);
    throw error;
  }
}

/**
 * Applies quantum-spatial style updates to an SVG string
 * @param {string} svgContent - Original SVG content
 * @param {Object} styleUpdates - Style updates to apply
 * @returns {string} - Updated SVG content
 */
export function applySVGStyles(svgContent, styleUpdates) {
  // Parse SVG content
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  
  // Apply style updates
  applyColorUpdates(svgDoc, styleUpdates.colors);
  applyStateUpdates(svgDoc, styleUpdates.states);
  applyEffectUpdates(svgDoc, styleUpdates.effects);
  
  // Add quantum-spatial metadata
  addMetadata(svgDoc, styleUpdates);
  
  // Serialize back to string
  return serializer.serializeToString(svgDoc);
}

/**
 * Apply color updates to SVG elements
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} colorUpdates - Color updates to apply
 */
function applyColorUpdates(svgDoc, colorUpdates = {}) {
  if (!colorUpdates) return;
  
  // Process fill colors
  processFillColors(svgDoc, colorUpdates);
  
  // Process stroke colors
  processStrokeColors(svgDoc, colorUpdates);
  
  // Process gradients
  processGradients(svgDoc, colorUpdates);
}

/**
 * Process fill colors in SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} colorUpdates - Color updates to apply
 */
function processFillColors(svgDoc, colorUpdates) {
  // Get all elements with fill attribute
  const elementsWithFill = Array.from(svgDoc.getElementsByTagName('*'))
    .filter(el => el.hasAttribute('fill') && el.getAttribute('fill') !== 'none');
  
  // Map common colors to quantum-spatial colors
  const colorMapping = {
    // Map common UI colors to quantum-spatial colors
    '#000000': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    '#000': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    '#ffffff': colorUpdates.light || '#ffffff',
    '#fff': colorUpdates.light || '#ffffff',
    'black': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    'white': colorUpdates.light || '#ffffff',
    // Primary blues often used in icons
    '#0066ff': colorUpdates.accent || designTokens.colors.subtleCyan,
    '#0088ff': colorUpdates.accent || designTokens.colors.subtleCyan,
    '#1e90ff': colorUpdates.accent || designTokens.colors.subtleCyan,
    '#4169e1': colorUpdates.accent || designTokens.colors.subtleCyan,
    // Grays
    '#777777': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    '#888888': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    '#999999': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    '#aaaaaa': colorUpdates.tertiary || designTokens.colors.ultraIndigo,
    // Add more mappings as needed
  };
  
  // Apply updates to fill colors
  elementsWithFill.forEach(el => {
    const currentFill = el.getAttribute('fill');
    
    // Check if we have a direct mapping
    if (colorMapping[currentFill]) {
      el.setAttribute('fill', colorMapping[currentFill]);
    }
    // Check if it's a custom color that needs to be updated
    else if (colorUpdates.custom && colorUpdates.custom[currentFill]) {
      el.setAttribute('fill', colorUpdates.custom[currentFill]);
    }
  });
}

/**
 * Process stroke colors in SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} colorUpdates - Color updates to apply
 */
function processStrokeColors(svgDoc, colorUpdates) {
  // Get all elements with stroke attribute
  const elementsWithStroke = Array.from(svgDoc.getElementsByTagName('*'))
    .filter(el => el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none');
  
  // Map common stroke colors to quantum-spatial colors
  const strokeMapping = {
    '#000000': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    '#000': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    '#ffffff': colorUpdates.light || '#ffffff',
    '#fff': colorUpdates.light || '#ffffff',
    'black': colorUpdates.primary || designTokens.colors.deepSpaceIndigo,
    'white': colorUpdates.light || '#ffffff',
    // Blues
    '#0066ff': colorUpdates.accent || designTokens.colors.subtleCyan,
    '#0088ff': colorUpdates.accent || designTokens.colors.subtleCyan,
    // Grays
    '#777777': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    '#888888': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    '#999999': colorUpdates.secondary || designTokens.colors.dimensionalEggplant,
    // Add more mappings as needed
  };
  
  // Apply updates to stroke colors
  elementsWithStroke.forEach(el => {
    const currentStroke = el.getAttribute('stroke');
    
    // Check if we have a direct mapping
    if (strokeMapping[currentStroke]) {
      el.setAttribute('stroke', strokeMapping[currentStroke]);
    }
    // Check if it's a custom color that needs to be updated
    else if (colorUpdates.custom && colorUpdates.custom[currentStroke]) {
      el.setAttribute('stroke', colorUpdates.custom[currentStroke]);
    }
  });
}

/**
 * Process gradients in SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} colorUpdates - Color updates to apply
 */
function processGradients(svgDoc, colorUpdates) {
  // Get all gradient elements
  const linearGradients = Array.from(svgDoc.getElementsByTagName('linearGradient'));
  const radialGradients = Array.from(svgDoc.getElementsByTagName('radialGradient'));
  
  // Process all gradients
  [...linearGradients, ...radialGradients].forEach(gradient => {
    // Get all stops
    const stops = Array.from(gradient.getElementsByTagName('stop'));
    
    stops.forEach(stop => {
      if (stop.hasAttribute('stop-color')) {
        const currentColor = stop.getAttribute('stop-color');
        
        // Update gradient stop colors based on mapping or custom colors
        if (colorUpdates.custom && colorUpdates.custom[currentColor]) {
          stop.setAttribute('stop-color', colorUpdates.custom[currentColor]);
        }
        else if (currentColor === '#000000' || currentColor === 'black') {
          stop.setAttribute('stop-color', colorUpdates.primary || designTokens.colors.deepSpaceIndigo);
        }
        else if (currentColor === '#ffffff' || currentColor === 'white') {
          stop.setAttribute('stop-color', colorUpdates.light || '#ffffff');
        }
      }
    });
    
    // Potentially modify gradient attributes (angle, position, etc.)
    if (gradient.tagName === 'linearGradient' && colorUpdates.gradientAngle) {
      // Update gradient angle if needed
      // This would involve changing x1, y1, x2, y2 based on the angle
    }
  });
}

/**
 * Apply state-specific updates to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} stateUpdates - State updates to apply
 */
function applyStateUpdates(svgDoc, stateUpdates = {}) {
  if (!stateUpdates) return;
  
  const svgRoot = svgDoc.documentElement;
  
  // Apply opacity updates
  if (stateUpdates.opacity !== undefined) {
    // Get root opacity if it exists
    const currentOpacity = svgRoot.getAttribute('opacity');
    if (currentOpacity) {
      // Update with state-specific opacity
      svgRoot.setAttribute('opacity', stateUpdates.opacity);
    }
  }
  
  // Apply scale transform if specified
  if (stateUpdates.scale !== undefined && stateUpdates.scale !== 1) {
    // Get current transform or create new one
    const currentTransform = svgRoot.getAttribute('transform') || '';
    const newTransform = currentTransform + ` scale(${stateUpdates.scale})`;
    svgRoot.setAttribute('transform', newTransform.trim());
  }
  
  // Add hover/focus states if needed
  if (stateUpdates.hover || stateUpdates.focus) {
    addInteractiveStates(svgDoc, stateUpdates);
  }
}

/**
 * Add interactive states (hover, focus) to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} stateUpdates - State updates to apply
 */
function addInteractiveStates(svgDoc, stateUpdates) {
  // Add a style element to the SVG for hover/focus states
  const styleEl = svgDoc.createElement('style');
  let styleContent = '';
  
  if (stateUpdates.hover) {
    styleContent += `
      svg:hover {
        ${stateUpdates.hover.opacity !== undefined ? `opacity: ${stateUpdates.hover.opacity} !important;` : ''}
        ${stateUpdates.hover.scale !== undefined ? `transform: scale(${stateUpdates.hover.scale}) !important;` : ''}
        ${stateUpdates.hover.filter ? `filter: ${stateUpdates.hover.filter} !important;` : ''}
      }
    `;
  }
  
  if (stateUpdates.focus) {
    styleContent += `
      svg:focus {
        ${stateUpdates.focus.opacity !== undefined ? `opacity: ${stateUpdates.focus.opacity} !important;` : ''}
        ${stateUpdates.focus.scale !== undefined ? `transform: scale(${stateUpdates.focus.scale}) !important;` : ''}
        ${stateUpdates.focus.filter ? `filter: ${stateUpdates.focus.filter} !important;` : ''}
        outline: none;
      }
    `;
  }
  
  styleEl.textContent = styleContent;
  
  // Add style element to SVG
  const defs = svgDoc.getElementsByTagName('defs')[0];
  if (defs) {
    defs.appendChild(styleEl);
  } else {
    // Create defs if it doesn't exist
    const newDefs = svgDoc.createElement('defs');
    newDefs.appendChild(styleEl);
    svgDoc.documentElement.insertBefore(newDefs, svgDoc.documentElement.firstChild);
  }
}

/**
 * Apply effect updates to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} effectUpdates - Effect updates to apply
 */
function applyEffectUpdates(svgDoc, effectUpdates = {}) {
  if (!effectUpdates) return;
  
  // Add filters (glow, shadow, etc.)
  if (effectUpdates.glow) {
    addGlowEffect(svgDoc, effectUpdates.glow);
  }
  
  // Add animations if needed
  if (effectUpdates.animation) {
    addAnimationEffect(svgDoc, effectUpdates.animation);
  }
}

/**
 * Add glow effect to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} glowParams - Glow parameters
 */
function addGlowEffect(svgDoc, glowParams) {
  const defs = svgDoc.getElementsByTagName('defs')[0] || svgDoc.createElement('defs');
  
  // Create filter
  const filterId = `filter-glow-${Date.now()}`;
  const filter = svgDoc.createElement('filter');
  filter.setAttribute('id', filterId);
  filter.setAttribute('x', '-20%');
  filter.setAttribute('y', '-20%');
  filter.setAttribute('width', '140%');
  filter.setAttribute('height', '140%');
  
  // Create blur effect
  const feGaussianBlur = svgDoc.createElement('feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', glowParams.intensity || '3');
  feGaussianBlur.setAttribute('result', 'blur');
  
  // Create composite operation
  const feComposite = svgDoc.createElement('feComposite');
  feComposite.setAttribute('in', 'SourceGraphic');
  feComposite.setAttribute('in2', 'blur');
  feComposite.setAttribute('operator', 'over');
  
  // Add elements to filter
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feComposite);
  
  // Add filter to defs
  defs.appendChild(filter);
  
  // If defs was created, add it to the document
  if (!svgDoc.getElementsByTagName('defs')[0]) {
    svgDoc.documentElement.insertBefore(defs, svgDoc.documentElement.firstChild);
  }
  
  // Apply filter to root group or create one
  const rootGroup = svgDoc.getElementsByTagName('g')[0];
  if (rootGroup) {
    rootGroup.setAttribute('filter', `url(#${filterId})`);
  } else {
    // Wrap all content in a group with the filter
    const newGroup = svgDoc.createElement('g');
    newGroup.setAttribute('filter', `url(#${filterId})`);
    
    // Move all direct children of svg into the new group
    const svgEl = svgDoc.documentElement;
    const children = Array.from(svgEl.childNodes);
    
    // Skip defs when moving children
    children.forEach(child => {
      if (child.nodeName !== 'defs') {
        newGroup.appendChild(child);
      }
    });
    
    // Add the group to the svg
    svgEl.appendChild(newGroup);
  }
}

/**
 * Add animation effect to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} animationParams - Animation parameters
 */
function addAnimationEffect(svgDoc, animationParams) {
  // Determine animation type
  const animationType = animationParams.type || 'pulse';
  
  const defs = svgDoc.getElementsByTagName('defs')[0] || svgDoc.createElement('defs');
  const styleEl = svgDoc.createElement('style');
  
  // Define animation keyframes based on type
  let keyframes = '';
  switch (animationType) {
    case 'pulse':
      keyframes = `
        @keyframes quantumPulse {
          0%, 100% { opacity: ${animationParams.minOpacity || 0.7}; }
          50% { opacity: ${animationParams.maxOpacity || 1}; }
        }
      `;
      break;
    case 'scale':
      keyframes = `
        @keyframes quantumScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(${animationParams.scale || 1.08}); }
        }
      `;
      break;
    case 'rotate':
      keyframes = `
        @keyframes quantumRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(${animationParams.rotation || 360}deg); }
        }
      `;
      break;
    // Add more animation types as needed
  }
  
  // Add animation style
  const duration = animationParams.duration || '3s';
  const timing = animationParams.timing || 'ease-in-out';
  const iteration = animationParams.iterations || 'infinite';
  
  let animationStyle = '';
  switch (animationType) {
    case 'pulse':
      animationStyle = `
        .quantum-animation {
          animation: quantumPulse ${duration} ${timing} ${iteration};
        }
      `;
      break;
    case 'scale':
      animationStyle = `
        .quantum-animation {
          animation: quantumScale ${duration} ${timing} ${iteration};
        }
      `;
      break;
    case 'rotate':
      animationStyle = `
        .quantum-animation {
          animation: quantumRotate ${duration} ${timing} ${iteration};
        }
      `;
      break;
    // Add more cases as needed
  }
  
  // Set style content and add to defs
  styleEl.textContent = keyframes + animationStyle;
  defs.appendChild(styleEl);
  
  // If defs was created, add it to the document
  if (!svgDoc.getElementsByTagName('defs')[0]) {
    svgDoc.documentElement.insertBefore(defs, svgDoc.documentElement.firstChild);
  }
  
  // Apply animation class to root group or create one
  const rootGroup = svgDoc.getElementsByTagName('g')[0];
  if (rootGroup) {
    const currentClass = rootGroup.getAttribute('class') || '';
    rootGroup.setAttribute('class', `${currentClass} quantum-animation`.trim());
  } else {
    // Wrap all content in a group with the animation class
    const newGroup = svgDoc.createElement('g');
    newGroup.setAttribute('class', 'quantum-animation');
    
    // Move all direct children of svg into the new group
    const svgEl = svgDoc.documentElement;
    const children = Array.from(svgEl.childNodes);
    
    // Skip defs when moving children
    children.forEach(child => {
      if (child.nodeName !== 'defs') {
        newGroup.appendChild(child);
      }
    });
    
    // Add the group to the svg
    svgEl.appendChild(newGroup);
  }
}

/**
 * Add quantum-spatial metadata to SVG
 * @param {Document} svgDoc - SVG DOM document
 * @param {Object} styleUpdates - Style updates applied
 */
function addMetadata(svgDoc, styleUpdates) {
  const svg = svgDoc.documentElement;
  
  // Add metadata attributes
  svg.setAttribute('data-quantum-spatial', 'true');
  svg.setAttribute('data-processed-date', new Date().toISOString());
  
  if (styleUpdates.theme) {
    svg.setAttribute('data-theme', styleUpdates.theme);
  }
  
  if (styleUpdates.state) {
    svg.setAttribute('data-state', styleUpdates.state);
  }
  
  // Add namespace for quantum-spatial metadata
  svg.setAttribute('xmlns:qs', 'http://9bitstudios.com/quantum-spatial');
}

/**
 * Find SVGs in a directory that match a particular pattern
 * @param {string} directory - Directory to search
 * @param {string} pattern - File pattern to match
 * @returns {Promise<Array<string>>} - Array of file paths
 */
export async function findSVGFiles(directory, pattern = '**/*.svg') {
  try {
    // For a real implementation, you'd use a glob pattern matching library
    // Since we're simulating here, we'll just list all files and filter
    const allFiles = await recursiveReadDir(directory);
    
    // Simple pattern matching (for proper implementation, use glob)
    return allFiles.filter(file => {
      const fileName = path.basename(file);
      
      // Convert glob to regex pattern
      const regexPattern = pattern
        .replace(/\./g, '\\.')   // Escape dots
        .replace(/\*/g, '.*')    // Convert * to regex wildcard
        .replace(/\?/g, '.');    // Convert ? to regex single char
      
      return new RegExp('^' + regexPattern + '$').test(fileName);
    });
  } catch (error) {
    console.error('Error finding SVG files:', error);
    throw error;
  }
}

/**
 * Recursively read all files in a directory
 * @param {string} dir - Directory to read
 * @param {Array<string>} fileList - Accumulator for file list
 * @returns {Promise<Array<string>>} - Array of file paths
 */
async function recursiveReadDir(dir, fileList = []) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await recursiveReadDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Process SVGs by tier with specific style updates
 * @param {string} sourceDir - Source directory
 * @param {string} outputDir - Output directory
 * @returns {Promise<Object>} - Processing results
 */
export async function processSVGsByTier(sourceDir, outputDir = 'processed') {
  // Define tier configurations
  const tiers = {
    tier1: {
      pattern: '**/tier1/*.svg',
      styleUpdates: {
        colors: {
          primary: designTokens.colors.deepSpaceIndigo,
          accent: designTokens.colors.subtleCyan,
          secondary: designTokens.colors.dimensionalEggplant
        },
        states: {
          default: { opacity: 1.0 },
          hover: { opacity: 0.9, scale: 1.05 }
        },
        effects: {
          glow: { intensity: 2 }
        },
        theme: 'transitional'
      }
    },
    tier2: {
      pattern: '**/tier2/*.svg',
      styleUpdates: {
        colors: {
          primary: designTokens.colors.quantumViolet,
          accent: designTokens.colors.subtleCyan,
          secondary: designTokens.colors.ultraIndigo
        },
        states: {
          default: { opacity: 0.9 }
        },
        theme: 'quantum'
      }
    },
    tier3: {
      pattern: '**/tier3/*.svg',
      styleUpdates: {
        colors: {
          primary: designTokens.colors.heritageGreen,
          accent: designTokens.colors.heritagePixelGreen,
          secondary: designTokens.colors.heritageGreenDark
        },
        theme: 'heritage'
      }
    }
  };
  
  const results = {
    tier1: { processed: 0, errors: 0, files: [] },
    tier2: { processed: 0, errors: 0, files: [] },
    tier3: { processed: 0, errors: 0, files: [] }
  };
  
  // Process each tier
  for (const [tier, config] of Object.entries(tiers)) {
    // Find SVGs for this tier
    const svgFiles = await findSVGFiles(sourceDir, config.pattern);
    
    // Create tier-specific output directory
    const tierOutputDir = path.join(outputDir, tier);
    
    // Process SVGs
    if (svgFiles.length > 0) {
      const tierResults = await processSVGBatch(svgFiles, config.styleUpdates, tierOutputDir);
      
      // Count results
      results[tier].processed = tierResults.filter(r => r.status === 'processed').length;
      results[tier].errors = tierResults.filter(r => r.status === 'error').length;
      results[tier].files = tierResults.map(r => r.file);
    }
  }
  
  return results;
}

// Command line execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const sourceDir = process.argv[2];
  const outputDir = process.argv[3] || 'processed';

  if (!sourceDir) {
    console.error('Usage: node svg-batch-processor.js <sourceDir> [outputDir]');
    process.exit(1);
  }

  // Process SVGs by tier
  processSVGsByTier(sourceDir, outputDir)
    .then(results => {
      console.log('SVG processing complete:');
      for (const [tier, result] of Object.entries(results)) {
        console.log(`- ${tier}: ${result.processed} processed, ${result.errors} errors`);
      }
    })
    .catch(error => {
      console.error('Error processing SVGs:', error);
      process.exit(1);
    });
}