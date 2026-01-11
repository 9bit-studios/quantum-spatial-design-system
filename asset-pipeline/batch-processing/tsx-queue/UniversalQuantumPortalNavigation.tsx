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
