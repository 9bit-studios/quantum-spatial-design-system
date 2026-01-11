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
