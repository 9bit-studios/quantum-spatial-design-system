# Figma/Framer to Quantum-Spatial Base Color Extraction Strategy

**Version**: 1.0.0
**Last Updated**: 2025-11-27
**Purpose**: Extract real design values from Figma/Framer projects and map them to quantum-pixel-base.svg foundation

---

## 🎯 Mission

Replace generated design tokens with **your actual Figma/Framer design values** to establish the true base colors for the quantum-spatial pixel generation system.

---

## 📊 Current State Analysis

### What We Have Now

#### 1. **Real CSS Variables** (`fresh-glass-theme/tokens/variables.css`)
Your production-ready design system with:

```css
/* Foundation Colors - YOUR REAL VALUES */
--color-void-black: #0A0621
--color-deep-space-indigo: #131A36
--color-ultra-indigo: #1E1F5C
--color-dimensional-eggplant: #331F4A
--color-midnight-richness: #0D0D15
--color-quantum-violet: #6A3093
--color-ultra-marine: #405DE5
--color-ultra-violet: #613FE7

/* Secondary Accents */
--color-subtle-cyan: #5AC8FA
--color-dimensional-teal: #126D71
--color-rose-energy: #BF4080
--color-quantum-pulse-pink: #FF2D55
--color-dimensional-orange: #FF6B6B

/* Heritage System */
--color-heritage-green: #2C5F2D
--color-heritage-green-light: #3D8B40
--color-heritage-green-dark: #1B3D1A
--color-heritage-pixel-green: #3DFF74
--color-heritage-pixel-aqua: #00FFC8
--color-ultra-heritage-pixel-green: #94FE00
```

#### 2. **Figma Color System** (`variables-colors.css`)
Your Figma-exported color specifications including:
- **Primary Foundation**: Void Black, Deep Space Night, Dimensional Marine
- **Variant Foundation**: Void Violet, Deep Space Violet, Dimensional Violet
- **Foundation Layers**: Secondary, Tertiary, Quaternary, Primary Foreground
- **State Colors**: Ultra Marine, Pixel Marine, Liquid Marine
- **Quantum States**: Ultra Violet, Pixel Violet, Liquid Violet
- **Energy States**: Ultra Pink, Pixel Pink, Dimensional Pink
- **Heritage States**: Pixel Green, Plasma Green

#### 3. **Framer Design Tokens** (`framer-tokens.json`)
Your simplified Framer variables:

```json
{
  "colors": {
    "primaryQuantum": "#BF4080",
    "primaryUltraMarine": "#5AC8FA",
    "primaryViolet": "#6A3093",
    "foundationHeritage": "#331F4A",
    "foundationDarkMatter": "#131A36",
    "foundationCosmicDust": "#1A0D26",
    "glassFrosted": "rgba(255, 255, 255, 0.1)",
    "glassShimmer": "rgba(191, 64, 128, 0.2)",
    "glassGlow": "rgba(90, 200, 250, 0.3)"
  }
}
```

#### 4. **SVG Base Pixels** (`quantum-pixel-base.svg` + `quantum-spatial-colors.svg`)
Currently has **generated gradients** that need to use **your real color values**.

---

## 🔄 The Gap: Generated vs Real

### Current Problem

The SVG base pixels use **generic generated colors**:

```xml
<!-- quantum-spatial-colors.svg - CURRENT (GENERATED) -->
<linearGradient id="void-black" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#0A0621" />
  <stop offset="100%" stop-color="#070417" />
</linearGradient>
```

### What We Need

The SVG base pixels should use **your actual validated colors**:

```xml
<!-- quantum-spatial-colors.svg - TARGET (YOUR REAL VALUES) -->
<linearGradient id="void-black" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#0A0621" />  <!-- From variables.css -->
  <stop offset="100%" stop-color="#000000" />  <!-- From Figma Void Black -->
</linearGradient>
```

---

## 🛠️ Extraction Strategy

### Phase 1: Color Value Mapping (Immediate)

Create a **master color mapping table** from your three sources:

