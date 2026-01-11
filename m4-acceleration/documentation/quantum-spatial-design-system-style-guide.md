# 9Bit Studios Quantum-Spatial Design System Style Guide v1.0

---

## Brand Philosophy

### Core Concept: The Dimensional Quantum Pixel

The 9Bit Studios visual identity centers around the concept of the "quantum pixel"—a visual element existing in multiple states simultaneously. This represents our position at the intersection of gaming heritage and technological advancement.

**Quantum Pixel States:**

- **Heritage State**: Flat, orthogonal pixels referencing 8-bit era
- **Transitional State**: Pixels gaining dimensional properties
- **Quantum State**: Fully evolved volumetric elements with sophisticated material properties
- **Superposition State**: Elements appearing in multiple positions/states simultaneously

**Quantum Pixel Properties:**

- Multiple materialization states within single compositions
- Dimensional depth through consistent lighting and shadows
- Material properties that mimic polished, reflective surfaces
- Subtle environmental interaction through reflections and lighting

---

## Color System

Our color palette creates harmony between nostalgic resonance and cutting-edge aesthetics, with dimensionality conveyed through material-inspired gradient systems.

### Primary Foundation Colors

- **Void Black** (`#000000`) - Deep void black for environments
- **Void Violet** (`#0B010D`) - Dense violet for environments
- **Ultra Void Violet** (`#0A0621`) - Ultra void violet for environments
- **Multidimensional Violet** (`#110413`) - Aurora oil slick violet for environments
- **Deep Space Indigo** (`#0A0A0F`) - Sophisticated base for UI
- **Ultra Indigo** (`#1E1F5C`) - Deep accent for dimensional depth
- **Dimensional Eggplant** (`#331F4A`) - Primary UI foundation
- **Midnight Richness** (`#0D0D15`) - Deep foundation with subtle color
- **Ultra Marine** (`#405de5`) - Sparing accent color
- **Ultra Violet** (`#613FE7`) - Button and accent color

### Secondary Accent Colors

- **Subtle Cyan** (`#5AC8FA`) - Primary UI action color
- **Dimensional Teal** (`#126D71`) - Secondary UI accent
- **Rose Energy** (`#BF4080`) - Limited highlight CTA
- **Quantum Pulse Pink** (`#FF2D55`) - Energy Transition Activator
- **Dimensional Orange** (`#FF6B6B`) - Limited important highlights
- **Heritage Green Core** (`#2C5F2D`) - Gaming heritage reference
- **Heritage Green Dark** (`#1B3D1A`) - Gaming heritage reference
- **Heritage Green Light** (`#33ff66`) - Gaming heritage reference
- **Heritage Pixel Green** (`#3dff74`) - Gaming heritage reference
- **Heritage Pixel Green** (`#00ffc8`) - Gaming heritage reference
- **Ultra Heritage Pixel Green** (`#94fe00`) - Dawn of Game Universe reference, exists only in distant cosmic timeless expressions of sorcery between infinite players. Use only in muted opacities with an occasional revealing of 40-60 pixels or fewer, presented with tonal variation alongside balanced complementary colors showing 3D / 4D dimensionality that hints at volumetric expansion and metaphysical material manipulation.

### Material-Inspired Gradient Systems

### Foundation Gradients

- **Quantum Depth Gradient**: Deep Space Indigo → Dimensional Eggplant → Ultra Violet (15-20% shift)
- **Spatial Background Gradient**: Void Black → Deep Space Indigo (5-10% shift)
- **Deep Spatial Background Gradient**: Void Black → Midnight Richness (minimal shift)

### Accent Gradients

- **Energy State Transition**: Heritage Green → Deep Space Indigo → Subtle Aqua
- **Material State Variation**: Dimensional Eggplant (60-100% opacity)
- **Accent Highlight Gradient**: Subtle Aqua → Ultra Marine

### Spiritual State Transitions

- **Spiritual State Transition**: Dimensional Orange → Rose Energy → Subtle Cyan
- **Spiritual to Material State**: Dimensional Orange → Rose Energy → Deep Space Indigo
- **Spiritual to Quantum State**: Dimensional Orange → Rose Energy → Ultra Violet
- **High Energy Pulse Transition**: Dimensional Orange → Quantum Pulse Pink → Rose Energy
- **Heritage Evolution Transition**: Heritage Pixel Green → Heritage Green → Deep Space Indigo

### Color Application Rules

