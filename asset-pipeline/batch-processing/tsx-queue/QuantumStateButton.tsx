import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuantumStateButton({
  children = "Quantum Button",
  variant = "primary",
  size = "medium",
  onClick,
  initialState = "heritage"
}) {
  const [state, setState] = useState(initialState);
  const [isHovering, setIsHovering] = useState(false);

  // Define color schemes based on variant
  const colorSchemes = {
    primary: {
      heritage: { bg: '#2C5F2D', text: '#fff' },
      transitional: { bg: '#331F4A', text: '#fff' },
      quantum: { bg: '#6A3093', text: '#fff' }
    },
    secondary: {
      heritage: { bg: 'transparent', text: '#2C5F2D', border: '#2C5F2D' },
      transitional: { bg: 'transparent', text: '#331F4A', border: '#331F4A' },
      quantum: { bg: 'transparent', text: '#6A3093', border: '#6A3093' }
    },
    accent: {
      heritage: { bg: '#3DFF74', text: '#0A0621' },
      transitional: { bg: '#5AC8FA', text: '#0A0621' },
      quantum: { bg: '#BF4080', text: '#fff' }
    }
  };

  // Define size properties
  const sizeProps = {
    small: { padding: 'px-3 py-1', fontSize: 'text-sm' },
    medium: { padding: 'px-4 py-2', fontSize: 'text-base' },
    large: { padding: 'px-6 py-3', fontSize: 'text-lg' }
  };

  // Get current color scheme
  const colorScheme = colorSchemes[variant][state];

  // Handle click with state transition
  const handleClick = (e) => {
    // Cycle through states: heritage -> transitional -> quantum -> heritage
    const states = ['heritage', 'transitional', 'quantum'];
    const currentIndex = states.indexOf(state);
    const nextIndex = (currentIndex + 1) % states.length;
    setState(states[nextIndex]);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      className={`rounded-lg font-medium relative overflow-hidden ${sizeProps[size].padding} ${sizeProps[size].fontSize}`}
      style={{
        backgroundColor: colorScheme.bg,
        color: colorScheme.text,
        border: variant === 'secondary' ? `2px solid ${colorScheme.border}` : 'none'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Dimensional Grid Overlay */}
      <div className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '15px 15px',
          opacity: 0.1
        }}
      />

      {/* Energy Effects based on state */}
      {state === 'transitional' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${variant === 'secondary' ? colorScheme.text + '30' : colorScheme.bg + '50'}, transparent)`,
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['100% 0%', '0% 0%', '100% 0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />
      )}

      {state === 'quantum' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 0.5 : 0.3 }}
        >
          {/* Particle effects */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -10, 0, 10, 0],
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1, 0.5, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* State indicator */}
      <div className="absolute bottom-0 left-0 h-1 w-full flex">
        <div
          className="h-full"
          style={{
            width: '33.33%',
            backgroundColor: state === 'heritage' ? '#3DFF74' : 'rgba(255,255,255,0.2)'
          }}
        />
        <div
          className="h-full"
          style={{
            width: '33.33%',
            backgroundColor: state === 'transitional' ? '#5AC8FA' : 'rgba(255,255,255,0.2)'
          }}
        />
        <div
          className="h-full"
          style={{
            width: '33.33%',
            backgroundColor: state === 'quantum' ? '#BF4080' : 'rgba(255,255,255,0.2)'
          }}
        />
      </div>
    </motion.button>
  );
}