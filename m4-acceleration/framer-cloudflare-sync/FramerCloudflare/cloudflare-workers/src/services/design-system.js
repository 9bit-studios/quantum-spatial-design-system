/**
 * Quantum-Spatial Design System Service
 *
 * Implementation of the 9Bit Studios Quantum-Spatial Design System
 * with support for three design states:
 * - Heritage (flat orthogonal)
 * - Transitional (emerging dimension)
 * - Quantum (fully dimensional)
 *
 * Optimized for M4 performance with appropriate Metal API usage patterns
 */

// Import the PixelViewer module
const pixelViewer = require('./pixel-viewer');

// Cloudinary integration for asset management
const cloudinaryConfig = {
  cloudName: CLOUDINARY_CLOUD_NAME || '9bitstudios',
  secureDistribution: 'res.cloudinary.com',
  apiKey: null, // Set via environment secrets
  apiSecret: null // Set via environment secrets
};

/**
 * Get Cloudinary URL with optimizations for Apple M4 chipsets
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized Cloudinary URL
 */
function getCloudinaryUrl(publicId, options = {}) {
  const { width, height, format, quality, ...otherOptions } = options;

  // Default transformations
  const transformations = {
    width: width || 'auto',
    height: height || 'auto',
    quality: quality || 'auto',
    format: format || 'auto',
    fetchFormat: 'auto',
    // M4-optimized transformations
    dpr: 'auto',
    colorSpace: 'srgb',
    ...otherOptions
  };

  // Build transformation string
  const transformationString = Object.entries(transformations)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  // Build Cloudinary URL
  return `https://${cloudinaryConfig.secureDistribution}/${cloudinaryConfig.cloudName}/image/upload/${transformationString}/${publicId}`;
}

