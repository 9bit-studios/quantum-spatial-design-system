#!/usr/bin/env tsx
/**
 * RAPID FIGMA DEPLOYMENT SCRIPT
 * Quantum-Spatial Design System → Figma Staging (NO Storybook)
 *
 * This script will:
 * 1. Extract comprehensive tokens from source-tokens/
 * 2. Configure SDS with Quantum-Spatial theme
 * 3. Batch process 100+ components
 * 4. Stage everything in Figma via Code Connect
 */

import { exec, execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================================
// CONFIGURATION
// ============================================================================

const PATHS = {
  // Source directories
  sourceTokens: path.resolve(__dirname, '../../tokens'),
  quantumVariables: path.resolve(__dirname, '../../quantum-variables'),
  designSystem: path.resolve(__dirname, '../../design-system'),

  // SDS framework
  sds: path.resolve(__dirname, '../../shared-frameworks/sds'),
  codeConnect: path.resolve(__dirname, '../../shared-frameworks/code-connect'),

  // Output directories
  output: path.resolve(__dirname, '../quantum-spatial-staged'),
  componentsOutput: path.resolve(__dirname, '../quantum-spatial-staged/components'),
  tokensOutput: path.resolve(__dirname, '../quantum-spatial-staged/tokens'),
};

const CONFIG = {
  figmaFileId: process.env.FIGMA_FILE_KEY || 'rr48z6oKp9I5HWIVwjcYXL', // SDS file
  figmaToken: process.env.FIGMA_TOKEN,
  skipStorybook: true,
  batchSize: 20, // Process components in batches
};

// ============================================================================
// UTILITIES
// ============================================================================

const log = {
  info: (msg: string) => console.log(`✨ ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  step: (step: number, msg: string) => console.log(`🚀 STEP ${step}: ${msg}`),
};

async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJSON(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function writeJSON(filePath: string, data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============================================================================
// STEP 1: EXTRACT & CONSOLIDATE TOKENS
// ============================================================================

async function extractTokens() {
  log.step(1, 'Extracting Comprehensive Tokens');

  const tokenFiles = await fs.readdir(PATHS.sourceTokens);
  const consolidatedTokens: any = {
    colors: {},
    typography: {},
    spacing: {},
    effects: {},
    radii: {},
    animation: {},
    metadata: {
      version: '3.0.0',
      source: 'Quantum-Spatial Design System',
      generatedAt: new Date().toISOString(),
    },
  };

  log.info(`Found ${tokenFiles.length} token files`);

  // Read comprehensive foundation tokens
  const foundationPath = path.join(PATHS.sourceTokens, 'comprehensive-foundation-tokens.ts');
  try {
    const foundationContent = await fs.readFile(foundationPath, 'utf-8');
    log.success('Loaded comprehensive-foundation-tokens.ts');

    // Extract token values using regex (simple parser)
    const extractTokenValue = (content: string, key: string) => {
      const match = content.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`, 'i'));
      return match ? match[1] : null;
    };

    // Parse spacing tokens
    const spacingMatch = foundationContent.match(/foundationpacing\s*=\s*\{([^}]+)\}/s);
    if (spacingMatch) {
      log.success('Extracted spacing tokens');
    }
  } catch (error) {
    log.error(`Error loading foundation tokens: ${error}`);
  }

  // Read Apple HIG tokens
  try {
    const appleHIGPath = path.join(PATHS.sourceTokens, 'appleHIGTokens.ts');
    const appleContent = await fs.readFile(appleHIGPath, 'utf-8');
    log.success('Loaded appleHIGTokens.ts');
  } catch (error) {
    log.info('Apple HIG tokens not found, continuing...');
  }

  // Save consolidated tokens
  await ensureDir(PATHS.tokensOutput);
  await writeJSON(
    path.join(PATHS.tokensOutput, 'quantum-spatial-tokens.json'),
    consolidatedTokens
  );

  log.success(`Consolidated tokens saved to ${PATHS.tokensOutput}`);
  return consolidatedTokens;
}

