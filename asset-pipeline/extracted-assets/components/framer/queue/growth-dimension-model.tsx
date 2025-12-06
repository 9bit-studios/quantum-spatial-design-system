import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the color palette based on quantum-spatial aesthetic
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

// Dimensional node component
const DimensionalNode = ({ x, y, radius, color, glowColor, label, phase, connections, delay }) => {
  return (
    <g>
      {/* Node connections */}
      {connections && connections.map((connection, index) => (
        <motion.line
          key={`connection-${index}`}
          x1={x}
          y1={y}
          x2={connection.x}
          y2={connection.y}
          stroke={glowColor || color}
          strokeWidth={1}
          strokeDasharray="4,4"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.6, pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: delay + 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Background glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={radius * 1.5}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{
          duration: 1,
          delay: delay,
          ease: "easeOut"
        }}
      />
      
      {/* Main node */}
      <motion.circle
        cx={x}
        cy={y}
        r={radius}
        fill={color}
        stroke={glowColor || color}
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: "easeOut"
        }}
      />
      
      {/* Pulsing effect */}
      <motion.circle
        cx={x}
        cy={y}
        r={radius * 0.8}
        fill={glowColor || color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 2,
          delay: delay + 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Phase label */}
      <motion.text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#ffffff"
        fontSize={radius * 0.5}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: delay + 0.8,
          ease: "easeOut"
        }}
      >
        {phase}
      </motion.text>
      
      {/* Node label */}
      <motion.text
        x={x}
        y={y + radius + 15}
        textAnchor="middle"
        fill={colors.subtleCyan}
        fontSize={10}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: delay + 1,
          ease: "easeOut"
        }}
      >
        {label}
      </motion.text>
    </g>
  );
};

// Energy flow particle
const EnergyParticle = ({ path, color, delay, duration, reverse }) => {
  return (
    <motion.circle
      r={3}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{
        duration: duration || 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.animateMotion
        path={path}
        dur={duration || 3}
        begin={delay}
        repeatCount="indefinite"
        rotate="auto"
        reverse={reverse}
      />
    </motion.circle>
  );
};

// Quantum grid line
const GridLine = ({ start, end, color, opacity, dashArray }) => {
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={color || colors.subtleCyan}
      strokeWidth={0.5}
      strokeDasharray={dashArray || ""}
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity || 0.1 }}
      transition={{
        duration: 2,
        ease: "easeInOut"
      }}
    />
  );
};

