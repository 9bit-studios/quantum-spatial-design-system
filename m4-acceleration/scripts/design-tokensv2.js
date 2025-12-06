/**
 * M4-Optimized Quantum-Spatial Design System Tokens
 * 
 * This file provides a centralized access point to design tokens
 * used throughout the Quantum-Spatial Design System.
 */

// Define the core color system
const colors = {
  // Base colors
  base: {
    voidBlack: '#0A0621',
    deepSpaceIndigo: '#131A36',
    ultraIndigo: '#1E1F5C',
    dimensionalEggplant: '#331F4A',
    midnightRichness: '#0D0D15',
    quantumViolet: '#6A3093',
  },
  
  // Accent colors
  accent: {
    subtleAqua: '#06D6A0',
    subtleCyan: '#5AC8FA',
    dimensionalTeal: '#126D71',
    roseEnergy: '#BF4080',
    quantumPulsePink: '#FF2D55',
  },

  // Heritage state (8-bit inspired)
  heritage: {
    primary: '#2C5F2D',         // Base color
    secondary: '#1B3D1A',       // Shadow color
    accent: '#3DFF74',          // Highlight color
    background: '#0A0621',      // Background
    text: '#FFFFFF',            // Text color
    glow: 4,                    // Glow size
  },

  // Transitional state (emerging dimension)
  transitional: {
    primary: '#331F4A',         // Base color (Dimensional Eggplant)
    secondary: '#1E1F5C',       // Shadow color (Ultra Indigo)
    accent: '#5AC8FA',          // Highlight color (Subtle Cyan)
    background: '#0A0621',      // Background (Void Black)
    text: '#FFFFFF',            // Text color
    glow: 6,                    // Glow size
  },

  // Quantum state (fully dimensional)
  quantum: {
    primary: '#6A3093',         // Base color (Quantum Violet)
    secondary: '#331F4A',       // Shadow color (Dimensional Eggplant)
    accent: '#BF4080',          // Highlight color (Rose Energy)
    background: '#0A0621',      // Background (Void Black)
    text: '#FFFFFF',            // Text color
    glow: 8,                    // Glow size
  },

  // Superposition state (overlapping quantum states)
  superposition: {
    primary: '#6A3093',         // Base color (Quantum Violet)
    secondary: '#5AC8FA',       // Shadow color (Subtle Cyan)
    accent: '#FF2D55',          // Highlight color (Quantum Pulse Pink)
    background: '#0A0621',      // Background (Void Black)
    text: '#FFFFFF',            // Text color
    glow: 10,                   // Glow size
  }
};

// Define spacing tokens
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Define typography tokens
const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px'
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8
  }
};

// Define border radius tokens
const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  round: '50%'
};

// Define shadow tokens
const shadow = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
};

// Define animation tokens
const animation = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  },
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms'
  }
};

// Define grid system tokens
const grid = {
  columns: 12,
  gutter: spacing.md,
  margin: spacing.lg,
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  }
};

// Define pixel system tokens
const pixelSystem = {
  sizes: {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 96
  },
  borderRadius: {
    heritage: 2,
    transitional: 4,
    quantum: 6,
    superposition: 8
  },
  states: ['heritage', 'transitional', 'quantum', 'superposition'],
  defaultState: 'transitional'
};

// M4 Optimization settings
const m4Optimization = {
  rendering: {
    metalEnabled: true,
    neuralEngineEnabled: true,
    coreMLEnabled: true,
    msaaLevel: 4,
    preferredColorSpace: 'displayP3',
    memoryOptimizationLevel: 'balanced'
  },
  animation: {
    useDisplayLink: true,
    preferredFrameRate: 60,
    dynamicFrameRate: true,
    useMetalForOffScreenRendering: true
  },
  image: {
    downsampleLargeImages: true,
    useHardwareAcceleration: true,
    cacheImages: true,
    lazyLoadOffScreen: true
  }
};

// Export all tokens
module.exports = {
  color: colors,
  spacing,
  typography,
  borderRadius,
  shadow,
  animation,
  grid,
  pixelSystem,
  m4Optimization
};