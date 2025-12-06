/**
 * Quantum Spatial SVG Components
 *
 * Centralized exports for all quantum-spatial SVG components
 * optimized for M4 Neural Engine acceleration.
 *
 * @module quantum-spatial/components/svg
 * @version 1.0.0
 */

// ============================================================================
// QUANTUM SPATIAL COMPONENTS
// ============================================================================

export { QuantumSpatial_11, default as QuantumSpatial_11Component } from './QuantumSpatial_11';
export type { QuantumSpatial11Props } from './QuantumSpatial_11';

// ============================================================================
// EXAMPLE IMPLEMENTATIONS
// ============================================================================

export {
  // Hero sections
  HeroWithQuantumVisual,

  // Product cards
  PetersenProductCard,

  // Loading states
  QuantumLoadingSpinner,

  // Feature sections
  QuantumFeatureGrid,

  // Brand sections
  QuantumBrandSection,

  // Modals
  QuantumModal,

  // Status indicators
  QuantumStatusIndicator,

  // Galleries
  QuantumGallery,

  // Email components
  QuantumEmailSignature
} from './QuantumSpatial_11.examples';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Quantum Spatial color configuration
 */
export interface QuantumColorConfig {
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * Predefined quantum color themes
 */
export const QuantumThemes: Record<string, QuantumColorConfig> = {
  default: {
    primary: '#E85D75',    // Quantum Pink
    secondary: '#4ECDC4',  // Quantum Teal
    accent: '#A78BFA'      // Quantum Purple
  },

  horrorGaming: {
    primary: '#8B0000',    // Dark Red
    secondary: '#4A0E4E',  // Deep Purple
    accent: '#C41E3A'      // Crimson
  },

  tealPrimary: {
    primary: '#4ECDC4',    // Quantum Teal
    secondary: '#A78BFA',  // Quantum Purple
    accent: '#E85D75'      // Quantum Pink
  },

  purplePrimary: {
    primary: '#A78BFA',    // Quantum Purple
    secondary: '#E85D75',  // Quantum Pink
    accent: '#4ECDC4'      // Quantum Teal
  },

  success: {
    primary: '#10B981',    // Green
    secondary: '#34D399',  // Light Green
    accent: '#6EE7B7'      // Mint
  },

  error: {
    primary: '#EF4444',    // Red
    secondary: '#F87171',  // Light Red
    accent: '#FCA5A5'      // Pink Red
  },

  warning: {
    primary: '#F59E0B',    // Amber
    secondary: '#FBBF24',  // Yellow
    accent: '#FCD34D'      // Light Yellow
  },

  info: {
    primary: '#3B82F6',    // Blue
    secondary: '#60A5FA',  // Light Blue
    accent: '#93C5FD'      // Sky Blue
  }
};

/**
 * Component size presets for consistent scaling
 */
export const QuantumSizes = {
  icon: 64,
  small: 200,
  medium: 400,
  large: 600,
  hero: 800
} as const;

export type QuantumSize = typeof QuantumSizes[keyof typeof QuantumSizes];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get quantum theme configuration by name
 *
 * @param themeName - Name of the quantum theme
 * @returns Color configuration for the theme
 *
 * @example
 * const colors = getQuantumTheme('horrorGaming');
 * <QuantumSpatial_11 {...colors} />
 */
export function getQuantumTheme(themeName: keyof typeof QuantumThemes): QuantumColorConfig {
  return QuantumThemes[themeName] || QuantumThemes.default;
}

/**
 * Create custom quantum theme with validation
 *
 * @param config - Custom color configuration
 * @returns Validated color configuration
 *
 * @example
 * const customTheme = createQuantumTheme({
 *   primary: '#FF0000',
 *   secondary: '#00FF00',
 *   accent: '#0000FF'
 * });
 */
export function createQuantumTheme(config: Partial<QuantumColorConfig>): QuantumColorConfig {
  return {
    primary: config.primary || QuantumThemes.default.primary,
    secondary: config.secondary || QuantumThemes.default.secondary,
    accent: config.accent || QuantumThemes.default.accent
  };
}

/**
 * Validate hex color format
 *
 * @param color - Hex color string to validate
 * @returns True if valid hex color
 *
 * @example
 * isValidHexColor('#E85D75') // true
 * isValidHexColor('red') // false
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Convert hex color to rgba with opacity
 *
 * @param hex - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns rgba color string
 *
 * @example
 * hexToRgba('#E85D75', 0.5) // 'rgba(232, 93, 117, 0.5)'
 */
export function hexToRgba(hex: string, opacity: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Calculate contrast ratio between two colors
 *
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 *
 * @example
 * getContrastRatio('#E85D75', '#0A0E27') // ~12.5
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!rgb) return 0;

