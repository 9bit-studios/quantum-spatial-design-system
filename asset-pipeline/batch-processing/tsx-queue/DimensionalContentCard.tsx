import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DimensionalContentCard({
  title = "Content Title",
  description = "This is a description of the content item showing the quantum-spatial aesthetic.",
  category = "article", // article, video, interactive, project
  image = null,
  initialState = "heritage" // heritage, transitional, quantum
}) {
  const [state, setState] = useState(initialState);

  // Category-specific properties
  const categoryProps = {
    article: {
      icon: '📝',
      color: '#5AC8FA',
      stateColors: {
        heritage: '#2C5F2D',
        transitional: '#331F4A',
        quantum: '#6A3093'
      }
    },
    video: {
      icon: '🎬',
      color: '#BF4080',
      stateColors: {
        heritage: '#1B3D1A',
        transitional: '#131A36',
        quantum: '#0A0621'
      }
    },
    interactive: {
      icon: '🎮',
      color: '#FF2D55',
      stateColors: {
        heritage: '#3D8B40',
        transitional: '#126D71',
        quantum: '#613FE7'
      }
    },
    project: {
      icon: '📊',
      color: '#29B6F6',
      stateColors: {
        heritage: '#2C5F2D',
        transitional: '#126D71',
        quantum: '#FF6B6B'
      }
    }
  };

  // Get current category
  const currentCategory = categoryProps[category] || categoryProps.article;

  // State-specific properties
  const stateProps = {
    heritage: {
      borderRadius: 'rounded-md',
      shadowSize: 'shadow-md',
      transform: 'scale(1)',
      textureOpacity: 0.1,
    },
    transitional: {
      borderRadius: 'rounded-lg',
      shadowSize: 'shadow-lg',
      transform: 'scale(1.02)',
      textureOpacity: 0.15,
    },
    quantum: {
      borderRadius: 'rounded-xl',
      shadowSize: 'shadow-xl',
      transform: 'scale(1.05)',
      textureOpacity: 0.2,
    }
  };

  // Get current state properties
  const currentState = stateProps[state];

  // Handle click to transition between states
  const handleClick = () => {
    // Cycle through states: heritage -> transitional -> quantum -> heritage
    const states = ['heritage', 'transitional', 'quantum'];
    const currentIndex = states.indexOf(state);
    const nextIndex = (currentIndex + 1) % states.length;
    setState(states[nextIndex]);
  };

  return (
    <motion.div
      className={`w-full overflow-hidden ${currentState.borderRadius} ${currentState.shadowSize} cursor-pointer`}
      style={{
        backgroundColor: currentCategory.stateColors[state],
        boxShadow: `0 4px 20px ${currentCategory.color}40`
      }}
      animate={{ scale: currentState.transform }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      whileHover={{ y: -5 }}
    >
      {/* Card Header/Image */}
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(45deg, ${currentCategory.stateColors[state]}, ${currentCategory.color}80)`
            }}
          >
            <span className="text-5xl">{currentCategory.icon}</span>
          </div>
        )}

        {/* Dimensional Grid Overlay */}
        <div className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '20px 20px',
            opacity: currentState.textureOpacity
          }}
        />

        {/* Category Tag */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: currentCategory.color,
            color: '#0A0621'
          }}
        >
          {category}
        </div>

        {/* State Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex">
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
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>

        {/* State-specific effects */}
        {state === 'transitional' && (
          <motion.div
            className="w-16 h-1 mt-3 rounded-full"
            style={{ backgroundColor: currentCategory.color }}
            animate={{ width: ['30%', '60%', '30%'] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        )}

        {state === 'quantum' && (
          <div className="flex mt-3 space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div 
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentCategory.color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}