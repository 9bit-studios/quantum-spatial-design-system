/**
 * Framer Design Token Fetch Script
 * 
 * This script fetches design tokens from the Cloudflare Worker API
 * and transforms them for use in Framer.
 * 
 * Usage:
 *   node framer-token-fetch.js --state=transitional --output=./tokens-framer.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('./framer-sync-config');

// Parse command line arguments
const args = process.argv.slice(2);
let state = config.defaultState || 'transitional';
let outputPath = './tokens-framer.json';

args.forEach(arg => {
  if (arg.startsWith('--state=')) {
    state = arg.split('=')[1];
  } else if (arg.startsWith('--output=')) {
    outputPath = arg.split('=')[1];
  }
});

// Validate state
const validStates = config.designSystemStates || ['heritage', 'transitional', 'quantum', 'superposition'];
if (!validStates.includes(state)) {
  console.error(`Error: Invalid state "${state}". Valid states are: ${validStates.join(', ')}`);
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

/**
 * Fetch tokens from Cloudflare Worker API
 * @param {string} state - Design system state
 * @returns {Promise<Object>} - Tokens
 */
function fetchTokens(state) {
  return new Promise((resolve, reject) => {
    const url = `${config.cloudflare.workerUrl}${config.cloudflare.apiPath}?state=${state}&format=framer&projectId=${config.framer.projectId}`;
    
    console.log(`Fetching tokens for state: ${state}`);
    console.log(`URL: ${url}`);
    
    https.get(url, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      
      let error;
      if (statusCode !== 200) {
        error = new Error(`Request failed with status: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Expected application/json but received ${contentType}`);
      }
      
      if (error) {
        console.error(error.message);
        res.resume();
        reject(error);
        return;
      }
      
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          console.error(`Error parsing JSON: ${e.message}`);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.error(`HTTP request error: ${e.message}`);
      reject(e);
    });
  });
}

/**
 * Format tokens for direct use in Framer
 * @param {Object} tokens - Raw design tokens
 * @returns {Object} - Framer-formatted tokens
 */
function formatForFramer(tokens) {
  // Basic structure for Framer variables
  const framerVariables = {
    $schema: "https://framer.com/schema/variables.json",
    name: `9Bit Studios Quantum-Spatial Design System (${state})`,
    version: "1.0.0",
    categories: [
      {
        name: "Colors",
        variables: []
      },
      {
        name: "Typography",
        variables: []
      },
      {
        name: "Spacing",
        variables: []
      },
      {
        name: "Shadows",
        variables: []
      },
      {
        name: "Effects",
        variables: []
      }
    ]
  };
  
  // Helper to add variable to a category
  function addVariable(categoryName, name, value, type) {
    const category = framerVariables.categories.find(c => c.name === categoryName);
    if (category) {
      category.variables.push({
        name,
        value,
        type,
        scope: "all"
      });
    }
  }
  
  // Process colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      addVariable("Colors", key, value, "color");
    });
  }
  
  // Process typography tokens
  if (tokens.typography) {
    Object.entries(tokens.typography).forEach(([key, value]) => {
      // For simple values (like font size)
      if (typeof value === 'string' || typeof value === 'number') {
        addVariable("Typography", key, value, typeof value === 'number' ? "number" : "string");
      }
      // For complex typography objects
      else if (typeof value === 'object') {
        addVariable("Typography", key, JSON.stringify(value), "json");
      }
    });
  }
  
  // Process spacing tokens
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      addVariable("Spacing", key, value, "string");
    });
  }
  
  // Process shadow tokens
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      addVariable("Shadows", key, value, "string");
    });
  }
  
  // Process other token types (borders, opacities, etc.)
  // For borders, opacities, etc.
  if (tokens.borders) {
    if (!framerVariables.categories.find(c => c.name === "Borders")) {
      framerVariables.categories.push({
        name: "Borders",
        variables: []
      });
    }
    
    Object.entries(tokens.borders).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          addVariable("Borders", `${key}-${subKey}`, subValue, typeof subValue === 'number' ? "number" : "string");
        });
      } else {
        addVariable("Borders", key, value, typeof value === 'number' ? "number" : "string");
      }
    });
  }
  
  if (tokens.opacities) {
    if (!framerVariables.categories.find(c => c.name === "Effects")) {
      framerVariables.categories.push({
        name: "Effects",
        variables: []
      });
    }
    
    Object.entries(tokens.opacities).forEach(([key, value]) => {
      addVariable("Effects", `opacity-${key}`, value, "number");
    });
  }
  
  return framerVariables;
}

/**
 * Save tokens to file
 * @param {Object} tokens - Tokens to save
 * @param {string} filePath - Output file path
 */
function saveTokens(tokens, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
    console.log(`Tokens saved to: ${filePath}`);
  } catch (error) {
    console.error(`Error saving tokens: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log(`Fetching ${state} tokens from Cloudflare Worker API...`);
    
    // Fetch tokens
    const tokens = await fetchTokens(state);
    
    // Format for Framer
    const framerTokens = formatForFramer(tokens);
    
    // Save to file
    saveTokens(framerTokens, outputPath);
    
    console.log('Done!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
main();