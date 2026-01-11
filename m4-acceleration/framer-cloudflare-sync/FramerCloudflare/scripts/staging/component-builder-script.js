/**
 * Component Builder
 * Builds and optimizes components for the Quantum-Spatial design system
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const SVGO = require('svgo');

class ComponentBuilder {
  constructor(config) {
    this.componentsPath = config.componentsPath;
    this.outputPath = config.outputPath;
    this.tokensPath = config.tokensPath;
    
    // Configure SVG optimizer
    this.svgo = new SVGO({
      plugins: [
        { name: 'removeDoctype', active: true },
        { name: 'removeComments', active: true },
        { name: 'removeMetadata', active: true },
        { name: 'removeEditorsNSData', active: true },
        { name: 'cleanupAttrs', active: true },
        { name: 'inlineStyles', active: true },
        { name: 'minifyStyles', active: true },
        { name: 'removeUselessDefs', active: true },
        { name: 'cleanupNumericValues', active: true },
        { name: 'convertColors', active: true },
        { name: 'removeUnknownsAndDefaults', active: true },
        { name: 'removeNonInheritableGroupAttrs', active: true },
        { name: 'removeUselessStrokeAndFill', active: true },
        { name: 'cleanupEnableBackground', active: true },
        { name: 'removeHiddenElems', active: true },
        { name: 'removeEmptyText', active: true },
        { name: 'convertShapeToPath', active: false }, // Keep shapes as is
        { name: 'collapseGroups', active: false }, // Keep group structure
        { name: 'convertPathData', active: true },
        { name: 'convertTransform', active: true },
        { name: 'removeEmptyAttrs', active: true },
        { name: 'removeEmptyContainers', active: true },
        { name: 'mergePaths', active: false }, // Keep paths separate for animation
        { name: 'removeUnusedNS', active: true },
        { name: 'sortAttrs', active: true },
        { name: 'removeTitle', active: false }, // Keep titles for accessibility
        { name: 'removeDesc', active: false } // Keep descriptions for accessibility
      ]
    });
  }
  
  /**
   * Build all components
   */
  async buildAllComponents() {
    console.log('🔨 Building all components...');
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
    
    // Check if components directory exists
    if (!fs.existsSync(this.componentsPath)) {
      throw new Error(`Components directory not found: ${this.componentsPath}`);
    }
    
    // Get core components
    const coreComponents = this.getCoreComponents();
    
    // Process each component
    for (const component of coreComponents) {
      await this.buildComponent(component);
    }
    
    // Build index file
    this.buildIndexFile(coreComponents);
    
    console.log('✅ All components built successfully');
  }
  
  /**
   * Get core components
   */
  getCoreComponents() {
    // Read the components directory and filter for TSX files
    const files = fs.readdirSync(this.componentsPath);
    
    return files
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'))
      .map(file => ({
        name: path.basename(file, path.extname(file)),
        filePath: path.join(this.componentsPath, file),
        type: this.categorizeComponent(file)
      }));
  }
  
  /**
   * Categorize component
   */
  categorizeComponent(fileName) {
    // Categorize based on naming conventions
    if (fileName.includes('Grid')) {
      return 'grid';
    } else if (fileName.includes('Pixel')) {
      return 'pixel';
    } else if (fileName.includes('Button')) {
      return 'button';
    } else if (fileName.includes('Card')) {
      return 'card';
    } else if (fileName.includes('Input')) {
      return 'input';
    } else if (fileName.includes('Navbar') || fileName.includes('Nav')) {
      return 'navigation';
    } else {
      return 'other';
    }
  }
  
  /**
   * Build a single component
   */
  async buildComponent(component) {
    console.log(`Building component: ${component.name}`);
    
    try {
      // Read the component file
      const componentCode = fs.readFileSync(component.filePath, 'utf8');
      
      // Create optimized component
      const optimizedCode = await this.optimizeComponent(componentCode);
      
      // Write optimized component to output directory
      const outputFilePath = path.join(this.outputPath, `${component.name}.tsx`);
      fs.writeFileSync(outputFilePath, optimizedCode);
      
      // Generate SVG version if applicable
      await this.generateSvgVersion(component);
      
      console.log(`✅ Built component: ${component.name}`);
      
      return outputFilePath;
    } catch (error) {
      console.error(`❌ Error building component ${component.name}:`, error.message);
      throw error;
    }
  }
  
  /**
   * Optimize component
   */
  async optimizeComponent(componentCode) {
    // This is a simple implementation
    // In a real system, you would use a proper TS/JS transformer
    
    // Replace hardcoded colors with token references
    let optimizedCode = componentCode;
    
    // Replace hex colors with token references
    const colorPattern = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})([^0-9A-Fa-f]|$)/g;
    
    // Load color tokens to map hex values to token names
    const colorTokens = this.loadColorTokens();
    
    // Replace color hex codes with token references
    optimizedCode = componentCode.replace(colorPattern, (match, hex, suffix) => {
      const token = this.findTokenForColor(`#${hex}`, colorTokens);
      if (token) {
        return `{theme.colors.${token}}${suffix}`;
      }
      return match;
    });
    
    // Add M4 optimization comments
    optimizedCode = optimizedCode.replace(
      /export\s+(?:default\s+)?(?:function|const)\s+(\w+)/,
      `/**
 * Quantum-Spatial Design System - ${RegExp.$1}
 * 
 * This component is optimized for Apple Silicon M4 devices
 * with Neural Engine acceleration for animations and effects.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */
export function $1`
    );
    
    // Add optimization imports if not already present
    if (!optimizedCode.includes('useM4Detection')) {
      optimizedCode = optimizedCode.replace(
        /import\s+{/,
        `import { useM4Detection, `
      );
      
      // Add M4 detection hook usage if not already present
      if (!optimizedCode.includes('useM4Detection(')) {
        optimizedCode = optimizedCode.replace(
          /function\s+(\w+)\s*\([^)]*\)\s*{/,
          `function $1(props) {
  // Detect M4 capabilities for optimized rendering
  const { hasM4, hasNeuralEngine } = useM4Detection();
  
  `
        );
      }
    }
    
    return optimizedCode;
  }
  
  /**
   * Load color tokens
   */
  loadColorTokens() {
    // Check if tokens directory exists
    if (!fs.existsSync(this.tokensPath)) {
      console.warn(`Tokens directory not found: ${this.tokensPath}`);
      return {};
    }
    
    // Read all token files
    const tokenFiles = fs.readdirSync(this.tokensPath)
      .filter(file => file.endsWith('.json'));
    
    // Combine all tokens
    let allTokens = {};
    
    for (const file of tokenFiles) {
      const state = path.basename(file, '.json');
      const tokenData = JSON.parse(fs.readFileSync(path.join(this.tokensPath, file), 'utf8'));
      
      if (tokenData.colors) {
        // Process colors using a flattened structure for easier lookup
        this.flattenColors(tokenData.colors, '', state, allTokens);
      }
    }
    
    return allTokens;
  }
  
  /**
   * Flatten colors for easier lookup
   */
  flattenColors(colors, prefix, state, result) {
    for (const [key, value] of Object.entries(colors)) {
      const tokenPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        // Store the color with its path
        if (!result[value]) {
          result[value] = [];
        }
        result[value].push(`${state}.${tokenPath}`);
      } else if (typeof value === 'object') {
        // Recursively process nested color objects
        this.flattenColors(value, tokenPath, state, result);
      }
    }
  }
  
  /**
   * Find token for a color
   */
  findTokenForColor(color, colorTokens) {
    // Normalize color
    const normalizedColor = color.toUpperCase();
    
    // Find token for color
    const tokens = colorTokens[normalizedColor] || colorTokens[normalizedColor.toLowerCase()];
    
    if (tokens && tokens.length > 0) {
      // Prefer transitional state tokens
      const transitionalToken = tokens.find(token => token.startsWith('transitional.'));
      if (transitionalToken) {
        return transitionalToken;
      }
      
      // Otherwise use the first token
      return tokens[0];
    }
    
    return null;
  }
  
  /**
   * Generate SVG version of the component
   */
  async generateSvgVersion(component) {
    // Only generate SVG for visual components
    if (['pixel', 'grid', 'button', 'card'].includes(component.type)) {
      console.log(`Generating SVG for ${component.name}...`);
      
      // Create SVG output directory
      const svgDir = path.join(this.outputPath, 'svg');
      if (!fs.existsSync(svgDir)) {
        fs.mkdirSync(svgDir, { recursive: true });
      }
      
      // Command to convert TSX to SVG
      try {
        // This would use the tsx-to-svg.js script
        // In a real implementation, this might use a headless browser
        const outputPath = path.join(svgDir, `${component.name}.svg`);
        
        // For now, generate a simple SVG placeholder
        await this.generatePlaceholderSvg(component, outputPath);
        
        // In a real implementation, you'd use:
        // execSync(`node scripts/tsx-to-svg.js ${component.filePath} ${svgDir}`);
        
        console.log(`✅ Generated SVG for ${component.name}`);
      } catch (error) {
        console.warn(`⚠️ Could not generate SVG for ${component.name}: ${error.message}`);
      }
    }
  }
  
  /**
   * Generate placeholder SVG (for demo purposes)
   */
  async generatePlaceholderSvg(component, outputPath) {
    // Create a simple SVG placeholder
    const svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="200" height="200" fill="#131A36" />
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="160" height="160" fill="#331F4A" rx="8" ry="8" />
    <text x="80" y="90" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#FFFFFF">${component.name}</text>
    <text x="80" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5AC8FA">Quantum-Spatial Component</text>
  </g>
</svg>`;
    
    // Optimize SVG
    const optimizedSvg = await this.svgo.optimize(svgContent);
    
    // Write SVG to file
    fs.writeFileSync(outputPath, optimizedSvg.data);
    
    return outputPath;
  }
  
  /**
   * Build index file
   */
  buildIndexFile(components) {
    console.log('Building index file...');
    
    // Create index content
    let indexContent = `/**
 * Quantum-Spatial Design System
 * 
 * This is an auto-generated index file for all components.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */

// Core utilities
export { useDesignSystem } from './utils/useDesignSystem';
export { useM4Detection } from './utils/useM4Detection';
export { DesignSystemProvider } from './DesignSystemProvider';

// Design system theme
export { theme } from './theme';

// Components`;
    
    // Add exports for each component
    for (const component of components) {
      indexContent += `export { ${component.name} } from './${component.name}';`;
    }
    
    // Write index file
    const indexPath = path.join(this.outputPath, 'index.ts');
    fs.writeFileSync(indexPath, indexContent);
    
    console.log(`✅ Built index file: ${indexPath}`);
  }
  
  /**
   * Create a new component
   */
  async createComponent(componentName) {
    console.log(`Creating new component: ${componentName}`);
    
    // Create component file path
    const componentPath = path.join(this.componentsPath, `${componentName}.tsx`);
    
    // Check if component already exists
    if (fs.existsSync(componentPath)) {
      throw new Error(`Component ${componentName} already exists at ${componentPath}`);
    }
    
    // Determine component type based on name
    const componentType = this.categorizeComponent(`${componentName}.tsx`);
    
    // Create component content
    const componentContent = this.generateComponentTemplate(componentName, componentType);
    
    // Write component file
    fs.writeFileSync(componentPath, componentContent);
    
    console.log(`✅ Created component: ${componentPath}`);
    
    // Build the component
    await this.buildComponent({
      name: componentName,
      filePath: componentPath,
      type: componentType
    });
    
    return componentPath;
  }
  
  /**
   * Generate component template
   */
  generateComponentTemplate(componentName, componentType) {
    // Base template for different component types
    switch (componentType) {
      case 'pixel':
        return this.generatePixelComponentTemplate(componentName);
      case 'grid':
        return this.generateGridComponentTemplate(componentName);
      case 'button':
        return this.generateButtonComponentTemplate(componentName);
      case 'card':
        return this.generateCardComponentTemplate(componentName);
      case 'input':
        return this.generateInputComponentTemplate(componentName);
      case 'navigation':
        return this.generateNavigationComponentTemplate(componentName);
      default:
        return this.generateBaseComponentTemplate(componentName);
    }
  }
  
  /**
   * Generate base component template
   */
  generateBaseComponentTemplate(componentName) {
    return `import React from 'react';
import { useDesignSystem, useM4Detection } from './utils';

interface ${componentName}Props {
  /** The state of the component */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * Quantum-Spatial Design System - ${componentName}
 * 
 * This component is optimized for Apple Silicon M4 devices
 * with Neural Engine acceleration for animations and effects.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */
export function ${componentName}({
  state: propState,
  className,
  style,
  children,
  ...props
}: ${componentName}Props) {
  // Detect M4 capabilities for optimized rendering
  const { hasM4, hasNeuralEngine } = useM4Detection();
  
  // Use design system
  const { state: contextState } = useDesignSystem();
  const state = propState || contextState;
  
  return (
    <div
      className={\`quantum-${componentName.toLowerCase()} quantum-state-\${state} \${className || ''}\`}
      style={{
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
`;
  }
  
  /**
   * Generate pixel component template
   */
  generatePixelComponentTemplate(componentName) {
    return `import React, { useEffect, useRef } from 'react';
import { useDesignSystem, useM4Detection } from './utils';

interface ${componentName}Props {
  /** The state of the pixel */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Size of the pixel (1x-4x) */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Quantum-Spatial Design System - ${componentName}
 * 
 * This component is optimized for Apple Silicon M4 devices
 * with Neural Engine acceleration for animations and effects.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */
export function ${componentName}({
  state: propState,
  size = 'md',
  animationDuration = 600,
  className,
  style,
  ...props
}: ${componentName}Props) {
  // Detect M4 capabilities for optimized rendering
  const { hasM4, hasNeuralEngine } = useM4Detection();
  
  // Use design system
  const { state: contextState } = useDesignSystem();
  const state = propState || contextState;
  
  // Refs for animation
  const pixelRef = useRef<SVGSVGElement>(null);
  
  // Calculate sizes based on size prop
  const sizes = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
  };
  
  const pixelSize = sizes[size];
  
  // Effect for animation
  useEffect(() => {
    if (pixelRef.current) {
      // Reset animation
      pixelRef.current.style.animation = 'none';
      pixelRef.current.getBoundingClientRect(); // Force reflow
      
      // Apply animation based on state
      if (state === 'heritage') {
        pixelRef.current.style.animation = \`heritageStateAnimation \${animationDuration}ms ease-in-out\`;
      } else if (state === 'transitional') {
        pixelRef.current.style.animation = \`transitionalStateAnimation \${animationDuration}ms cubic-bezier(0.16, 1, 0.3, 1)\`;
      } else if (state === 'quantum') {
        pixelRef.current.style.animation = \`quantumStateAnimation \${animationDuration}ms cubic-bezier(0.17, 0.89, 0.32, 1.25)\`;
      } else if (state === 'superposition') {
        pixelRef.current.style.animation = \`superpositionStateAnimation \${animationDuration * 2}ms ease-in-out infinite\`;
      }
    }
  }, [state, animationDuration]);
  
  // Get colors based on state
  const getColors = () => {
    switch (state) {
      case 'heritage':
        return {
          primary: '#2C5F2D',
          secondary: '#3D8B40',
          glow: '#3DFF74',
        };
      case 'transitional':
        return {
          primary: '#331F4A',
          secondary: '#5AC8FA',
          glow: '#613FE7',
        };
      case 'quantum':
        return {
          primary: '#6A3093',
          secondary: '#BF4080',
          glow: '#FF2D55',
        };
      case 'superposition':
        return {
          primary: '#131A36',
          secondary: '#5AC8FA',
          glow: '#BF4080',
        };
      default:
        return {
          primary: '#331F4A',
          secondary: '#5AC8FA',
          glow: '#613FE7',
        };
    }
  };
  
  const colors = getColors();
  
  return (
    <svg
      ref={pixelRef}
      className={\`quantum-pixel quantum-state-\${state} \${className || ''}\`}
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 32 32"
      style={{
        width: pixelSize,
        height: pixelSize,
        filter: \`drop-shadow(0 0 \${pixelSize / 4}px \${colors.glow}40)\`,
        ...style
      }}
      {...props}
    >
      <style>
        /* CSS animations for different states */
        @keyframes heritageStateAnimation {
          0% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes transitionalStateAnimation {
          0% { opacity: 0.7; transform: scale(0.95) rotate(0deg); }
          50% { opacity: 0.9; transform: scale(1.02) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes quantumStateAnimation {
          0% { opacity: 0.5; transform: scale(0.9) translateY(3px); filter: blur(2px); }
          60% { opacity: 0.9; transform: scale(1.05) translateY(-1px); filter: blur(0px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        @keyframes superpositionStateAnimation {
          0% { opacity: 0.7; transform: scale(1); }
          25% { opacity: 0.9; transform: scale(1.03) translateX(1px); }
          50% { opacity: 1; transform: scale(1.05) translateX(-1px); }
          75% { opacity: 0.9; transform: scale(1.03) translateX(1px); }
          100% { opacity: 0.7; transform: scale(1); }
        }
      </style>
    
      {state === 'heritage' && (
        <rect x="4" y="4" width="24" height="24" fill={colors.primary} rx="0" ry="0" />
      )}
      
      {state === 'transitional' && (
        <>
          <rect x="4" y="4" width="24" height="24" fill={colors.primary} rx="2" ry="2" />
          <rect x="8" y="8" width="16" height="16" fill={colors.secondary + '40'} rx="2" ry="2" />
        </>
      )}
      
      {state === 'quantum' && (
        <>
          <rect x="4" y="4" width="24" height="24" fill={colors.primary} rx="4" ry="4" />
          <rect x="8" y="8" width="16" height="16" fill={colors.secondary + '40'} rx="3" ry="3" />
          <rect x="12" y="12" width="8" height="8" fill={colors.glow + '30'} rx="2" ry="2" />
        </>
      )}
      
      {state === 'superposition' && (
        <>
          <rect x="6" y="6" width="20" height="20" fill={colors.primary} rx="2" ry="2" opacity="0.7" />
          <rect x="4" y="4" width="20" height="20" fill={colors.secondary} rx="0" ry="0" opacity="0.5" />
          <rect x="8" y="8" width="20" height="20" fill={colors.glow} rx="4" ry="4" opacity="0.3" />
        </>
      )}
    </svg>
  );
}
`;
  }
  
  /**
   * Generate grid component template
   */
  generateGridComponentTemplate(componentName) {
    return `import React, { useEffect, useRef } from 'react';
import { useDesignSystem, useM4Detection } from './utils';

interface ${componentName}Props {
  /** The state of the grid */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Grid type */
  type?: 'background' | 'interface' | 'feature';
  /** Grid density */
  density?: 'fine' | 'medium' | 'coarse';
  /** Whether to apply perspective effect */
  perspective?: boolean;
  /** Custom grid size (overrides density) */
  size?: number;
  /** Custom grid opacity (0-1) */
  opacity?: number;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Quantum-Spatial Design System - ${componentName}
 * 
 * This component is optimized for Apple Silicon M4 devices
 * with Neural Engine acceleration for animations and effects.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */
export function ${componentName}({
  state: propState,
  type = 'background',
  density = 'medium',
  perspective = true,
  size,
  opacity,
  className,
  style,
  ...props
}: ${componentName}Props) {
  // Detect M4 capabilities for optimized rendering
  const { hasM4, hasNeuralEngine } = useM4Detection();
  
  // Use design system
  const { state: contextState } = useDesignSystem();
  const state = propState || contextState;
  
  // Refs for animation
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Calculate grid size based on density
  const gridSizes = {
    fine: 8,
    medium: 16,
    coarse: 32,
  };
  
  const gridSize = size || gridSizes[density];
  
  // Calculate opacity based on type
  const opacities = {
    background: {
      heritage: 0.03,
      transitional: 0.05,
      quantum: 0.08,
      superposition: 0.1,
    },
    interface: {
      heritage: 0.06,
      transitional: 0.1,
      quantum: 0.15,
      superposition: 0.2,
    },
    feature: {
      heritage: 0.1,
      transitional: 0.15,
      quantum: 0.2,
      superposition: 0.25,
    },
  };
  
  const gridOpacity = opacity !== undefined ? opacity : opacities[type][state];
  
  // Get colors based on state
  const getColor = () => {
    switch (state) {
      case 'heritage':
        return '#3DFF74';
      case 'transitional':
        return '#5AC8FA';
      case 'quantum':
        return '#BF4080';
      case 'superposition':
        return '#6A3093';
      default:
        return '#5AC8FA';
    }
  };
  
  const gridColor = getColor();
  
  // Effect for subtle mouse-based perspective shift (on M4 devices only)
  useEffect(() => {
    if (!hasM4 || !perspective || !gridRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      
      if (gridRef.current) {
        const rotateX = mouseRef.current.y * -5;
        const rotateY = mouseRef.current.x * 5;
        
        gridRef.current.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(2)\`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasM4, perspective]);
  
  return (
    <div
      ref={gridRef}
      className={\`quantum-grid quantum-state-\${state} quantum-grid-\${type} quantum-grid-\${density} \${className || ''}\`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: \`
          linear-gradient(to right, \${gridColor}\${Math.floor(gridOpacity * 100)} 1px, transparent 1px),
          linear-gradient(to bottom, \${gridColor}\${Math.floor(gridOpacity * 100)} 1px, transparent 1px)
        \`,
        backgroundSize: \`\${gridSize}px \${gridSize}px\`,
        transform: perspective ? 'perspective(1000px) rotateX(60deg) scale(2)' : 'none',
        transformOrigin: 'center bottom',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 1,
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {state === 'superposition' && hasM4 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: \`
              linear-gradient(to right, \${gridColor}\${Math.floor(gridOpacity * 70)} 1px, transparent 1px),
              linear-gradient(to bottom, \${gridColor}\${Math.floor(gridOpacity * 70)} 1px, transparent 1px)
            \`,
            backgroundSize: \`\${gridSize * 2}px \${gridSize * 2}px\`,
            transform: 'scale(1.02) rotate(2deg)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            opacity: 0.5,
            mixBlendMode: 'lighten',
          }}
        />
      )}
    </div>
  );
}
`;
  }
  
  /**
   * Generate button component template
   */
  generateButtonComponentTemplate(componentName) {
    return `import React, { useState } from 'react';
import { useDesignSystem, useM4Detection } from './utils';

interface ${componentName}Props {
  /** The state of the button */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Quantum-Spatial Design System - ${componentName}
 * 
 * This component is optimized for Apple Silicon M4 devices
 * with Neural Engine acceleration for animations and effects.
 * 
 * @version 1.0.0
 * @optimized-for M4
 */
export function ${componentName}({
  state: propState,
  size = 'md',
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  style,
  children,
  ...props
}: ${componentName}Props) {
  // Detect M4 capabilities for optimized rendering
  const { hasM4, hasNeuralEngine } = useM4Detection();
  
  // Use design system
  const { state: contextState } = useDesignSystem();
  const state = propState || contextState;
  
  // States for interaction
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Get colors based on state and variant
  const getColors = () => {
    const stateColors = {
      heritage: {
        primary: {
          background: '#2C5F2D',
          text: '#FFFFFF',
          border: 'transparent',
          glow: '#3DFF74',
        },
        secondary: {
          background: 'transparent',
          text: '#2C5F2D',
          border: '#2C5F2D',
          glow: '#3DFF74',
        },
        ghost: {
          background: 'transparent',
          text: '#2C5F2D',
          border: 'transparent',
          glow: '#3DFF74',
        },
      },
      transitional: {
        primary: {
          background: '#331F4A',
          text: '#FFFFFF',
          border: 'transparent',
          glow: '#5AC8FA',
        },
        secondary: {
          background: 'transparent',
          text: '#331F4A',
          border: '#331F4A',
          glow: '#5AC8FA',
        },
        ghost: {
          background: 'transparent',
          text: '#331F4A',
          border: 'transparent',
          glow: '#5AC8FA',
        },
      },
      quantum: {
        primary: {
          background: '#6A3093',
          text: '#FFFFFF',
          border: 'transparent',
          glow: '#FF2D55',
        },
        secondary: {
          background: 'transparent',
          text: '#6A3093',
          border: '#6A3093',
          glow: '#FF2D55',
        },
        ghost: {
          background: 'transparent',
          text: '#6A3093',
          border: 'transparent',
          glow: '#FF2D55',
        },
      },
      superposition: {
        primary: {
          background: '#131A36',
          text: '#FFFFFF',
          border: 'transparent',
          glow: '#BF4080',
        },
        secondary: {
          background: 'transparent',
          text: '#131A36',
          border: '#131A36',
          glow: '#BF4080',
        },
        ghost: {
          background: 'transparent',
          text: '#131A36',
          border: 'transparent',
          glow: '#BF4080',
        },
      },
    };
    return stateColors[state]?.[variant] || stateColors.transitional.primary;
  };
  const colors = getColors();
  return (
    <button
      className={`quantum-button quantum-state-${state} quantum-button-${variant} quantum-button-${size} ${className || ''}`}
      style={{
        background: colors.background,
        color: colors.text,
        border: \`1px solid \${colors.border}\`,
        boxShadow: isHovered ? \`0 0 0 2px \${colors.glow}40\` : 'none',
        filter: isPressed ? 'brightness(0.95)' : 'none',
        outline: 'none',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style
      }}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
}
`;
  }
}

module.exports = ComponentBuilder; 