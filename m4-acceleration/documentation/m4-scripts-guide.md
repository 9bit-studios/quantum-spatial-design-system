# M4 Acceleration Scripts - Complete Guide
## Understanding What Each Script Does & How to Use Them

**Created:** 2025-01-19
**Status:** Clarification Document

---

## 🎯 Quick Answer to Your Questions

### Are all scripts ES modules?
✅ **YES** - All scripts use ES module syntax (`export`, `import`)

### Does svg-batch-processor need to move to asset-pipeline?
✅ **YES** - That would be the logical location per the architecture

### Which scripts actually generate output?
- ✅ **`quantum-pixel-generator.js`** - Generates SVG files
- ✅ **`dimensional-grid-generator.js`** - Generates SVG files
- ⚠️ **`design-tokens.js`** - NO file output (provides data only)
- ⚠️ **`pixel-generator.js`** - Template-based generator (requires templates to exist)
- ⚠️ **`volumetric-pixel-generator.js`** - Template-based generator (requires templates to exist)

---

## 📁 Complete Script Analysis

### 1. `design-tokens.js` (303 lines)

**What it does:**
- **Provides a JavaScript object** with design token values
- **Does NOT generate files** - it's a data source
- Exports `designTokens` and `designSystem` objects

**Purpose:**
- Central source of truth for colors, spacing, typography, etc.
- Used by OTHER scripts as input data
- Utility functions like `getColor()`, `getGradientForState()`, etc.

**How to use:**
```javascript
import { designTokens, designSystem } from './design-tokens.js';

// Get a color
const bgColor = designTokens.colors.voidBlack; // '#0A0621'

// Get state properties
const energyProps = designSystem.getStateProps('energy');
// { opacity: 0.9, glow: 0.8, layers: 1, shadow: '...' }
```

**Use Case:** Import into other scripts or components to get consistent design values

**Does it generate files?** ❌ NO

---

### 2. `pixel-generator.js` (573 lines)

**What it does:**
- **Template-based pixel generator** - Uses string templates with {{placeholder}} replacement
- Generates 4 pixel state types: materialized, partial, energy, superposition
- Returns SVG strings (does NOT write files itself)

**Purpose:**
- Programmatic SVG generation with parameters
- More basic than quantum-pixel-generator (simple template replacement)
- Primarily for **in-memory SVG generation** or **browser use**

**Template Functions:**
```javascript
getMaterializedTemplate()  // Returns SVG string with {{size}}, {{color}}, etc.
getPartialTemplate()        // Partial materialization template
getEnergyTemplate()         // Energy state with particles
getSuperpositionTemplate()  // Layered superposition template
```

**How to use:**
```javascript
import { generateQuantumPixel } from './pixel-generator.js';

const svgString = generateQuantumPixel({
  size: 32,
  state: 'energy',
  color: '#331F4A',
  accentColor: '#5AC8FA'
});

// svgString now contains the SVG markup
// You could inject it into DOM: element.innerHTML = svgString
```

**Does it generate files?** ❌ NO - Returns strings only

**Why you didn't see output:** This script is designed for runtime use (browser/Node), not file generation

---

### 3. `volumetric-pixel-generator.js` (1322 lines)

**What it does:**
- **Advanced volumetric/3D pixel generator** with complex effects
- Generates 4 state types: heritage, transitional, quantum, superposition
- Includes M4-optimized canvas rendering functions
- Includes full SVG templates embedded in functions (not external files)

**Purpose:**
- Advanced 3D/volumetric pixels with sophisticated visual effects
- M4 Metal rendering optimization (lines 1025-1321)
- Canvas-based rendering (renderVolumetricPixelToCanvas)
- Animation support (animateVolumetricPixel)

**Key Functions:**
```javascript
// Generate SVG string (no file output)
generateVolumetricPixel({ size: 200, state: 'quantum' })

// Render to canvas (browser only)
renderVolumetricPixelToCanvas(canvasElement, options)

// Animate on canvas (browser only)
animateVolumetricPixel(canvasElement, options, fps)

// M4 detection
isM4Device()  // Returns boolean
```

**How to use:**
```javascript
import { generateVolumetricPixel } from './volumetric-pixel-generator.js';

const svgString = generateVolumetricPixel({
  size: 200,
  state: 'transitional',
  primaryColor: '#331F4A',
  accentColor: '#5AC8FA'
});

// Use in browser or save to file yourself
```

**Does it generate files?** ❌ NO - Returns strings, renders to canvas

**Why you didn't see output:** No file I/O - designed for browser canvas rendering

---

### 4. `quantum-pixel-generator.js` (310 lines) ✅ GENERATES FILES

