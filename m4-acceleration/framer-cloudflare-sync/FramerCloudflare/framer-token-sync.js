/**
 * Quantum-Spatial Design System Token Synchronization
 * 
 * This script synchronizes design tokens between the local file system,
 * Cloudflare worker, and Framer projects.
 * 
 * Usage:
 * node framer-token-sync.js [state] [options]
 * 
 * Options:
 *   --state=STATE     Design system state to sync (heritage, transitional, quantum, superposition)
 *   --verify          Only verify token consistency without updating
 *   --force           Force update even if tokens are the same
 *   --verbose         Show detailed output during operation
 */

const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const config = require('./framer-sync-config');

// Default options
const options = {
  state: 'transitional',
  verify: false,
  force: false,
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

// Validate state option
if (!config.designSystemStates.includes(options.state)) {
  console.error(`Error: Invalid state "${options.state}". Valid states are: ${config.designSystemStates.join(', ')}`);
  process.exit(1);
}

// Paths
const tokensPath = config.paths.tokensPath;
const sourceTokenPath = path.join(tokensPath, `${options.state}.json`);
const framerTokenPath = path.join(tokensPath, `${options.state}-framer-formatted.json`);

// URLs
const cloudflareTokensUrl = `${config.cloudflare.workerUrl}${config.cloudflare.apiPath}?state=${options.state}`;
const framerApiUrl = `https://api.framer.com/v1/design-tokens/${config.framer.projectId}`;

/**
 * Log helper with verbosity control
 */
function log(message, force = false) {
  if (options.verbose || force) {
    console.log(message);
  }
}

/**
 * Read local design tokens from file
 */
async function readLocalTokens() {
  try {
    const data = await fs.readFile(sourceTokenPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading local tokens from ${sourceTokenPath}:`, error.message);
    process.exit(1);
  }
}

/**
 * Read Framer-formatted tokens from file
 */
async function readFramerTokens() {
  try {
    const data = await fs.readFile(framerTokenPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading Framer tokens from ${framerTokenPath}:`, error.message);
    return null;
  }
}

/**
 * Fetch tokens from Cloudflare Worker
 */
async function fetchCloudflareTokens() {
  try {
    log(`Fetching tokens from Cloudflare Worker: ${cloudflareTokensUrl}`);
    const response = await fetch(cloudflareTokensUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tokens from Cloudflare Worker:', error.message);
    return null;
  }
}

/**
 * Format tokens for Framer
 */
function formatForFramer(tokens) {
  // Basic structure for Framer
  const framerData = {
    $schema: "https://framer.com/schema/design-system.json",
    name: `9Bit Studios Quantum-Spatial Design System (${options.state})`,
    version: tokens._meta?.version || "1.0.0",
    tokens: {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {}
    }
  };

  // Format colors
  if (tokens.colors) {
    // Handle flat and nested color objects
    const colorEntries = Object.entries(tokens.colors);

    colorEntries.forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color value
        framerData.tokens.colors[key] = { value: value };
      } else if (typeof value === 'object') {
        // Nested color object (e.g., light/dark variants)
        Object.entries(value).forEach(([subKey, subValue]) => {
          framerData.tokens.colors[`${key}-${subKey}`] = { value: subValue };
        });
      }
    });
  }

  // Format typography
  if (tokens.typography) {
    // Base typography
    framerData.tokens.typography.fontFamily = {
      value: tokens.typography.fontFamily
    };

    // Headings
    if (tokens.typography.headings) {
      Object.entries(tokens.typography.headings).forEach(([key, value]) => {
        framerData.tokens.typography[key] = {
          value: {
            fontFamily: tokens.typography.fontFamily,
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight
          }
        };
      });
    }

    // Body text
    if (tokens.typography.body) {
      Object.entries(tokens.typography.body).forEach(([key, value]) => {
        framerData.tokens.typography[`body-${key}`] = {
          value: {
            fontFamily: tokens.typography.fontFamily,
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight
          }
        };
      });
    }
  }

  // Format spacing
  if (tokens.spacing && tokens.spacing.scale) {
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      framerData.tokens.spacing[key] = { value: value };
    });
  }

  // Format border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      framerData.tokens.borderRadius[key] = { value: value };
    });
  }

  // Format shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      framerData.tokens.shadows[key] = { value: value };
    });
  }

  // Add M4 optimizations for Quantum state
  if (options.state === 'quantum' && tokens.m4) {
    framerData.m4 = tokens.m4;
  }

  return framerData;
}

/**
 * Save Framer-formatted tokens to file
 */
async function saveFramerTokens(tokens) {
  try {
    const formattedTokens = formatForFramer(tokens);
    await fs.writeFile(
      framerTokenPath, 
      JSON.stringify(formattedTokens, null, 2),
      'utf8'
    );
    log(`Saved Framer-formatted tokens to ${framerTokenPath}`, true);
    return formattedTokens;
  } catch (error) {
    console.error('Error saving Framer tokens:', error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`= 9Bit Studios - Quantum-Spatial Design System =`);
  console.log(`= Token Synchronization - ${options.state.toUpperCase()} state =`);
  
  // Read local tokens
  log('Reading local tokens...');
  const localTokens = await readLocalTokens();
  
  if (!localTokens) {
    console.error('No local tokens found. Exiting.');
    process.exit(1);
  }
  
  // Check if Cloudflare tokens match local tokens
  log('Fetching Cloudflare tokens...');
  const cloudflareTokens = await fetchCloudflareTokens();
  
  if (cloudflareTokens) {
    const tokensMatch = JSON.stringify(localTokens) === JSON.stringify(cloudflareTokens);
    log(`Cloudflare tokens ${tokensMatch ? 'match' : 'do not match'} local tokens.`);
    
    if (!tokensMatch) {
      console.log('Local and Cloudflare tokens differ. Please deploy your Cloudflare worker first.');
      console.log(`Run: cd cloudflare-worker && ./scripts/deploy-framer-integration.sh`);
    }
  } else {
    console.log('Could not fetch Cloudflare tokens. Please check your worker deployment.');
  }
  
  // Format tokens for Framer and save
  log('Formatting tokens for Framer...');
  const framerTokens = await saveFramerTokens(localTokens);
  
  if (!framerTokens) {
    console.error('Failed to format tokens for Framer. Exiting.');
    process.exit(1);
  }
  
  console.log(`✅ Token synchronization complete for ${options.state} state.`);
  console.log(`Next steps:`);
  console.log(`1. Update your Framer projects with the synchronized tokens`);
  console.log(`2. Test the design system in your Framer projects`);
}

// Execute main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});