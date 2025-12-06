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