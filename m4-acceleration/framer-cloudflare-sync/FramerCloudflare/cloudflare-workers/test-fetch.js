// Test script to verify the Framer Fetch endpoint
const fetch = require('node-fetch');

// Test both staging and production endpoints
const endpoints = [
  'http://localhost:8787', // Local development
  'https://9bit-integrator-staging.rnrb2ynd5z.workers.dev', // Direct staging URL
  'https://staging-api.9bitstudios.io', // Staging (DNS-based, may not be working yet)
  'https://api.9bitstudios.io' // Production (DNS-based, may not be working yet)
];

// Test different states
const states = ['heritage', 'transitional', 'quantum'];

async function testEndpoints() {
  console.log('Testing Quantum-Spatial Design System API endpoints...');
  
  for (const endpoint of endpoints) {
    console.log(`=== Testing ${endpoint} ===`);
    
    try {
      // Test health endpoint
      console.log('Health check:');
      try {
        const healthResponse = await fetch(`${endpoint}/health`);
        if (healthResponse.ok) {
          const health = await healthResponse.json();
          console.log('✅ Health endpoint working');
          console.log(`Status: ${health.status}`);
          console.log(`Environment: ${health.environment}`);
        } else {
          console.log(`❌ Health endpoint failed: ${healthResponse.status} ${healthResponse.statusText}`);
        }
      } catch (error) {
        console.log(`❌ Health endpoint error: ${error.message}`);
      }
      
      // Test Framer Fetch endpoint with different states
      console.log('Framer Fetch endpoint:');
      for (const state of states) {
        try {
          const url = `${endpoint}/design-system/framer-fetch?type=tokens&state=${state}`;
          console.log(`Testing state: ${state}`);
          
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Framer Fetch - ${state}: Success`);
            // Log a sample of the data to verify content
            console.log(`Sample data: ${JSON.stringify({
              primary: data.colors?.primary,
              secondary: data.colors?.secondary,
              accent: data.colors?.accent
            }, null, 2)}`);
          } else {
            console.log(`❌ Framer Fetch - ${state} failed: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.log(`❌ Framer Fetch - ${state} error: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ Error testing ${endpoint}: ${error.message}`);
    }
  }
}

// Run the tests
testEndpoints().catch(console.error);