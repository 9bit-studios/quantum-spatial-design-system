// Foundation Components - Clean exports

// Core Layout & Typography
export * from './GridSystem';
export * from './Typography';

// Navigation & Flow
export * from './ModernNavigation';
export * from './AnimatedComponents';

// E-commerce System
export * from './EcommerceFlow';
export * from './FilterModal';
export * from './ProductDetail';
export * from './CheckoutFlow';

// Pages & Views
export * from './SearchResults';
export * from './CategoryPages';

// Performance & Utilities
export * from './LazyComponents';
export * from './PerformanceComponents';

// Responsive utilities (only specific exports to avoid conflicts)
export { 
  useResponsiveGrid,
  useTouchDevice,
  useViewportHeight,
  usePrefersReducedMotion
} from './ResponsiveHooks';

// Lazy Component Wrappers
export {
  LazyFilterModalWrapper,
  LazyProductDetailWrapper,
  LazyCheckoutFlowWrapper,
  useCodeSplitting
} from './LazyComponents';