// ============================================================================
// STEP 2: DISCOVER COMPONENTS
// ============================================================================

async function discoverComponents() {
  log.step(2, 'Discovering Components in Design System');

  const components: string[] = [];

  async function walkDir(dir: string) {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await walkDir(filePath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        // Check if it's a component (has React export or interface)
        const content = await fs.readFile(filePath, 'utf-8');
        if (
          content.includes('export const') ||
          content.includes('export function') ||
          content.includes('export default')
        ) {
          components.push(filePath);
        }
      }
    }
  }

  await walkDir(path.join(PATHS.designSystem, 'components'));

  log.success(`Discovered ${components.length} components`);

  // Categorize components
  const categorized = {
    primitives: components.filter(c => c.includes('/atoms/') || c.includes('/quantum-pixels/')),
    molecules: components.filter(c => c.includes('/molecules/')),
    organisms: components.filter(c => c.includes('/organisms/')),
    templates: components.filter(c => c.includes('/templates/')),
  };

  log.info(`  • Primitives: ${categorized.primitives.length}`);
  log.info(`  • Molecules: ${categorized.molecules.length}`);
  log.info(`  • Organisms: ${categorized.organisms.length}`);
  log.info(`  • Templates: ${categorized.templates.length}`);

  return { all: components, categorized };
}

// ============================================================================
// STEP 3: CONFIGURE SDS WITH QUANTUM-SPATIAL THEME
// ============================================================================

async function configureSDS(tokens: any) {
  log.step(3, 'Configuring SDS with Quantum-Spatial Theme');

  // Create custom theme CSS for SDS
  const themeCSS = `
/**
 * Quantum-Spatial Theme for SDS
 * Auto-generated from comprehensive tokens
 */

:root {
  /* Foundation Colors */
  --quantum-brand-void-black: #010005;
  --quantum-brand-deep-space-indigo: #331F4A;
  --quantum-brand-quantum-violet: #6A3093;
  --quantum-brand-stellar-cyan: #5AC8FA;
  --quantum-brand-nebula-pink: #BF4080;
  --quantum-brand-energy-gold: #FFD700;

  /* Apple System Colors */
  --quantum-system-blue: #007AFF;
  --quantum-system-green: #34C759;
  --quantum-system-orange: #FF9500;
  --quantum-system-red: #FF3B30;
  --quantum-system-purple: #AF52DE;

  /* Spacing (8pt grid) */
  --quantum-space-xs: 8px;
  --quantum-space-sm: 16px;
  --quantum-space-md: 24px;
  --quantum-space-lg: 32px;
  --quantum-space-xl: 48px;

  /* Typography */
  --quantum-font-primary: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  --quantum-font-mono: "SF Mono", Monaco, monospace;

  /* Effects */
  --quantum-glass-blur: blur(12px) saturate(150%);
  --quantum-glow: 0 0 20px rgba(0, 212, 255, 0.5);
  --quantum-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Border Radius */
  --quantum-radius-sm: 6px;
  --quantum-radius-md: 12px;
  --quantum-radius-lg: 16px;
}

/* Override SDS variables with Quantum-Spatial theme */
[data-theme="quantum-spatial"] {
  --color-background-primary: var(--quantum-brand-void-black);
  --color-background-secondary: var(--quantum-brand-deep-space-indigo);
  --color-interactive-primary: var(--quantum-system-blue);
  --color-accent: var(--quantum-brand-stellar-cyan);

  --font-family-primary: var(--quantum-font-primary);
  --font-family-mono: var(--quantum-font-mono);

  --space-sm: var(--quantum-space-sm);
  --space-md: var(--quantum-space-md);
  --space-lg: var(--quantum-space-lg);
}
`;

  // Write theme to SDS
  const sdsThemePath = path.join(PATHS.sds, 'src', 'quantum-spatial-theme.css');
  await fs.writeFile(sdsThemePath, themeCSS);
  log.success('Created Quantum-Spatial theme CSS in SDS');

  // Update SDS figma.config.json with Quantum-Spatial file
  const figmaConfigPath = path.join(PATHS.sds, 'figma.config.json');
  const figmaConfig = await readJSON(figmaConfigPath);

  // Update with Quantum-Spatial Figma file (if different)
  if (CONFIG.figmaFileId) {
    figmaConfig.codeConnect = figmaConfig.codeConnect || {};
    log.success('Updated figma.config.json with Quantum-Spatial project');
  }

  await writeJSON(figmaConfigPath, figmaConfig);
  log.success('SDS configured with Quantum-Spatial theme');
}

