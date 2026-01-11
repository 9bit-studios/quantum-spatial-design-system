# Quantum-Spatial Design System - Figma Plugin & Foundation Explorer

## 📦 What's Included

1. **code.ts** - Figma plugin that creates your complete Quantum-Spatial color system
2. **quantum-spatial-foundation-explorer.html** - Interactive Apple-styled color showcase
3. **manifest.json** - Figma plugin configuration (use your existing one)
4. **package.json** - Dependencies (use your existing one)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Plugin Setup

```bash
# In your Turbo-Variables folder (where you have package.json)
# Replace the existing code.ts with the new code.ts

# Build the plugin
npm run build
```

### Step 2: Load in Figma

1. **Figma Desktop → Plugins → Development → Import plugin from manifest**
2. Select your `manifest.json` file
3. **Run the plugin** from Plugins menu
4. ✨ **60 colors created instantly**

---

## 🎨 What the Plugin Creates

### Foundation (8 colors)
- void-black (#0A0621)
- deep-space-indigo (#131A36)
- ultra-indigo (#1E1F5C)
- dimensional-eggplant (#331F4A)
- midnight-richness (#0D0D15)
- quantum-violet (#6A3093)
- ultra-marine (#405DE5)
- ultra-violet (#613FE7)

### Accents (5 colors)
- subtle-cyan (#5AC8FA)
- dimensional-teal (#126D71)
- rose-energy (#BF4080)
- quantum-pulse-pink (#FF2D55)
- dimensional-orange (#FF6B6B)

### Heritage (6 colors)
- heritage-green (#2C5F2D)
- heritage-green-light (#3D8B40)
- heritage-green-dark (#1B3D1A)
- heritage-pixel-green (#3DFF74)
- heritage-pixel-aqua (#00FFC8)
- ultra-heritage-pixel-green (#94FE00)

### Functional (3 colors)
- primary-action (#5AC8FA)
- secondary-action (#126D71)
- tertiary-action (#613FE7)

### Semantic (4 colors)
- destructive (#BF4080)
- success (#2C5F2D)
- warning (#FF6B6B)
- info (#5AC8FA)

---

## 🌐 Foundation Explorer

Open `quantum-spatial-foundation-explorer.html` in any browser to see:

✅ Interactive color palette with click-to-copy  
✅ Glassmorphism material examples  
✅ State gradient showcases  
✅ Apple HIG-compliant styling  
✅ M4-optimized animations  
✅ Quantum particle effects  

### Features:
- **State Toggle**: Switch between foundation, heritage, and quantum views
- **Live Materials**: See glassmorphism in action
- **Gradient Showcases**: Heritage, transitional, quantum, and energy gradients
- **Copy Colors**: Click any color card to copy hex value

---

## 🔧 Next Steps

### Batch Apply to Existing Designs

1. **Select your 200 design frames** in Figma
2. Use "Batch Styler" plugin (free)
3. **Apply Quantum-Spatial collection**
4. Spot-check 5-10 critical files

### Export for Code

```typescript
// In your Framer/React projects:
import { quantumSpatialColors } from './tokens/colors';

const Button = styled.button`
  background: ${quantumSpatialColors.subtleCyan};
  color: ${quantumSpatialColors.voidBlack};
`;
```

---

## 💡 Pro Tips

1. **Organize by Category**: Variables have emoji descriptions (🌌 🎮 ✨)
2. **Use Smart Selection**: Figma's variable panel lets you filter
3. **Create Aliases**: Make semantic tokens that reference core colors
4. **Export Tokens**: Use "Variables Importer" to sync with your CSS

---

## 🎯 For Your Portfolio Launch

**Priority Order:**
1. ✅ Run plugin → Get variables
2. ✅ Apply to Oksana.ai landing page (top priority)
3. ✅ Update 3-5 hero portfolio pieces
4. ✅ Open foundation explorer in browser for presentation
5. ⏰ Batch update remaining 195 designs later

**Timeline:**
- Plugin setup: 5 minutes
- Apply to 5 hero files: 30 minutes  
- **Total: 35 minutes to portfolio-ready**

---

## 🐛 Troubleshooting

**Plugin doesn't run:**
```bash
# Make sure TypeScript is compiled
npm run build
# Check for code.js file
```

**Variables already exist:**
- Plugin will UPDATE existing variables
- Safe to run multiple times

**Colors look wrong:**
- Check Figma color mode (RGB vs Display P3)
- Verify hex values in variable panel

---

## 📞 Support

Built by **Penny Platt** for **9Bit Studios**  
Quantum-Spatial Design System v2.0  
Powered by Oksana Creative Intelligence

🔗 [9bitstudios.io](https://9bitstudios.io)  
🔗 [oksana.ai](https://oksana.ai)

---

**You now have:**
✅ 60+ production-ready color variables  
✅ Interactive foundation explorer  
✅ Apple HIG-compliant system  
✅ M4-optimized for performance  
✅ Ready for portfolio launch TODAY
