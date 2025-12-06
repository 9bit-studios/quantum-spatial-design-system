# Quantum-Spatial Design System - Figma Deployment

**Generated:** 2025-11-03T01:02:38.042Z
**Version:** 3.0.0

## 📊 System Overview

- **Total Tokens:** 7 (colors, typography, spacing, effects, radii, animation)
- **Total Components:** 30
  - Primitives: 4
  - Molecules: 13
  - Organisms: 4
  - Templates: 8

## 🚀 Rapid Deployment Steps

### 1. Configure Figma URLs

Open `quantum-spatial-staged/components/` and update the Figma URLs in each `.figma.tsx` file:

```typescript
// Replace this:
'<FIGMA_COMPONENTNAME>'

// With actual Figma URL:
'https://figma.com/design/rr48z6oKp9I5HWIVwjcYXL?node-id=XXX-XXX'
```

### 2. Install Dependencies (if needed)

```bash
cd shared-frameworks/sds
npm install
```

### 3. Publish to Figma

```bash
cd shared-frameworks/sds
export FIGMA_TOKEN=***
npx figma connect publish
```

### 4. Verify in Figma

1. Open your Figma file: rr48z6oKp9I5HWIVwjcYXL
2. Enter Dev Mode
3. Select a component
4. View Code Connect snippets

### 5. Deploy Theme to SDS (Optional)

```bash
cd shared-frameworks/sds
npm run app:dev
# Visit http://localhost:8000 to preview
```

### 6. Deploy to Vercel

```bash
# From SDS directory
npm run app:build
vercel deploy
```

## 📁 Generated Files

- `tokens/quantum-spatial-tokens.json` - Consolidated token system
- `components/*.figma.tsx` - Code Connect mappings (30 files)
- `deployment-manifest.json` - Deployment metadata

## 🎨 Theme Configuration

Quantum-Spatial theme CSS has been added to SDS:
- Location: `shared-frameworks/sds/src/quantum-spatial-theme.css`
- Usage: Add `data-theme="quantum-spatial"` to your root element

## 🔧 Troubleshooting

**Code Connect not publishing?**
- Verify FIGMA_TOKEN is set correctly
- Check figma.config.json includes your .figma.tsx files
- Ensure component paths are correct

**Components not showing in Figma Dev Mode?**
- Verify Figma file ID matches
- Check component node IDs are correct
- Re-publish Code Connect

## 📞 Support

For issues, check:
- Code Connect Docs: https://www.figma.com/code-connect-docs/
- SDS GitHub: https://github.com/figma/sds

---

**Status:** Ready for deployment ✨
**Storybook:** Skipped (rapid deployment mode)
**Next:** Map Figma URLs → Publish → Verify