// Design system token sets
const tokenSets = {
  // Heritage design system tokens (flat orthogonal)
  heritage: {
    _meta: {
      name: 'Heritage',
      description: 'Flat orthogonal design system',
      version: '1.0.0'
    },
    colors: {
      primary: '#131A36', // Deep Space Indigo
      secondary: '#331F4A', // Dimensional Eggplant
      accent: '#5AC8FA', // Subtle Cyan
      background: '#FFFFFF',
      text: '#1A1A1A',
      surface: '#F7F7F7',
      border: '#E0E0E0',
      success: '#00C853',
      warning: '#FFD600',
      error: '#FF3D00'
    },
    typography: {
      fontFamily: 'SF Pro Text, Inter, system-ui, sans-serif',
      baseSize: '16px',
      scale: 1.25,
      headings: {
        h1: {
          fontSize: '2.986rem',
          fontWeight: 700,
          lineHeight: 1.2
        },
        h2: {
          fontSize: '2.488rem',
          fontWeight: 700,
          lineHeight: 1.2
        },
        h3: {
          fontSize: '2.074rem',
          fontWeight: 600,
          lineHeight: 1.3
        },
        h4: {
          fontSize: '1.728rem',
          fontWeight: 600,
          lineHeight: 1.3
        },
        h5: {
          fontSize: '1.44rem',
          fontWeight: 500,
          lineHeight: 1.4
        },
        h6: {
          fontSize: '1.2rem',
          fontWeight: 500,
          lineHeight: 1.4
        }
      },
      body: {
        regular: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5
        },
        small: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.5
        },
        large: {
          fontSize: '1.125rem',
          fontWeight: 400,
          lineHeight: 1.5
        }
      }
    },
    spacing: {
      unit: '8px',
      grid: 8,
      scale: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px'
      }
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      pill: '999px'
    },
    shadows: {
      small: '0 2px 4px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
      large: '0 8px 16px rgba(0, 0, 0, 0.1)'
    },
    material: {
      states: {
        default: {
          reflectivity: 0,
          roughness: 1.0,
          metalness: 0
        }
      }
    },
    gridSystem: {
      columns: 12,
      gutter: '16px',
      margin: '16px',
      type: 'orthogonal',
      responsive: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
      }
    }
  },

  // Transitional design system (emerging dimension)
  transitional: {
    _meta: {
      name: 'Transitional',
      description: 'Emerging dimensional design system',
      version: '1.0.0'
    },
    colors: {
      primary: '#131A36', // Deep Space Indigo
      secondary: '#331F4A', // Dimensional Eggplant
      accent: '#5AC8FA', // Subtle Cyan
      background: '#FFFFFF',
      text: '#121212',
      surface: '#F8F9FA',
      border: '#E4E7EB',
      success: '#00C170',
      warning: '#FFC400',
      error: '#FF4C4C'
    },
    typography: {
      fontFamily: 'SF Pro, Inter, system-ui, sans-serif',
      baseSize: '16px',
      scale: 1.333,
      headings: {
        h1: {
          fontSize: '3.157rem',
          fontWeight: 700,
          lineHeight: 1.2
        },
        h2: {
          fontSize: '2.369rem',
          fontWeight: 700,
          lineHeight: 1.2
        },
        h3: {
          fontSize: '1.777rem',
          fontWeight: 600,
          lineHeight: 1.3
        },
        h4: {
          fontSize: '1.333rem',
          fontWeight: 600,
          lineHeight: 1.3
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.4
        },
        h6: {
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: 1.4
        }
      },
      body: {
        regular: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5
        },
        small: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.5
        },
        large: {
          fontSize: '1.333rem',
          fontWeight: 400,
          lineHeight: 1.5
        }
      }
    },
    spacing: {
      unit: '8px',
      grid: 8,
      scale: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '48px',
        xxl: '64px',
        xxxl: '96px'
      }
    },
    borderRadius: {
      small: '6px',
      medium: '10px',
      large: '16px',
      pill: '999px'
    },
    shadows: {
      small: '0 2px 6px rgba(19, 26, 54, 0.08)',
      medium: '0 6px 12px rgba(19, 26, 54, 0.08)',
      large: '0 12px 24px rgba(19, 26, 54, 0.08)'
    },
    motion: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)'
      }
    },
    material: {
      states: {
        default: {
          reflectivity: 0.1,
          roughness: 0.8,
          metalness: 0.1
        },
        elevated: {
          reflectivity: 0.2,
          roughness: 0.7,
          metalness: 0.2
        }
      }
    },
    gridSystem: {
      columns: 12,
      rows: 12,
      gutter: '16px',
      margin: '24px',
      type: 'adaptive',
      zScale: 0.5,
      responsive: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
      }
    }
  },

  // Quantum-Spatial design system (fully dimensional)
  quantum: {
    _meta: {
      name: 'Quantum',
      description: 'Fully dimensional spatial design system',
      version: '1.0.0'
    },
    colors: {
      primary: '#131A36', // Deep Space Indigo
      secondary: '#331F4A', // Dimensional Eggplant
      accent: '#5AC8FA', // Subtle Cyan
      background: {
        light: '#FFFFFF',
        dark: '#121212'
      },
      text: {
        light: '#0F0F0F',
        dark: '#F5F5F5'
      },
      surface: {
        light: '#F9FAFB',
        dark: '#1E1E1E'
      },
      border: {
        light: '#E2E8F0',
        dark: '#2D2D2D'
      },
      success: '#00D26A',
      warning: '#FFB800',
      error: '#FF4D4F'
    },
    typography: {
      fontFamily: 'SF Pro Display, SF Pro, system-ui, sans-serif',
      baseSize: '16px',
      scale: 1.414,
      headings: {
        h1: {
          fontSize: '3.998rem',
          fontWeight: 800,
          lineHeight: 1.1
        },
        h2: {
          fontSize: '2.827rem',
          fontWeight: 700,
          lineHeight: 1.2
        },
        h3: {
          fontSize: '1.999rem',
          fontWeight: 600,
          lineHeight: 1.25
        },
        h4: {
          fontSize: '1.414rem',
          fontWeight: 600,
          lineHeight: 1.3
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.4
        },
        h6: {
          fontSize: '0.707rem',
          fontWeight: 500,
          lineHeight: 1.4
        }
      },
      body: {
        regular: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.6
        },
        small: {
          fontSize: '0.707rem',
          fontWeight: 400,
          lineHeight: 1.6
        },
        large: {
          fontSize: '1.414rem',
          fontWeight: 400,
          lineHeight: 1.6
        }
      }
    },
    spacing: {
      unit: '4px',
      grid: 4,
      scale: {
        '2xs': '2px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
        '2xl': '96px',
        '3xl': '128px'
      }
    },
    borderRadius: {
      small: '8px',
      medium: '12px',
      large: '20px',
      xl: '28px',
      pill: '999px'
    },
    shadows: {
      small: '0 2px 8px rgba(19, 26, 54, 0.06)',
      medium: '0 8px 16px rgba(19, 26, 54, 0.06)',
      large: '0 16px 32px rgba(19, 26, 54, 0.06)',
      xl: '0 24px 48px rgba(19, 26, 54, 0.06)'
    },
    motion: {
      duration: {
        instant: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        deliberate: '800ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        quantum: 'cubic-bezier(0.15, 1.15, 0.6, 1.0)'
      }
    },
    depth: {
      // Z-index values for layering
      background: -10,
      base: 0,
      surface: 10,
      interface: 100,
      overlay: 1000,
      modal: 2000,
      toast: 3000,
      tooltip: 4000
    },
    material: {
      states: {
        default: {
          reflectivity: 0.3,
          roughness: 0.5,
          metalness: 0.2
        },
        elevated: {
          reflectivity: 0.4,
          roughness: 0.4,
          metalness: 0.3
        },
        glass: {
          reflectivity: 0.6,
          roughness: 0.2,
          metalness: 0,
          opacity: 0.8
        },
        metal: {
          reflectivity: 0.8,
          roughness: 0.3,
          metalness: 0.9
        }
      }
    },
    quantum: {
      // Quantum-specific design tokens
      pixelDensity: 'var(--device-pixel-ratio, 2)',
      energyStates: {
        rest: {
          scale: 1,
          opacity: 1,
          blur: '0px'
        },
        hover: {
          scale: 1.02,
          opacity: 1,
          blur: '0px'
        },
        active: {
          scale: 0.98,
          opacity: 0.9,
          blur: '0px'
        },
        disabled: {
          scale: 1,
          opacity: 0.5,
          blur: '0px'
        },
        loading: {
          scale: 1,
          opacity: 0.8,
          blur: '1px'
        }
      },
      dimensionGrid: {
        columns: 12,
        rows: 24,
        depth: 8,
        gutter: '16px',
        zGutter: '32px',
        margin: '24px',
        type: 'spatial'
      }
    },
    gridSystem: {
      columns: 12,
      rows: 24,
      gutter: '16px',
      margin: '24px',
      type: 'spatial',
      zScale: 1,
      responsive: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px'
      }
    },
    m4: {
      optimizations: {
        useNeuralEngine: true,
        useMetal: true,
        useProMotion: true,
        memoryOptimization: 'balanced',
        renderQuality: 'high'
      },
      rendering: {
        preferredAPI: 'metal',
        fallbackAPI: 'webgl',
        antialiasing: true,
        pixelRatio: 'device'
      }
    }
  },
  
  // Superposition design system (quantum state uncertainty)
  superposition: {
    _meta: {
      name: 'Superposition',
      description: 'M4-optimized quantum state uncertainty design system',
      version: '1.1.0'
    },
    colors: {
      primary: '#6A3093', // Quantum Purple
      secondary: '#BF4080', // Quantum Magenta
      accent: '#5AC8FA', // Subtle Cyan
      vibrant: '#FF2D55', // Quantum Energy
      background: {
        light: '#FFFFFF',
        dark: '#121212',
        gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
      },
      text: {
        light: '#0A0A0A',
        dark: '#F5F5F7',
        accent: '#5AC8FA'
      },
      surface: {
        light: '#F8F9FC',
        dark: '#1A1A2E',
        glass: 'rgba(255, 255, 255, 0.08)'
      },
      border: {
        light: '#DFE2E6',
        dark: '#2A2A3C',
        accent: 'rgba(90, 200, 250, 0.3)'
      },
      success: '#00D26A',
      warning: '#FFB800',
      error: '#FF4D4F',
      energy: {
        low: '#5856D6',
        medium: '#BF4080',
        high: '#FF2D55'
      }
    },
    typography: {
      fontFamily: 'SF Pro Display, SF Pro, system-ui, sans-serif',
      baseSize: '16px',
      scale: 1.5,
      headings: {
        h1: {
          fontSize: '4.5rem',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.02em'
        },
        h2: {
          fontSize: '3rem',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.01em'
        },
        h3: {
          fontSize: '2rem',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.005em'
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.25
        },
        h5: {
          fontSize: '1.125rem',
          fontWeight: 500,
          lineHeight: 1.3
        },
        h6: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.35
        }
      },
      body: {
        regular: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.6
        },
        small: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.6
        },
        large: {
          fontSize: '1.25rem',
          fontWeight: 400,
          lineHeight: 1.6
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.4,
          opacity: 0.8
        }
      }
    },
    spacing: {
      unit: '4px',
      grid: 4,
      scale: {
        '3xs': '1px',
        '2xs': '2px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
        '2xl': '96px',
        '3xl': '128px',
        '4xl': '192px'
      }
    },
    borderRadius: {
      none: '0px',
      xs: '4px',
      small: '8px',
      medium: '16px',
      large: '24px',
      xl: '32px',
      pill: '999px',
      circle: '50%'
    },
    shadows: {
      none: 'none',
      xs: '0 1px 2px rgba(19, 26, 54, 0.04)',
      small: '0 2px 8px rgba(19, 26, 54, 0.06)',
      medium: '0 8px 16px rgba(19, 26, 54, 0.08)',
      large: '0 16px 32px rgba(19, 26, 54, 0.10)',
      xl: '0 24px 48px rgba(19, 26, 54, 0.12)',
      inner: 'inset 0 2px 4px rgba(19, 26, 54, 0.05)',
      glow: '0 0 16px rgba(90, 200, 250, 0.4)'
    },
    motion: {
      duration: {
        instant: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        deliberate: '800ms',
        entrance: '1200ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        quantum: 'cubic-bezier(0.15, 1.15, 0.6, 1.0)',
        energetic: 'cubic-bezier(0.2, 1.4, 0.5, 1.0)',
        elastic: 'cubic-bezier(0.4, 0.0, 0.2, 1.5)'
      }
    },
    depth: {
      background: -20,
      foundation: -10,
      base: 0,
      raised: 10,
      surface: 20,
      interface: 100,
      floating: 200,
      overlay: 1000,
      modal: 2000,
      toast: 3000,
      tooltip: 4000,
      quantum: 5000
    },
    material: {
      states: {
        default: {
          reflectivity: 0.3,
          roughness: 0.5,
          metalness: 0.2
        },
        elevated: {
          reflectivity: 0.4,
          roughness: 0.4,
          metalness: 0.3
        },
        glass: {
          reflectivity: 0.7,
          roughness: 0.1,
          metalness: 0,
          opacity: 0.7,
          blur: '10px'
        },
        metal: {
          reflectivity: 0.9,
          roughness: 0.2,
          metalness: 1.0
        },
        quantum: {
          reflectivity: 0.8,
          roughness: 0.3,
          metalness: 0.5,
          emissive: '#5AC8FA',
          emissiveIntensity: 0.4
        }
      }
    },
    quantum: {
      pixelDensity: 'var(--device-pixel-ratio, 2)',
      energyStates: {
        rest: {
          scale: 1,
          opacity: 1,
          blur: '0px',
          glow: '0px',
          saturation: 1
        },
        hover: {
          scale: 1.03,
          opacity: 1,
          blur: '0px',
          glow: '4px',
          saturation: 1.1
        },
        active: {
          scale: 0.97,
          opacity: 0.95,
          blur: '0px',
          glow: '8px',
          saturation: 1.2
        },
        disabled: {
          scale: 1,
          opacity: 0.4,
          blur: '1px',
          glow: '0px',
          saturation: 0.6
        },
        loading: {
          scale: 1,
          opacity: 0.8,
          blur: '1px',
          glow: '2px',
          saturation: 0.8
        },
        superposition: {
          scale: [0.95, 1.05],
          opacity: [0.8, 1],
          blur: ['0px', '2px'],
          glow: ['0px', '8px'],
          saturation: [0.9, 1.2]
        }
      },
      dimensionGrid: {
        columns: 16,
        rows: 32,
        depth: 12,
        gutter: '16px',
        zGutter: '32px',
        margin: '24px',
        type: 'volumetric'
      },
      transitions: {
        types: ['fade', 'slide', 'scale', 'blur', 'teleport', 'quantum'],
        durations: {
          fast: '200ms',
          normal: '400ms',
          slow: '800ms'
        }
      },
      filters: {
        blur: {
          light: '4px',
          medium: '8px',
          heavy: '16px'
        },
        noise: {
          light: '5%',
          medium: '10%',
          heavy: '20%'
        },
        hueRotate: {
          light: '5deg',
          medium: '15deg',
          heavy: '30deg'
        }
      }
    },
    gridSystem: {
      columns: 16,
      rows: 32,
      gutter: '16px',
      margin: '24px',
      type: 'volumetric',
      zScale: 1.5,
      responsive: {
        xs: '375px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
        '3xl': '2560px'
      }
    },
    m4: {
      optimizations: {
        useNeuralEngine: true,
        useMetal: true,
        useProMotion: true,
        memoryOptimization: 'performance',
        renderQuality: 'maximum',
        useHDR: true,
        useAdvancedShaders: true,
        preferredThreadCount: 'auto'
      },
      rendering: {
        preferredAPI: 'metal',
        fallbackAPI: 'webgl2',
        antialiasing: true,
        msaaSamples: 4,
        pixelRatio: 'device',
        precision: 'high',
        colorSpace: 'display-p3',
        hdr: true,
        dynamicResolution: true
      },
      neural: {
        upscaling: {
          enabled: true,
          algorithm: 'neuralNetwork',
          quality: 'high'
        },
        effects: {
          bloom: {
            enabled: true,
            intensity: 0.3,
            threshold: 0.7,
            radius: 4.0
          },
          chromaticAberration: {
            enabled: true,
            strength: 0.015
          },
          depthOfField: {
            enabled: true,
            focusDistance: 10,
            aperture: 5.6,
            bokehShape: 'hexagon'
          },
          motionBlur: {
            enabled: true,
            strength: 0.4
          }
        }
      }
    }
  }
};

