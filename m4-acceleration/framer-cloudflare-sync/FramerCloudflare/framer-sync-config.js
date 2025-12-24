/**
 * Configuration for Framer Design System Integration
 * Updated: May 19, 2025
 */

module.exports = {
  // Framer Project Details
  framer: {
    projectId: '2zdSRIm4V5ndhHJ2IUDw',
    projectUrl: 'https://framer.com/projects/9Bit-Quantum-Spatial-Design-System--2zdSRIm4V5ndhHJ2IUDw'
  },
  
  // Cloudflare Worker Configuration
  cloudflare: {
    workerUrl: 'https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev',
    apiPath: '/design-system/tokens'
  },
  
  // Design System Paths
  paths: {
    tokensPath: '/Users/pennyplatt//M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens',
    componentsPath: '/Users/pennyplatt//M4-Optimized Quantum-Spatial Pixel Design System Acceleration/components/core'
  },
  
  // Design System States
  designSystemStates: ['heritage', 'transitional', 'quantum', 'superposition'],
  defaultState: 'transitional',
  
  // Components to synchronize
  coreComponents: [
    'QuantumPixel',
    'DimensionalGrid',
    'PixelViewer'
  ]
};