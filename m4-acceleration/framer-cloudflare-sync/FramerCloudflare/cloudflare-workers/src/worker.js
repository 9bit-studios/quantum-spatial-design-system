// 9Bit Studios - Cloudflare Worker Implementation
// Main entry point for handling requests

// Import service modules
const auth = require('./services/auth');
const designSystem = require('./services/design-system');
const pixelViewer = require('./services/pixel-viewer');

// Import utility functions
const m4Optimization = require('../functions/m4-optimization');
const cloudinaryIntegration = require('../functions/cloudinary-integration');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Main request handler
 * Routes requests to appropriate service handlers
 */
async function handleRequest(request) {
  try {
    // Parse URL
    const url = new URL(request.url);
    
    // Define default values for Cloudinary variables
    const cloudinaryCloudName = typeof CLOUDINARY_CLOUD_NAME !== 'undefined' ? CLOUDINARY_CLOUD_NAME : '9bitstudios';
    const cloudinaryApiKey = typeof CLOUDINARY_API_KEY !== 'undefined' ? CLOUDINARY_API_KEY : null;
    const cloudinaryApiSecret = typeof CLOUDINARY_API_SECRET !== 'undefined' ? CLOUDINARY_API_SECRET : null;
    
    // Initialize Cloudinary with environment variables
    cloudinaryIntegration.initCloudinary({
      cloudName: cloudinaryCloudName,
      apiKey: cloudinaryApiKey,
      apiSecret: cloudinaryApiSecret
    });

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS(request)
    }

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          environment: typeof ENVIRONMENT !== 'undefined' ? ENVIRONMENT : 'development',
          version: '1.1.0',
          features: {
            designSystem: true,
            m4Optimization: true,
            cloudinaryIntegration: true,
            framerSupport: true,
            quantumSpatialPixels: true,
            pixelViewer: true,
            superpositionState: true
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    
    // Home endpoint
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
            "/pixel-viewer?format=html&state=[heritage|transitional|quantum|superposition]",
            "/quantum-pixel?state=[heritage|transitional|quantum|superposition]",
            "/dimensional-grid?state=[heritage|transitional|quantum|superposition]"
          ]
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Detect M4 device capabilities from user agent
    const userAgent = request.headers.get('User-Agent') || '';
    const deviceCapabilities = m4Optimization.detectAppleSilicon(userAgent);

    // Get full M4 optimization parameters
    const m4Settings = m4Optimization.getM4Optimizations(userAgent, {
      renderQuality: url.searchParams.get('renderQuality') || 'balanced',
      processingLevel: url.searchParams.get('processingLevel') || 'standard',
      memoryOptimization: url.searchParams.get('memoryOptimization') || 'balanced'
    });

    // Add device capabilities to request object for service handlers
    request.deviceCapabilities = deviceCapabilities;
    request.m4Settings = m4Settings;

    // Add Cloudinary support to request
    request.cloudinary = {
      getUrl: (publicId, options) => cloudinaryIntegration.getCloudinaryUrl(publicId, options),
      getM4OptimizedUrl: (publicId, options) => cloudinaryIntegration.getM4OptimizedUrl(publicId, deviceCapabilities.isAppleSilicon, options),
      getAssets: (state, category) => cloudinaryIntegration.getDesignStateAssets(state, deviceCapabilities.isAppleSilicon)
    };

    // Check if endpoint requires authentication
    if (auth.requiresAuth(url.pathname)) {
      const user = await auth.authenticate(request);
      if (!user) {
        return auth.unauthorized();
      }

      // Add user to request object
      request.user = user;
    }

    // Explicit endpoint for design tokens to support Framer integration
    if (url.pathname.startsWith('/design-system/tokens')) {
      // Get the state from URL parameters
      const state = url.searchParams.get('state') || 'transitional'
      
      // Return design tokens for the requested state
      return new Response(JSON.stringify(designSystem.getDesignTokens(state)), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=3600"
        }
      })
    }

    // Route to appropriate handler
    const path = url.pathname.split('/')[1];
    
    switch (path) {
      case 'design-system':
        return designSystem.handleDesignSystem(request)
      case 'quantum-pixel': {
        // Direct endpoint for quantum pixel component
        const state = url.searchParams.get('state') || 'transitional';
        const m4Enabled = url.searchParams.get('m4') !== 'false';
        const component = designSystem.getQuantumPixelComponent(state);

        // Add M4 optimization if enabled
        if (m4Enabled && deviceCapabilities.isAppleSilicon) {
          component.m4Optimizations = m4Settings.rendering;
        }

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
      case 'dimensional-grid': {
        // Direct endpoint for dimensional grid component
        const state = url.searchParams.get('state') || 'transitional';
        const m4Enabled = url.searchParams.get('m4') !== 'false';
        const component = designSystem.getDimensionalGridComponent(state);

        // Add M4 optimization if enabled
        if (m4Enabled && deviceCapabilities.isAppleSilicon) {
          component.m4Optimizations = m4Settings.rendering;
        }

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
      case 'pixel-viewer': {
        // Direct endpoint for pixel viewer component
        const state = url.searchParams.get('state') || 'transitional';
        const m4Enabled = url.searchParams.get('m4') !== 'false';
        const format = url.searchParams.get('format') || 'json';
        const component = pixelViewer.getPixelViewerComponent(state);

        // Add M4 optimization if enabled
        if (m4Enabled && deviceCapabilities.isAppleSilicon) {
          component.m4Optimizations = m4Settings.rendering;
        }

        // For HTML format, return the generated HTML preview
        if (format === 'html') {
          return new Response(
            pixelViewer.generateViewerHTML({
              state,
              columns: parseInt(url.searchParams.get('columns') || '8'),
              rows: parseInt(url.searchParams.get('rows') || '6'),
              pixelSize: url.searchParams.get('pixelSize') || 'md',
              interactive: url.searchParams.get('interactive') !== 'false',
              showControls: url.searchParams.get('showControls') !== 'false',
              m4Optimized: m4Enabled && deviceCapabilities.isAppleSilicon
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'max-age=3600'
              }
            }
          );
        }

        // For React format, return just the React component code
        if (format === 'react') {
          return new Response(
            component.implementation.code,
            {
              status: 200,
              headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'max-age=3600'
              }
            }
          );
        }

        // Default: return the full component definition as JSON
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
      case 'components': {
        // Get all components
        const components = designSystem.getComponents();

        // If M4 is available, add optimization settings
        if (deviceCapabilities.isAppleSilicon) {
          components.m4Optimizations = m4Settings;
        }

        return new Response(
          JSON.stringify(components),
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
      case 'framer-components': {
        // Framer-specific component registry
        const framerComponents = [
          {
            name: "QuantumPixel",
            displayName: "Quantum Pixel",
            description: "Base quantum-spatial pixel component",
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
              },
              m4Optimized: {
                type: "boolean",
                defaultValue: true
              }
            }
          },
          {
            name: "DimensionalGrid",
            displayName: "Dimensional Grid",
            description: "Quantum-spatial grid system",
            importPath: "design-system/DimensionalGrid",
            isFramerComponent: true,
            props: {
              state: {
                type: "enum",
                options: ["heritage", "transitional", "quantum"],
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
              },
              m4Optimized: {
                type: "boolean",
                defaultValue: true
              }
            }
          },
          {
            name: "PixelViewer",
            displayName: "Pixel Viewer",
            description: "Interactive quantum-spatial pixel viewer",
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
                defaultValue: 8
              },
              rows: {
                type: "number",
                defaultValue: 6
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
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'X-Framer-Project-ID, Content-Type',
              'Cache-Control': 'max-age=3600'
            }
          }
        );
      }
      case 'm4-optimization':
        return handleM4OptimizationRequest(request)
      case 'notion':
        return handleNotion(request)
      case 'content':
        return handleContentIntelligence(request)
      case 'api':
        return handleClientPortal(request)
      default:
        return new Response(
          JSON.stringify({ 
            error: 'Not Found', 
            path,
            endpoints: [
              "/",
              "/health",
              "/design-system/tokens",
              "/m4-optimization",
              "/framer-components",
              "/pixel-viewer",
              "/quantum-pixel",
              "/dimensional-grid"
            ]
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
        status: 'error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

/**
 * Handle M4 Optimization requests
 * Returns device-specific optimization parameters
 */
async function handleM4OptimizationRequest(request) {
  const url = new URL(request.url);
  const renderQuality = url.searchParams.get('renderQuality') || 'balanced';
  const processingLevel = url.searchParams.get('processingLevel') || 'standard';
  const memoryOptimization = url.searchParams.get('memoryOptimization') || 'balanced';

  const userAgent = request.headers.get('User-Agent') || '';

  // Get comprehensive M4 optimization parameters
  const optimizations = m4Optimization.getM4Optimizations(userAgent, {
    renderQuality,
    processingLevel,
    memoryOptimization
  });

  return new Response(
    JSON.stringify(optimizations),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=300' // 5 minute cache for device-specific settings
      }
    }
  );
}

/**
 * Handle CORS preflight requests
 * Updated to explicitly allow Framer domains
 */
function handleCORS(request) {
  const origin = request.headers.get('Origin') || '*';
  const framerDomains = [
    'https://framer.com', 
    'https://framercanvas.com',
    'https://builds.framer.com',
    'https://app.framer.com',
    'https://9bitstudios.io',
    'https://www.9bitstudios.io'
  ];
  
  // Check if the request is from a Framer domain
  const isFramerRequest = framerDomains.some(domain => origin.includes(domain));
  
  // Set appropriate CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': isFramerRequest ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent, X-Framer-Project-ID',
    'Access-Control-Max-Age': '86400',  // 24 hours caching for preflight
    'Access-Control-Allow-Credentials': isFramerRequest ? 'true' : 'false'
  };
  
  return new Response(null, {
    headers: corsHeaders,
    status: 204
  });
}

/**
 * Notion Integration endpoint handler
 */
async function handleNotion(request) {
  // Implement notion integration handler
  return new Response(JSON.stringify({
    message: "Notion integration endpoint"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

/**
 * Content Intelligence endpoint handler
 */
async function handleContentIntelligence(request) {
  // Implement content intelligence handler
  return new Response(JSON.stringify({
    message: "Content intelligence endpoint"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

/**
 * Oksana Creator Portal Accelerator API endpoint handler
 */
async function handleClientPortal(request) {
  // Implement Oksana Creator Portal Accelerator handler
  return new Response(JSON.stringify({
    message: "Oksana Creator Portal Accelerator API endpoint"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}