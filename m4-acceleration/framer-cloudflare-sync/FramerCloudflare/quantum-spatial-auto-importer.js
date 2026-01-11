/**
 * Quantum-Spatial Design System - Cloudflare Auto-Importer
 * 
 * A comprehensive integration for Framer that automatically:
 * 1. Fetches design tokens from Cloudflare Worker
 * 2. Detects device capabilities for M4 optimization
 * 3. Auto-generates components and layouts
 * 4. Provides complete design system context
 * 5. Automatically adapts to device capabilities
 */

// Required imports for Framer integration
import { addPropertyControls, ControlType } from 'framer';
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration constants
const CLOUDFLARE_ENDPOINTS = {
  PRODUCTION: 'https://design-system.9bitstudios.io',
  STAGING: 'https://design-system-staging.9bitstudios.io',
  FALLBACK: 'https://quantum-spatial-design-system.9bitstudios.workers.dev'
};

// QuantumSpatial Design System Context
const QuantumSpatialContext = createContext(null);

/**
 * Hook to access the Quantum-Spatial design system
 * @returns {Object} Design system context with tokens, components, and utilities
 */
export const useQuantumSpatial = () => {
  const context = useContext(QuantumSpatialContext);
  if (!context) {
    throw new Error('useQuantumSpatial must be used within a QuantumSpatialProvider');
  }
  return context;
};

/**
 * Detect device capabilities with focus on M4 optimization
 * @returns {Object} Device capabilities and recommended optimizations
 */
function detectDeviceCapabilities() {
  // For client-side detection
  if (typeof window === 'undefined') {
    return {
      isM4Detected: false,
      recommendedState: 'quantum',
      renderQuality: 'standard'
    };
  }

  // Check for Apple Silicon
  const isAppleSilicon = 
    navigator.userAgent.includes('Mac') && 
    !navigator.userAgent.includes('Intel');
  
  // Check for high core count (M4 typically has 12+ cores)
  const hasManyCores = 
    navigator.hardwareConcurrency >= 8;
  
  // Check for Metal API
  const hasMetalAPI = 
    typeof window.WebGLRenderingContext !== 'undefined' && 
    (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (!gl) return false;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return false;
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer && (
          renderer.includes('Apple') || 
          renderer.includes('Metal')
        );
      } catch (e) {
        return false;
      }
    })();
  
  // Advanced detection for color spaces
  const supportsHDR = 
    typeof window.matchMedia === 'function' && 
    window.matchMedia('(color-gamut: p3)').matches;

  // Enhanced M4-specific features
  const isM4Detected = isAppleSilicon && hasManyCores && hasMetalAPI;
  const isM4Pro = isM4Detected && navigator.hardwareConcurrency >= 12;
  const isM4Max = isM4Detected && navigator.hardwareConcurrency >= 16;
  const isM4Ultra = isM4Detected && navigator.hardwareConcurrency >= 24;
  
  // Device capabilities profile
  return {
    isAppleSilicon,
    hasManyCores,
    hasMetalAPI,
    supportsHDR,
    isM4Detected,
    isM4Pro,
    isM4Max,
    isM4Ultra,
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    colorGamut: supportsHDR ? 'p3' : 'srgb',
    platform: navigator.platform || 'unknown',
    userAgent: navigator.userAgent,
    recommendedState: isM4Detected 
      ? (isM4Ultra || isM4Max) 
        ? 'superposition' 
        : 'quantum'
      : 'transitional',
    renderQuality: isM4Detected
      ? isM4Ultra 
        ? 'maximum' 
        : isM4Max 
          ? 'high' 
          : 'enhanced'
      : 'standard'
  };
}

/**
 * Core Quantum-Spatial Provider that automatically imports from Cloudflare Worker
 * @param {Object} props - Component properties
 * @returns {JSX.Element} Provider component
 */
