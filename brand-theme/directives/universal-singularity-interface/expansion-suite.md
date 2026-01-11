# Universal Singularity Interface Core Component Set Expansion

Status: Draft
Author: Penny Platt
Last edited time: April 30, 2025 11:50 PM
Review needed: No
AI custom autofill: Resource Category: Design DocumentationDoc Type: New Design DocumentResource Type: Draft
Is a Section: No
Overview: This document outlines design principles, asset generation strategies, and appendices for effective collaboration and management in design projects.
Research Methods: Data Analysis, Insight Generation
Social Platforms: CreativeNetwork

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

</aside>

## Quantum Portal Navigation

This component creates dimensional gateways to different areas of your ecosystem, each pulsing with realm-specific energy.

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuantumPortalNavigation() {
  const [activeRealm, setActiveRealm] = useState(null);

  const realms = [
    { id: 'spirit', name: 'Spirit Realm', color: '#6A3093', icon: '✧' },
    { id: 'mortal', name: 'Mortal Realm', color: '#131A36', icon: '◆' },
    { id: 'quantum', name: 'Quantum Realm', color: '#BF4080', icon: '⟡' }
  ];

  return (
    <div className="w-full p-6 bg-gray-900 rounded-xl">
      <div className="grid grid-cols-3 gap-4">
        {realms.map((realm) => (
          <motion.div
            key={realm.id}
            className="flex flex-col items-center justify-center h-40 rounded-lg relative overflow-hidden cursor-pointer"
            style={{ background: `linear-gradient(45deg, #0A0621, ${realm.color})` }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveRealm(activeRealm === realm.id ? null : realm.id)}
          >
            {/* Dimensional Grid */}
            <div className="absolute inset-0 w-full h-full"
                 style={{
                   backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
                   backgroundSize: '50px 50px',
                   opacity: 0.15
                 }}
            />

            {/* Energy Particle Effects */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                background: activeRealm === realm.id
                  ? `radial-gradient(circle, ${realm.color}80 0%, transparent 70%)`
                  : `radial-gradient(circle, ${realm.color}40 0%, transparent 50%)`
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Portal Icon */}
            <motion.div
              className="text-4xl mb-2 z-10"
              animate={{
                scale: activeRealm === realm.id ? [1, 1.2, 1] : 1,
                opacity: activeRealm === realm.id ? [0.7, 1, 0.7] : 0.7
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {realm.icon}
            </motion.div>

            {/* Portal Name */}
            <h3 className="text-white text-lg font-medium z-10">{realm.name}</h3>

            {/* Active State Indicators */}
            {activeRealm === realm.id && (
              <motion.div
                className="absolute inset-0 border-2 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, borderColor: realm.color }}
                style={{ boxShadow: `0 0 15px ${realm.color}` }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

```

## Edge Computing Visualization

This visualization demonstrates your edge computing concept with data flowing between decision nodes.

```jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EdgeComputingVisualization() {
  const canvasRef = useRef(null);
  const nodes = [
    { id: 'central', x: 50, y: 50, type: 'central', size: 20, color: '#131A36' },
    { id: 'edge1', x: 20, y: 30, type: 'edge', size: 14, color: '#6A3093' },
    { id: 'edge2', x: 80, y: 30, type: 'edge', size: 14, color: '#6A3093' },
    { id: 'edge3', x: 20, y: 70, type: 'edge', size: 14, color: '#6A3093' },
    { id: 'edge4', x: 80, y: 70, type: 'edge', size: 14, color: '#6A3093' },
    { id: 'data1', x: 10, y: 15, type: 'data', size: 8, color: '#5AC8FA' },
    { id: 'data2', x: 90, y: 15, type: 'data', size: 8, color: '#5AC8FA' },
    { id: 'data3', x: 10, y: 85, type: 'data', size: 8, color: '#5AC8FA' },
    { id: 'data4', x: 90, y: 85, type: 'data', size: 8, color: '#5AC8FA' }
  ];

  // Lines connecting nodes
  const connections = [
    { from: 'central', to: 'edge1' },
    { from: 'central', to: 'edge2' },
    { from: 'central', to: 'edge3' },
    { from: 'central', to: 'edge4' },
    { from: 'edge1', to: 'data1' },
    { from: 'edge2', to: 'data2' },
    { from: 'edge3', to: 'data3' },
    { from: 'edge4', to: 'data4' }
  ];

  // Animation for data particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Resize canvas to fit container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Convert percentage to actual coordinates
    const getCoords = (node) => {
      return {
        x: (node.x / 100) * canvas.width,
        y: (node.y / 100) * canvas.height,
        size: node.size
      };
    };

    // Create initial particles
    function createParticle(fromNode, toNode) {
      const from = getCoords(nodes.find(n => n.id === fromNode));
      const to = getCoords(nodes.find(n => n.id === toNode));

      return {
        x: from.x,
        y: from.y,
        toX: to.x,
        toY: to.y,
        size: 3,
        speed: 0.02,
        progress: 0,
        color: '#5AC8FA'
      };
    }

    // Generate new particles periodically
    setInterval(() => {
      const randomConnection = connections[Math.floor(Math.random() * connections.length)];
      particles.push(createParticle(randomConnection.from, randomConnection.to));
    }, 1000);

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(conn => {
        const from = getCoords(nodes.find(n => n.id === conn.from));
        const to = getCoords(nodes.find(n => n.id === conn.to));

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(90, 200, 250, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const {x, y, size} = getCoords(node);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(x, y, size + 5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, size, x, y, size + 5);
        gradient.addColorStop(0, `${node.color}80`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position
        p.progress += p.speed;
        p.x = p.x + (p.toX - p.x) * p.speed;
        p.y = p.y + (p.toY - p.y) * p.speed;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Remove if reached destination
        if (Math.abs(p.x - p.toX) < 1 && Math.abs(p.y - p.toY) < 1) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden relative p-4">
      <h3 className="text-white text-lg font-medium mb-2 z-10 relative">Edge Computing Flow</h3>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

```

## Creative Singularity Dashboard

A unified interface showing your creative ecosystem with the singularity at its core.

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CreativeSingularityDashboard() {
  const [pulsing, setPulsing] = useState(false);

  // Creative metrics
  const metrics = [
    { id: 'assets', name: 'Assets Created', value: 243, color: '#5AC8FA' },
    { id: 'projects', name: 'Active Projects', value: 12, color: '#BF4080' },
    { id: 'engagement', name: 'User Engagement', value: '89%', color: '#6A3093' },
    { id: 'revenue', name: 'Revenue Growth', value: '+32%', color: '#29B6F6' }
  ];

  // Activity feed
  const activities = [
    { id: 1, user: 'Arthur', action: 'activated Character Forge', time: '14m ago' },
    { id: 2, user: 'System', action: 'processed 23 new assets', time: '28m ago' },
    { id: 3, user: 'Penny', action: 'published Brand Quiz update', time: '1h ago' }
  ];

  // Pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-6 bg-gray-900 rounded-xl">
      <div className="flex flex-col items-center">
        <h2 className="text-white text-xl font-medium mb-6">Creative Universe</h2>

        {/* Central Singularity */}
        <div className="relative mb-8">
          <motion.div
            className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center relative"
            animate={{
              boxShadow: pulsing
                ? [
                    '0 0 0 rgba(106, 48, 147, 0.4)',
                    '0 0 30px rgba(106, 48, 147, 0.8)',
                    '0 0 0 rgba(106, 48, 147, 0.4)'
                  ]
                : '0 0 15px rgba(106, 48, 147, 0.6)'
            }}
            transition={{ duration: 1 }}
          >
            {/* Dimensional Grid */}
            <div className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.2
                }}
            />

            {/* Core Element */}
            <motion.div
              className="w-12 h-12 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #131A36, #6A3093)',
                boxShadow: '0 0 10px #5AC8FA80'
              }}
              animate={{
                rotate: 360,
                scale: pulsing ? [1, 1.1, 1] : 1
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 1 }
              }}
            />

            {/* Energy Particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  left: '50%',
                  top: '50%',
                  opacity: 0.7
                }}
                animate={{
                  x: [0, Math.cos(i * (Math.PI/4)) * 50],
                  y: [0, Math.sin(i * (Math.PI/4)) * 50],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-6">
          {metrics.map(metric => (
            <motion.div
              key={metric.id}
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#131A3680' }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-gray-400 text-sm">{metric.name}</h3>
              <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="w-full">
          <h3 className="text-white text-lg mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map(activity => (
              <motion.div
                key={activity.id}
                className="p-3 rounded-lg bg-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: activity.id * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-medium">{activity.user}</span>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
                <p className="text-white">{activity.action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```

## Quantum State Button

A button system that evolves through different states with appropriate animations.

```jsx
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

```

## Dimensional Content Card

A content card that transforms between states and changes material properties based on content.

```jsx
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
```

## Dimensional Progress Tracker

A progress indicator that visualizes a user's journey through different realms.

```jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function DimensionalProgressTracker({
  steps = [
    { id: 1, title: "Character Creation", realm: "spirit", state: "completed" },
    { id: 2, title: "World Building", realm: "mortal", state: "active" },
    { id: 3, title: "Narrative Design", realm: "quantum", state: "upcoming" },
    { id: 4, title: "Interactive Elements", realm: "spirit", state: "upcoming" }
  ],
  orientation = "horizontal" // horizontal or vertical
}) {
  // Realm-specific properties
  const realmProps = {
    spirit: { color: '#6A3093', icon: '✧' },
    mortal: { color: '#131A36', icon: '◆' },
    quantum: { color: '#BF4080', icon: '⟡' }
  };

  // State-specific properties
  const stateProps = {
    completed: { opacity: 1, scale: 1, bgOpacity: 1 },
    active: { opacity: 1, scale: 1.1, bgOpacity: 0.8 },
    upcoming: { opacity: 0.5, scale: 0.9, bgOpacity: 0.4 }
  };

  // Get current step index
  const activeIndex = steps.findIndex(step => step.state === 'active');

  return (
    <div className={`w-full ${orientation === 'vertical' ? 'h-96' : 'h-32'}`}>
      <div
        className={`relative ${
          orientation === 'vertical'
            ? 'h-full flex flex-col items-center'
            : 'w-full flex items-center'
        }`}
      >
        {/* Connection Line */}
        <div
          className={`absolute ${
            orientation === 'vertical'
              ? 'w-1 h-full top-0 bg-gray-700'
              : 'h-1 w-full left-0 bg-gray-700'
          }`}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const realm = realmProps[step.realm] || realmProps.spirit;
          const state = stateProps[step.state] || stateProps.upcoming;
          const isConnected = index < activeIndex;

          return (
            <div
              key={step.id}
              className={`relative ${
                orientation === 'vertical'
                  ? 'mb-16 last:mb-0'
                  : 'mx-auto first:ml-0 last:mr-0'
              }`}
              style={{
                zIndex: 10,
                opacity: state.opacity
              }}
            >
              {/* Connection Energy (from previous to current) */}
              {index > 0 && (
                <div
                  className={`absolute ${
                    orientation === 'vertical'
                      ? 'w-1 top-[-64px] h-16'
                      : 'h-1 left-[-100%] w-full'
                  }`}
                  style={{
                    background: isConnected
                      ? `linear-gradient(${orientation === 'vertical' ? '180deg' : '90deg'}, ${realmProps[steps[index-1].realm].color}, ${realm.color})`
                      : 'transparent',
                    opacity: isConnected ? 0.8 : 0
                  }}
                >
                  {/* Energy Particles */}
                  {isConnected && Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white"
                      style={{
                        left: orientation === 'vertical' ? '50%' : `${33 * (i + 1)}%`,
                        top: orientation === 'vertical' ? `${33 * (i + 1)}%` : '50%',
                        marginLeft: orientation === 'vertical' ? '-1px' : '0',
                        marginTop: orientation === 'vertical' ? '0' : '-1px'
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.7
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Step Node */}
              <motion.div
                className={`flex items-center ${
                  orientation === 'vertical'
                    ? 'flex-row'
                    : 'flex-col'
                }`}
                animate={{ scale: state.scale }}
              >
                {/* Realm Icon */}
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                  style={{
                    backgroundColor: '#0A0621',
                    boxShadow: `0 0 10px ${realm.color}${state.state === 'upcoming' ? '40' : '80'}`
                  }}
                  animate={{
                    boxShadow: state.state === 'active'
                      ? [`0 0 10px ${realm.color}80`, `0 0 20px ${realm.color}`, `0 0 10px ${realm.color}80`]
                      : `0 0 10px ${realm.color}${state.state === 'upcoming' ? '40' : '80'}`
                  }}
                  transition={{
                    duration: 2,
                    repeat: state.state === 'active' ? Infinity : 0
                  }}
                >
                  {/* Dimensional Grid */}
                  <div className="absolute inset-0 w-full h-full rounded-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                      backgroundSize: '6px 6px',
                      opacity: 0.15
                    }}
                  />

                  {/* Icon */}
                  <span className="text-xl" style={{ color: realm.color }}>
                    {realm.icon}
                  </span>

                  {/* Energy Particles for Active State */}
                  {step.state === 'active' && Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * (Math.PI/2)) * 20],
                        y: [0, Math.sin(i * (Math.PI/2)) * 20],
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </motion.div>

                {/* Step Title */}
                <div
                  className={`${
                    orientation === 'vertical'
                      ? 'ml-4'
                      : 'mt-3'
                  }`}
                >
                  <p
                    className="text-white font-medium"
                    style={{
                      color: step.state === 'upcoming' ? '#9CA3AF' : '#FFFFFF'
                    }}
                  >
                    {step.title}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

```

## Design System Demo Page

Here's a comprehensive demo page that showcases all components together:

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuantumPortalNavigation from './QuantumPortalNavigation';
import EdgeComputingVisualization from './EdgeComputingVisualization';
import CreativeSingularityDashboard from './CreativeSingularityDashboard';
import QuantumStateButton from './QuantumStateButton';
import DimensionalContentCard from './DimensionalContentCard';
import DimensionalProgressTracker from './DimensionalProgressTracker';

export default function DesignSystemDemo() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'portals', name: 'Quantum Portals' },
    { id: 'computing', name: 'Edge Computing' },
    { id: 'dashboard', name: 'Singularity Dashboard' },
    { id: 'buttons', name: 'Quantum Buttons' },
    { id: 'cards', name: 'Content Cards' },
    { id: 'progress', name: 'Progress Tracker' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Quantum-Spatial Design System</h1>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map(section => (
          <button
            key={section.id}
            className={`px-3 py-1 rounded-md ${
              activeSection === section.id ? 'bg-blue-600' : 'bg-gray-800'
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Quantum-Spatial Design System</h2>
            <p className="text-gray-300">
              This design system showcases the core components that express the distinctive
              quantum-spatial approach to creative work. Each visualization captures different
              aspects of the 9Bit Universe while maintaining a cohesive design language.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {sections.slice(1).map(section => (
                <motion.div
                  key={section.id}
                  className="p-4 bg-gray-800 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveSection(section.id)}
                >
                  <h3 className="text-xl font-medium mb-2">{section.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {section.id === 'portals' && 'Dimensional gateways to different areas of your ecosystem'}
                    {section.id === 'computing' && 'Visualization of edge computing decision flows'}
                    {section.id === 'dashboard' && 'Central interface showing your creative ecosystem'}
                    {section.id === 'buttons' && 'Interactive elements that evolve through quantum states'}
                    {section.id === 'cards' && 'Content displays that transform between states'}
                    {section.id === 'progress' && 'Journey visualization through different realms'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'portals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Quantum Portal Navigation</h2>
            <p className="text-gray-300 mb-6">
              This component creates dimensional gateways to different areas of your ecosystem,
              each pulsing with realm-specific energy.
            </p>

            <QuantumPortalNavigation />

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Each portal has realm-specific energy colors and pulsing animations</li>
                <li>Portals respond to interaction with dimensional effects</li>
                <li>The grid background provides spatial context and depth</li>
                <li>Energy particles flow around active portals</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'computing' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Edge Computing Visualization</h2>
            <p className="text-gray-300 mb-6">
              This visualization demonstrates your edge computing concept, showing how decisions
              move closer to information sources.
            </p>

            <EdgeComputingVisualization />

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Data particles flow between nodes showing information transfer</li>
                <li>The central node coordinates with edge nodes using energy connections</li>
                <li>Edge nodes connect directly to data sources for faster processing</li>
                <li>The animation demonstrates continuous data flow and processing</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Creative Singularity Dashboard</h2>
            <p className="text-gray-300 mb-6">
              A unified interface showing your creative ecosystem with the singularity at its core.
            </p>

            <CreativeSingularityDashboard />

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>The central singularity pulses with quantum energy</li>
                <li>Energy particles emit from the core, showing creative flow</li>
                <li>Metrics surround the singularity, displaying key performance indicators</li>
                <li>The activity feed shows real-time creative actions within the ecosystem</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'buttons' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Quantum State Buttons</h2>
            <p className="text-gray-300 mb-6">
              Interactive elements that evolve through different states (heritage, transitional, quantum)
              with appropriate animations and effects.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <QuantumStateButton variant="primary">Primary Button</QuantumStateButton>
                  <QuantumStateButton variant="secondary">Secondary Button</QuantumStateButton>
                  <QuantumStateButton variant="accent">Accent Button</QuantumStateButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Button Sizes</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <QuantumStateButton size="small">Small</QuantumStateButton>
                  <QuantumStateButton size="medium">Medium</QuantumStateButton>
                  <QuantumStateButton size="large">Large</QuantumStateButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Initial States</h3>
                <div className="flex flex-wrap gap-4">
                  <QuantumStateButton initialState="heritage">Heritage</QuantumStateButton>
                  <QuantumStateButton initialState="transitional">Transitional</QuantumStateButton>
                  <QuantumStateButton initialState="quantum">Quantum</QuantumStateButton>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Buttons transition between three states when clicked</li>
                <li>Each state has unique visual effects and animations</li>
                <li>The dimensional grid provides subtle texture and depth</li>
                <li>State indicators at the bottom show current state</li>
                <li>Multiple variants and sizes accommodate different contexts</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'cards' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dimensional Content Cards</h2>
            <p className="text-gray-300 mb-6">
              Content cards that transform between states, showing how content exists
              across multiple dimensions in your ecosystem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DimensionalContentCard
                title="Introduction to Quantum Design"
                description="Learn about the principles behind our quantum-spatial design system and how it enhances user experience."
                category="article"
                initialState="heritage"
              />

              <DimensionalContentCard
                title="Creative Singularity Demo"
                description="Watch how the creative singularity powers our entire ecosystem and enables rapid content creation."
                category="video"
                initialState="transitional"
              />

              <DimensionalContentCard
                title="Jrotharke: First Adventure"
                description="Begin your journey through the mysterious world of Jrotharke in this interactive adventure."
                category="interactive"
                initialState="quantum"
              />

              <DimensionalContentCard
                title="9Bit Studios Roadmap"
                description="Explore our strategic roadmap for product development over the next three years."
                category="project"
                initialState="transitional"
              />
            </div>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Cards transform between states when clicked</li>
                <li>Category-specific colors and icons provide visual organization</li>
                <li>Material properties change based on state (shadow, border-radius, etc.)</li>
                <li>The dimensional grid provides texture and spatial context</li>
                <li>State-specific animations enhance the dimensional experience</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dimensional Progress Tracker</h2>
            <p className="text-gray-300 mb-6">
              A progress visualization that shows a user's journey through different realms,
              with energy connections between completed steps.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-medium mb-3">Horizontal Tracker</h3>
                <DimensionalProgressTracker orientation="horizontal" />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Vertical Tracker</h3>
                <DimensionalProgressTracker orientation="vertical" />
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Implementation Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Each step has realm-specific energy signatures and icons</li>
                <li>Energy particles flow between connected nodes</li>
                <li>Step states (completed, active, upcoming) have visual differentiation</li>
                <li>The active step pulses with energy to draw attention</li>
                <li>Both horizontal and vertical orientations support different layouts</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

```

## Implementation Guide

Here's how to implement these components in your Framer project:

1. **Create Component Files**:
    - Create separate `.tsx` files for each component in your Framer project
    - Copy the code for each component into its respective file
2. **Install Dependencies**:
    - Ensure Framer Motion is installed (it should be available by default in Framer projects)
    - For the Edge Computing Visualization, you'll need a canvas element
3. **Implementation for Arthur's Portal**:
    - Use the `QuantumPortalNavigation` as the main navigation in the Command Center Dashboard
    - Implement the `DimensionalProgressTracker` to show Arthur's creative journey
    - Use `QuantumStateButton` components for primary actions
    - Create content sections with `DimensionalContentCard` components
4. **Core Design Principles**:
    - Maintain the quantum-spatial color palette across all components
    - Ensure all components support the three material states (heritage, transitional, quantum)
    - Use the dimensional grid as a consistent organizing element
    - Connect related elements with illuminated energy pathways

This component set creates a cohesive, immersive environment that aligns with your quantum-spatial aesthetic while providing clear navigation and interactive elements that evolve through different states.

Would you like me to further explain any specific aspect of these components or provide additional implementation guidance?

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

- **Page History**
    
    
    | Version | Date | Author | Changes |
    | --- | --- | --- | --- |
    | 0.1 | April 22, 2025  | @Penny Platt  | Initial draft |
    | 0.2 | YYYY-MM-DD | [Name] | Added market analysis |
    | 0.3 | YYYY-MM-DD | [Name] | Updated technical architecture |
    | 1.0 | YYYY-MM-DD | [Name] | Finalized for approval |
    
    *This document follows 9Bit Studios’ documentation standards and incorporates quantum-spatial design principles.*
    
</aside>

## Supporting files

[](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)