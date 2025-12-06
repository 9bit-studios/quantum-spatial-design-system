/**
 * Quantum-Spatial Design Tokens v3.0
 * Onyx + Eggplant Dual Theme System
 * Extracted from Figma & Apple HIG Compliant
 * Last Updated: 2025-12-03
 *
 * Enhanced quantum-spatial design tokens with Onyx (pure black) and
 * Eggplant (deep purple-black) complementary themes, comprehensive button
 * system, and Apple Human Interface Guidelines compliance.
 */

import { brandColors } from './colors';

export const quantumSpatialTokens = {
  colors: {
    // === ONYX THEME (Pure Black) ===
    onyxBlack: brandColors.onyx.black,
    onyxNearBlack: brandColors.onyx.nearBlack,
    onyxMidnight: brandColors.onyx.midnight,

    // === EGGPLANT THEME (Deep Purple-Black) ===
    eggplantDeepnight: brandColors.eggplant.deepnight,
    eggplantVoidViolet: brandColors.eggplant.voidViolet,
    eggplantWarm: brandColors.eggplant.warmVariant,
    eggplantSlate: brandColors.eggplant.slate,

    // === PRIMARY COLORS (Mapped for backward compatibility) ===
    primary: brandColors.eggplant.deepnight,      // #160918 Eggplant
    secondary: brandColors.eggplant.voidViolet,   // #0b010d Darker eggplant
    tertiary: brandColors.eggplant.warmVariant,   // #16090e Warm variant
    quaternary: brandColors.background.deepSpaceIndigo, // #1e1f5c Deep indigo

    // === REFINED ACCENT PALETTE ===
    accent: brandColors.system.cyan,               // #5ac8fa Cyan
    accentSecondary: brandColors.system.violetDaybreak, // #7b00ff Violet
    accentTertiary: brandColors.accent.roseEnergy, // #bf4080 Rose
    accentSuccess: brandColors.system.green,       // #34c759 Green
    accentWarning: brandColors.system.orange,      // #ff9500 Orange

    // === TEXT COLORS (with better contrast ratios) ===
    text: brandColors.foreground.primary,
    textSecondary: brandColors.text.secondary,
    textTertiary: brandColors.text.tertiary,
    textQuaternary: brandColors.text.quaternary,
    textMuted: brandColors.text.muted,
    textVibrant: brandColors.text.vibrant,

    // === GLASS/TRANSPARENCY ===
    glassLight: brandColors.glass.whiteElevated,
    glassMedium: brandColors.glass.whiteMedium,
    glassDark: brandColors.glass.whiteSubtle,

    // === BACKGROUNDS ===
    bgOnyxPrimary: brandColors.background.onyxPrimary,
    bgEggplantPrimary: brandColors.background.eggplantPrimary,
    bgEggplantSecondary: brandColors.background.eggplantSecondary,

    // === BUTTONS ===
    buttonPrimaryDark: brandColors.button.primaryDark,
    buttonPrimaryVoid: brandColors.button.primaryVoid,
    buttonHover: brandColors.button.hover,
    buttonSecondary: brandColors.button.secondary,
    buttonTertiary: brandColors.button.tertiary,
    buttonGhostStroke: brandColors.button.ghostStroke,
    buttonInactive: brandColors.button.inactive,

    // === BORDERS & DIVIDERS ===
    borderPrimary: brandColors.border.primary,
    borderSecondary: brandColors.border.secondary,
    dividerPrimary: brandColors.divider.primary,
    dividerSecondary: brandColors.divider.secondary,

    // === HERITAGE GREEN (Legacy States) ===
    heritageGreen: brandColors.heritage.green,
    heritageGreenLight: brandColors.heritage.greenLight,
    heritagePixel: brandColors.heritage.pixel,

    // === APPLE SYSTEM COLORS ===
    systemBlue: brandColors.system.blue,
    systemCyan: brandColors.system.cyan,
    systemGreen: brandColors.system.green,
    systemOrange: brandColors.system.orange,
    systemRed: brandColors.system.red,
    systemViolet: brandColors.system.violetDark,
  },

  gradients: {
    // === GLASSMORPHIC GRADIENTS ===
    glassCard: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    glassButton: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    glassActive: 'linear-gradient(135deg, rgba(90, 200, 250, 0.2) 0%, rgba(123, 0, 255, 0.15) 100%)',

    // === THEME BLENDS ===
    onyxBlend: 'linear-gradient(135deg, #000000 0%, #0b010d 50%, #160918 100%)',
    eggplantBlend: 'linear-gradient(135deg, #160918 0%, #0b010d 50%, #000000 100%)',
    surfaceBlend: 'linear-gradient(135deg, rgba(22, 9, 24, 0.8) 0%, rgba(11, 1, 13, 0.6) 100%)',

    // === OIL SLICK (from HTML showcase) ===
    oilSlick: `linear-gradient(135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(90, 200, 250, 0.03) 50%,
      rgba(191, 64, 128, 0.03) 75%,
      rgba(255, 255, 255, 0.08) 100%)`,
  },

  shadows: {
    // === GLASS SHADOWS (Gelatinous Effect) ===
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05)',
    glassMedium: '0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 0 rgba(255, 255, 255, 0.08)',
    glassProminent: '0 16px 48px rgba(0, 0, 0, 0.24), inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 2px 0 rgba(255, 255, 255, 0.1)',

    // === BUTTON SHADOWS (from Figma) ===
    buttonSubtle: '0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.05)',
    buttonMedium: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)',
    buttonStrong: '0 8px 16px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.08)',
    buttonHeavy: '0 12px 24px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.12)',

    // === BUTTON GLOWS (from Figma) ===
    buttonGlowPurple: '0 0 20px rgba(123, 0, 255, 0.26), 0 4px 12px rgba(0, 0, 0, 0.2)',
    buttonGlowBlue: '0 0 20px rgba(88, 70, 246, 0.25), 0 4px 12px rgba(0, 0, 0, 0.2)',
    buttonGlowViolet: '0 0 24px rgba(78, 90, 194, 0.2), 0 4px 12px rgba(0, 0, 0, 0.2)',

    // === QUANTUM GLOW ===
    quantumGlow: '0 0 24px rgba(90, 200, 250, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    full: '9999px',
  },

  blur: {
    subtle: '8px',
    medium: '16px',
    strong: '24px',
    extreme: '32px',
  },

  backdropFilter: {
    quantum: 'saturate(180%) blur(20px)',
    quantumGlass: 'blur(20px) saturate(150%)',
    blurSm: 'blur(8px)',
    blurMd: 'blur(16px)',
    blurLg: 'blur(24px)',
    blurXl: 'blur(32px)',
  },

  animation: {
    instant: '100ms',
    fast: '200ms',
    medium: '300ms',
    slow: '500ms',
    slower: '700ms',

    // === EASING FUNCTIONS (from HTML showcase) ===
    easingGentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easingSnap: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    easingSilk: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    easingMagnetic: 'cubic-bezier(0.2, 0, 0.38, 0.9)',

    // Standard easings
    easingIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easingOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easingInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  typography: {
    // === FONT FAMILIES (Apple HIG) ===
    fontDisplay: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    fontText: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    fontCompact: "'SF Compact', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    fontMono: "'SF Mono', 'Monaco', 'Courier New', monospace",

    // === FONT WEIGHTS (Apple HIG) ===
    weightUltraLight: 200,
    weightLight: 300,
    weightRegular: 350,     // SF Pro default
    weightMedium: 400,
    weightSemibold: 500,
    weightBold: 600,
    weightHeavy: 700,

    // === FONT SIZES (Responsive - from Figma) ===
    // Desktop sizes
    heading1Desktop: '60px',
    heading2Desktop: '50px',
    heading3Desktop: '40px',
    heading4Desktop: '30px',
    heading5Desktop: '24px',

    // Tablet sizes
    heading1Tablet: '40px',
    heading2Tablet: '30px',
    heading3Tablet: '28px',
    heading4Tablet: '24px',
    heading5Tablet: '20px',

    // Mobile sizes
    heading1Mobile: '34px',
    heading2Mobile: '28px',
    heading3Mobile: '24px',
    heading4Mobile: '22px',
    heading5Mobile: '20px',

    // Body sizes (all breakpoints)
    headline: '20px',
    bodyLarge: '18px',
    body: '16px',
    footnote: '14px',
    caption: '13px',
    small: '12px',

    // === LINE HEIGHTS ===
    lineHeightTight: 1.2,
    lineHeightNormal: 1.47059,  // Apple HIG
    lineHeightRelaxed: 1.6,

    // === LETTER SPACING ===
    letterSpacingTight: '-0.022em',  // Apple HIG
    letterSpacingNormal: '0',
    letterSpacingWide: '0.05em',
  },

  touchTargets: {
    // === TOUCH TARGETS (Apple HIG) ===
    minimum: '44px',
    comfortable: '48px',
  },

  container: {
    // === CONTAINER WIDTHS ===
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
};

export type QuantumSpatialTokens = typeof quantumSpatialTokens;
export default quantumSpatialTokens;
