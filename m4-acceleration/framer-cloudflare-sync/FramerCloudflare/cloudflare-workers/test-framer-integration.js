/**
 * Framer Integration Test Script
 * 
 * This script tests the connectivity to the Quantum-Spatial Design System worker
 * and verifies the Framer component registry endpoint is working correctly.
 */

const fetch = require('node-fetch');

// Configuration
const WORKER_URLS = [
  'https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev',
  'https://design-system-staging.9bitstudios.io'
];

/**
 * Test health endpoint
 * @param {string} baseUrl - Base URL for the worker
 */
async function testHealthEndpoint(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/health`);
    if (!response.ok) {
      console.error(`❌ Health endpoint failed for ${baseUrl}: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`✅ Health endpoint working for ${baseUrl}`);
    console.log(`   Status: ${data.status}`);
    console.log(`   Environment: ${data.environment}`);
    console.log(`   Version: ${data.version}`);
    return true;
  } catch (error) {
    console.error(`❌ Error testing health endpoint for ${baseUrl}:`, error.message);
    return false;
  }
}

/**
 * Test Framer components registry
 * @param {string} baseUrl - Base URL for the worker
 */
async function testFramerComponentsEndpoint(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/framer-components`);
    if (!response.ok) {
      console.error(`❌ Framer components endpoint failed for ${baseUrl}: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`✅ Framer components endpoint working for ${baseUrl}`);
    console.log(`   Found ${data.length} components:`);
    data.forEach(component => {
      console.log(`   - ${component.displayName} (${component.name})`);
    });
    return true;
  } catch (error) {
    console.error(`❌ Error testing Framer components endpoint for ${baseUrl}:`, error.message);
    return false;
  }
}

/**
 * Test PixelViewer component
 * @param {string} baseUrl - Base URL for the worker
 */
async function testPixelViewerEndpoint(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/pixel-viewer?state=quantum`);
    if (!response.ok) {
      console.error(`❌ PixelViewer endpoint failed for ${baseUrl}: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`✅ PixelViewer endpoint working for ${baseUrl}`);
    console.log(`   Component name: ${data.name}`);
    console.log(`   Default state: ${data.defaultState}`);
    return true;
  } catch (error) {
    console.error(`❌ Error testing PixelViewer endpoint for ${baseUrl}:`, error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('🧪 Starting Framer integration tests...');
  
  let allPassed = true;
  
  // Test each worker URL
  for (const baseUrl of WORKER_URLS) {
    console.log(`📡 Testing ${baseUrl}:`);
    
    // Health endpoint
    const healthResult = await testHealthEndpoint(baseUrl);
    if (!healthResult) allPassed = false;
    
    // Framer components registry
    const framerResult = await testFramerComponentsEndpoint(baseUrl);
    if (!framerResult) allPassed = false;
    
    // PixelViewer component
    const pixelViewerResult = await testPixelViewerEndpoint(baseUrl);
    if (!pixelViewerResult) allPassed = false;
  }
  
  console.log('🏁 Test Results:');
  if (allPassed) {
    console.log('✅ All tests passed! The Quantum-Spatial Design System is ready for Framer integration.');
    console.log('To connect Framer to the design system:');
    console.log('framer sync setup --url https://design-system-staging.9bitstudios.io/framer-components');
    console.log('framer sync pull');
  } else {
    console.log('❌ Some tests failed. Please check the errors above.');
  }
}

// Run tests
runTests();