/**
 * Get design tokens based on state
 * @param {string} state - The design system state (heritage, transitional, quantum)
 * @returns {object} - The design tokens for the specified state
 */
function getDesignTokens(state = 'transitional') {
  // Default to transitional if the state is not found
  if (!tokenSets[state]) {
    return tokenSets.transitional;
  }

  return tokenSets[state];
}

/**
 * Get Cloudinary asset URLs optimized for the design system
 * @param {string} state - Design system state
 * @param {string} category - Asset category
 * @returns {Array} - Array of asset URLs with metadata
 */
async function getDesignAssets(state = 'transitional', category = null) {
  // Initialize with empty array if Cloudinary isn't configured
  const assets = [];

  // Load API key and secret from environment variables
  cloudinaryConfig.apiKey = CLOUDINARY_API_KEY || null;
  cloudinaryConfig.apiSecret = CLOUDINARY_API_SECRET || null;

  // Example assets for each design state
  const stateAssets = {
    heritage: [
      { id: 'quantum-spatial-design/heritage/grid-background', type: 'background', name: 'Grid Background' },
      { id: 'quantum-spatial-design/heritage/button-states', type: 'component', name: 'Button States' },
      { id: 'quantum-spatial-design/heritage/card-template', type: 'component', name: 'Card Template' }
    ],
    transitional: [
      { id: 'quantum-spatial-design/transitional/grid-background', type: 'background', name: 'Grid Background' },
      { id: 'quantum-spatial-design/transitional/button-states', type: 'component', name: 'Button States' },
      { id: 'quantum-spatial-design/transitional/card-template', type: 'component', name: 'Card Template' }
    ],
    quantum: [
      { id: 'quantum-spatial-design/quantum/grid-background', type: 'background', name: 'Grid Background' },
      { id: 'quantum-spatial-design/quantum/button-states', type: 'component', name: 'Button States' },
      { id: 'quantum-spatial-design/quantum/card-template', type: 'component', name: 'Card Template' },
      { id: 'quantum-spatial-design/quantum/dimensional-layout', type: 'layout', name: 'Dimensional Layout' }
    ]
  };

  // Get assets for the specified state
  const selectedAssets = stateAssets[state] || [];

  // Filter by category if specified
  const filteredAssets = category
    ? selectedAssets.filter(asset => asset.type === category)
    : selectedAssets;

  // Add URLs to assets
  return filteredAssets.map(asset => {
    const m4Optimized = state === 'quantum'; // Use M4 optimizations for quantum state

    return {
      ...asset,
      url: getCloudinaryUrl(asset.id, {
        quality: m4Optimized ? 'auto:best' : 'auto',
        fetchFormat: 'auto',
        dpr: m4Optimized ? 'auto' : '1.0',
        width: 'auto',
        height: 'auto'
      }),
      m4Optimized
    };
  });
}

