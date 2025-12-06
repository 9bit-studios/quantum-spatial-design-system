import React, { useState } from 'react';
import { Zap, Book, Shield, Sparkles, Users, ChevronRight, Heart, Settings } from 'lucide-react';

// Import our custom components
import CosmicFragmentCard from './CosmicFragmentCard';
import DimensionalProgressTracker from './DimensionalProgressTracker';
import QuantumStateButton from './QuantumStateButton';

export default function QuantumSpatialDesignSystemDemo() {
  const [activeSection, setActiveSection] = useState('cards');
  
  // Example data for progress tracker
  const progressSteps = [
    { title: "Planning", description: "Define the project scope" },
    { title: "Design", description: "Create visual assets" },
    { title: "Development", description: "Build the experience" },
    { title: "Testing", description: "Verify functionality" },
    { title: "Launch", description: "Release to users" }
  ];
  
  // Render a specific section of the design system
  const renderSection = () => {
    switch(activeSection) {
      case 'cards':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
              Cosmic Fragment Cards
            </h2>
            <p className="text-white text-opacity-70 mb-6">
              Cards represent different creative powers and projects in the quantum-spatial interface,
              with states varying from inactive to mastered.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <CosmicFragmentCard 
                title="Character Forge"
                description="Create living, breathing characters with depth and consistency"
                state="active"
                type="spirit"
                powerLevel={0.8}
              />
              
              <CosmicFragmentCard 
                title="World Architect"
                description="Design immersive environments with dimensional depth"
                state="activating"
                type="mortal"
                powerLevel={0.4}
              />
              
              <CosmicFragmentCard 
                title="Narrative Weaver"
                description="Craft branching stories with meaningful player choices"
                state="inactive"
                type="quantum"
                powerLevel={0.2}
              />
            </div>
            
            <div className="bg-[#0D0D15] border border-[#331F4A] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Card Properties</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-white mb-2">States</h4>
                  <ul className="list-disc list-inside text-white text-opacity-70">
                    <li>inactive - awaiting activation</li>
                    <li>activating - in process</li>
                    <li>active - ready to use</li>
                    <li>mastered - fully developed</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white mb-2">Types</h4>
                  <ul className="list-disc list-inside text-white text-opacity-70">
                    <li>spirit - purple energy focus</li>
                    <li>mortal - blue energy focus</li>
                    <li>quantum - red energy focus</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white mb-2">Power Level</h4>
                  <ul className="list-disc list-inside text-white text-opacity-70">
                    <li>0.0 - 1.0 range</li>
                    <li>Controls visual intensity</li>
                    <li>Affects particle effects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'progress':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
              Dimensional Progress Tracker
            </h2>
            <p className="text-white text-opacity-70 mb-6">
              The progress tracker visualizes journey steps with dimensional energy connecting completion points.
              Different realm types (spirit, mortal, quantum) affect the visual energy signature.
            </p>
            
            <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold mb-6 text-[#5AC8FA]">Spirit Realm Tracker (Rose/Purple)</h3>
              <DimensionalProgressTracker 
                steps={progressSteps}
                currentStep={2}
                completedSteps={[0, 1]}
                type="spirit"
              />
            </div>
            
            <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold mb-6 text-[#5AC8FA]">Mortal Realm Tracker (Blue/Cyan)</h3>
              <DimensionalProgressTracker 
                steps={progressSteps}
                currentStep={3}
                completedSteps={[0, 1, 2]}
                type="mortal"
              />
            </div>
            
            <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-6 text-[#5AC8FA]">Quantum Realm Tracker (Pink/Orange)</h3>
              <DimensionalProgressTracker 
                steps={progressSteps}
                currentStep={4}
                completedSteps={[0, 1, 2, 3]}
                type="quantum"
              />
            </div>
          </div>
        );
        
      case 'buttons':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
              Quantum State Buttons
            </h2>
            <p className="text-white text-opacity-70 mb-6">
              Buttons that transition between heritage (8-bit), transitional, and quantum states, 
              representing the evolution from classic to advanced interfaces.
            </p>
            
            <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Primary Buttons</h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <QuantumStateButton 
                    type="primary"
                    state="heritage"
                    icon={<Shield size={16} />}
                  >
                    Heritage
                  </QuantumStateButton>
                  <span className="text-xs text-white text-opacity-50 mt-2">8-bit origins</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <QuantumStateButton 
                    type="primary"
                    state="transitional"
                    icon={<Zap size={16} />}
                  >
                    Transitional
                  </QuantumStateButton>
                  <span className="text-xs text-white text-opacity-50 mt-2">Evolving state</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <QuantumStateButton 
                    type="primary"
                    state="quantum"
                    icon={<Sparkles size={16} />}
                  >
                    Quantum
                  </QuantumStateButton>
                  <span className="text-xs text-white text-opacity-50 mt-2">Advanced state</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Secondary Buttons</h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <QuantumStateButton 
                  type="secondary"
                  state="heritage"
                >
                  Heritage
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="secondary"
                  state="transitional"
                >
                  Transitional
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="secondary"
                  state="quantum"
                >
                  Quantum
                </QuantumStateButton>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Ghost Buttons</h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <QuantumStateButton 
                  type="ghost"
                  state="heritage"
                  icon={<ChevronRight size={16} />}
                >
                  Heritage
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="ghost"
                  state="transitional"
                  icon={<ChevronRight size={16} />}
                >
                  Transitional
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="ghost"
                  state="quantum"
                  icon={<ChevronRight size={16} />}
                >
                  Quantum
                </QuantumStateButton>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Button Sizes & States</h3>
              
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <QuantumStateButton 
                  type="primary"
                  state="quantum"
                  size="small"
                >
                  Small
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="primary"
                  state="quantum"
                  size="medium"
                >
                  Medium
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="primary"
                  state="quantum"
                  size="large"
                >
                  Large
                </QuantumStateButton>
                
                <QuantumStateButton 
                  type="primary"
                  state="quantum"
                  disabled
                >
                  Disabled
                </QuantumStateButton>
              </div>
            </div>
          </div>
        );
        
      case 'color':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
              Quantum-Spatial Color System
            </h2>
            <p className="text-white text-opacity-70 mb-6">
              The color system represents the evolution from 8-bit heritage to quantum sophistication,
              with distinct palettes for different dimensional realms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Primary Foundation Colors */}
              <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Primary Foundation</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#0A0621] mr-3"></div>
                    <div>
                      <div className="text-white">Void Black</div>
                      <div className="text-xs text-white text-opacity-50">#0A0621</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#131A36] mr-3"></div>
                    <div>
                      <div className="text-white">Deep Space Indigo</div>
                      <div className="text-xs text-white text-opacity-50">#131A36</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#1E1F5C] mr-3"></div>
                    <div>
                      <div className="text-white">Ultra Indigo</div>
                      <div className="text-xs text-white text-opacity-50">#1E1F5C</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#331F4A] mr-3"></div>
                    <div>
                      <div className="text-white">Dimensional Eggplant</div>
                      <div className="text-xs text-white text-opacity-50">#331F4A</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#0D0D15] mr-3"></div>
                    <div>
                      <div className="text-white">Midnight Richness</div>
                      <div className="text-xs text-white text-opacity-50">#0D0D15</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary Accent Colors */}
              <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Accent Colors</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#5AC8FA] mr-3"></div>
                    <div>
                      <div className="text-white">Subtle Cyan</div>
                      <div className="text-xs text-white text-opacity-50">#5AC8FA</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#29B6F6] mr-3"></div>
                    <div>
                      <div className="text-white">Subtle Aqua</div>
                      <div className="text-xs text-white text-opacity-50">#29B6F6</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#BF4080] mr-3"></div>
                    <div>
                      <div className="text-white">Rose Energy</div>
                      <div className="text-xs text-white text-opacity-50">#BF4080</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#FF2D55] mr-3"></div>
                    <div>
                      <div className="text-white">Quantum Pulse Pink</div>
                      <div className="text-xs text-white text-opacity-50">#FF2D55</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#126D71] mr-3"></div>
                    <div>
                      <div className="text-white">Dimensional Teal</div>
                      <div className="text-xs text-white text-opacity-50">#126D71</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Heritage Colors */}
              <div className="bg-[#131A36] border border-[#331F4A] rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Heritage Elements</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#2C5F2D] mr-3"></div>
                    <div>
                      <div className="text-white">Heritage Green Core</div>
                      <div className="text-xs text-white text-opacity-50">#2C5F2D</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#1B3D1A] mr-3"></div>
                    <div>
                      <div className="text-white">Heritage Green Dark</div>
                      <div className="text-xs text-white text-opacity-50">#1B3D1A</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#3D8B40] mr-3"></div>
                    <div>
                      <div className="text-white">Heritage Green Light</div>
                      <div className="text-xs text-white text-opacity-50">#3D8B40</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#3DFF74] mr-3"></div>
                    <div>
                      <div className="text-white">Heritage Pixel Green</div>
                      <div className="text-xs text-white text-opacity-50">#3DFF74</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-[#FF6B6B] mr-3"></div>
                    <div>
                      <div className="text-white">Dimensional Orange</div>
                      <div className="text-xs text-white text-opacity-50">#FF6B6B</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0D0D15] border border-[#331F4A] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#5AC8FA]">Gradient Systems</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white mb-3">Quantum Depth Gradient</h4>
                  <div className="h-10 rounded bg-gradient-to-r from-[#131A36] via-[#331F4A] to-[#6A3093]"></div>
                  <div className="text-xs text-white text-opacity-50 mt-1">Deep Space Indigo → Dimensional Eggplant → Quantum Violet</div>
                </div>
                
                <div>
                  <h4 className="text-white mb-3">Energy State Transition</h4>
                  <div className="h-10 rounded bg-gradient-to-r from-[#2C5F2D] via-[#131A36] to-[#5AC8FA]"></div>
                  <div className="text-xs text-white text-opacity-50 mt-1">Heritage Green → Deep Space Indigo → Subtle Cyan</div>
                </div>
                
                <div>
                  <h4 className="text-white mb-3">Spiritual State Transition</h4>
                  <div className="h-10 rounded bg-gradient-to-r from-[#FF6B6B] via-[#BF4080] to-[#5AC8FA]"></div>
                  <div className="text-xs text-white text-opacity-50 mt-1">Dimensional Orange → Rose Energy → Subtle Cyan</div>
                </div>
                
                <div>
                  <h4 className="text-white mb-3">Deep Spatial Background</h4>
                  <div className="h-10 rounded bg-gradient-to-br from-[#0A0621] to-[#131A36]"></div>
                  <div className="text-xs text-white text-opacity-50 mt-1">Void Black → Deep Space Indigo</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0621] to-[#131A36] text-white p-8">
      {/* Dimensional grid background */}
      <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #5AC8FA 1px, transparent 1px), 
                            linear-gradient(to bottom, #5AC8FA 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-10%)',
          transformOrigin: 'center center'
        }} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#5AC8FA] to-[#BF4080]">
          QUANTUM-SPATIAL DESIGN SYSTEM
        </h1>
        <p className="text-xl text-[#5AC8FA] opacity-80">
          Core components for the 9Bit Studios visual language
        </p>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b border-[#331F4A] mb-8 overflow-x-auto">
        <button 
          className={`px-6 py-3 flex items-center whitespace-nowrap 
            ${activeSection === 'cards' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`} 
          onClick={() => setActiveSection('cards')}
        >
          <Book className="mr-2 h-5 w-5" />
          Cosmic Fragment Cards
        </button>
        <button 
          className={`px-6 py-3 flex items-center whitespace-nowrap 
            ${activeSection === 'progress' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`}
          onClick={() => setActiveSection('progress')}
        >
          <Users className="mr-2 h-5 w-5" />
          Dimensional Progress
        </button>
        <button 
          className={`px-6 py-3 flex items-center whitespace-nowrap 
            ${activeSection === 'buttons' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`}
          onClick={() => setActiveSection('buttons')}
        >
          <Heart className="mr-2 h-5 w-5" />
          Quantum State Buttons
        </button>
        <button 
          className={`px-6 py-3 flex items-center whitespace-nowrap 
            ${activeSection === 'color' ? 'text-[#5AC8FA] border-b-2 border-[#5AC8FA]' : 'text-white text-opacity-60'}`}
          onClick={() => setActiveSection('color')}
        >
          <Settings className="mr-2 h-5 w-5" />
          Color System
        </button>
      </div>
      
      {/* Content area */}
      <div className="relative z-10">
        {renderSection()}
      </div>
    </div>
  );
}
