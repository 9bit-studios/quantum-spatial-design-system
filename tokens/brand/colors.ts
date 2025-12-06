 /**
 * BRAND COLOR TOKENS v3.0
 * Design System Colors - Onyx + Eggplant Dual Theme
 * Extracted from Figma & Apple HIG Compliant
 * Last Updated: 2025-12-03
 */

export const brandColors = {
  // === ONYX THEME (Pure Black) ===
  onyx: {
    black: '#000000',           // Pure black, maximum contrast
    nearBlack: '#050505',       // Variant 1
    midnight: '#0a0a0f',        // Midnight richness
  },

  // === EGGPLANT THEME (Deep Purple-Black) ===
  eggplant: {
    deepnight: '#160918',       // Primary eggplant "Deepnight"
    voidViolet: '#0b010d',      // Darkest eggplant
    warmVariant: '#16090e',     // Warm eggplant variant
    slate: '#09021a',           // Blue-black tint
    multidimensional: '#110413', // Mid eggplant
    mystic: '#170e22',          // Lighter eggplant
    ultraVoid: '#0a0621',       // Deep space marine
    ultradimensional: '#150621', // Purple-marine
  },

  // === BACKGROUND HIERARCHY ===
  background: {
    // Onyx backgrounds
    onyxPrimary: '#000000',
    onyxSecondary: '#0b010d',
    onyxTertiary: '#160918',

    // Eggplant backgrounds
    eggplantPrimary: '#160918',
    eggplantSecondary: '#0b010d',
    eggplantTertiary: '#16090e',
    eggplantQuaternary: '#160918',
    eggplantSlate: '#09021a',

    // Additional variants
    nearBlack: '#050505',
    midnightRichness: '#0a0a0f',
    deepSpaceIndigo: '#1e1f5c',
    ultraIndigo: '#15151d',
  },

  // === CONTAINER SYSTEM (from Figma Variables) ===
  container: {
    bgPrimary: '#0b010d',
    bgPrimaryDaybreak: 'rgba(255, 255, 255, 0.6)',

    bgSecondary: '#160918',
    bgSecondaryDaybreak: 'rgba(255, 255, 255, 0.1)',

    bgTertiary: '#16090e',
    bgTertiaryVoid: '#ffffff',
    bgTertiaryMarine: '#ffffff',
    bgTertiaryDaybreak: 'rgba(255, 255, 255, 0.9)',

    bgRecessed: '#ffffff',
    bgRecessedVoid: 'rgba(0, 0, 0, 0.2)',
    bgRecessedMarine: 'rgba(0, 0, 0, 0.2)',
    bgRecessedDaybreak: 'rgba(255, 255, 255, 0.9)',
  },

  // === BUTTON SYSTEM (from Figma Extractions) ===
  button: {
    // Primary buttons
    primaryDark: '#7b00ff',      // Vibrant purple (Dark mode)
    primaryVoid: '#007aff',      // Apple blue (Void/Marine/Daybreak)
    primaryMarine: '#007aff',
    primaryDaybreak: '#007aff',

    // Button backgrounds
    bgPrimary: '#160918',        // Deep eggplant fill
    bgSecondary: '#0b010d',      // Darker fill

    // Hover states
    hover: '#150621',            // Dark purple hover
    hoverStroke: 'rgba(255, 255, 255, 0.2)', // 20% white

    // Secondary buttons
    secondary: '#150621',
    secondaryHover: '#7b00ff',
    secondaryHoverVoid: '#5b9cff',   // blue-400
    secondaryHoverDaybreak: '#0063d1', // blue-500

    // Tertiary buttons
    tertiary: '#4e177c',
    tertiaryVoid: '#007aff',
    tertiaryHover: '#4e177c',
    tertiaryHoverVoid: '#5b9cff',

    // Ghost buttons
    ghostStroke: '#9747ff',      // Purple ghost border
    ghostFill: 'rgba(255, 255, 255, 0.5)', // 50% white overlay

    // Inactive
    inactive: 'rgba(255, 255, 255, 0.2)',
    inactiveDaybreak: 'rgba(0, 0, 0, 0.2)',

    // Button text
    textPrimaryDark: '#ffffff',
    textPrimaryVoid: '#007aff',
  },

  // === APPLE HIG SYSTEM COLORS ===
  system: {
    blueDark: '#0b4fd7',
    blue: '#007aff',
    cyan: '#5ac8fa',
    purpleDark: '#3b39ec',
    purpleDaybreak: '#504cf5',
    violetDark: '#6e00ff',
    violetDaybreak: '#7b00ff',
    pink: '#d0196b',
    red: '#ff3b30',
    orange: '#ff9500',
    green: '#34c759',
  },

  // === FOREGROUND/TEXT SYSTEM (from Figma Variables) ===
  foreground: {
    primary: '#ffffff',
    primaryDaybreak: '#000000',

    secondary: '#ffffff',
    secondaryDaybreak: 'rgba(0, 0, 0, 0.6)',

    tertiary: '#ffffff',
    tertiaryDaybreak: 'rgba(0, 0, 0, 0.5)',
  },

  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    tertiary: 'rgba(255, 255, 255, 0.45)',
    quaternary: 'rgba(255, 255, 255, 0.3)',

    // From Figma typography
    heading: 'rgba(255, 255, 255, 0.9)',    // #FFFFFFE5
    body: 'rgba(255, 255, 255, 0.6)',       // #FFFFFF99
    caption: 'rgba(255, 255, 255, 0.5)',    // #FFFFFF80
    disabled: 'rgba(255, 255, 255, 0.2)',   // #FFFFFF33
  },

  // === BORDERS & DIVIDERS (from Figma Variables) ===
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',     // white-a10
    primaryDaybreak: 'rgba(255, 255, 255, 0.5)', // white-a50
    secondary: 'rgba(255, 255, 255, 0.1)',   // white-a10
    secondaryDaybreak: 'rgba(255, 255, 255, 0.2)', // white-a20
  },

  divider: {
    primary: 'rgba(255, 255, 255, 0.1)',     // white-a10
    primaryDaybreak: 'rgba(0, 0, 0, 0.1)',   // black-a10
    secondary: 'rgba(255, 255, 255, 0.2)',   // white-a20
    secondaryDaybreak: 'rgba(0, 0, 0, 0.2)', // black-a20
  },

  // === GLASS/TRANSPARENCY SYSTEM ===
  glass: {
    // Black glass (for light backgrounds)
    ultraThin: 'rgba(0, 0, 0, 0.1)',    // 10% #0000001A
    thin: 'rgba(0, 0, 0, 0.2)',          // 20% #00000033
    medium: 'rgba(0, 0, 0, 0.29)',       // 29% #0000004A
    thick: 'rgba(0, 0, 0, 0.4)',         // 40% #00000066
    ultraThick: 'rgba(0, 0, 0, 0.5)',    // 50% #00000080

    // White glass (for dark backgrounds)
    whiteSubtle: 'rgba(255, 255, 255, 0.02)',   // 2%
    whiteLight: 'rgba(255, 255, 255, 0.05)',    // 5%
    whiteMedium: 'rgba(255, 255, 255, 0.08)',   // 8%
    whiteElevated: 'rgba(255, 255, 255, 0.12)', // 12%
    whiteActive: 'rgba(255, 255, 255, 0.15)',   // 15%

    // Standard glass (from HTML showcase)
    base: 'rgba(255, 255, 255, 0.02)',
    elevated: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.1)',
    shimmer: 'rgba(255, 255, 255, 0.15)',
  },

  // === GRADIENT SYSTEM (from Figma & HTML) ===
  gradient: {
    fill1: 'rgba(255, 255, 255, 0.2)',
    fill1Daybreak: 'rgba(255, 255, 255, 0.9)',
    fill2: 'rgba(255, 255, 255, 0.1)',
    fill2Daybreak: 'rgba(255, 255, 255, 0.8)',
  },

  // === HERITAGE GREEN (Legacy/Special States) ===
  heritage: {
    green: '#2c5f2d',
    greenLight: '#357139',
    greenDark: '#1b3d1a',
    pixel: '#3dff74',
    pixelAqua: '#00ffc8',

    // Heritage glass variants
    glass10: 'rgba(44, 95, 45, 0.1)',
    glass15: 'rgba(44, 95, 45, 0.15)',
    glass30: 'rgba(44, 95, 45, 0.3)',
    glass50: 'rgba(44, 95, 45, 0.5)',
    glass70: 'rgba(44, 95, 45, 0.7)',
    glass85: 'rgba(44, 95, 45, 0.85)',
    glass100: 'rgba(44, 95, 45, 1)',
  },

  // === SEMANTIC COLORS ===
  semantic: {
    success: '#34c759',
    warning: '#ff9500',
    error: '#ff3b30',
    info: '#5ac8fa',
    successHeritage: '#2c5f2d',
    errorQuantum: '#bf4080',
  },

  // === ADDITIONAL ACCENT COLORS (from extractions) ===
  accent: {
    subtleCyan: '#5ac8fa',
    dimensionalTeal: '#126d71',
    roseEnergy: '#bf4080',
    quantumPulsePink: '#ff2d55',
    pinkVibrant: '#ff375f',
    pinkDimensional: '#d0196b',
    pinkPixel: '#ec4899',
    pinkLiquid: '#ff66e3',
    dimensionalOrange: '#ff6b6b',
    orangePixel: '#ff4f52',
  },
} as const;

export type BrandColors = typeof brandColors;
export default brandColors;
