/**
 * VISUAL EFFECTS TOKENS
 * Shadows, Blur, Glow Effects - Apple HIG Compliant
 */

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
} as const;

export const glowEffects = {
  quantum: '0 0 20px rgba(0, 212, 255, 0.5)',
  energy: '0 0 30px rgba(255, 215, 0, 0.4)',
  nebula: '0 0 25px rgba(191, 64, 128, 0.45)',
  apple: '0 0 15px rgba(0, 122, 255, 0.6)',
} as const;

export const backdropFilters = {
  glass: 'blur(10px) saturate(150%)',
  frost: 'blur(16px) saturate(180%) contrast(110%)',
  deep: 'blur(20px) saturate(200%) brightness(80%)',
  liquid: 'blur(12px) saturate(160%) brightness(95%)',
} as const;

export const effects = {
  shadows,
  blur,
  glow: glowEffects,
  backdrop: backdropFilters,
} as const;

export default effects;
