import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useQuantumSpatial } from "./QuantumSpatialProvider"

/**
 * Quantum-Spatial dashboard layout with M4 optimizations
 * Generated automatically from Cloudflare Worker
 */
export function DashboardLayout(props) {
  const { tokens, designState, deviceInfo } = useQuantumSpatial();
  
  const {
    title = "Dashboard",
    showSidebar = true,
    sidebarWidth = 240,
    headerHeight = 64,
    children,
    ...rest
  } = props;
  
  // Use enhanced effects for M4 devices in superposition state
  const useEnhancedEffects = deviceInfo.isM4Detected && designState === "superposition";
  
  // Get color tokens or use fallbacks
  const getColors = () => {
    if (!tokens.colors) {
      return {
        background: "#0D0D15",
        surface: "#0A0621",
        primary: "#6A3093",
        text: "#FFFFFF",
        accent: "#5AC8FA"
      };
    }
    
    return {
      background: tokens.colors.background,
      surface: tokens.colors.surface,
      primary: tokens.colors.primary,
      text: tokens.colors.text,
      accent: tokens.colors.accent
    };
  };
  
  const colors = getColors();
  
  // Header styling based on design state
  const getHeaderStyle = () => {
    switch (designState) {
      case "heritage":
        return {
          backgroundColor: colors.primary,
          borderBottom: "1px solid #DDDDDD"
        };
      case "transitional":
        return {
          backgroundColor: colors.primary,
          borderBottom: "1px solid rgba(0,0,0,0.1)"
        };
      case "quantum":
        return {
          backgroundColor: "#131A36",
          borderBottom: "1px solid rgba(90, 200, 250, 0.1)"
        };
      case "superposition":
        return {
          backgroundColor: "#131A36",
          borderBottom: "1px solid rgba(90, 200, 250, 0.2)",
          boxShadow: useEnhancedEffects ? "0 8px 24px rgba(0,0,0,0.3)" : "none"
        };
      default:
        return {
          backgroundColor: "#131A36",
          borderBottom: "1px solid rgba(90, 200, 250, 0.1)"
        };
    }
  };
  
  // Sidebar styling based on design state
  const getSidebarStyle = () => {
    switch (designState) {
      case "heritage":
        return {
          backgroundColor: "#F5F5F5",
          borderRight: "1px solid #DDDDDD"
        };
      case "transitional":
        return {
          backgroundColor: "#F8F9FA",
          borderRight: "1px solid rgba(0,0,0,0.1)"
        };
      case "quantum":
        return {
          backgroundColor: colors.surface,
          borderRight: "1px solid rgba(90, 200, 250, 0.1)"
        };
      case "superposition":
        return {
          backgroundColor: colors.surface,
          borderRight: "1px solid rgba(90, 200, 250, 0.2)",
          boxShadow: useEnhancedEffects ? "inset -8px 0 24px rgba(0,0,0,0.3)" : "none"
        };
      default:
        return {
          backgroundColor: colors.surface,
          borderRight: "1px solid rgba(90, 200, 250, 0.1)"
        };
    }
  };
  
  // Nav item styling
  const getNavItemStyle = (isActive) => {
    const baseStyle = {
      color: isActive ? colors.accent : colors.text,
      textDecoration: "none",
      fontWeight: isActive ? "bold" : "normal",
      display: "block",
      padding: "8px 16px",
      borderRadius: "8px",
      marginBottom: "8px",
      transition: "all 0.2s ease"
    };
    
    if (isActive) {
      return {
        ...baseStyle,
        backgroundColor: `rgba(${colors.accent.replace(/^#/, '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1)`
      };
    }
    
    return baseStyle;
  };
  
  // Layout animations for M4 devices
  const itemVariants = useEnhancedEffects ? {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  } : {};
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: tokens.typography?.fontFamily || "SF Pro Display, system-ui, sans-serif"
      }}
      {...rest}
    >
      <motion.header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: `${headerHeight}px`,
          padding: "0 24px",
          ...getHeaderStyle()
        }}
        initial={useEnhancedEffects ? { y: -20, opacity: 0 } : {}}
        animate={useEnhancedEffects ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h1 style={{ 
          fontSize: "18px", 
          fontWeight: 600,
          margin: 0
        }}>
          {title}
        </h1>
        
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "16px",
          backgroundColor: "rgba(255,255,255,0.1)"
        }} />
      </motion.header>
      
      <div style={{ 
        display: "flex", 
        flex: 1,
        overflow: "hidden"
      }}>
        {showSidebar && (
          <motion.aside
            style={{
              width: `${sidebarWidth}px`,
              padding: "16px",
              overflow: "auto",
              ...getSidebarStyle()
            }}
            initial={useEnhancedEffects ? { x: -sidebarWidth, opacity: 0 } : {}}
            animate={useEnhancedEffects ? { x: 0, opacity: 1 } : {}}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              delay: 0.2
            }}
          >
            <nav style={{ marginTop: "24px" }}>
              <motion.div
                custom={0}
                variants={itemVariants}
                initial={useEnhancedEffects ? "hidden" : {}}
                animate={useEnhancedEffects ? "visible" : {}}
              >
                <a href="#" style={getNavItemStyle(true)}>
                  Dashboard
                </a>
              </motion.div>
              
              <motion.div
                custom={1}
                variants={itemVariants}
                initial={useEnhancedEffects ? "hidden" : {}}
                animate={useEnhancedEffects ? "visible" : {}}
              >
                <a href="#" style={getNavItemStyle(false)}>
                  Projects
                </a>
              </motion.div>
              
              <motion.div
                custom={2}
                variants={itemVariants}
                initial={useEnhancedEffects ? "hidden" : {}}
                animate={useEnhancedEffects ? "visible" : {}}
              >
                <a href="#" style={getNavItemStyle(false)}>
                  Settings
                </a>
              </motion.div>
            </nav>
          </motion.aside>
        )}
        
        <motion.main
          style={{
            flex: 1,
            padding: "24px",
            overflow: "auto"
          }}
          initial={useEnhancedEffects ? { opacity: 0 } : {}}
          animate={useEnhancedEffects ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

// Property controls
addPropertyControls(DashboardLayout, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Dashboard"
  },
  showSidebar: {
    type: ControlType.Boolean,
    title: "Show Sidebar",
    defaultValue: true
  },
  sidebarWidth: {
    type: ControlType.Number,
    title: "Sidebar Width",
    defaultValue: 240,
    min: 120,
    max: 400,
    step: 10,
    displayStepper: true,
    hidden(props) { return !props.showSidebar }
  },
  headerHeight: {
    type: ControlType.Number,
    title: "Header Height",
    defaultValue: 64,
    min: 40,
    max: 120,
    step: 4,
    displayStepper: true
  },
  children: {
    type: ControlType.ComponentInstance,
    title: "Content"
  }
});

export default DashboardLayout