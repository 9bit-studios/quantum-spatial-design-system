import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EdgeComputingVisualization({
  nodes = 7,
  connectionDensity = 0.6,
  energyFlow = true,
  centralProcessingActive = true,
  height = 400
}) {
  // Generate nodes in a circle with a central node
  const generateNodes = (count) => {
    const nodeArray = [];

    // Central node
    nodeArray.push({
      id: 'central',
      x: 50,
      y: 50,
      type: 'core',
      size: 12
    });

    // Edge nodes in a circle
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 35;

      nodeArray.push({
        id: `node-${i}`,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        type: i % 3 === 0 ? 'processing' : i % 3 === 1 ? 'data' : 'input',
        size: 6 + Math.random() * 4
      });
    }

    return nodeArray;
  };

  // Generate connections between nodes
  const generateConnections = (nodeArray, density) => {
    const connections = [];

    // Connect all nodes to central
    for (let i = 1; i < nodeArray.length; i++) {
      connections.push({
        id: `central-${i}`,
        source: 'central',
        target: nodeArray[i].id,
        strength: 0.5 + Math.random() * 0.5
      });
    }

    // Connect some nodes to each other
    for (let i = 1; i < nodeArray.length; i++) {
      for (let j = i + 1; j < nodeArray.length; j++) {
        if (Math.random() < density) {
          connections.push({
            id: `${i}-${j}`,
            source: nodeArray[i].id,
            target: nodeArray[j].id,
            strength: Math.random() * 0.3
          });
        }
      }
    }

    return connections;
  };

  const nodeData = generateNodes(nodes);
  const connectionData = generateConnections(nodeData, connectionDensity);

  // Color mapping by node type
  const nodeColors = {
    core: { fill: "#6A3093", stroke: "#BF4080" },
    processing: { fill: "#131A36", stroke: "#5AC8FA" },
    data: { fill: "#331F4A", stroke: "#FF2D55" },
    input: { fill: "#0D0D15", stroke: "#29B6F6" }
  };

  return (
    <div className="w-full relative overflow-hidden bg-gray-900 rounded-xl" style={{ height }}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <GridSystem />
      </div>

      {/* Edge Computing Visualization */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {connectionData.map(conn => {
          const source = nodeData.find(n => n.id === conn.source);
          const target = nodeData.find(n => n.id === conn.target);

          return (
            <React.Fragment key={conn.id}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={nodeColors[source.type].stroke}
                strokeWidth={0.5 + conn.strength}
                strokeOpacity={0.6}
              />

              {/* Energy particles on connections */}
              {energyFlow && (
                <EnergyParticle
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  color={nodeColors[source.type].stroke}
                  speed={1 + conn.strength * 2}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Nodes */}
        {nodeData.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={nodeColors[node.type].fill}
              stroke={nodeColors[node.type].stroke}
              strokeWidth={1}
            />

            {/* Pulse effect for active nodes */}
            {(centralProcessingActive || node.id !== 'central') && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                stroke={nodeColors[node.type].stroke}
                strokeWidth={0.5}
                fill="none"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

const EnergyParticle = ({ x1, y1, x2, y2, color, speed }) => {
  return (
    <motion.circle
      r={0.8}
      fill={color}
      initial={{ x: x1, y: y1 }}
      animate={{
        x: [x1, x2, x1],
        y: [y1, y2, y1]
      }}
      transition={{
        duration: 3 / speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        delay: Math.random() * 2
      }}
    />
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
