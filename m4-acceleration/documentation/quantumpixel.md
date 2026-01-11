# Quantum-Spatial Pixel System - Developer Guide

Version: 1.0 (May 2025)

This document provides technical implementation details for developers integrating the Quantum-Spatial Pixel System into applications and products.

## Quick Start

### Web Implementation

1. Install the package:

```bash
npm install @9bit/quantum-spatial
```

2. Import and use the components:

```javascript
import { generateVolumetricPixel } from '@9bit/quantum-spatial';

// Create a simple quantum pixel
const pixelSvg = generateVolumetricPixel({
  state: 'quantum',  // 'heritage', 'transitional', 'quantum', or 'superposition'
  size: 64,          // 16, 32, 48, or 64 recommended
  primaryColor: '#6A3093',
  accentColor: '#BF4080',
  secondaryColor: '#FF2D55'
});

// Add to DOM
document.getElementById('container').innerHTML = pixelSvg;
```

3. For animated components:

```javascript
import { animateVolumetricPixel } from '@9bit/quantum-spatial';

// Get canvas element
const canvas = document.getElementById('pixel-canvas');

// Start animation
const animationId = animateVolumetricPixel(canvas, {
  state: 'transitional',
  size: 200,
  primaryColor: '#331F4A',
  accentColor: '#5AC8FA',
  secondaryColor: '#1E1F5C'
});

// To stop animation later:
// cancelAnimationFrame(animationId);
```

### React Component

```jsx
import { PixelViewer } from '@9bit/quantum-spatial-react';

function MyComponent() {
  return (
    <PixelViewer 
      state="energy"
      dimension="3d"
      size={48}
      colorScheme="quantum"
      animated={true}
    />
  );
}
```

### iOS/macOS SwiftUI Implementation

1. Add the package dependency in your Package.swift or via Xcode

2. Import and use the components:

```swift
import SwiftUI
import QuantumSpatialKit

struct ContentView: View {
    var body: some View {
        QSPixelView(
            state: .superposition,
            dimension: .volumetric,
            size: .x3,
            colorScheme: .quantum,
            animated: true
        )
        .frame(width: 120, height: 120)
    }
}
```

## Component API Reference

### JavaScript API

#### `generateVolumetricPixel(options)`

Generates an SVG string for a volumetric quantum pixel.

```javascript
generateVolumetricPixel({
  state: 'heritage',    // Required: 'heritage', 'transitional', 'quantum', or 'superposition'
  size: 64,            // Required: Pixel size in pixels
  primaryColor: '#2C5F2D',   // Optional: Primary color (defaults based on state)
  accentColor: '#3DFF74',    // Optional: Accent color (defaults based on state)
  secondaryColor: '#1B3D1A',  // Optional: Secondary color (defaults based on state)
  glowIntensity: 3,    // Optional: Intensity of glow effect (1-10)
  animationDuration: 4, // Optional: Base duration for animations (seconds)
  is3D: true           // Optional: Whether to generate 3D or 2D pixel
})
```

#### `renderVolumetricPixelToCanvas(canvas, options, useMetalRenderer = true)`

Renders a pixel directly to a canvas element.

```javascript
renderVolumetricPixelToCanvas(
  document.getElementById('my-canvas'),
  {
    state: 'transitional',
    size: 200,
    primaryColor: '#331F4A',
    accentColor: '#5AC8FA',
    secondaryColor: '#1E1F5C'
  },
  true  // Use Metal acceleration if available
);
```

#### `animateVolumetricPixel(canvas, options, fps = 60)`

Creates an animation loop for a volumetric pixel on a canvas.

```javascript
const animationId = animateVolumetricPixel(
  document.getElementById('my-canvas'),
  {
    state: 'quantum',
    size: 200,
    primaryColor: '#6A3093',
    accentColor: '#BF4080',
    secondaryColor: '#FF2D55'
  },
  60  // frames per second
);

// Cancel animation
// cancelAnimationFrame(animationId);
```

#### `isM4Device()`

Detects if the current device has M4 capabilities.

```javascript
if (isM4Device()) {
  // Use enhanced rendering
} else {
  // Use standard rendering
}
```

### React Component API

#### `<PixelViewer>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | string | 'transitional' | Pixel state ('heritage', 'transitional', 'quantum', 'superposition') |
| `dimension` | string | '3d' | Rendering dimension ('2d' or '3d') |
| `size` | number | 200 | Size in pixels |
| `colorScheme` | string | 'default' | Color scheme ('default', 'heritage', 'transitional', 'quantum') |
| `animated` | boolean | true | Whether to animate the pixel |
| `primaryColor` | string | null | Override for primary color |
| `accentColor` | string | null | Override for accent color |
| `secondaryColor` | string | null | Override for secondary color |
| `optimizeForM4` | boolean | true | Whether to use M4 optimizations |

