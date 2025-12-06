# Quantum Spatial Design System

**Version:** 2.0
**M4 Optimization:** Active
**Apple HIG Compliance:** Validated

---

## 🎯 Overview

The Quantum Spatial Design System is a comprehensive, HIG-compliant design system featuring M4 Neural Engine optimizations, liquid glass aesthetics, and quantum pixel foundations. Built for iOS, macOS, Vision Pro, and web platforms.

**Key Features:**
- ✅ 80+ color tokens with Display P3 support
- ✅ M4 Neural Engine optimizations
- ✅ Apple HIG validated components
- ✅ Figma & Framer integration
- ✅ TypeScript-first architecture
- ✅ WCAG 2.1 AA accessibility

---

## 📁 Architecture

### Directory Structure

```
design-system/
├── tokens/                     # Design tokens (SOURCE OF TRUTH)
│   ├── source/                 # Human-authored token definitions
│   │   ├── brand/              # Brand-specific tokens
│   │   ├── core/               # Platform-agnostic primitives
│   │   └── themes/             # Theme compositions
│   ├── exports/                # Generated token formats
│   │   ├── css/                # CSS Custom Properties
│   │   ├── scss/               # SCSS variables
│   │   ├── json/               # Style Dictionary format
│   │   ├── js/                 # JavaScript modules
│   │   ├── ts/                 # TypeScript declarations
│   │   ├── figma/              # Figma plugin format
│   │   └── swift/              # iOS/macOS format
│   └── docs/                   # Token documentation
│
├── asset-pipeline/             # Asset workflow management
│   ├── asset-review-queue/     # Assets awaiting validation
│   │   ├── figma/              # From Figma exports
│   │   ├── framer/             # From Framer projects
│   │   └── design-tokens/      # Token candidates
│   ├── validated/              # Approved, integration-ready assets
│   └── integration/            # Integration scripts & reports
│
├── integrations/               # Platform integrations
│   ├── figma/                  # Figma sync & plugins
│   │   ├── plugins/            # Figma plugins
│   │   ├── exported-components/# Validated exports
│   │   ├── styles/             # Style exports
│   │   └── sync/               # Sync automation
│   └── framer/                 # Framer components & packages
│       ├── components/         # Validated components
│       ├── code-overrides/     # Code overrides
│       ├── packages/           # NPM packages
│       └── sync/               # Sync automation
│
├── m4-acceleration/            # M4 Neural Engine optimizations
│   ├── foundation/             # Core M4 features
│   │   ├── quantum-pixels/     # Pixel generators
│   │   └── grid-systems/       # Grid systems
│   └── optimizations/          # Performance guides
│
├── components/                 # React/TypeScript components
│   ├── atoms/                  # Atomic components
│   ├── molecules/              # Molecular components
│   ├── organisms/              # Organism components
│   └── templates/              # Page templates
│
├── styles/                     # Global styles & CSS
├── docs/                       # Documentation
├── tests/                      # Testing suite
├── tools/                      # Build tools & scripts
│   └── scripts/                # Automation scripts
├── dist/                       # Built/compiled output
└── examples/                   # Usage examples
```

---

## 🎨 Design Tokens

### Token Organization

Tokens are organized in **`/tokens/source/`** by category:

**`brand/`** - Brand-specific visual identity
- `colors.ts` - Foundation colors (SOURCE OF TRUTH)
- `gradients.ts` - Gradient systems
- `effects.ts` - Shadows, glows, filters
- `animations.ts` - Animation timing/easing
- `quantumspatial-tokens.css` - Complete CSS variables
- `framer-buttons.css` - Framer-specific button styles

**`core/`** - Platform-agnostic primitives
- `foundations.ts` - Core values (8px grid, touch targets)
- `apple-hig.ts` - Apple HIG compliance tokens
- `accessibility.ts` - WCAG compliance tokens
- `responsive.ts` - Breakpoints, containers

**`themes/`** - Theme compositions
- `petersen-gaming.ts` - Gaming theme
- `ecommerce.ts` - E-commerce theme
- `enterprise.ts` - Enterprise/SaaS theme

### Token Exports

Generated tokens are exported to **`/tokens/exports/`** in multiple formats:

- **CSS:** `exports/css/variables.css` - CSS Custom Properties
- **SCSS:** `exports/scss/_variables.scss` - SCSS variables
- **JSON:** `exports/json/tokens.json` - Style Dictionary format
- **TypeScript:** `exports/ts/tokens.d.ts` - Type definitions
- **Swift:** `exports/swift/DesignTokens.swift` - iOS/macOS
- **Figma:** `exports/figma/tokens.json` - Figma plugin format

### Usage

```typescript
// Import tokens
import { colors } from '@9bit/quantum-spatial/tokens';

// Use in components
const Button = styled.button`
  background: ${colors.interactive.appleBlue};
  color: ${colors.text.primary};
`;
```

