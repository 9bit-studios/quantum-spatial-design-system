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