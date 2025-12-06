/**
 * Quantum-Spatial Design System Provider for Framer
 * Generated from Cloudflare Worker: https://design-system-staging.9bitstudios.io
 * Environment: Staging
 */
import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";

// Create context for design system
const DesignSystemContext = createContext({
  state: "transitional",
  setState: () => {},
  tokens: null,
  isLoading: true,
  deviceCapabilities: null
});

/**
 * Hook to use the design system
 */
export function useDesignSystem() {
  return useContext(DesignSystemContext);
}

/**
 * Design System Provider Component
 */
export function DesignSystemProvider({ 
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
        .then(response => response.json())
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
        });
    }
  }, [detectDevice, initialState, workerURL]);
  
  // Fetch design tokens when state changes
  useEffect(() => {
    setIsLoading(true);
    
    fetch(`${workerURL}/design-system/tokens?state=${state}`)
      .then(response => response.json())
      .then(data => {
        setTokens(data);
        
        // Apply tokens as CSS variables
        applyTokensToCSS(data);
        
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching design tokens:", error);
        setIsLoading(false);
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
  
  // Generate CSS variables
  const generateCSSVariables = (tokens) => {
    let css = `:root {
`;
    
    // Colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          css += `  --color-${key}: ${value};
`;
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              css += `  --color-${key}-${subKey}: ${subValue};
`;
            }
          });
        }
      });
    }
    
    // Spacing
    if (tokens.spacing && tokens.spacing.scale) {
      Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
        css += `  --spacing-${key}: ${value};
`;
      });
    }
    
    // Typography
    if (tokens.typography) {
      css += `  --font-family: ${tokens.typography.fontFamily};
`;
      
      if (tokens.typography.headings) {
        Object.entries(tokens.typography.headings).forEach(([key, value]) => {
          css += `  --font-size-${key}: ${value.fontSize};
`;
          css += `  --font-weight-${key}: ${value.fontWeight};
`;
          css += `  --line-height-${key}: ${value.lineHeight};
`;
        });
      }
      
      if (tokens.typography.body) {
        Object.entries(tokens.typography.body).forEach(([key, value]) => {
          css += `  --font-size-body-${key}: ${value.fontSize};
`;
          css += `  --font-weight-body-${key}: ${value.fontWeight};
`;
          css += `  --line-height-body-${key}: ${value.lineHeight};
`;
        });
      }
    }
    
    // Border radius
    if (tokens.borderRadius) {
      Object.entries(tokens.borderRadius).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};
`;
      });
    }
    
    // Shadows
    if (tokens.shadows) {
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        css += `  --shadow-${key}: ${value};
`;
      });
    }
    
    // Motion
    if (tokens.motion) {
      if (tokens.motion.duration) {
        Object.entries(tokens.motion.duration).forEach(([key, value]) => {
          css += `  --duration-${key}: ${value};
`;
        });
      }
      
      if (tokens.motion.easing) {
        Object.entries(tokens.motion.easing).forEach(([key, value]) => {
          css += `  --easing-${key}: ${value};
`;
        });
      }
    }
    
    css += `}
`;
    return css;
  };
  
  return (
    <DesignSystemContext.Provider 
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
    </DesignSystemContext.Provider>
  );
}

/**
 * Sample Page Component
 */
