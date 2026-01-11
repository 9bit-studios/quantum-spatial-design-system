/**
 * Quantum-Spatial Design System Direct Framer Sync
 * 
 * This script directly syncs design tokens with Framer projects
 * using the Framer API.
 * 
 * Usage:
 * node framer-direct-sync.js [state] [options]
 * 
 * Options:
 *   --state=STATE     Design system state to sync (heritage, transitional, quantum, superposition)
 *   --all             Sync all states
 *   --verbose         Show detailed output during operation
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Load config
const config = {
  framer: {
    projectId: '2zdSRIm4V5ndhHJ2IUDw',
    projectUrl: 'https://framer.com/projects/9Bit-Quantum-Spatial-Design-System--2zdSRIm4V5ndhHJ2IUDw'
  },
  designSystemStates: ['heritage', 'transitional', 'quantum', 'superposition'],
  defaultState: 'transitional',
};

// Default options
const options = {
  state: config.defaultState,
  all: false,
  verbose: false,
};

// Process command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    options[key] = value || true;
  } else {
    options.state = arg;
  }
});

// Log helper
function log(message, force = false) {
  if (options.verbose || force) {
    console.log(message);
  }
}

/**
 * Read tokens from file
 */
function readTokens(state) {
  try {
    const tokenPath = path.join(__dirname, 'framer-tokens', `${state}.json`);
    return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  } catch (error) {
    console.error(`Error reading tokens for ${state}:`, error.message);
    return null;
  }
}

/**
 * Execute Framer API request
 */
function sendToFramer(tokens, state) {
  console.log(`Syncing ${state} tokens to Framer project...`);
  
  // Write tokens to a temporary file
  const tempFile = path.join(__dirname, `temp-${state}-tokens.json`);
  fs.writeFileSync(tempFile, JSON.stringify(tokens, null, 2));
  
  try {
    // Use Framer CLI to push tokens
    // Note: You would need to have Framer CLI installed and configured
    const command = `npx framer-cli push-tokens ${tempFile} --project=${config.framer.projectId}`;
    
    console.log(`Executing: ${command}`);
    const result = execSync(command, { encoding: 'utf8' });
    console.log(result);
    
    console.log(`✅ Successfully synced ${state} tokens to Framer!`);
    return true;
  } catch (error) {
    console.error(`Error syncing tokens to Framer:`, error.message);
    return false;
  } finally {
    // Clean up temporary file
    fs.unlinkSync(tempFile);
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`= 9Bit Studios - Quantum-Spatial Design System =`);
  console.log(`= Direct Framer Synchronization =`);
  
  const statesToSync = options.all ? config.designSystemStates : [options.state];
  
  for (const state of statesToSync) {
    console.log(`--- Processing ${state.toUpperCase()} state ---`);
    
    // Read tokens
    const tokens = readTokens(state);
    
    if (!tokens) {
      console.error(`❌ Failed to read tokens for ${state} state.`);
      continue;
    }
    
    // Send to Framer
    const success = sendToFramer(tokens, state);
    
    if (success) {
      console.log(`✅ Completed sync for ${state} state.`);
    } else {
      console.error(`❌ Failed to sync ${state} state.`);
    }
  }
  
  console.log(`Synchronization complete!`);
  console.log(`Visit your Framer project: ${config.framer.projectUrl}`);
}

// Execute main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});