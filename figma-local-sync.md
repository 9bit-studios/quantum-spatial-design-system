# Figma ↔ Local Design System Sync Workflow
## Bidirectional Style Validation & Adaptation

**Date**: 2025-12-02
**Status**: Production Workflow
**Authority**: Apple Intelligence Strategic Director Framework

---

## 🎯 The Problem You're Solving

**Your Need**: "I need a way of validating the styles from my Figma project and adapting the component and token styles in my local project /design-system to conform with the styles on my screen. I also would like to be able to do this with styled Framer components."

**What This Workflow Does**:
1. **Extract** styles from your Figma components (what you see on screen)
2. **Compare** against your local token files (`quantumSpatialTokens.ts`, etc.)
3. **Validate** differences and mismatches
4. **Adapt** local tokens to match Figma (or vice versa)
5. **Sync** to Framer components automatically

---

## 🏗️ Architecture Overview

```
FIGMA (Source of Truth)
  ↓
[Turbo-Variables Plugin] → Extract styles from selected components
  ↓
[JSON Export] → Save to /asset-pipeline/figma-extracted-styles.json
  ↓
[Validation Script] → Compare against local tokens
  ↓
[Diff Report] → Show what's different
  ↓
[Sync Script] → Update local tokens to match Figma
  ↓
LOCAL TOKENS (quantumSpatialTokens.ts, unifiedTokens.ts)
  ↓
[Build Process] → Compile TypeScript → JavaScript
  ↓
CLOUDFLARE WORKER → Serve updated tokens
  ↓
FRAMER COMPONENTS → Auto-fetch new styles
```

---

## 📦 Enhanced Turbo-Variables Plugin

### **New Capabilities**:
1. **Extract Mode**: Read existing Figma styles → Export JSON
2. **Create Mode**: Push local tokens → Create Figma variables (existing)
3. **Validate Mode**: Compare Figma vs Local → Generate diff report
4. **Sync Mode**: Bidirectional sync with conflict resolution

---

## 🛠️ Solution Components

### **Component 1: Enhanced Figma Plugin (code.ts)**

I'll create an enhanced version of your turbo-variables plugin that can:
- Extract colors from selected components/frames
- Export to JSON format matching your local token structure
- Validate against existing variables
- Show visual diff in Figma UI

### **Component 2: Local Validation Script (TypeScript)**

A script that:
- Reads Figma-exported JSON
- Compares against `quantumSpatialTokens.ts`
- Generates diff report with color swatches
- Suggests which tokens to update

### **Component 3: Sync Script (TypeScript)**

Automates the sync process:
- Updates local token files
- Rebuilds TypeScript
- Deploys to Cloudflare Worker
- Updates Framer components

---

## 🚀 Step-by-Step Workflow

### **Workflow 1: Extract Styles from Figma → Update Local**

**Use Case**: You've designed new components in Figma and want to update your local tokens to match.

```bash
# Step 1: In Figma
1. Select your styled components (e.g., buttons from your screenshot)
2. Run "Turbo Variables" plugin
3. Choose "Extract Styles" mode
4. Plugin exports: /asset-pipeline/figma-extracted-styles.json

# Step 2: In Terminal
cd /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

# Run validation script
npm run validate-figma-styles

# Output:
# ====== STYLE VALIDATION REPORT ======
#
# Differences Found: 12
#
# PRIMARY COLORS:
#   Figma:     #0A0C15 (deep-space-indigo)
#   Local:     #131A36 (deep-space-indigo)
#   Status:    MISMATCH ❌
#
# ACCENT COLORS:
#   Figma:     #C34FF7 (quantum-violet)  ← NEW
#   Local:     #6A3093 (quantum-violet)
#   Status:    DIFFERENT ⚠️
#
# ...

# Step 3: Review and Apply
npm run sync-figma-to-local

# This will:
# 1. Update quantumSpatialTokens.ts with Figma colors
# 2. Create backup of old tokens
# 3. Rebuild TypeScript
# 4. Optionally deploy to Worker
```

---

### **Workflow 2: Push Local Tokens → Update Figma**

**Use Case**: You've edited `quantumSpatialTokens.ts` locally and want Figma to match.

```bash
# Step 1: Edit local tokens
open /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts

# Change colors to your preference
# Save

# Step 2: Sync to Figma
npm run sync-local-to-figma

# This generates: /asset-pipeline/local-tokens-for-figma.json

# Step 3: In Figma
# Run "Turbo Variables" plugin
# Choose "Import from Local" mode
# Select the generated JSON file
# Plugin creates/updates variables
```

---

### **Workflow 3: Validate & Diff (No Sync)**

**Use Case**: You just want to see what's different without making changes.

```bash
# Generate visual diff report
npm run diff-figma-local

# Opens browser with side-by-side comparison:
# [Figma Color]  vs  [Local Color]
# #0A0C15            #131A36  ← Click to copy
#
# With color swatches, hex values, and token names
```

---

