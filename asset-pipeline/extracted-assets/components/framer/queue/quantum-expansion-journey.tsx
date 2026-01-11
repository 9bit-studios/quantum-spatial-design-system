import React, { useEffect, useState } from 'react';
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
  heritageGreenCore: '#2C5F2D',
  heritageGreenLight: '#3D8B40'
};

// Timeline Node Component
const TimelineNode = ({ x, y, size, color, glowColor, title, date, description, index, active, setActive }) => {
  return (
    <g onClick={() => setActive(index)} style={{ cursor: 'pointer' }}>
      {/* Connection line */}
      {index > 0 && (
        <motion.line
          x1={x - 80}
          y1={y}
          x2={x - 20}
          y2={y}
          stroke={glowColor}
          strokeWidth={2}
          strokeDasharray="4,4"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{
            duration: 1,
            delay: index * 0.3,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Background glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={size * 1.3}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.3 : 0.1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill={color}
        stroke={glowColor}
        strokeWidth={active ? 3 : 1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.3,
          ease: "easeOut"
        }}
      />
      
      {/* Inner glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={size * 0.6}
        fill={glowColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Node title */}
      <motion.text
        x={x}
        y={y - 5}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize={active ? 10 : 8}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.3 + 0.3,
          ease: "easeOut"
        }}
      >
        {title}
      </motion.text>
      
      {/* Node date */}
      <motion.text
        x={x}
        y={y + 12}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize={7}
        fontFamily="SF Pro Display, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          duration: 0.5,
          delay: index * 0.3 + 0.4,
          ease: "easeOut"
        }}
      >
        {date}
      </motion.text>
    </g>
  );
};

// StoryPoint Component
const StoryPoint = ({ x, y, size, color, glowColor, icon, title, index, activeNode, narrative }) => {
  const isActive = narrative && narrative.node === index;
  
  return (
    <g>
      {/* Pulse animation for active node */}
      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={size * 1.5}
          fill={glowColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Main circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill={color}
        stroke={glowColor}
        strokeWidth={isActive ? 2 : 1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 2 + index * 0.2,
          ease: "easeOut"
        }}
      />
      
      {/* Inner circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size * 0.7}
        fill={isActive ? glowColor : color}
        stroke={glowColor}
        strokeWidth={1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 2.2 + index * 0.2,
          ease: "easeOut"
        }}
      />
      
      {/* Icon/Label */}
      <motion.text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize={size * 0.5}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 2.4 + index * 0.2,
          ease: "easeOut"
        }}
      >
        {icon}
      </motion.text>
      
      {/* Title */}
      <motion.text
        x={x}
        y={y + size + 12}
        textAnchor="middle"
        fill={isActive ? glowColor : colors.subtleCyan}
        fontSize={10}
        fontFamily="SF Pro Display, sans-serif"
        fontWeight="medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 2.6 + index * 0.2,
          ease: "easeOut"
        }}
      >
        {title}
      </motion.text>
    </g>
  );
};

// Background Grid Component
const BackgroundGrid = ({ width, height, spacing, opacity }) => {
  const lines = [];
  
  // Horizontal lines
  for (let y = spacing; y < height; y += spacing) {
    lines.push(
      <motion.line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={colors.subtleCyan}
        strokeWidth={0.5}
        opacity={opacity}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      />
    );
  }
  
  // Vertical lines
  for (let x = spacing; x < width; x += spacing) {
    lines.push(
      <motion.line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={colors.subtleCyan}
        strokeWidth={0.5}
        opacity={opacity}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      />
    );
  }
  
  return <g>{lines}</g>;
};

