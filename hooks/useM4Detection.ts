/**
 * 9Bit Studios Quantum-Spatial Design System
 * useM4Detection Hook - TypeScript Version
 *
 * Custom hook to detect and leverage Apple Silicon M4 Neural Engine capabilities
 * Enhanced with Strategic Director integration for optimal performance
 */

import { useState, useEffect } from 'react';

/**
 * GPU Capabilities detection result
 */
export interface GPUCapabilities {
  renderer: string | null;
  isMetalBased: boolean;
  neuralEngineAvailable: boolean;
  maxTextureSize?: number;
  supportedExtensions?: string[];
}

/**
 * M4 Detection Options
 */
export interface M4DetectionOptions {
  /** Whether to consider other M-series chips as capable */
  fallbackToSilicon?: boolean;
  /** Whether to check GPU/Metal capabilities */
  checkGPU?: boolean;
  /** Enable Strategic Director performance optimization */
  enableStrategicDirector?: boolean;
  /** Minimum Neural Engine cores required */
  minNeuralCores?: number;
}

/**
 * M4 Detection Result
 */
export interface M4DetectionResult {
  /** Whether device is M4 capable for quantum-spatial effects */
  isM4Capable: boolean;
  /** Whether device is Apple Silicon (M1, M2, M3, M4) */
  isAppleSilicon: boolean;
  /** Whether device is a Mac */
  isMac: boolean;
  /** Detected GPU capabilities */
  gpuCapabilities: GPUCapabilities | null;
  /** Whether detection has completed */
  detectionComplete: boolean;
  /** Strategic Director performance recommendation */
  performanceMode: 'high' | 'medium' | 'low';
  /** Neural Engine availability */
  neuralEngine: {
    available: boolean;
    estimatedCores: number;
    optimizationLevel: 'maximum' | 'balanced' | 'minimal';
  };
}

/**
 * Hook to detect Apple Silicon M4 capability
 * Enhanced with Strategic Director integration and Neural Engine detection
 *
 * @param options - Detection and optimization options
 * @returns Detection results with performance recommendations
 */
export function useM4Detection(options: M4DetectionOptions = {}): M4DetectionResult {
  const {
    fallbackToSilicon = true,
    checkGPU = true,
    enableStrategicDirector = true,
    minNeuralCores = 16
  } = options;

  // State for various detection results
  const [isAppleSilicon, setIsAppleSilicon] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const [gpuCapabilities, setGpuCapabilities] = useState<GPUCapabilities | null>(null);
  const [detectionComplete, setDetectionComplete] = useState<boolean>(false);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('medium');
  const [neuralEngine, setNeuralEngine] = useState({
    available: false,
    estimatedCores: 0,
    optimizationLevel: 'minimal' as 'maximum' | 'balanced' | 'minimal'
  });

  // Run detection on client side
  useEffect(() => {
    if (typeof window === 'undefined') {
      setDetectionComplete(true);
      return;
    }

    async function detectCapabilities() {
      // STEP 1: Detect device type
      const userAgent = window.navigator.userAgent;
      const macDetected = userAgent.includes('Mac');
      setIsMac(macDetected);

      // STEP 2: Check for Apple Silicon with enhanced detection
      const siliconDetected =
        userAgent.includes('Apple Silicon') ||
        userAgent.includes('M1') ||
        userAgent.includes('M2') ||
        userAgent.includes('M3') ||
        userAgent.includes('M4') ||
        (macDetected && !userAgent.includes('Intel'));
      setIsAppleSilicon(siliconDetected);

      // STEP 3: Enhanced Neural Engine detection
      if (siliconDetected) {
        // Detect specific M-series chip
        let estimatedCores = 16; // M4 Pro baseline
        let optimizationLevel: 'maximum' | 'balanced' | 'minimal' = 'balanced';

        if (userAgent.includes('M4')) {
          estimatedCores = 38; // M4 Max Neural Engine cores
          optimizationLevel = 'maximum';
        } else if (userAgent.includes('M3')) {
          estimatedCores = 18;
          optimizationLevel = 'balanced';
        } else if (userAgent.includes('M2')) {
          estimatedCores = 16;
          optimizationLevel = 'balanced';
        } else if (userAgent.includes('M1')) {
          estimatedCores = 16;
          optimizationLevel = 'minimal';
        }

        setNeuralEngine({
          available: estimatedCores >= minNeuralCores,
          estimatedCores,
          optimizationLevel
        });
      }

      // STEP 4: Check GPU capabilities if requested
      if (checkGPU) {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

          if (gl && 'getExtension' in gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null;

            // Check for Metal-based rendering
            const isMetalBased = Boolean(renderer && (
              renderer.includes('Apple') ||
              renderer.includes('Metal') ||
              renderer.includes('M1') ||
              renderer.includes('M2') ||
              renderer.includes('M3') ||
              renderer.includes('M4')
            ));

            // Detect Neural Engine support through Metal
            const neuralEngineAvailable = isMetalBased && siliconDetected;

            // Get additional capabilities
            const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            const supportedExtensions = gl.getSupportedExtensions() || [];

            setGpuCapabilities({
              renderer: renderer as string | null,
              isMetalBased,
              neuralEngineAvailable,
              maxTextureSize,
              supportedExtensions
            });

            // STEP 5: Strategic Director Performance Mode Recommendation
            if (enableStrategicDirector) {
              if (isMetalBased && neuralEngineAvailable && maxTextureSize >= 16384) {
                setPerformanceMode('high'); // Full quantum-spatial effects
              } else if (isMetalBased && maxTextureSize >= 8192) {
                setPerformanceMode('medium'); // Balanced visual experience
              } else {
                setPerformanceMode('low'); // Heritage state optimized
              }
            }
          }
        } catch (err) {
          console.warn('Error detecting GPU capabilities:', err);
        }
      }

      setDetectionComplete(true);
    }

    detectCapabilities();
  }, [checkGPU, enableStrategicDirector, minNeuralCores]);

  // Determine overall M4 capability with Strategic Director logic
  const isM4Capable = detectionComplete && (
    isAppleSilicon && (
      !checkGPU ||
      (gpuCapabilities?.isMetalBased && gpuCapabilities?.neuralEngineAvailable) ||
      fallbackToSilicon
    )
  );

  return {
    isM4Capable,
    isAppleSilicon,
    isMac,
    gpuCapabilities,
    detectionComplete,
    performanceMode,
    neuralEngine
  };
}

export default useM4Detection;
