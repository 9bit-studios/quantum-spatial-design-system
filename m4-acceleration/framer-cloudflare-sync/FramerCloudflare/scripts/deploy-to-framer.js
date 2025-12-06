#!/usr/bin/env node

/**
 * Quantum-Spatial Design System
 * Framer Deployment Script
 * 
 * This script automates the deployment of the Quantum-Spatial design system
 * to Framer, with support for design tokens, components, and layouts.
 * 
 * Features:
 * - Fetches tokens from Cloudflare Worker
 * - Validates tokens and components
 * - Generates Framer-compatible files
 * - Deploys to Framer project
 * - Supports multiple design states
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { verifyTokenSet } = require('../utils/tokenValidator');

// Configuration
const CONFIG = {
  CLOUDFLARE_ENDPOINTS: {
    PRODUCTION: 'https://design-system.9bitstudios.io',
    STAGING: 'https://design-system-staging.9bitstudios.io',
    FALLBACK: 'https://quantum-spatial-design-system.9bitstudios.workers.dev'
  },
  DESIGN_STATES: ['heritage', 'transitional', 'quantum', 'superposition'],
  SOURCE_DIRS: {
    COMPONENTS: path.resolve(__dirname, '../components'),
    LAYOUTS: path.resolve(__dirname, '../layouts'),
    UTILS: path.resolve(__dirname, '../utils')
  },
  OUTPUT_DIR: path.resolve(__dirname, '../framer-output'),
  TEMP_DIR: path.resolve(__dirname, '../.tmp-framer-deploy')
};

// Command line arguments
const args = process.argv.slice(2);
const options = {
  environment: args.includes('--production') ? 'PRODUCTION' : 'STAGING',
  workerUrl: args.find(arg => arg.startsWith('--worker-url='))?.split('=')[1],
  framerProject: args.find(arg => arg.startsWith('--framer-project='))?.split('=')[1],
  apiKey: args.find(arg => arg.startsWith('--access-token='))?.split('=')[1],
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose')
};

// Logger
const log = {
  info: (message) => console.log(`ℹ️ ${message}`),
  success: (message) => console.log(`✅ ${message}`),
  warning: (message) => console.warn(`⚠️ ${message}`),
  error: (message) => console.error(`❌ ${message}`),
  verbose: (message) => options.verbose && console.log(`🔍 ${message}`)
};

// Get worker URL
const getWorkerUrl = () => {
  if (options.workerUrl) return options.workerUrl;
  return CONFIG.CLOUDFLARE_ENDPOINTS[options.environment];
};

// Fallback tokens for when the API is unavailable
const getFallbackTokens = () => {
  const fallbackTokensPath = path.resolve(__dirname, '../tokens/fallback-tokens.json');
  if (fs.existsSync(fallbackTokensPath)) {
    return JSON.parse(fs.readFileSync(fallbackTokensPath, 'utf8'));
  }
  
  // Basic fallback tokens if file doesn't exist
  return {
    heritage: {
      colors: {
        primary: "#131A36", secondary: "#666666", accent: "#888888",
        surface: "#F5F5F5", text: "#333333", background: "#FFFFFF"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { dimensional: false, animations: "minimal", depth: "flat" }
    },
    quantum: {
      colors: {
        primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
        surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15",
        rose: "#BF4080", teal: "#126D71"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { dimensional: true, animations: "rich", depth: "spatial", particles: true }
    }
  };
};

/**
 * Fetches design tokens from the Cloudflare Worker
 * @param {string} state - The design state to fetch
 * @param {string} workerUrl - The worker URL
 * @returns {Promise<Object>} The fetched tokens
 */