**What it does:**
- **Actually writes SVG files to disk** (unlike pixel-generator.js)
- Generates quantum pixels using design tokens
- Simpler than volumetric-pixel-generator (2D focus)

**Purpose:**
- Command-line tool to generate core pixel assets
- Outputs actual .svg files
- Uses design-tokens.js for consistency

**Key Functions:**
```javascript
createQuantumPixel(options)              // Returns SVG string
generateQuantumPixelSet(outputDir)       // ✅ Writes 8 SVG files
generateSingleQuantumPixel(options, path) // ✅ Writes 1 SVG file
```

**Generated Files (8 files):**
```
materialized-blue-base.svg
partial-purple-base.svg
energy-violet-base.svg
superposition-green-base.svg
materialized-blue-2x.svg
energy-violet-2x.svg
materialized-teal-base.svg
partial-marine-base.svg
```

**How to use:**
```bash
# Command line (generates in foundation/quantum-pixels)
node m4-acceleration/scripts/quantum-pixel-generator.js

# Or specify output directory
node m4-acceleration/scripts/quantum-pixel-generator.js my-output-dir
```

```javascript
// Programmatic use
import { generateQuantumPixelSet } from './quantum-pixel-generator.js';

const results = await generateQuantumPixelSet('output/pixels');
// Creates 8 SVG files in output/pixels/
```

**Does it generate files?** ✅ YES - 8 SVG files

**Why you SAW output:** This script actually writes files!

---

### 5. `dimensional-grid-generator.js` (353 lines) ✅ GENERATES FILES

**What it does:**
- **Actually writes SVG files to disk**
- Generates 3 types of grids: background, navigation, distortion
- With various color schemes (heritage, transitional, quantum)

**Purpose:**
- Command-line tool to generate grid system assets
- Outputs actual .svg files
- Creates dimensional/perspective grid backgrounds

**Key Functions:**
```javascript
createDimensionalGrid(options)           // Returns SVG string
generateDimensionalGridSet(outputDir)    // ✅ Writes 6 SVG files
generateSingleDimensionalGrid(options, path) // ✅ Writes 1 SVG file
```

**Generated Files (6 files):**
```
background-perspective-grid.svg
navigation-perspective-grid.svg
distortion-skew-grid.svg
heritage-background-grid.svg
heritage-navigation-grid.svg
quantum-distortion-grid.svg
```

**How to use:**
```bash
# Command line (generates in foundation/grid-systems)
node m4-acceleration/scripts/dimensional-grid-generator.js

# Or specify output directory
node m4-acceleration/scripts/dimensional-grid-generator.js my-output-dir
```

```javascript
// Programmatic use
import { generateDimensionalGridSet } from './dimensional-grid-generator.js';

const results = await generateDimensionalGridSet('output/grids');
// Creates 6 SVG files in output/grids/
```

**Does it generate files?** ✅ YES - 6 SVG files

**Why you SAW output:** This script actually writes files!

---

### 6. `index.js` (113 lines)

**What it does:**
- **Orchestrator** that combines all generators
- Single entry point to generate everything at once

**Purpose:**
- Convenience wrapper
- Generates both pixels AND grids with one command

**Key Functions:**
```javascript
generateAllCoreAssets(outputDir)  // Generates pixels + grids
```

**How to use:**
```bash
# Command line - generates everything
node m4-acceleration/scripts/index.js generate-all

# Or specify output directory
node m4-acceleration/scripts/index.js generate-all my-output-dir
```

**What it generates:**
- 8 quantum pixel SVG files (via quantum-pixel-generator.js)
- 6 dimensional grid SVG files (via dimensional-grid-generator.js)
- **Total: 14 SVG files**

**Output structure:**
```
foundation/
├── quantum-pixels/
│   ├── materialized-blue-base.svg
│   ├── partial-purple-base.svg
│   ├── energy-violet-base.svg
│   ├── superposition-green-base.svg
│   ├── materialized-blue-2x.svg
│   ├── energy-violet-2x.svg
│   ├── materialized-teal-base.svg
│   └── partial-marine-base.svg
└── grid-systems/
    ├── background-perspective-grid.svg
    ├── navigation-perspective-grid.svg
    ├── distortion-skew-grid.svg
    ├── heritage-background-grid.svg
    ├── heritage-navigation-grid.svg
    └── quantum-distortion-grid.svg
```

**Does it generate files?** ✅ YES - 14 SVG files total

---

## 🔄 Script Relationships

```
index.js (orchestrator)
├──> quantum-pixel-generator.js (generates 8 pixels)
│    └──> design-tokens.js (data source)
└──> dimensional-grid-generator.js (generates 6 grids)
     └──> design-tokens.js (data source)

pixel-generator.js (standalone, template-based, no file I/O)
└──> Uses inline templates

volumetric-pixel-generator.js (standalone, canvas rendering, no file I/O)
└──> Uses inline templates + M4 Metal rendering
```

