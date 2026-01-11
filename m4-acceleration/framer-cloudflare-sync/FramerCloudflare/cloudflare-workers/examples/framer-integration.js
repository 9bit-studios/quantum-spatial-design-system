/**
 * 9Bit Studios - Quantum-Spatial Design System
 * Framer Integration Example with M4 Optimization
 *
 * This file demonstrates how to integrate the Cloudflare Worker
 * with a Framer project to access the M4-optimized Quantum-Spatial Design System.
 */

// Configuration
// Option 1: Custom Domain URLs (recommended)
const WORKER_URL = "https://design-system-staging.9bitstudios.io"; // Staging
// const WORKER_URL = "https://design-system.9bitstudios.io"; // Production

// Option 2: Direct Worker URLs (fallback)
// const WORKER_URL = "https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev"; // Staging
// const WORKER_URL = "https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev"; // Production

/**
 * Fetch design tokens for a specific state
 * @param {string} state - Design state ('heritage', 'transitional', 'quantum', or 'superposition')
 * @returns {Promise<Object>} Design tokens
 */
export async function fetchDesignTokens(state = 'transitional') {
  try {
    // Use the direct tokens endpoint for more consistent results
    const response = await fetch(
      `${WORKER_URL}/design-system/tokens?state=${state}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch design tokens: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching design tokens:', error);
    return null;
  }
}

/**
 * Fetch component definitions for a specific state
 * @param {string} state - Design state ('heritage', 'transitional', or 'quantum')
 * @returns {Promise<Array>} Component definitions
 */
export async function fetchComponents(state = 'transitional') {
  try {
    const response = await fetch(
      `${WORKER_URL}/design-system/framer-fetch?type=components&state=${state}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch components: ${response.status}`);
    }
    
    const data = await response.json();
    return data.components;
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
}

/**
 * Fetch design assets for a specific state
 * @param {string} state - Design state ('heritage', 'transitional', or 'quantum')
 * @returns {Promise<Array>} Asset information
 */
export async function fetchAssets(state = 'transitional') {
  try {
    const response = await fetch(
      `${WORKER_URL}/design-system/framer-fetch?type=assets&state=${state}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch assets: ${response.status}`);
    }
    
    const data = await response.json();
    return data.assets;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
}

/**
 * Detect if the current device is an Apple Silicon M4 device
 * @returns {Promise<Object>} Device information
 */
export async function detectM4Device() {
  try {
    const response = await fetch(`${WORKER_URL}/m4-optimization`);
    
    if (!response.ok) {
      throw new Error(`Failed to detect device: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error detecting device:', error);
    return {
      device: {
        isM4: false,
        isAppleSilicon: false,
        version: 'unknown',
        capabilities: {
          neuralEngine: false,
          metal: false,
          advancedShaders: false
        }
      }
    };
  }
}

/**
 * Get the optimal design state based on device capabilities
 * @returns {Promise<string>} Optimal design state
 */
export async function getOptimalDesignState() {
  const deviceInfo = await detectM4Device();
  
  if (deviceInfo.device?.isM4) {
    return 'superposition'; // M4-optimized state
  } else if (deviceInfo.device?.isAppleSilicon) {
    return 'quantum'; // Apple Silicon optimized
  } else {
    return 'transitional'; // Standard state for other devices
  }
}

/**
 * Apply design tokens to Framer variables
 * @param {Object} tokens - Design tokens object
 * @param {Function} setVariable - Framer's setVariable function
 */
export function applyDesignTokens(tokens, setVariable) {
  if (!tokens || !setVariable) return;
  
  // Apply color tokens
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([name, value]) => {
      // Handle nested color objects (like background.light, text.dark, etc)
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subName, subValue]) => {
          setVariable(`color-${name}-${subName}`, subValue);
        });
      } else {
        setVariable(`color-${name}`, value);
      }
    });
  }
  
  // Apply spacing tokens
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      if (name === 'scale' && typeof value === 'object') {
        Object.entries(value).forEach(([scaleName, scaleValue]) => {
          setVariable(`spacing-${scaleName}`, scaleValue);
        });
      } else {
        setVariable(`spacing-${name}`, value);
      }
    });
  }
  
  // Apply typography tokens
  if (tokens.typography) {
    Object.entries(tokens.typography).forEach(([name, value]) => {
      setVariable(`typography-${name}`, value);
    });
  }
  
  // Apply border radius tokens
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      setVariable(`radius-${name}`, value);
    });
  }
  
  // Apply M4 optimization tokens if available
  if (tokens.m4) {
    setVariable('m4-optimized', true);
    if (tokens.m4.optimizations) {
      setVariable('m4-renderQuality', tokens.m4.optimizations.renderQuality || 'standard');
    }
  } else {
    setVariable('m4-optimized', false);
  }
}

/**
 * Example usage in a Framer project
 */
