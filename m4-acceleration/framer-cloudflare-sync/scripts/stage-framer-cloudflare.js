/**
 * Quantum-Spatial Design System - Framer + Cloudflare Staging Script
 * 
 * This script stages the layout components and design tokens in Framer
 * with Cloudflare worker integration.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

// Configuration
const config = {
  // Source paths
  sourcePaths: {
    quantumProject: path.resolve(__dirname, '../quantum-framer-project'),
    designTokens: path.resolve(__dirname, '../framer-project-test/design-system/tokens'),
    components: path.resolve(__dirname, '../framer-project-test/design-system/components')
  },
  
  // Output paths
  outputPaths: {
    framerOutput: path.resolve(__dirname, '../framer-cloudflare-output'),
    framerCode: path.resolve(__dirname, '../framer-cloudflare-output/code'),
    framerAssets: path.resolve(__dirname, '../framer-cloudflare-output/assets')
  },
  
  // Cloudflare worker
  cloudflare: {
    endpoint: 'https://design-system-staging.9bitstudios.io',
    states: ['heritage', 'transitional', 'quantum', 'superposition']
  }
};

// Ensure output directories exist
function ensureDirectoriesExist() {
  Object.values(config.outputPaths).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

// Fetch design tokens from Cloudflare worker
async function fetchDesignTokens(state = 'quantum') {
  return new Promise((resolve, reject) => {
    const url = `${config.cloudflare.endpoint}/design-system/tokens?state=${state}`;
    console.log(`Fetching ${state} tokens from: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const tokens = JSON.parse(data);
            resolve(tokens);
          } catch (error) {
            reject(new Error(`Failed to parse tokens: ${error.message}`));
          }
        } else {
          reject(new Error(`Failed to fetch tokens: HTTP ${res.statusCode}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

// Copy quantum layout components
function copyLayoutComponents() {
  const layoutFiles = [
    'DashboardLayout.tsx',
    'HeroLayout.tsx',
    'GridLayout.tsx'
  ];
  
  layoutFiles.forEach(file => {
    const sourcePath = path.join(config.sourcePaths.quantumProject, file);
    const targetPath = path.join(config.outputPaths.framerCode, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied layout: ${file}`);
    } else {
      console.error(`Layout file not found: ${sourcePath}`);
    }
  });
}

// Copy core components
function copyCoreComponents() {
  const componentFiles = fs.readdirSync(config.sourcePaths.components)
    .filter(file => file.endsWith('.tsx'));
    
  componentFiles.forEach(file => {
    const sourcePath = path.join(config.sourcePaths.components, file);
    const targetPath = path.join(config.outputPaths.framerCode, file);
    
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied component: ${file}`);
  });
}

// Create the Framer-compatible token file
function createTokenFile(tokens, state) {
  const tokenFile = path.join(config.outputPaths.framerCode, `${state}-tokens.js`);
  
  // Extract color, typography and spacing values
  const colors = {};
  const typography = {};
  const spacing = {};
  const borderRadius = {};
  const shadows = {};
  
  // Process colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        colors[key] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            colors[`${key}${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`] = subValue;
          }
        });
      }
    });
  }
  
  // Process typography
  if (tokens.typography) {
    // Base typography properties
    typography.fontFamily = tokens.typography.fontFamily;
    typography.baseSize = tokens.typography.baseSize;
    typography.scale = tokens.typography.scale;
    
    // Headings
    typography.headings = {};
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        typography.headings[key] = {
          fontSize: value.fontSize,
          fontWeight: value.fontWeight,
          lineHeight: value.lineHeight
        };
      });
    }
    
    // Body text
    typography.body = {};
    if (tokens.typography.body) {
      Object.entries(tokens.typography.body).forEach(([key, value]) => {
        typography.body[key] = {
          fontSize: value.fontSize,
          fontWeight: value.fontWeight,
          lineHeight: value.lineHeight
        };
      });
    }
  }
  
  // Process spacing
  if (tokens.spacing && tokens.spacing.scale) {
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      spacing[key] = value;
    });
  }
  
  // Process border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      borderRadius[key] = value;
    });
  }
  
  // Process shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      shadows[key] = value;
    });
  }
  
  // Create special utility names for Framer
  colors.deepSpaceIndigo = tokens.colors.primary;
  colors.dimensionalEggplant = tokens.colors.secondary;
  colors.subtleCyan = tokens.colors.accent;
  colors.voidBlack = tokens.colors.background?.dark || '#121212';
  colors.pureWhite = tokens.colors.background?.light || '#FFFFFF';
  
  // Generate JavaScript file
  const fileContent = `/**
 * Quantum-Spatial Design System - ${state.charAt(0).toUpperCase() + state.slice(1)} Tokens
 * Generated from Cloudflare Worker: ${config.cloudflare.endpoint}
 */

