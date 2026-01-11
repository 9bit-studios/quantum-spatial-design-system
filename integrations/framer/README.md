# Framer Integration

Integration point for Framer prototypes and the Quantum Spatial Design System.

## Directory Structure

```
integrations/framer/
├── components/            # Validated Framer components
├── code-overrides/        # Framer code overrides
├── packages/              # NPM packages for Framer
└── sync/                  # Sync scripts
```

## Safety Protocol

⚠️ **READ-ONLY SOURCE:**
- Original Framer files remain in `asset-pipeline/asset-review-queue/framer/`
- DO NOT modify original Framer project files
- Extract validated components here ONLY

✅ **SAFE WORKFLOW:**
1. Review Framer component in asset-review-queue
2. Extract component logic
3. Create NEW file in integrations/framer/components/
4. Apply source of truth colors
5. Test independently
6. Move to components/ when validated

## Components

Validated Framer components with source of truth colors:
- Quantum Buttons
- Quantum Cards
- Quantum Layouts

## Sync Commands

```bash
# Import from Framer
npm run framer:import

# Export to Framer
npm run framer:export
```

