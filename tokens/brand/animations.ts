/**
 * ANIMATION TOKENS
 * Design System Animations - Apple-style Motion
 */

export const animationDurations = {
  instant: '0ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
} as const;

export const animationEasings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  appleEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

export const animations = {
  fadeIn: {
    keyframes: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    duration: animationDurations.normal,
    easing: animationEasings.easeOut,
  },
  slideIn: {
    keyframes: {
      from: { transform: 'translateY(-20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    duration: animationDurations.normal,
    easing: animationEasings.spring,
  },
  scaleIn: {
    keyframes: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    duration: animationDurations.fast,
    easing: animationEasings.spring,
  },
} as const;

export default { durations: animationDurations, easings: animationEasings, animations };
