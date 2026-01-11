# Universal Singularity Interface Core Component Collection

Status: Draft
Author: Penny Platt
Last edited time: April 30, 2025 11:52 PM
Review needed: No
AI custom autofill: Resource Category: DocumentationDoc Type: Project SpecificationResource Type: Core Component Collection
Is a Section: No
Overview: This document outlines the Universal Singularity Interface Core components, including their functionalities, implementation strategies, and interactive elements for quantum-spatial design systems.
Research Methods: Data Analysis, Insight Generation
Social Platforms: CreativeNetwork, TechForum

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

</aside>

Here are additional components that would round out your quantum-spatial design system:

## 1. Quantum Portal Navigation

```tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuantumPortalNavigation({ activePortal = "home", onPortalSelect }) {
  const portals = [
    { id: "home", name: "Universal Core", color: "#5AC8FA" },
    { id: "create", name: "Creative Nexus", color: "#BF4080" },
    { id: "explore", name: "Dimensional Explorer", color: "#6A3093" },
    { id: "connect", name: "Quantum Network", color: "#3D8B40" }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 p-6 rounded-xl relative overflow-hidden">
      {/* Dimensional Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <GridBackground />
      </div>

      <div className="relative z-10 flex space-x-2 md:space-x-4">
        {portals.map(portal => (
          <PortalButton
            key={portal.id}
            portal={portal}
            isActive={activePortal === portal.id}
            onClick={() => onPortalSelect(portal.id)}
          />
        ))}
      </div>
    </div>
  );
}

const PortalButton = ({ portal, isActive, onClick }) => {
  return (
    <motion.button
      className={`relative px-4 py-2 rounded-lg flex items-center justify-center overflow-hidden`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          background: isActive
            ? `linear-gradient(135deg, ${portal.color}33, ${portal.color}66)`
            : `linear-gradient(135deg, #131A3633, #131A3666)`
        }}
      />

      {/* Energy particles */}
      {isActive && (
        <div className="absolute inset-0 overflow-hidden">
          <EnergyParticles color={portal.color} />
        </div>
      )}

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isActive ? `0 0 8px 1px ${portal.color}66` : 'none'
        }}
      />

      {/* Text */}
      <span className={`relative z-10 font-medium text-sm md:text-base ${isActive ? 'text-white' : 'text-gray-400'}`}>
        {portal.name}
      </span>
    </motion.button>
  );
};

const GridBackground = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#5AC8FA" strokeWidth="0.2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};

const EnergyParticles = ({ color }) => {
  const particles = Array(10).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </>
  );
};