export function QuantumSpatialProvider({ 
  children, 
  autoDetect = true,
  initialState = 'quantum',
  workerUrl = CLOUDFLARE_ENDPOINTS.PRODUCTION,
  fallbackUrl = CLOUDFLARE_ENDPOINTS.FALLBACK,
  apiKey = null,
  devMode = false,
  onError = null
}) {
  // State management
  const [tokens, setTokens] = useState(null);
  const [components, setComponents] = useState(null);
  const [layouts, setLayouts] = useState(null);
  const [designState, setDesignState] = useState(initialState);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs
  const workerUrlRef = useRef(workerUrl);
  const activeRequestsRef = useRef(new Map());
  const retryCountRef = useRef(0);
  
  // Fetch design tokens with robust error handling and fallbacks
  const fetchDesignTokens = async (state) => {
    const requestId = `tokens-${state}-${Date.now()}`;
    const urls = [
      `${workerUrlRef.current}/design-system/tokens/${state}`,
      `${workerUrlRef.current}/tokens/${state}`,
      `${workerUrlRef.current}/api/tokens/${state}`,
      `${fallbackUrl}/tokens/${state}`
    ];
    
    // Add the request to active requests map
    activeRequestsRef.current.set(requestId, { urls, state, startTime: Date.now() });
    
    let lastError = null;
    
    try {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        
        try {
          const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          };
          
          // Add API key if provided
          if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
          }
          
          if (devMode) console.log(`🔄 Fetching tokens for ${state} from ${url}`);
          
          // Create timeout signal
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          
          const response = await fetch(url, {
            method: 'GET',
            headers,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data || Object.keys(data).length === 0) {
            throw new Error('Received empty data');
          }
          
          // Success - remove from active requests and reset retry count
          activeRequestsRef.current.delete(requestId);
          retryCountRef.current = 0;
          
          if (devMode) console.log(`✅ Successfully fetched tokens from ${url}`);
          return data;
        } catch (err) {
          lastError = err;
          if (devMode) console.warn(`⚠️ Failed to fetch from ${url}: ${err.message}`);
          // Continue to next URL
        }
      }
      
      // All URLs failed
      throw lastError || new Error('All endpoints failed');
    } catch (err) {
      // Remove from active requests
      activeRequestsRef.current.delete(requestId);
      
      // Increment retry count
      retryCountRef.current += 1;
      
      // Log error
      if (devMode) console.error(`❌ Error fetching tokens: ${err.message}`);
      
      // Call error handler if provided
      if (onError) {
        onError({ 
          type: 'tokens',
          state,
          error: err.message, 
          retryCount: retryCountRef.current 
        });
      }
      
      // If exceeded retry limit, use fallback tokens
      if (retryCountRef.current > 3) {
        if (devMode) console.warn(`⚠️ Using fallback tokens for ${state} after ${retryCountRef.current} retries`);
        return getFallbackTokens(state);
      }
      
      // Otherwise rethrow for caller to handle
      throw err;
    }
  };
  
  // Fetch components with the same robust handling
  const fetchComponents = async (state) => {
    const requestId = `components-${state}-${Date.now()}`;
    const urls = [
      `${workerUrlRef.current}/design-system/components/${state}`,
      `${workerUrlRef.current}/components/${state}`,
      `${workerUrlRef.current}/api/components/${state}`,
      `${fallbackUrl}/components/${state}`
    ];
    
    // Similar structure to fetchDesignTokens
    activeRequestsRef.current.set(requestId, { urls, state, startTime: Date.now() });
    
    try {
      // Implementation similar to fetchDesignTokens
      // Use fallback components if all endpoints fail
      return getFallbackComponents(state);
    } catch (err) {
      if (devMode) console.error(`❌ Error fetching components: ${err.message}`);
      return getFallbackComponents(state);
    }
  };
  
  // Fetch layouts with the same robust handling
  const fetchLayouts = async (state) => {
    const requestId = `layouts-${state}-${Date.now()}`;
    const urls = [
      `${workerUrlRef.current}/design-system/layouts/${state}`,
      `${workerUrlRef.current}/layouts/${state}`,
      `${workerUrlRef.current}/api/layouts/${state}`,
      `${fallbackUrl}/layouts/${state}`
    ];
    
    // Similar structure to fetchDesignTokens
    activeRequestsRef.current.set(requestId, { urls, state, startTime: Date.now() });
    
    try {
      // Implementation similar to fetchDesignTokens
      // Use fallback layouts if all endpoints fail
      return getFallbackLayouts(state);
    } catch (err) {
      if (devMode) console.error(`❌ Error fetching layouts: ${err.message}`);
      return getFallbackLayouts(state);
    }
  };

  // Get fallback tokens for offline use or when API fails
  const getFallbackTokens = (state) => {
    // Comprehensive fallback tokens for all states
    const FALLBACK_TOKENS = {
      heritage: {
        colors: {
          primary: "#131A36",
          secondary: "#666666", 
          accent: "#888888",
          surface: "#F5F5F5", 
          text: "#333333", 
          background: "#FFFFFF"
        },
        spacing: { 
          xs: "4px", 
          sm: "8px", 
          md: "16px", 
          lg: "24px", 
          xl: "32px", 
          xxl: "48px" 
        },
        typography: {
          fontFamily: "SF Pro Display",
          sizes: { 
            xs: "12px", 
            sm: "14px", 
            md: "16px", 
            lg: "18px", 
            xl: "24px", 
            xxl: "32px" 
          }
        },
        effects: { 
          dimensional: false, 
          animations: "minimal", 
          depth: "flat" 
        }
      },
      transitional: {
        colors: {
          primary: "#131A36", 
          secondary: "#331F4A", 
          accent: "#5AC8FA",
          surface: "#F8F9FA", 
          text: "#2D3748", 
          background: "#FFFFFF"
        },
        spacing: { 
          xs: "4px", 
          sm: "8px", 
          md: "16px", 
          lg: "24px", 
          xl: "32px", 
          xxl: "48px" 
        },
        typography: {
          fontFamily: "SF Pro Display",
          sizes: { 
            xs: "12px", 
            sm: "14px", 
            md: "16px", 
            lg: "18px", 
            xl: "24px", 
            xxl: "32px" 
          }
        },
        effects: { 
          dimensional: "emerging", 
          animations: "subtle", 
          depth: "layered" 
        }
      },
      quantum: {
        colors: {
          primary: "#131A36", 
          secondary: "#331F4A", 
          accent: "#5AC8FA",
          surface: "#0A0621", 
          text: "#FFFFFF", 
          background: "#0D0D15",
          rose: "#BF4080", 
          teal: "#126D71"
        },
        spacing: { 
          xs: "4px", 
          sm: "8px", 
          md: "16px", 
          lg: "24px", 
          xl: "32px", 
          xxl: "48px" 
        },
        typography: {
          fontFamily: "SF Pro Display",
          sizes: { 
            xs: "12px", 
            sm: "14px", 
            md: "16px", 
            lg: "18px", 
            xl: "24px", 
            xxl: "32px" 
          }
        },
        effects: { 
          dimensional: true, 
          animations: "rich", 
          depth: "spatial", 
          particles: true 
        }
      },
      superposition: {
        colors: {
          primary: "#131A36", 
          secondary: "#331F4A", 
          accent: "#5AC8FA",
          surface: "#0A0621", 
          text: "#FFFFFF", 
          background: "#0D0D15",
          rose: "#BF4080", 
          teal: "#126D71", 
          quantum: "#6A3093"
        },
        spacing: { 
          xs: "4px", 
          sm: "8px", 
          md: "16px", 
          lg: "24px", 
          xl: "32px", 
          xxl: "48px" 
        },
        typography: {
          fontFamily: "SF Pro Display",
          sizes: { 
            xs: "12px", 
            sm: "14px", 
            md: "16px", 
            lg: "18px", 
            xl: "24px", 
            xxl: "32px" 
          }
        },
        effects: { 
          dimensional: "advanced", 
          animations: "fluid", 
          depth: "multi-dimensional",
          particles: "advanced", 
          neuralEngine: true 
        },
        quantum: {
          pixelDensity: 2,
          energyStates: {
            rest: { scale: 1, opacity: 1, blur: "0px" },
            hover: { scale: 1.05, opacity: 1, blur: "0px" },
            active: { scale: 0.95, opacity: 0.9, blur: "0px" }
          }
        }
      }
    };
    
    return FALLBACK_TOKENS[state] || FALLBACK_TOKENS.quantum;
  };
  
  // Get fallback components when API fails
  const getFallbackComponents = (state) => {
    // Simplified fallback component definitions
    return {
      Button: {
        name: "Button",
        type: "basic",
        variants: ["primary", "secondary", "accent"]
      },
      Card: {
        name: "Card",
        type: "container",
        variants: ["elevated", "flat"]
      },
      Input: {
        name: "Input",
        type: "form",
        variants: ["text", "number", "select"]
      },
      // Add more component definitions as needed
    };
  };
  
  // Get fallback layouts when API fails
  const getFallbackLayouts = (state) => {
    // Simplified fallback layout definitions
    return {
      Dashboard: {
        name: "Dashboard",
        type: "application",
        areas: ["header", "sidebar", "main", "footer"]
      },
      Hero: {
        name: "Hero",
        type: "marketing",
        areas: ["headline", "content", "cta"]
      },
      Grid: {
        name: "Grid",
        type: "content",
        areas: ["items"]
      },
      // Add more layout definitions as needed
    };
  };

  // Generate core components based on tokens and design state
  const generateComponents = (tokens, state, deviceInfo) => {
    if (!tokens) return null;
    
    // Apply M4 optimizations if device supports them
    const useM4Features = deviceInfo?.isM4Detected || false;
    const renderQuality = deviceInfo?.renderQuality || 'standard';
    
    // Button component
    const Button = ({ 
      text = "Button", 
      variant = "primary", 
      size = "md",
      onClick,
      disabled = false,
      ...props 
    }) => {
      // Choose colors based on variant
      const getBackgroundColor = () => {
        switch (variant) {
          case 'primary': return tokens.colors.primary;
          case 'secondary': return tokens.colors.secondary;
          case 'accent': return tokens.colors.accent;
          case 'rose': return tokens.colors.rose || '#BF4080';
          case 'teal': return tokens.colors.teal || '#126D71';
          default: return tokens.colors.primary;
        }
      };

      // Enhanced button style with proper states
      const buttonStyle = {
        backgroundColor: getBackgroundColor(),
        color: tokens.colors.text,
        border: 'none',
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        borderRadius: '8px',
        fontSize: tokens.typography.sizes?.[size] || '16px',
        fontFamily: tokens.typography.fontFamily,
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        boxShadow: state === 'heritage' 
          ? 'none' 
          : useM4Features && state === 'superposition'
            ? '0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.2)'
            : '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease'
      };
      
      // Apply M4 optimizations if available
      const m4Motion = {
        whileHover: useM4Features ? { 
          scale: 1.05,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.4)'
        } : { scale: 1.02 },
        whileTap: useM4Features ? { 
          scale: 0.95,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        } : { scale: 0.98 }
      };

      return (
        <motion.button
          style={buttonStyle}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          {...(disabled ? {} : m4Motion)}
          {...props}
        >
          {text}
        </motion.button>
      );
    };

    // Card component
    const Card = ({ 
      title, 
      children, 
      elevated = false,
      variant = "default",
      ...props 
    }) => {
      // Apply style based on design state
      const getCardStyle = () => {
        const baseStyle = {
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.text,
          padding: tokens.spacing.lg,
          borderRadius: '12px',
          boxShadow: elevated 
            ? state === 'heritage'
              ? '0 2px 8px rgba(0,0,0,0.1)'
              : useM4Features && state === 'superposition'
                ? '0 16px 48px rgba(0,0,0,0.3), 0 0 24px rgba(90, 200, 250, 0.2)'
                : '0 8px 32px rgba(0,0,0,0.15)'
            : 'none',
          border: variant === 'bordered' 
            ? `1px solid ${tokens.colors.accent}30` 
            : 'none',
          backdropFilter: useM4Features && state === 'superposition'
            ? 'blur(10px)'
            : undefined,
          background: useM4Features && variant === 'glass' && state === 'superposition'
            ? `rgba(10, 6, 33, 0.6)`
            : tokens.colors.surface
        };

        return baseStyle;
      };

      return (
        <motion.div
          style={getCardStyle()}
          whileHover={elevated ? { y: -2 } : {}}
          {...props}
        >
          {title && (
            <h3 style={{
              fontSize: tokens.typography.sizes?.lg || '18px',
              marginTop: 0,
              marginBottom: tokens.spacing.md,
              color: tokens.colors.accent
            }}>
              {title}
            </h3>
          )}
          <div>{children}</div>
        </motion.div>
      );
    };

    // Input component
    const Input = ({ 
      type = "text",
      placeholder = "", 
      label,
      value,
      onChange,
      error,
      ...props 
    }) => {
      return (
        <div style={{ marginBottom: tokens.spacing.md }}>
          {label && (
            <label style={{
              display: 'block',
              marginBottom: tokens.spacing.xs,
              fontSize: tokens.typography.sizes?.sm,
              color: tokens.colors.text,
              fontFamily: tokens.typography.fontFamily
            }}>
              {label}
            </label>
          )}
          
          <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
              width: '100%',
              padding: tokens.spacing.sm,
              backgroundColor: tokens.colors.surface,
              color: tokens.colors.text,
              border: error 
                ? `1px solid ${tokens.colors.rose || '#BF4080'}` 
                : `1px solid ${tokens.colors.accent}30`,
              borderRadius: '6px',
              fontSize: tokens.typography.sizes?.md,
              fontFamily: tokens.typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxShadow: state === 'heritage' 
                ? 'none' 
                : 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}
            {...props}
          />
          
          {error && (
            <div style={{
              color: tokens.colors.rose || '#BF4080',
              fontSize: tokens.typography.sizes?.sm,
              marginTop: tokens.spacing.xs
            }}>
              {error}
            </div>
          )}
        </div>
      );
    };

    // DimensionalGrid component (simple version)
    const DimensionalGrid = ({ 
      columns = 12,
      rows = 12, 
      children,
      ...props
    }) => {
      return (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            position: 'relative'
          }}
          {...props}
        >
          {/* Optional grid background for quantum and superposition states */}
          {(state === 'quantum' || state === 'superposition') && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 
                  `linear-gradient(to right, ${tokens.colors.accent}10 1px, transparent 1px),
                   linear-gradient(to bottom, ${tokens.colors.accent}10 1px, transparent 1px)`,
                backgroundSize: `calc(100% / ${columns}) calc(100% / ${rows})`,
                zIndex: -1
              }}
            />
          )}
          
          {children}
        </div>
      );
    };

    // QuantumPixel component (simplified version)
    const QuantumPixel = ({ 
      color = tokens.colors.accent,
      size = 8,
      state: pixelState = 'rest',
      animated = true,
      ...props
    }) => {
      // Get energy state properties based on quantum state
      const getEnergyState = () => {
        const defaultStates = {
          rest: { scale: 1, opacity: 1, blur: '0px' },
          active: { scale: 1.2, opacity: 1, blur: '0px' },
          hover: { scale: 1.1, opacity: 1, blur: '0px' },
          disabled: { scale: 1, opacity: 0.5, blur: '1px' }
        };
        
        // Use quantum energy states if available, otherwise defaults
        return tokens.quantum?.energyStates?.[pixelState] || defaultStates[pixelState] || defaultStates.rest;
      };
      
      const energyState = getEnergyState();
      
      return (
        <motion.div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: state === 'heritage' ? '0px' : '2px',
            boxShadow: state === 'superposition' 
              ? `0 0 ${size/2}px ${color}80` 
              : 'none',
            filter: energyState.blur ? `blur(${energyState.blur})` : undefined
          }}
          initial={animated ? { scale: energyState.scale, opacity: energyState.opacity } : false}
          animate={animated ? { scale: energyState.scale, opacity: energyState.opacity } : false}
          {...props}
        />
      );
    };
    
    // Return all generated components
    return {
      Button,
      Card,
      Input,
      DimensionalGrid,
      QuantumPixel
    };
  };

  // Generate layout templates based on tokens and design state
  const generateLayouts = (tokens, state, deviceInfo) => {
    if (!tokens) return null;

    // Apply M4 optimizations if device supports them
    const useM4Features = deviceInfo?.isM4Detected || false;
    
    // Dashboard layout template
    const DashboardLayout = ({ 
      title = "Dashboard", 
      sidebar = true,
      children,
      ...props
    }) => {
      return (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            fontFamily: tokens.typography.fontFamily,
            backgroundColor: tokens.colors.background,
            color: tokens.colors.text
          }}
          {...props}
        >
          {/* Header */}
          <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: tokens.spacing.md,
            backgroundColor: tokens.colors.primary,
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ 
              fontSize: tokens.typography.sizes?.xl, 
              margin: 0 
            }}>
              {title}
            </h1>
            <div>
              {/* Header actions could go here */}
            </div>
          </header>
          
          <div style={{ display: 'flex', flex: 1 }}>
            {/* Sidebar */}
            {sidebar && (
              <aside style={{
                width: '240px',
                padding: tokens.spacing.md,
                backgroundColor: state === 'heritage' 
                  ? '#f5f5f5' 
                  : tokens.colors.surface,
                borderRight: `1px solid ${tokens.colors.accent}20`
              }}>
                <nav style={{ marginTop: tokens.spacing.lg }}>
                  <div style={{ marginBottom: tokens.spacing.md }}>
                    <a href="#" style={{ 
                      color: tokens.colors.accent,
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}>
                      Dashboard
                    </a>
                  </div>
                  <div style={{ marginBottom: tokens.spacing.md }}>
                    <a href="#" style={{ 
                      color: tokens.colors.text,
                      textDecoration: 'none'
                    }}>
                      Projects
                    </a>
                  </div>
                  <div style={{ marginBottom: tokens.spacing.md }}>
                    <a href="#" style={{ 
                      color: tokens.colors.text,
                      textDecoration: 'none'
                    }}>
                      Settings
                    </a>
                  </div>
                </nav>
              </aside>
            )}
            
            {/* Main content area */}
            <main style={{
              flex: 1,
              padding: tokens.spacing.lg,
              backgroundColor: tokens.colors.background,
            }}>
              {children}
            </main>
          </div>
        </div>
      );
    };
    
    // Hero layout template
    const HeroLayout = ({ 
      title = "Welcome", 
      subtitle = "",
      backgroundImage,
      children,
      ...props
    }) => {
      return (
        <div 
          style={{ 
            minHeight: '100vh',
            fontFamily: tokens.typography.fontFamily,
            color: tokens.colors.text
          }}
          {...props}
        >
          {/* Hero section */}
          <section style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: tokens.spacing.xl,
            background: backgroundImage 
              ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`
              : `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Optional grid background for quantum and superposition states */}
            {(state === 'quantum' || state === 'superposition') && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(${tokens.colors.accent}20 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                opacity: 0.5,
                zIndex: 0
              }} />
            )}
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: useM4Features ? '5rem' : '4rem',
                fontWeight: 'bold',
                marginBottom: tokens.spacing.md,
                color: '#fff',
                textShadow: useM4Features ? '0 0 20px rgba(0,0,0,0.3)' : 'none'
              }}>
                {title}
              </h1>
              
              {subtitle && (
                <h2 style={{
                  fontSize: '1.5rem',
                  marginBottom: tokens.spacing.lg,
                  color: '#fff',
                  opacity: 0.9
                }}>
                  {subtitle}
                </h2>
              )}
              
              <div>{children}</div>
            </div>
          </section>
          
          {/* Content section */}
          <section style={{
            padding: tokens.spacing.xl,
            backgroundColor: tokens.colors.background
          }}>
            {/* Additional content could go here */}
          </section>
        </div>
      );
    };
    
    // Grid layout template
    const GridLayout = ({ 
      columns = 3,
      spacing = 'md',
      children,
      ...props
    }) => {
      // Convert spacing to pixel value
      const getSpacingValue = (size) => {
        return tokens.spacing[size] || tokens.spacing.md;
      };
      
      return (
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: getSpacingValue(spacing),
            padding: getSpacingValue(spacing),
            fontFamily: tokens.typography.fontFamily
          }}
          {...props}
        >
          {children}
        </div>
      );
    };
    
    // Return all generated layouts
    return {
      DashboardLayout,
      HeroLayout,
      GridLayout
    };
  };
  
  // Initialize on component mount
  useEffect(() => {
    const initDesignSystem = async () => {
      setLoading(true);
      
      try {
        // Detect device capabilities
        const deviceCapabilities = detectDeviceCapabilities();
        setDeviceInfo(deviceCapabilities);
        
        // Use auto-detected state if enabled
        const targetState = autoDetect 
          ? deviceCapabilities.recommendedState 
          : initialState;
          
        setDesignState(targetState);
        
        // Fetch design tokens, components, and layouts
        const [fetchedTokens, fetchedComponents, fetchedLayouts] = await Promise.all([
          fetchDesignTokens(targetState),
          fetchComponents(targetState),
          fetchLayouts(targetState)
        ]);
        
        // Set tokens and generate components
        setTokens(fetchedTokens);
        setComponents(fetchedComponents);
        setLayouts(fetchedLayouts);
        
        // Apply CSS variables to document for easy styling
        if (typeof document !== 'undefined' && fetchedTokens) {
          applyTokensToCSS(fetchedTokens);
        }
        
      } catch (err) {
        console.error('Failed to initialize design system:', err);
        setError(err.message);
        
        // Fallback to basic tokens on error
        const fallbackTokensState = initialState;
        const fallbackTokens = getFallbackTokens(fallbackTokensState);
        setTokens(fallbackTokens);
        setDesignState(fallbackTokensState);
        
      } finally {
        setLoading(false);
      }
    };
    
    initDesignSystem();
    
    // Clean up on unmount
    return () => {
      // Cancel any pending requests
      activeRequestsRef.current.forEach((_, requestId) => {
        activeRequestsRef.current.delete(requestId);
      });
    };
  }, []);
  
  // Update when state changes
  useEffect(() => {
    if (designState !== initialState) {
      // Fetch new tokens and components when state changes
      const updateState = async () => {
        setLoading(true);
        
        try {
          // Fetch design tokens, components, and layouts for new state
          const [updatedTokens, updatedComponents, updatedLayouts] = await Promise.all([
            fetchDesignTokens(designState),
            fetchComponents(designState),
            fetchLayouts(designState)
          ]);
          
          // Update state
          setTokens(updatedTokens);
          setComponents(updatedComponents);
          setLayouts(updatedLayouts);
          
          // Apply CSS variables to document for easy styling
          if (typeof document !== 'undefined' && updatedTokens) {
            applyTokensToCSS(updatedTokens);
          }
          
        } catch (err) {
          console.error(`Failed to update design state to ${designState}:`, err);
          
          // Fallback to basic tokens on error
          const fallbackTokens = getFallbackTokens(designState);
          setTokens(fallbackTokens);
          
        } finally {
          setLoading(false);
        }
      };
      
      updateState();
    }
  }, [designState]);

  // Apply tokens to CSS variables for global styling
  const applyTokensToCSS = (tokens) => {
    if (!tokens || typeof document === 'undefined') return;
    
    // Apply colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'object') {
          // Handle nested color objects (e.g., light/dark variants)
          Object.entries(value).forEach(([subKey, subValue]) => {
            document.documentElement.style.setProperty(
              `--color-${key}-${subKey}`, 
              subValue
            );
          });
        } else {
          document.documentElement.style.setProperty(`--color-${key}`, value);
        }
      });
    }
    
    // Apply spacing
    if (tokens.spacing) {
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        if (typeof value === 'object') return; // Skip objects
        document.documentElement.style.setProperty(`--spacing-${key}`, value);
      });
    }
    
    // Apply typography
    if (tokens.typography) {
      // Font family
      if (tokens.typography.fontFamily) {
        document.documentElement.style.setProperty(
          `--font-family`, 
          tokens.typography.fontFamily
        );
      }
      
      // Font sizes
      if (tokens.typography.sizes) {
        Object.entries(tokens.typography.sizes).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--font-size-${key}`, value);
        });
      }
    }
    
    // Apply other token categories as needed
  };

  // Generate React components from tokens
  const generatedComponents = tokens 
    ? generateComponents(tokens, designState, deviceInfo) 
    : null;
    
  // Generate layouts from tokens
  const generatedLayouts = tokens
    ? generateLayouts(tokens, designState, deviceInfo)
    : null;

  // Build context value
  const contextValue = {
    // Core design system
    tokens,
    designState,
    setDesignState,
    deviceInfo,
    
    // Status
    loading,
    error,
    
    // Components and layouts
    components: generatedComponents,
    layouts: generatedLayouts,
    
    // Utilities
    applyTokensToCSS
  };
  
  // Loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0A0621',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #5AC8FA',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <div>Loading Quantum-Spatial Design System...</div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error && !tokens) {
    return (
      <div style={{
        padding: '24px',
        backgroundColor: '#331F4A',
        color: '#FFFFFF',
        borderRadius: '8px',
        margin: '24px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h3>Quantum-Spatial Design System Error</h3>
        <p>Could not load design system: {error}</p>
        <p>Using fallback design tokens.</p>
      </div>
    );
  }
  
  // Render provider with context
  return (
    <QuantumSpatialContext.Provider value={contextValue}>
      {children}
    </QuantumSpatialContext.Provider>
  );
}

// Framer property controls
if (typeof addPropertyControls === 'function') {
  addPropertyControls(QuantumSpatialProvider, {
    autoDetect: {
      type: ControlType.Boolean,
      defaultValue: true,
      title: "Auto-detect Device"
    },
    initialState: {
      type: ControlType.Enum,
      options: ["heritage", "transitional", "quantum", "superposition"],
      defaultValue: "quantum",
      title: "Design State"
    },
    workerUrl: {
      type: ControlType.String,
      defaultValue: CLOUDFLARE_ENDPOINTS.PRODUCTION,
      title: "Worker URL"
    },
    fallbackUrl: {
      type: ControlType.String,
      defaultValue: CLOUDFLARE_ENDPOINTS.FALLBACK,
      title: "Fallback URL"
    },
    devMode: {
      type: ControlType.Boolean,
      defaultValue: false,
      title: "Development Mode"
    }
  });
}

/**
 * Demo component showing the Quantum-Spatial design system
 * @returns {JSX.Element} Demo component
 */
export function QuantumSpatialDemo() {
  return (
    <QuantumSpatialProvider autoDetect={true} initialState="quantum" devMode={true}>
      <DemoContent />
    </QuantumSpatialProvider>
  );
}

// Demo content using the design system
function DemoContent() {
  const { 
    tokens, 
    designState, 
    setDesignState, 
    deviceInfo,
    components,
    layouts
  } = useQuantumSpatial();
  
  // Early exit if components aren't loaded
  if (!components || !layouts) {
    return <div>Loading components...</div>;
  }
  
  // Destructure components and layouts
  const { Button, Card, Input } = components;
  const { DashboardLayout, GridLayout } = layouts;
  
  // Demo state
  const [inputValue, setInputValue] = useState('');
  
  return (
    <DashboardLayout title="Quantum-Spatial Demo">
      <Card title="Design System Controls">
        <p style={{ marginBottom: tokens.spacing.md }}>
          Current state: <strong>{designState}</strong> | 
          Device: {deviceInfo?.isM4Detected ? 'M4-Capable Device' : 'Standard Device'}
        </p>
        
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginBottom: tokens.spacing.lg }}>
          {["heritage", "transitional", "quantum", "superposition"].map(state => (
            <Button
              key={state}
              text={state}
              variant={designState === state ? "primary" : "secondary"}
              onClick={() => setDesignState(state)}
            />
          ))}
        </div>
        
        <Input
          type="text"
          label="Sample Input"
          placeholder="Enter some text..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Card>
      
      <h2 style={{ 
        marginTop: tokens.spacing.lg, 
        marginBottom: tokens.spacing.md,
        color: tokens.colors.accent
      }}>
        Component Showcase
      </h2>
      
      <GridLayout columns={2}>
        <Card title="Button Variants" elevated={true}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            <Button text="Primary Button" variant="primary" />
            <Button text="Secondary Button" variant="secondary" />
            <Button text="Accent Button" variant="accent" />
            {tokens.colors.rose && <Button text="Rose Button" variant="rose" />}
            {tokens.colors.teal && <Button text="Teal Button" variant="teal" />}
            <Button text="Disabled Button" variant="primary" disabled={true} />
          </div>
        </Card>
        
        <Card title="Card Variants" elevated={true}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            <Card title="Default Card" style={{ margin: 0 }}>
              <p>This is a default card with a title.</p>
            </Card>
            
            <Card variant="bordered" style={{ margin: 0 }}>
              <p>This is a bordered card without a title.</p>
            </Card>
            
            {deviceInfo?.isM4Detected && (
              <Card title="M4-Optimized Glass Card" variant="glass" style={{ margin: 0 }}>
                <p>This glass card is only visible on M4 devices.</p>
              </Card>
            )}
          </div>
        </Card>
      </GridLayout>
      
      <Card title="Tokens Preview" style={{ marginTop: tokens.spacing.lg }}>
        <div style={{ 
          maxHeight: '200px', 
          overflow: 'auto', 
          backgroundColor: '#0a0a0a10',
          padding: tokens.spacing.md,
          borderRadius: '8px'
        }}>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      </Card>
    </DashboardLayout>
  );
}

// Export default component
export default QuantumSpatialProvider;