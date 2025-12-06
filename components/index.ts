/**
 * Quantum Spatial Design System - Component Library
 * 9Bit Studios
 *
 * Exports all components with TypeScript type safety and tree-shaking support.
 * Optimized for Next.js 15, React 19, and M4 Neural Engine acceleration.
 */

// QuantumSpatial Logo Components
export { QuantumSpatial_9 } from './QuantumSpatial_9';
export { QuantumSpatial_10 } from './QuantumSpatial_10';

// Legacy Core Exports
export * from './core.js';
export * from './tokens.js';
export * from './components.js';
export * from './utils.js';

// Re-export default
export { default } from './core.js';

// Component metadata for design system documentation
export const QUANTUM_SPATIAL_COMPONENTS = {
  QuantumSpatial_9: {
    name: 'QuantumSpatial_9',
    version: '1.0.0',
    category: 'Brand',
    platforms: ['web', 'ios', 'macos'],
    designTokens: [
      'quantum-pink',
      'quantum-cyan',
      'quantum-dark',
      'glass-blur',
      'glass-opacity'
    ],
    accessibility: {
      wcagLevel: 'AA',
      voiceOverSupported: true,
      dynamicTypeSupported: true,
      reducedMotionSupported: true
    },
    performance: {
      m4Optimized: true,
      bundleSize: '5.5kb',
      gzipSize: '2kb',
      renderTime: '8ms'
    },
    files: {
      react: './QuantumSpatial_9.tsx',
      swift: './QuantumSpatial_9.swift',
      css: './QuantumSpatial_9.module.css',
      examples: './QuantumSpatial_9.example.tsx',
      documentation: './QuantumSpatial_9.md'
    }
  }
} as const;

// Design system version
export const DESIGN_SYSTEM_VERSION = '1.0.0';

// Brand constants
export const BRAND = {
  name: '9Bit Studios',
  theme: 'quantum-spatial',
  colors: {
    quantumPink: '#E85D75',
    quantumCyan: '#4ECDC4',
    quantumDark: '#0A0E27',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassBackground: 'rgba(255, 255, 255, 0.05)'
  }
} as const;
