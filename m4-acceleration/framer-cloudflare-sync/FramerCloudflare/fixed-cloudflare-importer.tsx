/**
 * Fixed Framer Cloudflare Auto-Importer
 * Handles undefined tokens gracefully with proper fallbacks
 */

import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useState, useEffect, createContext, useContext } from "react";

const DesignSystemContext = createContext(null);

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error("useDesignSystem must be used within CloudflareAutoImporter");
  }
  return context;
};

// Safe token accessor with fallbacks
const safeTokens = (tokens) => ({
  colors: tokens?.colors || {
    primary: "#131A36",
    secondary: "#331F4A", 
    accent: "#5AC8FA",
    surface: "#0A0621",
    text: "#FFFFFF",
    background: "#0D0D15"
  },
  spacing: tokens?.spacing || {
    xs: "4px",
    sm: "8px", 
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  typography: tokens?.typography || {
    fontFamily: "SF Pro Display",
    sizes: {
      xs: "12px",
      sm: "14px",
      md: "16px", 
      lg: "18px",
      xl: "24px",
      xxl: "32px"
    }
  }
});

export default function CloudflareAutoImporter(props) {
  const { 
    autoDetect = true,
    initialState = "quantum",
    children,
    // Updated to match your actual endpoint
    workerUrl = "https://design-system-staging.9bitstudios.io"
  } = props;

  const [rawTokens, setRawTokens] = useState(null);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Always use safe tokens
  const tokens = safeTokens(rawTokens);

  const fetchTokens = async (designState) => {
    try {
      console.log(`🔄 Fetching tokens for ${designState}...`);
      
      // Try your actual endpoint first
      const response = await fetch(`${workerUrl}/design-tokens/${designState}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ Fetched tokens:`, data);
      return data;
      
    } catch (err) {
      console.warn(`⚠️ Worker fetch failed: ${err.message}`);
      // Return null to use fallback tokens
      return null;
    }
  };

  const generateComponents = (tokens) => ({
    Button: ({ text = "Button", variant = "primary", onClick, style = {}, ...rest }) => (
      <motion.button
        style={{
          background: variant === "primary" 
            ? `linear-gradient(45deg, ${tokens.colors.accent}, ${tokens.colors.secondary})`
            : "transparent",
          color: tokens.colors.text,
          border: variant === "secondary" ? `1px solid ${tokens.colors.accent}` : "none",
          padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
          borderRadius: "8px",
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.sizes.md,
          cursor: "pointer",
          fontWeight: "600",
          ...style
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...rest}
      >
        {text}
      </motion.button>
    ),

    Card: ({ title, children, elevated = false, style = {}, ...rest }) => (
      <motion.div
        style={{
          background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.accent}30`,
          borderRadius: "12px",
          padding: tokens.spacing.lg,
          boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
          color: tokens.colors.text,
          ...style
        }}
        whileHover={{ y: elevated ? -2 : 0 }}
        {...rest}
      >
        {title && (
          <h3 style={{
            fontSize: tokens.typography.sizes.lg,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.accent,
            margin: "0 0 16px 0"
          }}>
            {title}
          </h3>
        )}
        <div>{children}</div>
      </motion.div>
    ),

    Grid: ({ columns = 3, gap = "lg", children, style = {}, ...rest }) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: tokens.spacing[gap] || tokens.spacing.lg,
          ...style
        }}
        {...rest}
      >
        {children}
      </div>
    )
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedTokens = await fetchTokens(state);
        setRawTokens(fetchedTokens);
        
        // Set CSS variables for styling
        const safeData = safeTokens(fetchedTokens);
        Object.entries(safeData.colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--color-${key}`, value);
        });
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [state, workerUrl]);

  const contextValue = {
    tokens,
    rawTokens,
    state,
    setState,
    loading,
    error,
    components: generateComponents(tokens)
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        background: "#0A0621",
        color: "#FFFFFF",
        fontFamily: "SF Pro Display",
        borderRadius: "8px"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: "24px",
            height: "24px",
            border: "2px solid #5AC8FA",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            marginRight: "12px"
          }}
        />
        Loading Design System...
      </div>
    );
  }

  return (
    <DesignSystemContext.Provider value={contextValue}>
      <div style={{ 
        fontFamily: tokens.typography.fontFamily,
        color: tokens.colors.text 
      }}>
        {error && (
          <div style={{
            padding: tokens.spacing.md,
            background: "#ff4444",
            color: "white",
            borderRadius: "4px",
            marginBottom: tokens.spacing.md,
            fontSize: "14px"
          }}>
            ⚠️ Using fallback tokens: {error}
          </div>
        )}
        {children}
      </div>
    </DesignSystemContext.Provider>
  );
}

// Demo component
export function DesignSystemDemo() {
  return (
    <CloudflareAutoImporter>
      <DemoContent />
    </CloudflareAutoImporter>
  );
}

function DemoContent() {
  const { tokens, state, setState, components, error, rawTokens } = useDesignSystem();
  const { Button, Card, Grid } = components;

  return (
    <div style={{ padding: tokens.spacing.lg }}>
      <Card title="Design System Status" elevated>
        <p>Current state: <strong>{state}</strong></p>
        <p>Tokens source: {rawTokens ? "Cloudflare Worker ✅" : "Fallback tokens ⚠️"}</p>
        {error && <p style={{color: "#ff6b6b"}}>Error: {error}</p>}
        
        <div style={{ marginTop: tokens.spacing.md }}>
          {["heritage", "transitional", "quantum", "superposition"].map(option => (
            <Button
              key={option}
              text={option}
              variant={state === option ? "primary" : "secondary"}
              onClick={() => setState(option)}
              style={{ marginRight: tokens.spacing.sm, marginBottom: tokens.spacing.sm }}
            />
          ))}
        </div>
      </Card>

      <div style={{ marginTop: tokens.spacing.lg }}>
        <Grid columns={2} gap="lg">
          <Card title="Colors" elevated>
            {Object.entries(tokens.colors).map(([key, value]) => (
              <div key={key} style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: tokens.spacing.sm 
              }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  background: value,
                  borderRadius: "4px",
                  marginRight: tokens.spacing.sm,
                  border: "1px solid rgba(255,255,255,0.2)"
                }} />
                <span style={{ fontSize: "14px" }}>{key}: {value}</span>
              </div>
            ))}
          </Card>
          
          <Card title="Components" elevated>
            <Button text="Primary Button" variant="primary" style={{marginBottom: tokens.spacing.sm}} />
            <Button text="Secondary Button" variant="secondary" />
          </Card>
        </Grid>
      </div>
    </div>
  );
}

addPropertyControls(CloudflareAutoImporter, {
  autoDetect: {
    type: ControlType.Boolean,
    defaultValue: true,
    title: "Auto-detect"
  },
  initialState: {
    type: ControlType.Enum,
    options: ["heritage", "transitional", "quantum", "superposition"],
    defaultValue: "quantum",
    title: "Design State"
  },
  workerUrl: {
    type: ControlType.String,
    defaultValue: "https://design-system-staging.9bitstudios.io",
    title: "Worker URL"
  }
});

addPropertyControls(DesignSystemDemo, {});