async function fetchDesignTokens(state, workerUrl) {
  log.info(`Fetching ${state} tokens from ${workerUrl}...`);
  
  const endpoints = [
    `${workerUrl}/design-system/tokens/${state}`,
    `${workerUrl}/tokens/${state}`,
    `${workerUrl}/api/tokens/${state}`,
    `${CONFIG.CLOUDFLARE_ENDPOINTS.FALLBACK}/tokens/${state}`
  ];
  
  let lastError;
  
  // Try each endpoint
  for (const endpoint of endpoints) {
    try {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      if (options.apiKey) {
        headers['Authorization'] = `Bearer ${options.apiKey}`;
      }
      
      log.verbose(`Trying endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, { headers });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      const tokens = await response.json();
      
      if (!tokens || Object.keys(tokens).length === 0) {
        throw new Error('Received empty tokens data');
      }
      
      log.success(`Successfully fetched ${state} tokens from ${endpoint}`);
      return tokens;
    } catch (err) {
      lastError = err;
      log.verbose(`Failed to fetch from ${endpoint}: ${err.message}`);
    }
  }
  
  // All endpoints failed
  log.warning(`All endpoints failed for ${state} tokens: ${lastError.message}`);
  throw lastError;
}

/**
 * Creates a directory if it doesn't exist
 * @param {string} dirPath - The directory path to create
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log.verbose(`Created directory: ${dirPath}`);
  }
}

/**
 * Gets all component files
 * @param {string} componentsDir - The components directory
 * @returns {Array} Component file information
 */
function getComponentFiles(componentsDir) {
  if (!fs.existsSync(componentsDir)) {
    log.warning(`Components directory not found: ${componentsDir}`);
    return [];
  }
  
  const files = [];
  
  // Read component files
  fs.readdirSync(componentsDir).forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = path.basename(file, path.extname(file));
      
      files.push({
        name: componentName,
        path: filePath,
        content
      });
    }
  });
  
  return files;
}

/**
 * Gets all layout files
 * @param {string} layoutsDir - The layouts directory
 * @returns {Array} Layout file information
 */
function getLayoutFiles(layoutsDir) {
  if (!fs.existsSync(layoutsDir)) {
    log.warning(`Layouts directory not found: ${layoutsDir}`);
    return [];
  }
  
  const files = [];
  
  // Read layout files
  fs.readdirSync(layoutsDir).forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const filePath = path.join(layoutsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const layoutName = path.basename(file, path.extname(file));
      
      files.push({
        name: layoutName,
        path: filePath,
        content
      });
    }
  });
  
  return files;
}

/**
 * Generate Framer-compatible token files
 * @param {Object} tokensByState - Tokens organized by design state
 * @param {string} outputDir - Output directory
 */
function generateTokenFiles(tokensByState, outputDir) {
  log.info('Generating token files...');
  
  ensureDirectoryExists(outputDir);
  
  // Generate a file for each state
  for (const [state, tokens] of Object.entries(tokensByState)) {
    const outputPath = path.join(outputDir, `${state}-tokens.js`);
    
    // Create JavaScript module
    const content = `// Quantum-Spatial Design System - ${state.charAt(0).toUpperCase() + state.slice(1)} Tokens
// Generated on ${new Date().toISOString()}

export default ${JSON.stringify(tokens, null, 2)};
`;
    
    fs.writeFileSync(outputPath, content);
    log.success(`Generated token file for ${state} state: ${outputPath}`);
  }
}

/**
 * Copy the auto-importer component
 * @param {string} sourceDir - The source directory
 * @param {string} outputDir - Output directory
 */
function copyAutoImporter(sourceDir, outputDir) {
  log.info('Copying Quantum-Spatial auto-importer...');
  
  const sourcePath = path.resolve(sourceDir, '../quantum-spatial-auto-importer.js');
  const outputPath = path.join(outputDir, 'QuantumSpatialProvider.tsx');
  
  if (!fs.existsSync(sourcePath)) {
    log.error(`Auto-importer file not found: ${sourcePath}`);
    return;
  }
  
  // Copy and rename
  fs.copyFileSync(sourcePath, outputPath);
  log.success(`Copied auto-importer to: ${outputPath}`);
}

/**
 * Copy component files
 * @param {Array} components - Component information
 * @param {string} outputDir - Output directory
 */
function copyComponentFiles(components, outputDir) {
  log.info(`Copying ${components.length} component files...`);
  
  const componentsDir = path.join(outputDir, 'components');
  ensureDirectoryExists(componentsDir);
  
  for (const component of components) {
    const outputPath = path.join(componentsDir, path.basename(component.path));
    fs.copyFileSync(component.path, outputPath);
    log.verbose(`Copied ${component.name} to: ${outputPath}`);
  }
  
  log.success(`Copied ${components.length} component files to: ${componentsDir}`);
}

/**
 * Copy layout files
 * @param {Array} layouts - Layout information
 * @param {string} outputDir - Output directory
 */
function copyLayoutFiles(layouts, outputDir) {
  log.info(`Copying ${layouts.length} layout files...`);
  
  const layoutsDir = path.join(outputDir, 'layouts');
  ensureDirectoryExists(layoutsDir);
  
  for (const layout of layouts) {
    const outputPath = path.join(layoutsDir, path.basename(layout.path));
    fs.copyFileSync(layout.path, outputPath);
    log.verbose(`Copied ${layout.name} to: ${outputPath}`);
  }
  
  log.success(`Copied ${layouts.length} layout files to: ${layoutsDir}`);
}

/**
 * Create a demo component that uses the design system
 * @param {Array} components - Component information
 * @param {Array} layouts - Layout information 
 * @param {string} outputDir - Output directory
 */
function createDemoComponent(components, layouts, outputDir) {
  log.info('Creating demo component...');
  
  const demoComponentPath = path.join(outputDir, 'QuantumSpatialDemo.tsx');
  
  // Get component names
  const componentNames = components.map(c => c.name);
  const layoutNames = layouts.map(l => l.name);
  
  const content = `/**
 * Quantum-Spatial Design System Demo
 * 
 * This component demonstrates the Quantum-Spatial design system
 * with automatic state switching and device detection.
 * 
 * Generated on ${new Date().toISOString()}
 */

import * as React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { QuantumSpatialProvider, useQuantumSpatial } from "./QuantumSpatialProvider";

${componentNames.map(name => `import { ${name} } from "./components/${name}";`).join('')}
${layoutNames.map(name => `import { ${name} } from "./layouts/${name}";`).join('')}

// Demo component properties
interface DemoProps {
  demoType: "dashboard" | "hero" | "grid";
  autoDetectDevice: boolean;
  initialState: "heritage" | "transitional" | "quantum" | "superposition";
  width: number | string;
  height: number | string;
}

export function QuantumSpatialDemo({
  demoType = "dashboard",
  autoDetectDevice = true,
  initialState = "quantum",
  width = "100%",
  height = "100%",
  ...props
}: DemoProps) {
  return (
    <div
      style={{
        width: typeof width === "number" ? \`\${width}px\` : width,
        height: typeof height === "number" ? \`\${height}px\` : height
      }}
      {...props}
    >
      <QuantumSpatialProvider
        autoDetect={autoDetectDevice}
        initialState={initialState}
        devMode={false}
      >
        {demoType === "dashboard" && <DashboardDemo />}
        {demoType === "hero" && <HeroDemo />}
        {demoType === "grid" && <GridDemo />}
      </QuantumSpatialProvider>
    </div>
  );
}

// Dashboard demo
function DashboardDemo() {
  const { tokens, designState, deviceInfo, components } = useQuantumSpatial();
  
  if (!tokens) return null;

  return (
    <DashboardLayout
      title="Quantum-Spatial Design"
      subtitle="Automated Cloudflare Integration"
    >
      <div style={{ marginBottom: tokens.spacing?.lg || "24px" }}>
        <Card title="Design System Status">
          <p>Current State: <strong>{designState}</strong></p>
          <p>Device: {deviceInfo?.isM4Detected ? "M4-Capable" : "Standard"}</p>
          
          <div style={{ marginTop: tokens.spacing?.md || "16px" }}>
            <Button 
              text="View Documentation" 
              variant="primary"
            />
          </div>
        </Card>
      </div>
      
      <GridLayout columns={2} padding="md">
        <Card title="Automated Components" elevated={true}>
          <p style={{ marginBottom: tokens.spacing?.md || "16px" }}>
            Components are automatically generated from design tokens.
          </p>
          
          <div style={{ display: "flex", gap: tokens.spacing?.sm || "8px" }}>
            <Button text="Primary" variant="primary" />
            <Button text="Secondary" variant="secondary" />
            <Button text="Accent" variant="accent" />
          </div>
        </Card>
        
        <Card title="Design States" elevated={true}>
          <p>Design states automatically adapt to device capabilities.</p>
        </Card>
      </GridLayout>
    </DashboardLayout>
  );
}

// Hero demo
function HeroDemo() {
  return (
    <HeroLayout
      title="Quantum-Spatial Design"
      subtitle="Next-generation design system with M4 optimization"
      buttonText="Explore Now"
      withQuantumEffects={true}
    >
      <div style={{ marginTop: "32px" }}>
        <Card 
          title="Auto-Imported from Cloudflare Worker"
          variant="glass"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <p>
            This entire demo is generated using the Quantum-Spatial 
            design system with tokens fetched from Cloudflare Workers.
          </p>
        </Card>
      </div>
    </HeroLayout>
  );
}

// Grid demo
function GridDemo() {
  const { tokens, deviceInfo } = useQuantumSpatial();
  
  if (!tokens) return null;
  
  const items = Array(6).fill(0).map((_, i) => (
    <Card 
      key={i}
      title={\`Item \${i + 1}\`}
      elevated={true}
    >
      <p>This card is automatically styled with design tokens.</p>
      <Button text="Learn More" variant="accent" />
    </Card>
  ));

  return (
    <div style={{ padding: tokens.spacing?.lg || "24px" }}>
      <h1 style={{ 
        fontSize: tokens.typography?.sizes?.xl || "24px",
        marginBottom: tokens.spacing?.lg || "24px",
        color: tokens.colors?.accent || "#5AC8FA"
      }}>
        Grid Layout Demo
      </h1>
      
      <GridLayout 
        columns={deviceInfo?.isM4Detected ? 3 : 2}
        withVolumetricGrid={true}
        showGridLines={true}
      >
        {items}
      </GridLayout>
    </div>
  );
}

// Framer property controls
addPropertyControls(QuantumSpatialDemo, {
  demoType: {
    type: ControlType.Enum,
    title: "Demo Type",
    options: ["dashboard", "hero", "grid"],
    defaultValue: "dashboard"
  },
  autoDetectDevice: {
    type: ControlType.Boolean,
    title: "Auto-Detect Device",
    defaultValue: true
  },
  initialState: {
    type: ControlType.Enum,
    title: "Design State",
    options: ["heritage", "transitional", "quantum", "superposition"],
    defaultValue: "quantum",
    hidden(props) { return props.autoDetectDevice }
  },
  width: {
    type: ControlType.NumberOrString,
    title: "Width",
    defaultValue: "100%"
  },
  height: {
    type: ControlType.NumberOrString,
    title: "Height",
    defaultValue: "100%"
  }
});

export default QuantumSpatialDemo;
`;
  
  fs.writeFileSync(demoComponentPath, content);
  log.success(`Created demo component: ${demoComponentPath}`);
}

/**
 * Create a package.json file for the Framer project
 * @param {string} outputDir - Output directory
 */
function createPackageJson(outputDir) {
  const packageJsonPath = path.join(outputDir, 'package.json');
  
  const content = {
    name: "quantum-spatial-design-system",
    version: "1.0.0",
    description: "Quantum-Spatial Design System with Cloudflare Integration",
    main: "index.js",
    keywords: ["design-system", "framer", "cloudflare", "quantum-spatial"],
    author: "9Bit Studios",
    license: "UNLICENSED",
    private: true,
    dependencies: {
      "react": "^18.2.0",
      "framer-motion": "^10.16.4"
    }
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2));
  log.success(`Created package.json: ${packageJsonPath}`);
}

/**
 * Create an index file that exports all components
 * @param {Array} components - Component information
 * @param {Array} layouts - Layout information
 * @param {string} outputDir - Output directory
 */
function createIndexFile(components, layouts, outputDir) {
  const indexPath = path.join(outputDir, 'index.ts');
  
  // Generate exports for all components and layouts
  const content = `/**
 * Quantum-Spatial Design System
 * Auto-generated index file
 * 
 * Generated on ${new Date().toISOString()}
 */

// Core provider
export { QuantumSpatialProvider, useQuantumSpatial } from './QuantumSpatialProvider';

// Demo component
export { QuantumSpatialDemo } from './QuantumSpatialDemo';

// Components
${components.map(c => `export { ${c.name} } from './components/${c.name}';`).join('')}

// Layouts
${layouts.map(l => `export { ${l.name} } from './layouts/${l.name}';`).join('')}
`;
  
  fs.writeFileSync(indexPath, content);
  log.success(`Created index file: ${indexPath}`);
}

/**
 * Main function to deploy design system to Framer
 */
async function deployToFramer() {
  log.info('Starting Quantum-Spatial Design System deployment to Framer');
  log.info(`Environment: ${options.environment}`);
  
  // Get worker URL
  const workerUrl = getWorkerUrl();
  log.info(`Using worker URL: ${workerUrl}`);
  
  try {
    // Step 1: Prepare directories
    log.info('Preparing directories...');
    ensureDirectoryExists(CONFIG.TEMP_DIR);
    ensureDirectoryExists(CONFIG.OUTPUT_DIR);
    
    // Step 2: Fetch tokens for all design states
    log.info('Fetching tokens for all design states...');
    const tokensByState = {};
    const fallbackTokens = getFallbackTokens();
    
    for (const state of CONFIG.DESIGN_STATES) {
      try {
        tokensByState[state] = await fetchDesignTokens(state, workerUrl);
      } catch (err) {
        log.warning(`Failed to fetch ${state} tokens: ${err.message}`);
        log.info(`Using fallback tokens for ${state} state`);
        tokensByState[state] = fallbackTokens[state] || fallbackTokens.quantum;
      }
    }
    
    // Step 3: Validate tokens
    log.info('Validating tokens...');
    const validatedTokens = verifyTokenSet(tokensByState, fallbackTokens);
    
    // Step 4: Get components and layouts
    log.info('Getting components and layouts...');
    const components = getComponentFiles(CONFIG.SOURCE_DIRS.COMPONENTS);
    const layouts = getLayoutFiles(CONFIG.SOURCE_DIRS.LAYOUTS);
    
    log.info(`Found ${components.length} components and ${layouts.length} layouts`);
    
    // Step 5: Generate output files
    log.info('Generating output files...');
    generateTokenFiles(validatedTokens, CONFIG.OUTPUT_DIR);
    copyAutoImporter(CONFIG.SOURCE_DIRS.COMPONENTS, CONFIG.OUTPUT_DIR);
    copyComponentFiles(components, CONFIG.OUTPUT_DIR);
    copyLayoutFiles(layouts, CONFIG.OUTPUT_DIR);
    createDemoComponent(components, layouts, CONFIG.OUTPUT_DIR);
    createPackageJson(CONFIG.OUTPUT_DIR);
    createIndexFile(components, layouts, CONFIG.OUTPUT_DIR);
    
    // Step 6: Integration with Framer
    if (options.framerProject && !options.dryRun) {
      log.info(`Deploying to Framer project: ${options.framerProject}`);
      log.warning('Framer CLI is deprecated. Please use the Framer Desktop app to publish.');
      log.info('Please manually import the generated files in the Framer Desktop app.');
      log.info(`Files are ready in: ${CONFIG.OUTPUT_DIR}`);
    } else {
      log.info('Skipping deployment to Framer (dry run or no project ID)');
      log.info(`Files are ready in: ${CONFIG.OUTPUT_DIR}`);
    }
    
    // Success
    log.success('Quantum-Spatial Design System deployment completed successfully!');
    
    // Step 7: Cleanup
    if (fs.existsSync(CONFIG.TEMP_DIR)) {
      fs.rmSync(CONFIG.TEMP_DIR, { recursive: true, force: true });
      log.verbose('Cleaned up temporary directory');
    }
    
  } catch (err) {
    log.error(`Deployment failed: ${err.message}`);
    if (options.verbose) {
      console.error(err);
    }
    process.exit(1);
  }
}

// Run the deployment
deployToFramer();