### Swift/SwiftUI API

#### `QSPixelView`

```swift
QSPixelView(
    state: QSPixelState,
    dimension: QSPixelDimension = .volumetric,
    size: QSPixelSize = .x2,
    colorScheme: QSColorScheme = .default,
    animated: Bool = true,
    primaryColor: Color? = nil,
    accentColor: Color? = nil,
    secondaryColor: Color? = nil,
    optimizeForM4: Bool = true
)
```

#### Enums

```swift
enum QSPixelState {
    case heritage
    case transitional
    case quantum
    case superposition
}

enum QSPixelDimension {
    case flat    // 2D
    case volumetric  // 3D
}

enum QSPixelSize {
    case x1  // 16px
    case x2  // 32px
    case x3  // 48px
    case x4  // 64px
    case custom(CGFloat)
}

enum QSColorScheme {
    case `default`
    case heritage
    case transitional
    case quantum
    case custom
}
```

## Advanced Usage

### Custom Rendering Pipeline

For applications requiring custom rendering:

```javascript
// Import base templates and rendering functions
import { 
  getHeritageTemplate, 
  getTransitionalTemplate, 
  getQuantumTemplate, 
  getSuperpositionTemplate,
  applyMetalRendering
} from '@9bit/quantum-spatial/templates';

// Create custom template
function myCustomTemplate(options) {
  // Start with base template
  let template = getTransitionalTemplate();
  
  // Modify template structure
  template = template.replace(/stdDeviation="4"/g, `stdDeviation="${options.glowIntensity * 1.5}"`);
  
  // Add custom elements
  // ...
  
  return template;
}

// Use in custom rendering
function myCustomPixelRenderer(canvas, options) {
  const customTemplate = myCustomTemplate(options);
  // Continue with rendering to canvas
  // ...
}
```

### BatchRendering for Performance

For applications with many pixels:

```javascript
import { batchRenderVolumetricPixels } from '@9bit/quantum-spatial';

// Get all canvas elements
const canvases = document.querySelectorAll('.pixel-canvas');

// Prepare options for each canvas
const optionsArray = Array.from(canvases).map((canvas, index) => {
  return {
    state: index % 4 === 0 ? 'heritage' : 
           index % 4 === 1 ? 'transitional' : 
           index % 4 === 2 ? 'quantum' : 'superposition',
    size: 64,
    // Other options...
  };
});

// Batch render (utilizes parallel processing on M4)
batchRenderVolumetricPixels(canvases, optionsArray);
```

## Performance Optimization

### M4 Optimization Tips

- Use `isM4Device()` to detect M4 capability
- Enable Metal rendering for enhanced visual effects
- Use batch rendering for multiple pixels
- Pre-generate static SVGs for non-animated pixels
- Use appropriate pixel size based on display requirements

### Memory Management

- Cancel animations when components unmount
- Use appropriate pixel size (don't render 64px pixels if displaying at 32px)
- Share color instances rather than creating new ones
- For lists/collections, reuse pixel components with different configurations

### Debug Mode

Enabling debug mode adds helpful visualizations:

```javascript
import { setDebugMode } from '@9bit/quantum-spatial';

// Enable debug mode
setDebugMode(true);

// Shows:
// - Particle count
// - Frame rate
// - M4 optimization status
// - Memory usage
```

## Troubleshooting

### Common Issues

1. **SVGs not displaying**: Ensure proper MIME types are set and SVG namespace is included
2. **Animation performance**: Reduce pixel count or disable animations on lower-end devices
3. **Color inconsistency**: Use the standardized color scheme or ensure consistent overrides
4. **Size issues**: Stick to the recommended size ratios (1x, 2x, 3x, 4x)

### Debugging Tools

```javascript
import { PixelDebugger } from '@9bit/quantum-spatial/debug';

// Create debugger
const debugger = new PixelDebugger();

// Analyze pixel rendering
debugger.analyze(myPixelCanvas);

// Get performance report
const report = debugger.getPerformanceReport();
console.log(report);
```

## Browser/Platform Support

- Modern browsers (Chrome, Safari, Firefox, Edge)
- iOS 15+
- iPadOS 15+
- macOS 12+
- Vision OS 1.0+

For older browsers, a simplified fallback rendering is available by setting `options.compatibility = true`.

## Contributing

To contribute to the Quantum-Spatial Pixel System:

1. Fork the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Make your changes
5. Run tests: `npm test`
6. Submit a pull request

---

For additional support, contact quantum-dev@9bitstudios.com