// Complete token set
export const ${state}Tokens = ${JSON.stringify(tokens, null, 2)};

// Color palette
export const palette = ${JSON.stringify(colors, null, 2)};

// Typography
export const typography = ${JSON.stringify(typography, null, 2)};

// Spacing
export const spacing = ${JSON.stringify(spacing, null, 2)};

// Border radius
export const radius = ${JSON.stringify(borderRadius, null, 2)};

// Shadows
export const shadows = ${JSON.stringify(shadows, null, 2)};

// Design system context
export const designSystem = {
  state: "${state}",
  tokens: ${state}Tokens,
  palette,
  typography,
  spacing,
  radius,
  shadows
};

export default designSystem;
`;

  fs.writeFileSync(tokenFile, fileContent);
  console.log(`Generated token file: ${state}-tokens.js`);
}

// Create the CloudflareProvider component
function createCloudflareProvider() {
  const providerFile = path.join(config.outputPaths.framerCode, 'CloudflareProvider.tsx');
  
  const fileContent = `/**
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
  workerURL = "${config.cloudflare.endpoint}"
}) {
  const [state, setState] = useState(initialState);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceCapabilities, setDeviceCapabilities] = useState(null);
  
  // Detect device capabilities
  useEffect(() => {
    if (detectDevice) {
      fetch(\`\${workerURL}/m4-optimization\`)
        .then(response => {
          if (!response.ok) {
            throw new Error(\`HTTP error: \${response.status}\`);
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
    
    fetch(\`\${workerURL}/design-system/tokens?state=\${state}\`)
      .then(response => {
        if (!response.ok) {
          throw new Error(\`HTTP error: \${response.status}\`);
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
          import(\`./$\{state}-tokens.js\`)
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
    
    // Typography
    if (tokens.typography) {
      css += \`  --font-family: \${tokens.typography.fontFamily};\\`;
      
      // Headings
      if (tokens.typography.headings) {
        Object.entries(tokens.typography.headings).forEach(([key, value]) => {
          css += \`  --font-size-\${key}: \${value.fontSize};\\`;
          css += \`  --font-weight-\${key}: \${value.fontWeight};\\`;
          css += \`  --line-height-\${key}: \${value.lineHeight};\\`;
        });
      }
      
      // Body text
      if (tokens.typography.body) {
        Object.entries(tokens.typography.body).forEach(([key, value]) => {
          css += \`  --font-size-body-\${key}: \${value.fontSize};\\`;
          css += \`  --font-weight-body-\${key}: \${value.fontWeight};\\`;
          css += \`  --line-height-body-\${key}: \${value.lineHeight};\\`;
        });
      }
    }
    
    // Spacing
    if (tokens.spacing && tokens.spacing.scale) {
      Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
        css += \`  --spacing-\${key}: \${value};\\`;
      });
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
      // Duration
      if (tokens.motion.duration) {
        Object.entries(tokens.motion.duration).forEach(([key, value]) => {
          css += \`  --duration-\${key}: \${value};\\`;
        });
      }
      
      // Easing
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
}`;

  fs.writeFileSync(providerFile, fileContent);
  console.log('Generated CloudflareProvider.tsx');
}

// Create the CloudflareDemo component
function createCloudflareDemo() {
  const demoFile = path.join(config.outputPaths.framerCode, 'CloudflareDemo.tsx');
  
  const fileContent = `/**
 * Quantum-Spatial Design System - Cloudflare Demo
 * Demo component showcasing the Cloudflare integration
 */
import * as React from "react";
import { Frame, Stack, addPropertyControls, ControlType } from "framer";
import { CloudflareProvider, useCloudflareDesignSystem } from "./CloudflareProvider";
import DashboardLayout from "./DashboardLayout";
import HeroLayout from "./HeroLayout";
import GridLayout from "./GridLayout";

export default function CloudflareDemo(props) {
  const {
    layout = "dashboard",
    state = "quantum",
    title = "Cloudflare Integration",
  } = props;
  
  return (
    <CloudflareProvider initialState={state} detectDevice={true}>
      <CloudflareDemoContent layout={layout} title={title} />
    </CloudflareProvider>
  );
}