/**
 * Generate Framer-compatible data format
 * @param {Object} tokens - Design system tokens
 * @param {Array} assets - Design system assets
 * @param {string} state - Design system state
 * @returns {Object} - Framer-compatible data
 */
function formatForFramer(tokens, assets = [], state = 'transitional') {
  // Basic structure for Framer
  const framerData = {
    $schema: "https://framer.com/schema/design-system.json",
    name: `9Bit Studios Quantum-Spatial Design System (${tokens._meta.name})`,
    version: tokens._meta.version,
    tokens: {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {}
    },
    assets: assets
  };

  // Format colors
  if (tokens.colors) {
    // Handle flat and nested color objects
    const colorEntries = Object.entries(tokens.colors);

    colorEntries.forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color value
        framerData.tokens.colors[key] = { value: value };
      } else if (typeof value === 'object') {
        // Nested color object (e.g., light/dark variants)
        Object.entries(value).forEach(([subKey, subValue]) => {
          framerData.tokens.colors[`${key}-${subKey}`] = { value: subValue };
        });
      }
    });
  }

  // Format typography
  if (tokens.typography) {
    // Base typography
    framerData.tokens.typography.fontFamily = {
      value: tokens.typography.fontFamily
    };

    // Headings
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        framerData.tokens.typography[key] = {
          value: {
            fontFamily: tokens.typography.fontFamily,
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight
          }
        };
      });
    }

    // Body text
    if (tokens.typography.body) {
      Object.entries(tokens.typography.body).forEach(([key, value]) => {
        framerData.tokens.typography[`body-${key}`] = {
          value: {
            fontFamily: tokens.typography.fontFamily,
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight
          }
        };
      });
    }
  }

  // Format spacing
  if (tokens.spacing && tokens.spacing.scale) {
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      framerData.tokens.spacing[key] = { value: value };
    });
  }

  // Format border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      framerData.tokens.borderRadius[key] = { value: value };
    });
  }

  // Format shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      framerData.tokens.shadows[key] = { value: value };
    });
  }

  // Add M4 optimizations for Quantum state
  if (state === 'quantum' && tokens.m4) {
    framerData.m4 = tokens.m4;
  }

  return framerData;
}

