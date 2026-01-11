/**
 * Grid Layout Component
 * 
 * A flexible grid layout system that adapts to the current design state
 * and automatically applies M4 optimizations when available.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useQuantumSpatial } from "../quantum-spatial-auto-importer";

interface GridLayoutProps {
  columns: number;
  rows: number;
  columnGap: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  rowGap: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  padding: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  showGridLines: boolean;
  alignItems: "start" | "center" | "end" | "stretch";
  justifyContent: "start" | "center" | "end" | "stretch" | "space-between" | "space-around";
  backgroundColor?: string;
  borderColor?: string;
  borderWidth: number;
  borderRadius: number;
  withVolumetricGrid: boolean;
  width: number | string;
  height: number | string;
  children: React.ReactNode;
}

export function GridLayout({
  columns = 3,
  rows = 0, // 0 means auto-rows
  columnGap = "md",
  rowGap = "md",
  padding = "md",
  showGridLines = false,
  alignItems = "stretch",
  justifyContent = "stretch",
  backgroundColor = "",
  borderColor = "",
  borderWidth = 0,
  borderRadius = 0,
  withVolumetricGrid = true,
  width = "100%",
  height = "auto",
  children,
  ...props
}: GridLayoutProps) {
  // Access design system context
  const { tokens, designState, deviceInfo } = useQuantumSpatial();

  // Apply M4 optimizations if device supports them
  const useM4Features = deviceInfo?.isM4Detected || false;
  
  // Early fallback if tokens aren't loaded
  if (!tokens) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "16px",
          padding: "16px",
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height
        }}
      >
        {children}
      </div>
    );
  }

  // Get spacing value for gaps and padding
  const getSpacingValue = (size) => {
    if (size === "none") return "0px";
    return tokens.spacing[size] || tokens.spacing.md;
  };

  // Determine if we should show volumetric grid based on design state and device
  const showVolumetricGrid = 
    withVolumetricGrid && 
    useM4Features && 
    (designState === "quantum" || designState === "superposition");

  // Grid style
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: rows > 0 ? `repeat(${rows}, 1fr)` : "auto",
    columnGap: getSpacingValue(columnGap),
    rowGap: getSpacingValue(rowGap),
    padding: getSpacingValue(padding),
    alignItems,
    justifyContent,
    backgroundColor: backgroundColor || tokens.colors.background,
    border: borderWidth > 0 
      ? `${borderWidth}px solid ${borderColor || tokens.colors.accent}` 
      : "none",
    borderRadius: `${borderRadius}px`,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    position: "relative" as const
  };

  // Grid lines style
  const gridLinesStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(to right, ${tokens.colors.accent}15 1px, transparent 1px),
      linear-gradient(to bottom, ${tokens.colors.accent}15 1px, transparent 1px)
    `,
    backgroundSize: `calc(100% / ${columns}) 100%`,
    pointerEvents: "none" as const,
    zIndex: 0,
    opacity: designState === "heritage" ? 0.3 : 0.5
  };

  // Volumetric grid style (enhanced for M4 devices)
  const volumetricGridStyle = {
    position: "absolute" as const,
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    transform: "perspective(1000px) rotateX(60deg) rotateZ(-5deg)",
    transformStyle: "preserve-3d" as const,
    backgroundImage: `
      linear-gradient(to right, ${tokens.colors.accent}15 1px, transparent 1px),
      linear-gradient(to bottom, ${tokens.colors.accent}15 1px, transparent 1px)
    `,
    backgroundSize: `calc(100% / ${columns}) calc(100% / ${Math.max(rows, 4)})`,
    pointerEvents: "none" as const,
    zIndex: 0,
    opacity: 0.3,
    boxShadow: designState === "superposition" 
      ? `0 0 40px ${tokens.colors.accent}30` 
      : "none"
  };

  // Children container style (ensures content is above the grid)
  const contentStyle = {
    position: "relative" as const,
    zIndex: 1
  };

  return (
    <motion.div
      style={gridStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Grid lines */}
      {showGridLines && !showVolumetricGrid && (
        <div style={gridLinesStyle} />
      )}
      
      {/* Volumetric grid (M4-optimized devices only) */}
      {showVolumetricGrid && (
        <motion.div
          style={volumetricGridStyle}
          animate={{
            rotateZ: [-5, 5, -5],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
      
      {/* Grid content */}
      <div style={contentStyle}>
        {children}
      </div>
    </motion.div>
  );
}

// Framer property controls
addPropertyControls(GridLayout, {
  columns: {
    type: ControlType.Number,
    title: "Columns",
    defaultValue: 3,
    min: 1,
    max: 12,
    step: 1,
    displayStepper: true
  },
  rows: {
    type: ControlType.Number,
    title: "Rows",
    defaultValue: 0,
    min: 0,
    max: 12,
    step: 1,
    displayStepper: true,
    description: "0 means auto-rows"
  },
  columnGap: {
    type: ControlType.Enum,
    title: "Column Gap",
    options: ["none", "xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  rowGap: {
    type: ControlType.Enum,
    title: "Row Gap",
    options: ["none", "xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  padding: {
    type: ControlType.Enum,
    title: "Padding",
    options: ["none", "xs", "sm", "md", "lg", "xl"],
    defaultValue: "md"
  },
  showGridLines: {
    type: ControlType.Boolean,
    title: "Grid Lines",
    defaultValue: false
  },
  alignItems: {
    type: ControlType.Enum,
    title: "Align Items",
    options: ["start", "center", "end", "stretch"],
    defaultValue: "stretch"
  },
  justifyContent: {
    type: ControlType.Enum,
    title: "Justify Content",
    options: ["start", "center", "end", "stretch", "space-between", "space-around"],
    defaultValue: "stretch"
  },
  backgroundColor: {
    type: ControlType.Color,
    title: "Background Color",
    defaultValue: ""
  },
  borderColor: {
    type: ControlType.Color,
    title: "Border Color",
    defaultValue: ""
  },
  borderWidth: {
    type: ControlType.Number,
    title: "Border Width",
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
    displayStepper: true
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Border Radius",
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    displayStepper: true
  },
  withVolumetricGrid: {
    type: ControlType.Boolean,
    title: "Volumetric Grid",
    defaultValue: true,
    description: "Enhanced 3D grid for M4 devices"
  },
  width: {
    type: ControlType.NumberOrString,
    title: "Width",
    defaultValue: "100%"
  },
  height: {
    type: ControlType.NumberOrString,
    title: "Height",
    defaultValue: "auto"
  }
});

export default GridLayout;