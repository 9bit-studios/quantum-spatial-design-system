/**
 * 9Bit Studios Quantum-Spatial Design System
 * Dimensional Grid SVG Generator - M4-Optimized
 */

// Import design tokens
import { designTokens, designSystem } from './design-tokens.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Creates a dimensional grid SVG based on specified parameters
 * @param {Object} options - Configuration options
 * @param {string} options.type - Type of grid (background, navigation, distortion)
 * @param {number} options.width - Width of the grid
 * @param {number} options.height - Height of the grid
 * @param {number} options.opacity - Base opacity for grid lines
 * @param {number} options.cellSize - Size of grid cells
 * @param {number} options.perspective - Perspective intensity (0-1)
 * @param {string} options.color - Primary color for grid lines
 * @param {string} options.secondaryColor - Secondary color for grid lines/accents
 * @param {string} options.id - Optional unique identifier for the SVG
 * @returns {string} - SVG markup as a string
 */
export function createDimensionalGrid({
  type = 'background',
  width = 1200,
  height = 800,
  opacity = 0.15,
  cellSize = 32,
  perspective = 0.2,
  color = designTokens.colors.subtleCyan,
  secondaryColor = designTokens.colors.dimensionalEggplant,
  id = `grid-${Date.now()}`
}) {
  // Get grid config from design tokens
  const gridProps = designSystem.getGridProps(type);
  const uniqueId = id.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  
  // Apply grid-specific properties with fallbacks
  const finalOpacity = opacity || gridProps.opacity;
  const finalCellSize = cellSize || gridProps.cellSize;
  const finalColor = color || gridProps.lineColor;
  
  // Calculate grid properties
  const rowCount = Math.ceil(height / finalCellSize) + 1;
  const columnCount = Math.ceil(width / finalCellSize) + 1;
  
  // Generate SVG content based on type
  let svgString = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>`;
  
  // Add type-specific gradient/filter definitions
  if (type === 'background' || type === 'navigation') {
    svgString += `
    <linearGradient id="grid-fade-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${finalColor}" stop-opacity="${finalOpacity * 1.5}"/>
      <stop offset="50%" stop-color="${finalColor}" stop-opacity="${finalOpacity}"/>
      <stop offset="100%" stop-color="${finalColor}" stop-opacity="${finalOpacity * 0.5}"/>
    </linearGradient>
    <filter id="grid-glow-${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${finalOpacity * 10}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>`;
  } else if (type === 'distortion') {
    svgString += `
    <linearGradient id="distortion-gradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${finalColor}" stop-opacity="${finalOpacity * 1.2}"/>
      <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="${finalOpacity}"/>
    </linearGradient>`;
  }
  
  // Close defs section
  svgString += `
  </defs>`;
  
  // Create grid based on type
  if (type === 'background') {
    // Perspective background grid
    const perspectiveRotation = 60 * (perspective || gridProps.perspective);
    const perspectiveScale = 2 * (perspective || gridProps.scale);
    
    svgString += `
  <g class="perspective-grid" transform="scale(${perspectiveScale}) rotate3d(1, 0, 0, ${perspectiveRotation}deg)" transform-origin="center bottom">
    <!-- Horizontal lines -->`;
    
    for (let i = 0; i <= rowCount; i++) {
      const yPos = i * finalCellSize;
      svgString += `
    <line x1="0" y1="${yPos}" x2="${width}" y2="${yPos}" stroke="url(#grid-fade-${uniqueId})" stroke-width="1"/>`;
    }
    
    svgString += `
    <!-- Vertical lines -->`;
    
    for (let i = 0; i <= columnCount; i++) {
      const xPos = i * finalCellSize;
      svgString += `
    <line x1="${xPos}" y1="0" x2="${xPos}" y2="${height}" stroke="url(#grid-fade-${uniqueId})" stroke-width="1"/>`;
    }
    
    svgString += `
  </g>`;
  } 
  else if (type === 'navigation') {
    // Navigation grid with emphasis lines
    const perspectiveRotation = 40 * (perspective || gridProps.perspective);
    const perspectiveScale = 1.5 * (perspective || gridProps.scale);
    
    svgString += `
  <g class="navigation-grid" transform="scale(${perspectiveScale}) rotate3d(1, 0, 0, ${perspectiveRotation}deg)" transform-origin="center bottom">
    <!-- Horizontal lines -->`;
    
    for (let i = 0; i <= rowCount; i++) {
      const yPos = i * finalCellSize;
      const isEmphasis = i % 4 === 0;
      const opacity = isEmphasis ? finalOpacity * 2 : finalOpacity;
      const strokeWidth = isEmphasis ? 1.5 : 1;
      
      svgString += `
    <line x1="0" y1="${yPos}" x2="${width}" y2="${yPos}" stroke="${finalColor}" stroke-opacity="${opacity}" stroke-width="${strokeWidth}"/>`;
    }
    
    svgString += `
    <!-- Vertical lines -->`;
    
    for (let i = 0; i <= columnCount; i++) {
      const xPos = i * finalCellSize;
      const isEmphasis = i % 4 === 0;
      const opacity = isEmphasis ? finalOpacity * 2 : finalOpacity;
      const strokeWidth = isEmphasis ? 1.5 : 1;
      
      svgString += `
    <line x1="${xPos}" y1="0" x2="${xPos}" y2="${height}" stroke="${finalColor}" stroke-opacity="${opacity}" stroke-width="${strokeWidth}"/>`;
    }
    
    // Add accent points at intersections
    svgString += `
    <!-- Accent points at major intersections -->`;
    
    for (let i = 0; i <= rowCount; i += 4) {
      for (let j = 0; j <= columnCount; j += 4) {
        const xPos = j * finalCellSize;
        const yPos = i * finalCellSize;
        
        svgString += `
    <circle cx="${xPos}" cy="${yPos}" r="2" fill="${secondaryColor}" fill-opacity="0.4" filter="url(#grid-glow-${uniqueId})"/>`;
      }
    }
    
    svgString += `
  </g>`;
  } 
  else if (type === 'distortion') {
    // Distortion grid with skew
    const skewX = gridProps.skewX || 10;
    const skewY = gridProps.skewY || 5;
    
    svgString += `
  <g class="distortion-grid" transform="skew(${skewX}deg, ${skewY}deg)">
    <!-- Horizontal lines -->`;
    
    for (let i = 0; i <= rowCount; i++) {
      const yPos = i * finalCellSize;
      svgString += `
    <line x1="0" y1="${yPos}" x2="${width}" y2="${yPos}" stroke="url(#distortion-gradient-${uniqueId})" stroke-width="1"/>`;
    }
    
    svgString += `
    <!-- Vertical lines -->`;
    
    for (let i = 0; i <= columnCount; i++) {
      const xPos = i * finalCellSize;
      svgString += `
    <line x1="${xPos}" y1="0" x2="${xPos}" y2="${height}" stroke="url(#distortion-gradient-${uniqueId})" stroke-width="1"/>`;
    }
    
    // Add some distortion noise elements
    svgString += `
    <!-- Distortion elements -->`;
    
    for (let i = 0; i < 5; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = x1 + (Math.random() * 100 - 50);
      const y2 = y1 + (Math.random() * 100 - 50);
      
      svgString += `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${secondaryColor}" stroke-opacity="${finalOpacity * 1.5}" stroke-width="1.5"/>`;
    }
    
    svgString += `
  </g>`;
  }
  
  // Close SVG tag
  svgString += `
</svg>`;

  return svgString;
}