```

## 2. Dimensional Content Card

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DimensionalContentCard({
  title = "Quantum Theory",
  subtitle = "Exploring the foundation of reality",
  image = "/placeholder/400/300",
  state = "heritage", // heritage, transitional, quantum
  category = "knowledge", // knowledge, creation, exploration
  onClick
}) {
  const [hovered, setHovered] = useState(false);

  // Color mapping
  const colorMap = {
    knowledge: { primary: "#131A36", accent: "#5AC8FA" },
    creation: { primary: "#331F4A", accent: "#BF4080" },
    exploration: { primary: "#0D0D15", accent: "#6A3093" }
  };

  // State-based styling
  const stateStyles = {
    heritage: {
      borderRadius: "0px",
      boxShadow: "none",
      background: colorMap[category].primary
    },
    transitional: {
      borderRadius: "8px",
      boxShadow: `0 4px 12px ${colorMap[category].accent}33`,
      background: `linear-gradient(135deg, ${colorMap[category].primary}, ${colorMap[category].primary}cc)`
    },
    quantum: {
      borderRadius: "12px",
      boxShadow: `0 8px 24px ${colorMap[category].accent}66`,
      background: `linear-gradient(135deg, ${colorMap[category].primary}cc, ${colorMap[category].primary})`
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-sm overflow-hidden"
      style={{
        height: "320px",
        ...stateStyles[state]
      }}
      animate={{
        borderRadius: stateStyles[state].borderRadius,
        boxShadow: hovered
          ? `0 12px 28px ${colorMap[category].accent}88`
          : stateStyles[state].boxShadow,
        background: stateStyles[state].background
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <GridSystem />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Image area */}
        <div className="h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              filter: state === "heritage"
                ? "grayscale(20%) contrast(90%)"
                : state === "transitional"
                ? "grayscale(10%) contrast(100%)"
                : "grayscale(0%) contrast(110%)"
            }}
          />

          {/* Category indicator */}
          <div
            className="absolute top-3 right-3 px-2 py-1 text-xs font-medium"
            style={{
              background: colorMap[category].accent + "99",
              borderRadius: state === "heritage" ? "0px" : "4px"
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
          </div>

          {/* State indicator */}
          <div className="flex items-center mt-4">
            <div
              className="w-2 h-2 mr-2"
              style={{
                background: colorMap[category].accent,
                borderRadius: state === "heritage" ? "0px" : "full"
              }}
            />
            <span className="text-xs text-gray-400">
              {state.charAt(0).toUpperCase() + state.slice(1)} State
            </span>
          </div>
        </div>

        {/* Edge glow effect for quantum state */}
        {state === "quantum" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: hovered
                ? `inset 0 0 15px ${colorMap[category].accent}66`
                : `inset 0 0 8px ${colorMap[category].accent}33`
            }}
            style={{ borderRadius: "12px" }}
          />
        )}
      </div>
    </motion.div>
  );
}

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

```

## 3. Edge Computing Visualization

```tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EdgeComputingVisualization({
  nodes = 7,
  connectionDensity = 0.6,
  energyFlow = true,
  centralProcessingActive = true,
  height = 400
}) {
  // Generate nodes in a circle with a central node
  const generateNodes = (count) => {
    const nodeArray = [];

    // Central node
    nodeArray.push({
      id: 'central',
      x: 50,
      y: 50,
      type: 'core',
      size: 12
    });

    // Edge nodes in a circle
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 35;

      nodeArray.push({
        id: `node-${i}`,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        type: i % 3 === 0 ? 'processing' : i % 3 === 1 ? 'data' : 'input',
        size: 6 + Math.random() * 4
      });
    }

    return nodeArray;
  };

  // Generate connections between nodes
  const generateConnections = (nodeArray, density) => {
    const connections = [];

    // Connect all nodes to central
    for (let i = 1; i < nodeArray.length; i++) {
      connections.push({
        id: `central-${i}`,
        source: 'central',
        target: nodeArray[i].id,
        strength: 0.5 + Math.random() * 0.5
      });
    }

    // Connect some nodes to each other
    for (let i = 1; i < nodeArray.length; i++) {
      for (let j = i + 1; j < nodeArray.length; j++) {
        if (Math.random() < density) {
          connections.push({
            id: `${i}-${j}`,
            source: nodeArray[i].id,
            target: nodeArray[j].id,
            strength: Math.random() * 0.3
          });
        }
      }
    }

    return connections;
  };

  const nodeData = generateNodes(nodes);
  const connectionData = generateConnections(nodeData, connectionDensity);

  // Color mapping by node type
  const nodeColors = {
    core: { fill: "#6A3093", stroke: "#BF4080" },
    processing: { fill: "#131A36", stroke: "#5AC8FA" },
    data: { fill: "#331F4A", stroke: "#FF2D55" },
    input: { fill: "#0D0D15", stroke: "#29B6F6" }
  };

  return (
    <div className="w-full relative overflow-hidden bg-gray-900 rounded-xl" style={{ height }}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <GridSystem />
      </div>

      {/* Edge Computing Visualization */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {connectionData.map(conn => {
          const source = nodeData.find(n => n.id === conn.source);
          const target = nodeData.find(n => n.id === conn.target);

          return (
            <React.Fragment key={conn.id}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={nodeColors[source.type].stroke}
                strokeWidth={0.5 + conn.strength}
                strokeOpacity={0.6}
              />

              {/* Energy particles on connections */}
              {energyFlow && (
                <EnergyParticle
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  color={nodeColors[source.type].stroke}
                  speed={1 + conn.strength * 2}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Nodes */}
        {nodeData.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={nodeColors[node.type].fill}
              stroke={nodeColors[node.type].stroke}
              strokeWidth={1}
            />

            {/* Pulse effect for active nodes */}
            {(centralProcessingActive || node.id !== 'central') && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                stroke={nodeColors[node.type].stroke}
                strokeWidth={0.5}
                fill="none"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

const EnergyParticle = ({ x1, y1, x2, y2, color, speed }) => {
  return (
    <motion.circle
      r={0.8}
      fill={color}
      initial={{ x: x1, y: y1 }}
      animate={{
        x: [x1, x2, x1],
        y: [y1, y2, y1]
      }}
      transition={{
        duration: 3 / speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        delay: Math.random() * 2
      }}
    />
  );
};

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

```

