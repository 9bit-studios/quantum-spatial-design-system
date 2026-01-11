import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

export default function DimensionalProgressTracker({ 
  steps = [],
  currentStep = 0,
  completedSteps = [],
  type = 'spirit' // spirit, mortal, quantum
}) {
  const [energyPulse, setEnergyPulse] = useState(0);
  
  // Colors based on fragment type
  const colors = {
    spirit: {
      primary: "#BF4080",
      secondary: "#6A3093",
      accent: "#5AC8FA"
    },
    mortal: {
      primary: "#5AC8FA", 
      secondary: "#29B6F6",
      accent: "#131A36"
    },
    quantum: {
      primary: "#FF2D55",
      secondary: "#FF6B6B",
      accent: "#0D0D15"
    }
  };
  
  // Animation for energy pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergyPulse((prev) => (prev + 0.02) % 1);
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // Theme colors based on type
  const theme = colors[type];
  
  return (
    <div className="w-full py-8 relative">
      {/* Dimensional grid background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, ${theme.primary} 1px, transparent 1px), 
                            linear-gradient(to bottom, ${theme.primary} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'center center'
        }} />
      </div>
      
      {/* Progress line */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step node */}
              <div className="flex flex-col items-center relative">
                {/* Progress indicator */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center relative z-20 
                    ${completedSteps.includes(index) 
                      ? 'bg-gradient-to-br from-' + theme.primary + ' to-' + theme.secondary 
                      : currentStep === index 
                        ? 'border-2 border-' + theme.primary + ' bg-transparent' 
                        : 'border-2 border-gray-700 bg-[#0D0D15]'}`}
                  style={{
                    boxShadow: completedSteps.includes(index) || currentStep === index 
                      ? `0 0 15px ${theme.primary}80` 
                      : 'none'
                  }}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle size={24} className="text-white" />
                  ) : currentStep === index ? (
                    // Pulsing current step
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ 
                        backgroundColor: theme.primary,
                        opacity: 0.5 + Math.sin(energyPulse * Math.PI * 2) * 0.5,
                        boxShadow: `0 0 10px ${theme.primary}`
                      }}
                    />
                  ) : (
                    <Circle size={24} className="text-gray-500" />
                  )}
                  
                  {/* Energy particles for current step */}
                  {currentStep === index && (
                    <>
                      {[...Array(6)].map((_, i) => {
                        const angle = (i / 6) * Math.PI * 2 + energyPulse * Math.PI * 2;
                        const distance = 20 + Math.sin(energyPulse * Math.PI * 4 + i) * 5;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        const size = 3 + Math.sin(energyPulse * Math.PI * 2 + i) * 2;
                        
                        return (
                          <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              backgroundColor: theme.primary,
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              opacity: 0.7,
                              boxShadow: `0 0 ${size * 2}px ${theme.primary}`,
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
                
                {/* Step label */}
                <div className="mt-3 text-center">
                  <div 
                    className={`font-medium ${completedSteps.includes(index) || currentStep === index 
                      ? 'text-' + theme.primary 
                      : 'text-gray-500'}`}
                  >
                    {step.title}
                  </div>
                  
                  {(completedSteps.includes(index) || currentStep === index) && (
                    <div className="text-xs mt-1 text-white text-opacity-60 max-w-[120px]">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 relative flex items-center mx-2">
                  <div 
                    className="h-1 w-full absolute"
                    style={{
                      background: index < currentStep 
                        ? `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` 
                        : '#1a1a2e',
                      boxShadow: index < currentStep 
                        ? `0 0 10px ${theme.primary}50` 
                        : 'none'
                    }}
                  />
                  
                  {/* Energy pulse along the active lines */}
                  {index < currentStep && (
                    <div 
                      className="absolute h-2 w-6 rounded-full"
                      style={{
                        backgroundColor: theme.primary,
                        left: `calc(${energyPulse * 100}% - 3px)`,
                        opacity: 0.8,
                        boxShadow: `0 0 10px ${theme.primary}`,
                        filter: 'blur(2px)'
                      }}
                    />
                  )}
                  
                  {/* Direction indicator */}
                  {index === currentStep - 1 && (
                    <div 
                      className="absolute right-0 transform translate-x-1/2 bg-[#0D0D15] p-1 rounded-full z-10"
                      style={{
                        border: `2px solid ${theme.primary}`,
                        boxShadow: `0 0 10px ${theme.primary}50`
                      }}
                    >
                      <ArrowRight size={14} className={`text-${theme.primary}`} />
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
