import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";

// Create context for design system
interface QuantumSpatialContextType {
  tokens: any;
  designState: string;
  setDesignState: (state: string) => void;
  deviceInfo: DeviceInfoType;
  isLoading: boolean;
}

interface DeviceInfoType {
  platform?: string;
  isMac?: boolean;
  isAppleSilicon?: boolean;
  cpuCores?: number;
  isM4Detected: boolean;
  isM4Pro?: boolean;
  isM4Max?: boolean;
  isM4Ultra?: boolean;
  recommendedState?: string;
  renderQuality?: string;
}

const QuantumSpatialContext = createContext<QuantumSpatialContextType | null>(null);

// Provider component props
interface ProviderProps {
  children: React.ReactNode;
  autoDetect?: boolean;
  initialState?: string;
  workerUrl?: string;
  fallbackUrl?: string;
}

// Provider component
export function QuantumSpatialProvider({
  children,
  autoDetect = true,
  initialState = "quantum",
  workerUrl = "https://design-system.9bitstudios.io",
  fallbackUrl = "https://quantum-spatial-design-system.9bitstudios.workers.dev"
}: ProviderProps) {
  // State for design tokens and system state
  const [tokens, setTokens] = useState<any>({});
  const [designState, setDesignState] = useState<string>(initialState);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>({
    isM4Detected: false,
    platform: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Detect device capabilities
  useEffect(() => {
    if (autoDetect) {
      detectDeviceCapabilities().then(info => {
        setDeviceInfo(info);
        
        // Auto-select recommended state for M4 devices
        if (info.isM4Detected) {
          setDesignState(info.recommendedState || "superposition");
        }
      });
    }
  }, [autoDetect]);

  // Fetch design tokens when state changes
  useEffect(() => {
    fetchDesignTokens(designState, workerUrl, fallbackUrl)
      .then(tokens => {
        setTokens(tokens);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching design tokens:", error);
        setIsLoading(false);
      });
  }, [designState, workerUrl, fallbackUrl]);

  // Context value
  const contextValue = {
    tokens,
    designState,
    setDesignState,
    deviceInfo,
    isLoading
  };

  return (
    <QuantumSpatialContext.Provider value={contextValue}>
      {children}
    </QuantumSpatialContext.Provider>
  );
}

// Hook for accessing design system
export function useQuantumSpatial() {
  const context = useContext(QuantumSpatialContext);
  if (!context) {
    throw new Error("useQuantumSpatial must be used within a QuantumSpatialProvider");
  }
  return context;
}

// Detect device capabilities
async function detectDeviceCapabilities(): Promise<DeviceInfoType> {
  // Basic detection for demo purposes
  const isMac = navigator.userAgent.includes("Mac");
  const isAppleSilicon = isMac && !navigator.userAgent.includes("Intel");
  const cpuCores = navigator.hardwareConcurrency || 1;
  
  // Simple heuristic for M4 detection (not reliable in production)
  const isM4 = isAppleSilicon && cpuCores >= 8;
  
  return {
    platform: navigator.platform,
    isMac,
    isAppleSilicon,
    cpuCores,
    isM4Detected: isM4,
    isM4Pro: isM4 && cpuCores >= 10,
    isM4Max: isM4 && cpuCores >= 12,
    isM4Ultra: isM4 && cpuCores >= 16,
    recommendedState: isM4 ? "superposition" : "quantum",
    renderQuality: isM4 ? "high" : "standard"
  };
}

// Fetch design tokens
async function fetchDesignTokens(state: string, primaryUrl: string, fallbackUrl: string) {
  try {
    // Try primary worker URL
    const response = await fetch(`${primaryUrl}/design-system/tokens?state=${state}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching tokens from primary URL: ${error}`);
    
    try {
      // Try fallback URL
      const fallbackResponse = await fetch(`${fallbackUrl}/tokens/${state}`);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback failed: ${fallbackResponse.status}`);
      }
      
      return await fallbackResponse.json();
    } catch (fallbackError) {
      console.error(`Error fetching tokens from fallback: ${fallbackError}`);
      
      // Return default tokens
      return getFallbackTokens(state);
    }
  }
}

// Fallback tokens
function getFallbackTokens(state: string) {
  // Default tokens for different states
  const FALLBACK_TOKENS: {[key: string]: any} = {
    heritage: {
      colors: {
        primary: "#131A36",
        secondary: "#666666",
        accent: "#888888",
        surface: "#F5F5F5",
        text: "#333333",
        background: "#FFFFFF"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px"
      },
      typography: {
        fontFamily: "SF Pro Display, system-ui, sans-serif",
        sizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "24px",
          xxl: "32px"
        }
      }
    },
    transitional: {
      colors: {
        primary: "#131A36",
        secondary: "#331F4A",
        accent: "#5AC8FA",
        surface: "#F8F9FA",
        text: "#2D3748",
        background: "#FFFFFF"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px"
      },
      typography: {
        fontFamily: "SF Pro Display, system-ui, sans-serif",
        sizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "24px",
          xxl: "32px"
        }
      }
    },
    quantum: {
      colors: {
        primary: "#6A3093",
        secondary: "#BF4080",
        accent: "#5AC8FA",
        surface: "#0A0621",
        text: "#FFFFFF",
        background: "#0D0D15",
        rose: "#BF4080",
        teal: "#126D71"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px"
      },
      typography: {
        fontFamily: "SF Pro Display, system-ui, sans-serif",
        sizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "24px",
          xxl: "32px"
        }
      }
    },
    superposition: {
      colors: {
        primary: "#6A3093",
        secondary: "#BF4080",
        accent: "#5AC8FA",
        surface: "#0A0621",
        text: "#FFFFFF",
        background: "#0D0D15",
        rose: "#BF4080",
        teal: "#126D71",
        quantum: "#6A3093"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px"
      },
      typography: {
        fontFamily: "SF Pro Display, system-ui, sans-serif",
        sizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "24px",
          xxl: "32px"
        }
      }
    }
  };
  
  return FALLBACK_TOKENS[state] || FALLBACK_TOKENS.quantum;
}