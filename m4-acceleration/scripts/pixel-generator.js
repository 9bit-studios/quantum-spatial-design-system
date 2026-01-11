/**
 * Quantum-Spatial Pixel Generator
 * 
 * This utility generates SVG pixel elements based on the templates
 * with parameter substitution for creating variants
 * 
 * M4-Optimized for performance
 */

/**
 * Generate a materialized pixel SVG from template
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateMaterializedPixel({
  size = 32,
  color = '#331F4A', // Dimensional Eggplant default
  accentColor = '#5AC8FA', // Subtle Cyan default
  borderRadius = 2,
  glowIntensity = 0.5
} = {}) {
  // Calculate dependent dimensions
  const highlightOffset = Math.max(1, Math.floor(size * 0.05));
  const highlightSize = size - (highlightOffset * 2);
  const highlightRadius = Math.max(1, borderRadius - 1);

  // Get template content
  const template = getMaterializedTemplate();
  
  // Replace parameters
  return template
    .replace(/\{\{size\}\}/g, size)
    .replace(/\{\{color\}\}/g, color)
    .replace(/\{\{accentColor\}\}/g, accentColor)
    .replace(/\{\{borderRadius\}\}/g, borderRadius)
    .replace(/\{\{glowIntensity\}\}/g, glowIntensity)
    .replace(/\{\{highlightOffset\}\}/g, highlightOffset)
    .replace(/\{\{highlightSize\}\}/g, highlightSize)
    .replace(/\{\{highlightRadius\}\}/g, highlightRadius);
}

/**
 * Generate a partial pixel SVG from template
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generatePartialPixel({
  size = 32,
  color = '#331F4A', // Dimensional Eggplant default
  accentColor = '#5AC8FA', // Subtle Cyan default
  borderRadius = 2,
  glowIntensity = 1.2
} = {}) {
  // Calculate dependent dimensions
  const innerSize = size - 4;
  const outerSize = size - 2;
  const dashArray = Math.max(1, Math.floor(size / 8)) + " " + Math.max(1, Math.floor(size / 12));
  const particleSize = Math.max(1, Math.floor(size / 16));
  
  // Calculate positions for energy particles
  const accentX1 = Math.floor(size * 0.25);
  const accentY1 = Math.floor(size * 0.25);
  const accentX2 = Math.floor(size * 0.75);
  const accentY2 = Math.floor(size * 0.65);

  // Get template content
  const template = getPartialTemplate();
  
  // Replace parameters
  return template
    .replace(/\{\{size\}\}/g, size)
    .replace(/\{\{innerSize\}\}/g, innerSize)
    .replace(/\{\{outerSize\}\}/g, outerSize)
    .replace(/\{\{color\}\}/g, color)
    .replace(/\{\{accentColor\}\}/g, accentColor)
    .replace(/\{\{borderRadius\}\}/g, borderRadius)
    .replace(/\{\{glowIntensity\}\}/g, glowIntensity)
    .replace(/\{\{dashArray\}\}/g, dashArray)
    .replace(/\{\{particleSize\}\}/g, particleSize)
    .replace(/\{\{accentX1\}\}/g, accentX1)
    .replace(/\{\{accentY1\}\}/g, accentY1)
    .replace(/\{\{accentX2\}\}/g, accentX2)
    .replace(/\{\{accentY2\}\}/g, accentY2);
}

/**
 * Generate an energy pixel SVG from template
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateEnergyPixel({
  size = 32,
  color = '#331F4A', // Dimensional Eggplant default
  accentColor = '#5AC8FA', // Subtle Cyan default
  borderRadius = 2,
  glowIntensity = 2.2
} = {}) {
  // Calculate dependent dimensions
  const innerSize = size - 4;
  const innerPulseOffset = Math.floor(size * 0.25);
  const innerPulseSize = size - (innerPulseOffset * 2);
  const innerPulseRadius = Math.max(1, borderRadius - 1);
  const particleSize = Math.max(1, Math.floor(size / 14));
  
  // Energy particle positions and movements
  const halfSize = size / 2;
  const particleX1 = Math.floor(size * 0.2);
  const particleY1 = Math.floor(size * 0.3);
  const particleX1Move = Math.floor(size * 0.7);
  const particleY1Move = Math.floor(size * 0.4);
  
  const particleX2 = Math.floor(size * 0.7);
  const particleY2 = Math.floor(size * 0.3);
  const particleX2Move = Math.floor(size * 0.3);
  const particleY2Move = Math.floor(size * 0.6);
  
  const particleX3 = Math.floor(size * 0.5);
  const particleY3 = Math.floor(size * 0.7);
  const particleX3Move = Math.floor(size * 0.6);
  const particleY3Move = Math.floor(size * 0.2);

  // Get template content
  const template = getEnergyTemplate();
  
  // Replace parameters
  return template
    .replace(/\{\{size\}\}/g, size)
    .replace(/\{\{innerSize\}\}/g, innerSize)
    .replace(/\{\{color\}\}/g, color)
    .replace(/\{\{accentColor\}\}/g, accentColor)
    .replace(/\{\{borderRadius\}\}/g, borderRadius)
    .replace(/\{\{glowIntensity\}\}/g, glowIntensity)
    .replace(/\{\{innerPulseOffset\}\}/g, innerPulseOffset)
    .replace(/\{\{innerPulseSize\}\}/g, innerPulseSize)
    .replace(/\{\{innerPulseRadius\}\}/g, innerPulseRadius)
    .replace(/\{\{particleSize\}\}/g, particleSize)
    .replace(/\{\{size\/2\}\}/g, halfSize)
    .replace(/\{\{size\/3\}\}/g, size/3)
    .replace(/\{\{size\/4\}\}/g, size/4)
    .replace(/\{\{size\/12\}\}/g, size/12)
    .replace(/\{\{particleX1\}\}/g, particleX1)
    .replace(/\{\{particleY1\}\}/g, particleY1)
    .replace(/\{\{particleX1Move\}\}/g, particleX1Move)
    .replace(/\{\{particleY1Move\}\}/g, particleY1Move)
    .replace(/\{\{particleX2\}\}/g, particleX2)
    .replace(/\{\{particleY2\}\}/g, particleY2)
    .replace(/\{\{particleX2Move\}\}/g, particleX2Move)
    .replace(/\{\{particleY2Move\}\}/g, particleY2Move)
    .replace(/\{\{particleX3\}\}/g, particleX3)
    .replace(/\{\{particleY3\}\}/g, particleY3)
    .replace(/\{\{particleX3Move\}\}/g, particleX3Move)
    .replace(/\{\{particleY3Move\}\}/g, particleY3Move);
}

/**
 * Generate a superposition pixel SVG from template
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateSuperpositionPixel({
  size = 32,
  color = '#331F4A', // Dimensional Eggplant default
  accentColor = '#5AC8FA', // Subtle Cyan default
  secondaryAccentColor = '#BF4080', // Rose Energy default
  borderRadius = 2,
  glowIntensity = 1.8
} = {}) {
  // Calculate dependent dimensions for the layering effect
  const layer1Offset = 0;
  const layer1Size = size;
  
  const layer2Offset = Math.floor(size * 0.15);
  const layer2Size = size - (layer2Offset * 2);
  
  const layer3Offset = Math.floor(size * 0.3);
  const layer3Size = size - (layer3Offset * 2);
  
  // Position indicators (lines connecting the quantum states)
  const lineX1Start = Math.floor(size * 0.2);
  const lineY1Start = Math.floor(size * 0.2);
  const lineX1End = Math.floor(size * 0.8);
  const lineY1End = Math.floor(size * 0.8);
  
  const lineX2Start = Math.floor(size * 0.8);
  const lineY2Start = Math.floor(size * 0.2);
  const lineX2End = Math.floor(size * 0.2);
  const lineY2End = Math.floor(size * 0.8);
  
  // Quantum state indicators
  const quantum1X = Math.floor(size * 0.2);
  const quantum1Y = Math.floor(size * 0.2);
  const quantum2X = Math.floor(size * 0.8);
  const quantum2Y = Math.floor(size * 0.8);
  const quantumSize = Math.max(1, Math.floor(size / 12));

  // Get template content
  const template = getSuperpositionTemplate();
  
  // Replace parameters
  return template
    .replace(/\{\{size\}\}/g, size)
    .replace(/\{\{color\}\}/g, color)
    .replace(/\{\{accentColor\}\}/g, accentColor)
    .replace(/\{\{secondaryAccentColor\}\}/g, secondaryAccentColor)
    .replace(/\{\{borderRadius\}\}/g, borderRadius)
    .replace(/\{\{glowIntensity\}\}/g, glowIntensity)
    .replace(/\{\{layer1Offset\}\}/g, layer1Offset)
    .replace(/\{\{layer1Size\}\}/g, layer1Size)
    .replace(/\{\{layer2Offset\}\}/g, layer2Offset)
    .replace(/\{\{layer2Size\}\}/g, layer2Size)
    .replace(/\{\{layer3Offset\}\}/g, layer3Offset)
    .replace(/\{\{layer3Size\}\}/g, layer3Size)
    .replace(/\{\{lineX1Start\}\}/g, lineX1Start)
    .replace(/\{\{lineY1Start\}\}/g, lineY1Start)
    .replace(/\{\{lineX1End\}\}/g, lineX1End)
    .replace(/\{\{lineY1End\}\}/g, lineY1End)
    .replace(/\{\{lineX2Start\}\}/g, lineX2Start)
    .replace(/\{\{lineY2Start\}\}/g, lineY2Start)
    .replace(/\{\{lineX2End\}\}/g, lineX2End)
    .replace(/\{\{lineY2End\}\}/g, lineY2End)
    .replace(/\{\{quantum1X\}\}/g, quantum1X)
    .replace(/\{\{quantum1Y\}\}/g, quantum1Y)
    .replace(/\{\{quantum2X\}\}/g, quantum2X)
    .replace(/\{\{quantum2Y\}\}/g, quantum2Y)
    .replace(/\{\{quantumSize\}\}/g, quantumSize);
}

/**
 * Generate a pixel SVG based on state
 * @param {Object} options - Configuration options
 * @returns {string} SVG markup
 */
