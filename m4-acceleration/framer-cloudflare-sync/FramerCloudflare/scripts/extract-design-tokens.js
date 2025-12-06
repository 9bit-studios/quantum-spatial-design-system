/**
 * Quantum-Spatial Design System Token Extractor
 * 
 * This script extracts design tokens from the SCSS and CSS files and
 * formats them for Framer API integration.
 * 
 * Created: May 10, 2025
 * Author: Claude Code
 */

const fs = require('fs');
const path = require('path');
const sass = require('sass');

// Configuration
const config = {
  tokenFiles: {
    scss: path.resolve(__dirname, '../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens/tokens.scss'),
    css: path.resolve(__dirname, '../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens/variables.css')
  },
  outputPaths: {
    json: path.resolve(__dirname, '../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens/framer-tokens.json'),
    js: path.resolve(__dirname, '../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/scripts/framer-tokens.js')
  }
};

/**
 * Extracts SCSS variables from the tokens file
 */
function extractScssTokens(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract different token categories
    const colorTokens = extractScssColors(content);
    const spacingTokens = extractScssSpacing(content);
    const typographyTokens = extractScssTypography(content);
    const gridTokens = extractScssGrid(content);
    const borderTokens = extractScssBorders(content);
    const shadowTokens = extractScssShadows(content);
    const animationTokens = extractScssAnimations(content);
    const stateTokens = extractScssStates(content);
    const glassmorphismTokens = extractScssGlassmorphism(content);
    
    return {
      colors: colorTokens,
      spacing: spacingTokens,
      typography: typographyTokens,
      grid: gridTokens,
      borders: borderTokens,
      shadows: shadowTokens,
      animation: animationTokens,
      states: stateTokens,
      glassmorphism: glassmorphismTokens
    };
  } catch (error) {
    console.error('Error extracting SCSS tokens:', error.message);
    return {};
  }
}

/**
 * Extract color tokens from SCSS content
 */
function extractScssColors(content) {
  const colors = {
    foundation: {},
    accent: {},
    heritage: {},
    functional: {},
    gradients: {}
  };
  
  // Extract foundation colors
  const foundationColorRegex = /\$color-([a-z-]+):\s*(#[A-Fa-f0-9]{3,8});/g;
  let match;
  
  while ((match = foundationColorRegex.exec(content)) !== null) {
    const name = match[1];
    const value = match[2];
    
    // Categorize the color based on its name
    if (name.includes('heritage')) {
      colors.heritage[name] = value;
    } else if (name.includes('subtle') || name.includes('dimensional') || name.includes('rose') || name.includes('quantum-pulse')) {
      colors.accent[name] = value;
    } else {
      colors.foundation[name] = value;
    }
  }
  
  // Extract functional colors
  const functionalColorsSection = content.match(/\$functional-colors:\s*\(([\s\S]*?)\);/);
  if (functionalColorsSection) {
    const functionalColorsContent = functionalColorsSection[1];
    const functionalColorRegex = /'([a-z-]+)':\s*\$([\w-]+)/g;
    
    while ((match = functionalColorRegex.exec(functionalColorsContent)) !== null) {
      const name = match[1];
      const variable = match[2];
      
      // Find the color value for this variable
      const colorValueMatch = content.match(new RegExp(`\\$${variable}:\\s*(#[A-Fa-f0-9]{3,8});`));
      if (colorValueMatch) {
        colors.functional[name] = colorValueMatch[1];
      }
    }
  }
  
  // Extract gradients
  const gradientsSection = content.match(/\$gradients:\s*\(([\s\S]*?)\);/);
  if (gradientsSection) {
    const gradientsContent = gradientsSection[1];
    const gradientRegex = /'([a-z-]+)':\s*\$([\w-]+)/g;
    
    while ((match = gradientRegex.exec(gradientsContent)) !== null) {
      const name = match[1];
      const variable = match[2];
      
      // Find the gradient definition
      const gradientMatch = content.match(new RegExp(`\\$${variable}:\\s*(linear-gradient[^;]+);`));
      if (gradientMatch) {
        colors.gradients[name] = gradientMatch[1];
      }
    }
  }
  
  return colors;
}

/**
 * Extract spacing tokens from SCSS content
 */
function extractScssSpacing(content) {
  const spacing = {
    base: null,
    scale: {},
    containers: {}
  };
  
  // Extract base grid unit
  const baseUnitMatch = content.match(/\$grid-base-unit:\s*(\d+px);/);
  if (baseUnitMatch) {
    spacing.base = baseUnitMatch[1];
  }
  
  // Extract spacing scale
  const spacingSection = content.match(/\$spacing:\s*\(([\s\S]*?)\);/);
  if (spacingSection) {
    const spacingContent = spacingSection[1];
    const spacingRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = spacingRegex.exec(spacingContent)) !== null) {
      const name = match[1];
      const value = match[2];
      spacing.scale[name] = value;
    }
  }
  
  // Extract container padding
  const containerSection = content.match(/\$container-padding:\s*\(([\s\S]*?)\);/);
  if (containerSection) {
    const containerContent = containerSection[1];
    const containerRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = containerRegex.exec(containerContent)) !== null) {
      const device = match[1];
      const value = match[2];
      spacing.containers[device] = value;
    }
  }
  
  return spacing;
}

