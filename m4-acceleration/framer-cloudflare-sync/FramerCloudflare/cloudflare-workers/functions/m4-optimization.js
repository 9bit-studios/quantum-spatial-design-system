/**
 * M4 Optimization Functions for Quantum-Spatial Design System
 * 
 * These functions enable Apple M4-specific performance optimizations
 * leveraging Metal API and Neural Engine for enhanced rendering
 * 
 * Usage: Import these functions and use them in your API endpoints
 * to optimize performance based on device capability detection
 */

/**
 * Detect Apple Silicon device from User-Agent and estimate chip generation
 * @param {string} userAgent - Browser User-Agent string
 * @returns {Object} - Device capabilities
 */
function detectAppleSilicon(userAgent = '') {
  // Check for Mac with Apple Silicon
  const isMac = userAgent.includes('Mac');
  const isAppleSilicon = isMac && 
                       (userAgent.includes('Apple Silicon') || 
                        !userAgent.includes('Intel'));
  
  // Get macOS version which helps estimate chip generation
  const macOSVersionRegex = /Mac OS X (\d+)[._](\d+)(?:[._](\d+))?/;
  const macOSVersionMatch = userAgent.match(macOSVersionRegex);
  
  let macOSVersion = null;
  if (macOSVersionMatch) {
    const major = parseInt(macOSVersionMatch[1], 10);
    const minor = parseInt(macOSVersionMatch[2], 10);
    const patch = macOSVersionMatch[3] ? parseInt(macOSVersionMatch[3], 10) : 0;
    macOSVersion = { major, minor, patch };
  }

  // Safari version can also help identify newer hardware
  const safariVersionRegex = /Version\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari/;
  const safariVersionMatch = userAgent.match(safariVersionRegex);
  
  let safariVersion = null;
  if (safariVersionMatch) {
    const major = parseInt(safariVersionMatch[1], 10);
    const minor = parseInt(safariVersionMatch[2], 10);
    const patch = safariVersionMatch[3] ? parseInt(safariVersionMatch[3], 10) : 0;
    safariVersion = { major, minor, patch };
  }
  
  // Estimate chip generation based on macOS version, release dates and User-Agent
  // macOS versions:
  // - macOS 14.0+ (Sequoia): Likely M4 or newer
  // - macOS 13.0+ (Ventura): Likely M2 or newer
  // - macOS 12.0+ (Monterey): Likely M1 or newer
  // - macOS 11.0+ (Big Sur): First Apple Silicon support
  
  let chipGeneration = "unknown";
  let isM4 = false;
  let isM3 = false;
  let isM2 = false;
  let isM1 = false;
  
  if (isAppleSilicon && macOSVersion) {
    // First determine if it's Apple Silicon
    if (macOSVersion.major >= 14) {
      // macOS 14 (Sequoia) released with M4 Macs
      chipGeneration = "M4";
      isM4 = true;
    } else if (macOSVersion.major >= 13 && macOSVersion.minor >= 5) {
      // macOS 13.5+ often indicates M3
      chipGeneration = "M3";
      isM3 = true;
    } else if (macOSVersion.major >= 13) {
      // macOS 13 (Ventura) likely indicates M2 or newer
      chipGeneration = "M2";
      isM2 = true;
    } else if (macOSVersion.major >= 11) {
      // macOS 11+ (Big Sur) supports M1
      chipGeneration = "M1";
      isM1 = true;
    }
    
    // Safari version can further refine the estimate
    if (safariVersion) {
      if (safariVersion.major >= 17 && safariVersion.minor >= 4) {
        // Safari 17.4+ was released with macOS 14.4 which supports M4
        chipGeneration = "M4";
        isM4 = true;
      } else if (safariVersion.major >= 17) {
        // Safari 17+ was released with macOS 14 which includes M3 optimizations
        if (chipGeneration === "unknown") {
          chipGeneration = "M3";
          isM3 = true;
        }
      }
    }
  }
  
  // Additional hardware capability estimates
  const hasNeuralEngine = isAppleSilicon;
  const hasAdvancedML = isM2 || isM3 || isM4; // M2 and above have enhanced ML capabilities
  const hasProMotion = isM1 || isM2 || isM3 || isM4; // ProMotion often available on newer chips
  const hasHDR = isM2 || isM3 || isM4; // Better HDR on M2+
  const hasMetalAPI = isAppleSilicon;
  const hasAdvancedRAM = isM2 || isM3 || isM4; // Unified memory improvements
  const hasDisplayP3 = isAppleSilicon; // Wide color gamut
  
  return {
    isAppleSilicon,
    isMac,
    chipGeneration,
    isM1,
    isM2,
    isM3,
    isM4,
    macOSVersion,
    safariVersion,
    // Estimated capabilities
    capabilities: {
      metal: hasMetalAPI,
      neuralEngine: hasNeuralEngine,
      advancedML: hasAdvancedML,
      proMotion: hasProMotion,
      hdr: hasHDR,
      advancedMemory: hasAdvancedRAM,
      displayP3: hasDisplayP3,
      // Specific M4 capabilities
      quantumRendering: isM4,
      neuralRenderingEngine: isM4,
      advancedShaders: isM3 || isM4,
      performanceEnhanced: isM4
    }
  };
}

