/**
 * Deployment Verification Script
 * 
 * This script verifies that the Cloudflare Worker deployment is working correctly
 * and the design system components are packaged properly.
 */

// Use global fetch if available (Node.js 18+) or fallback to importing node-fetch
const fetch = global.fetch || require('node-fetch');
const fs = require('fs');
const path = require('path');

// Configuration
const WORKER_URLS = [
  'https://design-system.9bitstudios.io',
  'https://design-system-staging.9bitstudios.io',
  'https://quantum-spatial-design-system.9bitstudios.workers.dev'
];

const DESIGN_STATES = ['heritage', 'transitional', 'quantum', 'superposition'];

// Verify worker endpoints
async function verifyWorkerEndpoints() {
  console.log('Verifying Cloudflare Worker endpoints...');
  
  for (const url of WORKER_URLS) {
    try {
      // Check health endpoint
      console.log(`Checking ${url}/health...`);
      const healthResponse = await fetch(`${url}/health`);
      
      if (healthResponse.ok) {
        const health = await healthResponse.json();
        console.log('✅ Health check passed');
        console.log('Status:', health.status);
        console.log('Version:', health.version);
        console.log('Timestamp:', health.timestamp);
      } else {
        console.error(`❌ Health check failed: ${healthResponse.status} ${healthResponse.statusText}`);
      }
      
      // Check design tokens for each state
      for (const state of DESIGN_STATES) {
        console.log(`Checking ${url}/design-system/tokens?state=${state}...`);
        const tokensResponse = await fetch(`${url}/design-system/tokens?state=${state}`);
        
        if (tokensResponse.ok) {
          const tokens = await tokensResponse.json();
          console.log(`✅ Tokens for ${state} state available`);
          console.log('Color tokens:', Object.keys(tokens.colors || {}).length);
          console.log('Typography tokens:', tokens.typography ? 'Available' : 'Not available');
          console.log('Spacing tokens:', tokens.spacing ? 'Available' : 'Not available');
        } else {
          console.error(`❌ Tokens check failed: ${tokensResponse.status} ${tokensResponse.statusText}`);
        }
      }
      
      // Check component endpoint
      console.log(`Checking ${url}/design-system/components?state=quantum...`);
      const componentsResponse = await fetch(`${url}/design-system/components?state=quantum`);
      
      if (componentsResponse.ok) {
        const components = await componentsResponse.json();
        console.log('✅ Components available');
        console.log('Components count:', components.components ? components.components.length : 0);
      } else {
        console.error(`❌ Components check failed: ${componentsResponse.status} ${componentsResponse.statusText}`);
      }
      
      // Check Framer integration endpoint
      console.log(`Checking ${url}/framer-integration/available-components...`);
      const integrationResponse = await fetch(`${url}/framer-integration/available-components`);
      
      if (integrationResponse.ok) {
        const integration = await integrationResponse.json();
        console.log('✅ Framer integration available');
        console.log('Available components:', integration.components ? integration.components.length : 0);
      } else {
        console.error(`❌ Framer integration check failed: ${integrationResponse.status} ${integrationResponse.statusText}`);
      }
    } catch (error) {
      console.error(`❌ Error connecting to ${url}:`, error.message);
    }
  }
}

// Verify Framer package
function verifyFramerPackage() {
  console.log('Verifying Framer package...');
  
  const outputDir = path.resolve(__dirname, '../framer-output');
  const packagePath = path.join(outputDir, 'quantum-spatial-design-system-1.0.0.tgz');
  
  if (fs.existsSync(packagePath)) {
    console.log(`✅ Package exists: ${packagePath}`);
    
    // Check if all required files are in the output directory
    const requiredFiles = [
      'QuantumSpatialProvider.tsx',
      'Button.tsx',
      'Card.tsx',
      'DashboardLayout.tsx',
      'DemoPage.tsx',
      'index.tsx',
      'package.json',
      'README.md'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(outputDir, file)));
    
    if (missingFiles.length === 0) {
      console.log('✅ All required files are present');
    } else {
      console.error('❌ Missing files:', missingFiles.join(', '));
    }
  } else {
    console.error(`❌ Package not found: ${packagePath}`);
  }
}

// Run verification
async function runVerification() {
  console.log('Starting deployment verification...');
  
  await verifyWorkerEndpoints();
  verifyFramerPackage();
  
  console.log('Verification complete!');
}

runVerification().catch(error => {
  console.error('Verification failed:', error);
});