/**
 * Handle Framer Fetch request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response with design tokens formatted for Framer
 */
async function handleFramerFetch(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'tokens';
  const state = url.searchParams.get('state') || 'transitional';
  const format = url.searchParams.get('format') || 'standard';
  const category = url.searchParams.get('category') || null;

  // Get the appropriate token set
  const tokens = getDesignTokens(state);

  // Get origin for CORS
  const origin = request.headers.get('Origin') || '*';
  const framerDomains = [
    'https://framer.com', 
    'https://framercanvas.com', 
    'https://9bitstudios.io',
    'https://www.9bitstudios.io'
  ];
  
  // Check if the request is from a Framer domain
  const isFramerRequest = framerDomains.some(domain => origin.includes(domain));
  
  // Standard response headers with enhanced CORS for Framer
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': isFramerRequest ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent, X-Framer-Project-ID',
    'Cache-Control': 'max-age=3600',
    'Access-Control-Allow-Credentials': isFramerRequest ? 'true' : 'false'
  };

  // Handle different types of requests
  switch (type) {
    case 'tokens': {
      // Format based on request
      const data = format === 'framer'
        ? formatForFramer(tokens, [], state)
        : tokens;

      return new Response(
        JSON.stringify(data),
        { status: 200, headers }
      );
    }

    case 'colors': {
      return new Response(
        JSON.stringify(tokens.colors),
        { status: 200, headers }
      );
    }

    case 'typography': {
      return new Response(
        JSON.stringify(tokens.typography),
        { status: 200, headers }
      );
    }

    case 'spacing': {
      return new Response(
        JSON.stringify(tokens.spacing),
        { status: 200, headers }
      );
    }

    case 'material': {
      return new Response(
        JSON.stringify(tokens.material || {}),
        { status: 200, headers }
      );
    }

    case 'grid': {
      return new Response(
        JSON.stringify(tokens.gridSystem || {}),
        { status: 200, headers }
      );
    }

    case 'assets': {
      const assets = await getDesignAssets(state, category);
      return new Response(
        JSON.stringify({ assets }),
        { status: 200, headers }
      );
    }

    case 'all': {
      // Get assets and format everything for Framer
      const assets = await getDesignAssets(state);
      const framerData = formatForFramer(tokens, assets, state);

      return new Response(
        JSON.stringify(framerData),
        { status: 200, headers }
      );
    }

    default:
      return new Response(
        JSON.stringify({ error: 'Invalid type parameter' }),
        { status: 400, headers }
      );
  }
}