/**
 * Extract typography tokens from SCSS content
 */
function extractScssTypography(content) {
  const typography = {
    families: {},
    weights: {},
    sizes: {},
    lineHeights: {},
    letterSpacing: {}
  };
  
  // Extract font families
  const fontFamilySection = content.match(/\$font-family:\s*\(([\s\S]*?)\);/);
  if (fontFamilySection) {
    const fontFamilyContent = fontFamilySection[1];
    const fontFamilyRegex = /'([a-z-]+)':\s*\(([^)]+)\)/g;
    
    while ((match = fontFamilyRegex.exec(fontFamilyContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      typography.families[name] = value;
    }
  }
  
  // Extract font weights
  const fontWeightSection = content.match(/\$font-weight:\s*\(([\s\S]*?)\);/);
  if (fontWeightSection) {
    const fontWeightContent = fontWeightSection[1];
    const fontWeightRegex = /'([a-z-]+)':\s*(\d+)/g;
    
    while ((match = fontWeightRegex.exec(fontWeightContent)) !== null) {
      const name = match[1];
      const value = parseInt(match[2], 10);
      typography.weights[name] = value;
    }
  }
  
  // Extract font sizes
  const fontSizeSection = content.match(/\$font-size:\s*\(([\s\S]*?)\);/);
  if (fontSizeSection) {
    const fontSizeContent = fontSizeSection[1];
    const fontSizeRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = fontSizeRegex.exec(fontSizeContent)) !== null) {
      const name = match[1];
      const value = match[2];
      typography.sizes[name] = value;
    }
  }
  
  // Extract line heights
  const lineHeightSection = content.match(/\$line-height:\s*\(([\s\S]*?)\);/);
  if (lineHeightSection) {
    const lineHeightContent = lineHeightSection[1];
    const lineHeightRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = lineHeightRegex.exec(lineHeightContent)) !== null) {
      const name = match[1];
      const value = match[2];
      typography.lineHeights[name] = value;
    }
  }
  
  // Extract letter spacing
  const letterSpacingSection = content.match(/\$letter-spacing:\s*\(([\s\S]*?)\);/);
  if (letterSpacingSection) {
    const letterSpacingContent = letterSpacingSection[1];
    const letterSpacingRegex = /'([a-z-]+)':\s*([-\d.]+px)/g;
    
    while ((match = letterSpacingRegex.exec(letterSpacingContent)) !== null) {
      const name = match[1];
      const value = match[2];
      typography.letterSpacing[name] = value;
    }
  }
  
  return typography;
}

/**
 * Extract grid tokens from SCSS content
 */
function extractScssGrid(content) {
  const grid = {
    columns: {},
    breakpoints: {},
    opacity: {}
  };
  
  // Extract columns
  const columnsSection = content.match(/\$columns:\s*\(([\s\S]*?)\);/);
  if (columnsSection) {
    const columnsContent = columnsSection[1];
    const columnsRegex = /'([a-z-]+)':\s*(\d+)/g;
    
    while ((match = columnsRegex.exec(columnsContent)) !== null) {
      const device = match[1];
      const value = parseInt(match[2], 10);
      grid.columns[device] = value;
    }
  }
  
  // Extract breakpoints
  const breakpointsSection = content.match(/\$breakpoints:\s*\(([\s\S]*?)\);/);
  if (breakpointsSection) {
    const breakpointsContent = breakpointsSection[1];
    const breakpointsRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = breakpointsRegex.exec(breakpointsContent)) !== null) {
      const device = match[1];
      const value = match[2];
      grid.breakpoints[device] = value;
    }
  }
  
  // Extract grid opacity
  const gridOpacitySection = content.match(/\$grid-opacity:\s*\(([\s\S]*?)\);/);
  if (gridOpacitySection) {
    const gridOpacityContent = gridOpacitySection[1];
    const gridOpacityRegex = /'([a-z-]+)':\s*([\d.]+)/g;
    
    while ((match = gridOpacityRegex.exec(gridOpacityContent)) !== null) {
      const type = match[1];
      const value = parseFloat(match[2]);
      grid.opacity[type] = value;
    }
  }
  
  return grid;
}

