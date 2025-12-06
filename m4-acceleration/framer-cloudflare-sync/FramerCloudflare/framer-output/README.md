# Quantum-Spatial Design System

A comprehensive, M4-optimized design system with automatic Cloudflare Worker integration for Framer projects.

## Components

This package includes the following components:

- **QuantumSpatialProvider**: Core provider component that manages design state and device detection
- **Button**: Multi-variant button component with M4 optimizations
- **Card**: Versatile container component with elevation and variants
- **DashboardLayout**: Application dashboard layout with header and sidebar
- **DemoPage**: A complete demo page showcasing all components

## Usage

### Core Provider

```jsx
import { QuantumSpatialProvider, useQuantumSpatial } from "quantum-spatial-design-system";

export function App() {
  return (
    <QuantumSpatialProvider
      autoDetect={true}
      initialState="quantum"
      workerUrl="https://design-system.9bitstudios.io"
    >
      <YourContent />
    </QuantumSpatialProvider>
  );
}

function YourContent() {
  // Access design system
  const { tokens, designState, setDesignState, deviceInfo } = useQuantumSpatial();
  
  return (
    <div>
      <h1>Current state: {designState}</h1>
      <button onClick={() => setDesignState("superposition")}>
        Switch to Superposition
      </button>
      <p>Is M4 Device: {deviceInfo.isM4Detected ? "Yes" : "No"}</p>
    </div>
  );
}
```

### Using Components

```jsx
import { Button, Card, DashboardLayout } from "quantum-spatial-design-system";

function MyApp() {
  return (
    <DashboardLayout title="My Dashboard">
      <Card title="Welcome" elevated={true}>
        <p>Welcome to the Quantum-Spatial Design System.</p>
        <Button text="Get Started" variant="primary" />
      </Card>
    </DashboardLayout>
  );
}
```

## Design States

The design system supports four progressive states:

1. **Heritage**: Flat, traditional UI with minimal effects
2. **Transitional**: Slightly elevated UI with subtle effects
3. **Quantum**: Spatial UI with dimensional effects
4. **Superposition**: Advanced spatial UI with M4-specific optimizations

## M4 Optimizations

On Apple Silicon M4 devices, the design system automatically enables:

1. **Enhanced Visuals**:
   - Advanced blur effects
   - Improved shadows and lighting
   - Higher-quality animations
   - Particle effects

2. **Superposition State**:
   - Most advanced design state
   - Volumetric UI elements
   - Neural-enhanced effects
   - Multi-dimensional interactions

3. **Performance Optimizations**:
   - Metal API rendering where available
   - Neural Engine acceleration
   - HDR color space support
   - Dynamic resolution scaling

## Configuration Options

The `QuantumSpatialProvider` accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoDetect` | boolean | `true` | Automatically detect device capabilities |
| `initialState` | string | `'quantum'` | Initial design state |
| `workerUrl` | string | `'https://design-system.9bitstudios.io'` | Primary worker URL |
| `fallbackUrl` | string | `'https://quantum-spatial-design-system.9bitstudios.workers.dev'` | Fallback worker URL |

## Troubleshooting

If you're experiencing issues with the design system:

1. Check that the Cloudflare Worker is accessible
2. Try switching design states manually
3. Inspect the console for any error messages
4. Verify that all components are wrapped in the QuantumSpatialProvider

## License

© 2025 9Bit Studios. All rights reserved.