| Color Name | CSS Variable | Figma Value | Framer Token | Use In Base |
|------------|--------------|-------------|--------------|-------------|
| **Void Black** | `#0A0621` | `#000000` | - | Primary background |
| **Deep Space Indigo** | `#131A36` | `#131A36` | `#131A36` (foundationDarkMatter) | Heritage state bg |
| **Dimensional Eggplant** | `#331F4A` | `#331F4A` | `#331F4A` (foundationHeritage) | Quantum state bg |
| **Quantum Violet** | `#6A3093` | - | `#6A3093` | Quantum gradient |
| **Ultra Marine** | `#405DE5` | `#512CF9` | - | Transitional state |
| **Subtle Cyan** | `#5AC8FA` | `#3CD3FE` | `#5AC8FA` | Primary action |
| **Rose Energy** | `#BF4080` | - | `#BF4080` | Quantum accent |
| **Heritage Green** | `#2C5F2D` | `#2C5F2D` | - | Heritage core |
| **Heritage Pixel Green** | `#3DFF74` | `#3DFF74` | - | Heritage energy |

### Phase 2: Gradient Reconstruction

Map your **real gradient definitions** from CSS to SVG:

#### Example: Heritage State Gradient

**CSS Source** (`variables.css` lines 43-46):
```css
--gradient-heritage-state: linear-gradient(135deg,
  var(--color-heritage-green-dark),  /* #1B3D1A */
  var(--color-heritage-green),       /* #2C5F2D */
  var(--color-heritage-green-light)); /* #3D8B40 */
```

**SVG Target** (`quantum-spatial-colors.svg`):
```xml
<!-- Heritage State Gradients -->
<linearGradient id="heritage-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#1B3D1A" />   <!-- heritage-green-dark -->
  <stop offset="50%" stop-color="#2C5F2D" />  <!-- heritage-green -->
  <stop offset="100%" stop-color="#3D8B40" /> <!-- heritage-green-light -->
</linearGradient>
```

### Phase 3: Figma MCP Integration

Use the **Figma MCP server** (already running in background) to extract:

1. **Variable Collections**: Get all Figma color variables programmatically
2. **Style Nodes**: Extract gradient definitions from components
3. **Design Tokens**: Pull semantic color mappings

**Script to create** (`extract-figma-variables.ts`):

```typescript
import { FigmaMCPClient } from '@figma-mcp/sdk';

async function extractFigmaColorVariables() {
  const figma = new FigmaMCPClient();

  // 1. Get file variables
  const variables = await figma.getFileVariables({
    fileKey: 'YOUR_FIGMA_FILE_KEY'
  });

  // 2. Extract color values
  const colorMap = {};
  for (const [varId, varData] of Object.entries(variables)) {
    if (varData.resolvedType === 'COLOR') {
      const { r, g, b, a } = varData.valuesByMode.default;
      const hex = rgbaToHex(r, g, b, a);
      colorMap[varData.name] = hex;
    }
  }

  // 3. Map to quantum-spatial names
  const quantumColors = {
    'void-black': colorMap['Foundation/Void Black'],
    'deep-space-indigo': colorMap['Foundation/Deep Space Indigo'],
    'dimensional-eggplant': colorMap['Foundation/Dimensional Eggplant'],
    // ... etc
  };

  return quantumColors;
}
```

### Phase 4: Framer Component Extraction

Extract **styled components** from Framer:

1. **Component Props**: Get color overrides from Framer components
2. **Design Settings**: Pull `design.settings.ts` values (if present)
3. **CSS Modules**: Extract CSS-in-JS styles

**Framer extraction approach**:

```typescript
// If you have Framer source code access
import { PremiumQuantumSpatial } from './PremiumQuantumSpatial';

const premiumColors = {
  heritage: {
    bg: "#0A0D0A",
    surface: "#1A1E1A",
    text: "#E8F4E8",
    accent: "#2C5F2D",
    border: "#1B3D1A",
  },
  transitional: {
    bg: "#0A0C15",
    surface: "#151825",
    text: "#E8EDF8",
    accent: "#405de5",
    border: "#1E1F3A",
  },
  quantum: {
    bg: "#0D0D15",
    surface: "#1A1A25",
    text: "#F0F0F5",
    accent: "#5A4B93",
    border: "#2A1F3A",
  },
};
```

