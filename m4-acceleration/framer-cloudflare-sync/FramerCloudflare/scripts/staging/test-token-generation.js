/**
 * Test script for token generation and Framer sync
 */

const TokenGenerator = require('./token-generator-script');
const path = require('path');
const fs = require('fs');

// Create output directory for tokens
const outputPath = path.join(__dirname, '../../M4-Optimized Quantum-Spatial Pixel Design System Acceleration/tokens');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
  console.log(`Created output directory: ${outputPath}`);
}

// Initialize token generator
const generator = new TokenGenerator({
  outputPath,
  states: ['heritage', 'transitional', 'quantum', 'superposition']
});

// Generate tokens
try {
  generator.generateAllTokens();
  console.log('Token generation successful!');
  console.log(`Tokens have been generated in: ${outputPath}`);
} catch (error) {
  console.error('Token generation failed:', error);
}