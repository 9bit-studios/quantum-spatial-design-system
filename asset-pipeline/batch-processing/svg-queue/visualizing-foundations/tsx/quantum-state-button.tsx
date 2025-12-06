import React, { useState, useEffect } from 'react';

export default function QuantumStateButton({ 
  children, 
  onClick, 
  type = 'primary', // primary, secondary, ghost
  size = 'medium', // small, medium, large
  state = 'heritage', // heritage, transitional, quantum
  icon = null,
  disabled = false
}) {
  const [hoverState, setHoverState] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pulseState, setPulseState] = useState(0);
  
  // Animation for quantum effects
  useEffect(() => {
    if (state === 'quantum') {
      const timer = setInterval(() => {
        setPulseState((prev) => (prev + 0.05) % 1);
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [state]);
  
  // Color schemes
  const colorSchemes = {
    primary: {
      heritage: {
        bg: 'bg-[#2C5F2D]',
        border: 'border-[#3D8B40]',
        text: 'text-white',
        hover: 'bg-[#3D8B40]',
        active: 'bg-[#1B3D1A]',
        shadow: 'shadow-[#2C5F2D]'
      },
      transitional: {
        bg: 'bg-gradient-to-r from-[#2C5F2D] to-[#331F4A]',
        border: 'border-[#5AC8FA]',
        text: 'text-white',
        hover: 'opacity-90',
        active: 'opacity-80',
        shadow: 'shadow-[#5AC8FA]'
      },
      quantum: {
        bg: 'bg-gradient-to-r from-[#331F4A] to-[#6A3093]',
        border: 'border-transparent',
        text: 'text-white',
        hover: 'opacity-90',
        active: 'opacity-80',
        shadow: 'shadow-[#5AC8FA]'
      }
    },
    secondary: {
      heritage: {
        bg: 'bg-transparent',
        border: 'border-[#2C5F2D]',
        text: 'text-[#2C5F2D]',
        hover: 'bg-[#2C5F2D] bg-opacity-10',
        active: 'bg-[#2C5F2D] bg-opacity-20',
        shadow: 'shadow-none'
      },
      transitional: {
        bg: 'bg-transparent',
        border: 'border-[#5AC8FA]',
        text: 'text-[#5AC8FA]',
        hover: 'bg-[#5AC8FA] bg-opacity-10',
        active: 'bg-[#5AC8FA] bg-opacity-20',
        shadow: 'shadow-none'
      },
      quantum: {
        bg: 'bg-transparent',
        border: 'border-[#6A3093]',
        text: 'text-[#6A3093]',
        hover: 'bg-[#6A3093] bg-opacity-10',
        active: 'bg-[#6A3093] bg-opacity-20',
        shadow: 'shadow-none'
      }
    },
    ghost: {
      heritage: {
        bg: 'bg-transparent',
        border: 'border-transparent',
        text: 'text-[#2C5F2D]',
        hover: 'bg-[#2C5F2D] bg-opacity-10',
        active: 'bg-[#2C5F2D] bg-opacity-20',
        shadow: 'shadow-none'
      },
      transitional: {
        bg: 'bg-transparent',
        border: 'border-transparent',
        text: 'text-[#5AC8FA]',
        hover: 'bg-[#5AC8FA] bg-opacity-10',
        active: 'bg-[#5AC8FA] bg-opacity-20',
        shadow: 'shadow-none'
      },
      quantum: {
        bg: 'bg-transparent',
        border: 'border-transparent',
        text: 'text-[#BF4080]',
        hover: 'bg-[#BF4080] bg-opacity-10',
        active: 'bg-[#BF4080] bg-opacity-20',
        shadow: 'shadow-none'
      }
    }
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };
  
  // Get current color scheme
  const scheme = colorSchemes[type][state];
  
  // Quantum effects for different states
  const renderQuantumEffects = () => {
    if (state === 'heritage' || disabled) return null;
    
    if (state === 'transitional') {
      return (
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ opacity: hoverState ? 0.7 : 0.3 }}
        >
          <div 
            className="absolute left-0 h-full w-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${type === 'primary' ? '#5AC8FA' : '#6A3093'}, transparent)`,
              boxShadow: `0 0 10px ${type === 'primary' ? '#5AC8FA' : '#6A3093'}`,
              opacity: hoverState ? 0.9 : 0.5
            }}
          />
          <div 
            className="absolute right-0 h-full w-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${type === 'primary' ? '#6A3093' : '#5AC8FA'}, transparent)`,
              boxShadow: `0 0 10px ${type === 'primary' ? '#6A3093' : '#5AC8FA'}`,
              opacity: hoverState ? 0.9 : 0.5
            }}
          />
        </div>
      );
    }
    
    if (state === 'quantum') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Edge glow effect */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              boxShadow: `inset 0 0 ${hoverState ? '3px' : '1px'} ${type === 'primary' ? '#5AC8FA' : '#BF4080'}`,
              opacity: 0.7 + Math.sin(pulseState * Math.PI * 2) * 0.3
            }}
          />
          
          {/* Particle effects */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 + pulseState * Math.PI * 2;
            const distance = (hoverState ? 0.8 : 0.5) * (Math.sin(pulseState * Math.PI * 4 + i) * 5 + 15);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 2 + Math.sin(pulseState * Math.PI * 2 + i) * 2;
            
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: i % 2 === 0 ? '#5AC8FA' : '#BF4080',
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  opacity: hoverState ? 0.9 : 0.6,
                  boxShadow: `0 0 ${size * 2}px ${i % 2 === 0 ? '#5AC8FA' : '#BF4080'}`,
                  filter: 'blur(1px)'
                }}
              />
            );
          })}
        </div>
      );
    }
    
    return null;
  };
  
  // Button event handlers
  const handleMouseEnter = () => {
    if (!disabled) setHoverState(true);
  };
  
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverState(false);
      setIsPressed(false);
    }
  };
  
  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    if (!disabled) setIsPressed(false);
  };
  
  const handleClick = (e) => {
    if (!disabled && onClick) onClick(e);
  };

  return (
    <button
      className={`relative overflow-hidden rounded-lg flex items-center justify-center transition-all duration-300
        ${scheme.bg} ${scheme.border} ${scheme.text} ${scheme.shadow}
        ${sizeClasses[size]} ${hoverState && !disabled ? scheme.hover : ''} 
        ${isPressed && !disabled ? scheme.active : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${state === 'transitional' ? 'border border-transparent' : state === 'quantum' ? '' : 'border'}`}
      style={{
        boxShadow: hoverState && type === 'primary' && state === 'quantum' && !disabled ? 
          `0 0 20px ${scheme.shadow}40` : state === 'quantum' ? `0 0 10px ${scheme.shadow}30` : 'none',
        transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* Quantum visual effects */}
      {renderQuantumEffects()}
      
      {/* Content with icon support */}
      <div className="flex items-center justify-center relative z-10">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  );
}