export function SamplePage() {
  const { state, setState, tokens, isLoading, deviceCapabilities } = useDesignSystem();
  
  if (isLoading) {
    return <div>Loading design system...</div>;
  }
  
  return (
    <div style={{ 
      padding: "var(--spacing-lg)",
      fontFamily: "var(--font-family)",
      color: "var(--color-text)",
      backgroundColor: "var(--color-background)",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1 style={{ 
        fontSize: "var(--font-size-h1)",
        fontWeight: "var(--font-weight-h1)",
        lineHeight: "var(--line-height-h1)",
        marginBottom: "var(--spacing-lg)"
      }}>
        Quantum-Spatial Design System
      </h1>
      
      <div style={{
        display: "flex",
        gap: "var(--spacing-md)",
        marginBottom: "var(--spacing-xl)"
      }}>
        <button 
          onClick={() => setState("heritage")}
          style={{
            backgroundColor: state === "heritage" ? "var(--color-primary)" : "transparent",
            color: state === "heritage" ? "#fff" : "var(--color-text)",
            border: "1px solid var(--color-primary)",
            borderRadius: "var(--radius-small)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            fontFamily: "var(--font-family)",
            cursor: "pointer"
          }}
        >
          Heritage
        </button>
        <button 
          onClick={() => setState("transitional")}
          style={{
            backgroundColor: state === "transitional" ? "var(--color-primary)" : "transparent",
            color: state === "transitional" ? "#fff" : "var(--color-text)",
            border: "1px solid var(--color-primary)",
            borderRadius: "var(--radius-small)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            fontFamily: "var(--font-family)",
            cursor: "pointer"
          }}
        >
          Transitional
        </button>
        <button 
          onClick={() => setState("quantum")}
          style={{
            backgroundColor: state === "quantum" ? "var(--color-primary)" : "transparent",
            color: state === "quantum" ? "#fff" : "var(--color-text)",
            border: "1px solid var(--color-primary)",
            borderRadius: "var(--radius-small)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            fontFamily: "var(--font-family)",
            cursor: "pointer"
          }}
        >
          Quantum
        </button>
        <button 
          onClick={() => setState("superposition")}
          style={{
            backgroundColor: state === "superposition" ? "var(--color-primary)" : "transparent",
            color: state === "superposition" ? "#fff" : "var(--color-text)",
            border: "1px solid var(--color-primary)",
            borderRadius: "var(--radius-small)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            fontFamily: "var(--font-family)",
            cursor: "pointer"
          }}
        >
          Superposition
        </button>
      </div>
      
      <div style={{
        padding: "var(--spacing-lg)",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-medium)",
        boxShadow: "var(--shadow-medium)",
        marginBottom: "var(--spacing-xl)"
      }}>
        <h2 style={{ 
          fontSize: "var(--font-size-h2)",
          fontWeight: "var(--font-weight-h2)",
          lineHeight: "var(--line-height-h2)",
          marginBottom: "var(--spacing-md)"
        }}>
          Current Design State: {tokens._meta?.name || state}
        </h2>
        
        <p style={{ 
          fontSize: "var(--font-size-body-regular)",
          lineHeight: "var(--line-height-body-regular)"
        }}>
          This is an example of how the Quantum-Spatial Design System looks in the current state.
        </p>
        
        {deviceCapabilities && (
          <div style={{ 
            marginTop: "var(--spacing-md)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            backgroundColor: deviceCapabilities.isM4Compatible ? "var(--color-success)" : 
                              deviceCapabilities.isAppleSilicon ? "var(--color-accent)" : 
                              "var(--color-warning)",
            borderRadius: "var(--radius-small)",
            color: "#fff",
            display: "inline-block"
          }}>
            {deviceCapabilities.isM4Compatible ? 
              "M4 Device Detected - Superposition Enabled" : 
              deviceCapabilities.isAppleSilicon ?
              "Apple Silicon Device - Quantum Optimized" :
              "Standard Device - Transitional Mode"
            }
          </div>
        )}
      </div>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "var(--spacing-md)",
        marginBottom: "var(--spacing-xl)"
      }}>
        <div style={{
          padding: "var(--spacing-md)",
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          borderRadius: "var(--radius-small)"
        }}>
          Primary Color
        </div>
        <div style={{
          padding: "var(--spacing-md)",
          backgroundColor: "var(--color-secondary)",
          color: "#fff",
          borderRadius: "var(--radius-small)"
        }}>
          Secondary Color
        </div>
        <div style={{
          padding: "var(--spacing-md)",
          backgroundColor: "var(--color-accent)",
          color: "#fff",
          borderRadius: "var(--radius-small)"
        }}>
          Accent Color
        </div>
        {tokens.colors?.vibrant && (
          <div style={{
            padding: "var(--spacing-md)",
            backgroundColor: "var(--color-vibrant)",
            color: "#fff",
            borderRadius: "var(--radius-small)"
          }}>
            Vibrant Color
          </div>
        )}
      </div>
      
      <div>
        <h3 style={{ 
          fontSize: "var(--font-size-h3)",
          fontWeight: "var(--font-weight-h3)",
          lineHeight: "var(--line-height-h3)",
          marginBottom: "var(--spacing-md)"
        }}>
          Typography Examples
        </h3>
        
        <h1 style={{ 
          fontSize: "var(--font-size-h1)",
          fontWeight: "var(--font-weight-h1)",
          lineHeight: "var(--line-height-h1)",
          marginBottom: "var(--spacing-sm)"
        }}>
          Heading 1
        </h1>
        <h2 style={{ 
          fontSize: "var(--font-size-h2)",
          fontWeight: "var(--font-weight-h2)",
          lineHeight: "var(--line-height-h2)",
          marginBottom: "var(--spacing-sm)"
        }}>
          Heading 2
        </h2>
        <h3 style={{ 
          fontSize: "var(--font-size-h3)",
          fontWeight: "var(--font-weight-h3)",
          lineHeight: "var(--line-height-h3)",
          marginBottom: "var(--spacing-sm)"
        }}>
          Heading 3
        </h3>
        <h4 style={{ 
          fontSize: "var(--font-size-h4)",
          fontWeight: "var(--font-weight-h4)",
          lineHeight: "var(--line-height-h4)",
          marginBottom: "var(--spacing-sm)"
        }}>
          Heading 4
        </h4>
        <p style={{ 
          fontSize: "var(--font-size-body-regular)",
          lineHeight: "var(--line-height-body-regular)",
          marginBottom: "var(--spacing-sm)"
        }}>
          Regular body text. The Quantum-Spatial Design System provides a comprehensive set of design tokens and components optimized for different device capabilities.
        </p>
        <p style={{ 
          fontSize: "var(--font-size-body-small)",
          lineHeight: "var(--line-height-body-small)"
        }}>
          Small body text. This design system is especially optimized for M4 devices.
        </p>
      </div>
    </div>
  );
}