## 4. Quantum State Transition Button

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuantumStateButton({
  label = "Activate",
  onClick,
  state = "heritage", // heritage, transitional, quantum
  variant = "primary", // primary, secondary, ghost
  size = "md", // sm, md, lg
  isLoading = false
}) {
  const [hovered, setHovered] = useState(false);

  // Color mapping
  const variantColors = {
    primary: {
      bg: "#331F4A",
      text: "#FFFFFF",
      border: "#5AC8FA",
      accent: "#BF4080"
    },
    secondary: {
      bg: "#131A36",
      text: "#FFFFFF",
      border: "#6A3093",
      accent: "#5AC8FA"
    },
    ghost: {
      bg: "transparent",
      text: "#FFFFFF",
      border: "#5AC8FA",
      accent: "#5AC8FA"
    }
  };

  // Size mapping
  const sizeStyles = {
    sm: {
      py: "py-1",
      px: "px-3",
      text: "text-xs",
      height: "h-8"
    },
    md: {
      py: "py-2",
      px: "px-4",
      text: "text-sm",
      height: "h-10"
    },
    lg: {
      py: "py-3",
      px: "px-6",
      text: "text-base",
      height: "h-12"
    }
  };

  // State-based styling
  const stateStyles = {
    heritage: {
      borderRadius: "0px",
      opacity: 0.9,
      shadow: "none"
    },
    transitional: {
      borderRadius: "4px",
      opacity: 1,
      shadow: `0 2px 6px ${variantColors[variant].accent}33`
    },
    quantum: {
      borderRadius: "8px",
      opacity: 1,
      shadow: `0 4px 12px ${variantColors[variant].accent}66`
    }
  };

  return (
    <motion.button
      className={`relative ${sizeStyles[size].height} ${sizeStyles[size].py} ${sizeStyles[size].px} ${sizeStyles[size].text} font-medium flex items-center justify-center overflow-hidden`}
      style={{
        background: variant === "ghost" ? "transparent" : variantColors[variant].bg,
        color: variantColors[variant].text,
        borderRadius: stateStyles[state].borderRadius,
        boxShadow: stateStyles[state].shadow,
        border: variant === "ghost" ? `1px solid ${variantColors[variant].border}` : "none"
      }}
      animate={{
        borderRadius: stateStyles[state].borderRadius,
        opacity: isLoading ? 0.7 : stateStyles[state].opacity,
        boxShadow: hovered
          ? `0 6px 16px ${variantColors[variant].accent}88`
          : stateStyles[state].shadow
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      disabled={isLoading}
    >
      {/* Background Grid for non-ghost buttons */}
      {variant !== "ghost" && (
        <div className="absolute inset-0 opacity-10">
          <GridSystem />
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          className="absolute left-3 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={variantColors[variant].accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="15 85"
            />
          </svg>
        </motion.div>
      )}

      {/* Label */}
      <span className="relative z-10">
        {label}
      </span>

      {/* Edge glow for quantum state */}
      {state === "quantum" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: hovered
              ? `inset 0 0 8px ${variantColors[variant].accent}aa`
              : `inset 0 0 4px ${variantColors[variant].accent}66`
          }}
          style={{ borderRadius: "8px" }}
        />
      )}

      {/* Energy particles for hover */}
      {hovered && state !== "heritage" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <EnergyParticles color={variantColors[variant].accent} />
        </div>
      )}
    </motion.button>
  );
}

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const EnergyParticles = ({ color }) => {
  const particles = Array(5).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random()
          }}
        />
      ))}
    </>
  );
};

