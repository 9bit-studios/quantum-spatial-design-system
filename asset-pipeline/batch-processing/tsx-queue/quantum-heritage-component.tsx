import React, { useState } from 'react';

const QuantumHeritageVisualizer = () => {
  const [energyState, setEnergyState] = useState(0.5);

  // Quantum-inspired color calculation
  const calculateQuantumGreen = (energyLevel) => {
    const baseGreen = '#2C5F2D';
    const lightGreen = '#3D8B40';
    const darkGreen = '#1B3D1A';

    // Interpolate between colors based on energy state
    const interpolateColor = (start, end, factor) => {
      const startRGB = parseInt(start.slice(1), 16);
      const endRGB = parseInt(end.slice(1), 16);
      
      const r = Math.round(((startRGB >> 16) & 0xff) * (1 - factor) + ((endRGB >> 16) & 0xff) * factor);
      const g = Math.round(((startRGB >> 8) & 0xff) * (1 - factor) + ((endRGB >> 8) & 0xff) * factor);
      const b = Math.round((startRGB & 0xff) * (1 - factor) + (endRGB & 0xff) * factor);
      
      return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    };

    // Dynamic color and opacity based on energy state
    const dynamicColor = energyLevel < 0.5
      ? interpolateColor(lightGreen, baseGreen, energyLevel * 2)
      : interpolateColor(baseGreen, darkGreen, (energyLevel - 0.5) * 2);
    
    return {
      color: dynamicColor,
      opacity: 0.15 + (energyLevel * 0.75)
    };
  };

  const quantumStyle = calculateQuantumGreen(energyState);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div 
        className="w-64 h-64 rounded-lg shadow-lg transition-all duration-500"
        style={{
          backgroundColor: quantumStyle.color,
          opacity: quantumStyle.opacity
        }}
      >
        <h2 className="text-white text-center pt-24">
          Quantum Heritage State
        </h2>
      </div>
      
      <div className="mt-8 w-64">
        <label 
          htmlFor="energy-slider" 
          className="block text-sm font-medium text-gray-700"
        >
          Quantum Energy State
        </label>
        <input 
          id="energy-slider"
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={energyState}
          onChange={(e) => setEnergyState(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default QuantumHeritageVisualizer;
