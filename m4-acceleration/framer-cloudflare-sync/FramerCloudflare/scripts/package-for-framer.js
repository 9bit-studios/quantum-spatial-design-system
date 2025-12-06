/**
 * Package Framer Components
 * 
 * This script packages the components in the framer-output directory
 * into a .tgz file that can be imported into Framer.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.resolve(__dirname, '../framer-output');
const PACKAGE_NAME = 'quantum-spatial-design-system';

console.log(`Packaging Framer components from ${OUTPUT_DIR}`);

// Check if the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  console.error(`Error: Output directory ${OUTPUT_DIR} does not exist`);
  process.exit(1);
}

// Run npm pack in the output directory
try {
  console.log('Running npm pack...');
  const result = execSync('npm pack', { cwd: OUTPUT_DIR }).toString();
  
  console.log('Successfully packaged components:');
  console.log(result);
  
  // Get the .tgz file path
  const tgzFile = result.trim();
  const tgzPath = path.join(OUTPUT_DIR, tgzFile);
  
  console.log(`Package created at: ${tgzPath}`);
  console.log('You can now import this package into Framer from the project settings.');
} catch (error) {
  console.error('Error packaging components:', error.message);
  process.exit(1);
}