```

## 5. Dimensional Progress Indicator

```tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function DimensionalProgressIndicator({
  steps = [
    { id: "explore", label: "Explore", state: "complete", realm: "spirit" },
    { id: "create", label: "Create", state: "active", realm: "mortal" },
    { id: "transform", label: "Transform", state: "upcoming", realm: "quantum" },
    { id: "materialize", label: "Materialize", state: "upcoming", realm: "spirit" }
  ],
  orientation = "horizontal" // horizontal, vertical
}) {
  // Realm color mapping
  const realmColors = {
    spirit: { primary: "#BF4080", secondary: "#FF2D55" },
    mortal: { primary: "#5AC8FA", secondary: "#29B6F6" },
    quantum: { primary: "#6A3093", secondary: "#331F4A" }
  };

  // State styling
  const stateStyles = {
    complete: {
      circle: { border: "none", opacity: 1 },
      line: { opacity: 1 }
    },
    active: {
      circle: { border: "2px", opacity: 1 },
      line: { opacity: 0.6 }
    },
    upcoming: {
      circle: { border: "1px", opacity: 0.5 },
      line: { opacity: 0.3 }
    }
  };

  return (
    <div className={`w-full flex ${orientation === "horizontal" ? "flex-row" : "flex-col h-full"} items-center gap-2 py-4`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step indicator */}
          <div className="relative flex flex-col items-center">
            {/* Circle */}
            <motion.div
              className={`relative z-10 flex items-center justify-center rounded-full ${step.state === "complete" ? "" : "border"}`}
              style={{
                width: step.state === "active" ? "24px" : "20px",
                height: step.state === "active" ? "24px" : "20px",
                backgroundColor: step.state === "complete"
                  ? realmColors[step.realm].primary
                  : "transparent",
                borderColor: realmColors[step.realm].primary,
                borderWidth: stateStyles[step.state].circle.border,
                opacity: stateStyles[step.state].circle.opacity
              }}
              animate={{
                scale: step.state === "active" ? [1, 1.1, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: step.state === "active" ? Infinity : 0,
                repeatType: "reverse"
              }}
            >
              {step.state === "complete" && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}

              {/* Pulse effect for active step */}
              {step.state === "active" && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${realmColors[step.realm].primary}`
                  }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.7, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              )}
            </motion.div>

            {/* Label */}
            <span
              className={`mt-2 text-xs ${orientation === "vertical" ? "ml-6" : ""}`}
              style={{
                color: step.state === "upcoming" ? "#9CA3AF" : "#FFFFFF",
                opacity: stateStyles[step.state].circle.opacity
              }}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 ${orientation === "horizontal" ? "h-0.5" : "w-0.5 h-8"}`}
              style={{
                background: `linear-gradient(${orientation === "horizontal" ? "90deg" : "180deg"}, ${realmColors[step.realm].primary}, ${realmColors[steps[index + 1].realm].primary})`,
                opacity: stateStyles[step.state].line.opacity
              }}
            >
              {/* Energy flow particles for complete and active states */}
              {(step.state === "complete" || step.state === "active") && (
                <EnergyFlow
                  startColor={realmColors[step.realm].secondary}
                  endColor={realmColors[steps[index + 1].realm].secondary}
                  orientation={orientation}
                />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const EnergyFlow = ({ startColor, endColor, orientation }) => {
  const particles = Array(3).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: i % 2 === 0 ? startColor : endColor,
            width: "4px",
            height: "4px",
            top: orientation === "horizontal" ? "-1.5px" : "0",
            left: orientation === "horizontal" ? "0" : "-1.5px"
          }}
          animate={{
            [orientation === "horizontal" ? "x" : "y"]: ["0%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7
          }}
        />
      ))}
    </>
  );
};