---

## 📊 Script Comparison Table

| Script | ES Module | Generates Files | Output Count | Use Case |
|--------|-----------|----------------|--------------|----------|
| `design-tokens.js` | ✅ | ❌ | 0 | Data source for other scripts |
| `pixel-generator.js` | ✅ | ❌ | 0 | Runtime SVG generation (browser/Node) |
| `volumetric-pixel-generator.js` | ✅ | ❌ | 0 | 3D canvas rendering (browser) |
| `quantum-pixel-generator.js` | ✅ | ✅ | 8 files | Build-time SVG file generation |
| `dimensional-grid-generator.js` | ✅ | ✅ | 6 files | Build-time grid file generation |
| `index.js` | ✅ | ✅ | 14 files | One-command generation of all assets |

---

## 🎯 One-Time vs Continuous Use

### One-Time Use (Initial Asset Generation)

**When:** You're setting up the design system and need the base assets

**Scripts:**
```bash
# Generate all base assets once
node scripts/index.js generate-all foundation

# Creates 14 SVG files in foundation/
```

**Result:**
- 8 pixel SVG files
- 6 grid SVG files
- These are your **static design assets**

**When to re-run:**
- When you change design-tokens.js colors
- When you want different sizes
- When you need new color variations

---

### Continuous Use (Runtime Generation)

**When:** You're building apps/components that need dynamic pixels

**Scripts:**
```javascript
// In your React component
import { generateQuantumPixel } from './pixel-generator.js';

function MyComponent() {
  const pixelSvg = generateQuantumPixel({
    size: 64,
    state: 'energy',
    color: userSelectedColor
  });

  return <div dangerouslySetInnerHTML={{ __html: pixelSvg }} />;
}
```

**Or in browser:**
```javascript
import { renderVolumetricPixelToCanvas } from './volumetric-pixel-generator.js';

const canvas = document.getElementById('pixel-canvas');
renderVolumetricPixelToCanvas(canvas, {
  size: 200,
  state: 'quantum'
});
```

---

## 🛠️ Best Practices for YOU Right Now

### Step 1: Generate Base Assets (One-Time)

```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/scripts

# Generate all base assets
node index.js generate-all ../foundation

# Or generate individually:
node quantum-pixel-generator.js ../foundation/quantum-pixels
node dimensional-grid-generator.js ../foundation/grid-systems
```

**Result:** You'll have static SVG files you can use in designs

---

### Step 2: Use Static Assets in Design System Dashboard

```html
<!-- In your dashboard HTML -->
<img src="../m4-acceleration/foundation/quantum-pixels/energy-violet-base.svg" />
<div style="background-image: url('../m4-acceleration/foundation/grid-systems/background-perspective-grid.svg')">
```

---

### Step 3: For Dynamic Generation (Components)

**In React components:**
```typescript
import { createQuantumPixel } from '@quantum-spatial/design-system/m4-acceleration';

export function QuantumPixel({ state, size, color }) {
  const svg = createQuantumPixel({ state, size, color });
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
```

**In browser:**
```javascript
import { renderVolumetricPixelToCanvas } from '@quantum-spatial/design-system/m4-acceleration';

// Animate a pixel on canvas
const canvas = document.getElementById('quantum-pixel');
animateVolumetricPixel(canvas, { state: 'superposition' }, 60);
```

---

## 🔧 SVG-Batch-Processor

**Current Location:** `/m4-acceleration/scripts/svg-batch-processor.js`

**Recommended Location:** `/design-system/asset-pipeline/processors/svg-batch-processor.js`

**Why move it:**
- Logically fits with asset processing workflow
- Architecture plan defines asset-pipeline structure
- Separates generation (scripts) from processing (asset-pipeline)

**What it does:**
- Processes existing SVG files in batches
- Applies design system styles to them
- Finds SVG files in directories
- Transforms colors, sizes, filters

**Move command:**
```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

mkdir -p asset-pipeline/processors
mv m4-acceleration/scripts/svg-batch-processor.js asset-pipeline/processors/
```

---

## 📁 Existing Foundation Assets

You mentioned you already have:
```
/m4-acceleration/foundation/quantum-pixels/
├── enhanced/ (empty)
├── examples/
├── templates/
├── volumetric-templates/
├── animation SVGs
├── filter SVGs
└── base/ (quantum-pixel-base)

/m4-acceleration/foundation/grid-systems/
└── (existing grids)
```

### Question: Will running generators recreate these?

**Answer:** They will create **NEW** files based on the defined pixel sets in the generators

**Specifically:**