```css
/* Use CSS variables */
.button {
  background: var(--apple-blue);
  color: var(--text-primary);
}
```

---

## 🔄 Asset Pipeline

### Workflow

```
┌─────────────┐
│   Design    │ Figma/Framer
│   in Tool   │
└──────┬──────┘
       │ Export
       ▼
┌─────────────┐
│   Review    │ asset-pipeline/asset-review-queue/
│    Queue    │
└──────┬──────┘
       │ Validation (HIG, colors, a11y)
       ▼
┌─────────────┐
│  Validated  │ asset-pipeline/validated/
│   Assets    │
└──────┬──────┘
       │ Integration
       ▼
┌─────────────┐
│   Design    │ integrations/ or components/
│   System    │
└─────────────┘
```

### Adding Assets

**From Figma:**
```bash
# 1. Export from Figma
# 2. Add to review queue
cp component.svg asset-pipeline/asset-review-queue/figma/components/

# 3. Validate
npm run validate:figma

# 4. Integrate (if approved)
npm run integrate:figma
```

**From Framer:**
```bash
# 1. Export from Framer
# 2. Add to review queue
cp Component.tsx m4-acceleration/framer-cloudflare-sync/components/

# 3. Validate
npm run validate:framer

# 4. Integrate (if approved)
npm run integrate:framer
```

### Validation Checklist

- ✅ Apple HIG compliance
- ✅ Color accuracy (matches source of truth)
- ✅ WCAG 2.1 AA accessibility
- ✅ Responsive design
- ✅ Performance optimized
- ✅ No deprecated code

---

## 🔌 Integrations

### Figma Integration

**Location:** `integrations/figma/`

#### Turbo Variables Plugin

Color unification plugin that:
- Scans Figma files for all colors
- Matches colors to source of truth tokens
- Batch replaces similar colors
- Unifies 130+ gradient variations

**Location:** `asset-pipeline/asset-review-queue/figma/plugins/turbo-variables/`

#### Sync Commands

```bash
# Import designs from Figma
npm run figma:import

# Export tokens to Figma
npm run figma:export

# Sync both ways
npm run figma:sync
```

### Framer Integration

**Location:** `integrations/framer/`

#### Components

Validated Framer components with source of truth colors:
- Quantum Buttons
- Quantum Cards
- Quantum Layouts
- Quantum Navigation

**Safety Protocol:** Original Framer files remain in `asset-review-queue/`. Only validated, color-corrected components live in `integrations/framer/`.

#### Sync Commands

```bash
# Import components from Framer
npm run framer:import

# Export components to Framer
npm run framer:export

# Sync both ways
npm run framer:sync
```

---

## ⚡ M4 Neural Engine Acceleration

### Features

**Quantum Pixel Generators:**
- M4-optimized SVG generation
- Canvas-based rendering
- Real-time particle systems
- 60fps performance target

**Volumetric Pixel Viewers:**
- 3D/4D pixel rendering
- State transitions (Heritage → Transitional → Quantum → Superposition)
- M4-enhanced visual effects

**Dimensional Grid Systems:**
- Three-tier grid architecture
- HIG-validated spacing
- Perspective-based depth

### M4 Detection

```typescript
import { detectM4 } from '@9bit/quantum-spatial/m4';

const m4Info = detectM4();
// {
//   hasM4: true,
//   cores: 16,
//   optimizationLevel: 'ultra',
//   recommendedQuality: 'high'
// }
```

### Usage

```typescript
// Apply M4 optimizations automatically
import { QuantumPixelGenerator } from '@9bit/quantum-spatial/m4';

const generator = new QuantumPixelGenerator({
  state: 'quantum',
  autoDetectM4: true  // Automatically optimizes for M4
});
```

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/9bitstudios/quantum-spatial.git

# Navigate to design system
cd quantum-spatial/design-system

# Install dependencies
npm install

# Build tokens
npm run build:tokens

# Start development server
npm run dev
```

### First Component

```typescript
import React from 'react';
import { Button } from '@9bit/quantum-spatial/components';

function App() {
  return (
    <Button variant="primary">
      Quantum Action
    </Button>
  );
}
```

### Using Tokens

```css
/* Import token CSS */
@import '@9bit/quantum-spatial/tokens/exports/css/variables.css';

