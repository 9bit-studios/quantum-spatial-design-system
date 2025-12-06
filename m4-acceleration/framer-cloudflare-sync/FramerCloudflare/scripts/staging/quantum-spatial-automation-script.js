#!/usr/bin/env node

/**
 * Quantum-Spatial Design System Automation
 * A comprehensive automation tool for managing the Quantum-Spatial design system
 * 
 * Usage: 
 *   node quantum-spatial-automation.js generate-tokens
 *   node quantum-spatial-automation.js sync-framer
 *   node quantum-spatial-automation.js build-components
 *   node quantum-spatial-automation.js deploy-cloudflare
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  tokensPath: './design-tokens',
  componentsPath: './components',
  outputPath: './dist',
  framerPath: './framer',
  cloudflareWorkerPath: './cloudflare-worker',
  framerProjectId: process.env.FRAMER_PROJECT_ID,
  framerTeamId: process.env.FRAMER_TEAM_ID,
  framerApiKey: process.env.FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN=,
  cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareaccessToken: process.env.CLOUDFLARE_API_TOKEN
};

// Command line arguments
const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];
const options = args.slice(2);

// Utility functions
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Import specific task modules
const TokenGenerator = require('./scripts/token-generator');
const ComponentBuilder = require('./scripts/component-builder');
const FramerSync = require('./scripts/framer-sync');
const CloudflareDeployer = require('./scripts/cloudflare-deployer');

// Main command processor
async function processCommand() {
  try {
    console.log(`🔮 Quantum-Spatial Design System Automation`);
    console.log(`📅 ${new Date().toISOString()}`);
    console.log(`🦄 Running command: ${command} ${subCommand || ''}`);

    switch (command) {
      case 'generate-tokens':
        await generateTokens();
        break;
      case 'build-components':
        await buildComponents();
        break;
      case 'sync-framer':
        await syncFramer();
        break;
      case 'deploy-cloudflare':
        await deployCloudflareWorker();
        break;
      case 'create-component':
        await createComponent(subCommand);
        break;
      case 'optimize':
        await optimizeAssets();
        break;
      case 'full-pipeline':
        await runFullPipeline();
        break;
      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Token generation
async function generateTokens() {
  console.log('🎨 Generating design tokens...');
  
  // Initialize token generator
  const tokenGenerator = new TokenGenerator({
    outputPath: CONFIG.tokensPath,
    states: ['heritage', 'transitional', 'quantum', 'superposition']
  });
  
  // Generate tokens
  await tokenGenerator.generateAllTokens();
  
  console.log('✅ Token generation complete');
}

// Component building
async function buildComponents() {
  console.log('🧩 Building components...');
  
  // Initialize component builder
  const componentBuilder = new ComponentBuilder({
    componentsPath: CONFIG.componentsPath,
    outputPath: path.join(CONFIG.outputPath, 'components'),
    tokensPath: CONFIG.tokensPath
  });
  
  // Build all components
  await componentBuilder.buildAllComponents();
  
  console.log('✅ Component building complete');
}

// Framer synchronization
async function syncFramer() {
  console.log('🖼️ Syncing with Framer...');
  
  // Check for required environment variables
  if (!CONFIG.framerApiKey || !CONFIG.framerProjectId || !CONFIG.framerTeamId) {
    throw new Error('Missing required Framer API credentials. Please check your .env file.');
  }
  
  // Initialize Framer sync
  const framerSync = new FramerSync({
    apiKey: CONFIG.framerApiKey,
    teamId: CONFIG.framerTeamId,
    projectId: CONFIG.framerProjectId,
    tokensPath: CONFIG.tokensPath,
    componentsPath: path.join(CONFIG.outputPath, 'components')
  });
  
  // Sync tokens and components
  await framerSync.syncTokens();
  await framerSync.syncComponents();
  
  console.log('✅ Framer synchronization complete');
}

// Cloudflare Worker deployment
async function deployCloudflareWorker() {
  console.log('☁️ Deploying Cloudflare Worker...');
  
  // Check for required environment variables
  if (!CONFIG.cloudflareAccountId || !CONFIG.cloudflareaccessToken) {
    throw new Error('Missing required Cloudflare API credentials. Please check your .env file.');
  }
  
  // Initialize Cloudflare deployer
  const cloudflareDeployer = new CloudflareDeployer({
    accountId: CONFIG.cloudflareAccountId,
    accessToken: CONFIG.cloudflareaccessToken,
    workerPath: CONFIG.cloudflareWorkerPath
  });
  
  // Deploy worker
  await cloudflareDeployer.deploy();
  
  console.log('✅ Cloudflare Worker deployment complete');
}

// Create a new component
async function createComponent(componentName) {
  if (!componentName) {
    throw new Error('Please provide a component name');
  }
  
  console.log(`🏗️ Creating new component: ${componentName}...`);
  
  // Initialize component builder
  const componentBuilder = new ComponentBuilder({
    componentsPath: CONFIG.componentsPath,
    outputPath: path.join(CONFIG.outputPath, 'components'),
    tokensPath: CONFIG.tokensPath
  });
  
  // Create component
  await componentBuilder.createComponent(componentName);
  
  console.log(`✅ Component ${componentName} created`);
}

// Optimize assets
async function optimizeAssets() {
  console.log('⚡ Optimizing assets...');
  
  // Initialize component builder
  const componentBuilder = new ComponentBuilder({
    componentsPath: CONFIG.componentsPath,
    outputPath: path.join(CONFIG.outputPath, 'components'),
    tokensPath: CONFIG.tokensPath
  });
  
  // Optimize all assets
  await componentBuilder.optimizeAssets();
  
  console.log('✅ Asset optimization complete');
}

// Run the full pipeline
async function runFullPipeline() {
  console.log('🦄 Running full pipeline...');
  
  // Run all steps in sequence
  await generateTokens();
  await buildComponents();
  await optimizeAssets();
  await syncFramer();
  await deployCloudflareWorker();
  
  console.log('✅ Full pipeline complete');
}

// Show help
function showHelp() {
  console.log(`
Quantum-Spatial Design System Automation Tool

Usage:
  node quantum-spatial-automation.js [command] [options]

Commands:
  generate-tokens         Generate design tokens for all states
  build-components        Build all components
  sync-framer             Sync tokens and components with Framer
  deploy-cloudflare       Deploy Cloudflare Worker
  create-component [name] Create a new component
  optimize                Optimize all assets
  full-pipeline           Run the full pipeline
  help                    Show this help message

Options:
  --state=[state]         Specify state (heritage, transitional, quantum, superposition)
  --watch                 Watch for changes and rebuild
  --verbose               Show detailed logs
  
Examples:
  node quantum-spatial-automation.js generate-tokens
  node quantum-spatial-automation.js create-component QuantumButton
  node quantum-spatial-automation.js sync-framer --state=transitional
  node quantum-spatial-automation.js full-pipeline
  `);
}

// Run the command processor
processCommand();