export function generateQuantumPixel({
  size = 32,
  state = 'materialized', // materialized, partial, energy, superposition
  color = '#331F4A', // Dimensional Eggplant default
  accentColor = '#5AC8FA', // Subtle Cyan default
  secondaryAccentColor = '#BF4080', // Rose Energy default
  borderRadius = 2
} = {}) {
  // Generate based on state
  switch (state.toLowerCase()) {
    case 'materialized':
      return generateMaterializedPixel({ size, color, accentColor, borderRadius });
    case 'partial':
      return generatePartialPixel({ size, color, accentColor, borderRadius });
    case 'energy':
      return generateEnergyPixel({ size, color, accentColor, borderRadius });
    case 'superposition':
      return generateSuperpositionPixel({ size, color, accentColor, secondaryAccentColor, borderRadius });
    default:
      return generateMaterializedPixel({ size, color, accentColor, borderRadius });
  }
}

/**
 * Generate all variants of pixels for the design system
 * @returns {Object} Collection of all pixel variants
 */
export function generateQuantumPixelSystem() {
  const states = ['materialized', 'partial', 'energy', 'superposition'];
  const sizes = [16, 32, 48, 64]; // 1x, 2x, 3x, 4x
  const colorSets = [
    // Primary foundation colors
    { main: '#131A36', accent: '#5AC8FA', secondary: '#BF4080' }, // Deep Space Indigo + Subtle Cyan
    { main: '#331F4A', accent: '#BF4080', secondary: '#5AC8FA' }, // Dimensional Eggplant + Rose Energy
    { main: '#0D0D15', accent: '#6A3093', secondary: '#FF6B6B' }, // Midnight Richness + Quantum Violet
    // Heritage colors
    { main: '#2C5F2D', accent: '#3DFF74', secondary: '#00FFC8' }, // Heritage Green + Heritage Pixel Green
  ];

  const pixelSystem = {};

  // Generate all combinations
  states.forEach(state => {
    pixelSystem[state] = {};

    colorSets.forEach((colorSet, colorIndex) => {
      pixelSystem[state][colorIndex] = {};

      sizes.forEach((size, sizeIndex) => {
        const svgString = generateQuantumPixel({
          size,
          state,
          color: colorSet.main,
          accentColor: colorSet.accent,
          secondaryAccentColor: colorSet.secondary,
          borderRadius: Math.max(1, Math.floor(size / 16))
        });

        pixelSystem[state][colorIndex][sizeIndex] = svgString;
      });
    });
  });

  return pixelSystem;
}

