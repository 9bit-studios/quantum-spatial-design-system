/**
 * Quantum-Spatial Design System - Cloudflare Provider
 * Connects to the Cloudflare Worker API for design tokens and components
 */
import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";

// Create context for design system
const CloudflareContext = createContext({
  state: "transitional",
  setState: (state) => {},
  tokens: null,
  isLoading: true,
  deviceCapabilities: null
});

/**
 * Hook to use the cloudflare design system
 */
export function useCloudflareDesignSystem() {
  return useContext(CloudflareContext);
}

/**
 * Cloudflare Provider Component
 */
export function CloudflareProvider({ 
  children, 
  initialState = "transitional",
  detectDevice = true,
  workerURL = "https://design-system-staging.9bitstudios.io"
}) {
  const [state, setState] = useState(initialState);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceCapabilities, setDeviceCapabilities] = useState(null);
  
  // Detect device capabilities
  useEffect(() => {
    if (detectDevice) {
      fetch(`${workerURL}/m4-optimization`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setDeviceCapabilities(data);
          
          // Set optimal state based on device if initialState is "auto"
          if (initialState === "auto") {
            if (data.isM4Compatible) {
              setState("superposition");
            } else if (data.isAppleSilicon) {
              setState("quantum");
            } else {
              setState("transitional");
            }
          }
        })
        .catch(error => {
          console.error("Error detecting device capabilities:", error);
          // Fallback to device detection using navigator.userAgent
          const userAgent = navigator.userAgent;
          const isAppleSilicon = userAgent.includes('Mac') && 
                                !userAgent.includes('Intel');
          
          setDeviceCapabilities({
            isM4Compatible: isAppleSilicon,
            isAppleSilicon: isAppleSilicon,
            renderingAPI: isAppleSilicon ? 'metal' : 'webgl'
          });
        });
    }
  }, [detectDevice, initialState, workerURL]);
  
  // Fetch design tokens when state changes
  useEffect(() => {
    setIsLoading(true);
    
    fetch(`${workerURL}/design-system/tokens?state=${state}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTokens(data);
        
        // Apply tokens as CSS variables
        applyTokensToCSS(data);
        
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching design tokens:", error);
        setIsLoading(false);
        
        // Try to load fallback tokens from local files
        try {
          // Dynamically import the token file based on state
          import(`./${state}-tokens.js`)
            .then(module => {
              setTokens(module.default || module[state + 'Tokens']);
              
              if (module.default) {
                applyTokensToCSS(module.default);
              }
              
              setIsLoading(false);
            })
            .catch(importError => {
              console.error("Error loading fallback tokens:", importError);
              setIsLoading(false);
            });
        } catch (fallbackError) {
          console.error("Fallback token loading failed:", fallbackError);
        }
      });
  }, [state, workerURL]);
  
  // Apply tokens as CSS variables
  const applyTokensToCSS = (tokens) => {
    if (!tokens) return;
    
    // Apply to document root
    const root = document.documentElement;
    
    // Clear existing variables
    const style = document.getElementById('quantum-spatial-design-system-styles');
    if (style) {
      style.remove();
    }
    
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.id = 'quantum-spatial-design-system-styles';
    
    // Generate CSS variables
    const css = generateCSSVariables(tokens);
    styleEl.innerHTML = css;
    
    // Append to head
    document.head.appendChild(styleEl);
  };
  
  // Generate CSS variables from tokens
  const generateCSSVariables = (tokens) => {
    let css = ':root {';
    
    // Colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          css += `  --color-${key}: ${value};`;
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              css += `  --color-${key}-${subKey}: ${subValue};`;
            }
          });
        }
      });
    }
    
    // Typography
    if (tokens.typography) {
      css += `  --font-family: ${tokens.typography.fontFamily};`;
      
      // Headings
      if (tokens.typography.headings) {
        Object.entries(tokens.typography.headings).forEach(([key, value]) => {
          css += `  --font-size-${key}: ${value.fontSize};`;
          css += `  --font-weight-${key}: ${value.fontWeight};`;
          css += `  --line-height-${key}: ${value.lineHeight};`;
        });
      }
      
      // Body text
      if (tokens.typography.body) {
        Object.entries(tokens.typography.body).forEach(([key, value]) => {
          css += `  --font-size-body-${key}: ${value.fontSize};`;
          css += `  --font-weight-body-${key}: ${value.fontWeight};`;
          css += `  --line-height-body-${key}: ${value.lineHeight};`;
        });
      }
    }
    
    // Spacing
    if (tokens.spacing && tokens.spacing.scale) {
      Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
        css += `  --spacing-${key}: ${value};`;
      });
    }
    
    // Border radius
    if (tokens.borderRadius) {
      Object.entries(tokens.borderRadius).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};`;
      });
    }
    
    // Shadows
    if (tokens.shadows) {
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        css += `  --shadow-${key}: ${value};`;
      });
    }
    
    // Motion
    if (tokens.motion) {
      // Duration
      if (tokens.motion.duration) {
        Object.entries(tokens.motion.duration).forEach(([key, value]) => {
          css += `  --duration-${key}: ${value};`;
        });
      }
      
      // Easing
      if (tokens.motion.easing) {
        Object.entries(tokens.motion.easing).forEach(([key, value]) => {
          css += `  --easing-${key}: ${value};`;
        });
      }
    }
    
    css += '}';
    return css;
  };
  
  return (
    <CloudflareContext.Provider 
      value={{
        state,
        setState,
        tokens,
        isLoading,
        deviceCapabilities
      }}
    >
      <div 
        data-design-state={state}
        data-device-m4={deviceCapabilities?.isM4Compatible ? "true" : "false"}
        data-device-apple-silicon={deviceCapabilities?.isAppleSilicon ? "true" : "false"}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </div>
    </CloudflareContext.Provider>
  );
}