/**
 * 9Bit Studios - Quantum-Spatial Design System
 * Framer Integration Function
 * 
 * This module provides utilities for formatting design tokens and components
 * for enhanced Framer compatibility, focusing on M4 optimization.
 */

/**
 * Format design tokens for Framer's variable system
 * @param {Object} tokens - Design tokens
 * @returns {Object} - Framer-formatted tokens
 */
function formatTokensForFramer(tokens) {
  // Basic structure for Framer
  const framerData = {
    $schema: "https://framer.com/schema/design-system.json",
    name: `9Bit Studios Quantum-Spatial Design System (${tokens._meta?.name || 'Default'})`,
    version: tokens._meta?.version || "1.0.0",
    tokens: {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {},
      motion: {}
    }
  };

  // Format colors
  if (tokens.colors) {
    // Handle flat and nested color objects
    const colorEntries = Object.entries(tokens.colors);

    colorEntries.forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color value
        framerData.tokens.colors[key] = { value: value };
      } else if (typeof value === 'object' && value !== null) {
        // Nested color object (e.g., light/dark variants)
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            framerData.tokens.colors[`${key}-${subKey}`] = { value: subValue };
          }
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
    
    framerData.tokens.typography.baseSize = {
      value: tokens.typography.baseSize
    };
    
    framerData.tokens.typography.scale = {
      value: tokens.typography.scale
    };

    // Headings
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        framerData.tokens.typography[key] = {
          value: {
            fontFamily: tokens.typography.fontFamily,
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight,
            letterSpacing: value.letterSpacing || 'normal'
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

  // Format motion
  if (tokens.motion) {
    // Duration
    if (tokens.motion.duration) {
      Object.entries(tokens.motion.duration).forEach(([key, value]) => {
        framerData.tokens.motion[`duration-${key}`] = { value: value };
      });
    }

    // Easing
    if (tokens.motion.easing) {
      Object.entries(tokens.motion.easing).forEach(([key, value]) => {
        framerData.tokens.motion[`easing-${key}`] = { value: value };
      });
    }
  }

  // Add M4-specific tokens if available
  if (tokens.m4) {
    framerData.m4 = tokens.m4;
  }

  return framerData;
}

/**
 * Format Framer component properties
 * @param {Array} components - Components array
 * @returns {Array} - Formatted components array
 */
function formatComponentsForFramer(components) {
  return components.map(component => {
    // Generate a unique ID for the component
    const id = `${component.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    return {
      id,
      name: component.displayName || component.name,
      type: "component",
      exportName: component.name,
      codeComponentImport: `quantum-spatial-design-system/${component.name}`,
      props: component.props || {},
      defaultState: component.defaultState || "default"
    };
  });
}

/**
 * Generate CSS variables from design tokens
 * @param {Object} tokens - Design tokens
 * @returns {string} - CSS variables code
 */
function generateCSSVariables(tokens) {
  let cssVariables = `:root {`;
  
  // Colors
  if (tokens.colors) {
    // Handle flat and nested color objects
    const colorEntries = Object.entries(tokens.colors);

    colorEntries.forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color value
        cssVariables += `  --color-${key}: ${value};`;
      } else if (typeof value === 'object' && value !== null) {
        // Nested color object (e.g., light/dark variants)
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            cssVariables += `  --color-${key}-${subKey}: ${subValue};`;
          }
        });
      }
    });
  }

  // Spacing
  if (tokens.spacing && tokens.spacing.scale) {
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      cssVariables += `  --spacing-${key}: ${value};`;
    });
  }

  // Border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      cssVariables += `  --radius-${key}: ${value};`;
    });
  }

  // Shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      cssVariables += `  --shadow-${key}: ${value};`;
    });
  }

  // Typography base
  if (tokens.typography) {
    cssVariables += `  --font-family: ${tokens.typography.fontFamily};`;
    cssVariables += `  --font-size-base: ${tokens.typography.baseSize};`;
    
    // Headings
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        cssVariables += `  --font-size-${key}: ${value.fontSize};`;
        cssVariables += `  --font-weight-${key}: ${value.fontWeight};`;
        cssVariables += `  --line-height-${key}: ${value.lineHeight};`;
      });
    }

    // Body text
    if (tokens.typography.body) {
      Object.entries(tokens.typography.body).forEach(([key, value]) => {
        cssVariables += `  --font-size-body-${key}: ${value.fontSize};`;
        cssVariables += `  --font-weight-body-${key}: ${value.fontWeight};`;
        cssVariables += `  --line-height-body-${key}: ${value.lineHeight};`;
      });
    }
  }

  // Motion
  if (tokens.motion) {
    // Duration
    if (tokens.motion.duration) {
      Object.entries(tokens.motion.duration).forEach(([key, value]) => {
        cssVariables += `  --duration-${key}: ${value};`;
      });
    }

    // Easing
    if (tokens.motion.easing) {
      Object.entries(tokens.motion.easing).forEach(([key, value]) => {
        cssVariables += `  --easing-${key}: ${value};`;
      });
    }
  }

  cssVariables += `}`;
  return cssVariables;
}

/**
 * Generate DesignSystemProvider component for Framer
 * @param {string} workerURL - The URL of the Cloudflare Worker
 * @returns {string} - React component code
 */
function generateDesignSystemProvider(workerURL = 'https://design-system-staging.9bitstudios.io') {
  return `/**
 * Quantum-Spatial Design System Provider for Framer
 * Generated from Cloudflare Worker: ${workerURL}
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
  workerURL = "${workerURL}"
}) {
  const [state, setState] = useState(initialState);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceCapabilities, setDeviceCapabilities] = useState(null);
  
  // Detect device capabilities
  useEffect(() => {
    if (detectDevice) {
      fetch(\`\${workerURL}/m4-optimization\`)
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
    
    fetch(\`\${workerURL}/design-system/tokens?state=\${state}\`)
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
    let css = \`:root {\`;
    
    // Colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          css += \`  --color-\${key}: \${value};\`;
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              css += \`  --color-\${key}-\${subKey}: \${subValue};\`;
            }
          });
        }
      });
    }
    
    // Spacing
    if (tokens.spacing && tokens.spacing.scale) {
      Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
        css += \`  --spacing-\${key}: \${value};\`;
      });
    }
    
    // Typography
    if (tokens.typography) {
      css += \`  --font-family: \${tokens.typography.fontFamily};\`;
      
      if (tokens.typography.headings) {
        Object.entries(tokens.typography.headings).forEach(([key, value]) => {
          css += \`  --font-size-\${key}: \${value.fontSize};\`;
          css += \`  --font-weight-\${key}: \${value.fontWeight};\`;
          css += \`  --line-height-\${key}: \${value.lineHeight};\`;
        });
      }
      
      if (tokens.typography.body) {
        Object.entries(tokens.typography.body).forEach(([key, value]) => {
          css += \`  --font-size-body-\${key}: \${value.fontSize};\`;
          css += \`  --font-weight-body-\${key}: \${value.fontWeight};\`;
          css += \`  --line-height-body-\${key}: \${value.lineHeight};\`;
        });
      }
    }
    
    // Border radius
    if (tokens.borderRadius) {
      Object.entries(tokens.borderRadius).forEach(([key, value]) => {
        css += \`  --radius-\${key}: \${value};\`;
      });
    }
    
    // Shadows
    if (tokens.shadows) {
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        css += \`  --shadow-\${key}: \${value};\`;
      });
    }
    
    // Motion
    if (tokens.motion) {
      if (tokens.motion.duration) {
        Object.entries(tokens.motion.duration).forEach(([key, value]) => {
          css += \`  --duration-\${key}: \${value};\`;
        });
      }
      
      if (tokens.motion.easing) {
        Object.entries(tokens.motion.easing).forEach(([key, value]) => {
          css += \`  --easing-\${key}: \${value};\`;
        });
      }
    }
    
    css += \`}\`;
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
`;
}

/**
 * Generate API client for Framer
 * @param {string} workerURL - The URL of the Cloudflare Worker
 * @returns {string} - API client code
 */
function generateAPIClient(workerURL = 'https://design-system-staging.9bitstudios.io') {
  return `/**
 * Quantum-Spatial Design System - API Client
 * Generated from Cloudflare Worker: ${workerURL}
 */

/**
 * Fetch design tokens for a specific state
 * @param {string} state - Design state ('heritage', 'transitional', 'quantum', or 'superposition')
 * @returns {Promise<Object>} Design tokens
 */
export async function fetchDesignTokens(state = 'transitional') {
  try {
    const response = await fetch(
      \`${workerURL}/design-system/tokens?state=\${state}\`
    );
    
    if (!response.ok) {
      throw new Error(\`Failed to fetch design tokens: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching design tokens:', error);
    return null;
  }
}

/**
 * Check M4 device capabilities
 * @returns {Promise<Object>} Device capabilities
 */
export async function checkM4Capabilities() {
  try {
    const response = await fetch(\`${workerURL}/m4-optimization\`);
    
    if (!response.ok) {
      throw new Error(\`Failed to check M4 capabilities: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking M4 capabilities:', error);
    return {
      isM4Compatible: false,
      isAppleSilicon: false,
      renderingAPI: 'webgl',
      useNeuralEngine: false,
      useMetal: false
    };
  }
}

/**
 * Get Framer components
 * @returns {Promise<Array>} Framer components
 */
export async function getFramerComponents() {
  try {
    const response = await fetch(\`${workerURL}/framer-components\`);
    
    if (!response.ok) {
      throw new Error(\`Failed to get Framer components: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting Framer components:', error);
    return [];
  }
}

/**
 * Fetch pixel viewer HTML
 * @param {Object} options - Options
 * @param {string} options.state - Design state
 * @param {number} options.columns - Number of columns
 * @param {number} options.rows - Number of rows
 * @param {string} options.pixelSize - Pixel size
 * @param {boolean} options.interactive - Whether the viewer is interactive
 * @param {boolean} options.showControls - Whether to show controls
 * @returns {Promise<string>} HTML
 */
export async function fetchPixelViewerHTML({
  state = 'transitional',
  columns = 8,
  rows = 6,
  pixelSize = 'md',
  interactive = true,
  showControls = true
} = {}) {
  try {
    const url = new URL(\`${workerURL}/pixel-viewer\`);
    url.searchParams.set('state', state);
    url.searchParams.set('format', 'html');
    url.searchParams.set('columns', columns);
    url.searchParams.set('rows', rows);
    url.searchParams.set('pixelSize', pixelSize);
    url.searchParams.set('interactive', interactive ? 'true' : 'false');
    url.searchParams.set('showControls', showControls ? 'true' : 'false');
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(\`Failed to fetch pixel viewer HTML: \${response.status}\`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching pixel viewer HTML:', error);
    return '';
  }
}

/**
 * Apply design tokens to CSS variables
 * @param {Object} tokens - Design tokens
 */
export function applyDesignTokensToCSS(tokens) {
  if (!tokens) return;
  
  const root = document.documentElement;
  
  // Apply colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(\`--color-\${key}\`, value);
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            root.style.setProperty(\`--color-\${key}-\${subKey}\`, subValue);
          }
        });
      }
    });
  }
  
  // Apply spacing
  if (tokens.spacing && tokens.spacing.scale) {
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      root.style.setProperty(\`--spacing-\${key}\`, value);
    });
  }
  
  // Apply typography
  if (tokens.typography) {
    root.style.setProperty(\`--font-family\`, tokens.typography.fontFamily);
    
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        root.style.setProperty(\`--font-size-\${key}\`, value.fontSize);
        root.style.setProperty(\`--font-weight-\${key}\`, value.fontWeight);
        root.style.setProperty(\`--line-height-\${key}\`, value.lineHeight);
      });
    }
    
    if (tokens.typography.body) {
      Object.entries(tokens.typography.body).forEach(([key, value]) => {
        root.style.setProperty(\`--font-size-body-\${key}\`, value.fontSize);
        root.style.setProperty(\`--font-weight-body-\${key}\`, value.fontWeight);
        root.style.setProperty(\`--line-height-body-\${key}\`, value.lineHeight);
      });
    }
  }
  
  // Apply border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(\`--radius-\${key}\`, value);
    });
  }
  
  // Apply shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      root.style.setProperty(\`--shadow-\${key}\`, value);
    });
  }
  
  // Apply motion
  if (tokens.motion) {
    if (tokens.motion.duration) {
      Object.entries(tokens.motion.duration).forEach(([key, value]) => {
        root.style.setProperty(\`--duration-\${key}\`, value);
      });
    }
    
    if (tokens.motion.easing) {
      Object.entries(tokens.motion.easing).forEach(([key, value]) => {
        root.style.setProperty(\`--easing-\${key}\`, value);
      });
    }
  }
}
`;
}

// Main module functions
module.exports = {
  formatTokensForFramer,
  formatComponentsForFramer,
  generateCSSVariables,
  generateDesignSystemProvider,
  generateAPIClient
};