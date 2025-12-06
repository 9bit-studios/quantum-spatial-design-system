/**
 * Quantum-Spatial Design System - Simple Worker Implementation
 * 
 * This worker provides direct access to the M4-optimized design tokens
 * for the Quantum-Spatial design system.
 */

// Import the design token sets
const designTokens = {
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
      scale: 1.25
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
    }
  },
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
      scale: 1.333
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
    }
  },
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
      scale: 1.414
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
    m4: {
      optimizations: {
        useNeuralEngine: true,
        useMetal: true,
        useProMotion: true,
        memoryOptimization: 'balanced',
        renderQuality: 'high'
      }
    }
  },
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
      scale: 1.5
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

// Simple device detection
function detectM4Device(userAgent = '') {
  const isMac = userAgent.includes('Mac');
  const isAppleSilicon = isMac && !userAgent.includes('Intel');
  
  // Get macOS version for better M4 detection
  const macOSVersionRegex = /Mac OS X (\d+)[._](\d+)(?:[._](\d+))?/;
  const macOSVersionMatch = userAgent.match(macOSVersionRegex);
  
  if (isAppleSilicon && macOSVersionMatch) {
    const major = parseInt(macOSVersionMatch[1], 10);
    
    if (major >= 14) {
      // macOS 14+ (Sequoia) likely has M4 capabilities
      return {
        isM4: true,
        isAppleSilicon,
        version: 'M4',
        capabilities: {
          neuralEngine: true,
          metal: true,
          advancedShaders: true
        }
      };
    }
  }
  
  return {
    isM4: false,
    isAppleSilicon,
    version: isAppleSilicon ? 'M1-M3' : 'non-Apple-Silicon',
    capabilities: {
      neuralEngine: isAppleSilicon,
      metal: isAppleSilicon,
      advancedShaders: isAppleSilicon
    }
  };
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-access-token'
};

// Worker event handler
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Main request handler
 */
async function handleRequest(request) {
  try {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
        status: 204
      });
    }
    
    // Parse URL
    const url = new URL(request.url);
    
    // Root path endpoint
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(
        JSON.stringify({
          name: "Quantum-Spatial Design System",
          version: "1.1.0",
          description: "API for the M4-optimized Quantum-Spatial Design System",
          documentation: "See /health for status or /design-system/tokens for design tokens",
          endpoints: [
            "/health",
            "/design-system/tokens?state=[heritage|transitional|quantum|superposition]",
            "/m4-optimization",
            "/framer-components",
            "/pixel-viewer?format=html&state=[heritage|transitional|quantum|superposition]"
          ]
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          version: '1.1.0',
          implementation: 'simple',
          environment: typeof ENVIRONMENT !== 'undefined' ? ENVIRONMENT : 'development'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Design tokens endpoint
    if (url.pathname === '/design-system/tokens') {
      const state = url.searchParams.get('state') || 'transitional';
      
      // Get the appropriate tokens
      const tokens = designTokens[state] || designTokens.transitional;
      
      return new Response(
        JSON.stringify(tokens),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=3600',
            ...corsHeaders
          }
        }
      );
    }
    
    // M4 optimization endpoint
    if (url.pathname === '/m4-optimization') {
      const userAgent = request.headers.get('User-Agent') || '';
      const deviceInfo = detectM4Device(userAgent);
      
      return new Response(
        JSON.stringify({
          device: deviceInfo,
          timestamp: new Date().toISOString(),
          detectedUA: userAgent.substring(0, 100) + '...' // Truncate for privacy
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Framer components endpoint
    if (url.pathname === '/framer-components') {
      // Framer-specific component registry
      const framerComponents = [
        {
          name: "QuantumPixel",
          displayName: "Quantum Pixel",
          description: "Base quantum-spatial pixel component with M4 optimizations",
          importPath: "design-system/QuantumPixel",
          isFramerComponent: true,
          props: {
            state: {
              type: "enum",
              options: ["heritage", "transitional", "quantum", "superposition"],
              defaultValue: "transitional"
            },
            size: {
              type: "number",
              defaultValue: 24
            },
            interactive: {
              type: "boolean",
              defaultValue: true
            }
          }
        },
        {
          name: "DimensionalGrid",
          displayName: "Dimensional Grid",
          description: "Quantum-spatial grid system with M4 rendering capabilities",
          importPath: "design-system/DimensionalGrid",
          isFramerComponent: true,
          props: {
            state: {
              type: "enum",
              options: ["heritage", "transitional", "quantum", "superposition"],
              defaultValue: "transitional"
            },
            density: {
              type: "enum",
              options: ["fine", "medium", "coarse"],
              defaultValue: "medium"
            },
            enableFalloff: {
              type: "boolean",
              defaultValue: true
            }
          }
        },
        {
          name: "PixelViewer",
          displayName: "Pixel Viewer",
          description: "Interactive quantum-spatial pixel viewer with M4 Neural Engine acceleration",
          importPath: "design-system/PixelViewer",
          isFramerComponent: true,
          props: {
            initialState: {
              type: "enum",
              options: ["heritage", "transitional", "quantum", "superposition"],
              defaultValue: "transitional"
            },
            columns: {
              type: "number",
              defaultValue: 8,
              min: 1,
              max: 24
            },
            rows: {
              type: "number",
              defaultValue: 6,
              min: 1,
              max: 24
            },
            showControls: {
              type: "boolean",
              defaultValue: true
            },
            m4Optimized: {
              type: "boolean",
              defaultValue: true
            }
          }
        }
      ];

      return new Response(
        JSON.stringify(framerComponents),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Framer-Project-ID, Content-Type',
            'Cache-Control': 'max-age=3600'
          }
        }
      );
    }
    
    // Default 404 response
    return new Response(
      JSON.stringify({
        error: 'Not Found',
        message: `Path ${url.pathname} not found`,
        endpoints: ['/', '/health', '/design-system/tokens', '/m4-optimization', '/framer-components', '/pixel-viewer']
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    // Error handling
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
}