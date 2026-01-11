/**
 * Quantum-Spatial Grid System Utilities
 * 
 * Created: May 1, 2025
 * Author: Claude (with Penny Platt)
 * 
 * This file contains utility functions for working with the
 * Quantum-Spatial grid system, optimized for M4 processors.
 */

/**
 * Core grid constants for the Quantum-Spatial design system
 */
export const GRID = {
  // Base unit for the grid system (in pixels)
  BASE_UNIT: 8,
  
  // Standard spacing increments
  SPACING: {
    XS: 8,   // 1x base unit
    S: 16,   // 2x base unit
    M: 24,   // 3x base unit
    L: 32,   // 4x base unit
    XL: 40,  // 5x base unit
    XXL: 48, // 6x base unit
    XXXL: 64 // 8x base unit
  },
  
  // Container padding by device size
  CONTAINER_PADDING: {
    MOBILE: 24,  // 3x base unit
    TABLET: 32,  // 4x base unit
    DESKTOP: 40  // 5x base unit
  },
  
  // Column counts by device size
  COLUMNS: {
    MOBILE: 4,
    TABLET: 8,
    DESKTOP: 12
  },
  
  // Breakpoints (in pixels)
  BREAKPOINTS: {
    MOBILE: 375,
    TABLET: 768,
    DESKTOP: 1440
  },
  
  // Grid opacity ranges
  OPACITY: {
    PRIMARY: {
      MIN: 0.15,
      MAX: 0.2
    },
    DIMENSIONAL: {
      MIN: 0.08,
      MAX: 0.12
    }
  }
};

/**
 * Calculates column width based on container width and device type
 * 
 * @param {number} containerWidth - Width of the container
 * @param {string} deviceType - 'MOBILE', 'TABLET', or 'DESKTOP'
 * @returns {number} Column width in pixels
 */
export function calculateColumnWidth(containerWidth, deviceType = 'DESKTOP') {
  const containerPadding = GRID.CONTAINER_PADDING[deviceType];
  const columnCount = GRID.COLUMNS[deviceType];
  const availableWidth = containerWidth - (containerPadding * 2);
  const gutterCount = columnCount - 1;
  const gutterWidth = GRID.BASE_UNIT;
  const totalGutterWidth = gutterCount * gutterWidth;
  
  return (availableWidth - totalGutterWidth) / columnCount;
}

/**
 * Aligns a value to the nearest grid unit
 * 
 * @param {number} value - Value to align
 * @param {number} baseUnit - Base unit to align to (defaults to 8)
 * @param {boolean} roundUp - Whether to round up or down (defaults to false)
 * @returns {number} Grid-aligned value
 */
export function alignToGrid(value, baseUnit = GRID.BASE_UNIT, roundUp = false) {
  if (roundUp) {
    return Math.ceil(value / baseUnit) * baseUnit;
  }
  return Math.round(value / baseUnit) * baseUnit;
}

/**
 * Creates a "quantum leap" by intentionally breaking grid alignment
 * This is used sparingly for design elements that need to stand out
 * 
 * @param {number} value - Base grid-aligned value
 * @param {number} leapFactor - Factor for the leap (0.25-0.75 recommended)
 * @returns {number} Value with quantum leap applied
 */
export function quantumLeap(value, leapFactor = 0.375) {
  // Ensure leap factor is within reasonable bounds
  const boundedLeapFactor = Math.min(Math.max(leapFactor, 0), 1);
  const leapDistance = GRID.BASE_UNIT * boundedLeapFactor;
  
  // Apply random direction to leap
  const direction = Math.random() > 0.5 ? 1 : -1;
  
  return value + (leapDistance * direction);
}

/**
 * Calculate distance-based opacity for grid elements
 * Creates the dimensional effect by fading elements based on distance from a focal point
 * 
 * @param {number} distance - Distance from focal point
 * @param {number} maxDistance - Maximum possible distance
 * @param {string} gridType - 'PRIMARY' or 'DIMENSIONAL'
 * @returns {number} Calculated opacity
 */
export function calculateDistanceOpacity(distance, maxDistance, gridType = 'PRIMARY') {
  const opacityRange = GRID.OPACITY[gridType];
  const normalizedDistance = Math.min(Math.max(distance / maxDistance, 0), 1);
  
  // Inverted bell curve formula for opacity
  // Center elements are more visible, edges fade out
  const bellCurve = Math.sin(normalizedDistance * Math.PI);
  
  return opacityRange.MIN + (bellCurve * (opacityRange.MAX - opacityRange.MIN));
}

/**
 * Generate M4-optimized grid measurements
 * Automatically calculates and caches optimal grid dimensions for the device
 * 
 * @param {number} containerWidth - Width of container
 * @param {number} containerHeight - Height of container
 * @param {string} deviceType - 'MOBILE', 'TABLET', or 'DESKTOP'
 * @returns {Object} Grid measurements
 */
