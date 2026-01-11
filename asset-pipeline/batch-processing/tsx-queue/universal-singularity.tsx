import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const UniversalSingularityInterface = () => {
  const canvasRef = useRef(null);
  const [isActivated, setIsActivated] = useState(false);
  
  // Quantum-spatial color palette
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

  // Design elements
  const designElements = [
    {
      title: "Perfect Geometric Forms",
      description: "Quantum-spatial color palette with illuminated edges and dimensional grid overlays",
      color: colors.subtleCyan
    },
    {
      title: "Code-like Structures",
      description: "Code snippets immersed in the atmosphere, plotting universal architecture",
      color: colors.roseEnergy
    },
    {
      title: "Energy Flow Connections",
      description: "Color-coded connections with pulsing data particles and dimensional depth",
      color: colors.quantumViolet
    },
    {
      title: "Quantum Particle Effects",
      description: "Animated particles with varying opacity creating dimensional depth",
      color: colors.heritagePink
    }
  ];

  // Matrix background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    
    // Generate random characters
    const getRandomChar = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>[]{}()/*-+?!@#$%^&*=';
      return chars.charAt(Math.floor(Math.random() * chars.length));
    };

    // Animation loop
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 6, 33, 0.05)'; // Almost transparent voidBlack
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.subtleCyan + '40'; // Subtle cyan with opacity
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = getRandomChar();
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };
    
    draw();

    // Clean up
    return () => {
      cancelAnimationFrame(draw);
    };
  }, []);

  // Code snippets
  const codeSnippets = [
    'interface Quantum<T> extends Dimensional {',
    '  createPortal(universe: Universe): Promise<void>;',
    '  connectRealms(source: Dimension[], target: Dimension[]): void;',
    '  weaveReality(fabric: QuantumFabric): Reality;',
    '}',
    '',
    'async function initiateSingularity() {',
    '  const core = await Singularity.initialize();',
    '  const universe = Universe.createFromCore(core);',
    '  await universe.expandDimensions(9);',
    '  return universe;',
    '}',
    '',
    'function balanceQuantumState(pixel: Pixel) {',
    '  const edges = pixel.getEdges();',
    '  const improbability = calculateImprobability(edges);',
    '  const singularity = new Singularity(improbability);',
    '  return singularity.weaveQuantumFabric(pixel);',
    '}',
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: colors.voidBlack }}>
      {/* Matrix background */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Grid system */}
      <div className="absolute inset-0">
        {/* Horizontal grid lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={`h-${i}`} 
            className="absolute left-0 right-0 h-px" 
            style={{ 
              top: `${(i + 1) * 5}%`, 
              background: colors.subtleCyan,
              opacity: 0.1
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Vertical grid lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={`v-${i}`} 
            className="absolute top-0 bottom-0 w-px" 
            style={{ 
              left: `${(i + 1) * 5}%`, 
              background: colors.subtleCyan,
              opacity: 0.1
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Central interface */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '700px', height: '700px' }}>
          {/* Title */}
          <motion.h1 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 text-3xl font-bold text-center z-50"
            style={{ color: colors.subtleCyan }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Universal Singularity Interface
          </motion.h1>
          
          {/* Central singularity */}
          <motion.div 
            className="absolute top-1/2 left-1/2 rounded-full z-40"
            style={{ 
              width: isActivated ? '150px' : '80px', 
              height: isActivated ? '150px' : '80px',
              background: `radial-gradient(circle, white, ${colors.subtleCyan})`,
              boxShadow: `0 0 40px ${colors.subtleCyan}`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                `0 0 40px ${colors.subtleCyan}`,
                `0 0 60px ${colors.subtleCyan}`,
                `0 0 40px ${colors.subtleCyan}`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => setIsActivated(!isActivated)}
          />
          
          {/* Design elements */}
          {designElements.map((element, index) => {
            const angle = (index * Math.PI / 2);
            const radius = 300;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={element.title}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  opacity: isActivated ? 1 : 0,
                  pointerEvents: isActivated ? 'auto' : 'none'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isActivated ? 1 : 0,
                  scale: isActivated ? 1 : 0.8,
                  x: isActivated ? 0 : (Math.random() - 0.5) * 20,
                  y: isActivated ? 0 : (Math.random() - 0.5) * 20
                }}
                transition={{ 
                  duration: 0.8,
                  delay: isActivated ? index * 0.2 : 0
                }}
              >
                {/* Element node */}
                <motion.div
                  className="flex flex-col items-center justify-center w-48 p-4 rounded-lg"
                  style={{ 
                    background: `radial-gradient(circle, ${element.color}60, ${element.color}20)`,
                    boxShadow: `0 0 15px ${element.color}80`,
                    backdropFilter: 'blur(8px)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-lg font-bold mb-1 text-center" style={{ color: element.color }}>
                    {element.title}
                  </h3>
                  <p className="text-xs text-center text-white opacity-80">
                    {element.description}
                  </p>
                </motion.div>
                
                {/* Connecting line to center */}
                <motion.div 
                  className="absolute top-1/2 right-full h-1 origin-right"
                  style={{ 
                    background: `linear-gradient(to left, ${element.color}, transparent)`,
                    boxShadow: `0 0 8px ${element.color}`,
                    width: radius,
                    transform: `rotate(${angle + Math.PI}rad) translateY(-50%)`,
                    opacity: 0.7,
                    zIndex: -1
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Data particles along connection */}
                {isActivated && Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={`particle-${index}-${i}`}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: element.color,
                      width: 3 + (Math.random() * 4),
                      height: 3 + (Math.random() * 4),
                      boxShadow: `0 0 5px ${element.color}`,
                      top: '50%',
                      right: '100%',
                      marginTop: -2,
                      zIndex: 10
                    }}
                    animate={{
                      right: [`100%`, `${-radius}px`],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.6
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
          
          {/* Quantum particles */}
          {isActivated && Array.from({ length: 50 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 250;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 1 + Math.random() * 4;
            
            // Randomly select a color from the design elements
            const particleColor = designElements[Math.floor(Math.random() * designElements.length)].color;
            
            return (
              <motion.div
                key={`quantum-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  backgroundColor: particleColor,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 2}px ${particleColor}`,
                  top: '50%',
                  left: '50%',
                  marginLeft: x,
                  marginTop: y,
                  opacity: 0.7,
                  zIndex: 30
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 50, 0],
                  y: [0, (Math.random() - 0.5) * 50, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Code snippets */}
          <div className="absolute bottom-0 right-0 font-mono text-xs opacity-50 max-w-xs overflow-hidden pointer-events-none">
            {codeSnippets.map((line, i) => (
              <motion.div 
                key={i} 
                style={{ color: line.includes('interface') || line.includes('function') ? colors.roseEnergy : colors.subtleCyan }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isActivated ? 0.8 : 0,
                  x: isActivated ? 0 : 20
                }}
                transition={{ 
                  duration: 0.5,
                  delay: isActivated ? 0.5 + (i * 0.03) : 0
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
          
          {/* Activation call to action */}
          {!isActivated && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer z-50"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => setIsActivated(true)}
            >
              <div className="text-lg font-bold mb-2" style={{ color: colors.subtleCyan }}>
                Click to Activate Portal
              </div>
              <div className="text-sm opacity-80 text-white">
                Initiate Universal Singularity Interface
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Interface instructions */}
      {isActivated && (
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="text-sm font-medium" style={{ color: colors.subtleCyan }}>
            Universal Singularity Interface Activated
          </div>
          <div className="text-xs opacity-70 text-white mt-1">
            Explore each design element to uncover the depths of the quantum-spatial system
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UniversalSingularityInterface;