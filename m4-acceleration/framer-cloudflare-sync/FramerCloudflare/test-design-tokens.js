// Test script for Quantum-Spatial Design System tokens
const https = require('https');

const workerUrl = 'quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev';
const state = 'transitional';
const endpoint = `/design-system/tokens?state=${state}`;

console.log(`Testing endpoint: ${workerUrl}${endpoint}`);

const options = {
  hostname: workerUrl,
  path: endpoint,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Test-Script',
  },
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response received.');
    try {
      if (data.startsWith('<!DOCTYPE html>')) {
        console.error('Received HTML error page instead of JSON');
        console.log(data.substring(0, 500));
      } else {
        const jsonData = JSON.parse(data);
        console.log(`Received valid JSON with ${Object.keys(jsonData).length} top-level keys`);
        console.log(JSON.stringify(jsonData, null, 2).substring(0, 1000) + '...');
      }
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
      console.log('Raw data (first 500 characters):');
      console.log(data.substring(0, 500));
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.end();