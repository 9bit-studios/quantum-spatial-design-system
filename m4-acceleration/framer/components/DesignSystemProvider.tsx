/**
 * Quantum-Spatial Design System Provider for Framer
 * 
 * This component provides the design system tokens and state management
 * for the Quantum-Spatial Design System in Framer.
 * 
 * It fetches design tokens from the Cloudflare Worker API and makes them
 * available to all children components through React Context.
 */

import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define types for design tokens
interface DesignTokens {
  colors: Record<string, string>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borders?: Record<string, any>;
  opacities?: Record<string, number>;
  easing?: Record<string, string>;
  durations?: Record<string, string>;
}

// Define types for design system context
interface DesignSystemContextType {
  tokens: DesignTokens | null;
  state: string;
  setState: (state: string) => void;
  isLoading: boolean;
  error: string | null;
}

// Create context
const DesignSystemContext = createContext<DesignSystemContextType>({
  tokens: null,
  state: "transitional",
  setState: () => {},
  isLoading: true,
  error: null,
});

// Cloud worker API endpoint
const API_ENDPOINT = "https://quantum-spatial-design-system.7082db633f378f09d2706f247a1a721d.workers.dev";

// Design system provider props
interface DesignSystemProviderProps {
  children: React.ReactNode;
  initialState?: string;
  cloudflareEndpoint?: string;
  projectId?: string;
}

/**
 * Design System Provider Component
 */
export function DesignSystemProvider({
  children,
  initialState = "transitional",
  cloudflareEndpoint = API_ENDPOINT,
  projectId = "2zdSRIm4V5ndhHJ2IUDw"
}: DesignSystemProviderProps) {
  // State
  const [tokens, setTokens] = useState<DesignTokens | null>(null);
  const [state, setState] = useState<string>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch tokens when state changes
  useEffect(() => {
    async function fetchTokens() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Construct URL with state and project ID
        const url = `${cloudflareEndpoint}/design-system/tokens?state=${state}&format=framer&projectId=${projectId}`;
        
        // Fetch tokens from API
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Framer-Project-ID": projectId
          }
        });
        
        // Check for errors
        if (!response.ok) {
          throw new Error(`Failed to fetch tokens: ${response.status} ${response.statusText}`);
        }
        
        // Parse response
        const data = await response.json();
        
        // Set tokens
        setTokens(data);
      } catch (err) {
        console.error("Error fetching design tokens:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch design tokens");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTokens();
  }, [state, cloudflareEndpoint, projectId]);
  
  // Animation variants for state transitions
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Apply CSS variables for direct usage in components
  useEffect(() => {
    if (!tokens) return;
    
    // Get root element
    const root = document.documentElement;
    
    // Clear existing variables
    const existingVars = Array.from(root.style)
      .filter(prop => prop.startsWith('--qs-'));
    
    existingVars.forEach(prop => {
      root.style.removeProperty(prop);
    });
    
    // Apply colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        root.style.setProperty(`--qs-color-${key}`, value);
      });
    }
    
    // Apply spacing
    if (tokens.spacing) {
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--qs-spacing-${key}`, value);
      });
    }
    
    // Apply shadows
    if (tokens.shadows) {
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--qs-shadow-${key}`, value);
      });
    }
    
    // Apply other token types if available
  }, [tokens]);
  
  return (
    <DesignSystemContext.Provider value={{ tokens, state, setState, isLoading, error }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          className={`quantum-spatial-design-system state-${state}`}
          data-state={state}
          data-loading={isLoading ? "true" : "false"}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {isLoading ? (
            <div className="quantum-spatial-loading">
              <div className="quantum-loader" />
              <p>Loading Quantum-Spatial Design System...</p>
            </div>
          ) : error ? (
            <div className="quantum-spatial-error">
              <p>Error loading design system: {error}</p>
            </div>
          ) : (
            children
          )}
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
 * State Switcher Component
 * Allows switching between design system states
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
    <div className="quantum-spatial-state-switcher">
      <h3>Design System State</h3>
      <div className="state-options">
        {states.map(s => (
          <button
            key={s.id}
            className={`state-option ${s.id === state ? "active" : ""}`}
            onClick={() => setState(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DesignSystemProvider;