/**
 * Generate Metal API compatible flags for rendering
 * @param {boolean} isAppleSilicon - Whether device is Apple Silicon
 * @param {string} renderQuality - Quality level ('maximum', 'high', 'balanced', 'performance')
 * @returns {Object} - Metal optimization flags
 */
function getMetalOptimizationFlags(isAppleSilicon, renderQuality = 'balanced') {
  if (!isAppleSilicon) {
    return {
      useMetal: false,
      useWebGL: true,
      pixelRatio: 1.0
    };
  }
  
  // Quality levels impact performance vs visual fidelity
  const qualitySettings = {
    maximum: {
      antialiasing: true,
      msaaSamples: 8,
      pixelRatio: 'device',
      highPrecisionColors: true,
      colorSpace: 'display-p3',
      hdr: true,
      dynamicResolution: true,
      texture: {
        compression: 'highest',
        mipmaps: true,
        anisotropicFiltering: 16
      },
      shadow: {
        quality: 'ultra',
        resolution: 4096,
        softShadows: true,
        contactShadows: true
      },
      lighting: {
        globalIllumination: true,
        ambientOcclusion: true,
        reflections: true
      },
      postProcessing: {
        bloom: true,
        motionBlur: true,
        depthOfField: true,
        chromaticAberration: true
      }
    },
    high: {
      antialiasing: true,
      msaaSamples: 4,
      pixelRatio: 'device',
      highPrecisionColors: true,
      colorSpace: 'display-p3',
      hdr: true,
      dynamicResolution: true,
      texture: {
        compression: 'high',
        mipmaps: true,
        anisotropicFiltering: 8
      },
      shadow: {
        quality: 'high',
        resolution: 2048,
        softShadows: true
      },
      lighting: {
        globalIllumination: true,
        ambientOcclusion: true,
        reflections: true
      },
      postProcessing: {
        bloom: true,
        motionBlur: false,
        depthOfField: true
      }
    },
    balanced: {
      antialiasing: true,
      msaaSamples: 2,
      pixelRatio: 'device',
      highPrecisionColors: true,
      colorSpace: 'srgb',
      hdr: false,
      dynamicResolution: true,
      texture: {
        compression: 'medium',
        mipmaps: true,
        anisotropicFiltering: 4
      },
      shadow: {
        quality: 'medium',
        resolution: 1024,
        softShadows: false
      },
      lighting: {
        globalIllumination: false,
        ambientOcclusion: true,
        reflections: false
      },
      postProcessing: {
        bloom: true,
        motionBlur: false,
        depthOfField: false
      }
    },
    performance: {
      antialiasing: false,
      msaaSamples: 0,
      pixelRatio: 1.0,
      highPrecisionColors: false,
      colorSpace: 'srgb',
      hdr: false,
      dynamicResolution: false,
      texture: {
        compression: 'low',
        mipmaps: false,
        anisotropicFiltering: 1
      },
      shadow: {
        quality: 'low',
        resolution: 512,
        softShadows: false
      },
      lighting: {
        globalIllumination: false,
        ambientOcclusion: false,
        reflections: false
      },
      postProcessing: {
        bloom: false,
        motionBlur: false,
        depthOfField: false
      }
    }
  };
  
  // Use appropriate quality settings or default to balanced
  const settings = qualitySettings[renderQuality] || qualitySettings.balanced;
  
  return {
    useMetal: true,
    useWebGL: false,
    renderingAPI: 'metal',
    metalSettings: settings
  };
}

/**
 * Generate Neural Engine optimization parameters
 * @param {boolean} isAppleSilicon - Whether device is Apple Silicon
 * @param {string} processingLevel - Processing level ('advanced', 'maximum', 'enhanced', 'standard')
 * @returns {Object} - Neural Engine optimization flags
 */
