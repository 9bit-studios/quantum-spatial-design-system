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
  subtleCyan: '#5AC8FA',
  dimensionalTeal: '#126D71',
  roseEnergy: '#BF4080',
  quantumPulsePink: '#FF2D55',
  dimensionalOrange: '#FF6B6B',
  heritageGreenCore: '#2C5F2D'
};

// Helper component for background particles
const Particle = ({ x, y, size, color, delay }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        y: [y, y - 10, y],
        x: [x, x + (Math.random() * 10 - 5), x]
      }}
      transition={{
        duration: 3 + Math.random() * 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Helper component for connection lines
const ConnectionLine = ({ start, end, color, dashArray, animate }) => {
  return animate ? (
    <motion.path
      d={`M${start.x},${start.y} L${end.x},${end.y}`}
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray={dashArray || "5,5"}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 0.7, pathLength: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut"
      }}
    />
  ) : (
    <path
      d={`M${start.x},${start.y} L${end.x},${end.y}`}
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray={dashArray || "5,5"}
      opacity={0.7}
    />
  );
};

// PartnershipNode component for each opportunity sphere
const PartnershipNode = ({ cx, cy, radius, color, glowColor, title, details, index, active, onClick }) => {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Outer glow */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius + 5}
        fill={color}
        opacity={0.2}
        initial={{ scale: 0 }}
        animate={{ 
          scale: active ? 1.1 : 1,
          opacity: active ? 0.3 : 0.2
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      />
      
      {/* Main circle */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={color}
        stroke={glowColor}
        strokeWidth={active ? 2 : 1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.7,
          delay: index * 0.2,
          ease: "easeOut"
        }}
      />
      
      {/* Inner glow */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius * 0.7}
        fill={glowColor}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: active ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2] 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Title text */}
      <motion.text
        x={cx}
        y={cy}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#ffffff"
        fontSize={radius * 0.25}
        fontWeight="bold"
        fontFamily="SF Pro Display, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.2 + 0.3,
          ease: "easeOut"
        }}
      >
        {title}
      </motion.text>
    </g>
  );
};

// Quantum pixel graphic element
const QuantumPixel = ({ x, y, size, color, glowColor, delay }) => {
  return (
    <g>
      <motion.rect
        x={x - size/2}
        y={y - size/2}
        width={size}
        height={size}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeOut"
        }}
      />
      
      <motion.rect
        x={x - size/2 + 2}
        y={y - size/2 + 2}
        width={size - 4}
        height={size - 4}
        fill={glowColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 2,
          delay: delay + 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  );
};