// Growth model component
const DimensionalGrowthModel = () => {
  // Generate grid lines
  const [gridLines, setGridLines] = useState([]);
  
  useEffect(() => {
    const lines = [];
    
    // Horizontal lines
    for (let i = 0; i < 10; i++) {
      lines.push({
        start: { x: 50, y: 50 + i * 30 },
        end: { x: 550, y: 50 + i * 30 },
        opacity: 0.05 + (i % 3 === 0 ? 0.05 : 0)
      });
    }
    
    // Vertical lines
    for (let i = 0; i < 18; i++) {
      lines.push({
        start: { x: 50 + i * 30, y: 50 },
        end: { x: 50 + i * 30, y: 320 },
        opacity: 0.05 + (i % 3 === 0 ? 0.05 : 0)
      });
    }
    
    setGridLines(lines);
  }, []);

  // Define growth phases and their connections
  const phases = [
    { 
      x: 150, 
      y: 120, 
      radius: 30, 
      color: colors.roseEnergy,
      glowColor: colors.roseEnergy,
      label: "HERITAGE FOUNDATION",
      phase: "I", 
      connections: [{ x: 250, y: 120 }, { x: 150, y: 200 }],
      delay: 0.5
    },
    { 
      x: 250, 
      y: 120, 
      radius: 30, 
      color: colors.dimensionalEggplant, 
      glowColor: colors.subtleCyan,
      label: "TRANSITIONAL EXPANSION", 
      phase: "II", 
      connections: [{ x: 350, y: 120 }, { x: 250, y: 200 }],
      delay: 1
    },
    { 
      x: 350, 
      y: 120, 
      radius: 30, 
      color: colors.ultraIndigo, 
      glowColor: colors.quantumViolet,
      label: "QUANTUM ACCELERATION", 
      phase: "III", 
      connections: [{ x: 450, y: 120 }, { x: 350, y: 200 }],
      delay: 1.5
    },
    { 
      x: 450, 
      y: 120, 
      radius: 30, 
      color: colors.quantumViolet, 
      glowColor: colors.ultraViolet,
      label: "DIMENSIONAL TRANSCENDENCE", 
      phase: "IV", 
      connections: [{ x: 450, y: 200 }],
      delay: 2
    },
    { 
      x: 150, 
      y: 200, 
      radius: 25, 
      color: colors.deepSpaceIndigo, 
      glowColor: colors.dimensionalTeal,
      label: "BRANDING QUIZ", 
      phase: "A", 
      connections: [{ x: 250, y: 200 }],
      delay: 2.5
    },
    { 
      x: 250, 
      y: 200, 
      radius: 25, 
      color: colors.deepSpaceIndigo, 
      glowColor: colors.dimensionalTeal,
      label: "INTERACTIVE FICTION", 
      phase: "B", 
      connections: [{ x: 350, y: 200 }],
      delay: 3
    },
    { 
      x: 350, 
      y: 200, 
      radius: 25, 
      color: colors.deepSpaceIndigo, 
      glowColor: colors.dimensionalTeal,
      label: "VIRTUAL ESCAPE ROOM", 
      phase: "C", 
      connections: [{ x: 450, y: 200 }],
      delay: 3.5
    },
    { 
      x: 450, 
      y: 200, 
      radius: 25, 
      color: colors.deepSpaceIndigo, 
      glowColor: colors.dimensionalTeal,
      label: "JROTHARKE UNIVERSE", 
      phase: "D", 
      connections: [],
      delay: 4
    },
    { 
      x: 150, 
      y: 280, 
      radius: 25, 
      color: colors.midnightRichness, 
      glowColor: colors.subtleSky,
      label: "REVENUE STREAMS", 
      phase: "1", 
      connections: [{ x: 250, y: 280 }],
      delay: 4.5
    },
    { 
      x: 250, 
      y: 280, 
      radius: 25, 
      color: colors.midnightRichness, 
      glowColor: colors.subtleSky,
      label: "MARKET VALIDATION", 
      phase: "2", 
      connections: [{ x: 350, y: 280 }],
      delay: 5
    },
    { 
      x: 350, 
      y: 280, 
      radius: 25, 
      color: colors.midnightRichness, 
      glowColor: colors.subtleSky,
      label: "SCALING OPERATIONS", 
      phase: "3", 
      connections: [{ x: 450, y: 280 }],
      delay: 5.5
    },
    { 
      x: 450, 
      y: 280, 
      radius: 25, 
      color: colors.midnightRichness, 
      glowColor: colors.subtleSky,
      label: "SUSTAINABLE GROWTH", 
      phase: "4", 
      connections: [],
      delay: 6
    }
  ];

  // Define energy flow paths
  const energyPaths = [
    {
      path: "M150,120 Q200,100 250,120",
      color: colors.roseEnergy,
      delay: 2,
      duration: 2
    },
    {
      path: "M250,120 Q300,100 350,120",
      color: colors.subtleCyan,
      delay: 2.3,
      duration: 2
    },
    {
      path: "M350,120 Q400,100 450,120",
      color: colors.quantumViolet,
      delay: 2.6,
      duration: 2
    },
    {
      path: "M150,120 Q150,160 150,200",
      color: colors.roseEnergy,
      delay: 3,
      duration: 1.5
    },
    {
      path: "M250,120 Q250,160 250,200",
      color: colors.subtleCyan,
      delay: 3.3,
      duration: 1.5
    },
    {
      path: "M350,120 Q350,160 350,200",
      color: colors.quantumViolet,
      delay: 3.6,
      duration: 1.5
    },
    {
      path: "M450,120 Q450,160 450,200",
      color: colors.ultraViolet,
      delay: 3.9,
      duration: 1.5
    },
    {
      path: "M150,200 Q200,200 250,200",
      color: colors.dimensionalTeal,
      delay: 4.2,
      duration: 1.8
    },
    {
      path: "M250,200 Q300,200 350,200",
      color: colors.dimensionalTeal,
      delay: 4.5,
      duration: 1.8
    },
    {
      path: "M350,200 Q400,200 450,200",
      color: colors.dimensionalTeal,
      delay: 4.8,
      duration: 1.8
    },
    {
      path: "M150,200 Q150,240 150,280",
      color: colors.dimensionalTeal,
      delay: 5.1,
      duration: 1.5
    },
    {
      path: "M250,200 Q250,240 250,280",
      color: colors.subtleCyan,
      delay: 5.4,
      duration: 1.5
    },
    {
      path: "M350,200 Q350,240 350,280",
      color: colors.quantumViolet,
      delay: 5.7,
      duration: 1.5
    },
    {
      path: "M450,200 Q450,240 450,280",
      color: colors.ultraViolet,
      delay: 6.0,
      duration: 1.5
    },
    {
      path: "M150,280 Q200,280 250,280",
      color: colors.subtleSky,
      delay: 6.3,
      duration: 1.8
    },
    {
      path: "M250,280 Q300,280 350,280",
      color: colors.subtleSky,
      delay: 6.6,
      duration: 1.8
    },
    {
      path: "M350,280 Q400,280 450,280",
      color: colors.subtleSky,
      delay: 6.9,
      duration: 1.8
    }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="600" height="400" viewBox="0 0 600 400" className="shadow-lg rounded-lg">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.voidBlack} />
            <stop offset="100%" stopColor={colors.deepSpaceIndigo} />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background */}
        <rect width="600" height="400" fill="url(#backgroundGradient)" />
        
        {/* Title */}
        <motion.text
          x="300"
          y="30"
          textAnchor="middle"
          fill={colors.subtleCyan}
          fontSize={18}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          DIMENSIONAL GROWTH MODEL
        </motion.text>
        
        {/* Subtitle */}
        <motion.text
          x="300"
          y="50"
          textAnchor="middle"
          fill={colors.subtleCyan}
          fontSize={10}
          fontFamily="SF Pro Display, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeOut"
          }}
        >
          9BIT STUDIOS QUANTUM-SPATIAL EXPANSION FRAMEWORK
        </motion.text>
        
        {/* Grid lines for dimension */}
        {gridLines.map((line, index) => (
          <GridLine 
            key={`grid-${index}`} 
            start={line.start} 
            end={line.end} 
            opacity={line.opacity} 
          />
        ))}
        
        {/* Row labels */}
        <motion.text
          x="30"
          y="120"
          textAnchor="end"
          alignmentBaseline="middle"
          fill={colors.subtleCyan}
          fontSize={12}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: "easeOut"
          }}
        >
          VISION
        </motion.text>
        
        <motion.text
          x="30"
          y="200"
          textAnchor="end"
          alignmentBaseline="middle"
          fill={colors.subtleCyan}
          fontSize={12}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: "easeOut"
          }}
        >
          PRODUCT
        </motion.text>
        
        <motion.text
          x="30"
          y="280"
          textAnchor="end"
          alignmentBaseline="middle"
          fill={colors.subtleCyan}
          fontSize={12}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: "easeOut"
          }}
        >
          GROWTH
        </motion.text>
        
        {/* Growth phase nodes */}
        {phases.map((phase, index) => (
          <DimensionalNode
            key={`phase-${index}`}
            x={phase.x}
            y={phase.y}
            radius={phase.radius}
            color={phase.color}
            glowColor={phase.glowColor}
            label={phase.label}
            phase={phase.phase}
            connections={phase.connections}
            delay={phase.delay}
          />
        ))}
        
        {/* Energy particles flowing along paths */}
        {energyPaths.map((path, index) => (
          <EnergyParticle
            key={`energy-${index}`}
            path={path.path}
            color={path.color}
            delay={path.delay}
            duration={path.duration}
            reverse={path.reverse}
          />
        ))}
        
        {/* Legend */}
        <motion.rect
          x="480"
          y="340"
          width="110"
          height="50"
          rx="5"
          fill={colors.deepSpaceIndigo}
          stroke={colors.subtleCyan}
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            duration: 1,
            delay: 7,
            ease: "easeOut"
          }}
        />
        
        <motion.text
          x="485"
          y="355"
          fill={colors.roseEnergy}
          fontSize={10}
          fontFamily="SF Pro Display, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 7.2,
            ease: "easeOut"
          }}
        >
          ● VISION PHASES
        </motion.text>
        
        <motion.text
          x="485"
          y="370"
          fill={colors.dimensionalTeal}
          fontSize={10}
          fontFamily="SF Pro Display, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 7.4,
            ease: "easeOut"
          }}
        >
          ● PRODUCT EVOLUTION
        </motion.text>
        
        <motion.text
          x="485"
          y="385"
          fill={colors.subtleSky}
          fontSize={10}
          fontFamily="SF Pro Display, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 7.6,
            ease: "easeOut"
          }}
        >
          ● SUSTAINABLE GROWTH
        </motion.text>
      </svg>
    </div>
  );
};

export default DimensionalGrowthModel;