// Content component that uses the design system context
function CloudflareDemoContent({ layout, title }) {
  const { tokens, state, setState, isLoading, deviceCapabilities } = useCloudflareDesignSystem();
  
  if (isLoading) {
    return (
      <Frame
        width="100%"
        height="100%"
        background="var(--color-background, #121212)"
        color="var(--color-text-light, white)"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-family, SF Pro Display, system-ui, sans-serif)",
          fontSize: "1.5rem"
        }}
      >
        Loading design system...
      </Frame>
    );
  }
  
  // Render different layouts
  switch(layout) {
    case "hero":
      return (
        <HeroLayout 
          title={title} 
          subtitle="Powered by Cloudflare Worker API"
          ctaText="Explore States"
          onCTAClick={() => {
            const states = ["heritage", "transitional", "quantum", "superposition"];
            const currentIndex = states.indexOf(state);
            const nextIndex = (currentIndex + 1) % states.length;
            setState(states[nextIndex]);
          }}
        >
          <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
        </HeroLayout>
      );
      
    case "grid":
      return (
        <GridLayout 
          title={title}
          subtitle="Design States Showcase"
          columns={2}
          items={[
            { title: "Heritage", description: "Flat orthogonal design system" },
            { title: "Transitional", description: "Emerging dimensional design system" },
            { title: "Quantum", description: "Fully dimensional spatial design system" },
            { title: "Superposition", description: "M4-optimized quantum uncertainty" }
          ]}
          onItemClick={(index) => {
            const states = ["heritage", "transitional", "quantum", "superposition"];
            if (index < states.length) {
              setState(states[index]);
            }
          }}
        >
          <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
        </GridLayout>
      );
      
    default: // dashboard
      return (
        <DashboardLayout title={title}>
          <Stack direction="vertical" gap={20} width="100%">
            <h2 style={{ fontFamily: "var(--font-family)" }}>
              Cloudflare Integration Demo
            </h2>
            
            <Stack direction="horizontal" gap={10} wrap="wrap">
              <StateButton
                current={state}
                target="heritage"
                onClick={() => setState("heritage")}
              />
              <StateButton
                current={state}
                target="transitional"
                onClick={() => setState("transitional")}
              />
              <StateButton
                current={state}
                target="quantum"
                onClick={() => setState("quantum")}
              />
              <StateButton
                current={state}
                target="superposition"
                onClick={() => setState("superposition")}
              />
            </Stack>
            
            <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
          </Stack>
        </DashboardLayout>
      );
  }
}

// State button component
function StateButton({ current, target, onClick }) {
  const isActive = current === target;
  
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? "var(--color-primary, #6A3093)" : "transparent",
        color: isActive ? "white" : "var(--color-accent, #5AC8FA)",
        border: "1px solid var(--color-accent, #5AC8FA)",
        borderRadius: "var(--radius-small, 8px)",
        padding: "8px 16px",
        fontFamily: "var(--font-family)",
        cursor: "pointer",
        textTransform: "capitalize"
      }}
    >
      {target}
    </button>
  );
}

// Device info component
function DeviceInfo({ deviceCapabilities, state }) {
  if (!deviceCapabilities) return null;
  
  return (
    <Frame
      background={deviceCapabilities.isM4Compatible ? "#00D26A" : deviceCapabilities.isAppleSilicon ? "#5AC8FA" : "#FFB800"}
      style={{
        padding: "16px",
        borderRadius: "8px",
        marginTop: "20px",
        color: "white",
        fontFamily: "var(--font-family)"
      }}
    >
      <h3 style={{ marginTop: 0 }}>Device Capabilities:</h3>
      <ul style={{ marginBottom: 0 }}>
        <li>M4 Compatible: {deviceCapabilities.isM4Compatible ? "Yes" : "No"}</li>
        <li>Apple Silicon: {deviceCapabilities.isAppleSilicon ? "Yes" : "No"}</li>
        <li>Rendering API: {deviceCapabilities.renderingAPI}</li>
        <li>Current State: {state}</li>
      </ul>
    </Frame>
  );
}

// Add property controls
addPropertyControls(CloudflareDemo, {
  layout: {
    type: ControlType.Enum,
    title: "Layout",
    options: ["dashboard", "hero", "grid"],
    defaultValue: "dashboard"
  },
  state: {
    type: ControlType.Enum,
    title: "Initial State",
    options: ["heritage", "transitional", "quantum", "superposition", "auto"],
    defaultValue: "quantum",
    description: "Set to 'auto' for device-based selection"
  },
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Cloudflare Integration"
  }
});

// Set default size
CloudflareDemo.defaultProps = {
  width: 1200,
  height: 800
};`;

  fs.writeFileSync(demoFile, fileContent);
  console.log('Generated CloudflareDemo.tsx');
}

// Create README file
function createReadme() {
  const readmeFile = path.join(config.outputPaths.framerOutput, 'README.md');
  
  const fileContent = `# Quantum-Spatial Design System: Cloudflare Integration