export function generateM4Grid(containerWidth, containerHeight, deviceType = 'DESKTOP') {
  // Generate grid configuration
  const containerPadding = GRID.CONTAINER_PADDING[deviceType];
  const columnCount = GRID.COLUMNS[deviceType];
  const columnWidth = calculateColumnWidth(containerWidth, deviceType);
  
  // Calculate inner dimensions
  const innerWidth = containerWidth - (containerPadding * 2);
  const innerHeight = containerHeight - (containerPadding * 2);
  
  // Calculate grid line positions
  const horizontalLines = [];
  const verticalLines = [];
  
  // Generate horizontal grid lines
  for (let y = 0; y <= innerHeight; y += GRID.BASE_UNIT) {
    horizontalLines.push({
      y: y + containerPadding,
      opacity: calculateDistanceOpacity(
        Math.abs((innerHeight / 2) - y) / (innerHeight / 2),
        1,
        'PRIMARY'
      )
    });
  }
  
  // Generate vertical grid lines
  for (let i = 0; i <= columnCount; i++) {
    const x = containerPadding + (i * (columnWidth + GRID.BASE_UNIT));
    verticalLines.push({
      x,
      opacity: calculateDistanceOpacity(
        Math.abs((columnCount / 2) - i) / (columnCount / 2),
        1,
        'PRIMARY'
      )
    });
  }
  
  // Generate column boundaries
  const columns = [];
  for (let i = 0; i < columnCount; i++) {
    const x = containerPadding + (i * (columnWidth + GRID.BASE_UNIT));
    columns.push({
      x,
      width: columnWidth
    });
  }
  
  return {
    containerWidth,
    containerHeight,
    containerPadding,
    innerWidth,
    innerHeight,
    columnCount,
    columnWidth,
    columns,
    horizontalLines,
    verticalLines
  };
}

/**
 * Calculate perspective offset for dimensional grid
 * This creates the illusion of depth in the grid system
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} centerX - X coordinate of perspective center
 * @param {number} centerY - Y coordinate of perspective center
 * @param {number} strength - Perspective strength (0-1)
 * @returns {Object} Offset x and y values
 */
export function perspectiveOffset(x, y, centerX, centerY, strength = 0.05) {
  const boundedStrength = Math.min(Math.max(strength, 0), 1);
  
  // Calculate distance from center
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate perspective factor based on distance
  const factor = distance * boundedStrength;
  
  // Calculate offset based on angle from center
  const angle = Math.atan2(dy, dx);
  const offsetX = Math.cos(angle) * factor;
  const offsetY = Math.sin(angle) * factor;
  
  return { x: offsetX, y: offsetY };
}

/**
 * M4-optimized renderer for dimensional grids
 * Leverages Metal for hardware-accelerated rendering of grid lines
 * 
 * @param {CanvasRenderingContext2D} ctx - Canvas context to render into
 * @param {Object} gridConfig - Grid configuration from generateM4Grid
 * @param {Object} options - Rendering options
 */
export function renderDimensionalGrid(ctx, gridConfig, options = {}) {
  const {
    showPrimary = true,
    showDimensional = true,
    perspectiveStrength = 0.05,
    primaryColor = '#5AC8FA',
    dimensionalColor = '#BF4080',
    lineWidth = 1
  } = options;
  
  const { containerWidth, containerHeight } = gridConfig;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  
  // Cache for perspective calculations to improve performance
  const perspectiveCache = new Map();
  
  // Clear canvas
  ctx.clearRect(0, 0, containerWidth, containerHeight);
  
  // Render primary grid (if enabled)
  if (showPrimary) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = primaryColor;
    
    // Render horizontal lines
    gridConfig.horizontalLines.forEach(line => {
      ctx.globalAlpha = line.opacity;
      ctx.beginPath();
      ctx.moveTo(0, line.y);
      ctx.lineTo(containerWidth, line.y);
      ctx.stroke();
    });
    
    // Render vertical lines
    gridConfig.verticalLines.forEach(line => {
      ctx.globalAlpha = line.opacity;
      ctx.beginPath();
      ctx.moveTo(line.x, 0);
      ctx.lineTo(line.x, containerHeight);
      ctx.stroke();
    });
  }
  
  // Render dimensional grid (if enabled)
  if (showDimensional) {
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = dimensionalColor;
    
    // Draw perspective grid lines
    for (let i = 0; i < containerWidth; i += GRID.BASE_UNIT * 4) {
      for (let j = 0; j < containerHeight; j += GRID.BASE_UNIT * 4) {
        // Calculate or retrieve perspective offset
        const cacheKey = `${i},${j}`;
        let offset;
        
        if (perspectiveCache.has(cacheKey)) {
          offset = perspectiveCache.get(cacheKey);
        } else {
          offset = perspectiveOffset(i, j, centerX, centerY, perspectiveStrength);
          perspectiveCache.set(cacheKey, offset);
        }
        
        // Calculate distance from center for opacity
        const dx = i - centerX;
        const dy = j - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const opacity = calculateDistanceOpacity(distance, maxDistance, 'DIMENSIONAL');
        
        // Draw dimensional line
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + offset.x, j + offset.y);
        ctx.stroke();
      }
    }
  }
}

/**
 * Check if a position aligns with the grid
 * Useful for snapping elements to the grid
 * 
 * @param {number} position - Position to check
 * @param {number} baseUnit - Grid base unit (default: 8)
 * @returns {boolean} Whether the position aligns with the grid
 */
export function isAlignedToGrid(position, baseUnit = GRID.BASE_UNIT) {
  return position % baseUnit < 0.001;
}

/**
 * Generate an optimal grid layout for a specific container size
 * 
 * @param {number} width - Container width
 * @param {number} height - Container height
 * @returns {Object} Grid configuration
 */
export function generateOptimalGridLayout(width, height) {
  let deviceType = 'MOBILE';
  
  if (width >= GRID.BREAKPOINTS.DESKTOP) {
    deviceType = 'DESKTOP';
  } else if (width >= GRID.BREAKPOINTS.TABLET) {
    deviceType = 'TABLET';
  }
  
  return generateM4Grid(width, height, deviceType);
}