// Template loading functions
// In a browser environment, these would load from files
// For now, we'll return placeholder strings that would be replaced with actual file loading
function getMaterializedTemplate() {
  // This would load from the template file in a real implementation
  return `<svg width="{{size}}" height="{{size}}" viewBox="0 0 {{size}} {{size}}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-materialized" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="{{glowIntensity}}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="materializedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{{color}}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="{{color}}" stop-opacity="1"/>
    </linearGradient>
  </defs>
  
  <!-- Main pixel shape -->
  <rect
    x="0"
    y="0"
    width="{{size}}"
    height="{{size}}"
    rx="{{borderRadius}}"
    fill="url(#materializedGradient)"
    filter="url(#glow-materialized)"
    class="quantum-pixel materialized-state"
  />
  
  <!-- Highlight edge -->
  <rect
    x="{{highlightOffset}}"
    y="{{highlightOffset}}"
    width="{{highlightSize}}"
    height="{{highlightSize}}"
    rx="{{highlightRadius}}"
    stroke="{{accentColor}}"
    stroke-width="1"
    fill="none"
    opacity="0.3"
    class="pixel-highlight"
  />
</svg>`;
}

function getPartialTemplate() {
  return `<svg width="{{size}}" height="{{size}}" viewBox="0 0 {{size}} {{size}}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-partial" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="{{glowIntensity}}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="partialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{{accentColor}}" stop-opacity="0.05"/>
      <stop offset="80%" stop-color="{{color}}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="{{color}}" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  
  <!-- Main pixel shape with partial materialization -->
  <rect
    x="2"
    y="2"
    width="{{innerSize}}"
    height="{{innerSize}}"
    rx="{{borderRadius}}"
    fill="url(#partialGradient)"
    filter="url(#glow-partial)"
    class="quantum-pixel partial-state"
  />
  
  <!-- Edge detail to suggest partial materialization -->
  <rect
    x="1"
    y="1"
    width="{{outerSize}}"
    height="{{outerSize}}"
    rx="{{borderRadius}}"
    stroke="{{accentColor}}"
    stroke-width="0.5"
    stroke-dasharray="{{dashArray}}"
    fill="none"
    opacity="0.6"
    class="partial-edge"
  />
  
  <!-- Energy highlights -->
  <circle
    cx="{{accentX1}}"
    cy="{{accentY1}}"
    r="{{particleSize}}"
    fill="{{accentColor}}"
    opacity="0.6"
    class="energy-particle pulse-opacity"
  />
  
  <circle
    cx="{{accentX2}}"
    cy="{{accentY2}}"
    r="{{particleSize}}"
    fill="{{accentColor}}"
    opacity="0.4"
    class="energy-particle pulse-opacity delay-xs"
  />
</svg>`;
}