/**
 * Handle M4 optimization request
 * Returns M4-specific optimization parameters based on device capability detection
 */
async function handleM4Optimization(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get('state') || 'quantum';

  // Get device info from headers
  const userAgent = request.headers.get('User-Agent') || '';
  const isAppleSilicon = userAgent.includes('Mac') &&
                          (userAgent.includes('Apple Silicon') ||
                           !userAgent.includes('Intel'));

  // Get the appropriate token set
  const tokens = getDesignTokens(state);

  // Filter just the M4 optimization tokens
  const optimizations = {
    isM4Compatible: isAppleSilicon,
    useNeuralEngine: isAppleSilicon && tokens?.m4?.optimizations?.useNeuralEngine || false,
    useMetal: isAppleSilicon && tokens?.m4?.optimizations?.useMetal || false,
    renderingAPI: isAppleSilicon ? 'metal' : 'webgl',
    pixelRatio: 'device',
    memoryOptimization: tokens?.m4?.optimizations?.memoryOptimization || 'balanced'
  };

  return new Response(
    JSON.stringify(optimizations),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=300' // 5 minute cache for device detection
      }
    }
  );
}

/**
 * Get quantum pixel component definition
 * @param {string} state - Pixel state
 * @returns {object} - Component definition
 */
function getQuantumPixelComponent(state = 'transitional') {
  // Sane defaults for component size
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  // Base component properties
  const baseProps = {
    id: {
      type: "string",
      description: "Optional ID for the component"
    },
    size: {
      type: "string",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
      description: "Size variant (mapped to specific pixel dimensions)"
    },
    state: {
      type: "string",
      options: ["heritage", "transitional", "quantum", "superposition"],
      defaultValue: state,
      description: "Quantum state of the pixel"
    },
    interactive: {
      type: "boolean",
      defaultValue: false,
      description: "Interactive mode enables hover/focus states"
    },
    animationDuration: {
      type: "number",
      defaultValue: 4,
      description: "Animation duration in seconds"
    },
    glowIntensity: {
      type: "number",
      min: 0,
      max: 10,
      defaultValue: 4,
      description: "Glow intensity (0-10)"
    }
  };

  // State-specific color configurations
  const stateColors = {
    heritage: {
      baseColor: "#2C5F2D",
      accentColor: "#3DFF74",
      darkColor: "#1B3D1A",
      glowColor: "#3DFF74"
    },
    transitional: {
      baseColor: "#331F4A",
      accentColor: "#5AC8FA",
      darkColor: "#1E1F5C",
      glowColor: "#5AC8FA"
    },
    quantum: {
      baseColor: "#6A3093",
      accentColor: "#BF4080",
      darkColor: "#331F4A",
      glowColor: "#FF2D55"
    },
    superposition: {
      baseColor: "#6A3093",
      accentColor: "#5AC8FA",
      darkColor: "#331F4A",
      glowColor: "#FFFFFF"
    }
  };

  // Create component configuration for Framer
  return {
    name: "QuantumPixel",
    type: "component",
    props: baseProps,
    defaultSize: {
      width: sizeMap.md,
      height: sizeMap.md
    },
    defaultState: state,
    stateColors: stateColors,
    description: "Quantum-Spatial Pixel component with dynamic state transitions",
    m4Optimized: true,
    implementation: {
      type: "svg",
      source: "framer-fetch",
      usesSVGFilters: true,
      usesAnimations: true
    }
  };
}

