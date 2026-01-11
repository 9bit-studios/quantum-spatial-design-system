/**
 * Quantum-Spatial Button Component
 * 
 * A customizable button component that adapts to the current design state
 * and automatically applies M4 optimizations when available.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useQuantumSpatial } from "../quantum-spatial-auto-importer";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary" | "accent" | "rose" | "teal";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  width: number | string;
  disabled: boolean;
  onClick?: () => void;
}

export function Button({
  text = "Button",
  variant = "primary",
  size = "md",
  width = "auto",
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  // Access design system context
  const { tokens, designState, deviceInfo } = useQuantumSpatial();
  
  // Apply M4 optimizations if device supports them
  const useM4Features = deviceInfo?.isM4Detected || false;
  
  // Early fallback if tokens aren't loaded
  if (!tokens) {
    return (
      <button
        style={{
          backgroundColor: "#5AC8FA",
          color: "#FFFFFF",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          width: typeof width === "number" ? `${width}px` : width
        }}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }

  // Choose colors based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case "primary": return tokens.colors.primary;
      case "secondary": return tokens.colors.secondary;
      case "accent": return tokens.colors.accent;
      case "rose": return tokens.colors.rose || "#BF4080";
      case "teal": return tokens.colors.teal || "#126D71";
      default: return tokens.colors.primary;
    }
  };

  // Get text color with proper contrast
  const getTextColor = () => {
    // Simple implementation - should be enhanced with actual contrast checking
    return "#FFFFFF";
  };

  // Get padding based on size
  const getPadding = () => {
    const spacingMap = {
      xs: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      sm: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      md: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
      lg: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      xl: `${tokens.spacing.md} ${tokens.spacing.xl}`
    };
    return spacingMap[size] || spacingMap.md;
  };

  // Get font size based on size
  const getFontSize = () => {
    return tokens.typography.sizes?.[size] || "16px";
  };

  // Enhanced button style with proper states
  const buttonStyle = {
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    border: "none",
    padding: getPadding(),
    borderRadius: "8px",
    fontSize: getFontSize(),
    fontFamily: tokens.typography.fontFamily,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: typeof width === "number" ? `${width}px` : width,
    boxShadow: designState === "heritage" 
      ? "none" 
      : useM4Features && designState === "superposition"
        ? "0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.2)"
        : "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease"
  };
  
  // Apply M4 optimizations if available
  const m4Motion = {
    whileHover: useM4Features ? { 
      scale: 1.05,
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.4)"
    } : { scale: 1.02 },
    whileTap: useM4Features ? { 
      scale: 0.95,
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    } : { scale: 0.98 }
  };

  // Render the button
  return (
    <motion.button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...(disabled ? {} : m4Motion)}
      {...props}
    >
      {text}
    </motion.button>
  );
}

// Framer property controls
addPropertyControls(Button, {
  text: {
    type: ControlType.String,
    title: "Text",
    defaultValue: "Button"
  },
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["primary", "secondary", "accent", "rose", "teal"],
    defaultValue: "primary"
  },
  size: {
    type: ControlType.Enum,
    title: "Size",
    options: ["xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  width: {
    type: ControlType.NumberOrString,
    title: "Width",
    defaultValue: "auto"
  },
  disabled: {
    type: ControlType.Boolean,
    title: "Disabled",
    defaultValue: false
  }
});

export default Button;