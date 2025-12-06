# Quantum-Spatial PixelViewer Component

The PixelViewer component provides an interactive visualization of the Quantum-Spatial pixel system, allowing users to explore different quantum states and dimensions.

## Overview

The PixelViewer is a key component of the Quantum-Spatial Design System, offering a comprehensive interface for exploring the fundamental building blocks of the design language. It visualizes the quantum pixels in different states and configurations, providing both educational and functional value.

## Features

- Interactive pixel grid with customizable dimensions
- Support for all four quantum states:
  - **Heritage**: Flat orthogonal representation with structured layout
  - **Transitional**: Emerging dimension with softened edges
  - **Quantum**: Fully dimensional with organic, fluid forms
  - **Superposition**: Multiple states simultaneously with overlapping forms
- Configurable pixel size and grid dimensions
- Real-time state switching
- Visualization of energy states and transitions
- M4-optimization for Apple Silicon devices

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialState` | `"heritage" \| "transitional" \| "quantum" \| "superposition"` | `"transitional"` | Initial quantum state |
| `columns` | `number` | `8` | Number of columns in the grid |
| `rows` | `number` | `6` | Number of rows in the grid |
| `pixelSize` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Pixel size variant |
| `gap` | `number` | `4` | Gap between pixels in pixels |
| `interactive` | `boolean` | `true` | Enable pixel interaction |
| `showControls` | `boolean` | `true` | Show state control panel |
| `responsive` | `boolean` | `true` | Enable responsive behavior |
| `m4Optimized` | `boolean` | `true` | Enable M4 optimization on Apple Silicon |

### Endpoint

- **URL**: `/pixel-viewer`
- **Method**: GET
- **Parameters**:
  - `state`: Initial quantum state (heritage, transitional, quantum, superposition)
  - `format`: Output format (json, html, react)
  - `m4`: Enable M4 optimization (true/false)
- **Response Format**:
  - `json` (default): Full component definition in JSON format
  - `html`: Interactive HTML preview
  - `react`: React component code

### Example Requests

```bash
# Get component definition in JSON format
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=quantum"

# Get HTML preview
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=transitional&format=html" > pixel-viewer-preview.html

# Get React component code
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=heritage&format=react" > PixelViewer.tsx
```

## Usage in Framer

After syncing the components using the Framer CLI, you can use the PixelViewer in your Framer projects:

```jsx
import { PixelViewer } from "design-system";

export function Component() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PixelViewer 
        initialState="transitional"
        columns={8}
        rows={6}
        pixelSize="sm"
        showControls={true}
        interactive={true}
      />
    </div>
  );
}
```

## Technical Implementation

The PixelViewer is implemented using a combination of:

1. **React Component**: For Framer integration
2. **Canvas Rendering**: For high-performance pixel visualization
3. **CSS Styling**: For UI controls and layout
4. **M4 Optimization**: For enhanced performance on Apple Silicon

The component dynamically renders pixels based on the current quantum state, with each state having unique visual characteristics:

- **Heritage**: Structured, flat representation with clear edges
- **Transitional**: Softened boundaries with emerging dimensional characteristics
- **Quantum**: Organic forms with full dimensional representation and energy visualization
- **Superposition**: Overlapping forms showing multiple quantum states simultaneously

## Browser Support

The PixelViewer component is optimized for modern browsers with canvas support:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## M4 Optimization

On Apple Silicon devices (M1/M2/M3/M4), the component automatically enables enhanced rendering:

- Metal API acceleration for rendering
- Neural Engine utilization for energy visualization
- Optimized memory usage patterns
- Higher rendering quality

## Integration Notes

When integrating the PixelViewer:

1. Provide sufficient container dimensions (minimum 300x300px recommended)
2. Enable controls for interactive experiences
3. Consider performance implications for very large grids (>20x20)
4. Test in target browsers to ensure compatibility

## Further Reading

For more information on the Quantum-Spatial Design System:
- [Design System Overview](README.md)
- [Quantum Pixel Component](QUANTUM_PIXEL.md)
- [Dimensional Grid Component](DIMENSIONAL_GRID.md)