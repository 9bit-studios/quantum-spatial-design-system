# 9Bit Studios Quantum-Spatial Design System Style Guide v3.0

**Version:** 3.0 - Onyx + Eggplant Dual Theme Edition
**Last Updated:** 2025-12-03
**M4 Optimization:** ACTIVE
**Apple HIG Compliance:** VALIDATED
**Figma Sync:** COMPLETE

---

## Executive Summary

This is the **SOURCE OF TRUTH** for the Quantum-Spatial Design System. All colors, typography, spacing, and component specifications are derived from actual Figma designs and Apple HIG standards.

**Key Updates in v3.0:**
- ✅ Dual theme system: Onyx (pure black) + Eggplant (deep purple)
- ✅ Extracted and validated all Figma button styles
- ✅ Complete glass/transparency system with standardized opacity values
- ✅ Apple HIG system colors integrated
- ✅ 4-mode variable system (Dark, Void, Marine, Daybreak)
- ✅ Responsive typography with breakpoint scales
- ✅ Comprehensive button state system

---

## Brand Philosophy

### Core Concept: Complementary Dual Themes

The design system features two complementary themes that can be used together:

1. **Onyx Theme**: Pure black (#000000) - Maximum contrast, elegant, timeless
2. **Eggplant Theme**: Deep eggplant (#160918 "Deepnight") - Rich, sophisticated, purple-black

These themes work together to create depth, visual hierarchy, and sophisticated layering throughout the interface.

---

## Color System - SOURCE OF TRUTH

### 🖤 Onyx Theme (Pure Black)

```css
:root {
  /* ONYX - Pure Black Foundation */
  --onyx-black: #000000;              /* Pure black, maximum contrast */
  --onyx-variant-1: #050505;          /* Near black */
  --onyx-variant-2: #0a0a0f;          /* Midnight richness */
}
```

**Usage:** Background canvas, deepest spatial layers, maximum contrast surfaces

### 🍆 Eggplant Theme (Deep Purple-Black)

```css
:root {
  /* EGGPLANT - Deep Purple-Black Foundation */
  --eggplant-deepnight: #160918;      /* Primary eggplant "Deepnight" */
  --eggplant-secondary: #0b010d;      /* Void violet */
  --eggplant-tertiary: #16090e;       /* Warm eggplant variant */
  --eggplant-quaternary: #09021a;     /* Slate variant */

  /* EGGPLANT VARIANTS */
  --void-violet: #0b010d;             /* Darkest eggplant */
  --multidimensional-violet: #110413; /* Mid eggplant */
  --deep-space-violet: #160918;       /* Primary eggplant (same as deepnight) */
  --mystic-midnight: #170e22;         /* Lighter eggplant */
  --ultra-void-violet: #0a0621;       /* Deep space marine */
  --ultradimensional-violet: #150621; /* Purple-marine */
}
```

**Usage:** Primary backgrounds, container surfaces, UI panels, cards, modals

### Background Hierarchy System

```css
:root {
  /* BACKGROUND LAYERS - Onyx Theme */
  --bg-onyx-primary: #000000;         /* Pure black canvas */
  --bg-onyx-secondary: #0b010d;       /* Slightly lifted */
  --bg-onyx-tertiary: #160918;        /* Visible elevation */

  /* BACKGROUND LAYERS - Eggplant Theme */
  --bg-eggplant-primary: #160918;     /* Deep eggplant */
  --bg-eggplant-secondary: #0b010d;   /* Darker variant */
  --bg-eggplant-tertiary: #16090e;    /* Warm variant */
  --bg-eggplant-quaternary: #160918;  /* Same as primary for consistency */
  --bg-eggplant-slate: #09021a;       /* Blue-black tint */

  /* APPROVED HTML SHOWCASE COLORS */
  --void-black: #000000;              /* Pure void from HTML showcase */
  --void-violet: #0b010d;             /* From HTML showcase */
  --deep-space-violet: #160918;       /* From HTML showcase */
  --background-color: #050505;        /* Near black from HTML */
  --background-color-60: #160918;     /* Eggplant from HTML */
  --background-color-80: #0b010d;     /* Void violet from HTML */
  --midnight-richness: #0a0a0f;       /* From HTML showcase */
  --deep-space-indigo: #1e1f5c;       /* Deep blue variant */
  --ultra-indigo: #15151d;            /* Near black indigo */
}
```

### Container System (From Figma Variables)

```css
:root {
  /* CONTAINER BACKGROUNDS */
  --container-bg-primary: #0b010d;               /* Dark mode */
  --container-bg-primary-daybreak: rgba(255, 255, 255, 0.6); /* Light mode */

  --container-bg-secondary: #160918;             /* Dark mode */
  --container-bg-secondary-daybreak: rgba(255, 255, 255, 0.1); /* Light mode */

  --container-bg-tertiary: #16090e;              /* Dark mode */
  --container-bg-tertiary-void: #ffffff;         /* Void mode */
  --container-bg-tertiary-marine: #ffffff;       /* Marine mode */
  --container-bg-tertiary-daybreak: rgba(255, 255, 255, 0.9); /* Light mode */

  --container-bg-recessed: #ffffff;              /* Dark mode placeholder */
  --container-bg-recessed-void: rgba(0, 0, 0, 0.2);     /* Void mode */
  --container-bg-recessed-marine: rgba(0, 0, 0, 0.2);   /* Marine mode */
  --container-bg-recessed-daybreak: rgba(255, 255, 255, 0.9); /* Light mode */
}
```

### Border & Divider System (From Figma Variables)

```css
:root {
  /* BORDERS - Primary */
  --border-primary: rgba(255, 255, 255, 0.1);    /* white-a10 */
  --border-primary-daybreak: rgba(255, 255, 255, 0.5); /* white-a50 */

  /* BORDERS - Secondary */
  --border-secondary: rgba(255, 255, 255, 0.1);  /* white-a10 */
  --border-secondary-daybreak: rgba(255, 255, 255, 0.2); /* white-a20 */

  /* DIVIDERS - Primary */
  --divider-primary: rgba(255, 255, 255, 0.1);   /* white-a10 */
  --divider-primary-daybreak: rgba(0, 0, 0, 0.1); /* black-a10 */

  /* DIVIDERS - Secondary */
  --divider-secondary: rgba(255, 255, 255, 0.2); /* white-a20 */
  --divider-secondary-daybreak: rgba(0, 0, 0, 0.2); /* black-a20 */
}
```

### Button Color System (From Figma Extractions)

```css
:root {
  /* PRIMARY BUTTONS */
  --button-primary-dark: #7b00ff;           /* Vibrant purple (Dark mode) */
  --button-primary-void: #007aff;           /* Apple blue (Void/Marine/Daybreak) */
  --button-primary-marine: #007aff;
  --button-primary-daybreak: #007aff;

  /* BUTTON BACKGROUNDS */
  --button-bg-primary: #160918;             /* Deep eggplant fill */
  --button-bg-secondary: #0b010d;           /* Darker fill */

  /* BUTTON HOVER STATES */
  --button-hover: #150621;                  /* Dark purple hover */
  --button-hover-stroke: rgba(255, 255, 255, 0.2); /* 20% white */

  /* BUTTON SECONDARY */
  --button-secondary: #150621;              /* Secondary button bg */
  --button-secondary-hover: #7b00ff;        /* Dark mode hover */
  --button-secondary-hover-void: #5b9cff;   /* Void/Marine blue-400 */
  --button-secondary-hover-daybreak: #0063d1; /* Daybreak blue-500 */

  /* BUTTON TERTIARY */
  --button-tertiary: #4e177c;               /* Tertiary purple */
  --button-tertiary-void: #007aff;          /* System blue */
  --button-tertiary-hover: #4e177c;         /* Dark hover */
  --button-tertiary-hover-void: #5b9cff;    /* Void/Marine blue-400 */

  /* BUTTON GHOST */
  --button-ghost-stroke: #9747ff;           /* Purple ghost border */
  --button-ghost-fill: rgba(255, 255, 255, 0.5); /* 50% white overlay */

  /* BUTTON INACTIVE */
  --button-inactive: rgba(255, 255, 255, 0.2);      /* Dark mode */
  --button-inactive-daybreak: rgba(0, 0, 0, 0.2);   /* Light mode */

  /* BUTTON TEXT */
  --button-text-primary-dark: #ffffff;      /* White text */
  --button-text-primary-void: #007aff;      /* Blue text */
}
```

### Button Shadow/Effects System (From Figma)

```css
:root {
  /* BUTTON SHADOWS - Subtle */
  --button-shadow-subtle:
    0 2px 4px rgba(0, 0, 0, 0.03),     /* #00000008 - 3% */
    0 1px 2px rgba(0, 0, 0, 0.05);     /* Additional depth */

  /* BUTTON SHADOWS - Medium */
  --button-shadow-medium:
    0 4px 8px rgba(0, 0, 0, 0.1),      /* #0000001A - 10% */
    0 2px 4px rgba(0, 0, 0, 0.05);

  /* BUTTON SHADOWS - Strong */
  --button-shadow-strong:
    0 8px 16px rgba(0, 0, 0, 0.16),    /* #00000029 - 16% */
    0 4px 8px rgba(0, 0, 0, 0.08);

  /* BUTTON SHADOWS - Heavy (for CTAs) */
  --button-shadow-heavy:
    0 12px 24px rgba(0, 0, 0, 0.25),   /* #00000040 - 25% */
    0 6px 12px rgba(0, 0, 0, 0.12);

  /* BUTTON GLOW EFFECTS */
  --button-glow-purple:
    0 0 20px rgba(123, 0, 255, 0.26),  /* #7b00ff42 - 26% purple glow */
    0 4px 12px rgba(0, 0, 0, 0.2);

  --button-glow-blue:
    0 0 20px rgba(88, 70, 246, 0.25),  /* #5846f540 - 25% blue glow */
    0 4px 12px rgba(0, 0, 0, 0.2);

  --button-glow-violet:
    0 0 24px rgba(78, 90, 194, 0.2),   /* #4e5ac233 - 20% violet glow */
    0 4px 12px rgba(0, 0, 0, 0.2);
}
```

### Apple HIG System Colors

```css
:root {
  /* APPLE SYSTEM COLORS (HIG COMPLIANT) */
  --system-blue-dark: #0b4fd7;         /* Custom dark blue */
  --system-blue: #007aff;               /* Standard iOS blue */
  --system-cyan: #5ac8fa;               /* Standard cyan */
  --system-purple-dark: #3b39ec;        /* Custom dark purple */
  --system-purple-daybreak: #504cf5;    /* Daybreak purple */
  --system-violet-dark: #6e00ff;        /* Custom violet */
  --system-violet-daybreak: #7b00ff;    /* Daybreak violet */
  --system-pink: #d0196b;               /* Custom pink */

  /* APPLE SEMANTIC COLORS */
  --apple-red: #ff3b30;                 /* Error/destructive */
  --apple-orange: #ff9500;              /* Warning */
  --apple-green: #34c759;               /* Success */
}
```

### Foreground/Text System (From Figma Variables)

```css
:root {
  /* FOREGROUND COLORS */
  --foreground-primary: #ffffff;                    /* Dark mode */
  --foreground-primary-daybreak: #000000;           /* Light mode (Primitive:Color/black) */

  --foreground-secondary: #ffffff;                  /* Dark mode */
  --foreground-secondary-daybreak: rgba(0, 0, 0, 0.7); /* black-a70 */

  --foreground-tertiary: #ffffff;                   /* Dark mode */
  --foreground-tertiary-daybreak: rgba(0, 0, 0, 0.5); /* black-a50 */

  /* TEXT HIERARCHY */
  --text-primary: rgba(255, 255, 255, 0.9);         /* 90% white */
  --text-secondary: rgba(255, 255, 255, 0.7);       /* 70% white */
  --text-tertiary: rgba(255, 255, 255, 0.55);       /* 55% white */
  --text-quaternary: rgba(255, 255, 255, 0.3);      /* 30% white */
  --text-muted: rgba(255, 255, 255, 0.45);          /* 45% white */
  --text-vibrant: #999999;                          /* Gray for emphasis */

  /* TEXT - Extracted from Figma Typography */
  --text-heading: rgba(255, 255, 255, 0.9);         /* #FFFFFFE5 - 90% */
  --text-body: rgba(255, 255, 255, 0.6);            /* #FFFFFF99 - 60% */
  --text-caption: rgba(255, 255, 255, 0.5);         /* #FFFFFF80 - 50% */
  --text-disabled: rgba(255, 255, 255, 0.2);        /* #FFFFFF33 - 20% */
}
```

### Glass/Transparency System (Standardized Opacity Values)

```css
:root {
  /* GLASS TRANSPARENCY SYSTEM */
  --glass-ultra-thin: rgba(0, 0, 0, 0.1);    /* 10% / #0000001A */
  --glass-thin: rgba(0, 0, 0, 0.2);          /* 20% / #00000033 */
  --glass-medium: rgba(0, 0, 0, 0.29);       /* 29% / #0000004A */
  --glass-thick: rgba(0, 0, 0, 0.4);         /* 40% / #00000066 */
  --glass-ultra-thick: rgba(0, 0, 0, 0.5);   /* 50% / #00000080 */

  /* WHITE GLASS (for dark backgrounds) */
  --glass-white-subtle: rgba(255, 255, 255, 0.02);   /* 2% */
  --glass-white-light: rgba(255, 255, 255, 0.05);    /* 5% */
  --glass-white-medium: rgba(255, 255, 255, 0.08);   /* 8% */
  --glass-white-elevated: rgba(255, 255, 255, 0.12); /* 12% */
  --glass-white-active: rgba(255, 255, 255, 0.15);   /* 15% */

  /* GLASS FROM HTML SHOWCASE */
  --glass-base: rgba(255, 255, 255, 0.02);
  --glass-elevated: rgba(255, 255, 255, 0.05);
  --glass-active: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shimmer: rgba(255, 255, 255, 0.15);
}
```

### Gradient System (From Figma & HTML)

```css
:root {
  /* GRADIENT FILLS */
  --gradient-fill-1: rgba(255, 255, 255, 0.2);       /* Dark mode */
  --gradient-fill-1-daybreak: rgba(255, 255, 255, 0.9); /* Light mode */

  --gradient-fill-2: rgba(255, 255, 255, 0.1);       /* Dark mode */
  --gradient-fill-2-daybreak: rgba(255, 255, 255, 0.8); /* Light mode */

  /* OIL SLICK GRADIENT (from HTML) */
  --oil-gradient: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(90, 200, 250, 0.03) 50%,
    rgba(191, 64, 128, 0.03) 75%,
    rgba(255, 255, 255, 0.08) 100%);
}
```

### Heritage Green (Legacy/Special States)

```css
:root {
  /* HERITAGE GREEN SYSTEM */
  --heritage-green: #2c5f2d;            /* Core heritage green */
  --heritage-green-light: #357139;      /* Lighter variant */
  --heritage-green-dark: #1b3d1a;       /* Darker variant */
  --heritage-pixel: #3dff74;            /* Bright pixel green */
  --heritage-pixel-aqua: #00ffc8;       /* Aqua variant */

  /* HERITAGE GLASS */
  --glass-heritage-10: rgba(44, 95, 45, 0.1);   /* #2C5F2D1A */
  --glass-heritage-15: rgba(44, 95, 45, 0.15);  /* #2C5F2D26 */
  --glass-heritage-30: rgba(44, 95, 45, 0.3);   /* #2C5F2D4D */
  --glass-heritage-50: rgba(44, 95, 45, 0.5);   /* #2C5F2D80 */
  --glass-heritage-70: rgba(44, 95, 45, 0.7);   /* #2C5F2DB2 */
  --glass-heritage-85: rgba(44, 95, 45, 0.85);  /* #2C5F2DD9 */
  --glass-heritage-100: rgba(44, 95, 45, 1);    /* #2C5F2DFF */
}
```

---

## Typography System

### Font Families (Apple HIG Compliant)

```css
:root {
  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-compact: 'SF Compact', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Courier New', monospace;
}
```

### Typography Scale (Responsive - From Figma)

```css
:root {
  /* HEADING SCALES */
  /* Desktop / Tablet / Mobile */
  --heading-1-desktop: 60px;
  --heading-1-tablet: 40px;
  --heading-1-mobile: 34px;

  --heading-2-desktop: 50px;
  --heading-2-tablet: 30px;
  --heading-2-mobile: 28px;

  --heading-3-desktop: 40px;
  --heading-3-tablet: 28px;
  --heading-3-mobile: 24px;

  --heading-4-desktop: 30px;
  --heading-4-tablet: 24px;
  --heading-4-mobile: 22px;

  --heading-5-desktop: 24px;
  --heading-5-tablet: 20px;
  --heading-5-mobile: 20px;

  /* BODY SCALES */
  --headline: 20px;           /* All breakpoints */
  --body-large: 18px;         /* All breakpoints */
  --body: 16px;               /* All breakpoints */
  --footnote: 14px;           /* All breakpoints */
  --caption: 13px;            /* All breakpoints */
  --small: 12px;              /* All breakpoints */
}
```

### Font Weights (Apple HIG Standard)

```css
:root {
  --weight-ultra-light: 200;
  --weight-light: 300;
  --weight-regular: 350;      /* SF Pro default */
  --weight-medium: 400;
  --weight-semibold: 500;
  --weight-bold: 600;
  --weight-heavy: 700;
}
```

### Line Height & Letter Spacing

```css
:root {
  /* LINE HEIGHTS */
  --line-height-tight: 1.2;
  --line-height-normal: 1.47059;   /* Apple HIG standard */
  --line-height-relaxed: 1.6;

  /* LETTER SPACING */
  --letter-spacing-tight: -0.022em;  /* Apple HIG for body */
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
}
```

---

## Spacing System (8pt Grid - Apple HIG)

```css
:root {
  /* SPACING SCALE (8pt base) */
  --space-xs: 4px;      /* 0.5 unit */
  --space-sm: 8px;      /* 1 unit */
  --space-md: 16px;     /* 2 units */
  --space-lg: 24px;     /* 3 units */
  --space-xl: 32px;     /* 4 units */
  --space-xxl: 48px;    /* 6 units */
  --space-xxxl: 64px;   /* 8 units */

  /* TOUCH TARGETS (Apple HIG) */
  --touch-min: 44px;    /* Minimum touch target */
  --touch-comfortable: 48px;

  /* CONTAINER WIDTHS */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-xxl: 1536px;
}
```

---

## Border Radius System

```css
:root {
  /* BORDER RADIUS */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-xxl: 24px;
  --radius-full: 9999px;  /* Full rounded */
}
```

---

## Shadow System

```css
:root {
  /* GLASS SHADOWS (Gelatinous Effect) */
  --shadow-glass-subtle:
    0 4px 16px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.05);

  --shadow-glass-medium:
    0 8px 32px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.06);

  --shadow-glass-strong:
    0 12px 48px rgba(0, 0, 0, 0.24),
    inset 0 2px 0 rgba(255, 255, 255, 0.14),
    0 2px 0 rgba(255, 255, 255, 0.08);

  /* STANDARD SHADOWS */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.16);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.20);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.25);
}
```

---

## Backdrop Filter (Quantum Glass)

```css
:root {
  /* BACKDROP FILTERS */
  --quantum-backdrop: saturate(180%) blur(20px);
  --quantum-glass-effect: blur(20px) saturate(150%);
  --backdrop-blur-sm: blur(8px);
  --backdrop-blur-md: blur(16px);
  --backdrop-blur-lg: blur(24px);
  --backdrop-blur-xl: blur(32px);
}
```

---

## Transitions & Easing

```css
:root {
  /* TRANSITION DURATIONS */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* EASING FUNCTIONS (from HTML showcase) */
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-snap: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-silk: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-magnetic: cubic-bezier(0.2, 0, 0.38, 0.9);

  /* STANDARD EASINGS */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Component Specifications

### Buttons

**Size Variants:**
```css
/* Button Sizes */
.button-sm {
  height: 32px;
  padding: 6px 16px;
  font-size: 14px;
}

.button-md {
  height: 44px;      /* Apple HIG minimum touch target */
  padding: 12px 24px;
  font-size: 16px;
}

.button-lg {
  height: 56px;
  padding: 16px 32px;
  font-size: 18px;
}
```

**Button States (from Figma):**

```css
/* Primary Button - Dark Mode */
.button-primary {
  background: var(--button-primary-dark);  /* #7b00ff */
  color: #ffffff;
  border: none;
  box-shadow: var(--button-shadow-medium);
}

.button-primary:hover {
  background: var(--button-hover);  /* #150621 */
  box-shadow: var(--button-glow-purple);
  transform: translateY(-1px);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: var(--button-shadow-subtle);
}

/* Secondary Button */
.button-secondary {
  background: var(--button-bg-secondary);  /* #0b010d */
  color: var(--foreground-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--button-shadow-subtle);
}

.button-secondary:hover {
  background: var(--button-secondary-hover);  /* #7b00ff */
  border-color: var(--border-secondary);
  box-shadow: var(--button-shadow-medium);
}

/* Tertiary Button */
.button-tertiary {
  background: var(--button-tertiary);  /* #4e177c */
  color: var(--foreground-primary);
  border: none;
  box-shadow: var(--button-shadow-subtle);
}

.button-tertiary:hover {
  background: var(--button-tertiary-hover);  /* #4e177c */
  box-shadow: var(--button-shadow-medium);
}

/* Ghost Button */
.button-ghost {
  background: transparent;
  color: var(--foreground-primary);
  border: 1px solid var(--button-ghost-stroke);  /* #9747ff */
}

.button-ghost:hover {
  background: var(--button-ghost-fill);  /* rgba(255, 255, 255, 0.5) */
  border-color: var(--button-hover-stroke);
}

/* Inactive/Disabled Button */
.button:disabled {
  background: var(--button-inactive);
  color: var(--text-disabled);
  cursor: not-allowed;
  box-shadow: none;
}
```

### Cards

```css
.card {
  background: var(--bg-eggplant-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-glass-subtle);
  backdrop-filter: var(--quantum-backdrop);
  transition: all var(--duration-normal) var(--ease-gentle);
}

.card:hover {
  background: var(--glass-white-medium);
  border-color: var(--border-secondary);
  box-shadow: var(--shadow-glass-medium);
  transform: translateY(-2px);
}
```

### Glass Panels

```css
.glass-panel {
  background: var(--glass-white-medium);
  backdrop-filter: var(--quantum-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-glass-subtle);
}
```

---

## Mode Variations

### Dark Mode (Default)
Primary backgrounds use **Eggplant** (#160918), with **Onyx** (#000000) for deepest layers.

### Void Mode
Pure **Onyx** black (#000000) backgrounds, maximum contrast.

### Marine Mode
Blue-tinted variants with marine spectrum accents.

### Daybreak Mode (Light)
Light backgrounds with inverted text colors and adjusted opacity values.

---

## Accessibility

### Contrast Ratios (WCAG AAA)
- **Large Text (18px+):** Minimum 4.5:1
- **Body Text (16px):** Minimum 7:1
- **Interactive Elements:** Minimum 4.5:1

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--system-blue);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Touch Targets
All interactive elements minimum **44px × 44px** (Apple HIG)

---

## Implementation Notes

1. **Theme Selection:** Use `--bg-onyx-*` for pure black themes, `--bg-eggplant-*` for purple-black themes
2. **Layering:** Combine Onyx and Eggplant for depth (e.g., Onyx canvas with Eggplant cards)
3. **Buttons:** Dark mode uses #7b00ff primary, other modes use #007aff
4. **Glass Effects:** Always pair with backdrop-filter for authentic glassmorphism
5. **Transitions:** Use `var(--ease-gentle)` for most UI, `var(--ease-snap)` for playful interactions
6. **Shadows:** Prefer glass shadows for elevated surfaces, standard shadows for depth

---

## Token Priority Order

When resolving color conflicts, follow this priority:

1. **Figma Variables** (Colors.json, variables.json)
2. **Figma Extracted Styles** (button-specific, component-specific)
3. **HTML Showcase** (quantum-spatial-design-system-full-width.html)
4. **Color Registry** (color-registry.json)
5. **Apple HIG Standards** (system colors)

---

## Version History

- **v3.0** (2025-12-03): Dual Onyx + Eggplant theme system from Figma extraction
- **v2.0** (2025-11-18): Source of Truth Edition with corrected colors
- **v1.0** (2025-10-15): Initial design system documentation

---

**Questions or Clarifications:**
Refer to the extracted Figma files in `/asset-pipeline/asset-review-queue/figma/plugins/turbo-variables/`

**M4 Integration:**
All tokens automatically processed by M4 Neural Engine via design-tokens.js generator script.
