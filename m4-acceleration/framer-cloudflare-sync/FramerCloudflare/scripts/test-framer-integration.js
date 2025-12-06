/**
 * Quantum-Spatial Design System - Framer Integration Tester
 * This script tests the integration between the Cloudflare worker and Framer
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  workerUrl: 'https://design-system-staging.9bitstudios.io',
  outputDir: path.resolve(__dirname, '../framer-output-production'),
  states: ['heritage', 'transitional', 'quantum', 'superposition']
};

// ANSI color codes for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Fetch data from the worker API
async function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.workerUrl}${endpoint}`;
    console.log(`${COLORS.cyan}Fetching data from: ${url}${COLORS.reset}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const statusCode = res.statusCode;
          if (statusCode === 200) {
            try {
              const json = JSON.parse(data);
              resolve({ success: true, statusCode, data: json });
            } catch (e) {
              // Not JSON, return as plain text
              resolve({ success: true, statusCode, data: data });
            }
          } else {
            resolve({ success: false, statusCode, message: `HTTP Error: ${statusCode}` });
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

// Test worker API health
async function testHealth() {
  console.log(`${COLORS.blue}=== Testing Worker API Health ===${COLORS.reset}`);
  try {
    const result = await fetchData('/health');
    if (result.success) {
      console.log(`${COLORS.green}✓ Health check passed${COLORS.reset}`);
      console.log(`  Status: ${result.data.status}`);
      console.log(`  Version: ${result.data.version}`);
      console.log(`  Environment: ${result.data.environment}`);
      return true;
    } else {
      console.log(`${COLORS.red}✗ Health check failed: ${result.message}${COLORS.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${COLORS.red}✗ Health check error: ${error.message}${COLORS.reset}`);
    return false;
  }
}

// Test design tokens for all states
async function testDesignTokens() {
  console.log(`${COLORS.blue}=== Testing Design Tokens ===${COLORS.reset}`);
  
  for (const state of CONFIG.states) {
    try {
      const result = await fetchData(`/design-system/tokens?state=${state}`);
      
      if (result.success) {
        const tokens = result.data;
        
        if (tokens._meta && tokens.colors && tokens.typography) {
          console.log(`${COLORS.green}✓ ${state} tokens fetched successfully${COLORS.reset}`);
          console.log(`  Token set: ${tokens._meta.name}`);
          console.log(`  Description: ${tokens._meta.description}`);
          console.log(`  Version: ${tokens._meta.version}`);
        } else {
          console.log(`${COLORS.yellow}⚠ ${state} tokens incomplete${COLORS.reset}`);
        }
      } else {
        console.log(`${COLORS.red}✗ Failed to fetch ${state} tokens: ${result.message}${COLORS.reset}`);
      }
    } catch (error) {
      console.log(`${COLORS.red}✗ Error fetching ${state} tokens: ${error.message}${COLORS.reset}`);
    }
  }
}

// Test M4 optimization
async function testM4Optimization() {
  console.log(`${COLORS.blue}=== Testing M4 Optimization ===${COLORS.reset}`);
  try {
    const result = await fetchData('/m4-optimization');
    
    if (result.success) {
      console.log(`${COLORS.green}✓ M4 optimization data fetched successfully${COLORS.reset}`);
      console.log(`  isM4Compatible: ${result.data.isM4Compatible}`);
      console.log(`  isAppleSilicon: ${result.data.isAppleSilicon}`);
      console.log(`  renderingAPI: ${result.data.renderingAPI}`);
    } else {
      console.log(`${COLORS.red}✗ Failed to fetch M4 optimization: ${result.message}${COLORS.reset}`);
    }
  } catch (error) {
    console.log(`${COLORS.red}✗ Error fetching M4 optimization: ${error.message}${COLORS.reset}`);
  }
}

// Test component endpoints
async function testComponents() {
  console.log(`${COLORS.blue}=== Testing Component Endpoints ===${COLORS.reset}`);
  
  const components = [
    { name: 'QuantumPixel', endpoint: '/quantum-pixel?state=transitional' },
    { name: 'DimensionalGrid', endpoint: '/dimensional-grid?state=transitional' },
    { name: 'PixelViewer', endpoint: '/pixel-viewer?state=transitional' },
    { name: 'Framer Components', endpoint: '/framer-components' }
  ];
  
  for (const component of components) {
    try {
      const result = await fetchData(component.endpoint);
      
      if (result.success) {
        console.log(`${COLORS.green}✓ ${component.name} component fetched successfully${COLORS.reset}`);
      } else {
        console.log(`${COLORS.red}✗ Failed to fetch ${component.name} component: ${result.message}${COLORS.reset}`);
      }
    } catch (error) {
      console.log(`${COLORS.red}✗ Error fetching ${component.name} component: ${error.message}${COLORS.reset}`);
    }
  }
}

// Test generated Framer files
function testGeneratedFiles() {
  console.log(`${COLORS.blue}=== Testing Generated Framer Files ===${COLORS.reset}`);
  
  const requiredFiles = [
    'DesignSystemProvider.tsx',
    'QuantumPixel.tsx',
    'DimensionalGrid.tsx',
    'PixelViewer.tsx',
    'SamplePage.tsx',
    'heritage-framer.json',
    'transitional-framer.json',
    'quantum-framer.json',
    'superposition-framer.json'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(CONFIG.outputDir, file);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSizeKB = Math.round(stats.size / 1024 * 10) / 10;
      
      console.log(`${COLORS.green}✓ ${file} exists (${fileSizeKB} KB)${COLORS.reset}`);
    } else {
      console.log(`${COLORS.red}✗ ${file} is missing${COLORS.reset}`);
    }
  }
}

// Main test function
async function runTests() {
  console.log(`${COLORS.magenta}Quantum-Spatial Design System - Framer Integration Test${COLORS.reset}`);
  console.log(`${COLORS.magenta}=====================================================${COLORS.reset}`);
  console.log(`Worker URL: ${CONFIG.workerUrl}`);
  console.log(`Output Directory: ${CONFIG.outputDir}`);
  console.log();
  
  // Run tests
  const healthStatus = await testHealth();
  
  if (healthStatus) {
    await testDesignTokens();
    await testM4Optimization();
    await testComponents();
    testGeneratedFiles();
    
    console.log(`${COLORS.green}All tests completed.${COLORS.reset}`);
  } else {
    console.log(`${COLORS.red}Tests aborted due to health check failure.${COLORS.reset}`);
  }
}

// Run the tests
runTests();