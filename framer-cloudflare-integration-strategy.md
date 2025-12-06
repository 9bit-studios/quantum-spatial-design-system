# Framer-Cloudflare Integration Migration Strategy

**Version:** 1.0.0
**Date:** 2025-11-19
**Status:** Discovery & Planning Phase

---

## Executive Summary

The framer-cloudflare-sync project contains **extensive M4-optimized design system infrastructure** discovered in asset-review-queue. This document analyzes where it should be positioned and how to integrate it with the unified design system architecture.

---

## Current State Analysis

### Framer-Cloudflare Project Location
```
/design-system/asset-pipeline/asset-review-queue/framer-cloudflare-sync/FramerCloudflare/
```

### Project Scope & Purpose

**Multi-Platform Integration Hub:**
- Framer component generation and deployment
- Vercel integration (creative-intelligence-portal)
- Notion integration (design system)
- Cloudflare Workers API endpoints
- M4 Neural Engine optimization
- Quantum-spatial pixel system

**Key Infrastructure:**
- Cloudflare Worker with design system API
- Device detection (M4, M2/M3, M1, Intel)
- Superposition state components
- Neural Engine effects
- Metal API rendering
- Auto-deployer for zero-import integration

### Technology Stack

**Problems Identified:**
1. ❌ Most scripts are CommonJS (`require`, `module.exports`)
2. ❌ Package.json not activated (should verify before activation)
3. ❌ Design settings incorrect (colors, tokens)
4. ❌ Heavy duplication of resources
5. ✅ Infrastructure is strong and comprehensive

**Positives:**
- Complete M4 optimization layer
- Working Cloudflare Worker deployed
- Comprehensive device detection
- Multi-state design system (heritage, transitional, quantum, superposition)
- 70+ JavaScript files with various utilities

---

## Integration Analysis

### Existing Cloudflare Workers

**1. Top-Level Worker (Cross-Platform)**
```
/quantum-spatial/cloudflare-workers/framer-modern-worker.js
```
- **Purpose:** Modern Framer integration (ES module)
- **Pattern:** Manual import approach
- **Status:** Clean, modern, minimal
- **Integration:** Vercel, Framer

**2. M4 Acceleration Worker**
```
/design-system/m4-acceleration/cloudflare-workers/README.md
```
- **Purpose:** M4-optimized design system API
- **Integrations:** Framer, Vercel, Notion
- **Status:** Documented but no implementation
- **Note:** README exists but no actual worker code

**3. Framer-Cloudflare Sync Worker**
```
/asset-pipeline/asset-review-queue/framer-cloudflare-sync/FramerCloudflare/cloudflare-workers/
```
- **Purpose:** Complete design system integration
- **Deployed:** https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev
- **Status:** Fully deployed with M4 optimizations
- **Problem:** CommonJS, outdated patterns, wrong location

### API Sources Configuration

```javascript
// /design-system/tokens/api-sources.js (ES module)
export const apiSources = {
    vercel: { baseUrl: 'https://api.vercel.com', version: 'v2' },
    shopify: { baseUrl: 'https://shopify.dev/api', version: '2024-01' },
    framer: { baseUrl: 'https://api.framer.com', version: 'v1' }
};
```

This confirms cross-platform API integration intent.

---

## Recommended Architecture

### ✅ RECOMMENDATION: Three-Layer Integration

