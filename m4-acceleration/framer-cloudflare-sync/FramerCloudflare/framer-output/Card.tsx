import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useQuantumSpatial } from "./QuantumSpatialProvider"

/**
 * Quantum-Spatial card component with M4 optimizations
 * Generated automatically from Cloudflare Worker
 */
export function Card(props) {
  const { tokens, designState, deviceInfo } = useQuantumSpatial();
  
  const { 
    title, 
    children, 
    elevated = false, 
    padding = "md", 
    width = "100%", 
    height = "auto", 
    ...rest 
  } = props;
  
  // Convert padding to pixels
  const getPadding = () => {
    const spacingTokens = tokens.spacing?.scale || tokens.spacing;
    
    if (!spacingTokens) {
      // Fallback values
      switch (padding) {
        case "xs": return "8px";
        case "sm": return "16px";
        case "md": return "24px";
        case "lg": return "32px";
        case "xl": return "48px";
        default: return "24px";
      }
    }
    
    switch (padding) {
      case "xs": return spacingTokens.xs;
      case "sm": return spacingTokens.sm;
      case "md": return spacingTokens.md;
      case "lg": return spacingTokens.lg;
      case "xl": return spacingTokens.xl;
      default: return spacingTokens.md;
    }
  };
  
  // Use enhanced effects for M4 devices in superposition state
  const useEnhancedEffects = deviceInfo.isM4Detected && designState === "superposition";
  
  // Adjust style based on design state
  const getBackgroundColor = () => {
    if (!tokens.colors) return "#0A0621";
    
    switch (designState) {
      case "heritage": return tokens.colors.surface || "#F5F5F5";
      case "transitional": return tokens.colors.surface || "#F8F9FA";
      case "quantum": 
      case "superposition":
        return tokens.colors.surface || "#0A0621";
      default: return tokens.colors.surface || "#0A0621";
    }
  };
  
  const getBoxShadow = () => {
    if (!elevated) {
      return tokens.shadows?.sm || "0 4px 16px rgba(0,0,0,0.15)";
    }
    
    if (useEnhancedEffects) {
      return "0 16px 48px rgba(0,0,0,0.4), 0 0 24px rgba(90, 200, 250, 0.2)";
    }
    
    switch (designState) {
      case "heritage": 
        return elevated ? "0 2px 4px rgba(0,0,0,0.1)" : "none";
      case "transitional": 
        return elevated ? "0 8px 16px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.05)";
      case "quantum": 
        return elevated 
          ? "0 16px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.2)"
          : "0 4px 16px rgba(0,0,0,0.15)";
      case "superposition": 
        return elevated 
          ? "0 24px 48px rgba(0,0,0,0.4), 0 0 24px rgba(90, 200, 250, 0.3)"
          : "0 8px 24px rgba(0,0,0,0.3), 0 0 12px rgba(90, 200, 250, 0.15)";
      default: 
        return elevated 
          ? "0 16px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.2)"
          : "0 4px 16px rgba(0,0,0,0.15)";
    }
  };
  
  const getBorderRadius = () => {
    if (!tokens.borderRadius) {
      switch (designState) {
        case "heritage": return "0px";
        case "transitional": return "8px";
        case "quantum": return "12px";
        case "superposition": return "16px";
        default: return "12px";
      }
    }
    
    switch (designState) {
      case "heritage": return tokens.borderRadius.sm;
      case "transitional": return tokens.borderRadius.md;
      case "quantum": return tokens.borderRadius.md;
      case "superposition": return tokens.borderRadius.lg;
      default: return tokens.borderRadius.md;
    }
  };
  
  const cardStyle = {
    backgroundColor: getBackgroundColor(),
    color: tokens.colors?.text || "#FFFFFF",
    padding: getPadding(),
    borderRadius: getBorderRadius(),
    boxShadow: getBoxShadow(),
    width: width,
    height: height,
    overflow: "hidden",
    transition: useEnhancedEffects ? "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : "all 0.3s ease-in-out"
  };
  
  // Enhanced hover animation for M4 devices
  const hoverAnimation = useEnhancedEffects
    ? { 
        y: -8, 
        boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 32px rgba(90, 200, 250, 0.3)"
      }
    : elevated 
      ? { y: -5 } 
      : {};
  
  const springTransition = { 
    type: "spring", 
    stiffness: useEnhancedEffects ? 250 : 300, 
    damping: useEnhancedEffects ? 20 : 30 
  };
  
  return (
    <motion.div
      style={cardStyle}
      whileHover={hoverAnimation}
      transition={springTransition}
      {...rest}
    >
      {title && (
        <h3 style={{
          fontSize: tokens.typography?.sizes?.lg || "18px",
          marginTop: 0,
          marginBottom: tokens.spacing?.md || "16px",
          color: tokens.colors?.accent || "#5AC8FA"
        }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
    </motion.div>
  );
}

// Property controls
addPropertyControls(Card, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: ""
  },
  elevated: {
    type: ControlType.Boolean,
    title: "Elevated",
    defaultValue: false
  },
  padding: {
    type: ControlType.Enum,
    title: "Padding",
    options: ["xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  width: {
    type: ControlType.String,
    title: "Width",
    defaultValue: "100%"
  },
  height: {
    type: ControlType.String,
    title: "Height",
    defaultValue: "auto"
  },
  children: {
    type: ControlType.ComponentInstance,
    title: "Content"
  }
});

export default Card