# Creative Services

Design-focused skills and tools for generating components, validating designs, and orchestrating creative workflows.

## 🎯 Overview

This directory contains **pseudo-skills** - TypeScript functions that provide skill-like functionality WITHOUT requiring the Claude Agent SDK. This allows immediate use without API dependencies.

## 📁 Structure

```
creative-services/
├── skills/                  # Pseudo-skill implementations
│   ├── svg-generation/      # Generate quantum-spatial + heritage SVGs
│   ├── vision-pro-ui-kit/   # Vision Pro spatial components
│   ├── design-system-automation/
│   ├── brand-voice-validation/
│   └── strategic-planning/
│
├── orchestration/           # Workflow coordination
│   ├── pseudo-orchestrator.ts
│   └── config/
│       └── pseudo-skills-registry.json
│
└── deliverables/            # Generated outputs
    ├── svg-components/
    ├── vision-pro-components/
    ├── design-tokens/
    └── validation-reports/
```

## 🚀 Quick Start

### Generate SVG Components
```bash
cd creative-services

# Generate all SVG components (pseudo-skill)
npx tsx orchestration/pseudo-orchestrator.ts --svg-only
```

### Generate Vision Pro Components
```bash
# Generate Vision Pro UI Kit
npx tsx orchestration/pseudo-orchestrator.ts --vision-pro-only
```

### Run Full Suite
```bash
# Generate everything
npx tsx orchestration/pseudo-orchestrator.ts --full-suite
```

## 🔧 Pseudo-Skills vs Real Skills

**Pseudo-Skills (Current):**
- ✅ No Claude Agent SDK required
- ✅ No API costs
- ✅ Fast local execution
- ✅ Fully testable
- ✅ Easy debugging

**Real Skills (Future):**
- Powered by Claude Agent SDK
- API-driven generation
- More sophisticated outputs
- Requires API key

## 📚 Documentation

See each skill directory for detailed documentation:
- `skills/svg-generation/SKILL.md`
- `skills/vision-pro-ui-kit/` → See `../../m4-acceleration/vision-pro/SKILL.md`
- `skills/design-system-automation/SKILL.md`

## 🎨 Vision Pro Components

Vision Pro UI Kit is located in:
```
../../m4-acceleration/vision-pro/
```

This includes:
- 20 primitive components
- 15 composition components
- 5 full experiences
- RealityKit integration
- Volumetric visualizations

