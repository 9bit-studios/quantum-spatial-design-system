/**
 * M4 Optimization Test Tool
 * 
 * Tests the M4 optimization detection and optimization functionality
 * in the Quantum-Spatial Design System Cloudflare Worker
 */

require('dotenv').config();
const fetch = require('node-fetch');

// Default test environment
const environment = process.env.NODE_ENV || 'development';

// Test URLs
const URLS = {
  development: 'http://localhost:8787',
  staging: 'https://design-system-staging.9bitstudios.io',
  production: 'https://design-system.9bitstudios.io'
};

// Test Mac User Agent strings
const USER_AGENTS = {
  // Intel Mac
  intelMac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
  
  // M1 Mac
  m1Mac: 'Mozilla/5.0 (Macintosh; Apple Silicon Mac OS X 12_3_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
  
  // M2 Mac
  m2Mac: 'Mozilla/5.0 (Macintosh; Apple Silicon Mac OS X 13_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
  
  // M3 Mac
  m3Mac: 'Mozilla/5.0 (Macintosh; Apple Silicon Mac OS X 14_0_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  
  // M4 Mac
  m4Mac: 'Mozilla/5.0 (Macintosh; Apple Silicon Mac OS X 14_5_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  
  // iPad Pro with M2
  iPadProM2: 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  
  // Windows PC
  windowsPC: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
};

// Set the base URL
const baseUrl = URLS[environment];

// Test the API
async function runTests() {
  console.log(`Testing M4 Optimization functionality on: ${baseUrl}`);
  console.log('='.repeat(60) + '');

  // Test health endpoint
  try {
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log(`Health status: ${healthData.status}`);
    console.log(`Features: ${JSON.stringify(healthData.features, null, 2)}`);
  } catch (error) {
    console.error(`Error testing health endpoint: ${error.message}`);
  }

  // Test m4-optimization endpoint with different user agents
  console.log('Testing M4 device detection with different User-Agents:');
  console.log('-'.repeat(60));

  for (const [deviceName, userAgent] of Object.entries(USER_AGENTS)) {
    try {
      const m4Response = await fetch(`${baseUrl}/m4-optimization`, {
        headers: {
          'User-Agent': userAgent
        }
      });
      
      const m4Data = await m4Response.json();
      
      console.log(`${deviceName}`);
      console.log(`- Detected as Apple Silicon: ${m4Data.deviceInfo.isAppleSilicon}`);
      console.log(`- Chip Generation: ${m4Data.deviceInfo.chipGeneration}`);
      
      if (m4Data.deviceInfo.isAppleSilicon) {
        console.log(`- Is M4: ${m4Data.deviceInfo.isM4}`);
        console.log(`- Is M3: ${m4Data.deviceInfo.isM3}`);
        console.log(`- Is M2: ${m4Data.deviceInfo.isM2}`);
        console.log(`- Is M1: ${m4Data.deviceInfo.isM1}`);
        console.log(`- Neural Engine: ${m4Data.flags.useNeuralEngine}`);
        console.log(`- Metal API: ${m4Data.flags.useMetal}`);
        console.log(`- Advanced ML: ${m4Data.flags.useAdvancedML}`);
        
        if (m4Data.deviceInfo.isM4) {
          console.log(`- Quantum Rendering: ${m4Data.flags.useQuantumRendering}`);
          console.log(`- Neural Rendering Engine: ${m4Data.flags.useNeuralRenderingEngine}`);
        }
      }
      
    } catch (error) {
      console.error(`Error testing M4 optimization with ${deviceName}: ${error.message}`);
    }
  }

  // Test tokens endpoint with superposition state (M4-specific)
  try {
    console.log('Testing tokens endpoint with superposition state (M4-specific)...');
    const tokensResponse = await fetch(`${baseUrl}/design-system/tokens?state=superposition`);
    const tokensData = await tokensResponse.json();
    
    // Check if M4 optimizations are present
    if (tokensData.m4) {
      console.log('M4 optimization features found in superposition state:');
      const m4Features = tokensData.m4.optimizations;
      for (const [feature, value] of Object.entries(m4Features)) {
        console.log(`- ${feature}: ${value}`);
      }
    } else {
      console.log('No M4 optimization features found in tokens.');
    }
  } catch (error) {
    console.error(`Error testing tokens endpoint: ${error.message}`);
  }
  
  console.log('Tests completed!');
}

// Run the tests
runTests().catch(error => {
  console.error(`Error running tests: ${error.message}`);
  process.exit(1);
});