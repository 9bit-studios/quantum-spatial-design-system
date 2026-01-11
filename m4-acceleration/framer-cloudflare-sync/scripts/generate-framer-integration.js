/**
 * Quantum-Spatial Design System - Framer Integration Generator
 * This script generates the necessary files for integrating with Framer
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  workerUrl: 'https://design-system-staging.9bitstudios.io',
  outputDir: path.resolve(__dirname, '../framer-output-production'),
  states: ['heritage', 'transitional', 'quantum', 'superposition']
};

// Create output directory if it doesn't exist
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Fetch design tokens for all states
async function fetchDesignTokens(state) {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.workerUrl}/design-system/tokens?state=${state}`;
    console.log(`Fetching tokens for ${state} state from: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const tokens = JSON.parse(data);
          resolve(tokens);
        } catch (error) {
          reject(new Error(`Failed to parse tokens: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch tokens: ${error.message}`));
    });
  });
}

// Generate DesignSystemProvider component
function generateDesignSystemProvider() {
  const providerCode = `/**
 * Quantum-Spatial Design System Provider for Framer
 * Generated from Cloudflare Worker: ${CONFIG.workerUrl}
 */
import * as React from 'react';
import { useEffect, useState, createContext, useContext } from 'react';

// Create context for design system
const DesignSystemContext = createContext({
  state: 'transitional',
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
  initialState = 'transitional',
  detectDevice = true,
  workerURL = '${CONFIG.workerUrl}'
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
          
          // Set optimal state based on device if initialState is 'auto'
          if (initialState === 'auto') {
            if (data.isM4Compatible) {
              setState('superposition');
            } else if (data.isAppleSilicon) {
              setState('quantum');
            } else {
              setState('transitional');
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
  
  // Generate CSS variables from tokens
  const generateCSSVariables = (tokens) => {
    let css = ':root {\';
    
    // Colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          css += \`  --color-\${key}: \${value};\\`;
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              css += \`  --color-\${key}-\${subKey}: \${subValue};\\`;
            }
          });
        }
      });
    }
    
    // Spacing
    if (tokens.spacing && tokens.spacing.scale) {
      Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
        css += \`  --spacing-\${key}: \${value};\\`;
      });
    }
    
    // Typography
    if (tokens.typography) {
      css += \`  --font-family: \${tokens.typography.fontFamily};\\`;
      
      if (tokens.typography.headings) {
        Object.entries(tokens.typography.headings).forEach(([key, value]) => {
          css += \`  --font-size-\${key}: \${value.fontSize};\\`;
          css += \`  --font-weight-\${key}: \${value.fontWeight};\\`;
          css += \`  --line-height-\${key}: \${value.lineHeight};\\`;
        });
      }
      
      if (tokens.typography.body) {
        Object.entries(tokens.typography.body).forEach(([key, value]) => {
          css += \`  --font-size-body-\${key}: \${value.fontSize};\\`;
          css += \`  --font-weight-body-\${key}: \${value.fontWeight};\\`;
          css += \`  --line-height-body-\${key}: \${value.lineHeight};\\`;
        });
      }
    }
    
    // Border radius
    if (tokens.borderRadius) {
      Object.entries(tokens.borderRadius).forEach(([key, value]) => {
        css += \`  --radius-\${key}: \${value};\\`;
      });
    }
    
    // Shadows
    if (tokens.shadows) {
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        css += \`  --shadow-\${key}: \${value};\\`;
      });
    }
    
    // Motion
    if (tokens.motion) {
      if (tokens.motion.duration) {
        Object.entries(tokens.motion.duration).forEach(([key, value]) => {
          css += \`  --duration-\${key}: \${value};\\`;
        });
      }
      
      if (tokens.motion.easing) {
        Object.entries(tokens.motion.easing).forEach(([key, value]) => {
          css += \`  --easing-\${key}: \${value};\\`;
        });
      }
    }
    
    css += '}\';
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
        data-device-m4={deviceCapabilities?.isM4Compatible ? 'true' : 'false'}
        data-device-apple-silicon={deviceCapabilities?.isAppleSilicon ? 'true' : 'false'}
        style={{ width: '100%', height: '100%' }}
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
      padding: 'var(--spacing-lg)',
      fontFamily: 'var(--font-family)',
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-background)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: 'var(--font-size-h1)',
        fontWeight: 'var(--font-weight-h1)',
        lineHeight: 'var(--line-height-h1)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        Quantum-Spatial Design System
      </h1>
      
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <button 
          onClick={() => setState('heritage')}
          style={{
            backgroundColor: state === 'heritage' ? 'var(--color-primary)' : 'transparent',
            color: state === 'heritage' ? '#fff' : 'var(--color-text)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-small)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}
        >
          Heritage
        </button>
        <button 
          onClick={() => setState('transitional')}
          style={{
            backgroundColor: state === 'transitional' ? 'var(--color-primary)' : 'transparent',
            color: state === 'transitional' ? '#fff' : 'var(--color-text)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-small)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}
        >
          Transitional
        </button>
        <button 
          onClick={() => setState('quantum')}
          style={{
            backgroundColor: state === 'quantum' ? 'var(--color-primary)' : 'transparent',
            color: state === 'quantum' ? '#fff' : 'var(--color-text)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-small)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}
        >
          Quantum
        </button>
        <button 
          onClick={() => setState('superposition')}
          style={{
            backgroundColor: state === 'superposition' ? 'var(--color-primary)' : 'transparent',
            color: state === 'superposition' ? '#fff' : 'var(--color-text)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-small)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}
        >
          Superposition
        </button>
      </div>
      
      {deviceCapabilities && (
        <div style={{
          padding: 'var(--spacing-md)',
          backgroundColor: deviceCapabilities.isM4Compatible ? 'var(--color-success)' : 
                          deviceCapabilities.isAppleSilicon ? 'var(--color-accent)' : 
                          'var(--color-warning)',
          borderRadius: 'var(--radius-small)',
          color: '#fff',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {deviceCapabilities.isM4Compatible ? 
            'M4 Device Detected - Superposition Enabled' : 
            (deviceCapabilities.isAppleSilicon ?
            'Apple Silicon Device - Quantum Optimized' :
            'Standard Device - Transitional Mode')
          }
        </div>
      )}
    </div>
  );
}
`;
  
  return providerCode;
}

// Copy core components from framer-components to output directory
function copyComponents() {
  const componentsDir = path.resolve(__dirname, '../framer-components');
  const targetDir = CONFIG.outputDir;
  
  const components = [
    'DesignSystemProvider.tsx',
    'QuantumPixel.tsx',
    'DimensionalGrid.tsx',
    'PixelViewer.tsx',
    'SamplePage.tsx'
  ];
  
  for (const component of components) {
    try {
      const sourcePath = path.join(componentsDir, component);
      const targetPath = path.join(targetDir, component);
      
      if (fs.existsSync(sourcePath)) {
        const content = fs.readFileSync(sourcePath, 'utf8');
        fs.writeFileSync(targetPath, content);
        console.log(`Copied component: ${component}`);
      } else {
        console.log(`Component file not found: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`Error copying component ${component}:`, error);
    }
  }
}

// Main execution
async function main() {
  try {
    // Generate DesignSystemProvider
    const providerCode = generateDesignSystemProvider();
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'DesignSystemProvider.tsx'),
      providerCode
    );
    console.log('Generated DesignSystemProvider.tsx');
    
    // Fetch and save tokens for all states
    for (const state of CONFIG.states) {
      try {
        const tokens = await fetchDesignTokens(state);
        fs.writeFileSync(
          path.join(CONFIG.outputDir, `${state}-framer.json`),
          JSON.stringify(tokens, null, 2)
        );
        console.log(`Generated ${state}-framer.json`);
      } catch (error) {
        console.error(`Error generating tokens for ${state}:`, error);
      }
    }
    
    // Copy core components
    copyComponents();
    
    console.log('Framer integration files generated successfully!');
  } catch (error) {
    console.error('Error generating integration files:', error);
  }
}

// Run the script
main();