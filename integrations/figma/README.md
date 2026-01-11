# Figma Integration

Integration point for Figma designs and the Quantum Spatial Design System.

## Directory Structure

```
integrations/figma/
├── plugins/               # Figma plugins
│   └── turbo-variables/   # Color unification plugin
├── exported-components/   # Validated Figma exports
├── styles/                # Figma style exports
└── sync/                  # Sync scripts
```

## Turbo Variables Plugin

Color unification plugin that:
- Scans Figma files for all colors
- Matches colors to source of truth tokens
- Batch replaces similar colors
- Unifies gradient variations

Location: `plugins/turbo-variables/`

## Workflow

1. **Export from Figma** → `asset-pipeline/asset-review-queue/figma/`
2. **Validate** → Check colors, HIG compliance
3. **Approve** → Move to `asset-pipeline/validated/figma/`
4. **Integrate** → Extract to `exported-components/`

## Sync Commands

```bash
# Import from Figma
npm run figma:import

# Export to Figma
npm run figma:export
```