/**
 * Get dimensional grid component definition
 * @param {string} state - Grid state
 * @returns {object} - Component definition
 */
function getDimensionalGridComponent(state = 'transitional') {
  // Base component properties
  const baseProps = {
    id: {
      type: "string",
      description: "Optional ID for the component"
    },
    type: {
      type: "string",
      options: ["background", "interface", "feature"],
      defaultValue: "background",
      description: "Type of grid to render"
    },
    density: {
      type: "string",
      options: ["fine", "medium", "coarse"],
      defaultValue: "medium",
      description: "Grid density (fine: 8px, medium: 16px, coarse: 32px)"
    },
    state: {
      type: "string",
      options: ["heritage", "transitional", "quantum"],
      defaultValue: state,
      description: "Quantum state style"
    },
    enableFalloff: {
      type: "boolean",
      defaultValue: true,
      description: "Enable distance-based opacity falloff"
    },
    enablePerspectiveShift: {
      type: "boolean",
      defaultValue: true,
      description: "Enable perspective shift with mouse/device movement"
    },
    perspectiveIntensity: {
      type: "number",
      min: 0,
      max: 1,
      step: 0.01,
      defaultValue: 0.05,
      description: "Perspective shift intensity (0-1)"
    },
    enableSecondaryGrid: {
      type: "boolean",
      defaultValue: true,
      description: "Enable secondary overlay grid for depth"
    }
  };

  // State-specific color configurations
  const stateColors = {
    heritage: {
      primary: "#3DFF74",
      secondary: "#00FFC8"
    },
    transitional: {
      primary: "#5AC8FA",
      secondary: "#613FE7"
    },
    quantum: {
      primary: "#BF4080",
      secondary: "#FF2D55"
    }
  };

  // Create component configuration for Framer
  return {
    name: "DimensionalGrid",
    type: "component",
    props: baseProps,
    defaultSize: {
      width: "100%",
      height: "100%"
    },
    defaultState: state,
    stateColors: stateColors,
    description: "Quantum-Spatial dimensional grid system with multiple types, densities, and advanced visual effects",
    m4Optimized: true,
    implementation: {
      type: "canvas",
      source: "framer-fetch",
      usesWebGL: true,
      usesMetal: true
    }
  };
}

/**
 * Get pixel viewer component definition
 * @param {string} state - Initial state for the viewer
 * @returns {object} - Component definition
 */
