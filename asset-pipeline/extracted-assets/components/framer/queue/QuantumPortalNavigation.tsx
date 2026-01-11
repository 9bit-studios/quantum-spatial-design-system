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