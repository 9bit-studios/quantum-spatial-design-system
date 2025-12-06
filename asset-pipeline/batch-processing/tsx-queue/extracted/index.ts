/**
 * Extracted Apple HIG Compliant Components
 * 
 * This directory contains all components extracted from the Enhanced Petersen Games Dashboard
 * and other layouts that follow Apple Human Interface Guidelines.
 * 
 * Components include:
 * - Apple HIG compliant navigation and UI elements
 * - Quantum-spatial design system components
 * - Gaming-specific visualization components
 * - E-commerce UI elements
 */

// Apple HIG Components
export { default as AppleNavigation } from './AppleNavigation';
export { default as MobileMenuToggle } from './MobileMenuToggle';

// Content Display Components
export { default as VimeoModule } from './VimeoModule';
export { default as ArtworkSpace } from './ArtworkSpace';

// Data Visualization Components
export { default as EnhancedStatCard } from './EnhancedStatCard';
export { default as EnhancedActivityFeed } from './EnhancedActivityFeed';

// Navigation Components
export { default as EcommerceSideMenu } from './EcommerceSideMenu';
export type { EcommerceMenuItem, EcommerceSideMenuProps } from './EcommerceSideMenu';
export { default as PetersenGamesSideMenu } from './PetersenGamesSideMenu';
export type { PetersenMenuItem, PetersenGamesSideMenuProps } from './PetersenGamesSideMenu';

// Quantum-Spatial Components
export { default as QuantumSpatialButton } from './QuantumSpatialButton';

// Re-export types and utilities
export type { 
  AppleNavigationProps,
  VimeoModuleProps,
  ArtworkSpaceProps,
  EnhancedStatCardProps,
  EnhancedActivityFeedProps,
  QuantumSpatialButtonProps
} from './types';

// Design System Core
export { 
  coreTokens, 
  computedStyles, 
  designUtils, 
  petersenTheme,
  type CoreTokens,
  type ComputedStyles,
  type DesignUtils,
  type PetersenTheme
} from './coreDesignTokens';

export { 
  DesignSystemProvider, 
  useDesignSystem,
  type DesignSystemContextType 
} from './DesignSystemProvider';

// Core UI Components
export { 
  Button, 
  Card, 
  Container, 
  Grid, 
  Flex,
  type ButtonProps,
  type CardProps,
  type ContainerProps,
  type GridProps,
  type FlexProps
} from './CoreUIComponents';

// Modular UI Components
export { 
  Navigation, 
  Carousel, 
  Filter,
  type NavigationProps,
  type NavigationItem,
  type CarouselProps,
  type FilterProps,
  type FilterCategory
} from './ModularUIComponents';

// Advanced Components
export { 
  GlassCard, 
  StaticGlassCard,
  type GlassCardProps 
} from './GlassCard';

export { 
  StatCard, 
  StaticStatCard,
  type StatCardProps 
} from './StatCard';

export { 
  FeatureCard, 
  StaticFeatureCard,
  type FeatureCardProps 
} from './FeatureCard';