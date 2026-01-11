/**
 * Dashboard Layout Component
 * 
 * A responsive application layout with header, optional sidebar, and main content area.
 * Automatically adapts to the current design state and device capabilities.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useQuantumSpatial } from "../quantum-spatial-auto-importer";

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  showSidebar: boolean;
  sidebarWidth: number;
  showHeader: boolean;
  headerHeight: number;
  primaryColor?: string;
  secondaryColor?: string;
  width: number | string;
  height: number | string;
  children: React.ReactNode;
}

export function DashboardLayout({
  title = "Dashboard",
  subtitle = "",
  showSidebar = true,
  sidebarWidth = 240,
  showHeader = true,
  headerHeight = 64,
  primaryColor,
  secondaryColor,
  width = "100%",
  height = "100%",
  children,
  ...props
}: DashboardLayoutProps) {
  // Access design system context
  const { tokens, designState, deviceInfo } = useQuantumSpatial();

  // Apply M4 optimizations if device supports them
  const useM4Features = deviceInfo?.isM4Detected || false;
  
  // Early fallback if tokens aren't loaded
  if (!tokens) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div style={{ padding: "16px" }}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {children}
        </div>
      </div>
    );
  }

  // Use custom colors or fall back to design system colors
  const headerColor = primaryColor || tokens.colors.primary;
  const sidebarColor = secondaryColor || tokens.colors.surface;
  
  // Header animations
  const headerAnimations = useM4Features ? {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3 }
  } : {};

  // Sidebar animations
  const sidebarAnimations = useM4Features ? {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4, delay: 0.1 }
  } : {};

  // Main content animations
  const contentAnimations = useM4Features ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.2 }
  } : {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        fontFamily: tokens.typography.fontFamily,
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        overflow: "hidden"
      }}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <motion.header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: `${headerHeight}px`,
            padding: `0 ${tokens.spacing.lg}`,
            backgroundColor: headerColor,
            color: "#FFFFFF",
            boxShadow: 
              designState === "heritage" 
                ? "0 1px 3px rgba(0,0,0,0.1)" 
                : "0 2px 10px rgba(0,0,0,0.15)"
          }}
          {...headerAnimations}
        >
          <div>
            <h1 style={{ 
              fontSize: tokens.typography.sizes?.lg || "18px", 
              margin: 0,
              fontWeight: 600
            }}>
              {title}
            </h1>
            {subtitle && (
              <div style={{ 
                fontSize: tokens.typography.sizes?.sm || "14px",
                opacity: 0.8
              }}>
                {subtitle}
              </div>
            )}
          </div>
          
          <div>
            {/* Placeholder for header actions */}
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)"
            }} />
          </div>
        </motion.header>
      )}
      
      <div style={{ 
        display: "flex", 
        flex: 1,
        overflow: "hidden"
      }}>
        {/* Sidebar */}
        {showSidebar && (
          <motion.aside
            style={{
              width: `${sidebarWidth}px`,
              padding: tokens.spacing.md,
              backgroundColor: sidebarColor,
              borderRight: `1px solid ${tokens.colors.accent}20`,
              overflow: "auto"
            }}
            {...sidebarAnimations}
          >
            <nav style={{ marginTop: tokens.spacing.lg }}>
              {/* Navigation items */}
              {["Dashboard", "Projects", "Analytics", "Settings"].map((item, index) => (
                <div key={item} style={{ marginBottom: tokens.spacing.md }}>
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                      borderRadius: "6px",
                      backgroundColor: index === 0 ? `${tokens.colors.accent}20` : "transparent",
                      color: index === 0 ? tokens.colors.accent : tokens.colors.text,
                      textDecoration: "none",
                      fontWeight: index === 0 ? 600 : 400,
                      transition: "all 0.2s ease"
                    }}
                  >
                    {/* Simplified icon placeholder */}
                    <div style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      backgroundColor: index === 0 ? tokens.colors.accent : `${tokens.colors.text}50`,
                      marginRight: tokens.spacing.sm
                    }} />
                    
                    <span>{item}</span>
                  </a>
                </div>
              ))}
            </nav>
            
            {/* Bottom section */}
            <div style={{ marginTop: "auto", padding: tokens.spacing.md }}>
              <div style={{
                padding: tokens.spacing.md,
                borderRadius: "8px",
                backgroundColor: `${tokens.colors.accent}10`,
                fontSize: tokens.typography.sizes?.sm
              }}>
                <div style={{ fontWeight: 600, marginBottom: tokens.spacing.xs }}>
                  Quantum-Spatial Design
                </div>
                <div style={{ opacity: 0.8 }}>
                  Current state: {designState}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
        
        {/* Main content area */}
        <motion.main
          style={{
            flex: 1,
            padding: tokens.spacing.lg,
            overflow: "auto"
          }}
          {...contentAnimations}
        >
          {/* Apply subtle grid background for quantum and superposition states */}
          {(designState === "quantum" || designState === "superposition") && useM4Features && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: showSidebar ? sidebarWidth : 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                backgroundImage: `
                  radial-gradient(${tokens.colors.accent}10 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
                opacity: 0.6,
                zIndex: 0
              }}
            />
          )}
          
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}

// Framer property controls
addPropertyControls(DashboardLayout, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Dashboard"
  },
  subtitle: {
    type: ControlType.String,
    title: "Subtitle",
    defaultValue: ""
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
  showHeader: {
    type: ControlType.Boolean,
    title: "Show Header",
    defaultValue: true
  },
  headerHeight: {
    type: ControlType.Number,
    title: "Header Height",
    defaultValue: 64,
    min: 40,
    max: 120,
    step: 4,
    displayStepper: true,
    hidden(props) { return !props.showHeader }
  },
  primaryColor: {
    type: ControlType.Color,
    title: "Primary Color",
    defaultValue: ""
  },
  secondaryColor: {
    type: ControlType.Color,
    title: "Secondary Color",
    defaultValue: ""
  },
  width: {
    type: ControlType.NumberOrString,
    title: "Width",
    defaultValue: "100%"
  },
  height: {
    type: ControlType.NumberOrString,
    title: "Height",
    defaultValue: "100%"
  }
});

export default DashboardLayout;