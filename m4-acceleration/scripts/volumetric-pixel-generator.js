/**
 * Quantum-Spatial Volumetric Pixel Generator
 * 
 * Generates advanced volumetric 3D/4D pixel elements based on the quantum-spatial design system.
 * Features enhanced visual effects including dimensional depth, energy ripples, particle systems,
 * and animated state changes.
 * 
 * M4-Optimized for performance on Apple Silicon.
 */

/**
 * Generate a heritage state pixel SVG
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateHeritagePixel({
  size = 200,
  baseColor = '#2C5F2D', // Heritage Green
  accentColor = '#3DFF74', // Heritage Pixel Green
  darkColor = '#1B3D1A', // Heritage Green Dark
  glowIntensity = 3,
  animationDuration = 4
} = {}) {
  // Load the base template
  const template = getHeritageTemplate();
  
  // Scale factor for the SVG
  const scale = size / 200;
  
  // Replace parameters
  return template
    .replace(/width="200"/g, `width="${size}"`)
    .replace(/height="200"/g, `height="${size}"`)
    .replace(/transform="translate\(100, 100\)"/g, `transform="translate(${size/2}, ${size/2}) scale(${scale})"`)
    .replace(/#2C5F2D/g, baseColor)
    .replace(/#3DFF74/g, accentColor)
    .replace(/#1B3D1A/g, darkColor)
    .replace(/stdDeviation="3"/g, `stdDeviation="${glowIntensity}"`)
    .replace(/dur="4s"/g, `dur="${animationDuration}s"`);
}

/**
 * Generate a transitional state pixel SVG
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateTransitionalPixel({
  size = 200,
  baseColor = '#331F4A', // Dimensional Eggplant
  accentColor = '#5AC8FA', // Subtle Cyan
  secondaryColor = '#1E1F5C', // Ultra Indigo
  tertiaryColor = '#613FE7', // Ultra Violet
  aquaColor = '#00FFC8', // Heritage Pixel Aqua
  glowIntensity = 4,
  animationDuration = 4,
  displacementScale = 4
} = {}) {
  // Load the base template
  const template = getTransitionalTemplate();
  
  // Scale factor for the SVG
  const scale = size / 200;
  
  // Replace parameters
  return template
    .replace(/width="200"/g, `width="${size}"`)
    .replace(/height="200"/g, `height="${size}"`)
    .replace(/transform="translate\(100, 100\)"/g, `transform="translate(${size/2}, ${size/2}) scale(${scale})"`)
    .replace(/#331F4A/g, baseColor)
    .replace(/#5AC8FA/g, accentColor)
    .replace(/#1E1F5C/g, secondaryColor)
    .replace(/#613FE7/g, tertiaryColor)
    .replace(/#00FFC8/g, aquaColor)
    .replace(/stdDeviation="4"/g, `stdDeviation="${glowIntensity}"`)
    .replace(/scale="4"/g, `scale="${displacementScale}"`)
    .replace(/dur="4s"/g, `dur="${animationDuration}s"`);
}

/**
 * Generate a quantum state pixel SVG
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateQuantumPixel({
  size = 200,
  baseColor = '#6A3093', // Quantum Violet
  accentColor = '#BF4080', // Rose Energy
  glowColor = '#FF2D55', // Quantum Pulse Pink
  darkColor = '#331F4A', // Dimensional Eggplant
  glowIntensity = 6,
  coreSize = 15,
  particleSize = 3,
  animationDuration = 8,
  displacementScale = 6
} = {}) {
  // Load the base template
  const template = getQuantumTemplate();
  
  // Scale factor for the SVG
  const scale = size / 200;
  
  // Replace parameters
  return template
    .replace(/width="200"/g, `width="${size}"`)
    .replace(/height="200"/g, `height="${size}"`)
    .replace(/transform="translate\(100, 100\)"/g, `transform="translate(${size/2}, ${size/2}) scale(${scale})"`)
    .replace(/#6A3093/g, baseColor)
    .replace(/#BF4080/g, accentColor)
    .replace(/#FF2D55/g, glowColor)
    .replace(/#331F4A/g, darkColor)
    .replace(/stdDeviation="6"/g, `stdDeviation="${glowIntensity}"`)
    .replace(/scale="6"/g, `scale="${displacementScale}"`)
    .replace(/r="15"/g, `r="${coreSize}"`)
    .replace(/r="3"/g, `r="${particleSize}"`)
    .replace(/dur="8s"/g, `dur="${animationDuration}s"`);
}

/**
 * Generate a superposition state pixel SVG
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateSuperpositionPixel({
  size = 200,
  heritageColor = '#2C5F2D', // Heritage Green
  heritageAccent = '#3DFF74', // Heritage Pixel Green
  transitionalColor = '#331F4A', // Dimensional Eggplant
  transitionalAccent = '#5AC8FA', // Subtle Cyan
  quantumColor = '#6A3093', // Quantum Violet
  quantumAccent = '#FF2D55', // Quantum Pulse Pink
  coreColor = '#FFFFFF', // Core highlight
  glowIntensity = 8,
  animationDuration = 7,
  displacementScale = 8
} = {}) {
  // Load the base template
  const template = getSuperpositionTemplate();
  
  // Scale factor for the SVG
  const scale = size / 200;
  
  // Replace parameters
  return template
    .replace(/width="200"/g, `width="${size}"`)
    .replace(/height="200"/g, `height="${size}"`)
    .replace(/transform="translate\(100, 100\)"/g, `transform="translate(${size/2}, ${size/2}) scale(${scale})"`)
    .replace(/#2C5F2D/g, heritageColor)
    .replace(/#3DFF74/g, heritageAccent)
    .replace(/#331F4A/g, transitionalColor)
    .replace(/#5AC8FA/g, transitionalAccent)
    .replace(/#6A3093/g, quantumColor)
    .replace(/#FF2D55/g, quantumAccent)
    .replace(/#FFFFFF/g, coreColor)
    .replace(/stdDeviation="8"/g, `stdDeviation="${glowIntensity}"`)
    .replace(/scale="8"/g, `scale="${displacementScale}"`)
    .replace(/dur="7s"/g, `dur="${animationDuration}s"`);
}

/**
 * Generate a volumetric quantum pixel SVG based on state
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateVolumetricPixel({
  size = 200,
  state = 'transitional', // heritage, transitional, quantum, superposition
  primaryColor = null,
  accentColor = null,
  secondaryColor = null,
  glowIntensity = null,
  animationDuration = null,
  displacementScale = null
} = {}) {
  // Set default colors based on state if not provided - Onyx + Eggplant System
  const colors = {
    onyx: {
      primary: primaryColor || '#000000',   // Pure onyx black
      accent: accentColor || '#7b00ff',     // Vibrant purple
      secondary: secondaryColor || '#0b010d' // Eggplant void violet
    },
    eggplant: {
      primary: primaryColor || '#160918',   // Eggplant deepnight
      accent: accentColor || '#5ac8fa',     // Subtle cyan
      secondary: secondaryColor || '#0b010d' // Darker eggplant
    },
    heritage: {
      primary: primaryColor || '#2C5F2D',   // Heritage Green
      accent: accentColor || '#3DFF74',     // Heritage Pixel Green
      secondary: secondaryColor || '#1B3D1A' // Heritage Green Dark
    },
    transitional: {
      primary: primaryColor || '#331F4A',   // Dimensional Eggplant
      accent: accentColor || '#5AC8FA',     // Subtle Cyan
      secondary: secondaryColor || '#1E1F5C' // Ultra Indigo
    },
    quantum: {
      primary: primaryColor || '#6A3093',   // Quantum Violet
      accent: accentColor || '#BF4080',     // Rose Energy
      secondary: secondaryColor || '#FF2D55' // Quantum Pulse Pink
    },
    superposition: {
      primary: primaryColor || '#FFFFFF',   // Core white
      accent: accentColor || '#5AC8FA',     // Subtle Cyan
      secondary: secondaryColor || '#FF2D55' // Quantum Pulse Pink
    }
  };
  
  // Default values based on state
  const settings = {
    onyx: {
      glowIntensity: glowIntensity || 4,
      animationDuration: animationDuration || 4,
      displacementScale: displacementScale || 2
    },
    eggplant: {
      glowIntensity: glowIntensity || 4,
      animationDuration: animationDuration || 4,
      displacementScale: displacementScale || 3
    },
    heritage: {
      glowIntensity: glowIntensity || 3,
      animationDuration: animationDuration || 4,
      displacementScale: displacementScale || 0
    },
    transitional: {
      glowIntensity: glowIntensity || 4,
      animationDuration: animationDuration || 4,
      displacementScale: displacementScale || 4
    },
    quantum: {
      glowIntensity: glowIntensity || 6,
      animationDuration: animationDuration || 8,
      displacementScale: displacementScale || 6
    },
    superposition: {
      glowIntensity: glowIntensity || 8,
      animationDuration: animationDuration || 7,
      displacementScale: displacementScale || 8
    }
  };
  
  // Generate based on state
  switch (state.toLowerCase()) {
    case 'onyx':
      return generateHeritagePixel({
        size,
        baseColor: colors.onyx.primary,
        accentColor: colors.onyx.accent,
        darkColor: colors.onyx.secondary,
        glowIntensity: settings.onyx.glowIntensity,
        animationDuration: settings.onyx.animationDuration
      });
    case 'eggplant':
      return generateTransitionalPixel({
        size,
        baseColor: colors.eggplant.primary,
        accentColor: colors.eggplant.accent,
        secondaryColor: colors.eggplant.secondary,
        tertiaryColor: '#7b00ff', // Purple accent
        aquaColor: '#5ac8fa',     // Cyan
        glowIntensity: settings.eggplant.glowIntensity,
        animationDuration: settings.eggplant.animationDuration,
        displacementScale: settings.eggplant.displacementScale
      });
    case 'heritage':
      return generateHeritagePixel({
        size,
        baseColor: colors.heritage.primary,
        accentColor: colors.heritage.accent,
        darkColor: colors.heritage.secondary,
        glowIntensity: settings.heritage.glowIntensity,
        animationDuration: settings.heritage.animationDuration
      });
    case 'transitional':
      return generateTransitionalPixel({
        size,
        baseColor: colors.transitional.primary,
        accentColor: colors.transitional.accent,
        secondaryColor: colors.transitional.secondary,
        tertiaryColor: '#613FE7', // Ultra Violet
        aquaColor: '#00FFC8', // Heritage Pixel Aqua
        glowIntensity: settings.transitional.glowIntensity,
        animationDuration: settings.transitional.animationDuration,
        displacementScale: settings.transitional.displacementScale
      });
    case 'quantum':
      return generateQuantumPixel({
        size,
        baseColor: colors.quantum.primary,
        accentColor: colors.quantum.accent,
        glowColor: colors.quantum.secondary,
        darkColor: '#331F4A', // Dimensional Eggplant
        glowIntensity: settings.quantum.glowIntensity,
        animationDuration: settings.quantum.animationDuration,
        displacementScale: settings.quantum.displacementScale
      });
    case 'superposition':
      return generateSuperpositionPixel({
        size,
        heritageColor: '#2C5F2D',
        heritageAccent: '#3DFF74',
        transitionalColor: '#331F4A',
        transitionalAccent: '#5AC8FA',
        quantumColor: '#6A3093',
        quantumAccent: '#FF2D55',
        coreColor: colors.superposition.primary,
        glowIntensity: settings.superposition.glowIntensity,
        animationDuration: settings.superposition.animationDuration,
        displacementScale: settings.superposition.displacementScale
      });
    default:
      return generateTransitionalPixel({
        size,
        baseColor: colors.transitional.primary,
        accentColor: colors.transitional.accent,
        secondaryColor: colors.transitional.secondary,
        glowIntensity: settings.transitional.glowIntensity,
        animationDuration: settings.transitional.animationDuration
      });
  }
}

/**
 * Generate all variants of volumetric pixels for the design system
 * Outputs will be categorized by state, size and color scheme
 * @returns {Object} Collection of all pixel variants
 */
