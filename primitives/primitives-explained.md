# Understanding Design Tokens: Primitives vs Semantics

## What Are Primitives?

**Primitives = Raw Ingredients**
Think of primitives as your spice rack - they're raw, named values with no context about usage.

```css
/* PRIMITIVES - Just colors, no meaning */
--purple-500: #7b00ff;
--purple-600: #911efa;
--white-a60: rgba(255, 255, 255, 0.6);
--blue-500: #007aff;
```

**Semantic = Recipes**
Semantic tokens reference primitives and describe *what* they're used for.

```css
/* SEMANTIC - Purpose-based, references primitives */
--button-primary: var(--purple-500);
--button-hover: var(--purple-600);
--container-background: var(--white-a60);
--link-color: var(--blue-500);
```

## Why This Matters

### Without Primitives (Pain):
```css
/* Every color hardcoded */
.button { background: #7b00ff; }
.accent { border: #7b00ff; }
.highlight { color: #7b00ff; }

/* Want to change purple? Update 47 places 😱 */
```

### With Primitives (Win):
```css
/* Primitives layer */
--quantum-primary: #7b00ff;

/* Semantic layer */
--button-primary: var(--quantum-primary);
--accent-border: var(--quantum-primary);
--highlight-text: var(--quantum-primary);

/* Usage layer */
.button { background: var(--button-primary); }
.accent { border: var(--accent-border); }
.highlight { color: var(--highlight-text); }

/* Change purple? Update 1 place ✨ */
--quantum-primary: #8c45ff; /* Everything updates! */
```

## Real Example from Your System

### Current Problem:
Your semantic colors reference primitives that don't exist:

```json
{
  "Container": {
    "background-primary": {
      "type": "color",
      "values": {
        "Light": "Primitive:Color/white-a60"  // ❌ Doesn't exist!
      }
    }
  }
}
```

### Solution Generated:

**primitives.css** (210 tokens):
```css
:root {
  /* White alpha variants for glassmorphism */
  --white-a10: rgba(255, 255, 255, 0.1);
  --white-a20: rgba(255, 255, 255, 0.2);
  --white-a60: rgba(255, 255, 255, 0.6); /* ✅ Now exists! */
  --white-a90: rgba(255, 255, 255, 0.9);
  
  /* Quantum-spatial purple scale */
  --quantum-purple-500: #7b00ff;
  --quantum-purple-600: #911efa;
  --quantum-purple-700: #620cbf;
}
```

**colors.css** (your semantic tokens):
```css
:root[data-theme="light"] {
  --container-background-primary: var(--white-a60); /* ✅ References primitive! */
  --button-primary: var(--quantum-purple-500);
}
```

## Your 3-Tier System

```
┌─────────────────────────────────────────┐
│  PRIMITIVES (210 tokens)                │
│  Raw colors: blue-500, white-a60, etc.  │
│  Sources: Design+Code + Apple + VP2     │
└──────────────┬──────────────────────────┘
               │ references
               ▼
┌─────────────────────────────────────────┐
│  SEMANTIC (86 tokens)                   │
│  Purpose: button-primary, container-bg  │
│  Your current colors-hex.json           │
└──────────────┬──────────────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────────┐
│  COMPONENTS (TSX/SwiftUI)               │
│  <Button style="primary">              │
│  Button(style: .primary)                │
└─────────────────────────────────────────┘
```

## M4 Optimization Strategy

### Colors Selected for Wide-Gamut:

**High Priority (vivid, outside sRGB):**
- Quantum Purple: #7b00ff, #911efa, #620cbf
- Lime: #cdff00, #a0cc00
- Indigo: #5e5ce6
- Cyan: #5ac8fa

**Medium Priority:**
- Red: #ff453a
- Orange: #ff9f0a
- Pink: #ff375f

**Low Priority (within sRGB):**
- Grays, blacks, whites
- Muted colors (brown, teal)

### P3 Implementation:
```css
/* Fallback to sRGB */
--quantum-primary: #7b00ff;

/* Enhance for P3-capable devices */
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    --quantum-primary: color(display-p3 0.482 0 1);
  }
}
```

## Figma Import Workflow

### Method 1: Variables Plugin (Recommended)
1. Install "Variables Import Export" plugin in Figma
2. Import `primitives-figma.json` → Creates "Primitives" collection
3. Import `colors-semantic-updated.json` → Updates "Colors" collection
4. Figma auto-resolves all references
5. No manual editing required! 🎉

### Method 2: Manual (If Plugin Unavailable)
1. Create new variable collection: "Primitives"
2. For each primitive in `primitives.css`:
   - Create variable: `purple-500`
   - Set value: `#7b00ff`
3. Update semantic variables to reference primitives
4. This takes ~2 hours for 210 tokens 😱

**Use Method 1.**

## Quantum-Spatial Optimizations Applied

### Deep Blacks (OLED Optimization):
```css
--quantum-black: #0b010d;        /* 99.9% black, prevents burn-in */
--quantum-black-secondary: #160918;
--quantum-black-tertiary: #16090e;
```

### Glassmorphism Stack:
```css
/* 10 levels of glass transparency */
--glass-white-a5: rgba(255, 255, 255, 0.05);   /* Subtle */
--glass-white-a10: rgba(255, 255, 255, 0.1);
--glass-white-a20: rgba(255, 255, 255, 0.2);   /* Standard */
--glass-white-a60: rgba(255, 255, 255, 0.6);   /* Heavy */
--glass-white-a90: rgba(255, 255, 255, 0.9);   /* Near-solid */
```

### Vision Pro Materials:
```css
--glass-light: rgba(255, 255, 255, 0.1);   /* Background panels */
--glass-medium: rgba(255, 255, 255, 0.2);  /* Cards */
--glass-heavy: rgba(255, 255, 255, 0.3);   /* Elevated surfaces */
--glass-ultra: rgba(255, 255, 255, 0.6);   /* Prominent elements */
```

## Quick Reference

### When to Use Each Format:

**Hex** (`#7b00ff`):
- ✅ General web use
- ✅ Solid colors
- ✅ Easy to read/share
- ❌ No transparency

**RGB** (`rgb(123, 0, 255)`):
- ✅ JavaScript manipulation
- ✅ Dynamic color generation
- ✅ Can convert to HSL
- ❌ No transparency (use rgba)

**RGBA** (`rgba(123, 0, 255, 0.6)`):
- ✅ Glassmorphism
- ✅ Overlays
- ✅ Hover states
- ✅ Vision Pro materials

**P3** (`color(display-p3 0.482 0 1)`):
- ✅ Vivid colors on Apple devices
- ✅ M4 optimization
- ✅ Vision Pro maximum fidelity
- ❌ Not supported everywhere (needs fallback)

### Your Generated Files:

1. **primitives.css** - 210 raw color tokens
2. **primitives.d.ts** - TypeScript types
3. **primitives-figma.json** - Import to Figma
4. **colors-semantic-updated.json** - Your semantic tokens with correct refs
5. **PRIMITIVES-README.md** - Documentation

### Token Count Breakdown:

- Base color scales: 13 colors × ~9 weights = 117 tokens
- Alpha variants: 5 sets × ~9 variants = 45 tokens
- System colors: 20 tokens
- Quantum theme: 11 tokens
- Special materials: 17 tokens
- **Total: 210 primitive tokens**

---

**Next Action:** Import `primitives-figma.json` to Figma and never manually edit primitives again! 🚀