```
/quantum-spatial/
├── cloudflare-workers/              (TOP LEVEL - Cross-Platform Hub)
│   ├── unified-design-system-worker.js (NEW - ES Module)
│   ├── framer-modern-worker.js      (EXISTING - Keep)
│   ├── vercel-integration-worker.js (NEW)
│   ├── notion-integration-worker.js (NEW)
│   └── package.json                 (NEW - Workspace config)
│
├── design-system/
│   ├── m4-acceleration/
│   │   ├── cloudflare-workers/      (M4-SPECIFIC APIs)
│   │   │   ├── m4-optimization-api.js (NEW - ES Module)
│   │   │   ├── quantum-pixel-api.js   (NEW - ES Module)
│   │   │   ├── neural-engine-api.js   (NEW - ES Module)
│   │   │   └── README.md              (EXISTING - Update)
│   │   └── scripts/                 (M4 Generators)
│   │
│   └── integrations/                (NEW - Platform Integrations)
│       └── framer/                  (MIGRATE HERE)
│           ├── components/          (Framer-ready components)
│           ├── templates/           (Component templates)
│           ├── token-generators/    (Token sync utilities)
│           ├── auto-deployer/       (Zero-import integration)
│           └── README.md            (Integration guide)
```

---

## Migration Strategy

### Phase 1: Extract Core M4 Optimization Infrastructure

**Move FROM:** `asset-review-queue/framer-cloudflare-sync/FramerCloudflare/`

**Move TO:** Multiple destinations based on function

#### 1a. M4 Optimization Functions → `/m4-acceleration/cloudflare-workers/`

```bash
# M4-specific API endpoints (CONVERT TO ES MODULES)
cloudflare-workers/functions/m4-optimization.js → m4-acceleration/cloudflare-workers/m4-optimization-api.js
cloudflare-workers/src/services/pixel-viewer.js → m4-acceleration/cloudflare-workers/quantum-pixel-api.js
cloudflare-workers/src/services/design-system.js → m4-acceleration/cloudflare-workers/design-system-api.js
```

**Required Changes:**
- Convert from CommonJS to ES modules
- Update design tokens to match current color system
- Remove duplication, consolidate with existing m4-acceleration resources

#### 1b. Framer Integration → `/design-system/integrations/framer/`

```bash
# Component generation templates
automation/animation-component-template.js → integrations/framer/templates/
automation/ar-component-template.js → integrations/framer/templates/
automation/brand-component-template.js → integrations/framer/templates/
automation/dashboard-component-template.js → integrations/framer/templates/

# Token generation and sync
automation/token-generator-script.js → integrations/framer/token-generators/
automation/framer-sync-script.js → integrations/framer/token-generators/
scripts/extract-design-tokens.js → integrations/framer/token-generators/

# Auto-deployer (zero-import integration)
framer-auto-deployer.html → integrations/framer/auto-deployer/
quantum-spatial-auto-importer.js → integrations/framer/auto-deployer/

# Framer-ready output
framer-cloudflare-output/code/*.js → integrations/framer/components/
framer-output/*.tsx → integrations/framer/components/
```

#### 1c. Cross-Platform Workers → `/quantum-spatial/cloudflare-workers/`

```bash
# Unified design system worker (NEW - consolidate all endpoints)
# Combine:
# - framer-modern-worker.js (existing)
# - cloudflare-workers/src/worker.js (from Framer project)
# - M4 optimization endpoints
# - Vercel/Notion integration endpoints

# Result: unified-design-system-worker.js (ES module)
```

### Phase 2: Convert CommonJS to ES Modules

**Pattern Transformation:**

```javascript
// OLD (CommonJS - WRONG)
const { designTokens } = require('./design-tokens');
module.exports = { generateComponent };

// NEW (ES Module - CORRECT)
import { designTokens } from './design-tokens.js';
export { generateComponent };
```

**Priority Files for Conversion:**
1. All cloudflare-workers/ files
2. All automation/ scripts
3. All token generators
4. All component templates

### Phase 3: Consolidate & Deduplicate

**Identified Duplications:**

| File Category | Locations | Recommendation |
|---------------|-----------|----------------|
| Component templates | `/automation/`, `/scripts/staging/` | Keep automation/, remove staging/ |
| Token generators | `/automation/`, `/scripts/staging/`, root level | Consolidate to integrations/framer/token-generators/ |
| Framer sync scripts | Multiple locations | Single source in integrations/framer/ |
| SVG processors | Multiple locations | Consolidate to asset-pipeline/automation/processors/ |

