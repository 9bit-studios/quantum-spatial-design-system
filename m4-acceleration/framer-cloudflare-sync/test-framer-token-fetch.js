/**
 * Direct test for Framer token fetch
 * This script bypasses the Cloudflare Worker and directly accesses the token files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const tokensDir = '/Users/pennyplatt//M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens';
const state = 'transitional';
const outputDir = './framer-output';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

/**
 * Read tokens for a specific state
 * @param {string} state - Design system state
 * @returns {Object} - Design tokens
 */
function readTokens(state) {
  const filePath = path.join(tokensDir, `${state}.json`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Token file not found: ${filePath}`);
    const availableFiles = fs.readdirSync(tokensDir)
      .filter(f => f.endsWith('.json'))
      .map(f => path.basename(f, '.json'));
    console.log(`Available states: ${availableFiles.join(', ')}`);
    process.exit(1);
  }
  
  // Read and parse tokens
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading token file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Format tokens for Framer
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
  
  return framerVariables;
}

// Main function
function main() {
  console.log(`Processing design tokens for state: ${state}`);
  
  // Read tokens
  const tokens = readTokens(state);
  console.log(`Read ${Object.keys(tokens).length} top-level token categories`);
  
  // Format for Framer
  const framerTokens = formatForFramer(tokens);
  
  // Save to file
  const outputPath = path.join(outputDir, `${state}-framer.json`);
  fs.writeFileSync(outputPath, JSON.stringify(framerTokens, null, 2));
  console.log(`Saved formatted tokens to: ${outputPath}`);
  
  console.log('Done!');
}

// Run the script
main();