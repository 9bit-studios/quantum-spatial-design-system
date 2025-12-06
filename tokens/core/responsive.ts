/**
 * RESPONSIVE TOKENS
 * Breakpoints and Container Queries
 */

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const containerSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
} as const;

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,

  // Device-specific
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',

  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',

  // Feature queries
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
} as const;

export default { breakpoints, containerSizes, mediaQueries };
