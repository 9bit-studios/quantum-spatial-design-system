import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the color palette based on your quantum-spatial aesthetic
const colors = {
  voidBlack: '#0A0621',
  deepSpaceIndigo: '#131A36',
  ultraIndigo: '#1E1F5C',
  dimensionalEggplant: '#331F4A',
  midnightRichness: '#0D0D15',
  quantumViolet: '#6A3093',
  ultraViolet: '#613FE7',
  subtleSky: '#29B6F6',
  subtleCyan: '#5AC8FA',
  dimensionalTeal: '#126D71',
  roseEnergy: '#BF4080',
  quantumPulsePink: '#FF2D55',
  dimensionalOrange: '#FF6B6B',
  heritageGreenCore: '#2C5F2D'
};

// Particle component for quantum effects
const Particle = ({ x, y, color, size, delay }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0.2, scale: 0.8 }}
      animate={{ 
        opacity: [0.2, 0.6, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay
      }}
    />
  );
};

// Grid line component
const GridLine = ({ start, end, opacity }) => {
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={colors.subtleCyan}
      strokeWidth={0.5}
      initial={{ opacity: 0.05 }}
      animate={{ opacity: opacity }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
};

// Create a dimensional platform for the core pillars
const DimensionalPlatform = () => {
  return (
    <g>
      <motion.path
        d="M100,350 L500,350 L600,400 L0,400 Z"
        fill={colors.deepSpaceIndigo}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.9 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.path
        d="M100,350 L500,350 L600,400 L0,400 Z"
        fill="none"
        stroke={colors.subtleCyan}
        strokeWidth={1}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.7 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </g>
  );
};

// Quantum Pillar Component
const QuantumPillar = ({ x, y, height, color, title, description, delay }) => {
  return (
    <g>
      {/* Base of pillar */}
      <motion.rect
        x={x - 30}
        y={y}
        width={60}
        height={height}
        rx={2}
        fill={`url(#${title.replace(/\s+/g, '')}Gradient)`}
        initial={{ height: 0, y: y + height }}
        animate={{ height: height, y: y }}
        transition={{
          duration: 1.5,
          delay: delay,
          ease: "easeOut"
        }}
      />
      
      {/* Pillar outline */}
      <motion.rect
        x={x - 30}
        y={y}
        width={60}
        height={height}
        rx={2}
        fill="none"
        stroke={colors.subtleCyan}
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{
          duration: 1,
          delay: delay + 0.5,
          ease: "easeOut"
        }}
      />
      
      {/* Energy core */}
      <motion.rect
        x={x - 15}
        y={y + 10}
        width={30}
        height={height - 20}
        rx={2}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 3,
          delay: delay + 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Pillar title */}
      <motion.text
        x={x}
        y={y - 10}
        textAnchor="middle"
        fill={colors.subtleCyan}
        fontSize={12}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: delay + 1,
          ease: "easeOut"
        }}
      >
        {title}
      </motion.text>
      
      {/* Pixel elements */}
      <motion.rect
        x={x - 25}
        y={y + Math.random() * height * 0.8}
        width={8}
        height={8}
        fill={colors.subtleCyan}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: delay + 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.rect
        x={x + 15}
        y={y + Math.random() * height * 0.6}
        width={6}
        height={6}
        fill={colors.quantumPulsePink}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: delay + 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  );
};

