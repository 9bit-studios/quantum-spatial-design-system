# Quantum-Spatial Design System: Framer API Integration

This folder contains scripts to integrate the Quantum-Spatial Design System with Framer. The new implementation uses a Cloudflare Worker API to serve design tokens, components, and assets with automatic M4 optimization.

## Prerequisites

Before using these scripts, make sure you have:

1. Node.js installed (v18 or newer)
2. The following npm packages installed:
   - `node-fetch`
   - `dotenv`

Install the required packages:

```bash
npm install node-fetch dotenv
```

## Scripts

### 1. Framer Quantum-Spatial Sync

The new `framer-quantum-spatial-sync.js` script connects to the Cloudflare Worker API to sync the complete design system to your Framer project:

```bash
node scripts/framer-quantum-spatial-sync.js --framer-project=/path/to/framer-project
```

This script:
- Retrieves design tokens for all quantum states
- Fetches component definitions for all core components
- Creates a properly structured design system folder in your Framer project
- Generates documentation and usage instructions

#### Options

- `--framer-project`: Path to your Framer project (required)
- `--state`: Default quantum state (heritage, transitional, quantum) (default: transitional)
- `--api-url`: Custom API URL (default: https://api.9bitstudios.io)

### 2. Legacy Token Extraction (Deprecated)

The original `extract-design-tokens.js` script is still available but deprecated in favor of the API-based approach:

```bash
node scripts/extract-design-tokens.js
```

### 3. Framer Sync Shell Script

For quick synchronization, you can use the shell script:

```bash
./scripts/framer-sync.sh /path/to/framer-project transitional
```

## Design System Structure

The Quantum-Spatial Design System is served through our Cloudflare Worker API with a comprehensive token and component structure.

### API Endpoints

The following endpoints are available for integration:

```
GET /design-system/tokens?state=[heritage|transitional|quantum]
GET /quantum-pixel?state=[heritage|transitional|quantum|superposition]
GET /dimensional-grid?state=[heritage|transitional|quantum]
GET /components?type=[all|pixels|grids]
GET /m4-optimization
```

### Framer Project Structure

When you run the sync script, it creates the following structure in your Framer project:

```
/design-system
  /tokens
    - heritage-tokens.json
    - transitional-tokens.json
    - quantum-tokens.json
    - [state]-framer-tokens.json
  /components
    - quantum-pixel-heritage.json
    - quantum-pixel-transitional.json
    - quantum-pixel-quantum.json
    - quantum-pixel-superposition.json
    - dimensional-grid-heritage.json
    - dimensional-grid-transitional.json
    - dimensional-grid-quantum.json
    - index.json
  /assets
    - [state assets]
  - README.md
```

### Token Structure

The tokens are organized by state and category:

#### Colors

```json
"colors": {
  "primary": "#131A36", // Deep Space Indigo
  "secondary": "#331F4A", // Dimensional Eggplant
  "accent": "#5AC8FA", // Subtle Cyan
  "background": "#FFFFFF",
  "text": "#1A1A1A",
  ...
}
```

#### Typography

```json
"typography": {
  "fontFamily": "SF Pro Text, Inter, system-ui, sans-serif",
  "baseSize": "16px",
  "scale": 1.25,
  "headings": {
    "h1": {
      "fontSize": "2.986rem",
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    ...
  },
  ...
}
```

#### Spacing

```json
"spacing": {
  "unit": "8px",
  "grid": 8,
  "scale": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    ...
  }
}
```

#### Grid System

```json
"gridSystem": {
  "columns": 12,
  "gutter": "16px",
  "margin": "16px",
  "type": "orthogonal",
  "responsive": {
    "sm": "576px",
    "md": "768px",
    ...
  }
}
```

#### Material States

```json
"material": {
  "states": {
    "default": {
      "reflectivity": 0.3,
      "roughness": 0.5,
      "metalness": 0.2
    },
    "elevated": {
      "reflectivity": 0.4,
      "roughness": 0.4,
      "metalness": 0.3
    },
    ...
  }
}
```

### M4 Optimization

The design system includes specific optimizations for Apple Silicon M4 devices:

```json
"m4": {
  "optimizations": {
    "useNeuralEngine": true,
    "useMetal": true,
    "useProMotion": true,
    "memoryOptimization": "balanced",
    "renderQuality": "high"
  },
  "rendering": {
    "preferredAPI": "metal",
    "fallbackAPI": "webgl",
    "antialiasing": true,
    "pixelRatio": "device"
  }
}
```

## Core Components

### 1. QuantumPixel

The core visual building block of the design system, supporting four quantum states:

```jsx
<QuantumPixel
  state="transitional" // heritage, transitional, quantum, superposition
  size="md" // xs, sm, md, lg, xl
  interactive={true}
  glowIntensity={4}
  animationDuration={4}
/>
```

### 2. DimensionalGrid

The spatial organization system that provides layout, scale, and perspective:

```jsx
<DimensionalGrid
  type="background" // background, interface, feature
  density="medium" // fine, medium, coarse
  state="transitional" // heritage, transitional, quantum
  enableFalloff={true}
  enablePerspectiveShift={true}
  perspectiveIntensity={0.05}
  enableSecondaryGrid={true}
/>
```

## Using in Framer

### 1. Import Tokens

1. In Framer, open your project
2. Go to the Design tab
3. Click on "Variables" (under Design tokens)
4. Click "Import" and select `/design-system/tokens/[state]-framer-tokens.json`

### 2. Add Components

1. In Framer, go to Assets > Components
2. Click "New" > "From JSON"
3. Select a component file from `/design-system/components/`
4. The component will appear in your components panel

### 3. Using in Design

Once imported, you can:

- Use design tokens for colors, typography, and spacing
- Drag components into your design
- Configure component properties in the properties panel

## Automated Workflow

For CI/CD integration:

1. Add the script to your deployment pipeline:

```yaml
# GitHub Action Example
name: Sync Design System to Framer

on:
  push:
    branches: [main]
    paths:
      - 'M4-Optimized Quantum-Spatial Pixel Design System Acceleration/**'
      - 'cloudflare-worker/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install node-fetch dotenv
      - name: Sync to Framer
        run: node scripts/framer-quantum-spatial-sync.js --framer-project=./framer
        env:
          FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN=: ${{ secrets.FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN= }}
```

2. Configure the Cloudflare Worker webhook for automatic updates:

```js
// In your worker.js
addEventListener('fetch', event => {
  // Check for webhook requests
  if (event.request.url.includes('/webhook/framer-sync')) {
    // Trigger Framer sync
    return handleFramerSyncWebhook(event.request);
  }

  // Handle other requests
  event.respondWith(handleRequest(event.request));
});
```

## Troubleshooting

### API Connection Issues

If you can't connect to the API:

1. Check that the API URL is correct (default: https://api.9bitstudios.io/)
2. Verify your network connection
3. Check if the Cloudflare Worker is deployed and accessible

### Component Import Failures

If components don't import correctly:

1. Verify the component JSON structure
2. Make sure the component dependencies are included
3. Check for any console errors in Framer

### M4 Optimization Issues

If M4 optimizations aren't working:

1. Verify you're testing on an Apple Silicon device
2. Check that the browser supports Metal API
3. Look for any errors in the browser console

## Resources

- [Cloudflare Worker API Documentation](/cloudflare-worker/README.md)
- [Quantum-Spatial Design System Implementation Guide](/QUANTUM_SPATIAL_FRAMER_IMPLEMENTATION_GUIDE.md)
- [Quantum-Spatial Design System Status](/QUANTUM_SPATIAL_FRAMER_IMPLEMENTATION_STATUS.md)
- [M4 Optimization Technical Overview](/M4-Optimized%20Quantum-Spatial%20Pixel%20Design%20System%20Acceleration/M4-Optimized%20Core%20Quantum-Spatial%20Component%20Creation%20and%20Iteration%20Guide.md)

---

*© 2025 9Bit Studios. All rights reserved.*