## Overview

This package provides complete integration between Framer and the Quantum-Spatial Design System via Cloudflare Worker. It features:

- Live design token fetching from the Cloudflare Worker API
- Device capability detection for M4 optimization
- Ready-to-use layout components with Cloudflare integration
- Demo component showcasing the integration

## Quick Setup in Framer

1. **Import files to your Framer project**
   - Copy all files from the \`code\` directory to your Framer project

2. **Install dependencies in Framer Package Manager**
   - framer-motion@^10.0.0

3. **Add CloudflareDemo component to your canvas**

## Components

### CloudflareProvider

The CloudflareProvider connects to the Cloudflare Worker to fetch design tokens:

\`\`\`jsx
<CloudflareProvider
  initialState="quantum"  // heritage, transitional, quantum, superposition, auto
  detectDevice={true}     // Automatically detect device capabilities
>
  {children}
</CloudflareProvider>
\`\`\`

### Layout Components

Three layout components ready to use with Cloudflare integration:

- **DashboardLayout**: Admin dashboard with sidebar
- **HeroLayout**: Full-screen hero section
- **GridLayout**: Responsive grid for collections

### Token Files

Pre-generated token files for offline use:

- \`heritage-tokens.js\`
- \`transitional-tokens.js\`
- \`quantum-tokens.js\`
- \`superposition-tokens.js\`

## Using Cloudflare Integration

### Accessing Design Tokens

\`\`\`jsx
import { useCloudflareDesignSystem } from "./CloudflareProvider";

function MyComponent() {
  const { tokens, state, setState } = useCloudflareDesignSystem();
  
  return (
    <div>
      <h1 style={{ color: tokens.colors.primary }}>
        My Heading
      </h1>
      <button onClick={() => setState("quantum")}>
        Switch to Quantum
      </button>
    </div>
  );
}
\`\`\`

### CSS Variables

The provider automatically sets CSS variables that you can use:

\`\`\`jsx
<div style={{ 
  color: "var(--color-text)",
  background: "var(--color-background)",
  padding: "var(--spacing-md)"
}}>
  Content
</div>
\`\`\`

## Troubleshooting

If the Cloudflare Worker is unreachable, the system will automatically fall back to local token files.

## Cloudflare Worker Endpoints

- Design Tokens: \`${config.cloudflare.endpoint}/design-system/tokens?state=[state]\`
- M4 Optimization: \`${config.cloudflare.endpoint}/m4-optimization\`
- Components: \`${config.cloudflare.endpoint}/framer-components\`
`;

  fs.writeFileSync(readmeFile, fileContent);
  console.log('Generated README.md');
}

// Main function
async function main() {
  try {
    console.log('🦄 Staging Quantum-Spatial Design System in Framer with Cloudflare Worker...');
    
    // Create directories
    ensureDirectoriesExist();
    
    // Copy layout components
    console.log('📂 Copying layout components...');
    copyLayoutComponents();
    
    // Copy core components
    console.log('📂 Copying core components...');
    copyCoreComponents();
    
    // Fetch and generate token files for all states
    console.log('🔄 Fetching design tokens from Cloudflare worker...');
    
    for (const state of config.cloudflare.states) {
      try {
        const tokens = await fetchDesignTokens(state);
        createTokenFile(tokens, state);
      } catch (error) {
        console.error(`Error fetching ${state} tokens: ${error.message}`);
        console.log(`Falling back to local tokens for ${state}...`);
        
        // Copy local tokens as fallback
        const localTokenPath = path.join(config.sourcePaths.designTokens, `${state}-framer.json`);
        if (fs.existsSync(localTokenPath)) {
          const localTokens = JSON.parse(fs.readFileSync(localTokenPath, 'utf8'));
          createTokenFile(localTokens, state);
        }
      }
    }
    
    // Create CloudflareProvider component
    console.log('🔨 Creating CloudflareProvider...');
    createCloudflareProvider();
    
    // Create CloudflareDemo component
    console.log('🔨 Creating CloudflareDemo...');
    createCloudflareDemo();
    
    // Create README
    console.log('📝 Creating documentation...');
    createReadme();
    
    console.log('✅ Staging complete!');
    console.log(`📁 Files are ready in: ${config.outputPaths.framerOutput}`);
    console.log('Import these files into your Framer project to use the Cloudflare integration.');
  } catch (error) {
    console.error('Error during staging:', error);
  }
}

// Run the main function
main();