## 📁 New Files We'll Create

### **1. Enhanced Plugin: `code-enhanced.ts`**

```
/asset-pipeline/asset-review-queue/figma/plugins/turbo-variables/code-enhanced.ts
```

**Features**:
- Extract mode
- Import mode
- Validate mode
- Visual diff UI

### **2. Validation Script: `scripts/validate-figma-styles.ts`**

```
/design-system/scripts/validate-figma-styles.ts
```

**Features**:
- Read Figma JSON
- Compare against local tokens
- Generate diff report
- Output to console + HTML

### **3. Sync Script: `scripts/sync-figma-to-local.ts`**

```
/design-system/scripts/sync-figma-to-local.ts
```

**Features**:
- Update `quantumSpatialTokens.ts`
- Update `unifiedTokens.ts`
- Create backups
- Rebuild TypeScript
- Deploy to Worker

### **4. Framer Sync Script: `scripts/sync-to-framer.ts`**

```
/design-system/scripts/sync-to-framer.ts
```

**Features**:
- Update Framer component styles
- Update `PremiumQuantumSpatial.tsx`
- Update `DesignSystemProvider.tsx`
- Generate Framer variables JSON

---

## 🎨 Example: Syncing Button Styles from Your Screenshot

Based on your Figma screenshot showing multiple button states:

```bash
# Step 1: Select your button component variants in Figma
# (The "Text Buttons", "Custom Buttons", "Menu Buttons" section)

# Step 2: Run Turbo Variables → Extract Styles

# Plugin extracts:
{
  "buttons": {
    "primary": {
      "background": "#5AC8FA",  ← Extracted from "Primary color" button
      "text": "#FFFFFF",
      "hover": "#6A3093"
    },
    "secondary": {
      "background": "#613FE7",  ← Extracted from "Secondary" button
      "text": "#FFFFFF"
    },
    "ghost": {
      "background": "transparent",  ← From "Ghost" button
      "text": "#5AC8FA",
      "border": "#5AC8FA"
    }
  }
}

# Step 3: Validation script compares
npm run validate-figma-styles

# Output shows:
# Button Primary Background:
#   Figma:  #5AC8FA ✓
#   Local:  #4FC3F7 ← MISMATCH
#
# Button Secondary Background:
#   Figma:  #613FE7 ✓
#   Local:  #AB47BC ← MISMATCH

# Step 4: Sync to local
npm run sync-figma-to-local

# Updates quantumSpatialTokens.ts:
export const quantumSpatialTokens = {
  colors: {
    accent: '#5AC8FA',        // ← Updated from Figma
    accentSecondary: '#613FE7', // ← Updated from Figma
    // ...
  }
}

# Step 5: Deploy
npm run build
cd ../cloudflare-workers
npx wrangler deploy unified-design-system-worker.js

# Step 6: Framer auto-updates
# DesignSystemProvider fetches new tokens
# All Framer components now match Figma!
```

---

## 🔧 Implementation Plan

### **Phase 1: Enhanced Plugin** (30 minutes)

Create the enhanced `code-enhanced.ts` with:
- UI for mode selection (Extract / Import / Validate)
- Style extraction logic
- JSON export functionality
- File system access via Figma API

### **Phase 2: Validation Script** (30 minutes)

Create `validate-figma-styles.ts` with:
- JSON parser
- Token comparator
- Diff generator
- HTML report generator

### **Phase 3: Sync Scripts** (45 minutes)

Create sync automation:
- `sync-figma-to-local.ts`
- `sync-local-to-figma.ts`
- Backup mechanism
- Build/deploy automation

### **Phase 4: Framer Integration** (30 minutes)

Create Framer sync:
- `sync-to-framer.ts`
- Update Framer component files
- Generate Framer-compatible JSON

---

## 📊 Validation Report Example

