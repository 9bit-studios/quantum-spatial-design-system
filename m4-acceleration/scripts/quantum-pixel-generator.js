/**
 * 9Bit Studios Quantum-Spatial Design System
 * Quantum Pixel SVG Generator - M4-Optimized
 */

// Import design tokens
import { designTokens, designSystem } from './design-tokens.js';
import fs from 'fs/promises';
import path from 'path';
import { GRID, generateM4Grid } from './grid-utilities.js';
import { M4NeuralEngineInterface } from '../../apple-intelligence/m4-neural-engine/m4-neural-engine.js';

/**
 * Creates a quantum pixel SVG based on specified parameters
 * @param {Object} options - Configuration options
 * @param {number} options.size - Size of the pixel (1x, 2x, 3x, 4x multiplier of base size)
 * @param {string} options.state - State of the pixel (materialized, partial, energy, superposition)
 * @param {string} options.color - Primary color of the pixel
 * @param {string} options.accentColor - Accent color for glow effects and details
 * @param {number} options.borderRadius - Corner rounding value
 * @param {string} options.id - Optional unique identifier for the SVG
 * @returns {string} - SVG markup as a string
 */
export function createQuantumPixel({
  size = 32,
  state = 'materialized',
  color = designTokens.colors.dimensionalEggplant,
  accentColor = designTokens.colors.subtleCyan,
  borderRadius = 2,
  id = `pixel-${Date.now()}`,
}) {
  // Get state-specific properties from design tokens
  const props = designSystem.getStateProps(state);
  const uniqueId = id.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  
  // Calculate dimensions
  const centerX = size / 2;
  const centerY = size / 2;
  const innerSize = size * 0.8;
  const innerX = (size - innerSize) / 2;
  const innerY = (size - innerSize) / 2;
  
  // Generate SVG with design token parameters
  let svgString = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-${uniqueId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${props.glow * 4}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>`;

  // Add state-specific gradient definitions
  if (state === 'energy') {
    svgString += `
    <radialGradient id="energy-gradient-${uniqueId}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8"/>
      <stop offset="80%" stop-color="${color}" stop-opacity="${props.opacity}"/>
    </radialGradient>`;
  } else if (state === 'superposition') {
    svgString += `
    <linearGradient id="superposition-gradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="${color}" stop-opacity="${props.opacity}"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.6"/>
    </linearGradient>`;
  }
  
  // Close the defs section
  svgString += `
  </defs>`;
  
  // Create the base shape depending on state
  if (state === 'materialized') {
    // Solid materialized state
    svgString += `
  <rect 
    x="${borderRadius}" 
    y="${borderRadius}" 
    width="${size - borderRadius * 2}" 
    height="${size - borderRadius * 2}" 
    rx="${borderRadius}" 
    fill="${color}" 
    opacity="${props.opacity}"
    filter="url(#glow-${uniqueId})"
  />`;
  } 
  else if (state === 'partial') {
    // Partial materialized state with more transparency
    svgString += `
  <rect 
    x="${borderRadius}" 
    y="${borderRadius}" 
    width="${size - borderRadius * 2}" 
    height="${size - borderRadius * 2}" 
    rx="${borderRadius}" 
    fill="${color}" 
    opacity="${props.opacity}"
    filter="url(#glow-${uniqueId})"
  />
  <rect 
    x="${innerX + borderRadius}" 
    y="${innerY + borderRadius}" 
    width="${innerSize - borderRadius * 2}" 
    height="${innerSize - borderRadius * 2}" 
    rx="${borderRadius / 2}" 
    fill="${accentColor}" 
    opacity="${props.opacity * 0.3}"
  />`;
  } 
  else if (state === 'energy') {
    // Energy state with glow and pulse
    svgString += `
  <rect 
    x="${borderRadius}" 
    y="${borderRadius}" 
    width="${size - borderRadius * 2}" 
    height="${size - borderRadius * 2}" 
    rx="${borderRadius}" 
    fill="url(#energy-gradient-${uniqueId})" 
    filter="url(#glow-${uniqueId})"
  />
  <circle 
    cx="${centerX}" 
    cy="${centerY}" 
    r="${size / 4}" 
    fill="${accentColor}" 
    opacity="${props.opacity * 0.8}"
  />`;
  } 
  else if (state === 'superposition') {
    // Superposition state with layered effect
    for (let i = 0; i < props.layers; i++) {
      const offset = i * 2;
      const layerOpacity = props.opacity - (i * 0.15);
      
      svgString += `
  <rect 
    x="${borderRadius + offset}" 
    y="${borderRadius + offset}" 
    width="${size - (borderRadius + offset) * 2}" 
    height="${size - (borderRadius + offset) * 2}" 
    rx="${borderRadius}" 
    fill="${i === 0 ? `url(#superposition-gradient-${uniqueId})` : color}" 
    opacity="${layerOpacity}"
    ${i === 0 ? `filter="url(#glow-${uniqueId})"` : ''}
  />`;
    }
  }
  
  // Add state indicator
  if (state !== 'materialized') {
    const indicatorSize = size / 10;
    svgString += `
  <circle 
    cx="${size - indicatorSize * 1.5}" 
    cy="${size - indicatorSize * 1.5}" 
    r="${indicatorSize}" 
    fill="${accentColor}" 
    opacity="${props.opacity}"
  />`;
  }
  
  // Close SVG tag
  svgString += `
</svg>`;

  return svgString;
}

/**
 * Creates a collection of quantum pixels with different states and saves them
 * @param {string} outputDir - Directory to save the SVGs
 * @returns {Promise<Array>} - Array of created file paths
 */
export async function generateQuantumPixelSet(outputDir = 'foundation/quantum-pixels') {
  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Define the core pixel set
    const corePixels = [
      {
        state: 'materialized',
        color: designTokens.colors.deepSpaceIndigo,
        accentColor: designTokens.colors.subtleCyan,
        size: 32,
        filename: 'materialized-blue-base.svg'
      },
      {
        state: 'partial',
        color: designTokens.colors.dimensionalEggplant,
        accentColor: designTokens.colors.roseEnergy,
        size: 32,
        filename: 'partial-purple-base.svg'
      },
      {
        state: 'energy',
        color: designTokens.colors.quantumViolet,
        accentColor: designTokens.colors.quantumPulsePink,
        size: 32,
        filename: 'energy-violet-base.svg'
      },
      {
        state: 'superposition',
        color: designTokens.colors.heritageGreen,
        accentColor: designTokens.colors.heritagePixelGreen,
        size: 32,
        filename: 'superposition-green-base.svg'
      },
      // Multi-size examples
      {
        state: 'materialized',
        color: designTokens.colors.deepSpaceIndigo,
        accentColor: designTokens.colors.subtleCyan,
        size: 64,
        filename: 'materialized-blue-2x.svg'
      },
      {
        state: 'energy',
        color: designTokens.colors.quantumViolet,
        accentColor: designTokens.colors.quantumPulsePink,
        size: 64,
        filename: 'energy-violet-2x.svg'
      },
      // Additional examples to demonstrate variety
      {
        state: 'materialized',
        color: designTokens.colors.dimensionalTeal,
        accentColor: designTokens.colors.subtleSky,
        size: 32,
        filename: 'materialized-teal-base.svg'
      },
      {
        state: 'partial',
        color: designTokens.colors.ultraMarine,
        accentColor: designTokens.colors.subtleCyan,
        size: 32,
        filename: 'partial-marine-base.svg'
      }
    ];
    
    // Generate and save each pixel
    const results = [];
    
    for (const pixel of corePixels) {
      const svgContent = createQuantumPixel({
        size: pixel.size,
        state: pixel.state,
        color: pixel.color,
        accentColor: pixel.accentColor,
        id: path.basename(pixel.filename, '.svg')
      });
      
      const outputPath = path.join(outputDir, pixel.filename);
      await fs.writeFile(outputPath, svgContent);
      
      results.push({
        filename: pixel.filename,
        path: outputPath,
        state: pixel.state,
        size: pixel.size
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('Error generating quantum pixels:', error);
    throw error;
  }
}

/**
 * Generates a single quantum pixel SVG and saves it to a file
 * @param {Object} options - Pixel configuration
 * @param {string} outputPath - Path to save the SVG
 * @returns {Promise<string>} - Path to the saved file
 */
export async function generateSingleQuantumPixel(options, outputPath) {
  try {
    const svgContent = createQuantumPixel(options);
    
    // Create directory if it doesn't exist
    const directory = path.dirname(outputPath);
    await fs.mkdir(directory, { recursive: true });
    
    // Write the file
    await fs.writeFile(outputPath, svgContent);
    
    return outputPath;
  } catch (error) {
    console.error('Error generating quantum pixel:', error);
    throw error;
  }
}

// Command line execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // If this script is run directly, generate the core pixel set
  const outputDir = process.argv[2] || 'foundation/quantum-pixels';

  generateQuantumPixelSet(outputDir)
    .then(results => {
      console.log(`Generated ${results.length} quantum pixels in ${outputDir}`);
      results.forEach(pixel => {
        console.log(`- ${pixel.filename} (${pixel.state}, ${pixel.size}px)`);
      });
    })
    .catch(error => {
      console.error('Failed to generate quantum pixels:', error);
      process.exit(1);
    });
}