function getEnergyTemplate() {
  return `<svg width="{{size}}" height="{{size}}" viewBox="0 0 {{size}} {{size}}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-energy" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="{{glowIntensity}}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="{{accentColor}}" stop-opacity="0.9"/>
      <stop offset="80%" stop-color="{{color}}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="{{color}}" stop-opacity="0.5"/>
    </radialGradient>
    <mask id="energy-mask">
      <rect x="0" y="0" width="{{size}}" height="{{size}}" fill="white"/>
      <circle class="energy-ripple" cx="{{size/2}}" cy="{{size/2}}" r="{{size/4}}" fill="black">
        <animate attributeName="r" from="{{size/12}}" to="{{size/3}}" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="1" to="0" dur="3s" repeatCount="indefinite"/>
      </circle>
    </mask>
  </defs>
  
  <!-- Energy background -->
  <rect
    x="2"
    y="2"
    width="{{innerSize}}"
    height="{{innerSize}}"
    rx="{{borderRadius}}"
    fill="url(#energyGradient)"
    filter="url(#glow-energy)"
    mask="url(#energy-mask)"
    class="quantum-pixel energy-state pulse-opacity"
  />
  
  <!-- Inner energy pulse -->
  <rect
    x="{{innerPulseOffset}}"
    y="{{innerPulseOffset}}"
    width="{{innerPulseSize}}"
    height="{{innerPulseSize}}"
    rx="{{innerPulseRadius}}"
    stroke="{{accentColor}}"
    stroke-width="1.5"
    fill="none"
    opacity="0.8"
    class="energy-pulse pulse-scale"
  />
  
  <!-- Energy particles -->
  <circle cx="{{particleX1}}" cy="{{particleY1}}" r="{{particleSize}}" fill="{{accentColor}}" class="energy-particle pulse-opacity">
    <animate attributeName="cx" from="{{particleX1}}" to="{{particleX1Move}}" dur="2s" repeatCount="indefinite" />
    <animate attributeName="cy" from="{{particleY1}}" to="{{particleY1Move}}" dur="2s" repeatCount="indefinite" />
  </circle>
  
  <circle cx="{{particleX2}}" cy="{{particleY2}}" r="{{particleSize}}" fill="{{accentColor}}" class="energy-particle pulse-opacity delay-sm">
    <animate attributeName="cx" from="{{particleX2}}" to="{{particleX2Move}}" dur="3s" repeatCount="indefinite" />
    <animate attributeName="cy" from="{{particleY2}}" to="{{particleY2Move}}" dur="3s" repeatCount="indefinite" />
  </circle>
  
  <circle cx="{{particleX3}}" cy="{{particleY3}}" r="{{particleSize}}" fill="{{accentColor}}" class="energy-particle pulse-opacity delay-md">
    <animate attributeName="cx" from="{{particleX3}}" to="{{particleX3Move}}" dur="4s" repeatCount="indefinite" />
    <animate attributeName="cy" from="{{particleY3}}" to="{{particleY3Move}}" dur="4s" repeatCount="indefinite" />
  </circle>
</svg>`;
}

