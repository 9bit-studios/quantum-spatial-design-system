# Design Tokens

Created: May 1, 2025 6:11 PM
Last Updated: May 1, 2025 8:09 PM
AI custom autofill: Resource Category: Design System
Doc Type: Documentation
Resource Type: CSS
Asset Type: Tokens
Overview: This section provides design tokens for a quantum-spatial design system, including colors, spacing, typography, and implementation examples for web and iOS platforms.
Research Methods: Data Analysis
Resource Category: Creative Assets
Resource Type: CSS
Social Platforms: CreativeNetwork
Status: In Review

```css
/* 
 * 9Bit Studios Quantum-Spatial Design System
 * Core CSS Variables - M4-Optimized
 */

:root {
  /* ===== FOUNDATION ===== */
  /* Color: Primary Foundation */
  --color-void-black: #0A0621;
  --color-deep-space-indigo: #131A36;
  --color-ultra-indigo: #1E1F5C;
  --color-dimensional-eggplant: #331F4A;
  --color-midnight-richness: #0D0D15;
  --color-quantum-violet: #6A3093;
  --color-ultra-marine: #405DE5;
  --color-ultra-violet: #613FE7;

  /* Color: Secondary Accents */
  --color-subtle-aqua: #06D6A0;
  --color-subtle-cyan: #5AC8FA;
  --color-dimensional-teal: #126D71;
  --color-rose-energy: #BF4080;
  --color-quantum-pulse-pink: #FF2D55;
  --color-dimensional-orange: #FF6B6B;
  
  /* Color: Heritage System */
  --color-heritage-green: #2C5F2D;
  --color-heritage-green-light: #3D8B40;
  --color-heritage-green-dark: #1B3D1A;
  --color-heritage-pixel-green: #3DFF74;

  /* ===== FUNCTIONAL COLORS ===== */
  --color-primary-action: var(--color-subtle-cyan);
  --color-secondary-action: var(--color-dimensional-teal);
  --color-tertiary-action: var(--color-ultra-violet);
  --color-destructive: var(--color-rose-energy);
  --color-success: var(--color-heritage-green);
  --color-warning: var(--color-dimensional-orange);
  --color-info: var(--color-subtle-aqua);

  /* ===== STATE GRADIENTS ===== */  
  --gradient-heritage-state: linear-gradient(135deg,
    var(--color-heritage-green-dark),
    var(--color-heritage-green),
    var(--color-heritage-green-light));
  
  --gradient-transitional-state: linear-gradient(135deg,
    var(--color-dimensional-eggplant),
    var(--color-ultra-indigo),
    var(--color-ultra-violet));
  
  --gradient-quantum-state: linear-gradient(135deg,
    var(--color-quantum-violet),
    var(--color-rose-energy),
    var(--color-quantum-pulse-pink));
    
  --gradient-quantum-depth: linear-gradient(135deg, 
    var(--color-deep-space-indigo), 
    var(--color-dimensional-eggplant), 
    var(--color-quantum-violet));
  
  --gradient-spatial-background: linear-gradient(180deg, 
    var(--color-void-black), 
    var(--color-deep-space-indigo));
  
  --gradient-energy-flow: linear-gradient(90deg, 
    var(--color-heritage-green), 
    var(--color-subtle-cyan), 
    var(--color-quantum-pulse-pink));

  /* ===== OPACITY VALUES ===== */
  --opacity-subtle: 0.7;
  --opacity-very-subtle: 0.3;
  --opacity-hover: 0.85;
  --opacity-active: 0.95;
  --opacity-disabled: 0.5;
  
  /* Grid Opacity */
  --grid-opacity-subtle: 0.05;
  --grid-opacity-medium: 0.1;
  --grid-opacity-prominent: 0.15;

  /* ===== SPACING SYSTEM ===== */
  --space-quantum: 4px;  /* Base unit */
  --space-xxs: 4px;     
  --space-xs: 8px;       
  --space-sm: 16px;      
  --space-md: 24px;      
  --space-lg: 32px;      
  --space-xl: 48px;      
  --space-xxl: 64px;     

  /* ===== BORDERS & RADII ===== */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  --radius-pill: 9999px;
  
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;

  /* ===== SHADOWS ===== */
  --shadow-subtle: 0 2px 4px rgba(10, 6, 33, 0.2);
  --shadow-medium: 0 4px 8px rgba(10, 6, 33, 0.3);
  --shadow-prominent: 0 8px 16px rgba(10, 6, 33, 0.4);
  --shadow-quantum: 0 8px 24px rgba(90, 200, 250, 0.25);
  
  /* Glow Effects */
  --glow-subtle: 0 0 5px rgba(90, 200, 250, 0.5);
  --glow-medium: 0 0 10px rgba(90, 200, 250, 0.6);
  --glow-quantum: 0 0 15px rgba(191, 64, 128, 0.7);

  /* ===== TYPOGRAPHY ===== */
  /* Font Families */
  --font-primary-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-primary-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary-display: 'Clash Grotesque', sans-serif;
  --font-secondary-text: 'Clash Grotesque', sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', monospace;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;
  --font-size-display: 48px;

  /* Line Heights */
  --line-height-xs: 16px;
  --line-height-sm: 20px;
  --line-height-md: 24px;
  --line-height-lg: 28px;
  --line-height-xl: 32px;
  --line-height-xxl: 40px;
  --line-height-display: 56px;

  /* Letter Spacing */
  --letter-spacing-tight: -0.2px;
  --letter-spacing-normal: 0px;
  --letter-spacing-wide: 0.1px;

  /* ===== ANIMATION ===== */
  /* Timing */
  --transition-instant: 50ms;
  --transition-fast: 150ms;
  --transition-medium: 300ms;
  --transition-slow: 500ms;
  --transition-deliberate: 800ms;

  /* Easing */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-quantum: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-energy: cubic-bezier(0.17, 0.89, 0.32, 1.25);

  /* ===== GLASSMORPHISM ===== */
  --glass-background-subtle: rgba(19, 26, 54, 0.4);
  --glass-background-medium: rgba(19, 26, 54, 0.6);
  --glass-background-prominent: rgba(19, 26, 54, 0.8);
  
  --glass-border-color: rgba(90, 200, 250, 0.2);
  --glass-border-color-heritage: rgba(61, 255, 116, 0.2);
  --glass-border-color-quantum: rgba(191, 64, 128, 0.2);
  
  --glass-blur-subtle: 5px;
  --glass-blur-medium: 10px;
  --glass-blur-prominent: 15px;
  
  /* ===== Z-INDEX LAYERS ===== */
  --z-background: -10;
  --z-grid: -5;
  --z-base: 0;
  --z-above: 10;
  --z-floating: 100;
  --z-overlay: 1000;
  --z-modal: 2000;
  --z-popover: 5000;
  --z-quantum: 9000;
}

/* ===== MEDIA QUERY VARIABLES ===== */
@media (min-width: 768px) {
  :root {
    --space-md: 32px;
    --space-lg: 40px;
    --space-xl: 56px;
    --space-xxl: 80px;
  }
}

/* ===== DARK MODE ADJUSTMENTS ===== */
@media (prefers-color-scheme: dark) {
  :root {
    /* Increase glow intensity slightly */
    --glow-subtle: 0 0 6px rgba(90, 200, 250, 0.6);
    --glow-medium: 0 0 12px rgba(90, 200, 250, 0.7);
    --glow-quantum: 0 0 18px rgba(191, 64, 128, 0.8);
  }
}

/* ===== ANIMATION KEYFRAMES ===== */
@keyframes opacityPulse {
  0%, 100% { opacity: var(--opacity-subtle); }
  50% { opacity: 1; }
}

@keyframes scalePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

@keyframes energyFlow {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

@keyframes stateCycle {
  0% { background-image: var(--gradient-heritage-state); }
  33% { background-image: var(--gradient-transitional-state); }
  66% { background-image: var(--gradient-quantum-state); }
  100% { background-image: var(--gradient-heritage-state); }
}

@keyframes fluidMotion {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 40% 60% 30% 70% / 60% 40% 60% 30%; }
  75% { border-radius: 70% 30% 40% 60% / 30% 60% 70% 40%; }
}

/* ===== UTILITY CLASSES ===== */

/* Glassmorphism */
.quantum-glass {
  background: var(--glass-background-medium);
  backdrop-filter: blur(var(--glass-blur-medium));
  -webkit-backdrop-filter: blur(var(--glass-blur-medium));
  border: var(--border-width-thin) solid var(--glass-border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
}

.heritage-glass {
  background: rgba(44, 95, 45, 0.4);
  backdrop-filter: blur(var(--glass-blur-medium));
  -webkit-backdrop-filter: blur(var(--glass-blur-medium));
  border: var(--border-width-thin) solid var(--glass-border-color-heritage);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
}

.quantum-state-glass {
  background: rgba(106, 48, 147, 0.4);
  backdrop-filter: blur(var(--glass-blur-prominent));
  -webkit-backdrop-filter: blur(var(--glass-blur-prominent));
  border: var(--border-width-thin) solid var(--glass-border-color-quantum);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-quantum);
}

/* Pulse Animation Classes */
.pulse-opacity {
  animation: opacityPulse 4s var(--ease-standard) infinite;
}

.pulse-scale {
  animation: scalePulse 3s var(--ease-quantum) infinite;
}

.pulse-combined {
  animation: 
    opacityPulse 4s var(--ease-standard) infinite,
    scalePulse 3s var(--ease-quantum) infinite;
}

/* Grid System */
.quantum-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, 
      rgba(90, 200, 250, var(--grid-opacity-medium)) 1px, 
      transparent 1px
    ),
    linear-gradient(to bottom, 
      rgba(90, 200, 250, var(--grid-opacity-medium)) 1px, 
      transparent 1px
    );
  background-size: 32px 32px;
  transform: perspective(1000px) rotateX(60deg) scale(2);
  transform-origin: center bottom;
  pointer-events: none;
  z-index: var(--z-grid);
}

/* Energy Paths */
.energy-path {
  stroke: var(--color-subtle-cyan);
  stroke-width: 2px;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  filter: drop-shadow(var(--glow-subtle));
  animation: energyFlow 10s var(--ease-standard) infinite;
}

/* Fluid Elements */
.fluid-element {
  animation: fluidMotion 8s infinite ease-in-out;
}
```

