# Asset Pipeline

Workflow for validating and integrating design assets from Figma and Framer.

## Directory Structure

```
asset-pipeline/
├── asset-review-queue/    # Assets awaiting validation
│   ├── figma/             # Figma exports
│   ├── framer/            # Framer exports
│   └── design-tokens/     # Token candidates
├── validated/             # Approved assets ready for integration
│   ├── figma/
│   ├── framer/
│   └── tokens/
└── integration/           # Integration scripts and reports
    ├── figma-to-tokens/
    ├── framer-to-components/
    └── validation-reports/
```

## Workflow

### 1. Review Queue
New assets from Figma/Framer land in `asset-review-queue/`

**What goes here:**
- Raw Figma exports (.svg, .png, .fig)
- Framer component exports
- Design token candidates

### 2. Validation
Review each asset for:
- ✅ Apple HIG compliance
- ✅ Color accuracy (source of truth)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Responsive design
- ✅ Performance optimization

### 3. Validated
Approved assets move to `validated/`

### 4. Integration
Scripts extract and integrate into design system:
- `figma-to-tokens/` - Extract colors, typography, spacing
- `framer-to-components/` - Extract React components
- `validation-reports/` - QA documentation

## Usage

### Add Assets to Review Queue

```bash
# From Figma
cp exported-component.svg asset-pipeline/asset-review-queue/figma/components/

# From Framer
cp MyComponent.tsx asset-pipeline/asset-review-queue/framer/components/
```

### Validate Assets

1. Open asset in review queue
2. Check against validation criteria
3. Document issues in validation-reports/
4. Fix issues or reject asset
5. Move approved assets to validated/

### Integrate Validated Assets

```bash
# Run integration script
npm run integrate:figma
npm run integrate:framer
```

## Integration with Design System

Once validated, assets move to:
- **Figma components** → `integrations/figma/exported-components/`
- **Framer components** → `integrations/framer/components/`
- **Design tokens** → `tokens/source/`

