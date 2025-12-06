 # 9Bit Studios Quantum-Spatial Design System Style Guide

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

</aside>

## Brand Foundation

<aside>
<img src="notion://custom_emoji/dcb6af8e-60f9-4328-8f25-514f7ccf8d4c/1d8c7f76-af88-809e-b8b9-007a1e91cb5e" alt="notion://custom_emoji/dcb6af8e-60f9-4328-8f25-514f7ccf8d4c/1d8c7f76-af88-809e-b8b9-007a1e91cb5e" width="40px" />

The 9Bit Studios visual identity centers around the concept of the "quantum pixel"—a visual element existing in multiple states simultaneously, representing our position at the intersection of gaming heritage and technological advancement.

</aside>

### Quantum Pixel States

- **Heritage State**: Flat, orthogonal pixels referencing the 8-bit era
- **Transitional State**: Pixels gaining dimensional properties
- **Quantum State**: Fully evolved volumetric elements with sophisticated material properties
- **Superposition State**: Elements appearing in multiple positions/states simultaneously

## Color System

Our color palette creates harmony between nostalgic resonance and cutting-edge aesthetics.

### Primary Foundation Colors

- **Void Black** (`#0A0621`) - Deep void black for environments
- **Deep Space Indigo** (`#131A36`) - Sophisticated base for UI
- **Ultra Indigo** (`#1E1F5C`) - Deep accent for dimensional depth
- **Dimensional Eggplant** (`#331F4A`) - Primary UI foundation
- **Midnight Richness** (`#0D0D15`) - Deep foundation with subtle color
- **Quantum Violet** (`#6A3093`) - Key accent color
- **Ultra Violet** (`#613FE7`) - Button and accent color
- **Ultra Marine** (`#405de5`) - Accent color

### Secondary Accent Colors

- **Subtle Aqua** (`#00FFC8`) - Refined highlights and transitions
- **Subtle Cyan** (`#5AC8FA`) - Primary UI action color
- **Dimensional Teal** (`#126D71`) - Secondary UI accent
- **Rose Energy** (`#BF4080`) - Limited highlight CTA
- **Quantum Pulse Pink** (`#FF2D55`) - Energy transition activator
- **Dimensional Orange** (`#FF6B6B`) - Limited important highlights
- **Heritage Green Core** (`#2C5F2D`) - Gaming heritage reference
- **Heritage Green Dark** (`#1B3D1A`) - Gaming heritage reference
- **Heritage Green Light** (`#33FF66`) - Gaming heritage reference
- **Heritage Pixel Green** (`#3DFF74`) - Gaming heritage reference

### Color Application Rules

- Maintain Deep Space Indigo and Dimensional Eggplant as dominant colors (60-70% of composition)
- Limit accent colors to 10-15% of any composition
- Implement at least one subtle gradient in every significant brand element
- Use directional lighting to create natural color variation
- Replace true black with Midnight Richness in all applications

## Typography

### Primary Typefaces

**For Apple Native Platforms:**

- SF Pro (Apple's system font)
    - Headlines: SF Pro Display SemiBold
    - Subheadings: SF Pro Display Medium
    - Body: SF Pro Text Regular
    - UI Elements: SF Pro Text Regular/Medium

**For Web & Framer Applications:**

- Clash Grotesk
    - Headlines: Clash Grotesk SemiBold
    - Subheadings: Clash Grotesk Medium
    - Body: Clash Grotesk Regular
    - UI Elements: Clash Grotesk Regular/Medium

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

## Grid System

### Dimensional Grid Framework

- **Base Unit**: 8px
- **Spacing Increments**: 8px, 16px, 24px, 32px, 40px, 48px, 64px
- **Container Padding**: 24px (mobile), 32px (tablet), 40px (desktop)
- **Column Structure**: 4 columns (mobile), 8 columns (tablet), 12 columns (desktop)

### Grid Characteristics

- **Primary Grid**: Visible organizational structure (15-20% opacity)
- **Dimensional Grid**: Secondary grid with perspective effect (8-12% opacity)
- **Quantum Alignment**: Elements align precisely to the grid, with occasional deliberate breaks to show "quantum leaps"

## Component Design

### Material Properties

### Surface Types

- **Quantum Surfaces**
    - Highly reflective (roughness: 0.1-0.3)
    - Metallic appearance (metallic: 0.7-0.9)
    - Variable emission intensity based on state
    - Subtle geometric patterns
- **Grid Surfaces**
    - Semi-reflective (roughness: 0.4-0.6)
    - Moderately metallic (metallic: 0.3-0.5)
    - Edge highlighting emission only
    - Linear grid patterns
- **Heritage Elements**
    - Matte appearance (roughness: 0.7-0.9)
    - Non-metallic (metallic: 0.0-0.2)
    - Minimal emission
    - Pixel-based stepping patterns

### Lighting System

- **Key Light Direction**: Upper right at 45° (standard)
- **Shadow Properties**: 30-45% soft shadows for dimensional weight
- **Environmental Reflections**: Subtle reflections suggesting surrounding space
- **Atmospheric Effects**: Limited atmospheric depth without fog overuse

### Component States

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

## Motion Principles

### Animation Categories

| Category | Duration Range | Frame Rate | Appropriate Uses |
| --- | --- | --- | --- |
| **Micro-interactions** | 100-200ms | 60fps | Buttons, toggles, small state changes |
| **Functional Animations** | 200-500ms | 60fps | Navigation, selection, focus changes |
| **Narrative Animations** | 500-3000ms | 30-60fps | Storytelling, transitions, reveals |
| **Ambient Animations** | 2000ms+ | 30fps | Background elements, energy flows, subtle motion |
| **Loading Animations** | Indefinite | 30fps | Progress indicators, wait states, download status |

### Animation Principles

1. **Dimensional Coherence**
    - Animations respect established spatial dimensions
    - Elements closer to viewer move faster than distant elements
    - Transitions consider z-depth for timing and easing
2. **Quantum Fluidity**
    - State changes feel smooth yet slightly unexpected
    - Subtle "quantum jumps" for emphasis
    - Material property changes during transitions
3. **Energy Conservation**
    - Animations don't waste user attention
    - Ambient animations remain subtle and purposeful
    - High-energy animations reserved for significant events
4. **Accessibility First**
    - All animations respect reduced motion preferences
    - Critical information never depends solely on animation
    - Static alternatives provided for essential animated content

### Supporting files

[](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)

---

- **Document History**
    
    
    | Version | Date | Author | Changes |
    | --- | --- | --- | --- |
    | 0.1 | May 1, 2025  | @Penny Platt  | Initial Creation |
    
    [9Bit Studios Quantum-Spatial Design System Style Guide v1.0](9Bit%20Studios%20Quantum-Spatial%20Design%20System%20Style%20G%201e7c7f76af8880d9a313cf7a85172120/9Bit%20Studios%20Quantum-Spatial%20Design%20System%20Style%20G%201cbc7f76af88806f990ee09bee690321.md)
    
    *This document follows 9Bit Studios' quantum-spatial design principles and documentation standards.*
    

*© 2025 9Bit Studios. All rights reserved.*