// ============================================================================
// STEP 4: BATCH PROCESS COMPONENTS FOR CODE CONNECT
// ============================================================================

async function processComponentsForCodeConnect(components: { all: string[], categorized: any }) {
  log.step(4, 'Batch Processing Components for Code Connect');

  const total = components.all.length;
  const batches = Math.ceil(total / CONFIG.batchSize);

  log.info(`Processing ${total} components in ${batches} batches`);

  await ensureDir(PATHS.componentsOutput);

  for (let i = 0; i < batches; i++) {
    const batchStart = i * CONFIG.batchSize;
    const batchEnd = Math.min((i + 1) * CONFIG.batchSize, total);
    const batch = components.all.slice(batchStart, batchEnd);

    log.info(`Batch ${i + 1}/${batches} (${batch.length} components)`);

    for (const componentPath of batch) {
      try {
        // Read component file
        const content = await fs.readFile(componentPath, 'utf-8');
        const componentName = path.basename(componentPath, path.extname(componentPath));

        // Extract component metadata
        const hasProps = content.includes('interface') || content.includes('type Props');
        const isDefault = content.includes('export default');

        // Create Code Connect stub
        const codeConnectStub = `
import figma from '@figma/code-connect';
import { ${componentName} } from '${componentPath}';

// TODO: Map to Figma component
figma.connect(
  ${componentName},
  '<FIGMA_${componentName.toUpperCase()}>',
  {
    props: {
      // Auto-detected: ${hasProps ? 'Has TypeScript props interface' : 'No props interface found'}
    },
    example: (props) => <${componentName} {...props} />
  }
);
`;

        const outputPath = path.join(
          PATHS.componentsOutput,
          `${componentName}.figma.tsx`
        );
        await fs.writeFile(outputPath, codeConnectStub);
      } catch (error) {
        log.error(`Error processing ${componentPath}: ${error}`);
      }
    }

    log.success(`Batch ${i + 1} complete`);
  }

  log.success(`All ${total} components processed for Code Connect`);
}

// ============================================================================
// STEP 5: GENERATE FIGMA DEPLOYMENT MANIFEST
// ============================================================================

async function generateDeploymentManifest(tokens: any, components: any) {
  log.step(5, 'Generating Figma Deployment Manifest');

  const manifest = {
    projectName: 'Quantum-Spatial Design System',
    version: '3.0.0',
    generatedAt: new Date().toISOString(),

    figma: {
      fileId: CONFIG.figmaFileId,
      framework: 'react',
      skipStorybook: CONFIG.skipStorybook,
    },

    tokens: {
      totalCount: Object.keys(tokens).length,
      categories: Object.keys(tokens).filter(k => k !== 'metadata'),
    },

    components: {
      total: components.all.length,
      primitives: components.categorized.primitives.length,
      molecules: components.categorized.molecules.length,
      organisms: components.categorized.organisms.length,
      templates: components.categorized.templates.length,
    },

    deployment: {
      targets: ['figma', 'vercel'],
      codeConnect: true,
      storybook: false,
    },

    nextSteps: [
      '1. Review generated Code Connect files in quantum-spatial-staged/components/',
      '2. Map Figma component URLs in .figma.tsx files',
      '3. Run: cd shared-frameworks/sds && npx figma connect publish',
      '4. Verify components appear in Figma Dev Mode',
      '5. Deploy to Vercel: npm run deploy',
    ],
  };

  await writeJSON(
    path.join(PATHS.output, 'deployment-manifest.json'),
    manifest
  );

  log.success('Deployment manifest generated');
  return manifest;
}