---

## 📝 Implementation Plan

### Step 1: Create Master Color Registry

**File**: `/m4-acceleration/foundation/color-registry.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-11-27",
  "sources": {
    "css": "fresh-glass-theme/tokens/variables.css",
    "figma": "variables-colors.css",
    "framer": "design-tokens/exports/framer-tokens.json"
  },
  "colors": {
    "foundation": {
      "void-black": {
        "primary": "#0A0621",
        "dark": "#000000",
        "sources": ["css", "figma"]
      },
      "deep-space-indigo": {
        "primary": "#131A36",
        "sources": ["css", "figma", "framer"]
      },
      "dimensional-eggplant": {
        "primary": "#331F4A",
        "sources": ["css", "figma", "framer"]
      }
    },
    "quantum-states": {
      "heritage": {
        "core": "#2C5F2D",
        "light": "#3D8B40",
        "dark": "#1B3D1A",
        "pixel": "#3DFF74",
        "sources": ["css", "figma"]
      },
      "transitional": {
        "core": "#405DE5",
        "light": "#5AC8FA",
        "dark": "#1E1F5C",
        "sources": ["css", "framer"]
      },
      "quantum": {
        "core": "#6A3093",
        "light": "#BF4080",
        "dark": "#331F4A",
        "pixel": "#FF2D55",
        "sources": ["css", "figma", "framer"]
      }
    },
    "accents": {
      "cyan": "#5AC8FA",
      "teal": "#126D71",
      "pink": "#BF4080",
      "violet": "#6A3093",
      "orange": "#FF6B6B",
      "sources": ["css", "figma"]
    }
  }
}
```

### Step 2: Update SVG Base Pixels

Create script: `/m4-acceleration/scripts/update-base-colors.ts`

```typescript
import fs from 'fs';
import path from 'path';
import colorRegistry from '../foundation/color-registry.json';

function updateQuantumSpatialColors() {
  const svgPath = '/m4-acceleration/foundation/quantum-pixels/quantum-spatial-colors.svg';
  let svgContent = fs.readFileSync(svgPath, 'utf-8');

  // Replace void-black gradient
  svgContent = svgContent.replace(
    /<linearGradient id="void-black".*?<\/linearGradient>/s,
    `<linearGradient id="void-black" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="${colorRegistry.colors.foundation['void-black'].primary}" />
  <stop offset="100%" stop-color="${colorRegistry.colors.foundation['void-black'].dark}" />
</linearGradient>`
  );

  // Replace heritage gradients
  const heritage = colorRegistry.colors['quantum-states'].heritage;
  svgContent = svgContent.replace(
    /<linearGradient id="heritage-gradient-primary".*?<\/linearGradient>/s,
    `<linearGradient id="heritage-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="${heritage.dark}" />
  <stop offset="50%" stop-color="${heritage.core}" />
  <stop offset="100%" stop-color="${heritage.light}" />
</linearGradient>`
  );

  // Write updated SVG
  fs.writeFileSync(svgPath, svgContent);
  console.log('✅ Updated quantum-spatial-colors.svg with real values');
}

updateQuantumSpatialColors();
```

### Step 3: Validate Against All Sources

Create validation script: `/m4-acceleration/scripts/validate-color-sources.ts`

```typescript
import cssVars from '../../fresh-glass-theme/tokens/variables.css';
import framerTokens from '../design-tokens/exports/framer-tokens.json';
import colorRegistry from '../foundation/color-registry.json';

function validateColorConsistency() {
  const report = {
    matches: [],
    conflicts: [],
    missing: []
  };

  // Check CSS vs Registry
  for (const [name, data] of Object.entries(colorRegistry.colors.foundation)) {
    const cssValue = cssVars[`--color-${name}`];
    if (cssValue === data.primary) {
      report.matches.push({ source: 'css', color: name });
    } else {
      report.conflicts.push({
        color: name,
        css: cssValue,
        registry: data.primary
      });
    }
  }

  // Check Framer vs Registry
  // ... similar validation

  return report;
}
```

