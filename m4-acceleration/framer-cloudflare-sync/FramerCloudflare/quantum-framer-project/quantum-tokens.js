// Quantum-Spatial Design Tokens
export const quantumTokens = {
  "colors": {
    "deepSpaceIndigo": "#131A36",
    "voidBlack": "#0A0621",
    "dimensionalEggplant": "#331F4A",
    "subtleCyan": "#5AC8FA",
    "roseEnergy": "#BF4080",
    "dimensionalTeal": "#126D71"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "fonts": {
    "primary": "SF Pro Display",
    "mono": "SF Mono"
  }
};

export const palette = quantumTokens.colors;
export const spacing = quantumTokens.spacing;
export const typography = {
  h1: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  h2: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3'
  },
  body: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5'
  },
  mono: {
    fontFamily: quantumTokens.fonts.mono,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4'
  }
};

export const radius = {
  small: '4px',
  medium: '8px',
  large: '16px',
  full: '50%'
};

export const shadows = {
  small: '0 2px 8px rgba(0,0,0,0.15)',
  medium: '0 4px 16px rgba(0,0,0,0.2)',
  large: '0 8px 32px rgba(0,0,0,0.3)'
};