```

## 6. Creative Singularity Dashboard

```tsx
    import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreativeSingularityDashboard({
  metrics = [
    { id: "projects", label: "Active Projects", value: 7, change: 2, realm: "spirit" },
    { id: "assets", label: "Generated Assets", value: 152, change: 38, realm: "mortal" },
    { id: "pipelines", label: "Active Pipelines", value: 5, change: 1, realm: "quantum" },
    { id: "efficiency", label: "Efficiency Score", value: 87, change: 12, realm: "spirit", unit: "%" }
  ],
  activities = [
    { id: "1", label: "Quantum Asset Generated", time: "2m ago", realm: "mortal" },
    { id: "2", label: "Pipeline Optimization Complete", time: "17m ago", realm: "quantum" },
    { id: "3", label: "New Edge Node Connected", time: "45m ago", realm: "spirit" }
  ]
}) {
  // Realm color mapping
  const realmColors = {
    spirit: { primary: "#BF4080", secondary: "#FF2D55" },
    mortal: { primary: "#5AC8FA", secondary: "#29B6F6" },
    quantum: { primary: "#6A3093", secondary: "#331F4A" }
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <GridSystem />
      </div>

      {/* Singularity Pulse Core */}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <SingularityCore />
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-medium text-white mb-6">Creative Singularity</h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} realmColors={realmColors} />
          ))}
        </div>

        {/* Activity Feed */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} realmColors={realmColors} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ metric, realmColors }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: realmColors[metric.realm].primary }}
      />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-white">{metric.value}{metric.unit || ""}</span>

          {/* Change indicator */}
          {metric.change !== 0 && (
            <div
              className="ml-2 text-xs pb-1 flex items-center"
              style={{
                color: metric.change > 0
                  ? realmColors[metric.realm].secondary
                  : "#FF4040"
              }}
            >
              {metric.change > 0 ? "+" : ""}{metric.change}
              <svg
                className="w-3 h-3 ml-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={metric.change > 0
                    ? "M5 10l7-7m0 0l7 7m-7-7v18"
                    : "M19 14l-7 7m0 0l-7-7m7 7V3"
                  }
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Realm indicator dot */}
      <div
        className="absolute bottom-2 right-2 w-2 h-2 rounded-full"
        style={{ background: realmColors[metric.realm].primary }}
      />
    </div>
  );
};

const ActivityItem = ({ activity, realmColors }) => {
  return (
    <div className="flex items-center">
      {/* Activity indicator */}
      <div
        className="w-2 h-2 rounded-full mr-3"
        style={{ background: realmColors[activity.realm].primary }}
      />

      {/* Activity content */}
      <div className="flex-1">
        <p className="text-sm text-white">{activity.label}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>

      {/* Energy particles */}
      <motion.div
        className="w-6 h-6 relative"
        style={{ overflow: 'hidden' }}
      >
        <EnergyParticles color={realmColors[activity.realm].secondary} />
      </motion.div>
    </div>
  );
};

