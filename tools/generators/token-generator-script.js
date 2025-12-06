/**
 * Design Token Generator
 * Generates design tokens for the Quantum-Spatial design system
 */

const fs = require('fs');
const path = require('path');

class TokenGenerator {
  constructor(config) {
    this.outputPath = config.outputPath;
    this.states = config.states || ['heritage', 'transitional', 'quantum', 'superposition'];
  }

  /**
   * Generate all design tokens
   */
  async generateAllTokens() {
    console.log(`Generating tokens for states: ${this.states.join(', ')}`);
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
    
    // Generate tokens for each state
    for (const state of this.states) {
      console.log(`Generating tokens for ${state} state...`);
      const tokens = this.generateTokensForState(state);
      
      // Save tokens to file
      const outputFile = path.join(this.outputPath, `${state}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(tokens, null, 2));
      
      console.log(`✅ Tokens for ${state} state saved to ${outputFile}`);
    }
  }
  
  /**
   * Generate tokens for a specific state
   */
  generateTokensForState(state) {
    // Start with base tokens
    const tokens = {
      version: "1.0.0",
      colors: this.generateColorTokens(state),
      typography: this.generateTypographyTokens(state),
      spacing: this.generateSpacingTokens(state),
      borders: this.generateBorderTokens(state),
      shadows: this.generateShadowTokens(state),
      opacities: this.generateOpacityTokens(state),
      grid: this.generateGridTokens(state),
      animation: this.generateAnimationTokens(state)
    };
    
    // Add state-specific tokens
    if (state === 'heritage') {
      tokens.heritageMaterial = this.generateHeritageMaterialTokens();
    } else if (state === 'transitional') {
      tokens.transitionalMaterial = this.generateTransitionalMaterialTokens();
    } else if (state === 'quantum') {
      tokens.quantumMaterial = this.generateQuantumMaterialTokens();
    } else if (state === 'superposition') {
      tokens.superpositionMaterial = this.generateSuperpositionMaterialTokens();
    }
    
    return tokens;
  }
  
  /**
   * Generate color tokens
   */
  generateColorTokens(state) {
    const colors = {
      primary: {},
      secondary: {},
      accent: {},
      background: {},
      text: {},
      semantic: {}
    };
    
    // Define basic colors first
    const baseColors = {
      voidBlack: "#0A0621",
      deepSpaceIndigo: "#131A36",
      ultraIndigo: "#1E1F5C",
      dimensionalEggplant: "#331F4A",
      midnightRichness: "#0D0D15",
      quantumViolet: "#6A3093",
      ultraViolet: "#613FE7",
      subtleSky: "#00FFC8",
      subtleCyan: "#5AC8FA",
      dimensionalTeal: "#126D71",
      roseEnergy: "#BF4080",
      quantumPulsePink: "#FF2D55",
      dimensionalOrange: "#FF6B6B",
      heritageGreen: "#2C5F2D",
      heritageGreenLight: "#33FF66",
      heritageGreenDark: "#1B3D1A",
      heritagePixelGreen: "#3DFF74",
      white: "#FFFFFF"
    };
    
    // Apply state-specific colors
    if (state === 'heritage') {
      // Heritage state uses green tones
      colors.primary = {
        main: baseColors.heritageGreen,
        dark: baseColors.heritageGreenDark,
        light: baseColors.heritageGreenLight,
        contrastText: baseColors.white
      };
      
      colors.secondary = {
        main: baseColors.deepSpaceIndigo,
        dark: baseColors.midnightRichness,
        light: baseColors.ultraIndigo,
        contrastText: baseColors.white
      };
      
      colors.accent = {
        main: baseColors.heritagePixelGreen,
        dark: baseColors.dimensionalTeal,
        light: baseColors.subtleSky,
        contrastText: baseColors.deepSpaceIndigo
      };
      
    } else if (state === 'transitional') {
      // Transitional state uses blue/purple tones
      colors.primary = {
        main: baseColors.deepSpaceIndigo,
        dark: baseColors.midnightRichness,
        light: baseColors.ultraIndigo,
        contrastText: baseColors.white
      };
      
      colors.secondary = {
        main: baseColors.dimensionalEggplant,
        dark: baseColors.midnightRichness,
        light: baseColors.ultraViolet,
        contrastText: baseColors.white
      };
      
      colors.accent = {
        main: baseColors.subtleCyan,
        dark: baseColors.dimensionalTeal,
        light: baseColors.subtleSky,
        contrastText: baseColors.deepSpaceIndigo
      };
      
    } else if (state === 'quantum' || state === 'superposition') {
      // Quantum state uses purple/magenta tones
      colors.primary = {
        main: baseColors.quantumViolet,
        dark: baseColors.dimensionalEggplant,
        light: baseColors.ultraViolet,
        contrastText: baseColors.white
      };
      
      colors.secondary = {
        main: baseColors.roseEnergy,
        dark: baseColors.dimensionalEggplant,
        light: baseColors.quantumPulsePink,
        contrastText: baseColors.white
      };
      
      colors.accent = {
        main: baseColors.subtleCyan,
        dark: baseColors.dimensionalTeal,
        light: baseColors.subtleSky,
        contrastText: baseColors.deepSpaceIndigo
      };
    }
    
    // Background colors - consistent across states with subtle variations
    colors.background = {
      default: baseColors.deepSpaceIndigo,
      paper: baseColors.midnightRichness,
      subtle: baseColors.voidBlack
    };
    
    // Text colors - consistent across states
    colors.text = {
      primary: baseColors.white,
      secondary: "#CCCCCC",
      disabled: "#888888",
      hint: "#AAAAAA"
    };
    
    // Semantic colors - consistent across states
    colors.semantic = {
      success: "#34C759",
      warning: "#FF9500",
      error: "#FF3B30",
      info: baseColors.subtleCyan
    };
    
    return colors;
  }
  
  /**
   * Generate typography tokens
   */
  generateTypographyTokens(state) {
    // Typography is mostly consistent across states with slight variations
    const typography = {
      fontFamilies: {
        // System fonts first, fallback to generic
        heading: state === 'heritage' 
          ? "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
          : "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        body: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'SF Mono', 'JetBrains Mono', monospace"
      },
      fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        display: "48px"
      },
      fontWeights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        xs: "16px",
        sm: "20px",
        md: "24px",
        lg: "28px",
        xl: "32px",
        xxl: "40px",
        display: "56px"
      },
      letterSpacings: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em"
      }
    };
    
    return typography;
  }
  
  /**
   * Generate spacing tokens
   */
  generateSpacingTokens(state) {
    // Spacing is consistent across states
    return {
      quantum: "4px",  // Base unit
      xxs: "4px",      // 1 * quantum
      xs: "8px",       // 2 * quantum
      sm: "16px",      // 4 * quantum
      md: "24px",      // 6 * quantum
      lg: "32px",      // 8 * quantum
      xl: "48px",      // 12 * quantum
      xxl: "64px"      // 16 * quantum
    };
  }
  
  /**
   * Generate border tokens
   */
  generateBorderTokens(state) {
    // Borders with state-specific radius variations
    const radiusScale = state === 'heritage' ? 0.8 : 
                        state === 'transitional' ? 1 : 
                        state === 'quantum' ? 1.2 : 1.4;
    
    return {
      radius: {
        xs: `${2 * radiusScale}px`,
        sm: `${4 * radiusScale}px`,
        md: `${8 * radiusScale}px`,
        lg: `${12 * radiusScale}px`,
        xl: `${16 * radiusScale}px`,
        pill: "9999px"
      },
      width: {
        thin: "1px",
        medium: "2px",
        thick: "3px"
      }
    };
  }
  
  /**
   * Generate shadow tokens
   */
  generateShadowTokens(state) {
    // Shadow color varies by state
    let shadowColor;
    if (state === 'heritage') {
      shadowColor = "rgba(61, 255, 116, 0.2)"; // Green shadow
    } else if (state === 'transitional') {
      shadowColor = "rgba(90, 200, 250, 0.2)"; // Cyan shadow
    } else if (state === 'quantum') {
      shadowColor = "rgba(191, 64, 128, 0.2)"; // Rose shadow
    } else {
      shadowColor = "rgba(106, 48, 147, 0.2)"; // Purple shadow
    }
    
    // Dark shadow color is consistent
    const darkShadow = "rgba(10, 6, 33, 0.3)";
    
    return {
      subtle: `0 2px 4px ${darkShadow}`,
      medium: `0 4px 8px ${darkShadow}, 0 0 8px ${shadowColor}`,
      prominent: `0 8px 16px ${darkShadow}, 0 0 16px ${shadowColor}`,
      glow: `0 0 20px ${shadowColor}`
    };
  }
  
  /**
   * Generate opacity tokens
   */
  generateOpacityTokens(state) {
    // Opacities are consistent across states
    return {
      subtle: 0.7,
      verySubtle: 0.3,
      hover: 0.85,
      active: 0.95,
      disabled: 0.5
    };
  }
  
  /**
   * Generate grid tokens
   */
  generateGridTokens(state) {
    // Grid values vary by state
    let opacity;
    if (state === 'heritage') {
      opacity = {
        subtle: 0.03,
        medium: 0.06,
        prominent: 0.1
      };
    } else if (state === 'transitional') {
      opacity = {
        subtle: 0.05,
        medium: 0.1,
        prominent: 0.15
      };
    } else {
      opacity = {
        subtle: 0.08,
        medium: 0.15,
        prominent: 0.2
      };
    }
    
    return {
      // Grid base sizes
      size: {
        fine: "8px",
        medium: "16px",
        coarse: "32px"
      },
      // Grid types
      types: {
        background: {
          opacity: opacity.subtle
        },
        interface: {
          opacity: opacity.medium
        },
        feature: {
          opacity: opacity.prominent
        }
      },
      // Perspective values
      perspective: {
        default: "1000px",
        subtle: "2000px",
        extreme: "500px"
      }
    };
  }
  
  /**
   * Generate animation tokens
   */
  generateAnimationTokens(state) {
    // Animation durations vary slightly by state
    const durationFactor = state === 'heritage' ? 1.2 : 
                          state === 'transitional' ? 1 : 
                          state === 'quantum' ? 0.8 : 1;
    
    return {
      durations: {
        instant: `${50 * durationFactor}ms`,
        fast: `${150 * durationFactor}ms`,
        medium: `${300 * durationFactor}ms`,
        slow: `${500 * durationFactor}ms`,
        deliberate: `${800 * durationFactor}ms`
      },
      easings: {
        standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
        accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
        quantum: "cubic-bezier(0.16, 1, 0.3, 1)",
        energy: "cubic-bezier(0.17, 0.89, 0.32, 1.25)"
      }
    };
  }
  
  /**
   * Generate heritage material tokens
   */
  generateHeritageMaterialTokens() {
    return {
      roughness: 0.8,
      metallic: 0.1,
      emission: 0.3,
      pixelation: 1.0
    };
  }
  
  /**
   * Generate transitional material tokens
   */
  generateTransitionalMaterialTokens() {
    return {
      roughness: 0.5,
      metallic: 0.4,
      emission: 0.5,
      pixelation: 0.5
    };
  }
  
  /**
   * Generate quantum material tokens
   */
  generateQuantumMaterialTokens() {
    return {
      roughness: 0.2,
      metallic: 0.8,
      emission: 0.7,
      pixelation: 0.0
    };
  }
  
  /**
   * Generate superposition material tokens
   */
  generateSuperpositionMaterialTokens() {
    return {
      roughness: 0.3,
      metallic: 0.9,
      emission: 1.0,
      pixelation: 0.3,
      // Special properties for superposition state
      phaseShift: 0.5,
      waveDensity: 0.8,
      multiState: true
    };
  }
}

module.exports = TokenGenerator;