// Main Component
const InvestmentNarrative = () => {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [narrative, setNarrative] = useState(null);
  const [particles, setParticles] = useState([]);
  
  // Initialize background particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        x: Math.random() * 600,
        y: Math.random() * 400,
        size: 0.5 + Math.random() * 1.5,
        color: [colors.subtleCyan, colors.roseEnergy, colors.quantumViolet][Math.floor(Math.random() * 3)],
        delay: Math.random() * 2
      });
    }
    setParticles(newParticles);
  }, []);
  
  // Timeline data
  const timelineNodes = [
    {
      x: 120,
      y: 100,
      size: 20,
      color: colors.deepSpaceIndigo,
      glowColor: colors.roseEnergy,
      title: "FOUNDATION",
      date: "Q1 2025",
      description: "Establishing brand presence and launching initial revenue products"
    },
    {
      x: 240,
      y: 100,
      size: 20,
      color: colors.deepSpaceIndigo,
      glowColor: colors.subtleCyan,
      title: "ACCELERATION",
      date: "Q2-Q3 2025",
      description: "Expanding product lines and growing user base through strategic partnerships"
    },
    {
      x: 360,
      y: 100,
      size: 20,
      color: colors.deepSpaceIndigo,
      glowColor: colors.quantumViolet,
      title: "EXPANSION",
      date: "Q4 2025-Q1 2026",
      description: "Scaling operations and deepening market penetration with enhanced offerings"
    },
    {
      x: 480,
      y: 100,
      size: 20,
      color: colors.deepSpaceIndigo,
      glowColor: colors.dimensionalOrange,
      title: "EVOLUTION",
      date: "Q2-Q4 2026",
      description: "Leveraging established position to pioneer new dimensions of creative technology"
    }
  ];
  
  // Story point data
  const storyPoints = [
    // Foundation phase
    {
      x: 120,
      y: 200,
      size: 22,
      color: colors.dimensionalEggplant,
      glowColor: colors.roseEnergy,
      icon: "1",
      title: "INITIAL LAUNCH",
      node: 0,
      content: "Deployment of AI Branding Quiz and Interactive Fiction products establish immediate revenue and market presence."
    },
    {
      x: 120,
      y: 280,
      size: 22,
      color: colors.dimensionalEggplant,
      glowColor: colors.roseEnergy,
      icon: "2",
      title: "CONTENT SYSTEM",
      node: 0,
      content: "Implementation of our proprietary Content Intelligence System accelerates creative production by 3x."
    },
    
    // Acceleration phase
    {
      x: 240,
      y: 200,
      size: 22,
      color: colors.ultraIndigo,
      glowColor: colors.subtleCyan,
      icon: "3",
      title: "SUBSCRIPTION GROWTH",
      node: 1,
      content: "Transition to subscription-based model increases lifetime value and provides predictable revenue streams."
    },
    {
      x: 240,
      y: 280,
      size: 22,
      color: colors.ultraIndigo,
      glowColor: colors.subtleCyan,
      icon: "4",
      title: "ECOSYSTEM EXPANSION",
      node: 1,
      content: "Launch of complementary products creates a cohesive ecosystem that increases user retention and cross-selling."
    },
    
    // Expansion phase
    {
      x: 360,
      y: 200,
      size: 22,
      color: colors.quantumViolet,
      glowColor: colors.quantumViolet,
      icon: "5",
      title: "STRATEGIC PARTNERSHIPS",
      node: 2,
      content: "Alliances with key industry players expand market reach and unlock new distribution channels."
    },
    {
      x: 360,
      y: 280,
      size: 22,
      color: colors.quantumViolet,
      glowColor: colors.quantumViolet,
      icon: "6",
      title: "VISION PRO INNOVATION",
      node: 2,
      content: "Pioneering spatial computing experiences position us at the forefront of the Vision Pro ecosystem."
    },
    
    // Evolution phase
    {
      x: 480,
      y: 200,
      size: 22,
      color: colors.midnightRichness,
      glowColor: colors.dimensionalOrange,
      icon: "7",
      title: "GLOBAL EXPANSION",
      node: 3,
      content: "International growth and localization strategies open new markets and revenue opportunities."
    },
    {
      x: 480,
      y: 280,
      size: 22,
      color: colors.midnightRichness,
      glowColor: colors.dimensionalOrange,
      icon: "8",
      title: "ACQUISITION POTENTIAL",
      node: 3,
      content: "Position as an innovation leader in creative technology creates multiple exit pathways and partnership opportunities."
    }
  ];
  
  // Update narrative based on active timeline index
  useEffect(() => {
    setNarrative(null);
    
    // Animation delay before showing the narrative
    const timer = setTimeout(() => {
      setNarrative({
        node: null,
        content: timelineNodes[activeTimelineIndex].description
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeTimelineIndex]);
  
  // Show story point content
  const showStoryPoint = (index) => {
    setNarrative({
      node: index,
      content: storyPoints[index].content
    });
  };
  
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
        
        {/* Background grid */}
        <BackgroundGrid width={600} height={400} spacing={30} opacity={0.07} />
        
        {/* Background particles */}
        {particles.map((particle, index) => (
          <circle
            key={`particle-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={0.3}
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
          INVESTMENT NARRATIVE
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
          9BIT STUDIOS QUANTUM-SPATIAL GROWTH JOURNEY
        </motion.text>
        
        {/* Timeline progression */}
        <motion.rect
          x="100"
          y="130"
          width="400"
          height="3"
          fill={colors.deepSpaceIndigo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: "easeOut"
          }}
        />
        
        {/* Timeline progress indicator */}
        <motion.rect
          x="100"
          y="130"
          width={(activeTimelineIndex + 1) * 120 - 20}
          height="3"
          fill={timelineNodes[activeTimelineIndex].glowColor}
          initial={{ width: 0 }}
          animate={{ width: (activeTimelineIndex + 1) * 120 - 20 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
        
        {/* Timeline nodes */}
        {timelineNodes.map((node, index) => (
          <TimelineNode
            key={`timeline-${index}`}
            x={node.x}
            y={node.y}
            size={node.size}
            color={node.color}
            glowColor={node.glowColor}
            title={node.title}
            date={node.date}
            description={node.description}
            index={index}
            active={activeTimelineIndex === index}
            setActive={setActiveTimelineIndex}
          />
        ))}
        
        {/* Story points */}
        {storyPoints
          .filter(point => point.node === activeTimelineIndex)
          .map((point, index) => (
            <g key={`story-${index}`} onClick={() => showStoryPoint(storyPoints.findIndex(p => p.x === point.x && p.y === point.y))}>
              <StoryPoint
                x={point.x}
                y={point.y}
                size={point.size}
                color={point.color}
                glowColor={point.glowColor}
                icon={point.icon}
                title={point.title}
                index={index}
                activeNode={activeTimelineIndex}
                narrative={narrative}
              />
            </g>
          ))}
        
        {/* Narrative panel */}
        {narrative && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <rect
              x="100"
              y="340"
              width="400"
              height="40"
              rx="5"
              fill={colors.deepSpaceIndigo}
              stroke={narrative.node !== null 
                     ? storyPoints[narrative.node].glowColor 
                     : timelineNodes[activeTimelineIndex].glowColor}
              strokeWidth="1"
              opacity="0.9"
            />
            
            <text
              x="300"
              y="363"
              textAnchor="middle"
              fill="white"
              fontSize={11}
              fontFamily="SF Pro Display, sans-serif"
              fontWeight="medium"
            >
              {narrative.content}
            </text>
            
            <text
              x="300"
              y="380"
              textAnchor="middle"
              fill={colors.subtleCyan}
              fontSize={9}
              fontFamily="SF Pro Display, sans-serif"
              opacity="0.7"
            >
              {narrative.node !== null 
               ? "Click another milestone to explore different story points" 
               : "Click any numbered milestone to explore story points"}
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
};

export default InvestmentNarrative;
