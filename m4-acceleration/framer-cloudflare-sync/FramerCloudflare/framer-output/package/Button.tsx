import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useQuantumSpatial } from "./QuantumSpatialProvider"

/**
 * Quantum-Spatial button component with M4 optimizations
 * Generated automatically from Cloudflare Worker
 */
export function Button(props) {
  const { tokens, designState, deviceInfo } = useQuantumSpatial();
  
  const { 
    text = "Button", 
    variant = "primary", 
    size = "md", 
    disabled = false, 
    onClick, 
    width = "auto",
    height = "auto", 
    ...rest 
  } = props;
  
  // Define styles based on variant and size
  const getBackgroundColor = () => {
    if (!tokens.colors) return getDefaultColor();
    
    switch (variant) {
      case "primary": return tokens.colors.primary;
      case "secondary": return tokens.colors.secondary;
      case "accent": return tokens.colors.accent;
      default: return tokens.colors.primary;
    }
  };
  
  const getDefaultColor = () => {
    switch (variant) {
      case "primary": return "#6A3093";
      case "secondary": return "#BF4080";
      case "accent": return "#5AC8FA";
      default: return "#6A3093";
    }
  };
  
  const getPadding = () => {
    const spacingTokens = tokens.spacing?.scale || tokens.spacing;
    
    if (!spacingTokens) {
      // Fallback values
      switch (size) {
        case "xs": return "4px 8px";
        case "sm": return "6px 12px";
        case "md": return "8px 16px";
        case "lg": return "12px 24px";
        case "xl": return "16px 32px";
        default: return "8px 16px";
      }
    }
    
    switch (size) {
      case "xs": return `${spacingTokens.xs} ${spacingTokens.sm}`;
      case "sm": return `${spacingTokens.xs} ${spacingTokens.md}`;
      case "md": return `${spacingTokens.sm} ${spacingTokens.md}`;
      case "lg": return `${spacingTokens.md} ${spacingTokens.lg}`;
      case "xl": return `${spacingTokens.md} ${spacingTokens.xl}`;
      default: return `${spacingTokens.sm} ${spacingTokens.md}`;
    }
  };
  
  const getFontSize = () => {
    const typoTokens = tokens.typography?.sizes;
    
    if (!typoTokens) {
      // Fallback values
      switch (size) {
        case "xs": return "12px";
        case "sm": return "14px";
        case "md": return "16px";
        case "lg": return "18px";
        case "xl": return "20px";
        default: return "16px";
      }
    }
    
    switch (size) {
      case "xs": return typoTokens.xs;
      case "sm": return typoTokens.sm;
      case "md": return typoTokens.md;
      case "lg": return typoTokens.lg;
      case "xl": return typoTokens.xl;
      default: return typoTokens.md;
    }
  };
  
  // Use enhanced effects for M4 devices in superposition state
  const useEnhancedEffects = deviceInfo.isM4Detected && designState === "superposition";
  
  const buttonStyle = {
    backgroundColor: getBackgroundColor(),
    color: tokens.colors?.text || "white",
    border: "none",
    padding: getPadding(),
    borderRadius: tokens.borderRadius?.md || "8px",
    fontSize: getFontSize(),
    fontFamily: tokens.typography?.fontFamily || "SF Pro Display, system-ui, sans-serif",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: width,
    height: height,
    boxShadow: useEnhancedEffects 
      ? "0 8px 24px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.2)"
      : "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease-in-out"
  };
  
  // Enhanced hover and tap animations for M4 devices
  const hoverAnimation = useEnhancedEffects
    ? { 
        scale: 1.05, 
        boxShadow: "0 12px 32px rgba(0,0,0,0.4), 0 0 24px rgba(90, 200, 250, 0.3)",
        y: -3
      }
    : { 
        scale: 1.02, 
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)"
      };
      
  const tapAnimation = useEnhancedEffects
    ? { scale: 0.97, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }
    : { scale: 0.98 };
  
  return (
    <motion.button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : hoverAnimation}
      whileTap={disabled ? {} : tapAnimation}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...rest}
    >
      {text}
    </motion.button>
  );
}

// Property controls
addPropertyControls(Button, {
  text: {
    type: ControlType.String,
    title: "Text",
    defaultValue: "Button"
  },
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["primary", "secondary", "accent"],
    defaultValue: "primary"
  },
  size: {
    type: ControlType.Enum,
    title: "Size",
    options: ["xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  disabled: {
    type: ControlType.Boolean,
    title: "Disabled",
    defaultValue: false
  },
  width: {
    type: ControlType.String,
    title: "Width",
    defaultValue: "auto"
  },
  height: {
    type: ControlType.String,
    title: "Height",
    defaultValue: "auto"
  }
});

export default Button