.my-component {
  background: var(--deep-space-indigo);
  color: var(--text-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}
```

---

## 🛠️ Development

### Scripts

```bash
# Build tokens from source
npm run build:tokens

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Validate tokens
npm run validate:tokens

# Generate documentation
npm run docs:generate
```

### Token Reorganization

If you need to reorganize the token directory:

```bash
# Run reorganization script (interactive)
./tools/scripts/reorganize-tokens.sh
```

This will:
1. Create `/tokens/source/` and `/tokens/exports/` structure
2. Move TypeScript source files to `source/`
3. Move compiled files to `exports/`
4. Clean up map files
5. Handle TSX component files

### Asset Pipeline Setup

To set up the asset pipeline:

```bash
# Run setup script
./tools/scripts/setup-asset-pipeline.sh
```

This creates:
- `asset-pipeline/` directory structure
- `integrations/figma/` skeleton
- `integrations/framer/` skeleton
- README files for each directory

---

## 📚 Documentation

### Guides

- [Architecture Optimization Plan](ARCHITECTURE_OPTIMIZATION_PLAN.md)
- [Framer Safety Protocol](FRAMER_SAFETY_PROTOCOL.md)
- [HIG Iteration Session Guide](HIG_ITERATION_SESSION_GUIDE.md)
- [Style Guide v2.0](../project-guides/style-guides/quantum-spatial-design-system-style-guide-v2.md)

### API Documentation

```bash
# Generate API docs
npm run docs:generate

# View docs locally
npm run docs:serve
```

### Component Docs

All components have inline documentation:

```typescript
/**
 * Quantum Button Component
 *
 * Apple HIG compliant button with quantum spatial aesthetic
 *
 * @param variant - Button style variant
 * @param size - Button size (sm, md, lg)
 * @param disabled - Disabled state
 *
 * @example
 * <Button variant="primary" size="lg">
 *   Click Me
 * </Button>
 */
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Visual Regression Tests

```bash
npm run test:visual
```

### Accessibility Tests

```bash
npm run test:a11y
```

### Token Validation

```bash
npm run validate:tokens
```

---

## 🤝 Contributing

### Workflow

1. Create feature branch: `git checkout -b feature/quantum-cards`
2. Make changes
3. Run tests: `npm test`
4. Validate tokens: `npm run validate:tokens`
5. Commit: `git commit -m "feat: Add quantum card component"`
6. Push: `git push origin feature/quantum-cards`
7. Create Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update build tools
```

### Adding New Tokens

1. Add token to `/tokens/source/brand/colors.ts` (or appropriate file)
2. Run `npm run build:tokens` to generate exports
3. Test in component
4. Update documentation
5. Commit changes

### Adding Components

1. Create component in appropriate category (`atoms/`, `molecules/`, `organisms/`)
2. Use tokens from design system
3. Add TypeScript types
4. Write tests
5. Add documentation
6. Submit PR

---

## 🔍 Troubleshooting

### Token Build Fails

```bash
# Clean and rebuild
npm run clean
npm run build:tokens
```

### Import Errors

Check that you're importing from the correct path:

```typescript
// ✅ Correct
import { colors } from '@9bit/quantum-spatial/tokens';

// ❌ Wrong
import { colors } from '@9bit/quantum-spatial/tokens/source/brand/colors';
```

### M4 Optimizations Not Working

Verify M4 detection:

```typescript
import { detectM4 } from '@9bit/quantum-spatial/m4';

const info = detectM4();
console.log('M4 Detected:', info.hasM4);
console.log('Cores:', info.cores);
```

---

## 📊 Status

### Current Version

- **Design System:** v2.0
- **Token System:** Optimized
- **Asset Pipeline:** Active
- **M4 Optimization:** Active
- **HIG Compliance:** Validated

### Recent Updates

- ✅ Token directory restructuring
- ✅ Asset pipeline implementation
- ✅ Figma/Framer integration
- ✅ M4 Neural Engine optimizations
- ✅ Updated style guide (v2.0)
- ✅ Source of truth color system

---

## 📞 Support

### Resources

- **Documentation:** [/docs/](docs/)
- **Style Guide:** [Style Guide v2.0](../project-guides/style-guides/quantum-spatial-design-system-style-guide-v2.md)
- **Architecture:** [Architecture Plan](ARCHITECTURE_OPTIMIZATION_PLAN.md)

### Contact

- **GitHub:** [9BitStudios/quantum-spatial](https://github.com/9bitstudios/quantum-spatial)
- **Issues:** [Report Issue](https://github.com/9bitstudios/quantum-spatial/issues)

---

## 📄 License

Copyright © 2025 9Bit Studios

---

**Built with ⚡ M4 Neural Engine optimization and 🦄 quantum spatial magic**

---

## 🤖 Apple Intelligence Agency

Multi-agent orchestration system for design automation and content generation.

**Location:** `apple-intelligence-agency/`

### Quantum Leap Suite

Fast-track design generation with M4 Neural Engine optimization:

```bash
cd apple-intelligence-agency/quantum-leap-suite

# Generate SVG components
npx tsx quantum-leap-orchestrator.ts --svg-only

# Generate Vision Pro UI Kit
npx tsx quantum-leap-orchestrator.ts --vision-pro-only
```

### Skills

- **SVG Generation** - 45 quantum-spatial + heritage components
- **Vision Pro UI Kit** - 40 spatial components for visionOS
- **Design System Automation** - Figma-to-code generation
- **Brand Voice Validation** - Content quality checks
- **Strategic Planning** - Product roadmap generation

See: `apple-intelligence-agency/INTEGRATION.md`

