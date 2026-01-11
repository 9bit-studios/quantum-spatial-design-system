# Design System Color Customization Guide
## How to Change Colors and Styles You Don't Like

**Date**: 2025-12-02
**Status**: Production Ready
**Authority**: Apple Intelligence Strategic Director Framework

---

## 🎯 The Problem You're Solving

**Your Pain Point**: "I don't like the colors and need to finesse the styles. What I don't understand is what to update to set the styles that I want. I have not liked the color theme on any of the iterations and need to make changes."

**This Guide Will Show You**:
1. **EXACTLY which files to edit** to change colors
2. **Step-by-step instructions** for customizing styles
3. **How to rebuild and deploy** your changes
4. **How to fix broken token connections** that are preventing customization

---

## 📁 The 3 Files You Need to Edit for Colors

### **FILE 1: Primary Color Source (START HERE)**
**Location**: `/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts`

**What It Does**: Defines the PRIMARY color palette for the quantum-spatial aesthetic

**Lines to Edit**: 10-34 (color definitions)

**Current Colors (That You Don't Like)**:
```typescript
export const quantumSpatialTokens = {
  colors: {
    // Dark backgrounds
    primary: '#0A0D1C',      // Softer dark base
    secondary: '#1A2332',     // Warmer secondary
    tertiary: '#2A334A',      // Gentler tertiary

    // Accent colors
    accent: '#4FC3F7',        // Softer cyan
    accentSecondary: '#AB47BC', // Refined purple
    accentTertiary: '#EC407A',  // Softer rose

    // Text colors
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    textDisabled: 'rgba(255, 255, 255, 0.38)',

    // Glassmorphism layers
    glassLight: 'rgba(255, 255, 255, 0.12)',
    glassMedium: 'rgba(255, 255, 255, 0.08)',
    glassDark: 'rgba(255, 255, 255, 0.04)',
  },
  // ... gradients, shadows, spacing defined below
};
```

**HOW TO CUSTOMIZE**:
1. Open the file: `/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts`
2. Change ANY hex color to your preferred color
3. Example - Make it more purple/pink:
   ```typescript
   colors: {
     primary: '#1A0D1C',      // Darker purple base
     secondary: '#2A1832',     // Purple secondary
     tertiary: '#3A2A4A',      // Deeper purple tertiary

     accent: '#C34FF7',        // Brighter purple accent
     accentSecondary: '#EC47BC', // Pink accent
     accentTertiary: '#F74FC3',  // Rose accent
   }
   ```

---

### **FILE 2: Apple HIG + Unified Colors**
**Location**: `/quantum-spatial/design-system/tokens/brand/unifiedTokens.ts`

**What It Does**: Combines Apple HIG system colors with quantum gaming enhancements

**Lines to Edit**: 80-150 (color system)

**Current Colors**:
```typescript
export const unifiedTokens = {
  colors: {
    // Core Apple HIG Colors
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',

    // System Colors (Apple HIG standard)
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemIndigo: '#5856D6',
    systemOrange: '#FF9500',
    systemPink: '#FF2D55',
    systemPurple: '#AF52DE',
    systemRed: '#FF3B30',
    systemTeal: '#5AC8FA',
    systemYellow: '#FFCC00',

    // Gaming Enhancement Colors
    quantumBlue: '#4FC3F7',
    quantumPurple: '#AB47BC',
    quantumRose: '#EC407A',
    quantumGold: '#FFD700',
    quantumSilver: '#C0C0C0',

    // Text Hierarchy
    label: '#FFFFFF',
    secondaryLabel: 'rgba(255, 255, 255, 0.6)',
    tertiaryLabel: 'rgba(255, 255, 255, 0.3)',
    quaternaryLabel: 'rgba(255, 255, 255, 0.18)',
  },
  // ... typography, spacing, shadows defined below
};
```

**HOW TO CUSTOMIZE**:
1. Open `/quantum-spatial/design-system/tokens/brand/unifiedTokens.ts`
2. Change the "Gaming Enhancement Colors" section (lines ~100-105)
3. These colors blend with Apple HIG - adjust to your taste
4. Keep Apple system colors unchanged unless you have a specific reason

---

### **FILE 3: Framer Component Hardcoded Colors (QUICK FIX)**
**Location**: `/quantum-spatial/design-system/m4-acceleration/components/framer/PremiumQuantumSpatial.tsx`

**What It Does**: Defines inline colors for the Framer component states

**Lines to Edit**: 14-37 (premiumColors object)

**Current Colors (HARDCODED)**:
```typescript
const premiumColors = {
  heritage: {
    bg: "#0A0D0A",        // Dark green background
    surface: "#1A1E1A",   // Green surface
    text: "#E8F4E8",      // Light green text
    accent: "#2C5F2D",    // Green accent
    border: "#1B3D1A",    // Green border
  },
  transitional: {
    bg: "#0A0C15",        // Dark blue background
    surface: "#151825",   // Blue surface
    text: "#E8EDF8",      // Light blue text
    accent: "#405de5",    // Blue accent
    border: "#1E1F3A",    // Blue border
  },
  quantum: {
    bg: "#0D0D15",        // Dark purple background
    surface: "#1A1A25",   // Purple surface
    text: "#F0F0F5",      // Light purple text
    accent: "#5A4B93",    // Purple accent
    border: "#2A1F3A",    // Purple border
  },
};
```

**HOW TO CUSTOMIZE**:
1. Open `/quantum-spatial/design-system/m4-acceleration/components/framer/PremiumQuantumSpatial.tsx`
2. Find the `premiumColors` object (lines 14-37)
3. Change ANY hex color directly
4. This is the FASTEST way to see color changes in Framer
5. **Note**: These are OVERRIDES - eventually you want to remove these and use token files instead

---

## 🛠️ Step-by-Step: How to Change Your Colors

### **Step 1: Edit Your Color Preferences**

**Choose your approach**:

**Option A: Quick Test (Framer Component Only)**
```bash
# Edit the Framer component directly for instant preview
open /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/components/framer/PremiumQuantumSpatial.tsx

# Change lines 14-37 (premiumColors object)
# Save the file
# Refresh Framer to see changes
```

**Option B: Proper Token System (Recommended)**
```bash
# Edit the quantum-spatial brand tokens
open /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts

# Change lines 10-34 (color definitions)
# Save the file
# Rebuild tokens (see Step 2)
```

**Option C: Both (For Complete Customization)**
```bash
# Edit BOTH files:
# 1. quantumSpatialTokens.ts (source of truth)
# 2. PremiumQuantumSpatial.tsx (Framer override for testing)
```

---

### **Step 2: Rebuild Tokens**

After editing token files, you need to rebuild the design system:

```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

# Rebuild TypeScript tokens to JavaScript
npm run build

# Or if you have a specific build script:
npx tsc --project tsconfig.json
```

**What This Does**:
- Compiles `.ts` token files to `.js`
- Makes tokens available to Cloudflare Worker
- Updates the token export chain

---

### **Step 3: Deploy to Cloudflare Worker**

Your Framer components fetch tokens from the Cloudflare Worker. After rebuilding, deploy:

```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/cloudflare-workers

# Deploy the unified design system worker
npx wrangler deploy unified-design-system-worker.js

# Or use the deployment script:
./deploy-worker.sh
```

**What This Does**:
- Uploads new token definitions to Cloudflare Worker
- Makes tokens available at the API endpoint
- Framer components will fetch updated colors

---

### **Step 4: Update Framer Component API Endpoint**

**CRITICAL FIX NEEDED**: The Framer component has an empty API endpoint!

**File**: `/quantum-spatial/design-system/m4-acceleration/components/framer/DesignSystemProvider.tsx`
**Line**: 46
**Current**: `const API_ENDPOINT = "";`
**Should Be**: Your Cloudflare Worker URL

**Fix It**:
```typescript
// Line 46 - CHANGE THIS:
const API_ENDPOINT = "";

// TO THIS (use your actual worker URL):
const API_ENDPOINT = "https://unified-design-system.your-account.workers.dev";

// Or for staging:
const API_ENDPOINT = "https://unified-design-system-staging.your-account.workers.dev";
```

**To Find Your Worker URL**:
```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/cloudflare-workers

# Check wrangler.toml for your worker name
cat wrangler.toml

# Your URL will be:
# https://[worker-name].[your-account].workers.dev
```

---

### **Step 5: Test Your Changes**

**In Framer**:
1. Open your Framer project
2. Refresh the canvas
3. The `DesignSystemProvider` will fetch new tokens from the worker
4. You should see your new colors applied

**Debugging**:
```bash
# Check if tokens are being served correctly
curl "https://unified-design-system.your-account.workers.dev/design-system/tokens?state=quantum&format=framer"

# Should return JSON with your new color values
```

---

## 🔧 Fixing Broken Token Connections

You mentioned: "How do I validate and include tokens and components that are not connected?"

Here are the broken connections that need fixing:

### **Problem 1: appleHIGTokens Import Path Error**

**File**: `/quantum-spatial/design-system/tokens/index.ts`
**Line**: 26
**Error**: `export { appleHIGTokens } from './brand/appleHIGTokens';`
**Problem**: File is actually in `/core/` not `/brand/`

**Fix**:
```typescript
// CHANGE LINE 26 FROM:
export { appleHIGTokens } from './brand/appleHIGTokens';

// TO:
export { appleHIGTokens } from './core/appleHIGTokens';
```

---

### **Problem 2: Broken themes/index.ts Exports**

**File**: `/quantum-spatial/design-system/tokens/themes/index.ts`
**Lines**: 7-13
**Error**: Exports files that don't exist (`core.js`, `tokens.js`, `components.js`, `utils.js`)
**Problem**: This is an auto-generated file that's importing non-existent files

**Fix - Replace Entire File**:
```typescript
/**
 * Theme Tokens Export Hub
 * Exports all available theme configurations
 */

// Export all theme files
export * from './ecommerce';
export * from './enterprise';
export * from './petersen-gaming';

// Default export
export { petersenGamingTheme as default } from './petersen-gaming';
```

---

### **Problem 3: Missing DesignSystemProvider API Endpoint**

**File**: `/quantum-spatial/design-system/m4-acceleration/components/framer/DesignSystemProvider.tsx`
**Line**: 46
**Error**: `const API_ENDPOINT = "";`
**Problem**: Empty string prevents Framer components from fetching tokens

**Fix**:
```typescript
// CHANGE LINE 46 FROM:
const API_ENDPOINT = "";

// TO (use your actual Cloudflare Worker URL):
const API_ENDPOINT = "https://unified-design-system.YOUR_ACCOUNT.workers.dev";

// You can find your worker URL by running:
// cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/cloudflare-workers
// wrangler whoami
// wrangler deployments list
```

---

## 📦 How QuantumSpatial Components Were Generated

You asked: "A bunch of components were created the other day. How were these created and what are the source files to update with my preferred styles?"

### **Components Found**:
Located in `/quantum-spatial/design-system/components/`:
- `QuantumSpatial_AnimatedGradientButton.md`
- `QuantumSpatial_CardComponent.md`
- `QuantumSpatial_GlassmorphicCard.md`
- `QuantumSpatial_HeroSection.md`
- `QuantumSpatial_NavigationBar.md`
- `QuantumSpatial_ProductCard.md`
- And more...

### **Generation Process**:

**Method**: These were likely generated via the Creative Intelligence MCP system using:
1. **MCP Tool**: `creative_asset_generate` or `framer_component_generate`
2. **Source Tokens**: `quantumSpatialTokens.ts` (for colors, spacing, effects)
3. **Template System**: Quantum-spatial design patterns + Apple HIG compliance
4. **M4 Acceleration**: Neural Engine for rapid generation

### **How to Regenerate With Your Preferred Styles**:

**Step 1: Update Source Token Files**
```bash
# Edit your color preferences in:
/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts

# Change the colors object (lines 10-34) to YOUR preferred palette
```

**Step 2: Use Creative Intelligence MCP to Regenerate**
```bash
# Run the unified MCP system
cd /Users/pennyplatt/Documents//Oksana/OksanaFoundationModel
node run-unified-creative-strategic-intelligence-mcp.js

# Or use the deployment script:
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration
./DEPLOY-M4-UNIFIED-SYSTEM.sh
```

**Step 3: Call MCP Tool for Component Generation**

Once the MCP system is running, you can use Claude with the Creative Intelligence MCP tools:

```
User: "Generate a quantum-spatial product card component using my updated color tokens"

Claude (with MCP): Uses creative_asset_generate tool
→ Reads quantumSpatialTokens.ts
→ Applies YOUR new colors
→ Generates component with M4 acceleration
→ Outputs React/TypeScript component
```

**Step 4: Manual Component Update (Alternative)**

If you want to update existing components directly:
```bash
# Find a component markdown file
open /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/QuantumSpatial_ProductCard.md

# Inside, you'll find the React component code
# Replace hardcoded hex colors with your new palette
# Or reference the token system:

// BEFORE (hardcoded):
backgroundColor: '#0A0D1C'

// AFTER (token reference):
backgroundColor: tokens.colors.primary  // Uses your updated quantumSpatialTokens
```

---

## 🔍 Validating index.ts Exports

You asked: "Are all my index.ts file exports accounted for?"

### **Index Files You Listed**:
1. `/tokens/index.ts` ✅ **WORKING** (exports core, brand, themes)
2. `/tokens/core/index.ts` ✅ **WORKING** (exports accessibility, apple-hig, etc.)
3. `/tokens/brand/index.ts` ✅ **WORKING** (exports quantum, unified, gaming tokens)
4. `/tokens/themes/index.ts` ❌ **BROKEN** (exports non-existent files)
5. `/m4-acceleration/index.ts` - Need to check
6. `/m4-acceleration/components/index.ts` - Need to check
7. `/m4-acceleration/components/framer/index.ts` - Need to check
8. `/cloudflare-workers/index.ts` - Need to check

### **Validation Command**:
```bash
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

# Check for TypeScript errors in all index files
npx tsc --noEmit

# Or validate specific index file:
node -e "import('./tokens/index.ts').then(() => console.log('✅ tokens/index.ts valid')).catch(err => console.error('❌ Error:', err))"
```

### **Fix Priority**:
1. **CRITICAL**: Fix `tokens/themes/index.ts` (broken exports)
2. **CRITICAL**: Fix `tokens/index.ts` line 26 (wrong appleHIGTokens path)
3. **HIGH**: Set `DesignSystemProvider.tsx` API_ENDPOINT
4. **MEDIUM**: Validate all other index files

---

## 🎨 Complete Color Customization Workflow

### **The Full Process (From Start to Finish)**:

```bash
# ===== STEP 1: Edit Your Color Preferences =====
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

# Open the primary color source file
open tokens/brand/quantumSpatialTokens.ts

# Change lines 10-34 to your preferred colors
# Example: Make it deep purple/pink theme
colors: {
  primary: '#1A0A1C',        // Deep purple background
  secondary: '#2A1832',      // Rich purple secondary
  tertiary: '#3A2A4A',       // Lighter purple tertiary

  accent: '#C34FF7',         // Bright purple accent
  accentSecondary: '#EC47BC', // Hot pink accent
  accentTertiary: '#F74FC3',  // Rose accent

  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.85)',

  glassLight: 'rgba(255, 255, 255, 0.15)',  // Slightly more visible glass
  glassMedium: 'rgba(255, 255, 255, 0.10)',
  glassDark: 'rgba(255, 255, 255, 0.05)',
}

# Save the file


# ===== STEP 2: Fix Broken Token Exports (CRITICAL) =====

# Fix appleHIGTokens import path
open tokens/index.ts
# Change line 26 from './brand/appleHIGTokens' to './core/appleHIGTokens'
# Save

# Fix themes/index.ts
open tokens/themes/index.ts
# Replace entire file with correct exports (see Problem 2 above)
# Save


# ===== STEP 3: Rebuild TypeScript Tokens =====

# Compile tokens to JavaScript
npm run build
# Or:
npx tsc --project tsconfig.json

# Verify no errors
npx tsc --noEmit


# ===== STEP 4: Deploy to Cloudflare Worker =====

cd ../cloudflare-workers

# Deploy updated tokens
npx wrangler deploy unified-design-system-worker.js

# Test the endpoint
curl "https://unified-design-system.YOUR_ACCOUNT.workers.dev/design-system/tokens?state=quantum&format=framer"

# You should see your new color values in the JSON response


# ===== STEP 5: Update Framer Component API Endpoint =====

cd ../m4-acceleration/components/framer

# Open DesignSystemProvider.tsx
open DesignSystemProvider.tsx

# Change line 46:
const API_ENDPOINT = "https://unified-design-system.YOUR_ACCOUNT.workers.dev";

# Save


# ===== STEP 6: Test in Framer =====

# Open your Framer project
# Refresh the canvas
# The DesignSystemProvider will fetch your new colors
# All components using the design system will update automatically


# ===== STEP 7: Regenerate Components (Optional) =====

# If you want to regenerate all QuantumSpatial components with new colors:
cd /Users/pennyplatt/Documents//Oksana/OksanaFoundationModel

# Start the unified MCP system
node run-unified-creative-strategic-intelligence-mcp.js

# Once running, use Claude with MCP tools to regenerate components
# The tools will automatically use your updated quantumSpatialTokens
```

---

## 📊 Token Architecture (For Reference)

### **How Tokens Flow Through the System**:

```
1. SOURCE FILES (You Edit Here):
   ├── tokens/brand/quantumSpatialTokens.ts  ← PRIMARY COLOR SOURCE
   ├── tokens/brand/unifiedTokens.ts         ← APPLE HIG + GAMING COLORS
   └── tokens/brand/enhancedGamingTokens.ts  ← GAMING-SPECIFIC EFFECTS

2. EXPORT CHAIN:
   ├── tokens/brand/index.ts                 ← Exports all brand tokens
   ├── tokens/core/index.ts                  ← Exports foundation tokens
   ├── tokens/themes/index.ts                ← Exports theme configurations
   └── tokens/index.ts                       ← MAIN EXPORT HUB

3. BUILD PROCESS:
   TypeScript (.ts) → Compiled → JavaScript (.js)
   npm run build

4. DEPLOYMENT:
   JavaScript (.js) → Cloudflare Worker → API Endpoint
   npx wrangler deploy

5. CONSUMPTION:
   Framer Component → Fetch from API → Apply Tokens → Render
   DesignSystemProvider.tsx
```

---

## 🚨 Common Issues and Solutions

### **Issue 1: "My color changes aren't showing up"**

**Possible Causes**:
1. Didn't rebuild TypeScript → JavaScript
2. Didn't deploy to Cloudflare Worker
3. Framer is caching old tokens
4. API_ENDPOINT is still empty string

**Solution**:
```bash
# Rebuild
npm run build

# Redeploy
cd ../cloudflare-workers && npx wrangler deploy

# Hard refresh Framer (Cmd+Shift+R)
```

---

### **Issue 2: "TypeScript errors when importing tokens"**

**Possible Causes**:
1. Broken import path (appleHIGTokens)
2. Broken themes/index.ts exports
3. Missing type definitions

**Solution**:
Apply fixes from "Fixing Broken Token Connections" section above

---

### **Issue 3: "Components still have old hardcoded colors"**

**Possible Causes**:
1. Component has inline color overrides (like PremiumQuantumSpatial.tsx)
2. Component not using DesignSystemProvider
3. Component using old token references

**Solution**:
```typescript
// Check if component has hardcoded colors:
const premiumColors = {
  quantum: {
    bg: "#0D0D15",  ← HARDCODED - Remove this
  }
}

// Replace with token system:
const { tokens } = useDesignSystem();
const bg = tokens.colors.primary;  ← Uses your updated tokens
```

---

## 🎯 Quick Reference Card

### **"I Want to Change Colors - What Do I Do?"**

**30-Second Version**:
1. Edit `/tokens/brand/quantumSpatialTokens.ts` (lines 10-34)
2. Run `npm run build`
3. Deploy to Cloudflare Worker
4. Refresh Framer

**5-Minute Version**:
1. Fix broken token exports (see Problems 1 & 2)
2. Edit color source files (quantumSpatialTokens.ts, unifiedTokens.ts)
3. Rebuild TypeScript
4. Deploy to worker
5. Set API_ENDPOINT in DesignSystemProvider.tsx
6. Test in Framer

**Complete Version**:
Follow the "Complete Color Customization Workflow" section above

---

## 📚 Files Reference (All Paths)

### **Source Token Files (Edit Colors Here)**:
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/unifiedTokens.ts
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/enhancedGamingTokens.ts
```

### **Framer Components (Quick Override)**:
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/components/framer/PremiumQuantumSpatial.tsx
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/components/framer/DesignSystemProvider.tsx
```

### **Export Chain (Fix Imports)**:
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/index.ts
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/index.ts
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/themes/index.ts
```

### **Cloudflare Worker (Deploy Tokens)**:
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/cloudflare-workers/unified-design-system-worker.js
```

### **Component Markdown Files (Regenerate)**:
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/QuantumSpatial_*.md
```

---

## ✅ Success Checklist

After following this guide, you should have:

- [ ] **Fixed** appleHIGTokens import path error
- [ ] **Fixed** broken themes/index.ts exports
- [ ] **Set** DesignSystemProvider API_ENDPOINT to worker URL
- [ ] **Edited** quantumSpatialTokens.ts with YOUR preferred colors
- [ ] **Rebuilt** TypeScript tokens to JavaScript
- [ ] **Deployed** updated tokens to Cloudflare Worker
- [ ] **Tested** token endpoint returns your new colors
- [ ] **Refreshed** Framer to see new colors applied
- [ ] **Understood** how to regenerate components with new styles

---

## 🚀 Next Steps

1. **Apply Fixes**: Fix the 3 critical problems (see "Fixing Broken Token Connections")
2. **Customize Colors**: Edit quantumSpatialTokens.ts to your taste
3. **Deploy**: Rebuild and deploy to Cloudflare Worker
4. **Test**: Verify colors in Framer
5. **Regenerate**: Use MCP tools to regenerate components with new styles

---

**You now have complete control over your design system colors!**

**Any questions? Start with fixing the 3 critical problems, then customize your colors in quantumSpatialTokens.ts.**
<function_calls>
<invoke name="Read">
<parameter name="file_path">/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/index.ts