function getNeuralEngineOptimizations(isAppleSilicon, processingLevel = 'standard') {
  if (!isAppleSilicon) {
    return {
      useNeuralEngine: false
    };
  }
  
  // Processing levels determine how much Neural Engine acceleration to use
  const processingSettings = {
    advanced: {
      imageProcessing: true,
      filterOptimization: true,
      animationPrediction: true,
      contentAwareScaling: true,
      spatialRendering: true,
      superResolution: true,
      neuralAntialiasing: true,
      neuralEffects: true,
      adaptiveColorGrading: true,
      colorHarmonization: true,
      depthPerception: true,
      objectRecognition: true,
      contextAwareness: true,
      semanticProcessing: {
        enabled: true,
        intensity: 1.0,
        contextSensitivity: 0.8
      },
      visualEffects: {
        bloom: {
          enabled: true,
          intensity: 0.4,
          threshold: 0.7,
          radius: 5.0
        },
        chromaticAberration: {
          enabled: true,
          intensity: 0.025
        },
        depthOfField: {
          enabled: true,
          intensity: 0.5,
          focusDistance: 10,
          bokehSize: 5
        },
        motionBlur: {
          enabled: true,
          intensity: 0.3
        }
      },
      processingPriority: 'quality'
    },
    maximum: {
      imageProcessing: true,
      filterOptimization: true,
      animationPrediction: true,
      contentAwareScaling: true,
      spatialRendering: true,
      superResolution: true,
      neuralAntialiasing: true,
      neuralEffects: true,
      adaptiveColorGrading: true,
      colorHarmonization: true,
      depthPerception: true,
      objectRecognition: false,
      contextAwareness: false,
      semanticProcessing: {
        enabled: true,
        intensity: 0.8,
        contextSensitivity: 0.6
      },
      visualEffects: {
        bloom: {
          enabled: true,
          intensity: 0.3,
          threshold: 0.7,
          radius: 4.0
        },
        chromaticAberration: {
          enabled: true,
          intensity: 0.015
        },
        depthOfField: {
          enabled: true,
          intensity: 0.4,
          focusDistance: 10,
          bokehSize: 4
        },
        motionBlur: {
          enabled: true,
          intensity: 0.2
        }
      },
      processingPriority: 'balanced'
    },
    enhanced: {
      imageProcessing: true,
      filterOptimization: true,
      animationPrediction: true,
      contentAwareScaling: true,
      spatialRendering: false,
      superResolution: true,
      neuralAntialiasing: true,
      neuralEffects: false,
      adaptiveColorGrading: true,
      colorHarmonization: false,
      depthPerception: false,
      objectRecognition: false,
      contextAwareness: false,
      semanticProcessing: {
        enabled: false
      },
      visualEffects: {
        bloom: {
          enabled: true,
          intensity: 0.2,
          threshold: 0.8,
          radius: 3.0
        },
        chromaticAberration: {
          enabled: false
        },
        depthOfField: {
          enabled: false
        },
        motionBlur: {
          enabled: false
        }
      },
      processingPriority: 'balanced'
    },
    standard: {
      imageProcessing: true,
      filterOptimization: true,
      animationPrediction: false,
      contentAwareScaling: false,
      spatialRendering: false,
      superResolution: false,
      neuralAntialiasing: false,
      neuralEffects: false,
      adaptiveColorGrading: false,
      colorHarmonization: false,
      depthPerception: false,
      objectRecognition: false,
      contextAwareness: false,
      semanticProcessing: {
        enabled: false
      },
      visualEffects: {
        bloom: {
          enabled: false
        },
        chromaticAberration: {
          enabled: false
        },
        depthOfField: {
          enabled: false
        },
        motionBlur: {
          enabled: false
        }
      },
      processingPriority: 'performance'
    }
  };
  
  // Use appropriate processing settings or default to standard
  const settings = processingSettings[processingLevel] || processingSettings.standard;
  
  return {
    useNeuralEngine: true,
    neuralEngineSettings: settings
  };
}

/**
 * Generate comprehensive M4 optimization parameters
 * @param {string} userAgent - Browser User-Agent string
 * @param {Object} options - Optimization options
 * @returns {Object} - Complete optimization parameters
 */