```
╔═══════════════════════════════════════════════════════════╗
║         FIGMA ↔ LOCAL STYLE VALIDATION REPORT            ║
╠═══════════════════════════════════════════════════════════╣
║  Generated: 2025-12-02 15:30:00                          ║
║  Source: Figma Project "quantum-spatial"                 ║
║  Target: /design-system/tokens/brand/quantumSpatialTokens.ts ║
╚═══════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────┐
│ SUMMARY                                                 │
├─────────────────────────────────────────────────────────┤
│ Total Tokens Compared:     26                           │
│ Matching:                  14 ✓                         │
│ Mismatched:                8  ❌                         │
│ New in Figma:              3  ⭐                         │
│ Missing in Figma:          1  ⚠️                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ MISMATCHES (Requires Attention)                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [1] deep-space-indigo                                   │
│     Figma:  ██████ #0A0C15                              │
│     Local:  ██████ #131A36                              │
│     Diff:   Hue: -5°, Sat: -10%, Lum: +3%              │
│     Action: UPDATE LOCAL → #0A0C15                      │
│                                                         │
│ [2] quantum-violet                                      │
│     Figma:  ██████ #C34FF7                              │
│     Local:  ██████ #6A3093                              │
│     Diff:   Hue: +20°, Sat: +40%, Lum: +25%            │
│     Action: UPDATE LOCAL → #C34FF7                      │
│                                                         │
│ [3] subtle-cyan (Button Primary)                        │
│     Figma:  ██████ #5AC8FA                              │
│     Local:  ██████ #4FC3F7                              │
│     Diff:   Hue: +2°, Sat: +5%, Lum: +1%               │
│     Action: UPDATE LOCAL → #5AC8FA                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ NEW IN FIGMA (Not in Local)                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [1] button-glow-effect                                  │
│     Value:  #6A3093 with opacity 0.3                    │
│     Usage:  Used in 12 button components                │
│     Action: ADD TO LOCAL                                │
│                                                         │
│ [2] card-border-hover                                   │
│     Value:  #5AC8FA                                     │
│     Usage:  Used in 8 card components                   │
│     Action: ADD TO LOCAL                                │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ RECOMMENDATIONS                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ✓ Run: npm run sync-figma-to-local                     │
│   → Updates 8 mismatched colors                         │
│   → Adds 3 new colors                                   │
│   → Creates backup: quantumSpatialTokens.ts.backup      │
│                                                         │
│ ✓ Or manually update in:                                │
│   /design-system/tokens/brand/quantumSpatialTokens.ts   │
│                                                         │
│ ✓ After sync:                                           │
│   npm run build                                         │
│   npm run deploy-worker                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Continuous Sync Options

### **Option 1: Manual Trigger**
```bash
# When you update Figma designs
npm run sync-figma-to-local
```

### **Option 2: File Watcher** (Auto-sync when Figma exports)
```bash
# Watches /asset-pipeline/ folder for new Figma exports
npm run watch-figma-exports

# When new figma-extracted-styles.json appears:
# 1. Auto-validates
# 2. Shows diff
# 3. Asks for confirmation
# 4. Syncs if approved
```

### **Option 3: Figma Plugin with Direct Export**
```bash
# Enhanced plugin with network access
# Exports directly to your local filesystem
# (Requires Figma plugin manifest changes)
```

---

## 📝 Package.json Scripts

Add these to `/design-system/package.json`:

```json
{
  "scripts": {
    "validate-figma-styles": "tsx scripts/validate-figma-styles.ts",
    "sync-figma-to-local": "tsx scripts/sync-figma-to-local.ts",
    "sync-local-to-figma": "tsx scripts/sync-local-to-figma.ts",
    "sync-to-framer": "tsx scripts/sync-to-framer.ts",
    "diff-figma-local": "tsx scripts/diff-figma-local.ts --html",
    "watch-figma-exports": "tsx scripts/watch-figma-exports.ts",
    "deploy-worker": "cd ../cloudflare-workers && npx wrangler deploy unified-design-system-worker.js"
  }
}
```

---

## 🎯 For Your Specific Use Case

Based on your screenshot showing styled buttons with different states:

### **Buttons You Want to Sync**:
1. **Text Buttons**: Primary, Secondary, Ghost variants
2. **Primary color**: With glow effects
3. **Ghost color**: With border styling
4. **Menu Buttons**: Account, Tooltip variants

### **What Gets Extracted**:
- Background colors
- Text colors
- Border colors
- Hover states
- Active states
- Disabled states
- Glow/shadow effects

### **Where It Updates**:
1. **Local Tokens**: `quantumSpatialTokens.ts`
2. **Framer Components**: `PremiumQuantumSpatial.tsx`
3. **Worker**: Cloudflare design-system API
4. **Documentation**: Auto-generated color reference

---

## ✅ Benefits of This Workflow

1. **Visual Truth**: Figma becomes your visual source of truth
2. **Auto-Sync**: No manual hex code copying
3. **Validation**: See exactly what's different before syncing
4. **Backup**: Always creates backups before updates
5. **Framer Ready**: Framer components auto-update
6. **Diff Reports**: Visual HTML reports for review
7. **Reversible**: Can sync both directions

---

## 🚀 Next Steps

**I'll now create these files for you**:

1. ✅ **Enhanced Figma Plugin** (`code-enhanced.ts`)
   - Extract styles from selection
   - Export to JSON
   - Visual diff in Figma

2. ✅ **Validation Script** (`validate-figma-styles.ts`)
   - Compare Figma vs Local
   - Generate diff report
   - Show color swatches

3. ✅ **Sync Script** (`sync-figma-to-local.ts`)
   - Update local tokens
   - Create backups
   - Rebuild & deploy

4. ✅ **Framer Sync** (`sync-to-framer.ts`)
   - Update Framer components
   - Generate Framer variables

**Ready to implement?** Let me know if you want me to create these scripts now, or if you'd like to see a prototype of any specific component first!

---

**Date**: 2025-12-02
**Status**: Workflow Designed
**Next**: Implement scripts and enhanced plugin
