import { useState } from 'react';

const FrameworksDashboard = () => {
  const [activeFramework, setActiveFramework] = useState(null);
  
  // Framework data
  const frameworks = [
    {
      id: 'tech-docs',
      title: 'Technical Documentation Framework',
      color: '#5AC8FA',
      domains: ['Development', 'Design System', 'Game Design', 'Product Strategy'],
      description: 'Standardized approach to technical documentation across all product lines',
      principles: ['Consistency', 'Clarity', 'Completeness', 'Context'],
    },
    {
      id: 'ai-dev',
      title: 'AI-Assisted Development Framework',
      color: '#BF4080',
      domains: ['Development', 'Product Strategy', 'Game Design'],
      description: 'Strategic integration of AI tools into development workflows',
      principles: ['Augmentation', 'Verification', 'Privacy', 'Efficiency'],
    },
    {
      id: 'llm-coding',
      title: 'LLM Coding Workflow',
      color: '#6A3093',
      domains: ['Development', 'Game Design'],
      description: 'Optimized process for LLM-assisted code generation and refinement',
      principles: ['Prompt Engineering', 'Code Review', 'Integration', 'Learning'],
    },
    {
      id: 'quantum-spatial',
      title: 'Quantum-Spatial Design System',
      color: '#126D71',
      domains: ['Design System', 'Game Design', 'Product Strategy'],
      description: 'Distinctive visual language with dimensional depth',
      principles: ['Dimensionality', 'Material Properties', 'State Transitions', 'Grid System'],
    }
  ];
  
  // Domain data
  const domains = [
    { id: 'development', title: 'Development', icon: '🛠️', color: '#131A36' },
    { id: 'design-system', title: 'Design System', icon: '🎨', color: '#331F4A' },
    { id: 'game-design', title: 'Game Design', icon: '🎮', color: '#0D0D15' },
    { id: 'product-strategy', title: 'Product Strategy', icon: '🧠', color: '#2D854D' },
  ];

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Frameworks & Workflows</h1>
        <p className="text-gray-600">Universal implementation guides that work across domains</p>
      </div>
      
      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {frameworks.map(framework => (
          <div 
            key={framework.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ borderTop: `4px solid ${framework.color}` }}
            onClick={() => setActiveFramework(framework.id === activeFramework ? null : framework.id)}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{framework.title}</h2>
              <p className="text-gray-600 mb-4">{framework.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {framework.domains.map(domainName => {
                  const domain = domains.find(d => d.title === domainName);
                  return domain ? (
                    <span 
                      key={domain.id} 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                    >
                      {domain.icon} {domain.title}
                    </span>
                  ) : null;
                })}
              </div>
              
              {activeFramework === framework.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">Core Principles</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {framework.principles.map(principle => (
                      <li key={principle} className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: framework.color }}></span>
                        <span className="text-gray-700">{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Domain Implementations Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Domain-Specific Implementations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map(domain => (
            <div 
              key={domain.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${domain.color}20` }}>
                <span className="text-2xl">{domain.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{domain.title}</h3>
              <p className="text-gray-600 text-sm mb-4">Implementation guides for {domain.title.toLowerCase()} workflows</p>
              
              <ul className="space-y-2">
                {frameworks
                  .filter(f => f.domains.includes(domain.title))
                  .map(framework => (
                    <li key={framework.id} className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: framework.color }}></span>
                      <span className="text-sm text-gray-700">{framework.title}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Connection Visualization */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Framework Interconnections</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="w-full h-60 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative w-full h-40">
                {/* Central hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-gray-700 text-center">Framework Hub</span>
                </div>
                
                {/* Framework nodes */}
                {frameworks.map((framework, index) => {
                  // Position frameworks in a circle around the hub
                  const angle = (index * (360 / frameworks.length)) * (Math.PI / 180);
                  const radius = 100; // Distance from center
                  const x = Math.cos(angle) * radius + 50; // +50% to center
                  const y = Math.sin(angle) * radius + 50; // +50% to center
                  
                  return (
                    <div key={framework.id}>
                      {/* Connection line */}
                      <div 
                        className="absolute top-1/2 left-1/2 h-0.5 origin-left"
                        style={{
                          backgroundColor: framework.color,
                          width: radius,
                          transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                        }}
                      />
                      
                      {/* Framework node */}
                      <div 
                        className="absolute w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: framework.color,
                          top: `${y}%`,
                          left: `${x}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <span className="text-xs font-medium text-white text-center px-1">
                          {framework.title.split(' ').slice(0, 2).join(' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 mt-4">View relationships between frameworks and how they support each domain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworksDashboard;