### Visualizing Your Token System

### Sample Code: Implementation Across Platforms

### Web/Framer Implementation

```jsx
// Example component using design tokens
const QuantumButton = styled.button`
  background: var(--color-subtle-cyan);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  transition: opacity var(--transition-fast) var(--ease-quantum);

  &:hover {
    opacity: var(--opacity-hover);
  }

  &:active {
    opacity: var(--opacity-active);
  }
`;

```

### iOS SwiftUI Implementation

For SwiftUI, you'd typically create a dedicated file to define your design tokens:

```swift
// DesignTokens.swift
import SwiftUI

struct DesignTokens {
    // Colors
    static let voidBlack = Color(hex: "0A0621")
    static let deepSpaceIndigo = Color(hex: "131A36")
    static let subtleCyan = Color(hex: "5AC8FA")

    // Spacing
    static let spaceXS = 8.0
    static let spaceMD = 16.0

    // Typography
    static let fontSizeMD = 16.0
    static let fontSizeLG = 20.0

    // Timing
    static let transitionFast = 0.15
}

// Usage example
struct QuantumButton: View {
    var body: some View {
        Button(action: {}) {
            Text("Action")
                .font(.system(size: DesignTokens.fontSizeMD))
                .padding(.horizontal, DesignTokens.spaceMD)
                .padding(.vertical, DesignTokens.spaceXS)
                .background(DesignTokens.subtleCyan)
                .cornerRadius(8)
        }
    }
}

```

### Difference Between CSS Variables and Design Tokens

- **SwiftUI Constants** would be another implementation (for iOS)
- **CSS Variables** are one method of implementing design tokens (for web)
- **Design Tokens** are the abstract, platform-agnostic design values

The CSS variables in your example are the implementation of design tokens for web platforms. The difference is:

---

[Design Tokens](Design%20Tokens%201e7c7f76af88801b8c63f2fad070942f/Design%20Tokens%201e4c7f76af888127a626e56ad0764e68.csv)