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