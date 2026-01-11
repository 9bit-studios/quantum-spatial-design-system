/**
 * Quantum-Spatial Design System Provider for Framer
 * Enhanced Cloud Implementation (May 19, 2025)
 * 
 * This component provides design tokens for the Quantum-Spatial Design System
 * by fetching them directly from the Cloudflare Worker API.
 */

import * as React from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

// Cloudflare Worker URL - Will be updated by deployment script
const WORKER_URL = "https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev";

// Fallback token import (used if API fails)
// Note: In Framer, you'll need to import these files manually
import transitionalTokens from "./transitional-framer.json";

// Design system context type
interface DesignSystemContextType {
  state: string;
  setState: (state: string) => void;
  tokens: any;
  isLoading: boolean;
  error: string | null;
}

// Create context
const DesignSystemContext = createContext<DesignSystemContextType>({
  state: "transitional",
  setState: () => {},
  tokens: null,
  isLoading: false,
  error: null
});

// Provider props
interface DesignSystemProviderProps {
  children: React.ReactNode;
  initialState?: "heritage" | "transitional" | "quantum" | "superposition";
  showLoadingState?: boolean;
}

/**
 * Design System Provider Component
 * Fetches design tokens from Cloudflare Worker API
 */
export function DesignSystemProvider({
  children,
  initialState = "transitional",
  showLoadingState = true
}: DesignSystemProviderProps) {
  // State
  const [state, setState] = useState<string>(initialState);
  const [tokens, setTokens] = useState<any>(transitionalTokens);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch tokens from API
  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${WORKER_URL}/design-system/tokens?state=${state}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch design tokens: ${response.status}`);
        }
        
        const data = await response.json();
        setTokens(data);
        
        // Apply CSS variables
        applyTokensToCSS(data);
        
      } catch (err) {
        console.error("Error fetching design tokens:", err);
        setError(err.message);
        // Fall back to embedded tokens
        if (state === "transitional") {
          setTokens(transitionalTokens);
          applyTokensToCSS(transitionalTokens);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTokens();
  }, [state]);
  
  // Apply tokens as CSS variables
  function applyTokensToCSS(designSystem) {
    if (!designSystem) return;
    
    const root = document.documentElement;
    
    // Apply colors
    if (designSystem.colors) {
      Object.entries(designSystem.colors).forEach(([key, value]) => {
        if (typeof value === "string") {
          root.style.setProperty(`--color-${key}`, value);
        } else if (typeof value === "object") {
          // Handle nested color objects (like light/dark variants)
          Object.entries(value).forEach(([subKey, subValue]) => {
            root.style.setProperty(`--color-${key}-${subKey}`, subValue);
          });
        }
      });
    }
    
    // Apply typography
    if (designSystem.typography) {
      root.style.setProperty(`--font-family`, designSystem.typography.fontFamily);
      
      // Base font size
      if (designSystem.typography.baseSize) {
        root.style.setProperty(`--font-size-base`, designSystem.typography.baseSize);
      }
      
      // Headings
      if (designSystem.typography.headings) {
        Object.entries(designSystem.typography.headings).forEach(([key, value]) => {
          if (typeof value === "object") {
            root.style.setProperty(`--font-size-${key}`, value.fontSize);
            root.style.setProperty(`--font-weight-${key}`, value.fontWeight);
            root.style.setProperty(`--line-height-${key}`, value.lineHeight);
          }
        });
      }
      
      // Body styles
      if (designSystem.typography.body) {
        Object.entries(designSystem.typography.body).forEach(([key, value]) => {
          if (typeof value === "object") {
            root.style.setProperty(`--font-size-body-${key}`, value.fontSize);
            root.style.setProperty(`--font-weight-body-${key}`, value.fontWeight);
            root.style.setProperty(`--line-height-body-${key}`, value.lineHeight);
          }
        });
      }
    }
    
    // Apply spacing
    if (designSystem.spacing && designSystem.spacing.scale) {
      Object.entries(designSystem.spacing.scale).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }
    
    // Apply border radius
    if (designSystem.borderRadius) {
      Object.entries(designSystem.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
    }
    
    // Apply shadows
    if (designSystem.shadows) {
      Object.entries(designSystem.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
      });
    }
    
    // Apply motion
    if (designSystem.motion) {
      // Durations
      if (designSystem.motion.duration) {
        Object.entries(designSystem.motion.duration).forEach(([key, value]) => {
          root.style.setProperty(`--duration-${key}`, value);
        });
      }
      
      // Easing functions
      if (designSystem.motion.easing) {
        Object.entries(designSystem.motion.easing).forEach(([key, value]) => {
          root.style.setProperty(`--easing-${key}`, value);
        });
      }
    }
    
    // Apply M4 optimizations if applicable
    if (designSystem.m4) {
      Object.entries(designSystem.m4).forEach(([category, values]) => {
        if (typeof values === "object") {
          Object.entries(values).forEach(([key, value]) => {
            root.style.setProperty(`--m4-${category}-${key}`, value);
          });
        }
      });
    }
  }
  
  // Check for M4 capabilities
  useEffect(() => {
    // Simple detection for Apple Silicon M-series chips
    const userAgent = navigator.userAgent;
    const isMac = userAgent.includes('Mac');
    const isSiliconMac = userAgent.includes('Apple Silicon') || 
                       (isMac && !userAgent.includes('Intel'));
    
    if (isSiliconMac) {
      fetch(`${WORKER_URL}/m4-optimization?state=${state}`)
          .then(response => response.json())
          .then(data => {
              console.log("M4 optimizations:", data);
              // Apply M4-specific optimizations
              if (data && typeof data === "object") {
                  const root = document.documentElement;
                  Object.entries(data).forEach(([key, value]) => {
                      root.style.setProperty(`--m4-${key}`, value);
                  });
                  root.dataset.m4Compatible = "true";
              }
          })
          .catch(error => console.error("Error fetching M4 optimizations:", error));
    }
  }, [state]);
  
  // Animation variants
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Loading indicator
  if (isLoading && showLoadingState) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#131A36",
          color: "#5AC8FA",
          fontFamily: "SF Pro, system-ui, sans-serif",
          fontSize: "16px"
        }}
      >
        <div>
          <h3>Loading Quantum-Spatial Design System...</h3>
          <p>State: {state}</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error && showLoadingState) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#131A36",
          color: "#FF3D00",
          fontFamily: "SF Pro, system-ui, sans-serif",
          fontSize: "16px"
        }}
      >
        <div>
          <h3>Error Loading Design System</h3>
          <p>{error}</p>
          <button
            onClick={() => setState(state)} // Retry the current state
            style={{
              padding: "8px 16px",
              backgroundColor: "#5AC8FA",
              color: "#131A36",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "12px"
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <DesignSystemContext.Provider value={{ state, setState, tokens, isLoading, error }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`quantum-spatial-design-system state-${state}`}
          data-state={state}
          style={{ 
            width: "100%",
            height: "100%",
            "--design-system-state": state
          } as React.CSSProperties}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </DesignSystemContext.Provider>
  );
}

/**
 * Hook to use design system in components
 */
export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  
  if (!context) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider");
  }
  
  return context;
}

/**
 * Design System State Switcher Component
 */
export function DesignSystemStateSwitcher() {
  const { state, setState } = useDesignSystem();
  
  const states = [
    { id: "heritage", label: "Heritage" },
    { id: "transitional", label: "Transitional" },
    { id: "quantum", label: "Quantum" },
    { id: "superposition", label: "Superposition" }
  ];
  
  return (
    <div 
      className="quantum-spatial-state-switcher"
      style={{
        padding: "16px",
        backgroundColor: "var(--color-surface, #F8F9FA)",
        borderRadius: "var(--radius-medium, 8px)",
        boxShadow: "var(--shadow-small, 0 2px 4px rgba(0, 0, 0, 0.1))",
        fontFamily: "var(--font-family, 'SF Pro, system-ui, sans-serif')"
      }}
    >
      <h3 style={{ marginTop: 0, color: "var(--color-text, #121212)" }}>
        Design System State
      </h3>
      <div 
        className="state-options"
        style={{
          display: "flex",
          gap: "8px"
        }}
      >
        {states.map(s => (
          <button
            key={s.id}
            className={`state-option ${s.id === state ? "active" : ""}`}
            onClick={() => setState(s.id)}
            style={{
              padding: "8px 16px",
              backgroundColor: s.id === state ? "var(--color-primary, #131A36)" : "transparent",
              color: s.id === state ? "white" : "var(--color-text, #121212)",
              border: `1px solid ${s.id === state ? "var(--color-primary, #131A36)" : "var(--color-border, #E4E7EB)"}`,
              borderRadius: "var(--radius-small, 4px)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease"
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Add property controls for Framer
addPropertyControls(DesignSystemProvider, {
  initialState: {
    type: ControlType.Enum,
    title: "Initial State",
    options: ["heritage", "transitional", "quantum", "superposition"],
    defaultValue: "transitional",
  },
  showLoadingState: {
    type: ControlType.Boolean,
    title: "Show Loading State",
    defaultValue: true,
  },
  children: {
    type: ControlType.ComponentInstance,
    title: "Content",
  },
});

export default DesignSystemProvider;