**quantum-pixel-generator.js** will create:
- `materialized-blue-base.svg` (NEW)
- `partial-purple-base.svg` (NEW)
- `energy-violet-base.svg` (NEW)
- etc.

**It will NOT:**
- Overwrite your existing `templates/` directory
- Touch your existing `volumetric-templates/` directory
- Modify `examples/` directory
- Change `enhanced/` directory

**The generators create a specific set of OUTPUT files, not the templates themselves**

---

## 🎨 Use Case Scenarios

### Scenario 1: Design System Dashboard
**Need:** Static SVG assets to showcase in dashboard

**Solution:**
```bash
node scripts/index.js generate-all foundation
```

**Use:**
```html
<img src="foundation/quantum-pixels/energy-violet-base.svg" />
```

---

### Scenario 2: React Component Library
**Need:** Dynamic pixel generation based on props

**Solution:**
```javascript
import { createQuantumPixel } from './pixel-generator.js';

export function DynamicPixel({ state, size, color }) {
  const svg = createQuantumPixel({ state, size, color });
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
```

---

### Scenario 3: Interactive Canvas Experience
**Need:** Animated 3D pixels with M4 optimization

**Solution:**
```javascript
import { animateVolumetricPixel, isM4Device } from './volumetric-pixel-generator.js';

const canvas = document.getElementById('pixel-canvas');
const useM4 = isM4Device();

animateVolumetricPixel(canvas, {
  state: 'superposition',
  size: 256
}, 60); // 60fps
```

---

### Scenario 4: Shopify Theme Assets
**Need:** Pre-generated SVG files for liquid templates

**Solution:**
```bash
# Generate files
node scripts/index.js generate-all ../fresh-glass-theme/assets/quantum-pixels

# Use in Liquid
{{ 'quantum-pixels/energy-violet-base.svg' | asset_url | img_tag }}
```

---

## 🚀 Recommended Next Steps

### 1. Generate Base Assets (If Needed)

```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/scripts

# Option A: Generate all at once
node index.js generate-all ../foundation

# Option B: Generate individually
node quantum-pixel-generator.js ../foundation/quantum-pixels
node dimensional-grid-generator.js ../foundation/grid-systems
```

### 2. Move SVG-Batch-Processor

```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

mkdir -p asset-pipeline/processors
mv m4-acceleration/scripts/svg-batch-processor.js asset-pipeline/processors/
```

### 3. Add to Package.json Exports

```json
{
  "exports": {
    "./m4-acceleration": "./m4-acceleration/scripts/index.js",
    "./m4-acceleration/pixels": "./m4-acceleration/scripts/pixel-generator.js",
    "./m4-acceleration/volumetric": "./m4-acceleration/scripts/volumetric-pixel-generator.js",
    "./m4-acceleration/grids": "./m4-acceleration/scripts/dimensional-grid-generator.js",
    "./m4-acceleration/tokens": "./m4-acceleration/scripts/design-tokens.js"
  },
  "scripts": {
    "generate:m4-assets": "node m4-acceleration/scripts/index.js generate-all foundation",
    "generate:pixels": "node m4-acceleration/scripts/quantum-pixel-generator.js foundation/quantum-pixels",
    "generate:grids": "node m4-acceleration/scripts/dimensional-grid-generator.js foundation/grid-systems"
  }
}
```

### 4. Use in Dashboard

```html
<!-- quantum-spatial-design-system-dark.html -->
<div class="pixel-showcase">
  <img src="../m4-acceleration/foundation/quantum-pixels/energy-violet-base.svg" alt="Energy Pixel" />
  <img src="../m4-acceleration/foundation/quantum-pixels/superposition-green-base.svg" alt="Superposition Pixel" />
</div>

<div class="grid-background" style="background-image: url('../m4-acceleration/foundation/grid-systems/background-perspective-grid.svg')">
  <!-- Content -->
</div>
```

---

## 📚 Summary

**Scripts that generate files:**
- ✅ `quantum-pixel-generator.js` → 8 SVG files
- ✅ `dimensional-grid-generator.js` → 6 SVG files
- ✅ `index.js` → 14 SVG files (both of above)

**Scripts that provide functionality:**
- `design-tokens.js` → Data source
- `pixel-generator.js` → Runtime SVG string generation
- `volumetric-pixel-generator.js` → Canvas rendering + M4 optimization

**Best for you right now:**
1. Run `node index.js generate-all foundation` to get base assets
2. Use those static SVG files in your dashboard
3. Later, use pixel-generator.js or volumetric-pixel-generator.js for dynamic components

**All scripts are ES modules:** ✅ YES

**SVG-batch-processor should move:** ✅ YES → `/asset-pipeline/processors/`

---

© 2025 9Bit Studios
M4 Acceleration Scripts Guide • Quantum Spatial Design System