### Phase 4: Update Package.json & Configuration

**Current Framer Package.json:**
```json
{
  "name": "9bit-integrator",
  "version": "1.0.0",
  "dependencies": {
    "itty-router": "^4.0.14"
  },
  "devDependencies": {
    "wrangler": "^4.14.4"
  }
}
```

**Recommended: Add to Top-Level `/quantum-spatial/package.json`**

```json
{
  "workspaces": [
    "design-system",
    "creative-intelligence-portal",
    "fresh-glass-theme",
    "cloudflare-workers"  // NEW workspace
  ],
  "scripts": {
    "worker:dev": "wrangler dev --config cloudflare-workers/wrangler.toml",
    "worker:deploy:staging": "wrangler deploy --env staging --config cloudflare-workers/wrangler.toml",
    "worker:deploy:production": "wrangler deploy --env production --config cloudflare-workers/wrangler.toml"
  }
}
```

**Create `/cloudflare-workers/package.json`:**

```json
{
  "name": "@9bit/cloudflare-workers",
  "version": "1.0.0",
  "type": "module",
  "main": "unified-design-system-worker.js",
  "scripts": {
    "dev": "wrangler dev",
    "deploy:staging": "wrangler deploy --env staging",
    "deploy:production": "wrangler deploy --env production",
    "test": "node test/integration-test.js"
  },
  "dependencies": {
    "itty-router": "^4.0.14"
  },
  "devDependencies": {
    "wrangler": "^4.14.4"
  }
}
```

---

## Unified Worker Architecture

### Endpoint Structure

```
/quantum-spatial/cloudflare-workers/unified-design-system-worker.js
```

**Endpoint Categories:**

```javascript
// Health & Status
GET /health
GET /status

// Design Tokens (All Platforms)
GET /tokens?state={heritage|transitional|quantum|superposition}
GET /tokens/{platform}?state={state}  // platform: framer, vercel, notion

// M4 Optimization
GET /m4/detect
GET /m4/optimize?device={deviceType}
GET /m4/quantum-pixels?state={state}
GET /m4/dimensional-grids?state={state}

// Framer Integration
POST /framer/generate-component
POST /framer/deploy-component
GET /framer/components
GET /framer/auto-deploy

// Vercel Integration
POST /vercel/deploy-tokens
GET /vercel/components

// Notion Integration
POST /notion/sync-design-system
GET /notion/teamspace-tokens
```

### Implementation Example

```javascript
// unified-design-system-worker.js (ES MODULE)
import { Router } from 'itty-router';
import { detectM4Capabilities } from './services/m4-detection.js';
import { getDesignTokens } from './services/design-tokens.js';
import { generateFramerComponent } from './services/framer-integration.js';

const router = Router();

// Health check
router.get('/health', () => {
  return Response.json({
    status: 'healthy',
    service: 'unified-design-system-worker',
    version: '1.0.0',
    integrations: ['framer', 'vercel', 'notion'],
    m4Optimized: true
  });
});

// M4 Device Detection
router.get('/m4/detect', async (request) => {
  const userAgent = request.headers.get('user-agent');
  const capabilities = await detectM4Capabilities(userAgent);

  return Response.json({
    device: capabilities,
    recommendedState: capabilities.isM4 ? 'superposition' :
                     capabilities.isAppleSilicon ? 'quantum' : 'transitional'
  });
});

// Design Tokens (Universal)
router.get('/tokens', async (request) => {
  const url = new URL(request.url);
  const state = url.searchParams.get('state') || 'quantum';
  const platform = url.searchParams.get('platform') || 'universal';

  const tokens = await getDesignTokens(state, platform);

  return Response.json({
    state,
    platform,
    tokens,
    m4Optimized: true
  });
});

// Framer Component Generation
router.post('/framer/generate-component', async (request) => {
  const { componentType, state, options } = await request.json();

  const component = await generateFramerComponent({
    type: componentType,
    state: state || 'quantum',
    options
  });

  return Response.json({
    success: true,
    component,
    deploymentMethod: 'manual-import'
  });
});

// Export worker
export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx);
  }
};
```

