/**
 * Design Tokens for TypeScript
 * Auto-generated from unified design tokens
 * Generated: 2025-08-19T03:40:27.673Z
 */

export const designTokens = {
  "meta": {
    "version": "2.1.0",
    "lastUpdated": "2025-08-17",
    "m4Optimized": true,
    "platforms": [
      "figma",
      "swift",
      "typescript",
      "shopify",
      "framer"
    ]
  },
  "colors": {
    "primary": {
      "quantum": {
        "value": "#BF4080",
        "description": "Quantum primary color - signature 9Bit Studios"
      },
      "ultraMarine": {
        "value": "#5AC8FA",
        "description": "Ultra Marine - Apple-inspired accent"
      },
      "violet": {
        "value": "#6A3093",
        "description": "Deep violet - sophistication and depth"
      }
    },
    "foundation": {
      "heritage": {
        "value": "#331F4A",
        "description": "Heritage foundation - deep purple base"
      },
      "darkMatter": {
        "value": "#131A36",
        "description": "Dark matter - deepest background"
      },
      "cosmicDust": {
        "value": "#1A0D26",
        "description": "Cosmic dust - ultra dark"
      }
    },
    "glass": {
      "frosted": {
        "value": "rgba(255, 255, 255, 0.1)",
        "description": "Frosted glass overlay"
      },
      "shimmer": {
        "value": "rgba(191, 64, 128, 0.2)",
        "description": "Quantum shimmer effect"
      },
      "glow": {
        "value": "rgba(90, 200, 250, 0.3)",
        "description": "Ultra marine glow"
      }
    },
    "semantic": {
      "success": {
        "value": "#34C759",
        "description": "Success state - Apple green"
      },
      "warning": {
        "value": "#FF9500",
        "description": "Warning state - Apple orange"
      },
      "error": {
        "value": "#FF3B30",
        "description": "Error state - Apple red"
      },
      "info": {
        "value": "#007AFF",
        "description": "Info state - Apple blue"
      }
    }
  },
  "spacing": {
    "base": 8,
    "scale": {
      "xs": 4,
      "sm": 8,
      "md": 16,
      "lg": 24,
      "xl": 32,
      "xxl": 48,
      "xxxl": 64
    },
    "grid": {
      "columns": 12,
      "gutter": 16,
      "margin": 24
    }
  },
  "typography": {
    "fontFamilies": {
      "display": {
        "value": "SF Pro Display",
        "fallback": "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
      },
      "text": {
        "value": "SF Pro Text",
        "fallback": "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
      },
      "mono": {
        "value": "SF Mono",
        "fallback": "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace"
      }
    },
    "sizes": {
      "xs": 11,
      "sm": 13,
      "body": 15,
      "md": 17,
      "lg": 20,
      "xl": 24,
      "xxl": 28,
      "display": 34,
      "hero": 48
    },
    "weights": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "heavy": 800
    },
    "lineHeights": {
      "tight": 1.1,
      "snug": 1.3,
      "normal": 1.5,
      "relaxed": 1.7,
      "loose": 2
    }
  },
  "glassmorphism": {
    "blur": {
      "subtle": 8,
      "medium": 16,
      "strong": 24,
      "intense": 32
    },
    "opacity": {
      "transparent": 0,
      "faint": 0.05,
      "light": 0.1,
      "medium": 0.2,
      "strong": 0.3,
      "opaque": 1
    },
    "borderRadius": {
      "sm": 8,
      "md": 12,
      "lg": 16,
      "xl": 20,
      "pill": 999
    },
    "border": {
      "width": 1,
      "color": "rgba(255, 255, 255, 0.18)",
      "style": "solid"
    }
  },
  "shadows": {
    "sm": {
      "value": "0 1px 3px rgba(0, 0, 0, 0.12)",
      "description": "Small shadow for cards"
    },
    "md": {
      "value": "0 4px 6px rgba(0, 0, 0, 0.16)",
      "description": "Medium shadow for modals"
    },
    "lg": {
      "value": "0 10px 20px rgba(0, 0, 0, 0.2)",
      "description": "Large shadow for dropdowns"
    },
    "quantum": {
      "value": "0 0 40px rgba(191, 64, 128, 0.4)",
      "description": "Quantum glow effect"
    }
  },
  "animation": {
    "duration": {
      "instant": 0,
      "fast": 150,
      "normal": 300,
      "slow": 500,
      "glacial": 1000
    },
    "easing": {
      "linear": "linear",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "easeOut": "cubic-bezier(0, 0, 0.2, 1)",
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "spring": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  },
  "breakpoints": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536
  },
  "zIndex": {
    "base": 0,
    "dropdown": 100,
    "sticky": 200,
    "fixed": 300,
    "overlay": 400,
    "modal": 500,
    "popover": 600,
    "tooltip": 700,
    "toast": 800,
    "max": 999
  }
} as const;

// Type-safe token accessors
export const colors = designTokens.colors;
export const spacing = designTokens.spacing;
export const typography = designTokens.typography;
export const glassmorphism = designTokens.glassmorphism;
export const shadows = designTokens.shadows;
export const animation = designTokens.animation;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;

// Helper types
export type ColorToken = keyof typeof colors.primary | keyof typeof colors.foundation | keyof typeof colors.glass | keyof typeof colors.semantic;
export type SpacingToken = keyof typeof spacing.scale;
export type TypographySizeToken = keyof typeof typography.sizes;
export type TypographyWeightToken = keyof typeof typography.weights;
export type AnimationDurationToken = keyof typeof animation.duration;
export type AnimationEasingToken = keyof typeof animation.easing;
export type BreakpointToken = keyof typeof breakpoints;

// CSS-in-JS helpers
export const css = {
  color: (token: ColorToken) => {
    const category = Object.keys(colors).find(cat => 
      Object.keys(colors[cat as keyof typeof colors]).includes(token)
    );
    if (category) {
      return colors[category as keyof typeof colors][token as any]?.value || token;
    }
    return token;
  },
  
  space: (token: SpacingToken) => `${spacing.scale[token]}px`,
  
  fontSize: (token: TypographySizeToken) => `${typography.sizes[token]}px`,
  
  fontWeight: (token: TypographyWeightToken) => typography.weights[token],
  
  glass: (blur: keyof typeof glassmorphism.blur = 'medium', opacity: keyof typeof glassmorphism.opacity = 'light') => ({
    backdropFilter: `blur(${glassmorphism.blur[blur]}px)`,
    backgroundColor: `rgba(255, 255, 255, ${glassmorphism.opacity[opacity]})`,
    border: `${glassmorphism.border.width}px ${glassmorphism.border.style} ${glassmorphism.border.color}`
  }),
  
  transition: (duration: AnimationDurationToken = 'normal', easing: AnimationEasingToken = 'easeInOut') => 
    `all ${animation.duration[duration]}ms ${animation.easing[easing]}`,
  
  shadow: (type: keyof typeof shadows = 'md') => shadows[type].value,
  
  mediaQuery: (breakpoint: BreakpointToken) => 
    `@media (min-width: ${breakpoints[breakpoint]}px)`
};

// Tailwind-compatible class names
export const tw = {
  colors: Object.entries(colors).reduce((acc, [category, colorSet]) => {
    Object.entries(colorSet).forEach(([name, color]) => {
      const colorName = `${category}-${name}`.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
      acc[colorName] = (color as any).value || color;
    });
    return acc;
  }, {} as Record<string, string>),
  
  spacing: Object.entries(spacing.scale).reduce((acc, [name, value]) => {
    acc[name] = `${value}px`;
    return acc;
  }, {} as Record<string, string>)
};

export default designTokens;
