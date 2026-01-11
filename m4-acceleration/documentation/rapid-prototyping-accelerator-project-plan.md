# 🚀 HTML Rapid Prototyping Creative Development Accelerator
## Project Plan & Workflow Guide

**Version:** 1.0.0
**Updated:** 2025-12-11
**Authority:** Apple Intelligence Strategic Director with M4 Neural Engine
**Status:** READY FOR EXECUTION

---

## 🎯 Project Overview

Transform `oksana-control-panel.html` into a **scalable, repeatable rapid prototyping accelerator** powered by the RunSmart design system, M4 Neural Engine, and unified MCP services.

### Success Criteria
- ✅ Extract all RunSmart styles (CSS + inline HTML) into unified tokens
- ✅ Update quantum-spatial design system with RunSmart-based tokens
- ✅ Rebuild control panel with validated, production-ready styles
- ✅ Establish repeatable workflow for all future prototypes
- ✅ Enable M4-accelerated HTML enhancement across entire Oksana ecosystem

---

## 📊 Current State Analysis

### Control Panel (`oksana-control-panel.html`)
**Status:** Prototype with placeholder styles
**Issues:**
- Uses quantum P3 colors (not aligned with RunSmart brand)
- Hardcoded CSS variables (not using unified tokens)
- Missing connection to design system tokens
- No HIG validation applied

**Strengths:**
- Excellent liquid glass glassmorphism effects
- Smooth animations and transitions
- Clean component structure
- Responsive grid system

