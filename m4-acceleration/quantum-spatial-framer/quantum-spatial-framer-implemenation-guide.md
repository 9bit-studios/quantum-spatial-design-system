# Quantum-Spatial Design System: Framer Implementation Guide

**Date:** May 24, 2025  
**Author:** 9Bit Studios  
**Version:** 1.0.0  
**Status:** Complete & Fully Tested

## Overview

This guide provides comprehensive instructions for implementing the 9Bit Studios Quantum-Spatial Design System in Framer. The design system offers four distinct states—Heritage, Transitional, Quantum, and Superposition—each representing different levels of dimensional complexity and visual sophistication, with special M4 optimizations for Apple Silicon devices.

## Key Components

The implementation consists of the following components:

1. **Design Tokens**: JSON files containing design variables for colors, typography, spacing, etc.
2. **DesignSystemProvider**: React context provider for integrating design tokens
3. **Core Components**:
   - **QuantumPixel**: Base building block with state transitions
   - **DimensionalGrid**: Spatial grid system with multiple densities
   - **PixelViewer**: Interactive visualization component
4. **Sample Implementation**: Example page demonstrating the design system

## Prerequisites

- Framer account (Pro or Team recommended)
- Basic knowledge of React and Framer
- Files from the `framer-output-production` directory

## Implementation Steps

### 1. Set Up Design Tokens

Each design state has its own token set:

- `heritage-framer.json`: Flat orthogonal design (2D)
- `transitional-framer.json`: Emerging dimensional design (2.5D)
- `quantum-framer.json`: Fully dimensional spatial design (3D)
- `superposition-framer.json`: M4-optimized quantum state (3D+)

These token files are automatically fetched by the DesignSystemProvider component.

### 2. Add the DesignSystemProvider

Copy `DesignSystemProvider.tsx` to your Framer project and wrap your components with it:

```jsx
import { DesignSystemProvider } from './DesignSystemProvider';

export default function App() {
  return (
    <DesignSystemProvider initialState="transitional" detectDevice={true}>
      <YourComponent />
    </DesignSystemProvider>
  );
}
```

### 3. Use Core Components

Import and use the core components in your Framer project:

```jsx
import { QuantumPixel, DimensionalGrid, PixelViewer } from './components';
import { useDesignSystem } from './DesignSystemProvider';

function MyComponent() {
  const { state } = useDesignSystem();
  
  return (
    <div>
      <h2>Quantum Pixel</h2>
      <QuantumPixel state={state} size="md" interactive={true} />
      
      <h2>Dimensional Grid</h2>
      <DimensionalGrid state={state} density="medium" />
      
      <h2>Pixel Viewer</h2>
      <PixelViewer 
        initialState={state} 
        columns={8} 
        rows={6} 
        showControls={true} 
      />
    </div>
  );
}
```

### 4. Access Design Tokens in Components

Use the `useDesignSystem` hook to access design tokens:

```jsx
import { useDesignSystem } from './DesignSystemProvider';

function MyComponent() {
  const { tokens, state, setState } = useDesignSystem();
  
  // Tokens are available as tokens.colors, tokens.typography, etc.
  // CSS variables are automatically applied and available as --color-primary, etc.
  
  return (
    <div style={{ 
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-background)',
      padding: 'var(--spacing-md)'
    }}>
      <h1 style={{ 
        fontSize: 'var(--font-size-h1)',
        fontWeight: 'var(--font-weight-h1)'
      }}>
        My Component
      </h1>
      
      <button onClick={() => setState('quantum')}>
        Switch to Quantum State
      </button>
    </div>
  );
}
```

### 5. M4 Device Detection

The DesignSystemProvider automatically detects Apple Silicon devices and enables M4-specific optimizations:

```jsx
// Set to "auto" for automatic state selection based on device capabilities
<DesignSystemProvider initialState="auto" detectDevice={true}>
  <YourComponent />
</DesignSystemProvider>
```

When `initialState` is set to "auto", the provider will:
- Use "superposition" state on M4 devices
- Use "quantum" state on other Apple Silicon devices
- Use "transitional" state on standard devices

## Available Design States

### Heritage (2D)

A traditional flat design system with:
- Orthogonal grid system
- Simple material properties
- Standard color palette
- Traditional typography

### Transitional (2.5D)

An emerging dimensional design system with:
- 2.5D grid with subtle z-axis
- Basic material properties (reflectivity, roughness)
- Enhanced color palette
- Improved typography