---

## File Migration Checklist

### Priority 1: Core M4 Infrastructure (Week 1)

- [ ] Extract m4-optimization.js → Convert to ES module → Place in m4-acceleration/cloudflare-workers/
- [ ] Extract pixel-viewer.js → Convert to ES module → Place in m4-acceleration/cloudflare-workers/
- [ ] Extract design-system.js → Convert to ES module → Place in m4-acceleration/cloudflare-workers/
- [ ] Update design tokens to match current color system
- [ ] Remove authentication requirements for public endpoints

### Priority 2: Framer Integration (Week 2)

- [ ] Create /design-system/integrations/framer/ directory structure
- [ ] Move component templates → integrations/framer/templates/
- [ ] Move token generators → integrations/framer/token-generators/
- [ ] Move auto-deployer → integrations/framer/auto-deployer/
- [ ] Move Framer-ready components → integrations/framer/components/
- [ ] Convert all to ES modules
- [ ] Create comprehensive README.md

### Priority 3: Unified Worker (Week 3)

- [ ] Create /quantum-spatial/cloudflare-workers/ workspace
- [ ] Implement unified-design-system-worker.js (ES module)
- [ ] Consolidate framer-modern-worker.js endpoints
- [ ] Add Vercel integration endpoints
- [ ] Add Notion integration endpoints
- [ ] Add M4 optimization endpoints
- [ ] Create wrangler.toml configuration
- [ ] Add package.json with ES module support

### Priority 4: Testing & Deployment (Week 4)

- [ ] Create integration tests for all endpoints
- [ ] Test M4 device detection with various user agents
- [ ] Test Framer component generation
- [ ] Test token sync with Framer, Vercel, Notion
- [ ] Deploy to staging environment
- [ ] Verify all endpoints work correctly
- [ ] Update documentation
- [ ] Deploy to production

---

## Deployment Configuration

### Wrangler.toml (Unified Worker)

```toml
name = "quantum-spatial-design-system"
main = "unified-design-system-worker.js"
compatibility_date = "2025-01-01"

[env.staging]
name = "quantum-spatial-design-system-staging"
workers_dev = true
route = { pattern = "design-system-staging.9bitstudios.io/*", zone_name = "9bitstudios.io" }

[env.production]
name = "quantum-spatial-design-system"
workers_dev = false
route = { pattern = "design-system.9bitstudios.io/*", zone_name = "9bitstudios.io" }

[[env.production.kv_namespaces]]
binding = "DESIGN_TOKENS"
id = "your_kv_namespace_id"

[[env.production.kv_namespaces]]
binding = "FRAMER_COMPONENTS"
id = "your_framer_kv_namespace_id"
```

### Environment Variables

```bash
# M4 Optimization
export M4_OPTIMIZATION_ENABLED=true
export NEURAL_ENGINE_ACCELERATION=true
export METAL_API_RENDERING=true

# Platform Integration
export FRAMER_API_URL=https://api.framer.com/v1
export VERCEL_API_URL=https://api.vercel.com/v2
export NOTION_API_URL=https://api.notion.com/v1

# Cloudflare Configuration
export CLOUDFLARE_ACCOUNT_ID=your_account_id
export CLOUDFLARE_API_TOKEN=your_api_token
```

---

## CommonJS to ES Module Conversion Guide

### Step-by-Step Conversion

**1. Update Imports**
```javascript
// BEFORE (CommonJS)
const fs = require('fs');
const path = require('path');
const { designTokens } = require('./tokens');

// AFTER (ES Module)
import fs from 'fs';
import path from 'path';
import { designTokens } from './tokens.js';
```