- Dominant colors: Deep Space Indigo and Dimensional Eggplant (60-70%)
- Accent colors: Limited to 10-15% of composition
- Implement subtle gradient in significant brand elements
- Use directional lighting for natural color variation
- Replace true black with Midnight Richness
- Maintain blue-to-purple gradient direction
- Limit cyan and magenta to 20% of composition

### Functional Color Assignments

- **Primary actions**: Subtle Cyan (#5AC8FA) at 100% opacity
- **Secondary actions**: Dimensional Teal (#126D71)
- **Destructive actions**: Rose Energy (#BF4080)
- **Success states**: Heritage Green (#339933)
- **Warning states**: Dimensional Orange (#FF6B6B)
- **Disabled states**: Dimensional Eggplant (#331F4A) at 40% opacity
- **Energy transitions**: Quantum Pulse Pink (#FF2D55)

### CSS Variables & Implementation

```css
:root {
  /* Primary Foundation Colors */
  --void-black: #0A0621;
  --deep-space-indigo: #131A36;
  --ultra-indigo: #1E1F5C;
  --dimensional-eggplant: #331F4A;
  --midnight-richness: #0D0D15;
  --quantum-violet: #6A3093;

  /* Secondary Accent Colors */
  --subtle-aqua: #06D6A0;
  --subtle-cyan: #5AC8FA;
  --dimensional-teal: #126D71;
  --rose-energy: #BF4080;
  --quantum-pulse-pink: #FF2D55;
  --dimensional-orange: #FF6B6B;
  --heritage-green: #2C5F2D;
  --heritage-pixel-green: #3DFF74;

  /* Heritage Green Variants */
  --quantum-heritage-green: #2C5F2D;
  --quantum-green-ultra: #50E150;
  --quantum-green-light: #3D8B40;
  --quantum-green-dark: #1B3D1A;

  /* State Colors */
  --success-color: #339933;
  --error-color: var(--rose-energy);
  --warning-color: var(--dimensional-orange);

  /* Interaction States */
  --hover-opacity: 0.85;
  --active-opacity: 0.75;
  --disabled-opacity: 0.4;

  /* Gradient Definitions */
  --quantum-depth-gradient: linear-gradient(135deg, var(--deep-space-indigo), var(--dimensional-eggplant) 50%, var(--quantum-violet));
  --spatial-background-gradient: linear-gradient(180deg, var(--void-black), var(--deep-space-indigo));
  --deep-spatial-background-gradient: linear-gradient(180deg, var(--void-black), var(--midnight-richness));
  --energy-state-transition: linear-gradient(135deg, var(--heritage-green), var(--deep-space-indigo) 50%, var(--subtle-cyan));
  --accent-highlight-gradient: linear-gradient(135deg, var(--subtle-cyan), var(--subtle-aqua));
  --spiritual-state-transition: linear-gradient(135deg, var(--dimensional-orange), var(--rose-energy) 50%, var(--subtle-cyan));
  --spiritual-material-transition: linear-gradient(135deg, var(--dimensional-orange), var(--rose-energy) 50%, var(--deep-space-indigo));
  --spiritual-quantum-transition: linear-gradient(135deg, var(--dimensional-orange), var(--rose-energy) 50%, var(--quantum-violet));
  --high-energy-pulse-transition: linear-gradient(135deg, var(--dimensional-orange), var(--quantum-pulse-pink) 50%, var(--rose-energy));
  --heritage-evolution-transition: linear-gradient(135deg, var(--heritage-pixel-green), var(--heritage-green) 50%, var(--deep-space-indigo));
}

/* Implementing Quantum Heritage Button Example */
.quantum-button {
  background: var(--quantum-depth-gradient);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  transition: all 0.2s ease-out;
  box-shadow: 0 4px 12px rgba(10, 6, 33, 0.2);
}

.quantum-button:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(10, 6, 33, 0.3);
}

.quantum-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(10, 6, 33, 0.15);
}

.quantum-button--primary {
  background: var(--subtle-cyan);
}

.quantum-button--secondary {
  background: var(--dimensional-teal);
}

.quantum-button--danger {
  background: var(--rose-energy);
}

.quantum-button--success {
  background: var(--heritage-green);
}

.quantum-button--disabled {
  background: var(--dimensional-eggplant);
  opacity: var(--disabled-opacity);
  pointer-events: none;
}

/* Heritage Green Implementation */
.quantum-heritage-element {
  background-color: var(--quantum-heritage-green);
  transition: all 0.3s ease;
}

.quantum-heritage-element--ethereal {
  opacity: 0.15;
}

.quantum-heritage-element--emerging {
  opacity: 0.65;
}

.quantum-heritage-element--stabilized {
  opacity: 0.9;
}

.quantum-heritage-element--ultra-energy {
  background-color: var(--quantum-green-ultra);
}

.quantum-heritage-element--high-energy {
  background-color: var(--quantum-green-light);
}

.quantum-heritage-element--low-energy {
  background-color: var(--quantum-green-dark);
}

```

</aside>

### Quantum Heritage Green Implementation

### Color Philosophy and Narrative

The heritage green (`#2C5F2D`) serves as a critical narrative element in our quantum-spatial design language, representing:

- Technological evolution
- Organic growth of computational thinking
- Bridge between historical design and future potential

### Quantum Metaphorical Mapping

- **Superposition**: Manifested through color's varying opacities
- **Entanglement**: Represented by interconnected design elements
- **Probabilistic State**: Expressed through dynamic color interactions

### Detailed Implementation Strategies

### Quantum Spatial Rendering

**Opacity Gradient Transitions**:

- Ethereal Quantum State: 15% opacity
- Emerging Computational Presence: 65% opacity
- Stabilized Quantum Information: 90% opacity

### Contextual Color Interactions

1. **Complementary Quantum Palette**
    - Primary Green: `#2C5F2D`
    - Quantum Accent: Cobalt Blue `#0047AB`
    - Quantum Neutral: Silver Gray `#C0C0C0`
2. **Spectral Energy Mapping**
    - Ultra Energy: Pixel green `#50E150`
    - High Energy: Lighter green `#3D8B40`
    - Medium Energy: Core heritage green `#2C5F2D`
    - Low Energy: Deep green variant `#1B3D1A`

### Spatial Interaction Principles

- **Quantum Depth Signaling**:
    - Use green's opacity and blurring to indicate computational depth
    - Create visual metaphors connecting classic design with quantum computational aesthetics

### Design Token Implementation

```css
:root {
  /* Heritage Green Variants */
  --quantum-heritage-green: #2C5F2D;
  --quantum-green-light: #3D8B40;
  --quantum-green-dark: #1B3D1A;

  /* Quantum Interaction States */
  --quantum-green-hover-opacity: 0.75;
  --quantum-green-active-opacity: 0.90;
}

```

### SVG Quantum Green Overlay Technique

```
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="quantumGreenGradient">
      <stop offset="0%" stop-color="#2C5F2D" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="#2C5F2D" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#2C5F2D" stop-opacity="0.90"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#quantumGreenGradient)"/>
</svg>

```

</aside>

### Subtle Cyan as UI Action Color

**Subtle Cyan (`#5AC8FA`)** is strategically chosen as the primary UI action color, offering:

1. **Visual Hierarchy**:
    - Stands out against deep background colors
    - Maintains quantum-spatial aesthetic
2. **Functional Clarity**:
    - Intuitive recognition for interactive elements
    - Consistent across platforms
3. **Accessibility**:
    - High contrast against dark backgrounds
    - Meets WCAG guidelines

### Action Color Hierarchy

- **Primary Actions**: Subtle Cyan (`#5AC8FA`) at 100% opacity
- **Secondary Actions**: Dimensional Teal (`#126D71`)
- **Destructive Actions**: Rose Energy (`#BF4080`)
- **Success States**: Heritage Green (`#339933`)

---

## Typography

### Primary Typefaces

**For Apple Native Platforms:**

- SF Pro (Apple's system font)
    - Headlines: SF Pro Display Bold
    - Subheadings: SF Pro Display Medium
    - Body: SF Pro Text Regular
    - UI Elements: SF Pro Text Regular/Medium

**For Web & Framer Applications:**

- SF Compact
    - Headlines: SF Compact Bold
    - Subheadings: SF Compact Medium
    - Body: SF Compact Regular
    - UI Elements: SF Compact Regular/Medium

**Fallback Web Stack:**

```css
font-family: 'SF Compact', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

```

### Secondary Typeface

- SF Mono (Apple platforms) / JetBrains Mono (web platforms)
- Used for code snippets, technical specifications, and terminal-like UI elements

### Type Scale

```
H1: 32px / 40px line height / -0.2px letter spacing
H2: 24px / 32px line height / -0.1px letter spacing
H3: 20px / 28px line height / -0.1px letter spacing
H4: 18px / 24px line height / 0px letter spacing
Body Large: 16px / 24px line height / 0px letter spacing
Body: 14px / 20px line height / 0px letter spacing
Caption: 12px / 16px line height / 0.1px letter spacing

```

### Typography Guidelines

- Maintain consistent type scale across platforms while respecting platform conventions
- Use weight rather than size for emphasis within the same hierarchy level
- Ensure sufficient contrast between text and backgrounds (minimum 4.5:1 ratio)
- Limit the use of accent pixel font to specific brand moments

---

## Grid System

### Dimensional Grid Framework

Our grid system is based on an 8-point grid with quantum-spatial dimensional characteristics:

- **Base Unit**: 8px
- **Spacing Increments**: 8px, 16px, 24px, 32px, 40px, 48px, 64px
- **Container Padding**: 24px (mobile), 32px (tablet), 40px (desktop)
- **Column Structure**: 4 columns (mobile), 8 columns (tablet), 12 columns (desktop)

### Grid Characteristics

- **Primary Grid**: Visible organizational structure (15-20% opacity)
- **Dimensional Grid**: Secondary grid with perspective effect (8-12% opacity)
- **Quantum Alignment**: Elements align precisely to the grid, with occasional deliberate breaks to show "quantum leaps"

### Implementation Rules

- Implement grid fade based on distance from viewpoint
- Use parallax effects sparingly and with natural physics
- Maintain consistent line weight appropriate to the application
- Grid should provide spatial organization without visual dominance

---

## Component Design

### Material Properties

### Surface Types

- **Quantum Surfaces**
    - Roughness: 0.1-0.3 (highly reflective)
    - Metallic: 0.7-0.9 (metallic appearance)
    - Emission: Variable intensity based on state
    - Normal detail: Subtle geometric patterns
- **Grid Surfaces**
    - Roughness: 0.4-0.6 (semi-reflective)
    - Metallic: 0.3-0.5 (moderately metallic)
    - Emission: Edge highlighting only
    - Normal detail: Linear grid patterns
- **Heritage Elements**
    - Roughness: 0.7-0.9 (matte appearance)
    - Metallic: 0.0-0.2 (non-metallic)
    - Emission: None or minimal
    - Normal detail: Pixel-based stepping

### Lighting System

- **Key Light Direction**: Upper right at 45° (standard)
- **Shadow Properties**: 30-45% soft shadows for dimensional weight
- **Environmental Reflections**: Subtle reflections suggesting surrounding space
- **Atmospheric Effects**: Limited atmospheric depth without fog overuse

### Component States

All interactive components should implement multiple states:

1. **Default/Rest State**
    - Subtle gradient application
    - Dimensional depth through shadows
    - Clear affordance for interaction
2. **Hover State**
    - Slight emission increase (10-15%)
    - Subtle scale increase (1-2%)
    - Optional micro-animation
3. **Active/Pressed State**
    - Scale decrease (1-2%)
    - Shadow depth decrease
    - Brief emission flash followed by dimming
4. **Focus State**
    - Outline using Subtle Cyan (#5AC8FA)
    - No scale change
    - Subtle pulse animation (single occurrence)
5. **Disabled State**
    - Reduced opacity (40%)
    - Flattened appearance (reduced shadow)
    - Desaturation effect

### Standard Component Library

### Foundation Components

- **Quantum Button**
    - Primary, Secondary, Tertiary, and Destructive variants
    - Configurable size (Small, Medium, Large)
    - Optional leading and trailing icons
    - Full state implementation
- **Quantum Input Field**
    - Default, Active, Filled, Error, and Disabled states
    - Integrated validation visualization
    - Optional leading icon and trailing action
- **Quantum Card**
    - Variable depth levels (1-3)
    - Optional hover interactions
    - Content organization grid
    - Header/footer treatment options

### Navigation Components

- **Quantum Tab Bar**
    - iOS-style bottom tab bar with quantum visual treatment
    - State transition animations between tabs
    - Badge support for notifications
    - Optional labels
- **Quantum Menu**
    - Hierarchical menu structure
    - Quantum transition animations
    - Support for icons, keyboard shortcuts
    - Submenu handling
- **Quantum Modal**
    - Multiple size options
    - Entrance/exit animations
    - Backdrop interaction handling
    - Content organization templates

---

## Motion Principles

### Animation Categories

| Category | Duration Range | Frame Rate | Appropriate Uses |
| --- | --- | --- | --- |
| **Micro-interactions** | 100-200ms | 60fps | Buttons, toggles, small state changes |
| **Functional Animations** | 200-500ms | 60fps | Navigation, selection, focus changes |
| **Narrative Animations** | 500-3000ms | 30-60fps | Storytelling, transitions, reveals |
| **Ambient Animations** | 2000ms+ | 30fps | Background elements, energy flows, subtle motion |
| **Loading Animations** | Indefinite | 30fps | Progress indicators, wait states, download status |

### State Transitions

| Transition Type | Duration | Easing | Notes |
| --- | --- | --- | --- |
| Button Hover | 150ms | ease-out | Subtle scale (1.02x) |
| Button Press | 100ms | ease-in | Scale reduction (0.98x) |
| Selection Change | 200ms | ease-in-out | Color shift + subtle movement |
| Page Transition | 350ms | ease-in-out | Multi-stage animation |
| Modal Appearance | 250ms | ease-out | Fade + scale from 0.9 to 1.0 |
| Notification | 300ms | ease-out, bounce | Entry + attention animation |
| Menu Expansion | 200ms | ease-out | Reveal + subtle bounce |
| Quantum State Shift | 400ms | custom cubic-bezier | Multi-property transition |

### Animation Principles

1. **Dimensional Coherence**
    - Animations should respect the established spatial dimensions
    - Elements closer to the viewer move faster than distant elements
    - Transitions consider z-depth for timing and easing
2. **Quantum Fluidity**
    - State changes should feel smooth yet slightly unexpected
    - Use subtle "quantum jumps" for emphasis
    - Incorporate material property changes during transitions
3. **Energy Conservation**
    - Animations should not waste user attention
    - Ambient animations should be subtle and purpose-driven
    - Reserve high-energy animations for significant events
4. **Accessibility First**
    - All animations must respect reduced motion preferences
    - Critical information must never depend solely on animation
    - Provide static alternatives for essential animated content

---

## Expanded Design Tokens for Your Quantum-Spatial System

Here's a comprehensive set of design tokens based on your style guide:

```css
:root {
  /* COLOR: Primary Foundation */
  --color-void-black: #0A0621;
  --color-deep-space-indigo: #131A36;
  --color-ultra-indigo: #1E1F5C;
  --color-dimensional-eggplant: #331F4A;
  --color-midnight-richness: #0D0D15;
  --color-quantum-violet: #6A3093;

  /* COLOR: Secondary Accents */
  --color-subtle-aqua: #06D6A0;
  --color-subtle-cyan: #5AC8FA;
  --color-dimensional-teal: #126D71;
  --color-rose-energy: #BF4080;
  --color-dimensional-orange: #FF6B6B;
  --color-heritage-green: #2C5F2D;
  --color-heritage-green-light: #3D8B40;
  --color-heritage-green-dark: #1B3D1A;

  /* OPACITY: Standard states */
  --opacity-subtle: 0.7;
  --opacity-very-subtle: 0.3;
  --opacity-hover: 0.85;
  --opacity-active: 0.95;
  --opacity-disabled: 0.5;

  /* SPACING: Base grid system */
  --space-quantum: 4px;  /* Base unit */
  --space-xs: 8px;       /* 2 * quantum */
  --space-sm: 12px;      /* 3 * quantum */
  --space-md: 16px;      /* 4 * quantum */
  --space-lg: 24px;      /* 6 * quantum */
  --space-xl: 32px;      /* 8 * quantum */
  --space-xxl: 48px;     /* 12 * quantum */

  /* BORDERS & RADII */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;

  /* SHADOWS */
  --shadow-subtle: 0 2px 4px rgba(10, 6, 33, 0.2);
  --shadow-medium: 0 4px 8px rgba(10, 6, 33, 0.3);
  --shadow-prominent: 0 8px 16px rgba(10, 6, 33, 0.4);

  /* GRADIENTS (as CSS variables) */
  --gradient-quantum-depth: linear-gradient(to right, var(--color-deep-space-indigo), var(--color-dimensional-eggplant), var(--color-quantum-violet));
  --gradient-spatial-background: linear-gradient(to bottom, var(--color-void-black), var(--color-deep-space-indigo));
  --gradient-energy-transition: linear-gradient(45deg, var(--color-heritage-green), var(--color-deep-space-indigo), var(--color-subtle-cyan));
  --gradient-spiritual-state: linear-gradient(to right, var(--color-dimensional-orange), var(--color-rose-energy), var(--color-subtle-cyan));

  /* TYPOGRAPHY: Font families */
  --font-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'SF Mono', monospace;

  /* TYPOGRAPHY: Font weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semi-bold: 600;
  --font-weight-bold: 700;

  /* TYPOGRAPHY: Font sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;
  --font-size-display: 48px;

  /* ANIMATION: Timing */
  --transition-fast: 150ms;
  --transition-medium: 300ms;
  --transition-slow: 500ms;

  /* ANIMATION: Easing */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-quantum: cubic-bezier(0.16, 1, 0.3, 1);  /* Custom "energetic" easing */
}

```

## Visualizing Your Token System

## Implementation Across Platforms

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

## Difference Between CSS Variables and Design Tokens

The CSS variables in your example are the implementation of design tokens for web platforms. The difference is:

- **Design Tokens** are the abstract, platform-agnostic design values
- **CSS Variables** are one method of implementing design tokens (for web)
- **SwiftUI Constants** would be another implementation (for iOS)

The section you highlighted contains design tokens implemented as CSS variables, but a complete design token system would include all visual attributes and have implementations for each platform.

## Benefits of This Approach

1. **Single Source of Truth**: Update one value to change it everywhere
2. **Cross-Platform Consistency**: Maintain your quantum-spatial aesthetic across web and iOS
3. **Simplified Maintenance**: Easier updates and changes to the design system
4. **Improved Developer Experience**: Clear naming and organization

Would you like me to expand on any specific area of design tokens or help with implementing them in a particular context?

## Platform-Specific Implementation

### For iOS Games

- **Visual Treatment**
    - Use Subtle Cyan (#5AC8FA) for primary CTAs and interactive elements
    - Implement Quantum Depth Gradient for navigation elements
    - Apply Spiritual State Transitions for magical effects and special abilities
    - Save Rose Energy (#BF4080) for critical notifications and important game events
- **Interaction Design**
    - Optimize touch targets (minimum 44px × 44px)
    - Implement haptic feedback for key interactions
    - Support dynamic type for accessibility
    - Design for both portrait and landscape orientations
- **Performance Optimization**
    - Minimize shader complexity for battery efficiency
    - Implement asset preloading for smooth transitions
    - Use GPU instances for repeated elements
    - Optimize animations for 60fps minimum

### For Framer SaaS Products

- **Visual Treatment**
    - Use Subtle Cyan (#5AC8FA) consistently for primary buttons and interactive components
    - Apply Spatial Background Gradient for content cards and containers
    - Implement Material State Variation for hover/active states
    - Reserve Spiritual State Transitions for data visualization and celebratory moments
- **Interaction Design**
    - Design for both mouse and touch interactions
    - Implement appropriate hover states and touch feedback
    - Use progressive disclosure for complex features
    - Support keyboard navigation and shortcuts
- **Performance Optimization**
    - Minimize JavaScript execution time
    - Implement code splitting for faster initial load
    - Use CSS transitions instead of JavaScript where possible
    - Optimize asset delivery with responsive images

### For Vision Pro Experiences

- **Visual Treatment**
    - Use spatial depth for UI layer organization
    - Apply subtle atmospheric effects for depth perception
    - Implement directional lighting that responds to head movement
    - Reserve Spiritual State Transitions for key moments and interactions
- **Interaction Design**
    - Design for both hand and eye tracking interactions
    - Implement comfortable viewing distances for UI elements
    - Use subtle audio cues to reinforce interactions
    - Create appropriate feedback for gesture recognition
- **Performance Optimization**
    - Minimize draw calls through batching
    - Use LOD (Level of Detail) for complex elements
    - Optimize shader complexity for thermal efficiency
    - Implement progressive loading of spatial elements

### For Brand Website

- **Visual Treatment**
    - Use Quantum Depth Gradient for section backgrounds
    - Implement Subtle Cyan (#5AC8FA) for all CTAs and links
    - Apply Energy State Transition for animated elements
    - Use Deep Spatial Background for the site background
- **Interaction Design**
    - Design for cross-device compatibility
    - Implement smooth scrolling transitions
    - Use micro-interactions to enhance engagement
    - Support keyboard navigation and screen readers
- **Performance Optimization**
    - Optimize for Core Web Vitals
    - Implement lazy loading for images and components
    - Use appropriate image formats (WebP with fallbacks)
    - Minimize main thread blocking operations