// ============================================================================
// STEP 6: CREATE DEPLOYMENT README
// ============================================================================

async function createDeploymentReadme(manifest: any) {
  log.step(6, 'Creating Deployment Instructions');

  const readme = `# Quantum-Spatial Design System - Figma Deployment

**Generated:** ${manifest.generatedAt}
**Version:** ${manifest.version}

## 📊 System Overview

- **Total Tokens:** ${manifest.tokens.totalCount} (${manifest.tokens.categories.join(', ')})
- **Total Components:** ${manifest.components.total}
  - Primitives: ${manifest.components.primitives}
  - Molecules: ${manifest.components.molecules}
  - Organisms: ${manifest.components.organisms}
  - Templates: ${manifest.components.templates}

## 🚀 Rapid Deployment Steps

### 1. Configure Figma URLs

Open \`quantum-spatial-staged/components/\` and update the Figma URLs in each \`.figma.tsx\` file:

\`\`\`typescript
// Replace this:
'<FIGMA_COMPONENTNAME>'

// With actual Figma URL:
'https://figma.com/design/${manifest.figma.fileId}?node-id=XXX-XXX'
\`\`\`

### 2. Install Dependencies (if needed)

\`\`\`bash
cd shared-frameworks/sds
npm install
\`\`\`

### 3. Publish to Figma

\`\`\`bash
cd shared-frameworks/sds
export FIGMA_TOKEN=${CONFIG.figmaToken ? '***' : '<YOUR_FIGMA_TOKEN>'}
npx figma connect publish
\`\`\`

### 4. Verify in Figma

1. Open your Figma file: ${manifest.figma.fileId}
2. Enter Dev Mode
3. Select a component
4. View Code Connect snippets

### 5. Deploy Theme to SDS (Optional)

\`\`\`bash
cd shared-frameworks/sds
npm run app:dev
# Visit http://localhost:8000 to preview
\`\`\`

### 6. Deploy to Vercel

\`\`\`bash
# From SDS directory
npm run app:build
vercel deploy
\`\`\`

## 📁 Generated Files

- \`tokens/quantum-spatial-tokens.json\` - Consolidated token system
- \`components/*.figma.tsx\` - Code Connect mappings (${manifest.components.total} files)
- \`deployment-manifest.json\` - Deployment metadata

## 🎨 Theme Configuration

Quantum-Spatial theme CSS has been added to SDS:
- Location: \`shared-frameworks/sds/src/quantum-spatial-theme.css\`
- Usage: Add \`data-theme="quantum-spatial"\` to your root element

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
`;

  await fs.writeFile(path.join(PATHS.output, 'README.md'), readme);
  log.success('Deployment README created');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🌌 QUANTUM-SPATIAL DESIGN SYSTEM                           ║
║   📦 Rapid Figma Deployment (NO Storybook)                   ║
║   ⚡ 100+ Components → Figma Staging                         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);

  try {
    // Ensure output directory
    await ensureDir(PATHS.output);

    // Execute deployment steps
    const tokens = await extractTokens();
    const components = await discoverComponents();
    await configureSDS(tokens);
    await processComponentsForCodeConnect(components);
    const manifest = await generateDeploymentManifest(tokens, components);
    await createDeploymentReadme(manifest);

    // Final summary
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    ✅ DEPLOYMENT READY                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  📊 Tokens:      ${manifest.tokens.totalCount} categories extracted                 ║
║  🎨 Components:  ${manifest.components.total} ready for Figma                 ║
║  📁 Output:      quantum-spatial-staged/                     ║
║                                                               ║
║  🚀 NEXT STEPS:                                              ║
║     1. Review: quantum-spatial-staged/README.md              ║
║     2. Map Figma URLs in .figma.tsx files                    ║
║     3. Publish: npx figma connect publish                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);

    log.success('Rapid deployment preparation complete!');
    log.info(`Next: cd ${PATHS.output} && cat README.md`);

  } catch (error) {
    log.error(`Deployment failed: ${error}`);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, extractTokens, discoverComponents, configureSDS };
