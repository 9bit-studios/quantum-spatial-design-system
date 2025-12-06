import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreativeSingularityDashboard({
  metrics = [
    { id: "projects", label: "Active Projects", value: 7, change: 2, realm: "spirit" },
    { id: "assets", label: "Generated Assets", value: 152, change: 38, realm: "mortal" },
    { id: "pipelines", label: "Active Pipelines", value: 5, change: 1, realm: "quantum" },
    { id: "efficiency", label: "Efficiency Score", value: 87, change: 12, realm: "spirit", unit: "%" }
  ],
  activities = [
    { id: "1", label: "Quantum Asset Generated", time: "2m ago", realm: "mortal" },
    { id: "2", label: "Pipeline Optimization Complete", time: "17m ago", realm: "quantum" },
    { id: "3", label: "New Edge Node Connected", time: "45m ago", realm: "spirit" }
  ]
}) {
  // Realm color mapping
  const realmColors = {
    spirit: { primary: "#BF4080", secondary: "#FF2D55" },
    mortal: { primary: "#5AC8FA", secondary: "#29B6F6" },
    quantum: { primary: "#6A3093", secondary: "#331F4A" }
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <GridSystem />
      </div>

      {/* Singularity Pulse Core */}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <SingularityCore />
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-medium text-white mb-6">Creative Singularity</h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} realmColors={realmColors} />
          ))}
        </div>

        {/* Activity Feed */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} realmColors={realmColors} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ metric, realmColors }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: realmColors[metric.realm].primary }}
      />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-white">{metric.value}{metric.unit || ""}</span>

          {/* Change indicator */}
          {metric.change !== 0 && (
            <div
              className="ml-2 text-xs pb-1 flex items-center"
              style={{
                color: metric.change > 0
                  ? realmColors[metric.realm].secondary
                  : "#FF4040"
              }}
            >
              {metric.change > 0 ? "+" : ""}{metric.change}
              <svg
                className="w-3 h-3 ml-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={metric.change > 0
                    ? "M5 10l7-7m0 0l7 7m-7-7v18"
                    : "M19 14l-7 7m0 0l-7-7m7 7V3"
                  }
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Realm indicator dot */}
      <div
        className="absolute bottom-2 right-2 w-2 h-2 rounded-full"
        style={{ background: realmColors[metric.realm].primary }}
      />
    </div>
  );
};

const ActivityItem = ({ activity, realmColors }) => {
  return (
    <div className="flex items-center">
      {/* Activity indicator */}
      <div
        className="w-2 h-2 rounded-full mr-3"
        style={{ background: realmColors[activity.realm].primary }}
      />

      {/* Activity content */}
      <div className="flex-1">
        <p className="text-sm text-white">{activity.label}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>

      {/* Energy particles */}
      <motion.div
        className="w-6 h-6 relative"
        style={{ overflow: 'hidden' }}
      >
        <EnergyParticles color={realmColors[activity.realm].secondary} />
      </motion.div>
    </div>
  );
};

const SingularityCore = () => {
  return (
    <div className="relative">
      {/* Central Core */}
      <motion.div
        className="w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, #131A36 0%, #0A0621 100%)",
          boxShadow: "0 0 20px #5AC8FA33, 0 0 40px #BF408033"
        }}
        animate={{
          boxShadow: [
            "0 0 20px #5AC8FA33, 0 0 40px #BF408033",
            "0 0 30px #5AC8FA66, 0 0 60px #BF408066",
            "0 0 20px #5AC8FA33, 0 0 40px #BF408033"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Energy rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              top: '50%',
              left: '50%',
              width: `${120 + i * 40}%`,
              height: `${120 + i * 40}%`,
              borderColor: i % 2 === 0 ? "#5AC8FA" : "#BF4080",
              borderWidth: "1px",
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, #6A309366 0%, transparent 70%)"
          }}
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Quantum particles */}
      <div className="absolute" style={{ top: '50%', left: '50%', width: 0, height: 0 }}>
        {Array(12).fill(0).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 80 + Math.random() * 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const colors = ["#5AC8FA", "#BF4080", "#6A3093"];
          const color = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3 + "px",
                height: 2 + Math.random() * 3 + "px",
                background: color,
                left: x + "px",
                top: y + "px",
                transform: "translate(-50%, -50%)"
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [x, x + (Math.random() * 20 - 10)],
                y: [y, y + (Math.random() * 20 - 10)]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const GridSystem = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF" strokeWidth="0.2" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const EnergyParticles = ({ color }) => {
  const particles = Array(3).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: "2px",
            height: "2px",
            top: "50%",
            left: "50%",
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: ["0%", (Math.random() * 100 - 50) + "%"],
            y: ["0%", (Math.random() * 100 - 50) + "%"]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </>
  );
};