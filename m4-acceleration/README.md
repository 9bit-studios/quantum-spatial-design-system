# Quantum-Spatial Pixel System

## Core Component Set

The Quantum-Spatial Pixel System forms the foundation of 9Bit Studios' design language. This system introduces a new paradigm in pixel-based design that moves beyond traditional flat aesthetics into a quantum-dimensional space where pixels can exist in multiple states simultaneously.

### Core Principles

- **Quantum States**: Pixels exist in four fundamental states representing different phases of quantum materialization
- **Dimensional Depth**: All components incorporate 3D volumetric properties while maintaining pixel heritage
- **Energy Flow**: Components visualize the flow of energy between states through particle effects and transitions
- **M4 Optimization**: All rendering leverages Apple Silicon's Neural Engine for enhanced performance

## Component Structure

The system consists of 16 core quantum pixel components across four distinct states:

### 1. Fully Materialized (Solid)

Pixels with defined physical presence, clear boundaries and solid forms.

- Quantum Cube
- Spatial Octahedron
- Void Sphere
- Heritage Block

### 2. Partially Materialized (Translucent)

Pixels in transition between energy and solid states with semi-transparent areas.

- Phase Shift
- Quantum Ripple
- Dimensional Echo
- Transient Form

### 3. Energy State (Glowing)

Pure quantum energy forms with bright, glowing outlines and particle effects.

- Energy Grid
- Quantum Core
- Void Stream
- Ethereal Circuit

### 4. Superposition State (Layered)

The most complex quantum state where pixels exist in multiple positions simultaneously.

- Quantum Plural
- Echo Chamber
- Dimensional Fold
- Reality Cascade

## Size Ratio System

All quantum pixels maintain a consistent size relationship to ensure proper scaling:

- **1x**: 16px (Base size)
- **2x**: 32px
- **3x**: 48px
- **4x**: 64px

## Implementation Guidelines

### Required Rules

1. **State Combination**: Always include at least 3 different pixel states in any composition
2. **Spacing Requirements**: Maintain minimum spacing between pixels of at least 50% of pixel size
3. **Distinctive Patterns**: Ensure quantum pixels never create recognizable patterns from classic games
4. **Animation Transitions**: Use fade, particle, or dimensional shift effects for state transitions

### Color System Integration

Quantum pixels use the following color palettes from the Quantum-Spatial Design System:

- **Heritage Colors**: #2C5F2D (base), #3DFF74 (accent), #1B3D1A (secondary)
- **Transitional Colors**: #331F4A (base), #5AC8FA (accent), #1E1F5C (secondary) 
- **Quantum Colors**: #6A3093 (base), #BF4080 (accent), #FF2D55 (secondary)
- **Superposition**: #FFFFFF (base), with varying accent and secondary colors

## Technical Integration

The Quantum-Spatial Pixel System can be used across various platforms:

### Web Implementation

```javascript
import { generateQuantumPixel } from '@9bit/quantum-spatial';

// Generate a quantum pixel
const pixel = generateQuantumPixel({
  state: 'energy',
  size: 64,
  primaryColor: '#6A3093',
  accentColor: '#BF4080',
  secondaryColor: '#FF2D55',
});

// Apply to DOM element
document.getElementById('pixel-container').innerHTML = pixel;
```

### iOS/iPadOS/macOS Implementation

```swift
import QuantumSpatialKit

// Create a quantum pixel view
let pixelView = QSPixelView(frame: CGRect(x: 0, y: 0, width: 64, height: 64))
pixelView.state = .superposition
pixelView.primaryColor = UIColor(hex: "#FFFFFF")
pixelView.accentColor = UIColor(hex: "#5AC8FA")
pixelView.secondaryColor = UIColor(hex: "#FF2D55")
pixelView.optimizedForM4 = true

// Add to view hierarchy
containerView.addSubview(pixelView)
```

## Directory Structure

- **/templates/** - Basic SVG templates with placeholder variables for parameterization
- **/volumetric-templates/** - Enhanced volumetric 3D/4D SVG templates with advanced visual effects
- **/examples/** - Pre-rendered examples of pixel states for quick reference
- **pixel-generator.js** - Original utility for generating parameterized pixels
- **volumetric-pixel-generator.js** - Enhanced utility for generating volumetric pixels
- **core-quantum-pixel-system.html** - Interactive component browser for core pixel system
- **quantum-spatial-pixel-viewer.html** - Advanced viewer for the volumetric pixel system

## M4 Optimization

Quantum pixels are optimized for Apple Silicon M4 chips, using:

- Neural Engine for particle system calculations
- Metal for enhanced rendering and visual effects
- Accelerated animation transitions

The system automatically detects M4 capability and adjusts rendering approach accordingly, while maintaining visual consistency across all platforms.

## Color Reference

### Heritage Colors
- Heritage Green: #2C5F2D
- Heritage Green Light: #3D8B40
- Heritage Green Dark: #1B3D1A
- Heritage Pixel Green: #3DFF74
- Heritage Pixel Aqua: #00FFC8

### Transitional Colors
- Dimensional Eggplant: #331F4A
- Deep Space Indigo: #131A36
- Ultra Indigo: #1E1F5C
- Ultra Violet: #613FE7
- Subtle Cyan: #5AC8FA

### Quantum Colors
- Quantum Violet: #6A3093
- Rose Energy: #BF4080
- Quantum Pulse Pink: #FF2D55
- Midnight Richness: #0D0D15
- Void Black: #0A0621

## Version History

- **1.0** (May 2025) - Initial release with 16 core components