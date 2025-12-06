/**
 * 9Bit Studios Quantum-Spatial Design System
 * useDesignSystem Hook - TypeScript Version
 *
 * Custom hook to access the design system context in React components
 * Enhanced with Strategic Director state management and M4 optimization
 */

import { useContext } from 'react';
import { DesignSystemContext, DesignSystemContextType } from '../DesignSystemProvider';

/**
 * Design System State Types
 */
export type DesignSystemState = 'heritage' | 'transitional' | 'quantum';

/**
 * Design System Color Tokens
 */
export interface ColorTokens {
  // Deep Space Colors
  voidBlack: string;
  nebulaIndigo: string;
  twilightBlue: string;
  midnightPurple: string;
  dimensionalEggplant: string;

  // Quantum Glow
  quantumBlue: string;
  stellarCyan: string;
  quantumViolet: string;
  cosmicMagenta: string;
  energyGold: string;

  // Glass Surfaces
  ultraGlass: string;
  frostGlass: string;
  liquidGlass: string;
  crystalGlass: string;
}

/**
 * Design System Animation Tokens
 */
export interface AnimationTokens {
  // Durations
  instant: string;
  fast: string;
  medium: string;
  slow: string;

  // Easings
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  linear: string;

  // Quantum effects
  quantumPulse: string;
  dimensionalShift: string;
}

/**
 * Design System Typography Tokens
 */
export interface TypographyTokens {
  // Font families (Apple SF Pro)
  displayFont: string;
  textFont: string;
  monoFont: string;

  // Font sizes
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;

  // Font weights
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

/**
 * Design System Token Access
 */
export interface DesignSystemTokens {
  colors: ColorTokens;
  animations: AnimationTokens;
  typography: TypographyTokens;
}

/**
 * Hook to access design system context
 *
 * Provides access to:
 * - Current state (heritage, transitional, quantum)
 * - State setter function
 * - M4 capability detection
 * - Token access functions
 * - Color utility functions
 * - Strategic Director performance optimization
 */
export function useDesignSystem(): DesignSystemContextType {
  const context = useContext(DesignSystemContext);

  // Throw an error if used outside of provider
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }

  return context;
}

/**
 * Utility hook for quick state checks
 */
export function useDesignSystemState(): DesignSystemState {
  const { state } = useDesignSystem();
  return state;
}

/**
 * Utility hook for M4 capability
 */
export function useM4Capability(): boolean {
  const { isM4Capable } = useDesignSystem();
  return isM4Capable;
}

/**
 * Utility hook for performance mode
 */
export function usePerformanceMode(): 'high' | 'medium' | 'low' {
  const { performanceMode } = useDesignSystem();
  return performanceMode || 'medium';
}

export default useDesignSystem;
