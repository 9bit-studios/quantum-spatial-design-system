// Quantum-Spatial Design System Components
// Apple HIG Compliant Components for Petersen Games
// Enhanced with M4 Neural Engine optimizations

export { QuantumSpatialButton } from './QuantumSpatialButton';
export { QuantumSpatialCard } from './QuantumSpatialCard';
export { QuantumSpatialNavigation } from './QuantumSpatialNavigation';
export { QuantumSpatialInput } from './QuantumSpatialInput';
export { PetersenProductCard } from './PetersenProductCard';

// Type exports
export type { default as QuantumSpatialButtonProps } from './QuantumSpatialButton';
export type { default as QuantumSpatialCardProps } from './QuantumSpatialCard';
export type { default as QuantumSpatialNavigationProps } from './QuantumSpatialNavigation';
export type { default as QuantumSpatialInputProps } from './QuantumSpatialInput';
export type { default as PetersenProductCardProps } from './PetersenProductCard';

// Design System Information
export const QUANTUM_SPATIAL_VERSION = '2.0.0';
export const DESIGN_SYSTEM_INFO = {
  name: 'Quantum-Spatial Design System',
  version: QUANTUM_SPATIAL_VERSION,
  target: 'Petersen Games',
  compliance: 'Apple HIG',
  optimization: 'M4 Neural Engine',
  framework: 'React + Next.js',
  deployment: 'Vercel',
  status: 'Production Ready'
} as const;