---

## 🚀 Automated Extraction Workflow

### Option A: MCP-Based Extraction (Recommended)

Since you have **Figma MCP server running**, use it:

```bash
# Start extraction
cd /quantum-spatial/design-system/m4-acceleration
npx tsx scripts/extract-figma-to-base.ts --file-key YOUR_FIGMA_KEY
```

Script will:
1. Connect to Figma MCP server
2. Extract all color variables
3. Map to quantum-spatial naming
4. Update `color-registry.json`
5. Regenerate `quantum-spatial-colors.svg`
6. Validate against CSS and Framer sources

### Option B: Manual CSV Export

If MCP extraction is complex:

1. Export Figma variables as CSV
2. Parse CSV → JSON color registry
3. Run update script

---

## 🎨 Priority Color Mappings

### Critical Base Colors (Replace First)

| Quantum-Spatial ID | Your Real Color | Source Priority |
|--------------------|-----------------|-----------------|
| `void-black` | `#0A0621` → `#000000` | CSS + Figma |
| `heritage-gradient-primary` | `#1B3D1A` → `#2C5F2D` → `#3D8B40` | CSS |
| `quantum-gradient-primary` | `#331F4A` → `#6A3093` | CSS + Framer |
| `transitional-gradient-primary` | `#1E1F5C` → `#405DE5` → `#5AC8FA` | CSS + Framer |
| `subtle-cyan` | `#5AC8FA` | CSS + Framer (primaryUltraMarine) |
| `rose-energy` | `#BF4080` | CSS + Framer (primaryQuantum) |

### Secondary Mappings (Nice to Have)

- Glass backgrounds (use Framer `glassFrosted`, `glassShimmer`, `glassGlow`)
- Semantic colors (success, warning, error from CSS)
- Particle colors (heritage-pixel-green, quantum-pulse-pink)

---

## 📊 Validation Checklist

Before deploying updated base pixels:

- [ ] All foundation colors map to at least one source (CSS, Figma, or Framer)
- [ ] Gradient stop counts match between CSS and SVG
- [ ] Opacity values preserved for glass effects
- [ ] Heritage/Transitional/Quantum state colors are distinct
- [ ] PremiumQuantumSpatial.tsx component colors match base pixels
- [ ] No generated placeholder colors remain (e.g., `#FF00FF`)
- [ ] Color names are semantically meaningful (not "color-1", "color-2")
- [ ] All `@import` statements in quantum-pixel-base.svg resolve correctly

---

## 🔧 Tools You'll Need

1. **Figma MCP Server** (already running) - Extract Figma variables
2. **CSS Parser** - Read `variables.css` programmatically
3. **SVG Modifier** - Update gradient definitions in base SVGs
4. **Color Converter** - RGB → Hex, RGBA → Hex + opacity
5. **Validation Script** - Compare all three sources

---

## 🎯 Success Metrics

You'll know extraction is complete when:

1. ✅ `color-registry.json` has all colors with source attribution
2. ✅ `quantum-spatial-colors.svg` uses only your real color values
3. ✅ Validation script shows 0 conflicts across CSS/Figma/Framer
4. ✅ PremiumQuantumSpatial component renders with correct brand colors
5. ✅ Quantum pixel generators use `<use href="#id"/>` instead of recreating colors
6. ✅ All three quantum states (Heritage/Transitional/Quantum) are visually distinct

---

## 📁 Next Steps

1. **Create `color-registry.json`** with manual mapping from this document
2. **Write `extract-figma-variables.ts`** to automate Figma extraction
3. **Run `update-base-colors.ts`** to regenerate SVG with real values
4. **Validate** with `validate-color-sources.ts`
5. **Test** PremiumQuantumSpatial component with updated base pixels
6. **Deploy** to Cloudflare Worker at `design-system.9bitstudios.io`

---

**🚀 Once complete, your quantum-spatial pixel generation system will use YOUR ACTUAL BRAND COLORS, not generated placeholders.**