// Main component
const CreativePartnershipProspectus = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [particles, setParticles] = useState([]);
  
  // Generate background particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * 600,
        y: Math.random() * 400,
        size: 0.5 + Math.random() * 2,
        color: [colors.subtleCyan, colors.roseEnergy, colors.quantumViolet][Math.floor(Math.random() * 3)],
        delay: Math.random() * 3
      });
    }
    setParticles(newParticles);
  }, []);
  
  // Define partnership opportunities
  const partnerships = [
    {
      cx: 150,
      cy: 150,
      radius: 50,
      color: colors.dimensionalEggplant,
      glowColor: colors.roseEnergy,
      title: "CONTENT ALLIANCE",
      details: "Co-creation of interactive stories and experiences across platforms"
    },
    {
      cx: 300,
      cy: 120,
      radius: 60,
      color: colors.ultraIndigo,
      glowColor: colors.subtleCyan,
      title: "TECHNOLOGY PARTNERSHIP",
      details: "Shared development of quantum-spatial frameworks and tools"
    },
    {
      cx: 450,
      cy: 150,
      radius: 50,
      color: colors.dimensionalEggplant,
      glowColor: colors.quantumViolet,
      title: "CREATIVE ACCELERATION",
      details: "Access to our intelligence systems and production pipelines"
    },
    {
      cx: 200,
      cy: 280,
      radius: 55,
      color: colors.deepSpaceIndigo,
      glowColor: colors.dimensionalOrange,
      title: "MARKET EXPANSION",
      details: "Joint ventures to reach new audiences and platforms"
    },
    {
      cx: 400,
      cy: 280,
      radius: 55,
      color: colors.deepSpaceIndigo,
      glowColor: colors.subtleCyan,
      title: "INVESTMENT OPPORTUNITY",
      details: "Strategic capital alliance with multiple growth pathways"
    }
  ];
  
  // Create connection coordinates
  const connections = [
    { start: { x: 150, y: 150 }, end: { x: 300, y: 120 }, color: colors.roseEnergy },
    { start: { x: 300, y: 120 }, end: { x: 450, y: 150 }, color: colors.subtleCyan },
    { start: { x: 150, y: 150 }, end: { x: 200, y: 280 }, color: colors.roseEnergy },
    { start: { x: 300, y: 120 }, end: { x: 200, y: 280 }, color: colors.subtleCyan },
    { start: { x: 300, y: 120 }, end: { x: 400, y: 280 }, color: colors.subtleCyan },
    { start: { x: 450, y: 150 }, end: { x: 400, y: 280 }, color: colors.quantumViolet },
    { start: { x: 200, y: 280 }, end: { x: 400, y: 280 }, color: colors.dimensionalOrange }
  ];
  
  // Create decorative quantum pixels
  const quantumPixels = [
    { x: 90, y: 90, size: 12, color: colors.ultraIndigo, glowColor: colors.roseEnergy, delay: 1 },
    { x: 510, y: 90, size: 12, color: colors.ultraIndigo, glowColor: colors.subtleCyan, delay: 1.2 },
    { x: 90, y: 310, size: 12, color: colors.ultraIndigo, glowColor: colors.quantumViolet, delay: 1.4 },
    { x: 510, y: 310, size: 12, color: colors.ultraIndigo, glowColor: colors.dimensionalOrange, delay: 1.6 },
    { x: 180, y: 75, size: 8, color: colors.deepSpaceIndigo, glowColor: colors.subtleCyan, delay: 1.8 },
    { x: 420, y: 75, size: 8, color: colors.deepSpaceIndigo, glowColor: colors.roseEnergy, delay: 2 },
    { x: 180, y: 325, size: 8, color: colors.deepSpaceIndigo, glowColor: colors.dimensionalOrange, delay: 2.2 },
    { x: 420, y: 325, size: 8, color: colors.deepSpaceIndigo, glowColor: colors.quantumViolet, delay: 2.4 }
  ];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="600" height="400" viewBox="0 0 600 400" className="shadow-lg rounded-lg">
        {/* Definitions */}
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
        
        {/* Background particles */}
        {particles.map((particle, index) => (
          <Particle
            key={`particle-${index}`}
            x={particle.x}
            y={particle.y}
            size={particle.size}
            color={particle.color}
            delay={particle.delay}
          />
        ))}
        
        {/* Connection lines */}
        {connections.map((connection, index) => (
          <ConnectionLine 
            key={`connection-${index}`}
            start={connection.start}
            end={connection.end}
            color={connection.color}
            animate={true}
          />
        ))}
        
        {/* Partnership opportunity nodes */}
        {partnerships.map((partnership, index) => (
          <PartnershipNode
            key={`partnership-${index}`}
            cx={partnership.cx}
            cy={partnership.cy}
            radius={partnership.radius}
            color={partnership.color}
            glowColor={partnership.glowColor}
            title={partnership.title}
            details={partnership.details}
            index={index}
            active={activeNode === index}
            onClick={() => setActiveNode(index)}
          />
        ))}
        
        {/* Decorative quantum pixels */}
        {quantumPixels.map((pixel, index) => (
          <QuantumPixel
            key={`pixel-${index}`}
            x={pixel.x}
            y={pixel.y}
            size={pixel.size}
            color={pixel.color}
            glowColor={pixel.glowColor}
            delay={pixel.delay}
          />
        ))}
        
        {/* Title */}
        <motion.text
          x="300"
          y="35"
          textAnchor="middle"
          fill={colors.subtleCyan}
          fontSize={20}
          fontFamily="SF Pro Display, sans-serif"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          CREATIVE PARTNERSHIP PROSPECTUS
        </motion.text>
        
        {/* Subtitle */}
        <motion.text
          x="300"
          y="55"
          textAnchor="middle"
          fill={colors.subtleCyan}
          fontSize={12}
          fontFamily="SF Pro Display, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          9BIT STUDIOS DIMENSIONAL OPPORTUNITY FRAMEWORK
        </motion.text>
        
        {/* Details panel for active node */}
        {activeNode !== null && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <rect
              x="150"
              y="340"
              width="300"
              height="50"
              rx="5"
              fill={colors.deepSpaceIndigo}
              stroke={partnerships[activeNode].glowColor}
              strokeWidth="1"
              opacity="0.9"
            />
            
            <text
              x="300"
              y="360"
              textAnchor="middle"
              fill="#ffffff"
              fontSize={12}
              fontFamily="SF Pro Display, sans-serif"
              fontWeight="medium"
            >
              {partnerships[activeNode].details}
            </text>
            
            <text
              x="300"
              y="380"
              textAnchor="middle"
              fill={partnerships[activeNode].glowColor}
              fontSize={11}
              fontFamily="SF Pro Display, sans-serif"
            >
              Click each opportunity sphere to explore partnership details
            </text>
          </motion.g>
        )}
        
        {/* Instruction if no node is active */}
        {activeNode === null && (
          <motion.text
            x="300"
            y="370"
            textAnchor="middle"
            fill={colors.subtleCyan}
            fontSize={12}
            fontFamily="SF Pro Display, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Click any opportunity sphere to explore partnership details
          </motion.text>
        )}
      </svg>
    </div>
  );
};

export default CreativePartnershipProspectus;
