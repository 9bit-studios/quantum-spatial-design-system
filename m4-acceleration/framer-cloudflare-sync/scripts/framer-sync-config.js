/**
 * Quantum-Spatial Design System - Framer Sync Configuration
 * Master configuration file for all Framer integration scripts
 */

module.exports = {
  // API endpoints
  api: {
    production: 'https://design-system.9bitstudios.io',
    staging: 'https://design-system-staging.9bitstudios.io'
  },
  
  // Default state
  defaultState: 'transitional',
  
  // Available states
  states: ['heritage', 'transitional', 'quantum', 'superposition'],
  
  // Default output directory
  defaultOutputDir: '../framer-output-production',
  
  // Component configuration
  components: {
    DesignSystemProvider: {
      name: 'DesignSystemProvider',
      description: 'Provides design system context and token access',
      required: true
    },
    QuantumPixel: {
      name: 'QuantumPixel',
      description: 'Base component with state transitions',
      required: true
    },
    DimensionalGrid: {
      name: 'DimensionalGrid',
      description: 'Spatial grid system component',
      required: true
    },
    PixelViewer: {
      name: 'PixelViewer',
      description: 'Interactive pixel viewer component',
      required: true
    },
    SamplePage: {
      name: 'SamplePage',
      description: 'Example implementation',
      required: false
    }
  },
  
  // API endpoints
  endpoints: {
    health: '/health',
    tokens: '/design-system/tokens',
    quantumPixel: '/quantum-pixel',
    dimensionalGrid: '/dimensional-grid',
    pixelViewer: '/pixel-viewer',
    components: '/framer-components',
    m4Optimization: '/m4-optimization'
  }
};