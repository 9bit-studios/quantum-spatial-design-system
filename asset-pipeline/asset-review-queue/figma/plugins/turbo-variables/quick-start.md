# Turbo Variables Plugin - Quick Start

**Status**: ✅ Built and Ready to Use!
**Date**: 2025-12-02

---

## ✅ BUILD SUCCESSFUL!

Both plugin versions compiled:
- ✅ `code.js` (7.6 KB) - Original version
- ✅ `code-enhanced.js` (19.3 KB) - Enhanced version with Extract/Validate

---

## 🚀 3 Steps to Use Enhanced Plugin

### Step 1: Switch to Enhanced Version

```bash
cd turbo-variables

# Use enhanced version
mv code.js code-original.js
mv code-enhanced.js code.js
```

### Step 2: Load in Figma Desktop

1. **Figma → Plugins → Development → Import plugin from manifest**
2. Select `manifest.json` from this folder
3. Plugin appears in Plugins menu

### Step 3: Extract Colors from Your Buttons

1. Select your button components in Figma
2. Run "Turbo Variables" plugin
3. Click "📤 Extract Styles from Figma"
4. Downloads `figma-extracted-styles.json`

**That's it!** You now have all button colors extracted with usage stats.

---

## 📊 What You Get

The extracted JSON contains:
- All colors from your selected components
- Usage counts (how many times each color is used)
- Source information (which component)
- Automatic categorization (foundation, accent, heritage, etc.)

---

## 🎯 Next: Compare with Local Tokens

Move the JSON to your project:
```bash
mv ~/Downloads/figma-extracted-styles.json /Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/asset-pipeline/
```

Then compare the hex values against:
`/quantum-spatial/design-system/tokens/brand/quantumSpatialTokens.ts`

**See which colors are different and need updating!**
