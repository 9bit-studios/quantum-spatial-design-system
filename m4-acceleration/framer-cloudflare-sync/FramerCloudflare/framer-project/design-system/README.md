# Quantum-Spatial Design System for Framer

## Overview

This directory contains the 9Bit Studios Quantum-Spatial Design System optimized for Framer integration. The design system is in the "quantum" state, featuring:

- Design tokens for colors, typography, spacing, and shadows
- Quantum-Spatial Pixel components in all quantum states
- Dimensional Grid components with multiple types and densities
- M4 optimizations for Apple Silicon devices

## Directory Structure

- `/tokens`: Design tokens in Framer-compatible format
- `/components`: Component definitions ready for Framer import
- `/assets`: Design system assets and images

## Usage in Framer

### Importing Tokens

1. In Framer, go to the Design tab
2. Click on "Design System"
3. Select "Import"
4. Choose the file: `tokens/quantum-framer-tokens.json`

### Using Components

To use the Quantum-Spatial components:

1. Import the specific component JSON into your Framer project
2. Create a code component in Framer
3. Copy the implementation from the JSON file
4. Configure using the properties defined in the component

### Example: Using QuantumPixel

```jsx
import * as React from 'react'

export default function QuantumPixel(props) {
  const { 
    state = "quantum",
    size = "md", 
    interactive = false,
    glowIntensity = 4
  } = props;

  // Implementation code here...
  
  return (
    <svg 
      width={pixelSize} 
      height={pixelSize} 
      viewBox={`0 0 ${pixelSize} ${pixelSize}`} 
      className={`quantum-pixel quantum-pixel-${state}`}
    >
      {/* Component implementation */}
    </svg>
  )
}
```

## M4 Optimization

The components will automatically detect Apple Silicon devices and apply optimizations for the M4 Neural Engine and Metal GPU.

## Syncing Updates

Run the sync script to fetch the latest version:

```
node framer-quantum-spatial-sync.js --framer-project=./framer-project --state=quantum
```

## Learn More

For more information, visit: [9Bit Studios Quantum-Spatial Design System](https://9bitstudios.com/design-system)