### Quantum (3D)

A fully dimensional spatial design system with:
- 3D volumetric grid
- Advanced material properties
- Dynamic energy states
- Spatial typography
- M4 optimization for Apple Silicon

### Superposition (3D+)

An M4-optimized quantum state with:
- Extended volumetric grid (16x32x12)
- Neural-enhanced effects
- Advanced energy states
- HDR rendering
- Neural Engine acceleration

## Customization Options

### Adjust DesignSystemProvider Settings

```jsx
<DesignSystemProvider
  initialState="transitional"    // Starting state
  detectDevice={true}            // Enable device detection
  workerURL="https://your-custom-api.com"  // Optional custom API
>
  <YourComponent />
</DesignSystemProvider>
```

### Customize Component Props

```jsx
// QuantumPixel props
<QuantumPixel
  state="quantum"              // Design state
  size="md"                    // Size variant (xs, sm, md, lg, xl)
  interactive={true}           // Enable hover/focus states
  glowIntensity={5}            // Glow effect intensity (0-10)
  animationDuration={4}        // Animation duration in seconds
/>

// DimensionalGrid props
<DimensionalGrid
  state="transitional"         // Design state
  density="medium"             // Grid density (fine, medium, coarse)
  type="background"            // Type (background, interface, feature)
  enableFalloff={true}         // Enable distance-based opacity falloff
  enablePerspectiveShift={true} // Enable perspective shift with mouse
/>

// PixelViewer props
<PixelViewer
  initialState="quantum"       // Initial design state
  columns={8}                  // Number of columns
  rows={6}                     // Number of rows
  pixelSize="sm"               // Pixel size (xs, sm, md, lg)
  gap={4}                      // Gap between pixels
  interactive={true}           // Enable interaction
  showControls={true}          // Show control panel
/>
```

## Troubleshooting

### Design Tokens Not Loading

If tokens aren't loading properly:

1. Check network requests to ensure API endpoints are accessible
2. Verify that `DesignSystemProvider` is properly configured
3. Check browser console for errors

### Device Detection Issues

If device detection isn't working:

1. Ensure `detectDevice` prop is set to `true`
2. Check browser user agent reporting
3. Try setting `initialState` manually if auto-detection fails

### Component Display Issues

If components aren't displaying correctly:

1. Verify CSS variables are properly applied (check browser inspector)
2. Ensure all required component props are provided
3. Check that component files are correctly imported

## Advanced Usage

### Create Custom Components

Build your own components using the design system:

```jsx
import { useDesignSystem } from './DesignSystemProvider';

function CustomButton({ children, onClick }) {
  const { state } = useDesignSystem();
  
  // State-specific styles
  const getStateStyles = () => {
    switch (state) {
      case 'heritage':
        return { borderRadius: 'var(--radius-small)' };
      case 'transitional':
        return { borderRadius: 'var(--radius-medium)' };
      case 'quantum':
        return { 
          borderRadius: 'var(--radius-large)',
          boxShadow: 'var(--shadow-medium)'
        };
      case 'superposition':
        return { 
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-large)'
        };
      default:
        return {};
    }
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        border: 'none',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-body-regular)',
        transition: 'all var(--duration-normal) var(--easing-standard)',
        ...getStateStyles()
      }}
    >
      {children}
    </button>
  );
}
```

### Use with Framer's Design System Features

To use with Framer's built-in design system features, import the token JSON files directly:

```javascript
// In Framer's code panel
import heritageTokens from './heritage-framer.json';
import transitionalTokens from './transitional-framer.json';
import quantumTokens from './quantum-framer.json';
import superpositionTokens from './superposition-framer.json';

// Use tokens with Framer's design system
const framer = {
  // Map tokens to Framer design system
};
```

## Performance Optimization

The design system includes specific optimizations for Apple Silicon M4 devices:

- Neural Engine acceleration for visual effects
- Metal API rendering for complex animations
- ProMotion display adaptations
- Memory optimization based on device capability

These optimizations are automatically applied when using the `detectDevice` option in the DesignSystemProvider.

## Resources

- **API Endpoint**: [https://design-system-staging.9bitstudios.io](https://design-system-staging.9bitstudios.io)
- **Source Components**: Located in `/framer-components` directory
- **Generated Files**: Located in `/framer-output-production` directory

## Contact

For questions or issues with the implementation, contact:
- Technical Support: support@9bitstudios.io

---

*© 2025 9Bit Studios. All rights reserved.*