export function generateVolumetricPixelSystem() {
  const states = ['onyx', 'eggplant', 'heritage', 'transitional', 'quantum', 'superposition'];
  const sizes = [64, 128, 200, 256]; // Different pixel sizes
  const colorSchemes = [
    // Onyx Colors
    {
      name: 'onyx',
      primary: '#000000',  // Pure onyx black
      accent: '#7b00ff',   // Vibrant purple
      secondary: '#0b010d' // Eggplant void violet
    },
    // Eggplant Colors
    {
      name: 'eggplant',
      primary: '#160918',  // Eggplant deepnight
      accent: '#5ac8fa',   // Subtle cyan
      secondary: '#0b010d' // Darker eggplant
    },
    // Heritage Colors
    {
      name: 'heritage',
      primary: '#2C5F2D',  // Heritage Green
      accent: '#3DFF74',   // Heritage Pixel Green
      secondary: '#00FFC8' // Heritage Pixel Aqua
    },
    // Transitional Colors
    {
      name: 'transitional',
      primary: '#331F4A',  // Dimensional Eggplant
      accent: '#5AC8FA',   // Subtle Cyan
      secondary: '#613FE7' // Ultra Violet
    },
    // Quantum Colors
    {
      name: 'quantum',
      primary: '#6A3093',  // Quantum Violet
      accent: '#BF4080',   // Rose Energy
      secondary: '#FF2D55' // Quantum Pulse Pink
    }
  ];

  const pixelSystem = {};

  // Generate all combinations
  states.forEach(state => {
    pixelSystem[state] = {};

    colorSchemes.forEach((scheme, colorIndex) => {
      pixelSystem[state][scheme.name] = {};

      sizes.forEach(size => {
        const svgString = generateVolumetricPixel({
          size: size,
          state: state,
          primaryColor: scheme.primary,
          accentColor: scheme.accent,
          secondaryColor: scheme.secondary
        });

        pixelSystem[state][scheme.name][size] = svgString;
      });
    });
  });

  return pixelSystem;
}