const SingularityCore = () => {
  return (
    <div className="relative">
      {/* Central Core */}
      <motion.div
        className="w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, #131A36 0%, #0A0621 100%)",
          boxShadow: "0 0 20px #5AC8FA33, 0 0 40px #BF408033"
        }}
        animate={{
          boxShadow: [
            "0 0 20px #5AC8FA33, 0 0 40px #BF408033",
            "0 0 30px #5AC8FA66, 0 0 60px #BF408066",
            "0 0 20px #5AC8FA33, 0 0 40px #BF408033"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Energy rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              top: '50%',
              left: '50%',
              width: `${120 + i * 40}%`,
              height: `${120 + i * 40}%`,
              borderColor: i % 2 === 0 ? "#5AC8FA" : "#BF4080",
              borderWidth: "1px",
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, #6A309366 0%, transparent 70%)"
          }}
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Quantum particles */}
      <div className="absolute" style={{ top: '50%', left: '50%', width: 0, height: 0 }}>
        {Array(12).fill(0).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 80 + Math.random() * 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const colors = ["#5AC8FA", "#BF4080", "#6A3093"];
          const color = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3 + "px",
                height: 2 + Math.random() * 3 + "px",
                background: color,
                left: x + "px",
                top: y + "px",
                transform: "translate(-50%, -50%)"
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [x, x + (Math.random() * 20 - 10)],
                y: [y, y + (Math.random() * 20 - 10)]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const EnergyParticles = ({ color }) => {
  const particles = Array(3).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: "2px",
            height: "2px",
            top: "50%",
            left: "50%",
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: ["0%", (Math.random() * 100 - 50) + "%"],
            y: ["0%", (Math.random() * 100 - 50) + "%"]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </>
  );
};

```

# Comprehensive Component Guide

These components work together to fully express the 9Bit Universal foundation with a focus on public-facing interactive elements:

## Core Concepts Visualization

1. **Quantum Portal Navigation**: A sophisticated navigation system that represents different dimensional gateways into your universe. Each portal pulses with realm-specific energy and transitions between states as users interact with them.
2. **Edge Computing Visualization**: A dynamic representation of your edge computing concept, showing how decisions move closer to information sources. The visualization demonstrates data flow with energy particles moving between nodes.
3. **Creative Singularity Dashboard**: A unified interface showing the central singularity that powers your creative ecosystem, with metrics and activity feeds arranged around it. The singularity pulses with quantum energy, representing the core of your creative universe.

## Interactive Elements

1. **Quantum State Button**: A button system that evolves through different states (heritage, transitional, quantum) with appropriate animations and effects. The button design maintains your quantum-spatial aesthetic across different variants and sizes.
2. **Dimensional Content Card**: A content display card that transforms between different states, showing how content exists across multiple dimensions in your ecosystem. Material properties change based on content category and state.
3. **Dimensional Progress Tracker**: A progress indicator that visualizes a user's journey through different realms, with energy particles flowing between completed steps. The tracker can be oriented horizontally or vertically.

## Implementation Strategy

To implement these components in your Framer projects:

1. **Design System Integration**:
    - Create a central theme file with your color palette, grid system, and animation parameters
    - Ensure consistent use of dimensional grid backgrounds across all components
    - Maintain the state transition system (heritage → transitional → quantum) throughout
2. **User Experience Considerations**:
    - Start new users with heritage state components and evolve to quantum state as they progress
    - Use transitional states during interactions to provide feedback
    - Ensure all animations respect reduced motion preferences for accessibility
3. **Performance Optimization**:
    - Leverage the M4 chip's capabilities by using hardware-accelerated properties
    - Implement conditional rendering for particle effects based on device capabilities
    - Use efficient SVG patterns for grid systems rather than repetitive elements

These components embody your 9Bit Universal foundation while providing practical, public-facing interfaces that users can interact with. They visualize your core concepts of Singularity, Quantum Roles, and Edge Computing in an engaging, dimensional way.

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

- **Page History**
    
    
    | Version | Date | Author | Changes |
    | --- | --- | --- | --- |
    | 0.1 | April 22, 2025  | @Penny Platt  | Initial draft |
    | 0.2 | YYYY-MM-DD | [Name] | Added market analysis |
    | 0.3 | YYYY-MM-DD | [Name] | Updated technical architecture |
    | 1.0 | YYYY-MM-DD | [Name] | Finalized for approval |
    
    *This document follows 9Bit Studios’ documentation standards and incorporates quantum-spatial design principles.*
    
</aside>

## Supporting files

[](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)