/**
 * Creates a collection of dimensional grids and saves them
 * @param {string} outputDir - Directory to save the SVGs
 * @returns {Promise<Array>} - Array of created file paths
 */
export async function generateDimensionalGridSet(outputDir = 'foundation/grid-systems') {
  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Define the core grid set
    const coreGrids = [
      {
        type: 'background',
        width: 1200,
        height: 800,
        opacity: 0.1,
        cellSize: 32,
        color: designTokens.colors.subtleCyan,
        secondaryColor: designTokens.colors.dimensionalEggplant,
        filename: 'background-perspective-grid.svg'
      },
      {
        type: 'navigation',
        width: 1200,
        height: 800,
        opacity: 0.15,
        cellSize: 24,
        color: designTokens.colors.subtleCyan,
        secondaryColor: designTokens.colors.dimensionalEggplant,
        filename: 'navigation-perspective-grid.svg'
      },
      {
        type: 'distortion',
        width: 1200,
        height: 800,
        opacity: 0.12,
        cellSize: 20,
        color: designTokens.colors.roseEnergy,
        secondaryColor: designTokens.colors.quantumViolet,
        filename: 'distortion-skew-grid.svg'
      },
      // Additional examples with heritage colors
      {
        type: 'background',
        width: 1200,
        height: 800,
        opacity: 0.08,
        cellSize: 32,
        color: designTokens.colors.heritagePixelGreen,
        secondaryColor: designTokens.colors.heritageGreen,
        filename: 'heritage-background-grid.svg'
      },
      {
        type: 'navigation',
        width: 1200,
        height: 800,
        opacity: 0.12,
        cellSize: 24,
        color: designTokens.colors.heritagePixelGreen,
        secondaryColor: designTokens.colors.heritageGreenDark,
        filename: 'heritage-navigation-grid.svg'
      },
      // Quantum state grid
      {
        type: 'distortion',
        width: 1200,
        height: 800,
        opacity: 0.15,
        cellSize: 16,
        color: designTokens.colors.quantumPulsePink,
        secondaryColor: designTokens.colors.quantumViolet,
        filename: 'quantum-distortion-grid.svg'
      },
    ];
    
    // Generate and save each grid
    const results = [];
    
    for (const grid of coreGrids) {
      const svgContent = createDimensionalGrid({
        type: grid.type,
        width: grid.width,
        height: grid.height,
        opacity: grid.opacity,
        cellSize: grid.cellSize,
        color: grid.color,
        secondaryColor: grid.secondaryColor,
        id: path.basename(grid.filename, '.svg')
      });
      
      const outputPath = path.join(outputDir, grid.filename);
      await fs.writeFile(outputPath, svgContent);
      
      results.push({
        filename: grid.filename,
        path: outputPath,
        type: grid.type,
        dimensions: `${grid.width}x${grid.height}`
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('Error generating dimensional grids:', error);
    throw error;
  }
}

/**
 * Generates a single dimensional grid SVG and saves it to a file
 * @param {Object} options - Grid configuration
 * @param {string} outputPath - Path to save the SVG
 * @returns {Promise<string>} - Path to the saved file
 */
export async function generateSingleDimensionalGrid(options, outputPath) {
  try {
    const svgContent = createDimensionalGrid(options);
    
    // Create directory if it doesn't exist
    const directory = path.dirname(outputPath);
    await fs.mkdir(directory, { recursive: true });
    
    // Write the file
    await fs.writeFile(outputPath, svgContent);
    
    return outputPath;
  } catch (error) {
    console.error('Error generating dimensional grid:', error);
    throw error;
  }
}

// Command line execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // If this script is run directly, generate the core grid set
  const outputDir = process.argv[2] || 'foundation/grid-systems';

  generateDimensionalGridSet(outputDir)
    .then(results => {
      console.log(`Generated ${results.length} dimensional grids in ${outputDir}`);
      results.forEach(grid => {
        console.log(`- ${grid.filename} (${grid.type}, ${grid.dimensions})`);
      });
    })
    .catch(error => {
      console.error('Failed to generate dimensional grids:', error);
      process.exit(1);
    });
}