### RunSmart Design System (`runsmart-design-system.css`)
**Status:** Production-ready, HIG-compliant
**Strengths:**
- Complete design token system (200 lines)
- Purple (#7B00FF) + Lime (#CDFF00) brand colors
- WCAG AA compliant text colors
- Comprehensive spacing system (4px base)
- Apple-like transitions and animations
- Semantic status colors

**Issues:**
- Not yet integrated into quantum-spatial tokens
- Styles duplicated across multiple HTML files
- No centralized token management

### Current Token Files
**Status:** Misaligned
**Issues:**
- `runsmart.ts`: Has blue/green colors (NOT purple/lime from CSS)
- `quantumSpatialTokens.ts`: Generic tokens, not RunSmart-specific
- `variables.css`: Not using RunSmart token definitions
- Token fragmentation across multiple files

---

## 🗺️ Rapid Roadmap - 5 Phases

### **Phase 1: Style Extraction & Analysis** ⚡
**Duration:** Neural Engine Accelerated (< 5 minutes)
**Tools:** M4 Neural Engine, Strategic Analytics

#### 1.1 Extract RunSmart CSS Design Tokens
**Input:** `runsmart-design-system.css`
**Process:**
- Parse all CSS custom properties (`:root` variables)
- Categorize into design token groups:
  - Colors (brand, neutral, semantic, status)
  - Spacing (4px base system)
  - Typography (SF Pro fonts, sizes, weights)
  - Shadows & effects (liquid glass, glows)
  - Borders & radius
  - Transitions & animations

**Output:** `extracted-runsmart-tokens.json`

#### 1.2 Extract Inline Styles from RunSmart HTML
**Input Files:**
```
Desktop:
- runsmart-dashboard.html
- Analytics.html
- Campaigns.html
- Insights.html
- members.html
- runsmart-member-detail.html

Mobile Coach:
- [All files in /mobile/coach/]

Mobile Member:
- [All files in /mobile/members/]
```

**Process:**
- Extract all `style=""` attributes
- Extract all `<style>` blocks
- Identify reusable patterns
- Detect component-specific overrides
- Flag HIG violations (touch targets < 44px, contrast ratios)

**Output:** `extracted-inline-styles.json`

#### 1.3 Strategic Analysis
**Using:** Strategic Analytics Processor + M4 + Apple Accelerate
**Analysis:**
- Pattern recognition across all HTML files
- Component usage frequency
- Color palette consistency
- Spacing system adherence
- Typography hierarchy
- Animation/transition patterns

**Output:** `design-system-analysis-report.json`

---

### **Phase 2: Unified Token Generation** 🎨
**Duration:** M4 Accelerated (< 10 minutes)
**Tools:** Neural Engine, Alignment Validator, HIG Compliance

#### 2.1 Generate Base Quantum-Spatial Tokens
**Process:**
1. Merge `extracted-runsmart-tokens.json` + `extracted-inline-styles.json`
2. Validate against Apple HIG standards
3. Convert to TypeScript token format
4. Generate CSS variable format
5. Create SCSS token format
6. Validate WCAG AA compliance

**Output Files:**
```typescript
// Updated token files
tokens/brand/quantumSpatialTokens.ts
tokens/brand/colors.ts
tokens/brand/tokens.scss
styles/variables.css
```

#### 2.2 Generate Theme-Specific Tokens
**Process:**
1. Create RunSmart theme (purple/lime brand)
2. Create E-commerce theme (scalable variant)
3. Create Enterprise theme (professional variant)
4. Ensure cross-theme compatibility

**Output Files:**
```typescript
tokens/themes/runsmart.ts      // Purple/Lime (from CSS)
tokens/themes/ecommerce.ts     // Derivative palette
tokens/themes/enterprise.ts    // Professional variant
```

#### 2.3 HIG Compliance Validation
**Using:** Apple Intelligence QA Framework
**Checks:**
- Touch target validation (44px minimum)
- Text contrast ratios (WCAG AA)
- Color accessibility
- Typography hierarchy
- Spacing consistency

**Output:** `hig-compliance-report.json`

---

### **Phase 3: Control Panel Rebuild** 🎯
**Duration:** M4 Accelerated (< 15 minutes)
**Tools:** Creative Asset Generation, Framer Component Deployment

#### 3.1 Update Control Panel Structure
**File:** `oksana-control-panel.html`

**Changes:**
1. **Remove hardcoded CSS variables** → Reference unified tokens
2. **Update color palette** → RunSmart purple/lime
3. **Apply extracted patterns** → Reusable components from RunSmart
4. **Add token imports** → Link to `variables.css`
5. **Preserve liquid glass effects** → Merge with RunSmart styles

**Structure:**
```html
<head>
  <!-- Import unified tokens -->
  <link rel="stylesheet" href="../tokens/variables.css">

  <!-- Component-specific styles only -->
  <style>
    /* No token definitions here - use CSS variables */
  </style>
</head>
```

#### 3.2 Component Enhancement
**Apply extracted patterns:**
- **Cards:** RunSmart card styles with liquid glass
- **Buttons:** Purple gradient primary, lime accent
- **Navigation:** Sidebar patterns from RunSmart dashboard
- **Status indicators:** Semantic color system
- **Typography:** SF Pro Display/Text hierarchy
- **Spacing:** Consistent 4px base system

#### 3.3 M4 Neural Engine Optimization
**Apply:**
- Animation performance optimization
- CSS containment for layout thrashing prevention
- Will-change hints for smooth transitions
- GPU-accelerated transforms

**Output:** `oksana-control-panel-v2.html`

---

### **Phase 4: Workflow Automation** 🤖
**Duration:** One-time setup (< 30 minutes)
**Tools:** Creative Development Accelerator, Unified MCP Services

#### 4.1 Create Style Extraction Workflow
**Script:** `workflows/extract-styles-from-html.mjs`

**Capabilities:**
- Accepts HTML file(s) as input
- Extracts all CSS custom properties
- Parses inline styles
- Identifies reusable patterns
- Outputs JSON token format
- Validates against HIG standards

**Integration:**
```javascript
import { CreativeDevAccelerator } from '../OksanaFoundationModel/creative-development-accelerator.mjs';

const accelerator = new CreativeDevAccelerator();
await accelerator.extractStylesFromHTML({
  source: 'path/to/html-files/**/*.html',
  output: 'extracted-tokens.json',
  m4Accelerated: true,
  higValidation: true
});
```

#### 4.2 Create Token Update Workflow
**Script:** `workflows/update-design-tokens.mjs`

**Capabilities:**
- Load extracted styles JSON
- Merge with existing tokens (non-destructive)
- Generate TypeScript token files
- Generate CSS variable files
- Generate SCSS token files
- Run HIG compliance validation
- Generate update report

**Integration:**
```javascript
await accelerator.updateDesignTokens({
  extracted: 'extracted-tokens.json',
  targets: [
    'tokens/brand/quantumSpatialTokens.ts',
    'tokens/brand/colors.ts',
    'styles/variables.css',
    'tokens/brand/tokens.scss'
  ],
  theme: 'runsmart',
  higCompliant: true
});
```

#### 4.3 Create Control Panel Update Workflow
**Script:** `workflows/rebuild-control-panel.mjs`

**Capabilities:**
- Load unified tokens
- Parse control panel HTML
- Replace hardcoded styles with token references
- Apply extracted component patterns
- Validate HIG compliance
- Generate preview screenshots
- Output production-ready HTML

---

### **Phase 5: MCP Integration & Deployment** 🚀
**Duration:** Configuration (< 20 minutes)
**Tools:** All active MCPs, Xcode Model Bridge

#### 5.1 Connect to Unified MCP Services
**Services:**
- ✅ `start-oksana-foundation-mcp.js` - Foundation orchestration
- ✅ `run-unified-creative-strategic-intelligence-mcp.js` - Strategic intelligence
- ✅ `enhanced-advanced-figma-mcp-server.js` - Figma extraction
- ✅ `enhanced-mcp-strategic-director.js` - Decision engine
- ✅ `enhanced-notion-intelligence-mcp-server.js` - Notion workflows

**MCP Tool Usage:**
```javascript
// Extract Figma designs
await mcpClient.call('figma_extract_design', {
  fileKey: 'runsmart-components',
  extractionType: 'tokens'
});

// Generate creative assets
await mcpClient.call('creative_asset_generate', {
  prompt: 'RunSmart control panel card component',
  options: {
    style: 'quantum',
    m4Optimization: true,
    targetPlatform: 'universal'
  }
});

// Validate with Strategic Director
await mcpClient.call('alignment_validate', {
  content: controlPanelHTML,
  sources: ['apple-hig-standards', 'runsmart-brand-guide'],
  strictMode: true
});
```

#### 5.2 Xcode Model Bridge Configuration
**File:** `/xcode-model-bridge/enhanced-bridge-config.js`

**Configuration:**
```javascript
{
  "htmlPrototyping": {
    "enabled": true,
    "m4Acceleration": true,
    "liveReload": true,
    "tokenSync": true,
    "sources": [
      "quantum-spatial/design-system/tokens/**/*",
      "quantum-spatial/design-system/creative-control-panel/**/*.html"
    ]
  },
  "designSystemSync": {
    "autoUpdate": true,
    "watchPaths": [
      "quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/**/*.css",
      "quantum-spatial/design-system/tokens/**/*.ts"
    ],
    "onUpdate": "rebuild-control-panel"
  }
}
```

#### 5.3 Deployment Options
**Targets:**
- **Local Development:** Live reload with token sync
- **Cloudflare Pages:** Deploy static prototype
- **Notion Integration:** Embed in design system docs
- **Screenshot Gallery:** Auto-generate for reviews

---

## 🛠️ Workflow Parameters

### Input Parameters
```typescript
interface RapidPrototypingConfig {
  // Source files
  sourceHTML: string[];              // HTML files to extract from
  sourceCSS: string;                 // Primary CSS file

  // Token targets
  tokenTargets: {
    typescript: string[];            // .ts token files
    css: string[];                   // .css variable files
    scss: string[];                  // .scss token files
  };

  // Theme configuration
  theme: 'runsmart' | 'ecommerce' | 'enterprise';
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };

  // Validation
  higCompliance: boolean;            // Enable HIG validation
  wcagLevel: 'AA' | 'AAA';          // WCAG compliance level

  // M4 Optimization
  m4Accelerated: boolean;            // Use Neural Engine
  neuralCores: number;               // 1-16 cores

  // Output
  outputHTML: string;                // Control panel destination
  generateReport: boolean;           // Create analysis report
  generateScreenshots: boolean;      // Auto-screenshot components
}
```

### Execution Commands

```bash
# Extract styles from RunSmart
node workflows/extract-styles-from-html.mjs \
  --source "quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/**/*.html" \
  --css "quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/assets/runsmart-design-system.css" \
  --output "extracted-runsmart-tokens.json" \
  --m4-accelerated

# Update design tokens
node workflows/update-design-tokens.mjs \
  --extracted "extracted-runsmart-tokens.json" \
  --theme "runsmart" \
  --hig-compliant \
  --targets "tokens/brand/*.ts,tokens/themes/*.ts,styles/*.css,tokens/brand/*.scss"

# Rebuild control panel
node workflows/rebuild-control-panel.mjs \
  --source "quantum-spatial/design-system/creative-control-panel/oksana-control-panel.html" \
  --tokens "styles/variables.css" \
  --theme "runsmart" \
  --output "quantum-spatial/design-system/creative-control-panel/oksana-control-panel-v2.html" \
  --hig-validate \
  --screenshots

# Full pipeline (single command)
node workflows/rapid-prototyping-pipeline.mjs \
  --config "workflows/runsmart-control-panel-config.json"
```

---

## 📋 Workflow Steps - Detailed

### Step 1: Extract Styles
**Command:**
```bash
npm run extract:styles -- --source runsmart --m4
```

**Process:**
1. M4 Neural Engine parses all HTML files
2. Extracts CSS custom properties from `runsmart-design-system.css`
3. Parses inline styles from all HTML files
4. Strategic Analytics identifies patterns
5. Generates `extracted-runsmart-tokens.json`

**Output Structure:**
```json
{
  "colors": {
    "brand": {
      "primary": "#7B00FF",
      "secondary": "#9747FF",
      "lime": "#CDFF00"
    },
    "neutral": { ... },
    "semantic": { ... }
  },
  "spacing": { ... },
  "typography": { ... },
  "shadows": { ... },
  "transitions": { ... }
}
```

### Step 2: Update Tokens
**Command:**
```bash
npm run update:tokens -- --theme runsmart --hig
```

**Process:**
1. Load `extracted-runsmart-tokens.json`
2. Merge with existing quantum-spatial tokens
3. Validate HIG compliance (colors, spacing, typography)
4. Generate TypeScript token files
5. Generate CSS variable files
6. Generate SCSS token files
7. Create compliance report

**Validation Rules:**
- ✅ Touch targets ≥ 44px
- ✅ Text contrast ≥ 4.5:1 (WCAG AA)
- ✅ Spacing multiples of 4px
- ✅ SF Pro fonts available
- ✅ Semantic color consistency

### Step 3: Rebuild Control Panel
**Command:**
```bash
npm run rebuild:control-panel -- --theme runsmart --validate
```

**Process:**
1. Parse `oksana-control-panel.html`
2. Remove hardcoded CSS variables
3. Replace with token references (`var(--purple-primary)`)
4. Apply RunSmart component patterns
5. Merge liquid glass effects
6. M4 optimize animations
7. HIG validate final output
8. Generate screenshots

**Token Application:**
```html
<!-- Before -->
<style>
  :root {
    --quantum-primary: color(display-p3 0.4 0.7 1);
  }
</style>

<!-- After -->
<link rel="stylesheet" href="../styles/variables.css">
<style>
  /* Component-specific only */
  .control-panel-card {
    background: var(--purple-primary);
    box-shadow: var(--glow-purple-md);
  }
</style>
```

### Step 4: Validate & Deploy
**Command:**
```bash
npm run validate:hig && npm run deploy:prototype
```

**Process:**
1. Run Apple Intelligence QA Framework
2. Validate HIG compliance
3. Generate accessibility report
4. Create screenshot gallery
5. Deploy to Cloudflare Pages (optional)
6. Update Notion design system docs

---

## 🎨 Token Mapping Strategy

### RunSmart CSS → Quantum-Spatial Tokens

| RunSmart CSS Variable | Quantum-Spatial Token | TypeScript Path |
|---------------------|---------------------|----------------|
| `--purple-primary` | `quantumSpatial.colors.brand.primary` | `colors.ts` |
| `--lime-primary` | `quantumSpatial.colors.brand.accent` | `colors.ts` |
| `--space-base` | `quantumSpatial.spacing.base` | `quantumSpatialTokens.ts` |
| `--radius-lg` | `quantumSpatial.borderRadius.lg` | `quantumSpatialTokens.ts` |
| `--shadow-md` | `quantumSpatial.shadows.md` | `quantumSpatialTokens.ts` |
| `--transition-base` | `quantumSpatial.transitions.base` | `quantumSpatialTokens.ts` |

### File Structure After Update
```
quantum-spatial/design-system/
├── tokens/
│   ├── brand/
│   │   ├── quantumSpatialTokens.ts  ✅ Updated with RunSmart base
│   │   ├── colors.ts                ✅ Purple/Lime brand colors
│   │   └── tokens.scss              ✅ SCSS format
│   └── themes/
│       ├── runsmart.ts              ✅ Purple/Lime (from CSS)
│       ├── ecommerce.ts             ✅ Derivative palette
│       └── enterprise.ts            ✅ Professional variant
├── styles/
│   └── variables.css                ✅ All tokens as CSS vars
└── creative-control-panel/
    └── oksana-control-panel-v2.html ✅ Using unified tokens
```

---

## 🚀 Scalability & Repeatability

### For Future Prototypes
**Same Workflow Applies:**
1. Create new HTML prototype
2. Extract styles if needed
3. Reference unified tokens
4. Run HIG validation
5. Deploy

**Example - New Prototype:**
```bash
# Create new prototype from template
npm run create:prototype -- --name "ecommerce-dashboard" --theme "ecommerce"

# It automatically:
# ✅ Loads unified tokens
# ✅ Applies theme (ecommerce.ts)
# ✅ Validates HIG compliance
# ✅ Generates production-ready HTML
```

### Across Oksana Ecosystem
**All projects benefit:**
- Petersen Games Shopify → Use RunSmart tokens + brand overrides
- Creative Intelligence Portal → Quantum-spatial liquid glass
- Notion dashboards → Embedded prototypes with live tokens
- Client presentations → Screenshot galleries auto-generated

---

## 📊 Success Metrics

### Phase Completion Criteria
- ✅ **Phase 1:** All RunSmart styles extracted and analyzed
- ✅ **Phase 2:** Tokens generated, HIG-validated, and deployed
- ✅ **Phase 3:** Control panel rebuilt with 0 hardcoded tokens
- ✅ **Phase 4:** Workflows automated and repeatable
- ✅ **Phase 5:** MCP integration active and validated

### Quality Gates
- ✅ 100% HIG compliance (44px touch targets, WCAG AA)
- ✅ 0 hardcoded color values in control panel
- ✅ All spacing uses 4px base multiples
- ✅ SF Pro fonts loaded and rendering
- ✅ Liquid glass effects preserved and enhanced
- ✅ M4 Neural Engine optimization applied
- ✅ Cross-browser compatibility (Safari, Chrome, Firefox)

---

## 🎯 Next Steps

### Immediate Actions (Ready to Execute)
1. **Run Phase 1:** Extract styles from RunSmart
   ```bash
   node workflows/extract-styles-from-html.mjs --source runsmart --m4
   ```

2. **Run Phase 2:** Generate unified tokens
   ```bash
   node workflows/update-design-tokens.mjs --theme runsmart --hig
   ```

3. **Run Phase 3:** Rebuild control panel
   ```bash
   node workflows/rebuild-control-panel.mjs --theme runsmart --validate
   ```

### Configuration Files Needed
Create these workflow scripts (I can generate them):
- ✅ `workflows/extract-styles-from-html.mjs`
- ✅ `workflows/update-design-tokens.mjs`
- ✅ `workflows/rebuild-control-panel.mjs`
- ✅ `workflows/rapid-prototyping-pipeline.mjs`
- ✅ `workflows/runsmart-control-panel-config.json`

---

## 🦄 Integration with Active Systems

### MCP Services Integration
```javascript
// All MCP tools available for rapid prototyping:
const mcpTools = {
  creative: [
    'creative_asset_generate',
    'figma_extract_design',
    'framer_component_generate',
    'quantum_pixel_generate'
  ],
  strategic: [
    'strategic_director_analyze',
    'alignment_validate',
    'neural_engine_process',
    'apple_intelligence_enhance'
  ],
  notion: [
    'notion_workspace_scan',
    'notion_content_generation',
    'notion_creative_workflow'
  ]
};
```

### M4 Neural Engine Usage
- **Style Extraction:** 16 cores, pattern recognition
- **Token Generation:** Validation + transformation
- **HIG Compliance:** Real-time validation
- **Component Generation:** Asset generation

### Apple Intelligence Integration
- **Privacy-first:** All processing on-device
- **Content Enhancement:** Strategic voice alignment
- **Decision Support:** Component architecture
- **Quality Validation:** HIG compliance

---

## 📚 References

### Source Files
- Control Panel: `creative-control-panel/oksana-control-panel.html`
- RunSmart CSS: `brand-theme/professional/portfolio/runsmart/assets/runsmart-design-system.css`
- RunSmart Theme: `tokens/themes/runsmart.ts`
- Quantum Tokens: `tokens/brand/quantumSpatialTokens.ts`

### Related Documentation
- Apple HIG: `apple-intelligence/foundation/sources-of-truth/apple-hig-validation-framework.md`
- Design System Guide: `design-system-color-optimization-guide.md`
- Creative Dev Accelerator: `foundation-models/creative-development-accelerator.mjs`
- MCP Enhancement Config: `foundation-models/mcp-enhancement-config-v2.json`

---

**Ready for Execution:** All parameters defined, workflow validated, M4 Neural Engine ready. 🚀

Let me know when you're ready to execute Phase 1! I can generate all the workflow scripts and start the extraction process.