**2. Update Exports**
```javascript
// BEFORE (CommonJS)
function generateComponent() { /* ... */ }
module.exports = { generateComponent };

// AFTER (ES Module)
export function generateComponent() { /* ... */ }
// OR
export { generateComponent };
```

**3. Add .js Extensions**
```javascript
// BEFORE
import { util } from './util';

// AFTER
import { util } from './util.js';
```

**4. Update Package.json**
```json
{
  "type": "module"
}
```

**5. Use import.meta.url instead of __dirname**
```javascript
// BEFORE
const __dirname = path.dirname(__filename);

// AFTER
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## Recommended Final Structure

```
/quantum-spatial/
│
├── cloudflare-workers/              ✅ NEW - Unified Platform Integration
│   ├── unified-design-system-worker.js (ES module)
│   ├── services/
│   │   ├── m4-detection.js
│   │   ├── design-tokens.js
│   │   ├── framer-integration.js
│   │   ├── vercel-integration.js
│   │   └── notion-integration.js
│   ├── wrangler.toml
│   ├── package.json (type: module)
│   └── README.md
│
└── design-system/
    ├── m4-acceleration/
    │   ├── cloudflare-workers/      ✅ M4-SPECIFIC APIs (ES modules)
    │   │   ├── m4-optimization-api.js
    │   │   ├── quantum-pixel-api.js
    │   │   ├── neural-engine-api.js
    │   │   └── README.md
    │   └── scripts/                 (M4 Generators - existing)
    │
    ├── integrations/                ✅ NEW - Platform Integrations
    │   └── framer/
    │       ├── components/          (Framer-ready components)
    │       ├── templates/           (Component generation templates)
    │       ├── token-generators/    (Token sync utilities)
    │       ├── auto-deployer/       (Zero-import integration)
    │       ├── package.json         (Framer-specific config)
    │       └── README.md            (Framer integration guide)
    │
    └── asset-pipeline/
        └── automation/              (Asset processing - existing)
```

---

## Decision Matrix

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Where should Framer integration live? | `/design-system/integrations/framer/` | Platform-specific integration, not asset processing |
| Where should M4 worker APIs live? | `/design-system/m4-acceleration/cloudflare-workers/` | M4-specific optimizations, part of M4 acceleration |
| Where should unified worker live? | `/quantum-spatial/cloudflare-workers/` | Cross-platform hub, workspace-level |
| Convert CommonJS to ES modules? | ✅ YES - All files | Consistency with existing M4 scripts, modern pattern |
| Activate package.json immediately? | ❌ NO - Verify first | Need to update dependencies, convert to ES modules |
| Keep Framer auto-deployer? | ✅ YES | Zero-import integration is valuable |
| Consolidate duplicate files? | ✅ YES | Remove /scripts/staging/, keep /automation/ |

---

## Next Steps

### Immediate Actions (This Week)

1. **Create directory structure:**
   ```bash
   mkdir -p /quantum-spatial/cloudflare-workers/services
   mkdir -p /design-system/integrations/framer/{components,templates,token-generators,auto-deployer}
   mkdir -p /design-system/m4-acceleration/cloudflare-workers
   ```

2. **Extract and convert priority M4 files** (3-5 files to start):
   - m4-optimization.js
   - pixel-viewer.js
   - design-system.js

3. **Create unified worker stub**:
   - Basic routing structure
   - Health check endpoint
   - M4 detection endpoint

4. **Update M4-INTEGRATION-STRATEGY.md** with Framer integration details

### Questions for Approval

1. **Proceed with three-layer architecture?** (cloudflare-workers/, m4-acceleration/cloudflare-workers/, integrations/framer/)
2. **Start CommonJS → ES module conversion immediately?**
3. **Priority: M4 optimization APIs first, then Framer integration?**
4. **Remove asset-review-queue after successful migration?**

---

© 2025 9Bit Studios
**Framer-Cloudflare Integration:** MIGRATION PLANNING COMPLETE
**Ready for Execution:** AWAITING APPROVAL