const VisionCanvas = () => {
  // Generate random particles for background effect
  const generateParticles = (count) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 600,
        y: Math.random() * 400,
        color: [colors.subtleCyan, colors.quantumViolet, colors.roseEnergy, colors.subtleSky][Math.floor(Math.random() * 4)],
        size: 0.5 + Math.random() * 2,
        delay: Math.random() * 2
      });
    }
    return particles;
  };

  // Generate grid lines for dimensional effect
  const generateGridLines = (count) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      // Horizontal lines
      if (i < count/2) {
        const y = i * 50;
        lines.push({
          start: { x: 0, y },
          end: { x: 600, y },
          opacity: 0.05 + (Math.random() * 0.1)
        });
      } 
      // Vertical lines
      else {
        const x = (i - count/2) * 50;
        lines.push({
          start: { x, y: 0 },
          end: { x, y: 400 },
          opacity: 0.05 + (Math.random() * 0.1)
        });
      }
    }
    return lines;
  };

  const [particles] = useState(generateParticles(60));
  const [gridLines] = useState(generateGridLines(24));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="600" height="400" viewBox="0 0 600 400" className="shadow-lg rounded-lg">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.voidBlack} />
            <stop offset="100%" stopColor={colors.deepSpaceIndigo} />
          </linearGradient>
          
          <linearGradient id="PossibilityThinkingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.subtleCyan} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.subtleCyan} stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="UserRespectGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.roseEnergy} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.roseEnergy} stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="CreativeIngenuityCradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.quantumViolet} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.quantumViolet} stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="SustainableCreationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.quantumPulsePink} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.quantumPulsePink} stopOpacity="0.05" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background */}
        <rect width="600" height="400" fill="url(#backgroundGradient)" />
        
        {/* Grid lines for dimension */}
        {gridLines.map((line, index) => (
          <GridLine key={index} start={line.start} end={line.end} opacity={line.opacity} />
        ))}
        
        {/* Floating particles */}
        {particles.map((particle, index) => (
          <Particle 
            key={index} 
            x={particle.x} 
            y={particle.y} 
            color={particle.color} 
            size={particle.size}
            delay={particle.delay}
          />
        ))}
        
        {/* Central singularity - core of the vision */}
        <motion.circle
          cx="300"
          cy="150"
          r="20"
          fill={colors.ultraViolet}
          filter="url(#glow)"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            r: [20, 22, 20]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
        
        <motion.circle
          cx="300"
          cy="150"
          r="15"
          fill={colors.quantumPulsePink}
          filter="url(#glow)"
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            r: [15, 17, 15]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Label for the singularity */}
        <motion.text
          x="300"
          y="110"
          textAnchor="middle"
          fill={colors.subtleCyan}
          fontSize={16}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: "easeOut"
          }}
        >
          VISION CORE
        </motion.text>
        
        {/* Connection lines from singularity to pillars */}
        <motion.line
          x1="300"
          y1="150"
          x2="150"
          y2="320"
          stroke={colors.subtleCyan}
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 2,
            ease: "easeOut"
          }}
        />
        
        <motion.line
          x1="300"
          y1="150"
          x2="250"
          y2="320"
          stroke={colors.roseEnergy}
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 2.3,
            ease: "easeOut"
          }}
        />
        
        <motion.line
          x1="300"
          y1="150"
          x2="350"
          y2="320"
          stroke={colors.quantumViolet}
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 2.6,
            ease: "easeOut"
          }}
        />
        
        <motion.line
          x1="300"
          y1="150"
          x2="450"
          y2="320"
          stroke={colors.quantumPulsePink}
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 2.9,
            ease: "easeOut"
          }}
        />
        
        {/* Platform for pillars */}
        <DimensionalPlatform />
        
        {/* Quantum Pillars */}
        <QuantumPillar 
          x={150} 
          y={200} 
          height={150} 
          color={colors.subtleCyan} 
          title="Possibility Thinking" 
          delay={3.2}
        />
        
        <QuantumPillar 
          x={250} 
          y={200} 
          height={150} 
          color={colors.roseEnergy} 
          title="User Respect" 
          delay={3.5}
        />
        
        <QuantumPillar 
          x={350} 
          y={200} 
          height={150} 
          color={colors.quantumViolet} 
          title="Creative Ingenuity" 
          delay={3.8}
        />
        
        <QuantumPillar 
          x={450} 
          y={200} 
          height={150} 
          color={colors.quantumPulsePink} 
          title="Sustainable Creation" 
          delay={4.1}
        />
      </svg>
    </div>
  );
};

export default VisionCanvas;
