# Quantum-Spatial Primitive Color System

## Architecture

**3-Tier Token System:**
1. **Primitives** (this file) - Raw color values
2. **Semantic** (colors.css) - Purpose-based tokens
3. **Component** (component-specific overrides)

## Sources Merged

- **Design+Code UI Kit**: Base color scales (50-900)
- **Apple Tahoe 26**: System colors, grays
- **Vision Pro 2**: Glassmorphism alphas, materials
- **Quantum-Spatial Theme**: Vivid purples, deep blacks, lime accents

## Optimizations

- **M4 Neural Engine**: Vivid purples optimized for wide-gamut processing
- **OLED**: Deep quantum blacks (#0b010d, #160918, #16090e)
- **Glassmorphism**: 10+ alpha variants for each base color
- **Vision Pro**: Glass-specific materials (glass-light through glass-ultra)

## Usage in Figma

1. Import `primitives-figma.json` via Figma Variables plugin
2. Your semantic colors will auto-resolve references
3. Update primitives here, re-import to cascade changes

## P3 Wide-Gamut

These colors benefit from P3:
- quantum-purple-500: #7b00ff
- quantum-purple-600: #911efa  
- lime-primary: #cdff00
- All vivid accent colors (indigo, purple, cyan)

## Color Count

- **Base scales**: 15 colors
- **Alpha variants**: 5 sets
- **System colors**: 14
- **Quantum theme**: 12
- **Total**: 210 primitive tokens