function getPixelViewerComponent(state = 'transitional') {
  // Base component properties
  const baseProps = {
    id: {
      type: "string",
      description: "Optional ID for the component"
    },
    initialState: {
      type: "string",
      options: ["heritage", "transitional", "quantum", "superposition"],
      defaultValue: state,
      description: "Initial quantum state"
    },
    columns: {
      type: "number",
      min: 1,
      max: 20,
      defaultValue: 8,
      description: "Number of columns in the grid"
    },
    rows: {
      type: "number",
      min: 1,
      max: 20,
      defaultValue: 6,
      description: "Number of rows in the grid"
    },
    pixelSize: {
      type: "string",
      options: ["xs", "sm", "md", "lg"],
      defaultValue: "sm",
      description: "Pixel size"
    },
    gap: {
      type: "number",
      min: 0,
      max: 20,
      defaultValue: 4,
      description: "Gap between pixels"
    },
    interactive: {
      type: "boolean",
      defaultValue: true,
      description: "Interactive mode lets users interact with pixels"
    },
    showControls: {
      type: "boolean",
      defaultValue: true,
      description: "Show control panel for state transitions"
    },
    responsive: {
      type: "boolean",
      defaultValue: true,
      description: "Enable responsive behavior"
    },
    m4Optimized: {
      type: "boolean",
      defaultValue: true,
      description: "Enable M4 optimization when available"
    }
  };

  // State-specific color configurations
  const stateColors = {
    heritage: '#3DFF74',
    transitional: '#5AC8FA',
    quantum: '#BF4080',
    superposition: '#6A3093'
  };

  // Generate sample React component code
  const reactImplementation = pixelViewer.generateReactComponent({
    state,
    columns: 8,
    rows: 6,
    pixelSize: 'sm',
    interactive: true,
    showControls: true,
    responsive: true,
    m4Optimized: true
  });

  // Create component configuration for Framer
  return {
    name: "PixelViewer",
    type: "component",
    props: baseProps,
    defaultSize: {
      width: 400,
      height: 350
    },
    defaultState: state,
    stateColors: stateColors,
    description: "Interactive viewer for the Quantum-Spatial pixel system",
    m4Optimized: true,
    implementation: {
      type: "react",
      source: "inline",
      code: reactImplementation,
      dependencies: ["framer-motion"]
    },
    preview: pixelViewer.generateViewerHTML({
      state,
      columns: 4,
      rows: 3,
      pixelSize: 'sm',
      interactive: true,
      showControls: true
    }),
    clientCode: pixelViewer.pixelViewerClientJS
  };
}

/**
 * Get components definition for all states
 * @returns {object} - Components for all states
 */
function getComponents() {
  const states = ["heritage", "transitional", "quantum", "superposition"];
  const gridStates = ["heritage", "transitional", "quantum"];

  // Collect all pixel components
  const pixelComponents = states.map(state => ({
    id: `quantum-pixel-${state}`,
    ...getQuantumPixelComponent(state)
  }));

  // Collect all grid components
  const gridComponents = gridStates.map(state => ({
    id: `dimensional-grid-${state}`,
    ...getDimensionalGridComponent(state)
  }));

  // Add pixel viewer components
  const viewerComponents = states.map(state => ({
    id: `pixel-viewer-${state}`,
    ...getPixelViewerComponent(state)
  }));

  // Return all components
  return {
    pixels: pixelComponents,
    grids: gridComponents,
    viewers: viewerComponents,
    all: [...pixelComponents, ...gridComponents, ...viewerComponents]
  };
}

/**
 * Handle quantum pixel component request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response with the quantum pixel component definition
 */
async function handleQuantumPixel(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get('state') || 'transitional';

  const component = getQuantumPixelComponent(state);

  return new Response(
    JSON.stringify(component),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=3600'
      }
    }
  );
}

/**
 * Handle dimensional grid component request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response with the dimensional grid component definition
 */
async function handleDimensionalGrid(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get('state') || 'transitional';

  const component = getDimensionalGridComponent(state);

  return new Response(
    JSON.stringify(component),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=3600'
      }
    }
  );
}

/**
 * Handle all components request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response with all component definitions
 */
async function handleComponents(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'all';

  const components = getComponents();
  const result = components[type] || components.all;

  return new Response(
    JSON.stringify({ components: result }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=3600'
      }
    }
  );
}

/**
 * Handle design system request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response
 */
async function handleDesignSystem(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Route to appropriate handler
  if (path === '/design-system/framer-fetch') {
    return handleFramerFetch(request);
  } else if (path === '/design-system/m4-optimization') {
    return handleM4Optimization(request);
  } else if (path === '/design-system/tokens') {
    const state = url.searchParams.get('state') || 'transitional';
    return new Response(
      JSON.stringify(getDesignTokens(state)),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=3600'
        }
      }
    );
  } else if (path === '/design-system/assets') {
    const state = url.searchParams.get('state') || 'transitional';
    const category = url.searchParams.get('category') || null;
    const assets = await getDesignAssets(state, category);

    return new Response(
      JSON.stringify({ assets }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=3600'
        }
      }
    );
  } else if (path === '/design-system/components') {
    return handleComponents(request);
  } else if (path === '/design-system/components/quantum-pixel') {
    return handleQuantumPixel(request);
  } else if (path === '/design-system/components/dimensional-grid') {
    return handleDimensionalGrid(request);
  }

  // Default response for unknown paths
  return new Response(
    JSON.stringify({ error: 'Not Found' }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

// Export design tokens for direct access in worker.js
const designTokens = tokenSets;

module.exports = {
  handleDesignSystem,
  getDesignTokens,
  getCloudinaryUrl,
  formatForFramer,
  getQuantumPixelComponent,
  getDimensionalGridComponent,
  getPixelViewerComponent,
  getComponents,
  designTokens
};