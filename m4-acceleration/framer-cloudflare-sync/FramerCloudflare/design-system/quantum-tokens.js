/**
 * Quantum-Spatial Design System - Quantum State Tokens
 * Formatted for Framer import
 */

export const quantumTokens = {
  // Colors
  colors: {
    primary: "#131A36",
    secondary: "#331F4A",
    accent: "#5AC8FA",
    background: {
      light: "#FFFFFF",
      dark: "#121212"
    },
    text: {
      light: "#0F0F0F",
      dark: "#F5F5F5"
    },
    surface: {
      light: "#F9FAFB",
      dark: "#1E1E1E"
    },
    border: {
      light: "#E2E8F0",
      dark: "#2D2D2D"
    },
    success: "#00D26A",
    warning: "#FFB800",
    error: "#FF4D4F"
  },
  
  // Typography
  typography: {
    fontFamily: "SF Pro Display, SF Pro, system-ui, sans-serif",
    headings: {
      h1: {
        fontSize: "3.998rem",
        fontWeight: 800,
        lineHeight: 1.1
      },
      h2: {
        fontSize: "2.827rem",
        fontWeight: 700,
        lineHeight: 1.2
      },
      h3: {
        fontSize: "1.999rem",
        fontWeight: 600,
        lineHeight: 1.25
      },
      h4: {
        fontSize: "1.414rem",
        fontWeight: 600,
        lineHeight: 1.3
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.4
      },
      h6: {
        fontSize: "0.707rem",
        fontWeight: 500,
        lineHeight: 1.4
      }
    },
    body: {
      regular: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.6
      },
      small: {
        fontSize: "0.707rem",
        fontWeight: 400,
        lineHeight: 1.6
      },
      large: {
        fontSize: "1.414rem",
        fontWeight: 400,
        lineHeight: 1.6
      }
    }
  },
  
  // Spacing
  spacing: {
    "2xs": "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "32px",
    xl: "64px",
    "2xl": "96px",
    "3xl": "128px"
  },
  
  // Border Radius
  borderRadius: {
    small: "8px",
    medium: "12px",
    large: "20px",
    xl: "28px",
    pill: "999px"
  },
  
  // Shadows
  shadows: {
    small: "0 2px 8px rgba(19, 26, 54, 0.06)",
    medium: "0 8px 16px rgba(19, 26, 54, 0.06)",
    large: "0 16px 32px rgba(19, 26, 54, 0.06)",
    xl: "0 24px 48px rgba(19, 26, 54, 0.06)"
  },
  
  // Animation
  motion: {
    duration: {
      instant: "100ms",
      fast: "200ms",
      normal: "300ms",
      slow: "500ms",
      deliberate: "800ms"
    },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      accelerate: "cubic-bezier(0.4, 0, 1, 1)",
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",
      quantum: "cubic-bezier(0.15, 1.15, 0.6, 1.0)"
    }
  }
};

// Color palette for easy access in Framer
export const palette = {
  primary: quantumTokens.colors.primary,
  secondary: quantumTokens.colors.secondary,
  accent: quantumTokens.colors.accent,
  background: quantumTokens.colors.background.light,
  backgroundDark: quantumTokens.colors.background.dark,
  text: quantumTokens.colors.text.light,
  textDark: quantumTokens.colors.text.dark,
  surface: quantumTokens.colors.surface.light,
  surfaceDark: quantumTokens.colors.surface.dark,
  border: quantumTokens.colors.border.light,
  borderDark: quantumTokens.colors.border.dark,
  success: quantumTokens.colors.success,
  warning: quantumTokens.colors.warning,
  error: quantumTokens.colors.error
};

// Typography styles for easy access in Framer
export const typography = {
  h1: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.headings.h1.fontSize,
    fontWeight: quantumTokens.typography.headings.h1.fontWeight,
    lineHeight: quantumTokens.typography.headings.h1.lineHeight
  },
  h2: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.headings.h2.fontSize,
    fontWeight: quantumTokens.typography.headings.h2.fontWeight,
    lineHeight: quantumTokens.typography.headings.h2.lineHeight
  },
  h3: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.headings.h3.fontSize,
    fontWeight: quantumTokens.typography.headings.h3.fontWeight,
    lineHeight: quantumTokens.typography.headings.h3.lineHeight
  },
  h4: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.headings.h4.fontSize,
    fontWeight: quantumTokens.typography.headings.h4.fontWeight,
    lineHeight: quantumTokens.typography.headings.h4.lineHeight
  },
  body: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.body.regular.fontSize,
    fontWeight: quantumTokens.typography.body.regular.fontWeight,
    lineHeight: quantumTokens.typography.body.regular.lineHeight
  },
  bodySmall: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.body.small.fontSize,
    fontWeight: quantumTokens.typography.body.small.fontWeight,
    lineHeight: quantumTokens.typography.body.small.lineHeight
  },
  bodyLarge: {
    fontFamily: quantumTokens.typography.fontFamily,
    fontSize: quantumTokens.typography.body.large.fontSize,
    fontWeight: quantumTokens.typography.body.large.fontWeight,
    lineHeight: quantumTokens.typography.body.large.lineHeight
  }
};

// Spacing for easy access in Framer
export const spacing = quantumTokens.spacing;

// Border radius for easy access in Framer
export const radius = quantumTokens.borderRadius;

// Shadows for easy access in Framer
export const shadows = quantumTokens.shadows;