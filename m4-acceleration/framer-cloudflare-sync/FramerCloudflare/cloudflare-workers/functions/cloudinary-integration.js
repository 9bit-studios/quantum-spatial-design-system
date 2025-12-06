/**
 * Cloudinary Integration for Quantum-Spatial Design System
 * 
 * This module provides utilities for generating optimized Cloudinary URLs
 * and managing design system assets through the Cloudinary platform,
 * with a focus on M4 optimizations for Apple Silicon devices.
 */

/**
 * Cloudinary configuration
 * @type {Object}
 */
const cloudinaryConfig = {
  cloudName: null,
  apiKey: null,
  apiSecret: null,
  secureDistribution: 'res.cloudinary.com'
};

/**
 * Initialize Cloudinary configuration
 * @param {Object} config - Cloudinary configuration options
 */
function initCloudinary(config = {}) {
  // Safely check for global variables
  const envCloudName = typeof CLOUDINARY_CLOUD_NAME !== 'undefined' ? CLOUDINARY_CLOUD_NAME : null;
  const envApiKey = typeof CLOUDINARY_API_KEY !== 'undefined' ? CLOUDINARY_API_KEY : null;
  const envApiSecret = typeof CLOUDINARY_API_SECRET !== 'undefined' ? CLOUDINARY_API_SECRET : null;

  // Set config values with fallbacks
  cloudinaryConfig.cloudName = config.cloudName || envCloudName || '9bitstudios';
  cloudinaryConfig.apiKey = config.apiKey || envApiKey || null;
  cloudinaryConfig.apiSecret = config.apiSecret || envApiSecret || null;
  cloudinaryConfig.secureDistribution = config.secureDistribution || 'res.cloudinary.com';
}

/**
 * Generate a Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} - Transformed Cloudinary URL
 */
function getCloudinaryUrl(publicId, options = {}) {
  const { width, height, format, quality, ...otherOptions } = options;
  
  // Default transformations
  const transformations = {
    width: width || 'auto',
    height: height || 'auto',
    quality: quality || 'auto',
    format: format || 'auto',
    fetchFormat: 'auto',
    dpr: 'auto',
    ...otherOptions
  };
  
  // Build transformation string
  const transformationString = Object.entries(transformations)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  // Build Cloudinary URL
  return `https://${cloudinaryConfig.secureDistribution}/${cloudinaryConfig.cloudName}/image/upload/${transformationString}/${publicId}`;
}

/**
 * Generate M4-optimized Cloudinary URL
 * @param {string} publicId - Cloudinary public ID
 * @param {boolean} isM4Device - Whether the device is M4-capable
 * @param {Object} options - Additional transformation options
 * @returns {string} - M4-optimized Cloudinary URL
 */
function getM4OptimizedUrl(publicId, isM4Device = false, options = {}) {
  // Base transformations
  const baseTransformations = {
    width: options.width || 'auto',
    height: options.height || 'auto',
    format: 'auto',
    fetchFormat: 'auto',
    quality: isM4Device ? 'auto:best' : 'auto:good',
    dpr: isM4Device ? 'auto' : '1.0',
    colorSpace: 'srgb',
  };
  
  // M4-specific optimizations
  if (isM4Device) {
    // Apply advanced transformations for M4 devices
    Object.assign(baseTransformations, {
      effect: options.effect || null,
      flags: 'progressive',
      loading: 'lazy'
    });
  }
  
  // Merge with additional options
  const transformations = {
    ...baseTransformations,
    ...options
  };
  
  // Build Cloudinary URL
  return getCloudinaryUrl(publicId, transformations);
}

/**
 * Get design system assets from Cloudinary by state
 * @param {string} state - Design system state (heritage, transitional, quantum)
 * @param {boolean} isM4Device - Whether the device is M4-capable
 * @returns {Array} - Assets with optimized URLs
 */
