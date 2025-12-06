# Quantum-Spatial Design System: Framer Sync Instructions

**Date:** May 24, 2025  
**Author:** 9Bit Studios

## Overview

This document provides instructions for syncing the Quantum-Spatial Design System with Framer projects. The integration process has been simplified and standardized to work reliably across all environments.

## Quick Start

To sync the design system with your Framer project, run:

```bash
# From the root directory
node scripts/framer-quantum-spatial-sync.js --framer-project=./path/to/framer/project --state=quantum
```

This will:
1. Fetch design tokens from the Cloudflare Worker API
2. Copy the core components to your project
3. Generate a README file with usage instructions

## Available Parameters

- `--framer-project`: Path to your Framer project (required)
- `--state`: Design state to use (heritage, transitional, quantum, superposition)

## Design States

- **Heritage**: Flat orthogonal design system (2D)
- **Transitional**: Emerging dimensional design system (2.5D)
- **Quantum**: Fully dimensional spatial design system (3D)
- **Superposition**: M4-optimized quantum state uncertainty design system (3D+)

## Directory Structure

The script will create the following structure in your Framer project:

```
your-framer-project/
├── design-system/
│   ├── components/
│   │   ├── DesignSystemProvider.tsx
│   │   ├── QuantumPixel.tsx
│   │   ├── DimensionalGrid.tsx
│   │   ├── PixelViewer.tsx
│   │   └── SamplePage.tsx
│   ├── tokens/
│   │   └── [state]-framer-tokens.json
│   ├── assets/
│   └── README.md
```

## Using the Design System in Framer

```jsx
// Import the components
import { DesignSystemProvider } from './design-system/components/DesignSystemProvider';
import { QuantumPixel } from './design-system/components/QuantumPixel';

// Use in your Framer project
export default function App() {
  return (
    <DesignSystemProvider initialState="quantum" detectDevice={true}>
      <div>
        <h1>Quantum-Spatial Design System</h1>
        <QuantumPixel size={64} interactive={true} />
      </div>
    </DesignSystemProvider>
  );
}
```

## Troubleshooting

If you encounter issues with the sync process:

1. **Check API Connectivity**: Ensure you can access the API endpoint at `https://design-system-staging.9bitstudios.io`
2. **Manual Component Copy**: If component fetching fails, the script will automatically fall back to copying local component files
3. **Check Component Files**: Ensure the component files exist in the `framer-components` directory

## Important Notes

- The API endpoint has been updated to `https://design-system-staging.9bitstudios.io`
- Older scripts pointing to `api.9bitstudios.io` have been archived
- The master configuration is in `scripts/framer-sync-config.js`

For more detailed information, refer to `QUANTUM_SPATIAL_FRAMER_IMPLEMENTATION_GUIDE.md`.