// In your Framer project's code component:
/*
import { 
  fetchDesignTokens, 
  applyDesignTokens,
  detectM4Device,
  getOptimalDesignState
} from "./quantum-spatial-design-system";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Example Framer component using the M4-optimized design system
export function QuantumStateSwitch(props) {
  const { 
    initialState = "auto", // "auto" will detect optimal state based on device
    onStateChange, 
    width = 400,
    height = 100,
    ...rest 
  } = props;
  
  const [state, setState] = useState(initialState === "auto" ? "transitional" : initialState);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState(null);
  
  // Detect device and set optimal state on initial load
  useEffect(() => {
    if (initialState === "auto") {
      detectM4Device().then(info => {
        setDeviceInfo(info);
        // Set optimal state based on device capabilities
        getOptimalDesignState().then(optimalState => {
          setState(optimalState);
        });
      });
    }
  }, [initialState]);
  
  // Fetch tokens when state changes
  useEffect(() => {
    setIsLoading(true);
    fetchDesignTokens(state)
      .then(data => {
        setTokens(data);
        // Apply tokens to Framer variables
        if (data) {
          applyDesignTokens(data, props.setVariable);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error loading design tokens:", error);
        setIsLoading(false);
      });
  }, [state, props.setVariable]);
  
  const handleStateChange = (newState) => {
    setState(newState);
    if (onStateChange) {
      onStateChange(newState);
    }
  };
  
  // Get background based on state
  const getBackground = () => {
    if (!tokens?.colors) return "#131A36";
    
    if (state === "superposition" && tokens.colors.background?.gradient) {
      return tokens.colors.background.gradient;
    } else if (typeof tokens.colors.background === 'object') {
      return tokens.colors.background.light || "#FFFFFF";
    } else {
      return tokens.colors.background || "#FFFFFF";
    }
  };
  
  // Get text color based on state
  const getTextColor = () => {
    if (!tokens?.colors) return "#FFFFFF";
    
    if (typeof tokens.colors.text === 'object') {
      return tokens.colors.text.light || "#FFFFFF";
    } else {
      return tokens.colors.text || "#FFFFFF";
    }
  };
  
  // Render the component with the applied tokens
  return (
    <motion.div 
      style={{ 
        width, 
        height, 
        background: getBackground(),
        borderRadius: tokens?.borderRadius?.medium || 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        padding: 16,
        color: getTextColor(),
        boxShadow: state === "superposition" ? "0 8px 32px rgba(0, 0, 0, 0.15)" : "none"
      }}
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? (
        <div>Loading design system...</div>
      ) : (
        <>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%"
          }}>
            <motion.button 
              onClick={() => handleStateChange("heritage")}
              style={{ 
                background: state === "heritage" ? tokens.colors.primary : "transparent",
                border: `1px solid ${tokens.colors.primary}`,
                borderRadius: parseInt(tokens.borderRadius.small),
                padding: "8px 16px",
                color: getTextColor(),
                cursor: "pointer",
                fontSize: 14
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Heritage
            </motion.button>
            <motion.button 
              onClick={() => handleStateChange("transitional")}
              style={{ 
                background: state === "transitional" ? tokens.colors.primary : "transparent",
                border: `1px solid ${tokens.colors.primary}`,
                borderRadius: parseInt(tokens.borderRadius.small),
                padding: "8px 16px",
                color: getTextColor(),
                cursor: "pointer",
                fontSize: 14
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Transitional
            </motion.button>
            <motion.button 
              onClick={() => handleStateChange("quantum")}
              style={{ 
                background: state === "quantum" ? tokens.colors.primary : "transparent",
                border: `1px solid ${tokens.colors.primary}`,
                borderRadius: parseInt(tokens.borderRadius.small),
                padding: "8px 16px",
                color: getTextColor(),
                cursor: "pointer",
                fontSize: 14
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Quantum
            </motion.button>
            <motion.button 
              onClick={() => handleStateChange("superposition")}
              style={{ 
                background: state === "superposition" ? 
                  tokens.colors.vibrant || tokens.colors.primary : 
                  "transparent",
                border: `1px solid ${tokens.colors.vibrant || tokens.colors.primary}`,
                borderRadius: parseInt(tokens.borderRadius.small),
                padding: "8px 16px",
                color: getTextColor(),
                cursor: "pointer",
                fontSize: 14,
                boxShadow: state === "superposition" ? 
                  "0 0 12px rgba(255, 45, 85, 0.5)" : "none"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Superposition
            </motion.button>
          </div>
          
          {deviceInfo && (
            <div style={{ 
              marginTop: 12, 
              fontSize: 12, 
              opacity: 0.8,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <div style={{ 
                width: 8, 
                height: 8, 
                borderRadius: 4, 
                background: deviceInfo.device?.isM4 ? "#00D26A" : "#FFB800"
              }} />
              {deviceInfo.device?.isM4 ? 
                "M4 Device Detected - Superposition Enabled" : 
                deviceInfo.device?.isAppleSilicon ?
                "Apple Silicon Device - Quantum Optimized" :
                "Standard Device - Transitional Mode"
              }
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

// Example PixelViewer component
export function QuantumPixelViewer(props) {
  const {
    state = "transitional",
    columns = 8,
    rows = 6,
    showControls = true,
    m4Optimized = true,
    width = 400,
    height = 300,
    ...rest
  } = props;
  
  // Rest of implementation omitted for brevity
  // This component would use the Cloudflare Worker's PixelViewer endpoint
  // and would be enhanced with M4 optimizations when available
}
*/