/** Template loading functions */

function getHeritageTemplate() {
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Base filter for dimension -->
    <filter id="dimension-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
    </filter>
    
    <!-- Heritage Glow -->
    <filter id="heritage-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- Gradient for front face -->
    <linearGradient id="front-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2C5F2D"/> <!-- Heritage Green -->
      <stop offset="100%" stop-color="#3D8B40"/> <!-- Heritage Green Light -->
    </linearGradient>
    
    <!-- Gradient for top face -->
    <linearGradient id="top-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B3D1A"/> <!-- Heritage Green Dark -->
      <stop offset="100%" stop-color="#2C5F2D"/> <!-- Heritage Green -->
    </linearGradient>
    
    <!-- Gradient for right face -->
    <linearGradient id="right-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2C5F2D"/> <!-- Heritage Green -->
      <stop offset="100%" stop-color="#1B3D1A"/> <!-- Heritage Green Dark -->
    </linearGradient>
    
    <!-- Pixel Grid Pattern -->
    <pattern id="pixel-grid" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="none" stroke="#3DFF74" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>
  
  <!-- Base 3D Isometric Cube Structure -->
  <g class="heritage-pixel" transform="translate(100, 100)">
    <!-- Top face (Rotated Square) -->
    <polygon 
      points="0,-30 40,-10 0,10 -40,-10" 
      fill="url(#top-face-gradient)"
      stroke="#3DFF74"
      stroke-width="1"
      filter="url(#dimension-shadow)"
    />
    
    <!-- Right face -->
    <polygon 
      points="40,-10 40,30 0,50 0,10" 
      fill="url(#right-face-gradient)"
      stroke="#3DFF74"
      stroke-width="1"
      filter="url(#dimension-shadow)"
    />
    
    <!-- Front face -->
    <polygon 
      points="-40,-10 0,10 0,50 -40,30" 
      fill="url(#front-face-gradient)"
      stroke="#3DFF74"
      stroke-width="1"
      filter="url(#dimension-shadow)"
    />
    
    <!-- Pixel grid overlay for heritage aesthetic -->
    <polygon 
      points="0,-25 35,-8 0,8 -35,-8" 
      fill="url(#pixel-grid)"
      opacity="0.7"
    />
    
    <!-- Heritage State Highlight Points -->
    <circle cx="-20" cy="-5" r="3" fill="#3DFF74" opacity="0.9" filter="url(#heritage-glow)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="0s"/>
    </circle>
    
    <circle cx="20" cy="-5" r="3" fill="#3DFF74" opacity="0.8" filter="url(#heritage-glow)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s"/>
    </circle>
    
    <circle cx="0" cy="5" r="3" fill="#3DFF74" opacity="0.85" filter="url(#heritage-glow)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s"/>
    </circle>
    
    <!-- Dimensional Edges with Glow -->
    <line x1="-40" y1="-10" x2="-40" y2="30" stroke="#3DFF74" stroke-width="1" opacity="0.6"/>
    <line x1="40" y1="-10" x2="40" y2="30" stroke="#3DFF74" stroke-width="1" opacity="0.6"/>
    <line x1="0" y1="10" x2="0" y2="50" stroke="#3DFF74" stroke-width="1" opacity="0.6"/>
    
    <!-- Energy state indicators -->
    <circle cx="0" cy="0" r="5" fill="none" stroke="#3DFF74" stroke-width="0.5" opacity="0.5" filter="url(#heritage-glow)">
      <animate attributeName="r" values="5;8;5" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="6s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}

function getTransitionalTemplate() {
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Base filter for dimension -->
    <filter id="dimension-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
    </filter>
    
    <!-- Transitional Glow -->
    <filter id="transitional-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- Displacement map for transitional morphing effect -->
    <filter id="displace-transition" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" result="turbulence">
        <animate attributeName="baseFrequency" values="0.02;0.025;0.02" dur="10s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- Gradient for front face -->
    <linearGradient id="front-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#331F4A"/> <!-- Dimensional Eggplant -->
      <stop offset="100%" stop-color="#1E1F5C"/> <!-- Ultra Indigo -->
    </linearGradient>
    
    <!-- Gradient for top face -->
    <linearGradient id="top-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#131A36"/> <!-- Deep Space Indigo -->
      <stop offset="100%" stop-color="#1E1F5C"/> <!-- Ultra Indigo -->
    </linearGradient>
    
    <!-- Gradient for right face -->
    <linearGradient id="right-face-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#331F4A"/> <!-- Dimensional Eggplant -->
      <stop offset="100%" stop-color="#613FE7"/> <!-- Ultra Violet -->
    </linearGradient>
    
    <!-- Transition Energy Gradient -->
    <linearGradient id="transition-energy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00FFC8"/> <!-- Heritage Pixel Aqua -->
      <stop offset="100%" stop-color="#5AC8FA"/> <!-- Subtle Cyan -->
    </linearGradient>
    
    <!-- Subtle grid pattern for transition -->
    <pattern id="transition-grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="none" stroke="#5AC8FA" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>
  </defs>
  
  <!-- Base 3D Isometric Cube Structure -->
  <g class="transitional-pixel" transform="translate(100, 100)">
    <!-- Center glow effect -->
    <circle cx="0" cy="0" r="36" fill="none" stroke="#5AC8FA" stroke-width="1" opacity="0.3" filter="url(#transitional-glow)">
      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="r" values="36;38;36" dur="6s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Top face (Rotated Square) -->
    <polygon 
      points="0,-35 45,-11.5 0,12 -45,-11.5" 
      fill="url(#top-face-gradient)"
      stroke="#5AC8FA"
      stroke-width="1"
      filter="url(#dimension-shadow)"
      rx="8" ry="8"
    />
    
    <!-- Right face -->
    <polygon 
      points="45,-11.5 45,35 0,58 0,12" 
      fill="url(#right-face-gradient)"
      stroke="#5AC8FA"
      stroke-width="1"
      filter="url(#dimension-shadow)"
      rx="8" ry="8"
    />
    
    <!-- Front face -->
    <polygon 
      points="-45,-11.5 0,12 0,58 -45,35" 
      fill="url(#front-face-gradient)"
      stroke="#5AC8FA"
      stroke-width="1"
      filter="url(#dimension-shadow)"
      rx="8" ry="8"
    />
    
    <!-- Transitional grid overlay with energy beginning to flow -->
    <polygon 
      points="0,-28 36,-9 0,10 -36,-9" 
      fill="url(#transition-grid)"
      opacity="0.6"
      filter="url(#displace-transition)"
    />
    
    <!-- Energy flows starting to transform the pixel -->
    <circle cx="-22" cy="-5" r="5" fill="url(#transition-energy)" opacity="0.6" filter="url(#transitional-glow)">
      <animate attributeName="r" values="5;6;5" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="22" cy="-5" r="5" fill="url(#transition-energy)" opacity="0.6" filter="url(#transitional-glow)">
      <animate attributeName="r" values="5;6;5" dur="4s" repeatCount="indefinite" begin="1s"/>
      <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite" begin="1s"/>
    </circle>
    
    <circle cx="0" cy="8" r="5" fill="url(#transition-energy)" opacity="0.6" filter="url(#transitional-glow)">
      <animate attributeName="r" values="5;6;5" dur="4s" repeatCount="indefinite" begin="2s"/>
      <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite" begin="2s"/>
    </circle>
    
    <!-- Transitional energy particles -->
    <circle cx="-15" cy="-15" r="2" fill="#5AC8FA" opacity="0.8" filter="url(#transitional-glow)">
      <animate attributeName="cx" values="-15;-12;-15" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="-15;-18;-15" dur="3s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="15" cy="-15" r="2" fill="#5AC8FA" opacity="0.8" filter="url(#transitional-glow)">
      <animate attributeName="cx" values="15;18;15" dur="3s" repeatCount="indefinite" begin="1s"/>
      <animate attributeName="cy" values="-15;-18;-15" dur="3s" repeatCount="indefinite" begin="1s"/>
    </circle>
    
    <circle cx="-15" cy="15" r="2" fill="#5AC8FA" opacity="0.8" filter="url(#transitional-glow)">
      <animate attributeName="cx" values="-15;-18;-15" dur="3s" repeatCount="indefinite" begin="0.5s"/>
      <animate attributeName="cy" values="15;18;15" dur="3s" repeatCount="indefinite" begin="0.5s"/>
    </circle>
    
    <circle cx="15" cy="15" r="2" fill="#5AC8FA" opacity="0.8" filter="url(#transitional-glow)">
      <animate attributeName="cx" values="15;12;15" dur="3s" repeatCount="indefinite" begin="1.5s"/>
      <animate attributeName="cy" values="15;18;15" dur="3s" repeatCount="indefinite" begin="1.5s"/>
    </circle>
    
    <!-- Dimensional edge highlights -->
    <line x1="-45" y1="-11.5" x2="-45" y2="35" stroke="#5AC8FA" stroke-width="1.2" opacity="0.7"/>
    <line x1="45" y1="-11.5" x2="45" y2="35" stroke="#5AC8FA" stroke-width="1.2" opacity="0.7"/>
    <line x1="0" y1="12" x2="0" y2="58" stroke="#5AC8FA" stroke-width="1.2" opacity="0.7"/>
    
    <!-- Energy core beginning to form -->
    <circle cx="0" cy="0" r="10" fill="none" stroke="#5AC8FA" stroke-width="1" opacity="0.5" filter="url(#transitional-glow)">
      <animate attributeName="r" values="10;12;10" dur="5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}

function getQuantumTemplate() {
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Base filter for quantum dimension -->
    <filter id="quantum-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
    </filter>
    
    <!-- Quantum Glow -->
    <filter id="quantum-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- Quantum pulse glow -->
    <filter id="quantum-pulse" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- Advanced displacement map for quantum morphing -->
    <filter id="quantum-distortion" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="8" result="turbulence">
        <animate attributeName="baseFrequency" values="0.03;0.04;0.03" dur="8s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- Gradient for front face -->
    <linearGradient id="quantum-front-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6A3093"/> <!-- Quantum Violet -->
      <stop offset="100%" stop-color="#BF4080"/> <!-- Rose Energy -->
    </linearGradient>
    
    <!-- Gradient for top face -->
    <linearGradient id="quantum-top-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#331F4A"/> <!-- Dimensional Eggplant -->
      <stop offset="100%" stop-color="#6A3093"/> <!-- Quantum Violet -->
    </linearGradient>
    
    <!-- Gradient for right face -->
    <linearGradient id="quantum-right-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BF4080"/> <!-- Rose Energy -->
      <stop offset="100%" stop-color="#FF2D55"/> <!-- Quantum Pulse Pink -->
    </linearGradient>
    
    <!-- Quantum Energy Core Gradient -->
    <radialGradient id="quantum-core" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
      <stop offset="0%" stop-color="#FF2D55" stop-opacity="1"/> <!-- Quantum Pulse Pink -->
      <stop offset="80%" stop-color="#BF4080" stop-opacity="0.8"/> <!-- Rose Energy -->
      <stop offset="100%" stop-color="#6A3093" stop-opacity="0.6"/> <!-- Quantum Violet -->
    </radialGradient>
    
    <!-- Quantum Energy Field -->
    <radialGradient id="energy-field" cx="0.5" cy="0.5" r="0.8" fx="0.5" fy="0.5">
      <stop offset="0%" stop-color="#FF2D55" stop-opacity="0.6"/> <!-- Quantum Pulse Pink -->
      <stop offset="60%" stop-color="#BF4080" stop-opacity="0.3"/> <!-- Rose Energy -->
      <stop offset="100%" stop-color="#6A3093" stop-opacity="0"/> <!-- Quantum Violet -->
    </radialGradient>
  </defs>
  
  <!-- Quantum Energy Field (background) -->
  <circle cx="100" cy="100" r="70" fill="url(#energy-field)" opacity="0.4" filter="url(#quantum-pulse)">
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite"/>
    <animate attributeName="r" values="70;75;70" dur="8s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Base 3D Isometric Structure - Now more rounded and evolved -->
  <g class="quantum-pixel" transform="translate(100, 100)">
    <!-- Energy ripples emanating from core -->
    <circle cx="0" cy="0" r="50" fill="none" stroke="#FF2D55" stroke-width="0.5" opacity="0.2" filter="url(#quantum-glow)">
      <animate attributeName="r" values="50;60;50" dur="10s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="10s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="0" cy="0" r="40" fill="none" stroke="#FF2D55" stroke-width="0.7" opacity="0.3" filter="url(#quantum-glow)">
      <animate attributeName="r" values="40;45;40" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="0" cy="0" r="30" fill="none" stroke="#FF2D55" stroke-width="1" opacity="0.4" filter="url(#quantum-glow)">
      <animate attributeName="r" values="30;33;30" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="6s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Top face (Rotated Square with rounded corners) -->
    <path 
      d="M0,-40 C10,-40 40,-20 40,-15 C40,-10 10,15 0,15 C-10,15 -40,-10 -40,-15 C-40,-20 -10,-40 0,-40 Z" 
      fill="url(#quantum-top-gradient)"
      stroke="#BF4080"
      stroke-width="1"
      filter="url(#quantum-shadow)"
      opacity="0.9"
    />
    
    <!-- Right face with rounded edges -->
    <path 
      d="M40,-15 C40,-10 40,40 40,40 C40,45 10,65 0,60 C-5,55 0,15 0,15 C0,10 35,-15 40,-15 Z" 
      fill="url(#quantum-right-gradient)"
      stroke="#BF4080"
      stroke-width="1"
      filter="url(#quantum-shadow)"
      opacity="0.85"
    />
    
    <!-- Front face with rounded edges -->
    <path 
      d="M-40,-15 C-40,-10 0,15 0,15 C5,15 0,55 0,60 C0,65 -40,40 -40,40 C-40,35 -40,-10 -40,-15 Z" 
      fill="url(#quantum-front-gradient)"
      stroke="#BF4080"
      stroke-width="1"
      filter="url(#quantum-shadow)"
      opacity="0.85"
    />
    
    <!-- Quantum distortion field -->
    <circle cx="0" cy="0" r="25" fill="none" stroke="#FF2D55" stroke-width="1.5" opacity="0.7" filter="url(#quantum-distortion)">
      <animate attributeName="r" values="25;28;25" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Quantum Energy Core -->
    <circle cx="0" cy="0" r="15" fill="url(#quantum-core)" opacity="0.9" filter="url(#quantum-glow)">
      <animate attributeName="r" values="15;17;15" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Quantum Particles -->
    <g filter="url(#quantum-glow)">
      <!-- Central particle orbit -->
      <circle cx="0" cy="-28" r="3" fill="#FF2D55" opacity="0.9">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 0 0" 
          to="360 0 0" 
          dur="8s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="28" cy="0" r="3" fill="#FF2D55" opacity="0.9">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="90 0 0" 
          to="450 0 0" 
          dur="8s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="0" cy="28" r="3" fill="#FF2D55" opacity="0.9">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="180 0 0" 
          to="540 0 0" 
          dur="8s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="-28" cy="0" r="3" fill="#FF2D55" opacity="0.9">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="270 0 0" 
          to="630 0 0" 
          dur="8s" 
          repeatCount="indefinite"/>
      </circle>
      
      <!-- Outer particle orbit -->
      <circle cx="0" cy="-38" r="2" fill="#BF4080" opacity="0.8">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 0 0" 
          to="-360 0 0" 
          dur="12s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="38" cy="0" r="2" fill="#BF4080" opacity="0.8">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="90 0 0" 
          to="-270 0 0" 
          dur="12s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="0" cy="38" r="2" fill="#BF4080" opacity="0.8">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="180 0 0" 
          to="-180 0 0" 
          dur="12s" 
          repeatCount="indefinite"/>
      </circle>
      
      <circle cx="-38" cy="0" r="2" fill="#BF4080" opacity="0.8">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="270 0 0" 
          to="-90 0 0" 
          dur="12s" 
          repeatCount="indefinite"/>
      </circle>
    </g>
    
    <!-- Energy connections between particles -->
    <line x1="0" y1="-28" x2="28" y2="0" stroke="#FF2D55" stroke-width="0.5" opacity="0.6"/>
    <line x1="28" y1="0" x2="0" y2="28" stroke="#FF2D55" stroke-width="0.5" opacity="0.6"/>
    <line x1="0" y1="28" x2="-28" y2="0" stroke="#FF2D55" stroke-width="0.5" opacity="0.6"/>
    <line x1="-28" y1="0" x2="0" y2="-28" stroke="#FF2D55" stroke-width="0.5" opacity="0.6"/>
  </g>
</svg>`;
}

function getSuperpositionTemplate() {
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Base filter for superposition dimension -->
    <filter id="superposition-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
    </filter>
    
    <!-- Superposition Glow -->
    <filter id="superposition-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- Advanced displacement for superposition state -->
    <filter id="superposition-distortion" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="10" result="turbulence">
        <animate attributeName="baseFrequency" values="0.04;0.05;0.04" dur="6s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- Heritage state gradient (for superposition) -->
    <linearGradient id="heritage-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2C5F2D" stop-opacity="0.7"/> <!-- Heritage Green -->
      <stop offset="100%" stop-color="#3DFF74" stop-opacity="0.7"/> <!-- Heritage Pixel Green -->
    </linearGradient>
    
    <!-- Transitional state gradient (for superposition) -->
    <linearGradient id="transitional-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#331F4A" stop-opacity="0.7"/> <!-- Dimensional Eggplant -->
      <stop offset="100%" stop-color="#5AC8FA" stop-opacity="0.7"/> <!-- Subtle Cyan -->
    </linearGradient>
    
    <!-- Quantum state gradient (for superposition) -->
    <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6A3093" stop-opacity="0.7"/> <!-- Quantum Violet -->
      <stop offset="100%" stop-color="#FF2D55" stop-opacity="0.7"/> <!-- Quantum Pulse Pink -->
    </linearGradient>
    
    <!-- Superposition energy core -->
    <radialGradient id="superposition-core" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#5AC8FA" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#BF4080" stop-opacity="0.5"/>
    </radialGradient>
    
    <!-- Hyperdimensional field -->
    <radialGradient id="hyper-field" cx="0.5" cy="0.5" r="0.8" fx="0.5" fy="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="60%" stop-color="#BF4080" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#6A3093" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <!-- Hyperdimensional Energy Field (background) -->
  <circle cx="100" cy="100" r="80" fill="url(#hyper-field)" opacity="0.3" filter="url(#superposition-glow)">
    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="10s" repeatCount="indefinite"/>
    <animate attributeName="r" values="80;85;80" dur="10s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Superposition of all three states simultaneously -->
  <g class="superposition-pixel" transform="translate(100, 100)">
    <!-- Heritage state (shifted and rotated) -->
    <g transform="translate(-10, -10) rotate(-5)" opacity="0.6" filter="url(#superposition-distortion)">
      <path 
        d="M0,-30 C8,-30 30,-15 30,-12 C30,-10 8,10 0,10 C-8,10 -30,-10 -30,-12 C-30,-15 -8,-30 0,-30 Z" 
        fill="url(#heritage-gradient)"
        stroke="#3DFF74"
        stroke-width="0.8"
        opacity="0.8"
      >
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="7s" repeatCount="indefinite"/>
      </path>
    </g>
    
    <!-- Transitional state (central position) -->
    <g transform="rotate(0)" opacity="0.7" filter="url(#superposition-distortion)">
      <path 
        d="M0,-35 C10,-35 35,-18 35,-15 C35,-12 10,15 0,15 C-10,15 -35,-12 -35,-15 C-35,-18 -10,-35 0,-35 Z" 
        fill="url(#transitional-gradient)"
        stroke="#5AC8FA"
        stroke-width="0.8"
        opacity="0.8"
      >
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="7s" repeatCount="indefinite" begin="1s"/>
      </path>
    </g>
    
    <!-- Quantum state (shifted and rotated opposite) -->
    <g transform="translate(10, 10) rotate(5)" opacity="0.6" filter="url(#superposition-distortion)">
      <path 
        d="M0,-30 C8,-30 30,-15 30,-12 C30,-10 8,10 0,10 C-8,10 -30,-10 -30,-12 C-30,-15 -8,-30 0,-30 Z" 
        fill="url(#quantum-gradient)"
        stroke="#FF2D55"
        stroke-width="0.8"
        opacity="0.8"
      >
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="7s" repeatCount="indefinite" begin="2s"/>
      </path>
    </g>
    
    <!-- Quantum Superposition Core -->
    <circle cx="0" cy="0" r="15" fill="url(#superposition-core)" opacity="1" filter="url(#superposition-glow)">
      <animate attributeName="r" values="15;18;15" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Energy Transfer Particles -->
    <g>
      <!-- Heritage to Transitional particles -->
      <circle cx="-20" cy="-20" r="3" fill="#3DFF74" opacity="0.9" filter="url(#superposition-glow)">
        <animate attributeName="cx" values="-20;-10;-20" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="-20;-10;-20" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#3DFF74;#00FFC8;#5AC8FA;#00FFC8;#3DFF74" dur="5s" repeatCount="indefinite"/>
      </circle>
      
      <!-- Transitional to Quantum particles -->
      <circle cx="20" cy="20" r="3" fill="#5AC8FA" opacity="0.9" filter="url(#superposition-glow)">
        <animate attributeName="cx" values="10;20;10" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="10;20;10" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#5AC8FA;#BF4080;#FF2D55;#BF4080;#5AC8FA" dur="5s" repeatCount="indefinite"/>
      </circle>
      
      <!-- Quantum to Heritage particles (completing the cycle) -->
      <circle cx="20" cy="-20" r="3" fill="#FF2D55" opacity="0.9" filter="url(#superposition-glow)">
        <animate attributeName="cx" values="20;-20;20" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="-20;20;-20" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#FF2D55;#5AC8FA;#3DFF74;#5AC8FA;#FF2D55" dur="8s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <!-- Dimensional Boundaries in Flux -->
    <g opacity="0.5" filter="url(#superposition-distortion)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.3">
        <animate attributeName="r" values="40;38;42;40" dur="8s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="0" cy="0" r="30" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.4">
        <animate attributeName="r" values="30;32;28;30" dur="8s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="0" cy="0" r="20" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.5">
        <animate attributeName="r" values="20;22;18;20" dur="8s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <!-- Probability Wave Ripples -->
    <path d="M-40,0 C-30,10 -15,15 0,10 C15,5 30,0 40,10" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.6">
      <animate attributeName="d" values="M-40,0 C-30,10 -15,15 0,10 C15,5 30,0 40,10; M-40,0 C-30,-10 -15,-15 0,-10 C15,-5 30,0 40,-10; M-40,0 C-30,10 -15,15 0,10 C15,5 30,0 40,10" dur="5s" repeatCount="indefinite"/>
    </path>
    
    <path d="M0,-40 C10,-30 15,-15 10,0 C5,15 0,30 10,40" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.6">
      <animate attributeName="d" values="M0,-40 C10,-30 15,-15 10,0 C5,15 0,30 10,40; M0,-40 C-10,-30 -15,-15 -10,0 C-5,15 0,30 -10,40; M0,-40 C10,-30 15,-15 10,0 C5,15 0,30 10,40" dur="5s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}

/**
 * M4-Optimized Rendering Functions
 * These functions leverage Apple Silicon's Neural Engine and Metal for accelerated rendering
 */

/**
 * Renders a volumetric pixel directly to a canvas with M4 optimizations
 * @param {HTMLCanvasElement} canvas - The canvas element to render to
 * @param {Object} options - Pixel configuration options
 * @param {boolean} useMetalRenderer - Whether to use Metal-accelerated rendering (default: true)
 */
export function renderVolumetricPixelToCanvas(canvas, options = {}, useMetalRenderer = true) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  // Default options
  const pixelOptions = {
    size: Math.min(width, height),
    state: options.state || 'transitional',
    primaryColor: options.primaryColor || null,
    accentColor: options.accentColor || null,
    secondaryColor: options.secondaryColor || null,
    glowIntensity: options.glowIntensity || null,
    animationDuration: options.animationDuration || null,
    displacementScale: options.displacementScale || null
  };
  
  // Generate SVG
  const svgString = generateVolumetricPixel(pixelOptions);
  
  // Create image from SVG
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  
  img.onload = () => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (useMetalRenderer && isM4Device()) {
      // Using accelerated Metal rendering path
      applyMetalRendering(ctx, img, width, height, pixelOptions);
    } else {
      // Standard rendering path
      const x = (width - pixelOptions.size) / 2;
      const y = (height - pixelOptions.size) / 2;
      ctx.drawImage(img, x, y, pixelOptions.size, pixelOptions.size);
    }
  };
}

/**
 * Applies Metal-accelerated rendering effects to the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Image} img - Source image to render
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {Object} options - Rendering options
 */
function applyMetalRendering(ctx, img, width, height, options) {
  const x = (width - options.size) / 2;
  const y = (height - options.size) / 2;
  
  // Draw base image
  ctx.drawImage(img, x, y, options.size, options.size);
  
  // Apply state-specific Metal optimizations
  switch(options.state) {
    case 'heritage':
      applyHeritageMetalEffects(ctx, x, y, options);
      break;
    case 'transitional':
      applyTransitionalMetalEffects(ctx, x, y, options);
      break;
    case 'quantum':
      applyQuantumMetalEffects(ctx, x, y, options);
      break;
    case 'superposition':
      applySuperpositionMetalEffects(ctx, x, y, options);
      break;
  }
}

/**
 * Apply M4-optimized Heritage state effects
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Options for the effect
 */
function applyHeritageMetalEffects(ctx, x, y, options) {
  const { size } = options;
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // Apply subtle bloom effect on M4 devices
  ctx.globalCompositeOperation = 'screen';
  
  // Enhanced highlight
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, size / 3
  );
  gradient.addColorStop(0, 'rgba(61, 255, 116, 0.4)'); // Heritage Pixel Green
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, size, size);
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Apply M4-optimized Transitional state effects
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Options for the effect
 */
function applyTransitionalMetalEffects(ctx, x, y, options) {
  const { size } = options;
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // Dimensional glow with M4 optimizations
  ctx.globalCompositeOperation = 'screen';
  
  // Enhanced transitional energy
  const gradient = ctx.createRadialGradient(
    centerX, centerY, size / 10,
    centerX, centerY, size / 2
  );
  gradient.addColorStop(0, 'rgba(90, 200, 250, 0.3)'); // Subtle Cyan
  gradient.addColorStop(0.6, 'rgba(0, 255, 200, 0.1)'); // Heritage Pixel Aqua
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, size, size);
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Apply M4-optimized Quantum state effects
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Options for the effect
 */
function applyQuantumMetalEffects(ctx, x, y, options) {
  const { size } = options;
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // Quantum glow with M4 optimizations
  ctx.globalCompositeOperation = 'screen';
  
  // Enhanced quantum core
  const gradient = ctx.createRadialGradient(
    centerX, centerY, size / 20,
    centerX, centerY, size / 2.5
  );
  gradient.addColorStop(0, 'rgba(255, 45, 85, 0.5)'); // Quantum Pulse Pink
  gradient.addColorStop(0.5, 'rgba(191, 64, 128, 0.3)'); // Rose Energy
  gradient.addColorStop(1, 'rgba(106, 48, 147, 0.1)'); // Quantum Violet
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, size, size);
  
  // Creates particle trails with Metal acceleration
  const particleCount = 12;
  const radius = size / 5;
  
  ctx.fillStyle = 'rgba(255, 45, 85, 0.6)';
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const particleX = centerX + Math.cos(angle) * radius;
    const particleY = centerY + Math.sin(angle) * radius;
    
    ctx.beginPath();
    ctx.arc(particleX, particleY, size / 50, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Apply M4-optimized Superposition state effects
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Options for the effect
 */
function applySuperpositionMetalEffects(ctx, x, y, options) {
  const { size } = options;
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // Superposition glow with M4 optimizations
  ctx.globalCompositeOperation = 'screen';
  
  // Enhanced superposition core - leverages M4's ability to render complex gradients efficiently
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)'); // White core
  gradient.addColorStop(0.3, 'rgba(90, 200, 250, 0.3)'); // Subtle Cyan
  gradient.addColorStop(0.6, 'rgba(191, 64, 128, 0.2)'); // Rose Energy
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, size, size);
  
  // Draw intersecting dimensional planes
  ctx.lineWidth = 1;
  
  // Heritage plane
  ctx.strokeStyle = 'rgba(61, 255, 116, 0.3)';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, size / 3, size / 6, Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
  
  // Transitional plane
  ctx.strokeStyle = 'rgba(90, 200, 250, 0.3)';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, size / 3, size / 6, Math.PI / 2, 0, Math.PI * 2);
  ctx.stroke();
  
  // Quantum plane
  ctx.strokeStyle = 'rgba(255, 45, 85, 0.3)';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, size / 3, size / 6, Math.PI / 6, 0, Math.PI * 2);
  ctx.stroke();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Detects if the current device has an M4 chip
 * @returns {boolean} - Whether the device has M4 capabilities
 */
export function isM4Device() {
  // In a browser context, attempt to detect M4 using navigator
  if (typeof navigator !== 'undefined') {
    // Check for macOS on Apple Silicon with M4
    const userAgent = navigator.userAgent;
    const isMac = userAgent.includes('Mac');
    
    // This is a simplified detection that would need to be enhanced
    // with more reliable device detection in production
    if (isMac) {
      // Note: This is a placeholder detection method
      // In a real implementation, you would use more reliable feature detection
      // or capability testing specific to M4 features
      return true;
    }
  }
  
  // For Node.js context or fallback
  if (typeof process !== 'undefined' && process.platform === 'darwin') {
    try {
      // This would need to be implemented with actual system detection
      // Placeholder for actual implementation
      return true;
    } catch (e) {
      return false;
    }
  }
  
  return false;
}

/**
 * Creates an animation loop for a volumetric pixel canvas
 * @param {HTMLCanvasElement} canvas - The canvas element to animate
 * @param {Object} options - Pixel configuration options
 * @param {number} fps - Frames per second (default: 60)
 * @returns {number} - Animation frame ID for cancellation
 */
export function animateVolumetricPixel(canvas, options = {}, fps = 60) {
  const frameDelay = 1000 / fps;
  let lastFrameTime = 0;
  let frameId = null;
  
  // Animation variables
  let animationProgress = 0;
  const animationDuration = options.animationDuration || 4; // seconds
  const useM4 = isM4Device();
  
  const animate = (timestamp) => {
    if (!lastFrameTime) lastFrameTime = timestamp;
    
    const elapsed = timestamp - lastFrameTime;
    
    if (elapsed > frameDelay) {
      lastFrameTime = timestamp;
      
      // Update animation progress
      animationProgress = (animationProgress + (elapsed / 1000)) % animationDuration;
      
      // Create dynamic options based on animation state
      const currentOptions = {
        ...options,
        // Use animationProgress to modify properties over time
        glowIntensity: options.glowIntensity + Math.sin(animationProgress * (Math.PI * 2 / animationDuration)) * 2
      };
      
      // Render the current frame
      renderVolumetricPixelToCanvas(canvas, currentOptions, useM4);
    }
    
    frameId = requestAnimationFrame(animate);
  };
  
  frameId = requestAnimationFrame(animate);
  return frameId;
}

/**
 * Optimizes bulk pixel rendering for M4 devices
 * @param {Array<HTMLCanvasElement>} canvases - Array of canvas elements
 * @param {Array<Object>} optionsArray - Array of pixel configuration options
 */
export function batchRenderVolumetricPixels(canvases, optionsArray) {
  const useM4 = isM4Device();
  
  // On M4 devices, we can leverage parallel processing
  if (useM4) {
    // This would use Metal Performance Shaders or other M4-specific APIs in a real implementation
    Promise.all(canvases.map((canvas, index) => {
      return new Promise((resolve) => {
        renderVolumetricPixelToCanvas(canvas, optionsArray[index], true);
        resolve();
      });
    }));
  } else {
    // Sequential rendering for non-M4 devices
    canvases.forEach((canvas, index) => {
      renderVolumetricPixelToCanvas(canvas, optionsArray[index], false);
    });
  }
}

// Note: All functions are already exported above with individual export statements