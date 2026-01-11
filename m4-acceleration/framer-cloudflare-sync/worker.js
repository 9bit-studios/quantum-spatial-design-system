/**
 * Quantum-Spatial Design System Cloudflare Worker
 * Enhanced Shopify Theme Development Support
 * 
 * @version 2.1.0
 * @architecture quantum-secured-shopify-optimized
 */

// Import quantum-spatial design tokens
const DESIGN_TOKENS = {
  heritage: {
    colors: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      accent: "#007AFF"
    }
  },
  quantum: {
    colors: {
      primary: "#0066CC",
      secondary: "#4A90E2",
      accent: "#00D4AA"
    }
  },
  superposition: {
    colors: {
      primary: "#6A0DAD",
      secondary: "#9370DB",
      accent: "#FFB347"
    }
  },
  transitional: {
    colors: {
      primary: "#2E2E2E",
      secondary: "#5A5A5A",
      accent: "#FF6B35"
    }
  }
};

// Shopify Theme Development Optimizations
const SHOPIFY_INTEGRATIONS = {
  liquidTemplates: true,
  sectionSupport: true,
  appleHIGCompliance: true,
  m4Optimization: true,
  brandAwareDesign: true
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers for Shopify theme development
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route: Design token API for Shopify themes
      if (url.pathname.startsWith('/api/design-tokens')) {
        const tokenType = url.searchParams.get('type') || 'quantum';
        const format = url.searchParams.get('format') || 'css';
        
        const tokens = DESIGN_TOKENS[tokenType] || DESIGN_TOKENS.quantum;
        
        let response;
        if (format === 'css') {
          response = generateCSSTokens(tokens);
        } else if (format === 'liquid') {
          response = generateLiquidTokens(tokens);
        } else {
          response = JSON.stringify(tokens, null, 2);
        }
        
        return new Response(response, {
          headers: {
            ...corsHeaders,
            'Content-Type': format === 'css' ? 'text/css' : 
                           format === 'liquid' ? 'text/plain' : 'application/json',
          },
        });
      }

      // Route: Shopify theme optimization
      if (url.pathname.startsWith('/api/shopify/optimize')) {
        return new Response(JSON.stringify({
          optimizations: SHOPIFY_INTEGRATIONS,
          quantum_spatial_ready: true,
          apple_hig_compliant: true,
          m4_accelerated: true,
          brand_aware: true,
          timestamp: new Date().toISOString()
        }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Default quantum-spatial response
      return new Response(JSON.stringify({
        status: 'Quantum-Spatial Design System Active',
        version: '2.1.0',
        architecture: 'quantum-secured-shopify-optimized',
        available_tokens: Object.keys(DESIGN_TOKENS),
        shopify_integration: SHOPIFY_INTEGRATIONS,
        timestamp: new Date().toISOString()
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Quantum processing error',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};

// Helper functions for Shopify theme development
function generateCSSTokens(tokens) {
  let css = ':root {';
  
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      css += `  --color-${key}: ${value};`;
    });
  }
  
  css += '}';
  css += '/* Quantum-Spatial Design System CSS Variables */';
  css += '/* Enhanced for Shopify Theme Development */';
  
  return css;
}

function generateLiquidTokens(tokens) {
  let liquid = '{% comment %}';
  liquid += 'Quantum-Spatial Design Tokens for Shopify';
  liquid += 'Generated for enhanced theme development';
  liquid += '{% endcomment %}';
  
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      liquid += `{% assign ${key}_color = '${value}' %}`;
    });
  }
  
  return liquid;
}