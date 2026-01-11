import React, { useState, useEffect } from 'react';
import { Book, Lightbulb, Compass, PenTool, Zap } from 'lucide-react';

// Import our Cosmic Fragment Card
import CosmicFragmentCard from './CosmicFragmentCard';

export default function CommandCenterDashboard() {
  const [activeTab, setActiveTab] = useState('powers');
  const [energyPulse, setEnergyPulse] = useState(0);
  
  // Animation for energy grid
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergyPulse((prev) => (prev + 0.02) % 1);
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // Creative powers data
  const creativePowers = [
    {
      id: 'character-forge',
      title: 'Character Forge',
      description: 'Create living, breathing characters with depth and consistency',
      state: 'active',
      type: 'spirit',
      powerLevel: 0.8
    },
    {
      id: 'world-architect',
      title: 'World Architect',
      description: 'Design immersive environments with dimensional depth',
      state: 'activating',
      type: 'mortal',
      powerLevel: 0.4
    },
    {
      id: 'narrative-weaver',
      title: 'Narrative Weaver',
      description: 'Craft branching stories with meaningful player choices',
      state: 'inactive',
      type: 'spirit',
      powerLevel: 0.2
    },
    {
      id: 'puzzle-master',
      title: 'Puzzle Master',
      description: 'Design engaging challenges with thematic integration',
      state: 'inactive',
      type: 'quantum',
      powerLevel: 0.1
    }
  ];
  
  // Active projects data
  const activeProjects = [
    {
      id: 'branding-quiz',
      title: 'Branding Quiz',
      description: 'AI-powered brand identity analyzer and recommender',
      state: 'active',
      type: 'mortal',
      powerLevel: 0.9
    },
    {
      id: 'interactive-fiction',
      title: 'Interactive Fiction',
      description: 'Branching narrative experience with player choice',
      state: 'active',
      type: 'spirit',
      powerLevel: 0.7
    },
    {
      id: 'escape-room',
      title: 'Virtual Escape Room',
      description: 'Puzzle-based adventure with narrative integration',
      state: 'activating',
      type: 'quantum',
      powerLevel: 0.5
    }
  ];
  
  // Dimensioanl grid background
  const renderDimensionalGrid = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to right, #5AC8FA 1px, transparent 1px), 
                            linear-gradient(to bottom, #5AC8FA 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2) translateY(-10%)',
          transformOrigin: 'center center'
        }} />
        
        {/* Flowing energy lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => {
            const offset = (energyPulse + i/5) % 1;
            return (
              <div 
                key={i}
                className="absolute h-px w-full"
                style={{
                  top: `${20 + i * 15}%`,
                  background: 'linear-gradient(90deg, transparent, #5AC8FA, transparent)',
                  opacity: 0.3,
                  transform: `translateX(${-50 + offset * 100}%)`,
                  width: '50%',
                  filter: 'blur(1px)'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0621] to-[#131A36] text-white p-8">
      {/* Dimensional grid background */}
      {renderDimensionalGrid()}
      
      {/* Dashboard header */}
      <div className="relative z-10 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
          WELCOME TO YOUR CREATIVE COMMAND CENTER
        </h1>
        <p className="text-xl text-[#5AC8FA] opacity-80">
          Harness the quantum-spatial powers to shape your creative vision
        </p>
      </div>
      
      {/* Main tabs */}
      <div className="flex border-b border-[#331F4A] mb-8">
        <button 
          className={`px-6 py-3 flex items-center ${activeTab === 'powers' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`} 
          onClick={() => setActiveTab('powers')}
        >
          <Zap className="mr-2 h-5 w-5" />
          CREATIVE POWERS
        </button>
        <button 
          className={`px-6 py-3 flex items-center ${activeTab === 'projects' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`}
          onClick={() => setActiveTab('projects')}
        >
          <Compass className="mr-2 h-5 w-5" />
          ACTIVE PROJECTS
        </button>
        <button 
          className={`px-6 py-3 flex items-center ${activeTab === 'revenue' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`}
          onClick={() => setActiveTab('revenue')}
        >
          <Lightbulb className="mr-2 h-5 w-5" />
          LAUNCH ACCELERATOR
        </button>
      </div>
      
      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'powers' && creativePowers.map(power => (
          <CosmicFragmentCard 
            key={power.id}
            title={power.title}
            description={power.description}
            state={power.state}
            type={power.type}
            powerLevel={power.powerLevel}
          />
        ))}
        
        {activeTab === 'projects' && activeProjects.map(project => (
          <CosmicFragmentCard 
            key={project.id}
            title={project.title}
            description={project.description}
            state={project.state}
            type={project.type}
            powerLevel={project.powerLevel}
          />
        ))}
        
        {activeTab === 'revenue' && (
          <>
            <CosmicFragmentCard 
              title="Quick Revenue"
              description="Generate immediate income through micro-products"
              state="active"
              type="quantum"
              powerLevel={0.9}
            />
            <CosmicFragmentCard 
              title="Marketing Assets" 
              description="Create promotional materials with quantum-spatial branding"
              state="active"
              type="mortal"
              powerLevel={0.8}
            />
            <CosmicFragmentCard 
              title="Client Portal"
              description="Build engaging client experiences with dimensional depth"
              state="inactive"
              type="spirit"
              powerLevel={0.3}
            />
          </>
        )}
      </div>
      
      {/* Creative journey tracker */}
      <div className="mt-12 bg-[#0D0D15] border border-[#331F4A] rounded-lg p-6 relative overflow-hidden">
        {/* Background energy effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 50%, #5AC8FA20, transparent 50%)'
          }} />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Book className="mr-2 text-[#5AC8FA]" />
            YOUR CREATIVE JOURNEY
          </h2>
          
          {/* Progress visualization */}
          <div className="flex items-center mb-6">
            <div className="w-full flex items-center">
              {creativePowers.map((power, index) => (
                <React.Fragment key={power.id}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${power.state !== 'inactive' ? 'bg-[#5AC8FA]' : 'border-2 border-[#331F4A] bg-[#0D0D15]'}`}>
                    {power.state !== 'inactive' ? '●' : '○'}
                  </div>
                  {index < creativePowers.length - 1 && (
                    <div className={`h-1 flex-1 ${index < 1 ? 'bg-[#5AC8FA]' : 'bg-[#331F4A]'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="ml-4 text-sm text-[#5AC8FA]">
              2/7 Powers Activated
            </div>
          </div>
          
          {/* Next mission */}
          <div className="mb-6">
            <h3 className="text-lg text-[#5AC8FA] mb-2">NEXT MISSION:</h3>
            <p className="text-white text-opacity-80 mb-4">
              Activate the Narrative Weaver - Create your first interactive story branch with dynamic character responses.
            </p>
          </div>
          
          {/* Begin mission button */}
          <button className="px-6 py-3 bg-gradient-to-r from-[#331F4A] to-[#6A3093] rounded-lg text-white flex items-center hover:from-[#3f2759] hover:to-[#7a35a9] transition-all shadow-lg shadow-[#5AC8FA20]">
            <PenTool className="mr-2" />
            BEGIN MISSION
          </button>
        </div>
      </div>
    </div>
  );
}
