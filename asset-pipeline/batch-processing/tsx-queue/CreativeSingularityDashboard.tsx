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