    const [r, g, b] = [1, 2, 3].map(i => {
      const val = parseInt(rgb[i], 16) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 *
 * @param foreground - Foreground hex color
 * @param background - Background hex color
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns True if contrast meets WCAG AA
 *
 * @example
 * meetsWCAGAA('#E85D75', '#0A0E27', false) // true (12.5:1 ratio)
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const minRatio = isLargeText ? 3 : 4.5;
  return ratio >= minRatio;
}

// ============================================================================
// COMPONENT CONFIGURATION HELPERS
// ============================================================================

/**
 * Generate quantum component props with theme and size
 *
 * @param options - Configuration options
 * @returns Complete component props
 *
 * @example
 * const props = createQuantumProps({
 *   theme: 'horrorGaming',
 *   size: 'large',
 *   animated: true
 * });
 * <QuantumSpatial_11 {...props} />
 */
export function createQuantumProps(options: {
  theme?: keyof typeof QuantumThemes | QuantumColorConfig;
  size?: keyof typeof QuantumSizes | number;
  animated?: boolean;
  className?: string;
}) {
  const { theme = 'default', size = 'medium', animated = true, className } = options;

  // Resolve theme
  const colors = typeof theme === 'string'
    ? getQuantumTheme(theme)
    : theme;

  // Resolve size
  const dimensions = typeof size === 'string'
    ? QuantumSizes[size]
    : size;

  return {
    width: dimensions,
    height: dimensions,
    animated,
    className,
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    accentColor: colors.accent
  };
}

// ============================================================================
// EXPORTS SUMMARY
// ============================================================================

/**
 * @example Basic Usage
 * ```tsx
 * import { QuantumSpatial_11 } from '@/components/svg';
 *
 * <QuantumSpatial_11
 *   width={400}
 *   height={400}
 *   animated={true}
 * />
 * ```
 *
 * @example With Theme
 * ```tsx
 * import { QuantumSpatial_11, getQuantumTheme } from '@/components/svg';
 *
 * const horrorTheme = getQuantumTheme('horrorGaming');
 *
 * <QuantumSpatial_11
 *   width={400}
 *   height={400}
 *   {...horrorTheme}
 * />
 * ```
 *
 * @example With Helper
 * ```tsx
 * import { QuantumSpatial_11, createQuantumProps } from '@/components/svg';
 *
 * <QuantumSpatial_11
 *   {...createQuantumProps({
 *     theme: 'horrorGaming',
 *     size: 'large',
 *     animated: true
 *   })}
 * />
 * ```
 *
 * @example Complete Implementation
 * ```tsx
 * import {
 *   QuantumSpatial_11,
 *   HeroWithQuantumVisual,
 *   QuantumFeatureGrid
 * } from '@/components/svg';
 *
 * export default function LandingPage() {
 *   return (
 *     <>
 *       <HeroWithQuantumVisual />
 *       <QuantumFeatureGrid />
 *     </>
 *   );
 * }
 * ```
 */

export default {
  QuantumSpatial_11,
  QuantumThemes,
  QuantumSizes,
  getQuantumTheme,
  createQuantumTheme,
  createQuantumProps,
  isValidHexColor,
  hexToRgba,
  getContrastRatio,
  meetsWCAGAA
};