function getSuperpositionTemplate() {
  return `<svg width="{{size}}" height="{{size}}" viewBox="0 0 {{size}} {{size}}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-superposition" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="{{glowIntensity}}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="displace" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="turbulence">
        <animate attributeName="baseFrequency" from="0.03" to="0.05" dur="10s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="superpositionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{{accentColor}}" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="{{color}}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="{{secondaryAccentColor}}" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  
  <!-- Layer 3 (background layer) -->
  <rect
    x="{{layer3Offset}}"
    y="{{layer3Offset}}"
    width="{{layer3Size}}"
    height="{{layer3Size}}"
    rx="{{borderRadius}}"
    fill="{{secondaryAccentColor}}"
    opacity="0.2"
    class="superposition-layer3"
  />
  
  <!-- Layer 2 (middle layer) -->
  <rect
    x="{{layer2Offset}}"
    y="{{layer2Offset}}"
    width="{{layer2Size}}"
    height="{{layer2Size}}"
    rx="{{borderRadius}}"
    fill="{{accentColor}}"
    opacity="0.3"
    filter="url(#displace)"
    class="superposition-layer2 m4-optimized"
  />
  
  <!-- Layer 1 (primary layer) -->
  <rect
    x="{{layer1Offset}}"
    y="{{layer1Offset}}"
    width="{{layer1Size}}"
    height="{{layer1Size}}"
    rx="{{borderRadius}}"
    fill="url(#superpositionGradient)"
    filter="url(#glow-superposition)"
    class="superposition-layer1 quantum-pixel m4-optimized"
  />
  
  <!-- Position indicator lines -->
  <line
    x1="{{lineX1Start}}"
    y1="{{lineY1Start}}"
    x2="{{lineX1End}}"
    y2="{{lineY1End}}"
    stroke="{{accentColor}}"
    stroke-width="0.5"
    stroke-dasharray="2 1"
    opacity="0.6"
    class="position-line"
  />
  
  <line
    x1="{{lineX2Start}}"
    y1="{{lineY2Start}}"
    x2="{{lineX2End}}"
    y2="{{lineY2End}}"
    stroke="{{accentColor}}"
    stroke-width="0.5"
    stroke-dasharray="2 1"
    opacity="0.6"
    class="position-line"
  />
  
  <!-- Quantum state indicators -->
  <circle
    cx="{{quantum1X}}"
    cy="{{quantum1Y}}"
    r="{{quantumSize}}"
    fill="{{accentColor}}"
    class="quantum-indicator pulse-combined"
  />
  
  <circle
    cx="{{quantum2X}}"
    cy="{{quantum2Y}}"
    r="{{quantumSize}}"
    fill="{{secondaryAccentColor}}"
    class="quantum-indicator pulse-combined delay-sm"
  />
</svg>`;
}

// Note: All functions are already exported above with individual export statements