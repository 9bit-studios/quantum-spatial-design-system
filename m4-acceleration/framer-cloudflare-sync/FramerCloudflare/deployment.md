# Quantum-Spatial Design System - Deployment Guide

This guide provides instructions for deploying and using the Framer-Cloudflare integration demo.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deploying the Cloudflare Worker](#deploying-the-cloudflare-worker)
3. [Running the Demo Locally](#running-the-demo-locally)
4. [Integrating with Framer](#integrating-with-framer)
5. [Testing the Integration](#testing-the-integration)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or later)
- npm or yarn
- Cloudflare account (for worker deployment)
- Framer account (for Framer integration)
- Wrangler CLI (`npm install -g wrangler`)

## Deploying the Cloudflare Worker

1. Navigate to the cloudflare-worker directory:
   ```bash
   cd cloudflare-worker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

4. Deploy to staging environment:
   ```bash
   wrangler deploy --env staging
   ```

5. Deploy to production:
   ```bash
   wrangler deploy --env production
   ```

6. (Optional) Configure custom domains in the Cloudflare dashboard.

## Running the Demo Locally

1. Open the demo HTML file in your browser:
   ```bash
   open framer-cloudflare-demo.html
   ```

2. Test different design states by clicking on the state buttons.

3. Inspect the device detection results at the bottom of the page.

4. Run the worker locally for testing the API:
   ```bash
   cd cloudflare-worker
   wrangler dev
   ```

## Integrating with Framer

### Option 1: Manual Import

1. Generate the design system files:
   ```bash
   node scripts/deploy-to-framer.js --dry-run
   ```

2. In Framer Desktop app:
   - Go to your project
   - Navigate to the code panel
   - Import the generated files from the `framer-output` directory

### Option 2: Direct API Integration

1. In your Framer project, create a new file called `QuantumSpatialProvider.tsx`.

2. Add the following code:
   ```jsx
   import * as React from "react";
   import { useEffect, useState, createContext, useContext } from "react";

   // Create context for design system
   const QuantumSpatialContext = createContext(null);

   // Provider component
   export function QuantumSpatialProvider({
     children,
     autoDetect = true,
     initialState = "quantum",
     workerUrl = "https://design-system.9bitstudios.io",
     fallbackUrl = "https://quantum-spatial-design-system.9bitstudios.workers.dev"
   }) {
     // State for design tokens and system state
     const [tokens, setTokens] = useState({});
     const [designState, setDesignState] = useState(initialState);
     const [deviceInfo, setDeviceInfo] = useState({
       isM4Detected: false,
       platform: ""
     });
     const [isLoading, setIsLoading] = useState(true);

     // Detect device capabilities
     useEffect(() => {
       if (autoDetect) {
         detectDeviceCapabilities().then(info => {
           setDeviceInfo(info);
           
           // Auto-select recommended state for M4 devices
           if (info.isM4Detected) {
             setDesignState(info.recommendedState);
           }
         });
       }
     }, [autoDetect]);

     // Fetch design tokens when state changes
     useEffect(() => {
       fetchDesignTokens(designState, workerUrl, fallbackUrl)
         .then(tokens => {
           setTokens(tokens);
           setIsLoading(false);
         })
         .catch(error => {
           console.error("Error fetching design tokens:", error);
           setIsLoading(false);
         });
     }, [designState, workerUrl, fallbackUrl]);

     // Context value
     const contextValue = {
       tokens,
       designState,
       setDesignState,
       deviceInfo,
       isLoading
     };

     return (
       <QuantumSpatialContext.Provider value={contextValue}>
         {children}
       </QuantumSpatialContext.Provider>
     );
   }

   // Hook for accessing design system
   export function useQuantumSpatial() {
     const context = useContext(QuantumSpatialContext);
     if (!context) {
       throw new Error("useQuantumSpatial must be used within a QuantumSpatialProvider");
     }
     return context;
   }

   // Detect device capabilities
   async function detectDeviceCapabilities() {
     // Basic detection for demo purposes
     const isMac = navigator.userAgent.includes("Mac");
     const isAppleSilicon = isMac && !navigator.userAgent.includes("Intel");
     const cpuCores = navigator.hardwareConcurrency || 1;
     
     // Simple heuristic for M4 detection (not reliable in production)
     const isM4 = isAppleSilicon && cpuCores >= 8;
     
     return {
       platform: navigator.platform,
       isMac,
       isAppleSilicon,
       cpuCores,
       isM4Detected: isM4,
       isM4Pro: isM4 && cpuCores >= 10,
       isM4Max: isM4 && cpuCores >= 12,
       isM4Ultra: isM4 && cpuCores >= 16,
       recommendedState: isM4 ? "superposition" : "quantum",
       renderQuality: isM4 ? "high" : "standard"
     };
   }

   // Fetch design tokens
   async function fetchDesignTokens(state, primaryUrl, fallbackUrl) {
     try {
       // Try primary worker URL
       const response = await fetch(`${primaryUrl}/design-system/tokens?state=${state}`);
       
       if (!response.ok) {
         throw new Error(`Failed to fetch tokens: ${response.status}`);
       }
       
       return await response.json();
     } catch (error) {
       console.warn(`Error fetching tokens from primary URL: ${error.message}`);
       
       try {
         // Try fallback URL
         const fallbackResponse = await fetch(`${fallbackUrl}/tokens/${state}`);
         
         if (!fallbackResponse.ok) {
           throw new Error(`Fallback failed: ${fallbackResponse.status}`);
         }
         
         return await fallbackResponse.json();
       } catch (fallbackError) {
         console.error(`Error fetching tokens from fallback: ${fallbackError.message}`);
         
         // Return default tokens
         return getFallbackTokens(state);
       }
     }
   }

   // Fallback tokens
   function getFallbackTokens(state) {
     // Basic token set for fallback
     const defaultTokens = {
       colors: {
         primary: "#6A3093",
         secondary: "#BF4080",
         accent: "#5AC8FA",
         surface: "#0A0621",
         text: "#FFFFFF",
         background: "#0D0D15"
       },
       spacing: {
         xs: "4px",
         sm: "8px",
         md: "16px",
         lg: "24px",
         xl: "32px"
       },
       typography: {
         fontFamily: "SF Pro Display, system-ui, sans-serif",
         sizes: {
           sm: "14px",
           md: "16px",
           lg: "18px",
           xl: "24px"
         }
       }
     };
     
     return defaultTokens;
   }
   ```

3. Use the provider in your Framer project:
   ```jsx
   import { QuantumSpatialProvider, useQuantumSpatial } from "./QuantumSpatialProvider";

   export function App() {
     return (
       <QuantumSpatialProvider>
         <YourContent />
       </QuantumSpatialProvider>
     );
   }

   function YourContent() {
     const { tokens, designState, setDesignState } = useQuantumSpatial();
     
     return (
       <div style={{ backgroundColor: tokens.colors?.background }}>
         <h1 style={{ color: tokens.colors?.accent }}>
           Current state: {designState}
         </h1>
         <button onClick={() => setDesignState("superposition")}>
           Switch to Superposition
         </button>
       </div>
     );
   }
   ```

## Testing the Integration

1. Verify API endpoints are working:
   - Health check: `https://design-system.9bitstudios.io/health`
   - Design tokens: `https://design-system.9bitstudios.io/design-system/tokens?state=quantum`
   - Components: `https://design-system.9bitstudios.io/design-system/components?state=quantum`

2. Test the integration in Framer:
   - Create a simple component that uses the design system
   - Switch between different design states
   - Verify that M4 detection works correctly

3. Test all fallback mechanisms:
   - Disable the worker to verify client-side fallbacks
   - Test with different design states
   - Verify that offline mode works correctly

## Troubleshooting

### Common Issues

#### Worker Connection Failures

If you're having trouble connecting to the Cloudflare Worker:

1. Check if the worker is online using the health endpoint
2. Verify your API key if authentication is enabled
3. Check for CORS issues in your browser console
4. Try using the fallback URL

#### Component Styling Issues

If components aren't styled correctly:

1. Make sure the QuantumSpatialProvider is wrapping your application
2. Check that tokens are loading properly using console.log
3. Verify you're using the right component props
4. Try switching design states to see if the issue persists

#### M4 Detection Issues

If M4 detection isn't working correctly:

1. Remember that browser-based M4 detection is not 100% reliable
2. You can manually select the Superposition state for testing
3. Check deviceInfo in the console to see what was detected

### Getting Support

If you need additional help:

1. Check the documentation in this repository
2. Submit an issue on GitHub
3. Contact 9Bit Studios support at support@9bitstudios.io

---

**© 2025 9Bit Studios. All rights reserved.**