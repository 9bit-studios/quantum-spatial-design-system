/**
 * 9Bit Studios Quantum-Spatial Design System
 * Core Index File - M4-Optimized
 * 
 * This file serves as the main entry point for the Quantum-Spatial Design System,
 * providing access to all the core components and utilities needed to implement
 * the design system in various projects.
 */

// Import all design system components
import { designTokens, designSystem } from './design-tokens.js';
import { createQuantumPixel, generateQuantumPixelSet, generateSingleQuantumPixel } from './quantum-pixel-generator.js';
import { createDimensionalGrid, generateDimensionalGridSet, generateSingleDimensionalGrid } from './dimensional-grid-generator.js';
import { processSVGBatch, applySVGStyles, findSVGFiles, processSVGsByTier } from './svg-batch-processor.js';

// Utility function to generate all core assets
export async function generateAllCoreAssets(outputDir = 'foundation') {
  try {
    console.log('Generating Quantum-Spatial Design System core assets...');

    // Create necessary directories
    const pixelOutputDir = `${outputDir}/quantum-pixels`;
    const gridOutputDir = `${outputDir}/grid-systems`;

    // Generate quantum pixels
    console.log('Generating quantum pixels...');
    const pixelResults = await generateQuantumPixelSet(pixelOutputDir);
    console.log(`Generated ${pixelResults.length} quantum pixels in ${pixelOutputDir}`);

    // Generate dimensional grids
    console.log('Generating dimensional grids...');
    const gridResults = await generateDimensionalGridSet(gridOutputDir);
    console.log(`Generated ${gridResults.length} dimensional grids in ${gridOutputDir}`);

    return {
      pixels: pixelResults,
      grids: gridResults
    };
  } catch (error) {
    console.error('Error generating core assets:', error);
    throw error;
  }
}

// Export all components for use in other modules
export {
  // Design Tokens
  designTokens,
  designSystem,

  // Quantum Pixel Generators
  createQuantumPixel,
  generateQuantumPixelSet,
  generateSingleQuantumPixel,

  // Dimensional Grid Generators
  createDimensionalGrid,
  generateDimensionalGridSet,
  generateSingleDimensionalGrid,

  // SVG Processing Utilities
  processSVGBatch,
  applySVGStyles,
  findSVGFiles,
  processSVGsByTier
};

// Command line execution with description of available functionality
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`
  9Bit Studios Quantum-Spatial Design System - M4-Optimized
  =======================================================

  This module provides the following functionality:

  1. Design Tokens - Access to color variables, spacing, typography, and other design tokens
     Usage: import { designTokens } from './scripts/index.js';

  2. Quantum Pixel Generator - Create quantum pixels with different states and properties
     Usage: import { createQuantumPixel } from './scripts/index.js';

  3. Dimensional Grid Generator - Create dimensional grids for various UI backgrounds
     Usage: import { createDimensionalGrid } from './scripts/index.js';

  4. SVG Batch Processor - Process existing SVGs to follow the quantum-spatial design system
     Usage: import { processSVGBatch } from './scripts/index.js';

  5. Generate all core assets at once with:
     node scripts/index.js generate-all [outputDir]

  For more information, refer to the documentation in the Implementation Guide.
  `);

  // Check for command line arguments
  const command = process.argv[2];
  const outputDir = process.argv[3] || 'foundation';

  if (command === 'generate-all') {
    console.log(`Generating all core assets in directory: ${outputDir}`);

    generateAllCoreAssets(outputDir)
      .then(results => {
        console.log('Core assets generated successfully:');
        console.log(`- ${results.pixels.length} quantum pixels`);
        console.log(`- ${results.grids.length} dimensional grids`);
        console.log('Generation complete!');
      })
      .catch(error => {
        console.error('Error generating core assets:', error);
        process.exit(1);
      });
  }
}