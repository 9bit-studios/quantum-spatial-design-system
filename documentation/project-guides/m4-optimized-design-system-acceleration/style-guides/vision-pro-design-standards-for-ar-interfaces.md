# Vision Pro Design Standards for AR Interfaces

## Standard Aspect Ratios and Resolutions

Your Figma Apple UI kit provides good starting points:

- **Floating Windows**: 1280 × 720 (16:9)
- **Shared Space**: 1920 × 1080 (16:9)

While these are useful for initial design work, they're simplified versions of what the visionOS actually renders.

## Apple's Official Recommendations

Apple officially recommends designing VisionOS interfaces with these considerations:

1. **Window Resolution**: The system handles window sizes dynamically based on user preferences and viewing distance
2. **Dynamic Scaling**: Content scales based on where the user places the window in their space
3. **Material Depth**: Interface elements have physical depth properties (0.1-20mm)
4. **Spatial Canvas**: Think in terms of volume (3D space) rather than screen real estate

## Transition from Floating UI to Immersive Experiences

For your game that will transition from floating UI to fully immersive:

1. **Start with Standard Windows**: Begin with the 1280 × 720 format for core interface
2. **Design for Volumetric Expansion**: Plan how 2D elements will transition to 3D space
3. **Consider Environmental Context**: Design for both bright and dark environments
4. **Account for Multi-User Views**: Consider how shared experiences affect the interface

## Practical Approach for Game Development

1. **Two-Track Design System**:
    - Create 2D UI components (buttons, menus) using standard formats
    - Develop 3D equivalents that maintain visual consistency but exist in space
2. **Material and Depth Guidelines**:
    - Use depth to create information hierarchy
    - Standard UI elements: 0.1-1mm depth
    - Key interactive elements: 1-3mm depth
    - Featured objects: 3-10mm depth
3. **Environment Design**:
    - Define a spatial boundary for your immersive world (typically 20m diameter)
    - Create adaptive lighting for different real-world environments
    - Design interaction zones that work for seated and standing play

## iOS and Vision Pro Coordination

For coordinating between iOS and Vision Pro versions:

1. **Shared Asset Pipeline**: Use scalable assets that work in both contexts
2. **Consistent Interaction Model**: Design gestures that translate between touch and spatial
3. **Progressive Enhancement**: Start with iOS-compatible features, then enhance for Vision Pro
4. **SwiftUI for Both Platforms**: Leverage SwiftUI's adaptive layout capabilities

## Quick Reference Guide

| Element Type | Floating UI Size | Immersive Equivalent | Material Depth |
| --- | --- | --- | --- |
| Main Window | 1280 × 720 | 20m environment | n/a |
| Menus | Standard iOS sizing | 3D panels at arm's length | 1-2mm |
| Buttons | 44pt minimum touch | Hand-sized interactive volumes | 2-3mm |
| Text | 17pt minimum | Optimized for 40-70cm viewing | 0.1-1mm |
| Game Objects | Screen-constrained | Full spatial placement | 3-20mm |

This approach gives you a flexible framework that allows your game to work well in both floating window mode and fully immersive experiences.