function getM4Optimizations(userAgent, options = {}) {
  const {
    renderQuality = 'balanced',
    processingLevel = 'standard',
    memoryOptimization = 'balanced'
  } = options;
  
  // Detect device capabilities
  const deviceCapabilities = detectAppleSilicon(userAgent);
  
  // Generate optimization parameters
  const metalOptimizations = getMetalOptimizationFlags(
    deviceCapabilities.isAppleSilicon,
    renderQuality
  );
  
  const neuralEngineOptimizations = getNeuralEngineOptimizations(
    deviceCapabilities.isAppleSilicon,
    processingLevel
  );
  
  // Memory optimization settings
  const memorySettings = {
    aggressive: {
      texturePoolSize: 'small',
      cacheSize: 'minimal',
      preloadAssets: false,
      unloadUnusedAssets: true,
      maxSimultaneousTextures: 8,
      streamingAssets: true,
      textureCompression: 'high',
      mipMapLimitBias: 2,
      dynamicResolutionScaling: true,
      minimumResolutionScale: 0.7,
      memoryBudget: {
        textures: '128MB',
        meshes: '64MB',
        shaders: '32MB',
        total: '256MB'
      },
      gcFrequency: 'aggressive'
    },
    balanced: {
      texturePoolSize: 'medium',
      cacheSize: 'standard',
      preloadAssets: true,
      unloadUnusedAssets: true,
      maxSimultaneousTextures: 16,
      streamingAssets: true,
      textureCompression: 'medium',
      mipMapLimitBias: 1,
      dynamicResolutionScaling: true,
      minimumResolutionScale: 0.8,
      memoryBudget: {
        textures: '256MB',
        meshes: '128MB',
        shaders: '64MB',
        total: '512MB'
      },
      gcFrequency: 'normal'
    },
    performance: {
      texturePoolSize: 'large',
      cacheSize: 'large',
      preloadAssets: true,
      unloadUnusedAssets: false,
      maxSimultaneousTextures: 32,
      streamingAssets: false,
      textureCompression: 'low',
      mipMapLimitBias: 0,
      dynamicResolutionScaling: false,
      minimumResolutionScale: 1.0,
      memoryBudget: {
        textures: '512MB',
        meshes: '256MB',
        shaders: '128MB',
        total: '1GB'
      },
      gcFrequency: 'minimal'
    },
    maximum: {
      texturePoolSize: 'unlimited',
      cacheSize: 'unlimited',
      preloadAssets: true,
      unloadUnusedAssets: false,
      maxSimultaneousTextures: 64,
      streamingAssets: false,
      textureCompression: 'none',
      mipMapLimitBias: 0,
      dynamicResolutionScaling: false,
      minimumResolutionScale: 1.0,
      memoryBudget: {
        textures: '1GB',
        meshes: '512MB',
        shaders: '256MB',
        total: '2GB'
      },
      gcFrequency: 'minimal',
      hdrBufferFormat: 'float16',
      shadowMapResolution: 'maximum'
    }
  };
  
  // Use appropriate memory settings or default to balanced
  const memSettings = memorySettings[memoryOptimization] || memorySettings.balanced;
  
  // Combine all optimizations
  return {
    deviceInfo: {
      isAppleSilicon: deviceCapabilities.isAppleSilicon,
      chipGeneration: deviceCapabilities.chipGeneration,
      isM1: deviceCapabilities.isM1,
      isM2: deviceCapabilities.isM2,
      isM3: deviceCapabilities.isM3,
      isM4: deviceCapabilities.isM4,
      isMac: deviceCapabilities.isMac,
      macOSVersion: deviceCapabilities.macOSVersion,
      safariVersion: deviceCapabilities.safariVersion
    },
    rendering: metalOptimizations,
    neuralEngine: neuralEngineOptimizations,
    memory: memSettings,
    // Global flags for easy condition checking
    flags: {
      useMetal: deviceCapabilities.capabilities.metal,
      useNeuralEngine: deviceCapabilities.capabilities.neuralEngine,
      useAdvancedML: deviceCapabilities.capabilities.advancedML,
      useProMotion: deviceCapabilities.capabilities.proMotion,
      useHDR: deviceCapabilities.capabilities.hdr,
      useDisplayP3: deviceCapabilities.capabilities.displayP3,
      useQuantumRendering: deviceCapabilities.capabilities.quantumRendering,
      useNeuralRenderingEngine: deviceCapabilities.capabilities.neuralRenderingEngine,
      useAdvancedShaders: deviceCapabilities.capabilities.advancedShaders,
      usePerformanceEnhanced: deviceCapabilities.capabilities.performanceEnhanced,
      optimizationsEnabled: deviceCapabilities.isAppleSilicon
    },
    // M4-specific features
    m4Features: deviceCapabilities.isM4 ? {
      quantumRendering: {
        enabled: true,
        volumetricMaterials: true,
        superSampling: true,
        adaptiveQuality: true,
        tessellation: true,
        geometryShaders: true,
        computeShaders: true,
        hardwareRayTracing: true
      },
      neuralEngine: {
        superResolution: true,
        adaptiveFiltering: true,
        temporalUpscaling: true,
        framePrediction: true,
        sceneUnderstanding: true,
        contentAwareness: true
      },
      performance: {
        multithreadingOptimizations: true,
        asynchronousCompute: true,
        lowLatencyPipeline: true,
        variableRateShading: true,
        frameStatistics: true,
        meshShaders: true,
        primitiveAmplification: true
      },
      display: {
        hdr10Plus: true,
        dolbyVision: true,
        proMotionAdaptive: true,
        displayP3ColorSpace: true,
        adaptiveToneMapping: true,
        perceptualColorAdaptation: true
      }
    } : null
  };
}

module.exports = {
  detectAppleSilicon,
  getMetalOptimizationFlags,
  getNeuralEngineOptimizations,
  getM4Optimizations
};