/**
 * Extract border tokens from SCSS content
 */
function extractScssBorders(content) {
  const borders = {
    radius: {},
    width: {}
  };
  
  // Extract border radii
  const radiusSection = content.match(/\$radius:\s*\(([\s\S]*?)\);/);
  if (radiusSection) {
    const radiusContent = radiusSection[1];
    const radiusRegex = /'([a-z-]+)':\s*([^,]+)/g;
    
    while ((match = radiusRegex.exec(radiusContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      borders.radius[name] = value;
    }
  }
  
  // Extract border widths
  const borderWidthSection = content.match(/\$border-width:\s*\(([\s\S]*?)\);/);
  if (borderWidthSection) {
    const borderWidthContent = borderWidthSection[1];
    const borderWidthRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = borderWidthRegex.exec(borderWidthContent)) !== null) {
      const name = match[1];
      const value = match[2];
      borders.width[name] = value;
    }
  }
  
  return borders;
}

/**
 * Extract shadow and glow tokens from SCSS content
 */
function extractScssShadows(content) {
  const shadows = {
    shadow: {},
    glow: {},
    darkModeGlow: {}
  };
  
  // Extract shadows
  const shadowSection = content.match(/\$shadow:\s*\(([\s\S]*?)\);/);
  if (shadowSection) {
    const shadowContent = shadowSection[1];
    const shadowRegex = /'([a-z-]+)':\s*([^,]+)/g;
    
    while ((match = shadowRegex.exec(shadowContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      shadows.shadow[name] = value;
    }
  }
  
  // Extract glows
  const glowSection = content.match(/\$glow:\s*\(([\s\S]*?)\);/);
  if (glowSection) {
    const glowContent = glowSection[1];
    const glowRegex = /'([a-z-]+)':\s*([^,]+)/g;
    
    while ((match = glowRegex.exec(glowContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      shadows.glow[name] = value;
    }
  }
  
  // Extract dark mode glows
  const darkModeGlowSection = content.match(/\$dark-mode-glow:\s*\(([\s\S]*?)\);/);
  if (darkModeGlowSection) {
    const darkModeGlowContent = darkModeGlowSection[1];
    const darkModeGlowRegex = /'([a-z-]+)':\s*([^,]+)/g;
    
    while ((match = darkModeGlowRegex.exec(darkModeGlowContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      shadows.darkModeGlow[name] = value;
    }
  }
  
  return shadows;
}

/**
 * Extract animation tokens from SCSS content
 */
function extractScssAnimations(content) {
  const animations = {
    duration: {},
    easing: {},
    keyframes: []
  };
  
  // Extract transition durations
  const durationSection = content.match(/\$transition-duration:\s*\(([\s\S]*?)\);/);
  if (durationSection) {
    const durationContent = durationSection[1];
    const durationRegex = /'([a-z-]+)':\s*(\d+ms)/g;
    
    while ((match = durationRegex.exec(durationContent)) !== null) {
      const name = match[1];
      const value = match[2];
      animations.duration[name] = value;
    }
  }
  
  // Extract easing functions
  const easingSection = content.match(/\$ease:\s*\(([\s\S]*?)\);/);
  if (easingSection) {
    const easingContent = easingSection[1];
    const easingRegex = /'([a-z-]+)':\s*(cubic-bezier[^,]+)/g;
    
    while ((match = easingRegex.exec(easingContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      animations.easing[name] = value;
    }
  }
  
  // Extract keyframe animations
  const keyframeRegex = /@keyframes\s+([a-zA-Z0-9-]+)\s*{([^}]+)}/g;
  let keyframeMatch;
  
  while ((keyframeMatch = keyframeRegex.exec(content)) !== null) {
    const name = keyframeMatch[1];
    const keyframeContent = keyframeMatch[2];
    
    animations.keyframes.push({
      name,
      content: keyframeContent.trim()
    });
  }
  
  return animations;
}

/**
 * Extract state-related tokens from SCSS content
 */
function extractScssStates(content) {
  const states = {
    pixel: {},
    transitions: {},
    perspective: {},
    parallax: {},
    distance: {}
  };
  
  // Extract pixel states
  const pixelStateSection = content.match(/\$pixel-state:\s*\(([\s\S]*?)\);/);
  if (pixelStateSection) {
    const pixelStateContent = pixelStateSection[1];
    const pixelStateRegex = /'([a-z-]+)':\s*([\d.]+)/g;
    
    while ((match = pixelStateRegex.exec(pixelStateContent)) !== null) {
      const name = match[1];
      const value = parseFloat(match[2]);
      states.pixel[name] = value;
    }
  }
  
  // Extract state transitions
  const transitionsSection = content.match(/\$transitions:\s*\(([\s\S]*?)\);/);
  if (transitionsSection) {
    const transitionsContent = transitionsSection[1];
    const transitionsRegex = /'([a-z-]+)':\s*([\d.]+s)/g;
    
    while ((match = transitionsRegex.exec(transitionsContent)) !== null) {
      const name = match[1];
      const value = match[2];
      states.transitions[name] = value;
    }
  }
  
  // Extract perspective strength
  const perspectiveSection = content.match(/\$perspective-strength:\s*\(([\s\S]*?)\);/);
  if (perspectiveSection) {
    const perspectiveContent = perspectiveSection[1];
    const perspectiveRegex = /'([a-z-]+)':\s*([\d.]+)/g;
    
    while ((match = perspectiveRegex.exec(perspectiveContent)) !== null) {
      const name = match[1];
      const value = parseFloat(match[2]);
      states.perspective[name] = value;
    }
  }
  
  // Extract parallax layers
  const parallaxSection = content.match(/\$parallax-layer:\s*\(([\s\S]*?)\);/);
  if (parallaxSection) {
    const parallaxContent = parallaxSection[1];
    const parallaxRegex = /'([a-z-]+)':\s*([\d.]+)/g;
    
    while ((match = parallaxRegex.exec(parallaxContent)) !== null) {
      const name = match[1];
      const value = parseFloat(match[2]);
      states.parallax[name] = value;
    }
  }
  
  // Extract distance fade factor
  const distanceSection = content.match(/\$distance-fade-factor:\s*\(([\s\S]*?)\);/);
  if (distanceSection) {
    const distanceContent = distanceSection[1];
    const distanceRegex = /'([a-z-]+)':\s*([\d.]+)/g;
    
    while ((match = distanceRegex.exec(distanceContent)) !== null) {
      const name = match[1];
      const value = parseFloat(match[2]);
      states.distance[name] = value;
    }
  }
  
  return states;
}

/**
 * Extract glassmorphism tokens from SCSS content
 */
function extractScssGlassmorphism(content) {
  const glassmorphism = {
    background: {},
    border: {},
    blur: {}
  };
  
  // Extract glass backgrounds
  const backgroundSection = content.match(/\$glass-background:\s*\(([\s\S]*?)\);/);
  if (backgroundSection) {
    const backgroundContent = backgroundSection[1];
    const backgroundRegex = /'([a-z-]+)':\s*rgba[^,]+/g;
    
    while ((match = backgroundRegex.exec(backgroundContent)) !== null) {
      const name = match[1];
      const value = match[0].split(':')[1].trim();
      glassmorphism.background[name] = value;
    }
  }
  
  // Extract glass border colors
  const borderSection = content.match(/\$glass-border-color:\s*\(([\s\S]*?)\);/);
  if (borderSection) {
    const borderContent = borderSection[1];
    const borderRegex = /'([a-z-]+)':\s*rgba[^,]+/g;
    
    while ((match = borderRegex.exec(borderContent)) !== null) {
      const name = match[1];
      const value = match[0].split(':')[1].trim();
      glassmorphism.border[name] = value;
    }
  }
  
  // Extract glass blur intensities
  const blurSection = content.match(/\$glass-blur:\s*\(([\s\S]*?)\);/);
  if (blurSection) {
    const blurContent = blurSection[1];
    const blurRegex = /'([a-z-]+)':\s*(\d+px)/g;
    
    while ((match = blurRegex.exec(blurContent)) !== null) {
      const name = match[1];
      const value = match[2];
      glassmorphism.blur[name] = value;
    }
  }
  
  return glassmorphism;
}

/**
 * Extract CSS variables from the variables.css file
 */
function extractCssVariables(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const rootRegex = /:root\s*{([^}]*)}/;
    const rootMatch = content.match(rootRegex);
    
    if (!rootMatch) {
      return {};
    }
    
    const rootContent = rootMatch[1];
    const variableRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    const cssVariables = {};
    let match;
    
    while ((match = variableRegex.exec(rootContent)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      
      // Categorize the variables
      const category = getCssVariableCategory(name);
      if (!cssVariables[category]) {
        cssVariables[category] = {};
      }
      
      cssVariables[category][name] = value;
    }
    
    return cssVariables;
  } catch (error) {
    console.error('Error extracting CSS variables:', error.message);
    return {};
  }
}

/**
 * Determine the category of a CSS variable based on its name
 */
function getCssVariableCategory(name) {
  if (name.startsWith('color-')) {
    return 'colors';
  } else if (name.startsWith('space-')) {
    return 'spacing';
  } else if (name.startsWith('font-')) {
    return 'typography';
  } else if (name.startsWith('line-height-')) {
    return 'typography';
  } else if (name.startsWith('letter-spacing-')) {
    return 'typography';
  } else if (name.startsWith('radius-')) {
    return 'borders';
  } else if (name.startsWith('border-width-')) {
    return 'borders';
  } else if (name.startsWith('shadow-')) {
    return 'shadows';
  } else if (name.startsWith('glow-')) {
    return 'shadows';
  } else if (name.startsWith('transition-')) {
    return 'animation';
  } else if (name.startsWith('ease-')) {
    return 'animation';
  } else if (name.startsWith('glass-')) {
    return 'glassmorphism';
  } else if (name.startsWith('gradient-')) {
    return 'colors';
  } else if (name.startsWith('grid-')) {
    return 'grid';
  } else if (name.startsWith('z-')) {
    return 'layout';
  } else if (name.startsWith('particle-')) {
    return 'particles';
  } else if (name.startsWith('energy-')) {
    return 'energy';
  } else if (name.startsWith('liquid-')) {
    return 'liquid';
  } else {
    return 'other';
  }
}

/**
 * Format the tokens for Framer API
 */
function formatForFramer(scssTokens, cssVariables) {
  // Create the structured tokens object for Framer
  const framerTokens = {
    version: "1.0.0",
    
    // Combined color system with state variations
    colors: {
      heritage: {
        primary: scssTokens.colors.heritage['heritage-green'] || "#2C5F2D",
        secondary: scssTokens.colors.heritage['heritage-green-light'] || "#3D8B40",
        accent: scssTokens.colors.heritage['heritage-pixel-green'] || "#3DFF74",
        pixelGreen: scssTokens.colors.heritage['heritage-pixel-green'] || "#3DFF74",
        pixelAqua: scssTokens.colors.heritage['heritage-pixel-aqua'] || "#00FFC8",
        ultraPixelGreen: scssTokens.colors.heritage['ultra-heritage-pixel-green'] || "#94FE00",
        background: {
          deep: scssTokens.colors.foundation['void-black'] || "#0A0621",
          space: scssTokens.colors.foundation['deep-space-indigo'] || "#131A36"
        }
      },
      
      transitional: {
        primary: scssTokens.colors.accent['subtle-cyan'] || "#5AC8FA",
        secondary: scssTokens.colors.foundation['ultra-indigo'] || "#1E1F5C",
        accent: scssTokens.colors.accent['dimensional-teal'] || "#126D71",
        background: {
          deep: scssTokens.colors.foundation['void-black'] || "#0A0621",
          space: scssTokens.colors.foundation['deep-space-indigo'] || "#131A36"
        }
      },
      
      quantum: {
        primary: scssTokens.colors.foundation['quantum-violet'] || "#6A3093",
        secondary: scssTokens.colors.foundation['dimensional-eggplant'] || "#331F4A",
        accent: scssTokens.colors.accent['rose-energy'] || "#BF4080",
        pulsePink: scssTokens.colors.accent['quantum-pulse-pink'] || "#FF2D55",
        ultraMarine: scssTokens.colors.foundation['ultra-marine'] || "#405DE5",
        ultraViolet: scssTokens.colors.foundation['ultra-violet'] || "#613FE7",
        background: {
          deep: scssTokens.colors.foundation['midnight-richness'] || "#0D0D15",
          space: scssTokens.colors.foundation['deep-space-indigo'] || "#131A36"
        }
      },
      
      // Functional colors across states
      functional: {
        primary: scssTokens.colors.functional['primary-action'] || "#5AC8FA",
        secondary: scssTokens.colors.functional['secondary-action'] || "#126D71",
        tertiary: scssTokens.colors.functional['tertiary-action'] || "#613FE7",
        error: scssTokens.colors.functional['destructive'] || "#BF4080",
        success: scssTokens.colors.functional['success'] || "#2C5F2D",
        warning: scssTokens.colors.functional['warning'] || "#FF6B6B",
        info: scssTokens.colors.functional['info'] || "#06D6A0"
      },
      
      // Gradients
      gradients: {
        heritageState: "linear-gradient(135deg, #1B3D1A, #2C5F2D, #3D8B40)",
        transitionalState: "linear-gradient(135deg, #331F4A, #1E1F5C, #613FE7)",
        quantumState: "linear-gradient(135deg, #6A3093, #BF4080, #FF2D55)",
        quantumDepth: "linear-gradient(135deg, #131A36, #331F4A, #6A3093)",
        spatialBackground: "linear-gradient(180deg, #0A0621, #131A36)",
        energyFlow: "linear-gradient(90deg, #2C5F2D, #5AC8FA, #FF2D55)"
      }
    },
    
    // Typography system
    typography: {
      fontFamilies: {
        primaryDisplay: scssTokens.typography.families['primary-display'] || "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        primaryText: scssTokens.typography.families['primary-text'] || "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        secondaryDisplay: scssTokens.typography.families['secondary-display'] || "'SF Compact', sans-serif",
        secondaryText: scssTokens.typography.families['secondary-text'] || "'SF Compact', sans-serif",
        mono: scssTokens.typography.families['mono'] || "'SF Mono', 'JetBrains Mono', monospace"
      },
      
      fontWeights: {
        regular: scssTokens.typography.weights['regular'] || 400,
        medium: scssTokens.typography.weights['medium'] || 500,
        semibold: scssTokens.typography.weights['semibold'] || 600,
        bold: scssTokens.typography.weights['bold'] || 700
      },
      
      fontSizes: {
        xs: scssTokens.typography.sizes['xs'] || "12px",
        sm: scssTokens.typography.sizes['sm'] || "14px",
        md: scssTokens.typography.sizes['md'] || "16px",
        lg: scssTokens.typography.sizes['lg'] || "20px",
        xl: scssTokens.typography.sizes['xl'] || "24px",
        xxl: scssTokens.typography.sizes['xxl'] || "32px",
        display: scssTokens.typography.sizes['display'] || "48px"
      },
      
      lineHeights: {
        xs: scssTokens.typography.lineHeights['xs'] || "16px",
        sm: scssTokens.typography.lineHeights['sm'] || "20px",
        md: scssTokens.typography.lineHeights['md'] || "24px",
        lg: scssTokens.typography.lineHeights['lg'] || "28px",
        xl: scssTokens.typography.lineHeights['xl'] || "32px",
        xxl: scssTokens.typography.lineHeights['xxl'] || "40px",
        display: scssTokens.typography.lineHeights['display'] || "56px"
      },
      
      letterSpacing: {
        tight: scssTokens.typography.letterSpacing['tight'] || "-0.2px",
        normal: scssTokens.typography.letterSpacing['normal'] || "0px",
        wide: scssTokens.typography.letterSpacing['wide'] || "0.1px"
      }
    },
    
    // Spacing system
    spacing: {
      base: scssTokens.spacing.base || "8px",
      quantum: scssTokens.spacing.scale['quantum'] || "4px",
      xxs: scssTokens.spacing.scale['xxs'] || "4px",
      xs: scssTokens.spacing.scale['xs'] || "8px",
      sm: scssTokens.spacing.scale['sm'] || "16px",
      md: scssTokens.spacing.scale['md'] || "24px",
      lg: scssTokens.spacing.scale['lg'] || "32px",
      xl: scssTokens.spacing.scale['xl'] || "48px",
      xxl: scssTokens.spacing.scale['xxl'] || "64px"
    },
    
    // Grid system
    grid: {
      columns: {
        mobile: scssTokens.grid.columns['mobile'] || 4,
        tablet: scssTokens.grid.columns['tablet'] || 8,
        desktop: scssTokens.grid.columns['desktop'] || 12
      },
      
      breakpoints: {
        mobile: scssTokens.grid.breakpoints['mobile'] || "375px",
        tablet: scssTokens.grid.breakpoints['tablet'] || "768px",
        desktop: scssTokens.grid.breakpoints['desktop'] || "1440px"
      },
      
      opacity: {
        subtle: scssTokens.grid.opacity['subtle'] || 0.05,
        medium: scssTokens.grid.opacity['medium'] || 0.1,
        prominent: scssTokens.grid.opacity['prominent'] || 0.15
      },
      
      container: {
        mobile: scssTokens.spacing.containers['mobile'] || "24px",
        tablet: scssTokens.spacing.containers['tablet'] || "32px",
        desktop: scssTokens.spacing.containers['desktop'] || "40px"
      }
    },
    
    // Borders and radii
    borders: {
      radius: {
        xs: scssTokens.borders.radius['xs'] || "2px",
        sm: scssTokens.borders.radius['sm'] || "4px",
        md: scssTokens.borders.radius['md'] || "8px",
        lg: scssTokens.borders.radius['lg'] || "12px",
        xl: scssTokens.borders.radius['xl'] || "20px",
        pill: scssTokens.borders.radius['pill'] || "9999px"
      },
      
      width: {
        thin: scssTokens.borders.width['thin'] || "1px",
        medium: scssTokens.borders.width['medium'] || "2px",
        thick: scssTokens.borders.width['thick'] || "3px"
      }
    },
    
    // Shadows and effects
    effects: {
      shadow: {
        subtle: scssTokens.shadows.shadow['subtle'] || "0 2px 4px rgba(10, 6, 33, 0.2)",
        medium: scssTokens.shadows.shadow['medium'] || "0 4px 8px rgba(10, 6, 33, 0.3)",
        prominent: scssTokens.shadows.shadow['prominent'] || "0 8px 16px rgba(10, 6, 33, 0.4)",
        quantum: scssTokens.shadows.shadow['quantum'] || "0 8px 24px rgba(90, 200, 250, 0.25)"
      },
      
      glow: {
        subtle: scssTokens.shadows.glow['subtle'] || "0 0 5px rgba(90, 200, 250, 0.5)",
        medium: scssTokens.shadows.glow['medium'] || "0 0 10px rgba(90, 200, 250, 0.6)",
        quantum: scssTokens.shadows.glow['quantum'] || "0 0 15px rgba(191, 64, 128, 0.7)",
        heritage: scssTokens.shadows.glow['heritage'] || "0 0 8px rgba(61, 255, 116, 0.5)"
      },
      
      darkModeGlow: {
        subtle: scssTokens.shadows.darkModeGlow['subtle'] || "0 0 6px rgba(90, 200, 250, 0.6)",
        medium: scssTokens.shadows.darkModeGlow['medium'] || "0 0 12px rgba(90, 200, 250, 0.7)",
        quantum: scssTokens.shadows.darkModeGlow['quantum'] || "0 0 18px rgba(191, 64, 128, 0.8)",
        heritage: scssTokens.shadows.darkModeGlow['heritage'] || "0 0 10px rgba(61, 255, 116, 0.6)"
      }
    },
    
    // Animation system
    animation: {
      duration: {
        instant: scssTokens.animations.duration['instant'] || "50ms",
        fast: scssTokens.animations.duration['fast'] || "150ms",
        medium: scssTokens.animations.duration['medium'] || "300ms",
        slow: scssTokens.animations.duration['slow'] || "500ms",
        deliberate: scssTokens.animations.duration['deliberate'] || "800ms"
      },
      
      easing: {
        standard: scssTokens.animations.easing['standard'] || "cubic-bezier(0.4, 0.0, 0.2, 1)",
        decelerate: scssTokens.animations.easing['decelerate'] || "cubic-bezier(0.0, 0.0, 0.2, 1)",
        accelerate: scssTokens.animations.easing['accelerate'] || "cubic-bezier(0.4, 0.0, 1, 1)",
        quantum: scssTokens.animations.easing['quantum'] || "cubic-bezier(0.16, 1, 0.3, 1)",
        energy: scssTokens.animations.easing['energy'] || "cubic-bezier(0.17, 0.89, 0.32, 1.25)"
      },
      
      stateTransitions: {
        heritageToTransitional: scssTokens.states.transitions['heritage-to-transitional'] || "1.5s",
        transitionalToQuantum: scssTokens.states.transitions['transitional-to-quantum'] || "1.5s",
        heritageToQuantum: scssTokens.states.transitions['heritage-to-quantum'] || "2s",
        materialToEnergy: scssTokens.states.transitions['material-to-energy'] || "0.5s"
      }
    },
    
    // State system
    states: {
      pixel: {
        materialized: scssTokens.states.pixel['materialized'] || 1,
        partial: scssTokens.states.pixel['partial'] || 0.6,
        energy: scssTokens.states.pixel['energy'] || 0.3,
        superposition: scssTokens.states.pixel['superposition'] || 0.5
      },
      
      perspective: {
        subtle: scssTokens.states.perspective['subtle'] || 0.02,
        medium: scssTokens.states.perspective['medium'] || 0.05,
        strong: scssTokens.states.perspective['strong'] || 0.1
      },
      
      parallax: {
        foreground: scssTokens.states.parallax['foreground'] || 0.8,
        midground: scssTokens.states.parallax['midground'] || 0.5,
        background: scssTokens.states.parallax['background'] || 0.2
      }
    },
    
    // Glassmorphism
    glassmorphism: {
      background: {
        subtle: scssTokens.glassmorphism.background['subtle'] || "rgba(19, 26, 54, 0.4)",
        medium: scssTokens.glassmorphism.background['medium'] || "rgba(19, 26, 54, 0.6)",
        prominent: scssTokens.glassmorphism.background['prominent'] || "rgba(19, 26, 54, 0.8)",
        heritage: scssTokens.glassmorphism.background['heritage'] || "rgba(44, 95, 45, 0.4)",
        quantum: scssTokens.glassmorphism.background['quantum'] || "rgba(106, 48, 147, 0.4)"
      },
      
      border: {
        standard: scssTokens.glassmorphism.border['standard'] || "rgba(90, 200, 250, 0.2)",
        heritage: scssTokens.glassmorphism.border['heritage'] || "rgba(61, 255, 116, 0.2)",
        quantum: scssTokens.glassmorphism.border['quantum'] || "rgba(191, 64, 128, 0.2)"
      },
      
      blur: {
        subtle: scssTokens.glassmorphism.blur['subtle'] || "5px",
        medium: scssTokens.glassmorphism.blur['medium'] || "10px",
        prominent: scssTokens.glassmorphism.blur['prominent'] || "15px"
      }
    },
    
    // M4 optimization
    m4: {
      optimization: {
        animationBatchSize: 5,
        filterStddevMax: 7,
        gradientStopsMax: 4,
        staggeredDelayIncrement: "0.7s"
      }
    },
    
    // Z-index system
    zIndex: {
      background: -10,
      grid: -5,
      base: 0,
      above: 10,
      floating: 100,
      overlay: 1000,
      modal: 2000,
      popover: 5000,
      quantum: 9000
    }
  };
  
  return framerTokens;
}

/**
 * Write tokens to a JavaScript file
 */
function writeTokensJs(tokens, filePath) {
  const content = `/**
 * Quantum-Spatial Design System Tokens
 * Formatted for Framer API Integration
 * 
 * Generated: ${new Date().toISOString()}
 * M4-Optimized for 9Bit Studios
 */

module.exports = ${JSON.stringify(tokens, null, 2)};
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Tokens exported to JS at ${filePath}`);
}

/**
 * Write tokens to a JSON file
 */
function writeTokensJson(tokens, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
  console.log(`✅ Tokens exported to JSON at ${filePath}`);
}

/**
 * Create Framer API sync script
 */
function createFramerSyncScript() {
  const scriptPath = path.resolve(__dirname, 'sync-framer-tokens.js');
  
  const content = `/**
 * Quantum-Spatial Design System - Framer API Sync
 * 
 * This script synchronizes design tokens with Framer via the API.
 * Created: ${new Date().toISOString()}
 */

require('dotenv').config();
const fetch = require('node-fetch');
const tokens = require('../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/scripts/framer-tokens.js');

// Configuration
const FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN= = process.env.FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN=;
const FRAMER_TEAM_ID = process.env.FRAMER_TEAM_ID;
const FRAMER_PROJECT_ID = process.env.FRAMER_PROJECT_ID;
const API_BASE_URL = 'https://api.framer.com/v1';

/**
 * Sync design tokens to Framer
 */
async function syncDesignTokens() {
  console.log('Syncing Quantum-Spatial design tokens to Framer...');
  
  try {
    if (!FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN= || !FRAMER_TEAM_ID || !FRAMER_PROJECT_ID) {
      throw new Error('Missing Framer API configuration. Check your .env file.');
    }
    
    const response = await fetch(
      \`\${API_BASE_URL}/teams/\${FRAMER_TEAM_ID}/projects/\${FRAMER_PROJECT_ID}/variables\`,
      {
        method: 'PUT',
        headers: {
          'Authorization': \`Bearer \${FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN=}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokens)
      }
    );
    
    if (!response.ok) {
      throw new Error(\`Failed to sync tokens: \${response.status} \${response.statusText}\`);
    }
    
    const result = await response.json();
    console.log('✅ Design tokens synced successfully!');
    console.log(\`Updated \${Object.keys(result).length} token categories\`);
    
  } catch (error) {
    console.error('❌ Error syncing tokens:', error.message);
    process.exit(1);
  }
}

// Run the sync if executed directly
if (require.main === module) {
  syncDesignTokens();
}

module.exports = { syncDesignTokens };
`;

  fs.writeFileSync(scriptPath, content);
  console.log(`✅ Created Framer sync script at ${scriptPath}`);
}

/**
 * Main execution function
 */
async function main() {
  console.log('Extracting Quantum-Spatial design tokens...');
  
  // Extract tokens from SCSS
  const scssTokens = extractScssTokens(config.tokenFiles.scss);
  console.log('✅ Extracted SCSS tokens');
  
  // Extract variables from CSS
  const cssVariables = extractCssVariables(config.tokenFiles.css);
  console.log('✅ Extracted CSS variables');
  
  // Format tokens for Framer
  const framerTokens = formatForFramer(scssTokens, cssVariables);
  console.log('✅ Formatted tokens for Framer API');
  
  // Write tokens to files
  writeTokensJson(framerTokens, config.outputPaths.json);
  writeTokensJs(framerTokens, config.outputPaths.js);
  
  // Create Framer sync script
  createFramerSyncScript();
  
  console.log('🎉 Token extraction and formatting complete!');
  console.log('Next steps:');
  console.log('1. Configure Framer API credentials in .env file');
  console.log('2. Run "node scripts/sync-framer-tokens.js" to sync tokens to Framer');
}

// Execute the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});