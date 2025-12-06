import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuantumRoles = () => {
  const [activeSection, setActiveSection] = useState('multi-state');
  
  // Color palette based on quantum-spatial aesthetic
  const colors = {
    voidBlack: "#0A0621",
    deepSpaceIndigo: "#131A36",
    dimensionalEggplant: "#331F4A",
    quantumViolet: "#6A3093",
    subtleCyan: "#5AC8FA",
    roseEnergy: "#BF4080",
    heritagePink: "#FF2D55",
    dimensionalTeal: "#126D71",
    heritageGreen: "#3DFF74"
  };

  const sections = {
    'multi-state': {
      title: 'Multi-State Identities',
      color: colors.subtleCyan,
      elements: [
        'Specialist & Generalist Transitions',
        'Context-Based Leadership',
        'Dynamic Skill Portfolio',
        'Flexible Role Architecture'
      ]
    },
    'non-linear': {
      title: 'Non-Linear Growth',
      color: colors.roseEnergy,
      elements: [
        'Depth Pathways',
        'Breadth Pathways',
        'Balanced Recognition',
        'Multi-dimensional Reviews'
      ]
    },
    'edge': {
      title: 'Distributed Wisdom',
      color: colors.heritageGreen,
      elements: [
        'Edge Decision-Making',
        'Guided Protocols',
        'Autonomous Spaces',
        'Strategic Alignment'
      ]
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: `linear-gradient(45deg, ${colors.voidBlack}, ${colors.deepSpaceIndigo})` }}>
      {/* Dimensional grid */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute left-0 right-0 h-px" 
            style={{ 
              top: `${(i + 1) * 5}%`, 
              background: colors.subtleCyan,
              transform: `perspective(1000px) rotateX(${70}deg)`,
              transformOrigin: 'center'
            }} 
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute top-0 bottom-0 w-px" 
            style={{ 
              left: `${(i + 1) * 5}%`, 
              background: colors.subtleCyan,
              transform: `perspective(1000px) rotateY(${15}deg)`,
              transformOrigin: 'center'
            }} 
          />
        ))}
      </div>

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Title */}
        <motion.h1 
          className="text-white text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Quantum Roles: Shifting States, Evolving Paths
        </motion.h1>

        {/* Main visualization */}
        <div className="relative w-3/4 max-w-4xl aspect-video rounded-lg overflow-hidden backdrop-blur-sm" style={{ 
          background: `radial-gradient(circle at center, ${colors.dimensionalEggplant}90, ${colors.deepSpaceIndigo}90)`,
          boxShadow: `0 0 20px ${colors.dimensionalEggplant}40`
        }}>
          {/* Navigation tabs */}
          <div className="flex justify-center space-x-4 mb-4 relative z-10 p-4">
            {Object.keys(sections).map(section => (
              <motion.button
                key={section}
                className="px-4 py-2 rounded-md text-white font-medium"
                style={{ 
                  backgroundColor: activeSection === section ? sections[section].color + '40' : 'transparent',
                  borderBottom: `2px solid ${activeSection === section ? sections[section].color : 'transparent'}`
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSectionClick(section)}
              >
                {sections[section].title}
              </motion.button>
            ))}
          </div>

          {/* Content area */}
          <div className="p-8 h-full">
            {/* Visualization for active section */}
            <motion.div 
              className="relative h-full flex flex-col justify-center"
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Content title */}
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: sections[activeSection].color }}>
                {sections[activeSection].title}
              </h2>

              {/* Visualization specific to each section */}
              {activeSection === 'multi-state' && (
                <div className="flex justify-center items-center h-48">
                  {/* Person in center */}
                  <motion.div 
                    className="z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ 
                      background: `radial-gradient(circle, ${colors.subtleCyan}90, ${colors.subtleCyan}60)`,
                      boxShadow: `0 0 10px ${colors.subtleCyan}`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        `0 0 10px ${colors.subtleCyan}`,
                        `0 0 15px ${colors.subtleCyan}`,
                        `0 0 10px ${colors.subtleCyan}`
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    9B
                  </motion.div>
                  
                  {/* State orbitals */}
                  {sections[activeSection].elements.map((element, i) => {
                    const angle = (i * Math.PI / 2);
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={element}
                        className="absolute flex items-center justify-center"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        }}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 10, 0],
                          y: [0, (Math.random() - 0.5) * 10, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div 
                          className="absolute w-px h-px"
                          style={{
                            background: 'transparent',
                            boxShadow: `0 0 60px 60px ${colors.subtleCyan}20`,
                          }}
                        />
                        <motion.div
                          className="z-20 px-3 py-2 rounded-lg text-white text-sm text-center"
                          style={{ 
                            background: `${colors.subtleCyan}80`,
                            width: '120px',
                            backdropFilter: 'blur(4px)'
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {element}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Connecting lines */}
                  {sections[activeSection].elements.map((element, i) => {
                    const angle = (i * Math.PI / 2);
                    const radius = 120;
                    
                    return (
                      <motion.div
                        key={`line-${i}`}
                        className="absolute top-1/2 left-1/2 h-px origin-left z-5"
                        style={{ 
                          background: `linear-gradient(to right, ${colors.subtleCyan}, transparent)`,
                          boxShadow: `0 0 4px ${colors.subtleCyan}`,
                          width: radius,
                          transform: `rotate(${angle}rad) translateY(-50%)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    );
                  })}
                </div>
              )}
              
              {activeSection === 'non-linear' && (
                <div className="flex items-center justify-center h-48">
                  {/* Growth paths visualization */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Base point */}
                    <motion.div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full"
                      style={{ 
                        background: colors.roseEnergy,
                        boxShadow: `0 0 10px ${colors.roseEnergy}`
                      }}
                    />
                    
                    {/* Path lines */}
                    {sections[activeSection].elements.map((element, i) => {
                      const baseAngle = -Math.PI/2; // Start from bottom center
                      const spreadAngle = Math.PI/3; // How wide to spread the paths
                      const angle = baseAngle + (i - 1.5) * spreadAngle/2; // Calculate angle for this path
                      const length = 180 - Math.abs(i - 1.5) * 30; // Make middle paths longer
                      
                      return (
                        <React.Fragment key={element}>
                          {/* The path line */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 h-px origin-bottom"
                            style={{ 
                              background: `linear-gradient(${angle + Math.PI}rad, ${colors.roseEnergy}, transparent)`,
                              boxShadow: `0 0 4px ${colors.roseEnergy}`,
                              width: length,
                              transform: `translateX(-50%) rotate(${angle}rad)`,
                            }}
                            animate={{
                              opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2
                            }}
                          />
                          
                          {/* The element label */}
                          <motion.div
                            className="absolute px-3 py-1 rounded-lg text-white text-sm"
                            style={{ 
                              background: `${colors.roseEnergy}80`,
                              width: '120px',
                              backdropFilter: 'blur(4px)',
                              bottom: 0,
                              left: '50%',
                              transform: `translate(-50%, -${Math.sin(angle) * length}px) translate(${Math.cos(angle) * length}px, 0) translate(-50%, -100%)`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            animate={{
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.5
                            }}
                          >
                            {element}
                          </motion.div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activeSection === 'edge' && (
                <div className="flex items-center justify-center h-48">
                  {/* Center singularity */}
                  <motion.div 
                    className="absolute w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `radial-gradient(circle, ${colors.heritageGreen}90, ${colors.heritageGreen}40)`,
                      boxShadow: `0 0 20px ${colors.heritageGreen}`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        `0 0 15px ${colors.heritageGreen}`,
                        `0 0 25px ${colors.heritageGreen}`,
                        `0 0 15px ${colors.heritageGreen}`
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white font-bold">Core</span>
                  </motion.div>
                  
                  {/* Edge nodes */}
                  {sections[activeSection].elements.map((element, i) => {
                    const angle = (i * Math.PI / 2);
                    const radius = 130;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={element}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        }}
                      >
                        {/* Energy connection */}
                        <motion.div 
                          className="absolute top-1/2 left-1/2 h-1 origin-left"
                          style={{ 
                            background: `linear-gradient(to right, ${colors.heritageGreen}, transparent)`,
                            boxShadow: `0 0 8px ${colors.heritageGreen}`,
                            width: radius,
                            transform: `rotate(${angle + Math.PI}rad) translateY(-50%)`,
                            opacity: 0.7,
                            zIndex: 1
                          }}
                          animate={{
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        />
                        
                        {/* Edge node */}
                        <motion.div
                          className="z-20 px-3 py-2 rounded-lg text-white text-sm text-center"
                          style={{ 
                            background: `${colors.heritageGreen}80`,
                            width: '120px',
                            backdropFilter: 'blur(4px)'
                          }}
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                        >
                          {element}
                        </motion.div>
                        
                        {/* Data particles along connection */}
                        {Array.from({ length: 3 }).map((_, j) => (
                          <motion.div
                            key={`particle-${i}-${j}`}
                            className="absolute rounded-full w-2 h-2"
                            style={{
                              background: colors.heritageGreen,
                              boxShadow: `0 0 5px ${colors.heritageGreen}`,
                              top: '50%',
                              left: '50%',
                              marginLeft: -radius * (j + 1) / 4,
                              marginTop: 0,
                              zIndex: 5
                            }}
                            animate={{
                              x: [0, radius, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: j * 0.6
                            }}
                          />
                        ))}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Code-like structure */}
      <div className="absolute top-4 left-4 font-mono text-xs opacity-30 pointer-events-none" style={{ color: colors.subtleCyan }}>
        <div>initQuantumRoles();</div>
        <div>enableMultiState(team.members);</div>
        <div>buildNonLinearPaths();</div>
        <div>distributeWisdom(edge.computing);</div>
      </div>
    </div>
  );
};

export default QuantumRoles;