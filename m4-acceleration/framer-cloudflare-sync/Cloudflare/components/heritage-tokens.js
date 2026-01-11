/**
 * Quantum-Spatial Design System - Heritage Tokens
 * Generated from Cloudflare Worker: https://design-system-staging.9bitstudios.io
 */

// Complete token set
export const heritageTokens = {
  "_meta": {
    "name": "Heritage",
    "description": "Flat orthogonal design system",
    "version": "1.0.0"
  },
  "colors": {
    "primary": "#131A36",
    "secondary": "#331F4A",
    "accent": "#5AC8FA",
    "background": "#FFFFFF",
    "text": "#1A1A1A",
    "surface": "#F7F7F7",
    "border": "#E0E0E0",
    "success": "#00C853",
    "warning": "#FFD600",
    "error": "#FF3D00"
  },
  "typography": {
    "fontFamily": "SF Pro Text, Inter, system-ui, sans-serif",
    "baseSize": "16px",
    "scale": 1.25,
    "headings": {
      "h1": {
        "fontSize": "2.986rem",
        "fontWeight": 700,
        "lineHeight": 1.2
      },
      "h2": {
        "fontSize": "2.488rem",
        "fontWeight": 700,
        "lineHeight": 1.2
      },
      "h3": {
        "fontSize": "2.074rem",
        "fontWeight": 600,
        "lineHeight": 1.3
      },
      "h4": {
        "fontSize": "1.728rem",
        "fontWeight": 600,
        "lineHeight": 1.3
      },
      "h5": {
        "fontSize": "1.44rem",
        "fontWeight": 500,
        "lineHeight": 1.4
      },
      "h6": {
        "fontSize": "1.2rem",
        "fontWeight": 500,
        "lineHeight": 1.4
      }
    },
    "body": {
      "regular": {
        "fontSize": "1rem",
        "fontWeight": 400,
        "lineHeight": 1.5
      },
      "small": {
        "fontSize": "0.875rem",
        "fontWeight": 400,
        "lineHeight": 1.5
      },
      "large": {
        "fontSize": "1.125rem",
        "fontWeight": 400,
        "lineHeight": 1.5
      }
    }
  },
  "spacing": {
    "unit": "8px",
    "grid": 8,
    "scale": {
      "xs": "4px",
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
      "xl": "32px",
      "xxl": "48px",
      "xxxl": "64px"
    }
  },
  "borderRadius": {
    "small": "4px",
    "medium": "8px",
    "large": "12px",
    "pill": "999px"
  },
  "shadows": {
    "small": "0 2px 4px rgba(0, 0, 0, 0.1)",
    "medium": "0 4px 8px rgba(0, 0, 0, 0.1)",
    "large": "0 8px 16px rgba(0, 0, 0, 0.1)"
  },
  "material": {
    "states": {
      "default": {
        "reflectivity": 0,
        "roughness": 1,
        "metalness": 0
      }
    }
  },
  "gridSystem": {
    "columns": 12,
    "gutter": "16px",
    "margin": "16px",
    "type": "orthogonal",
    "responsive": {
      "sm": "576px",
      "md": "768px",
      "lg": "992px",
      "xl": "1200px"
    }
  }
};

// Color palette
export const palette = {
  "primary": "#131A36",
  "secondary": "#331F4A",
  "accent": "#5AC8FA",
  "background": "#FFFFFF",
  "text": "#1A1A1A",
  "surface": "#F7F7F7",
  "border": "#E0E0E0",
  "success": "#00C853",
  "warning": "#FFD600",
  "error": "#FF3D00",
  "deepSpaceIndigo": "#131A36",
  "dimensionalEggplant": "#331F4A",
  "subtleCyan": "#5AC8FA",
  "voidBlack": "#121212",
  "pureWhite": "#FFFFFF"
};

// Typography
export const typography = {
  "fontFamily": "SF Pro Text, Inter, system-ui, sans-serif",
  "baseSize": "16px",
  "scale": 1.25,
  "headings": {
    "h1": {
      "fontSize": "2.986rem",
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    "h2": {
      "fontSize": "2.488rem",
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    "h3": {
      "fontSize": "2.074rem",
      "fontWeight": 600,
      "lineHeight": 1.3
    },
    "h4": {
      "fontSize": "1.728rem",
      "fontWeight": 600,
      "lineHeight": 1.3
    },
    "h5": {
      "fontSize": "1.44rem",
      "fontWeight": 500,
      "lineHeight": 1.4
    },
    "h6": {
      "fontSize": "1.2rem",
      "fontWeight": 500,
      "lineHeight": 1.4
    }
  },
  "body": {
    "regular": {
      "fontSize": "1rem",
      "fontWeight": 400,
      "lineHeight": 1.5
    },
    "small": {
      "fontSize": "0.875rem",
      "fontWeight": 400,
      "lineHeight": 1.5
    },
    "large": {
      "fontSize": "1.125rem",
      "fontWeight": 400,
      "lineHeight": 1.5
    }
  }
};

// Spacing
export const spacing = {
  "xs": "4px",
  "sm": "8px",
  "md": "16px",
  "lg": "24px",
  "xl": "32px",
  "xxl": "48px",
  "xxxl": "64px"
};

// Border radius
export const radius = {
  "small": "4px",
  "medium": "8px",
  "large": "12px",
  "pill": "999px"
};

// Shadows
export const shadows = {
  "small": "0 2px 4px rgba(0, 0, 0, 0.1)",
  "medium": "0 4px 8px rgba(0, 0, 0, 0.1)",
  "large": "0 8px 16px rgba(0, 0, 0, 0.1)"
};

// Design system context
export const designSystem = {
  state: "heritage",
  tokens: heritageTokens,
  palette,
  typography,
  spacing,
  radius,
  shadows
};

export default designSystem;