function getDesignStateAssets(state = 'transitional', isM4Device = false) {
  // Define asset mappings per state
  const assetMappings = {
    heritage: [
      { id: 'quantum-spatial-design/heritage/grid-system', type: 'grid', name: 'Orthogonal Grid System' },
      { id: 'quantum-spatial-design/heritage/color-palette', type: 'colors', name: 'Color Palette' },
      { id: 'quantum-spatial-design/heritage/typography', type: 'typography', name: 'Typography System' }
    ],
    transitional: [
      { id: 'quantum-spatial-design/transitional/grid-system', type: 'grid', name: 'Adaptive Grid System' },
      { id: 'quantum-spatial-design/transitional/color-palette', type: 'colors', name: 'Color Palette' },
      { id: 'quantum-spatial-design/transitional/typography', type: 'typography', name: 'Typography System' },
      { id: 'quantum-spatial-design/transitional/motion', type: 'motion', name: 'Motion System' }
    ],
    quantum: [
      { id: 'quantum-spatial-design/quantum/grid-system', type: 'grid', name: 'Spatial Grid System' },
      { id: 'quantum-spatial-design/quantum/color-palette', type: 'colors', name: 'Color Palette' },
      { id: 'quantum-spatial-design/quantum/typography', type: 'typography', name: 'Typography System' },
      { id: 'quantum-spatial-design/quantum/motion', type: 'motion', name: 'Motion System' },
      { id: 'quantum-spatial-design/quantum/material', type: 'material', name: 'Material System' },
      { id: 'quantum-spatial-design/quantum/dimension', type: 'dimension', name: 'Dimension System' }
    ]
  };
  
  // Get assets for the specified state
  const assets = assetMappings[state] || assetMappings.transitional;
  
  // Add URLs to assets with appropriate optimizations
  return assets.map(asset => {
    // Determine if enhanced optimizations should be applied
    const useEnhancedOptimizations = state === 'quantum' && isM4Device;
    
    // Define transformations based on asset type
    const transformations = {};
    
    // Type-specific transformations
    switch (asset.type) {
      case 'grid':
        transformations.width = 1600;
        transformations.crop = 'fit';
        break;
      case 'colors':
        transformations.width = 800;
        transformations.crop = 'fit';
        break;
      case 'typography':
        transformations.width = 1200;
        transformations.crop = 'fit';
        break;
      case 'motion':
        transformations.resource_type = 'video';
        transformations.format = 'mp4';
        break;
      case 'material':
      case 'dimension':
        transformations.width = 1600;
        transformations.crop = 'fill';
        transformations.gravity = 'center';
        if (useEnhancedOptimizations) {
          transformations.effect = 'art:athena';
        }
        break;
      default:
        transformations.width = 1200;
        transformations.crop = 'fit';
    }
    
    // Generate optimized URL
    const url = getM4OptimizedUrl(asset.id, isM4Device, transformations);
    
    // Return asset with URL
    return {
      ...asset,
      url,
      m4Optimized: isM4Device
    };
  });
}

/**
 * Create Cloudinary asset mappings for a design component
 * @param {string} component - Component name
 * @param {string} state - Design system state
 * @param {boolean} isM4Device - Whether the device is M4-capable
 * @returns {Object} - Component assets with URLs
 */
function getDesignComponentAssets(component, state = 'quantum', isM4Device = false) {
  // Component asset structure
  const componentPath = `quantum-spatial-design/${state}/${component}`;
  
  // Define standard view types for components
  const viewTypes = [
    'default',
    'hover',
    'active',
    'disabled'
  ];
  
  // Add spatial views for quantum state
  if (state === 'quantum') {
    viewTypes.push('perspective', 'dimensional');
  }
  
  // Create assets for each view type
  const assets = viewTypes.map(viewType => {
    const assetId = `${componentPath}/${viewType}`;
    
    return {
      id: assetId,
      type: 'component',
      component,
      viewType,
      name: `${component} (${viewType})`,
      url: getM4OptimizedUrl(assetId, isM4Device, {
        width: 800,
        crop: 'fit',
        effect: state === 'quantum' && isM4Device ? 'sharpen:100' : null
      }),
      m4Optimized: isM4Device
    };
  });
  
  return {
    component,
    state,
    assets
  };
}

module.exports = {
  initCloudinary,
  getCloudinaryUrl,
  getM4OptimizedUrl,
  getDesignStateAssets,
  getDesignComponentAssets
};