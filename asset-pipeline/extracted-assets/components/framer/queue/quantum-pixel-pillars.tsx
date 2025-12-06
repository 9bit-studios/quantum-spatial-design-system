import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const QuantumPixelPillars = () => {
  const [hover, setHover] = useState(null);
  
  // Color palette based on quantum-spatial aesthetic
  const colors = {
    voidBlack: "#0A0621",
    deepSpaceIndigo: "#131A36",
    dimensionalEggplant: "#331F4A",
    quantumViolet: "#6A3093",
    subtleCyan: "#5AC8FA",
    roseEnergy: "#BF4080",
    heritagePink: "#FF2D55"
  };

  // The four pillars of the 9Bit Universe
  const pillars = [
    {
      name: "Possibility Thinking",
      description: "A universe of endless possibilities, fueled by wonder and inspiration",
      color: colors.subtleCyan,
      particles: 18
    },
    {
      name: "User Respect",
      description: "Privacy and agency through transparent, thoughtful design",
      color: colors.roseEnergy,
      particles: 22
    },
    {
      name: "Creative Ingenuity",
      description: "Multidimensional perspectives transforming obstacles into opportunities",
      color: colors.quantumViolet,
      particles: 16
    },
    {
      name: "Sustainable Creation",
      description: "Collaborative practices preventing burnout, prioritizing quality",
      color: colors.heritagePink,
      particles: 20
    }
  ];

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-voidBlack to-deepSpaceIndigo overflow-hidden" style={{ background: `linear-gradient(to bottom, ${colors.voidBlack}, ${colors.deepSpaceIndigo})` }}>
      {/* Grid system */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-subtleCyan" style={{ top: `${(i + 1) * 5}%`, background: colors.subtleCyan }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-subtleCyan" style={{ left: `${(i + 1) * 5}%`, background: colors.subtleCyan }} />
        ))}
      </div>

      {/* Central singularity */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full"
        style={{ 
          background: `radial-gradient(circle, white, ${colors.subtleCyan})`,
          boxShadow: `0 0 30px ${colors.subtleCyan}, 0 0 60px ${colors.subtleCyan}`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pillars */}
      {pillars.map((pillar, index) => {
        const angle = (index * Math.PI / 2) - Math.PI / 4; // Distribute at 45°, 135°, 225°, 315°
        const x = Math.cos(angle) * 200;
        const y = Math.sin(angle) * 200;
        
        return (
          <div key={pillar.name} className="absolute" style={{ top: '50%', left: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
            {/* Connecting line to center */}
            <motion.div 
              className="absolute top-1/2 left-1/2 h-1 origin-left"
              style={{ 
                background: pillar.color,
                boxShadow: `0 0 8px ${pillar.color}`,
                width: Math.sqrt(x*x + y*y),
                transform: `rotate(${Math.atan2(y, x)}rad) translateY(-50%)`,
                opacity: 0.7,
                zIndex: 1
              }}
            />
            
            {/* Pillar node */}
            <motion.div
              className="relative flex flex-col items-center justify-center w-32 h-32 rounded-lg cursor-pointer"
              style={{ 
                background: `radial-gradient(circle, ${pillar.color}40, ${pillar.color}80)`,
                boxShadow: `0 0 15px ${pillar.color}`,
                backdropFilter: 'blur(4px)',
                zIndex: 2
              }}
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="text-center text-white">
                <h3 className="text-lg font-bold mb-1">{pillar.name}</h3>
                <p className={`text-xs transition-opacity duration-300 ${hover === index ? 'opacity-100' : 'opacity-0'}`}>
                  {pillar.description}
                </p>
              </div>
            </motion.div>
            
            {/* Particles */}
            {Array.from({ length: pillar.particles }).map((_, i) => {
              const particleAngle = Math.random() * Math.PI * 2;
              const distance = 20 + Math.random() * 60;
              const pX = Math.cos(particleAngle) * distance;
              const pY = Math.sin(particleAngle) * distance;
              const size = 1 + Math.random() * 2;
              
              return (
                <motion.div
                  key={`particle-${index}-${i}`}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: pillar.color,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: `0 0 ${size * 2}px ${pillar.color}`,
                    top: '50%',
                    left: '50%',
                    marginLeft: pX,
                    marginTop: pY,
                    opacity: 0.6 + Math.random() * 0.4
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 20, 0],
                    y: [0, (Math.random() - 0.5) * 20, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
        );
      })}
      
      {/* Code-like structures */}
      <div className="absolute bottom-4 right-4 font-mono text-xs text-subtleCyan opacity-30 pointer-events-none">
        <div>initQuantumPixel(4);</div>
        <div>connectDimensions();</div>
        <div>balanceState(singularity.core);</div>
        <div>weaveReality(universe.fabric);</div>
      </div>
    </div>
  );
};

export default QuantumPixelPillars;