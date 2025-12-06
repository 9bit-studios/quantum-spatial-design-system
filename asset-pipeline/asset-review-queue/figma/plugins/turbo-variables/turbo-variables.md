## Turn This Template Into Your Color Automator

**You have a Figma plugin template ready to customize.** Here's how to make it work:

### Step 1: Setup (One Time - 5 minutes)

```bash
# In terminal, navigate to plugin folder
cd /path/to/Turbo-Variables

# Install dependencies
npm install

# Build the TypeScript
npm run build
```

### Step 2: Replace code.ts With Your Color Logic

Replace the rectangle demo code with this:

```typescript
// code.ts - Quantum-Spatial Color Variable Creator

interface ColorDefinition {
  name: string;
  hex: string;
  category?: string;
}

// Your master color palette
const QUANTUM_COLORS: ColorDefinition[] = [
  // Core Palette
  { name: 'void-black', hex: '#000000', category: 'core' },
  { name: 'deep-space-indigo', hex: '#131A36', category: 'core' },
  { name: 'ultra-violet', hex: '#613FE7', category: 'core' },
  { name: 'quantum-violet', hex: '#6A3093', category: 'core' },
  { name: 'ultra-marine', hex: '#405de5', category: 'core' },
  { name: 'stellar-cyan', hex: '#5AC8FA', category: 'core' },
  
  // Effects
  { name: 'glow-primary', hex: '#6A3093', category: 'effects' },
  { name: 'glow-accent', hex: '#613FE7', category: 'effects' },
  
  // Materials
  { name: 'material-dark-1', hex: '#1C1C1E', category: 'materials' },
  { name: 'material-dark-2', hex: '#2C2C2E', category: 'materials' },
  { name: 'material-dark-3', hex: '#3A3A3C', category: 'materials' },
  
  // Heritage Colors
  { name: 'heritage-green', hex: '#2D854D', category: 'heritage' },
  { name: 'retro-amber', hex: '#FFD166', category: 'heritage' },
  
  // Add all your other colors...
];

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);
  
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

async function createQuantumSpatialVariables() {
  // Create or get the collection
  let collection = figma.variables.getLocalVariableCollections()
    .find(c => c.name === 'Quantum-Spatial');
  
  if (!collection) {
    collection = figma.variables.createVariableCollection('Quantum-Spatial');
  }
  
  const mode = collection.modes[0];
  let created = 0;
  let updated = 0;
  
  // Group by category
  const categories = [...new Set(QUANTUM_COLORS.map(c => c.category || 'other'))];
  
  for (const color of QUANTUM_COLORS) {
    // Check if variable already exists
    const existing = figma.variables.getLocalVariables('COLOR')
      .find(v => v.name === color.name);
    
    if (existing) {
      // Update existing
      const rgb = hexToRgb(color.hex);
      existing.setValueForMode(mode.modeId, rgb);
      updated++;
    } else {
      // Create new
      const variable = figma.variables.createVariable(
        color.name,
        collection,
        'COLOR'
      );
      const rgb = hexToRgb(color.hex);
      variable.setValueForMode(mode.modeId, rgb);
      created++;
    }
  }
  
  figma.notify(`✨ Quantum-Spatial Colors: ${created} created, ${updated} updated`);
}

// Run the plugin
createQuantumSpatialVariables().then(() => {
  figma.closePlugin();
});
```

### Step 3: Build & Run

```bash
# Build the plugin
npm run build

# This creates code.js from code.ts
```

### Step 4: Load in Figma

1. **Figma Desktop → Plugins → Development → Import plugin from manifest**
2. Select your `manifest.json` file
3. Plugin appears in dev plugins menu
4. **Run it** → Creates all your variables instantly

---

## Want It Even Simpler?

**Extract colors from your existing frame instead:**

```typescript
// Alternative: Extract from selection
const selection = figma.currentPage.selection[0];

if (!selection) {
  figma.notify('⚠️ Please select your color system frame first');
  figma.closePlugin();
}

const colors = new Set<string>();

function extractColorsFromNode(node: SceneNode) {
  if ('fills' in node && Array.isArray(node.fills)) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID') {
        const hex = rgbToHex(fill.color);
        colors.add(hex);
      }
    });
  }
  if ('children' in node) {
    node.children.forEach(extractColorsFromNode);
  }
}

function rgbToHex(color: RGB): string {
  const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

// Extract and create
extractColorsFromNode(selection);
console.log(`Found ${colors.size} unique colors`);

// Then create variables from extracted colors...
```

---

## Quick Decision Point

**What do you want the plugin to do?**

**Option A:** Create variables from hardcoded list (QUANTUM_COLORS array)
→ Fast, controlled, production-ready

**Option B:** Extract colors from selected frame, then create variables
→ Flexible, discovers colors automatically

**Option C:** Batch replace colors across multiple files
→ Most complex, but most powerful

**For your timeline: Go with Option A.** Define your ~60-100 core colors once, run plugin, done.

Want me to generate the complete QUANTUM_COLORS array from your design system docs?
