import React, { useState, useEffect, useRef } from 'react';
import './PixelViewer.css';

// Interface for pixel generation options
interface PixelOptions {
  state: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  size: number;
  primaryColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  glowIntensity?: number;
  animationDuration?: number;
  displacementScale?: number;
  is3D: boolean;
}

// Interface for the component props
interface PixelViewerProps {
  initialState?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  initialDimension?: '2d' | '3d';
}

/**
 * Unified Quantum-Spatial Pixel Viewer Component
 * Displays both 2D and 3D pixel visualizations with state-driven navigation
 */
const PixelViewer: React.FC<PixelViewerProps> = ({
  initialState = 'heritage',
  initialDimension = '3d'
}) => {
  // State management
  const [activeState, setActiveState] = useState<'heritage' | 'transitional' | 'quantum' | 'superposition'>(initialState);
  const [activeDimension, setActiveDimension] = useState<'2d' | '3d'>(initialDimension);
  const [colorScheme, setColorScheme] = useState<'default' | 'heritage' | 'transitional' | 'quantum'>('default');
  
  // Animation references for cleanup
  const animationRef = useRef<number | null>(null);
  
  // Canvas references
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const size64CanvasRef = useRef<HTMLCanvasElement>(null);
  const size128CanvasRef = useRef<HTMLCanvasElement>(null);
  const size200CanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Default color configurations for each state
  const stateColors = {
    heritage: {
      default: { primary: '#2C5F2D', accent: '#3DFF74', secondary: '#1B3D1A' },
      heritage: { primary: '#2C5F2D', accent: '#3DFF74', secondary: '#1B3D1A' },
      transitional: { primary: '#331F4A', accent: '#3DFF74', secondary: '#1E1F5C' },
      quantum: { primary: '#6A3093', accent: '#3DFF74', secondary: '#FF2D55' }
    },
    transitional: {
      default: { primary: '#331F4A', accent: '#5AC8FA', secondary: '#1E1F5C' },
      heritage: { primary: '#2C5F2D', accent: '#5AC8FA', secondary: '#1B3D1A' },
      transitional: { primary: '#331F4A', accent: '#5AC8FA', secondary: '#1E1F5C' },
      quantum: { primary: '#6A3093', accent: '#5AC8FA', secondary: '#FF2D55' }
    },
    quantum: {
      default: { primary: '#6A3093', accent: '#BF4080', secondary: '#FF2D55' },
      heritage: { primary: '#2C5F2D', accent: '#BF4080', secondary: '#3DFF74' },
      transitional: { primary: '#331F4A', accent: '#BF4080', secondary: '#5AC8FA' },
      quantum: { primary: '#6A3093', accent: '#BF4080', secondary: '#FF2D55' }
    },
    superposition: {
      default: { primary: '#FFFFFF', accent: '#5AC8FA', secondary: '#FF2D55' },
      heritage: { primary: '#FFFFFF', accent: '#3DFF74', secondary: '#2C5F2D' },
      transitional: { primary: '#FFFFFF', accent: '#5AC8FA', secondary: '#331F4A' },
      quantum: { primary: '#FFFFFF', accent: '#FF2D55', secondary: '#6A3093' }
    }
  };
  
  // Glow intensity based on state
  const glowIntensities = {
    heritage: 3,
    transitional: 4, 
    quantum: 6,
    superposition: 8
  };

  // Generate current pixel options based on state
  const getPixelOptions = (size: number = 300): PixelOptions => {
    const colors = stateColors[activeState][colorScheme];
    
    return {
      state: activeState,
      size: size,
      primaryColor: colors.primary,
      accentColor: colors.accent,
      secondaryColor: colors.secondary,
      glowIntensity: glowIntensities[activeState],
      is3D: activeDimension === '3d'
    };
  };
  
  // Render pixels when state changes
  useEffect(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Render main canvas
    if (mainCanvasRef.current) {
      renderPixelToCanvas(
        mainCanvasRef.current, 
        getPixelOptions()
      );
    }
    
    // Render size variants
    if (size64CanvasRef.current) {
      renderPixelToCanvas(
        size64CanvasRef.current, 
        getPixelOptions(64)
      );
    }
    
    if (size128CanvasRef.current) {
      renderPixelToCanvas(
        size128CanvasRef.current, 
        getPixelOptions(128)
      );
    }
    
    if (size200CanvasRef.current) {
      renderPixelToCanvas(
        size200CanvasRef.current, 
        getPixelOptions(200)
      );
    }
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeState, activeDimension, colorScheme]);
  
  // Render pixel to canvas based on options
  const renderPixelToCanvas = (canvas: HTMLCanvasElement, options: PixelOptions) => {
    // In a real implementation, this would call the actual rendering functions from volumetric-pixel-generator.js
    // For this implementation, we're using a simplified simulation
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Determine if we're rendering 2D or 3D
    if (options.is3D) {
      simulate3DPixel(ctx, options);
    } else {
      simulate2DPixel(ctx, options);
    }
  };
  
  // Simplified 3D pixel simulation
  const simulate3DPixel = (ctx: CanvasRenderingContext2D, options: PixelOptions) => {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const { state, size, primaryColor, accentColor, secondaryColor, glowIntensity } = options;
    
    // Scale factor to maintain proportions
    const scale = size / 200;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Render based on state
    switch (state) {
      case 'heritage':
        renderHeritage3D(ctx, scale, primaryColor, accentColor, secondaryColor, glowIntensity);
        break;
      case 'transitional':
        renderTransitional3D(ctx, scale, primaryColor, accentColor, secondaryColor, glowIntensity);
        break;
      case 'quantum':
        renderQuantum3D(ctx, scale, primaryColor, accentColor, secondaryColor, glowIntensity);
        break;
      case 'superposition':
        renderSuperposition3D(ctx, scale, primaryColor, accentColor, secondaryColor, glowIntensity);
        break;
    }
    
    ctx.restore();
  };
  
  // Simplified 2D pixel simulation
  const simulate2DPixel = (ctx: CanvasRenderingContext2D, options: PixelOptions) => {
    const { width, height } = ctx.canvas;
    const { state, size, primaryColor, accentColor, secondaryColor, glowIntensity } = options;
    
    // Position for centered drawing
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    const borderRadius = Math.max(4, size * 0.06);
    
    ctx.save();
    
    // Render based on state
    switch (state) {
      case 'heritage':
        renderHeritage2D(ctx, x, y, size, borderRadius, primaryColor, accentColor);
        break;
      case 'transitional':
        renderTransitional2D(ctx, x, y, size, borderRadius, primaryColor, accentColor);
        break;
      case 'quantum':
        renderQuantum2D(ctx, x, y, size, borderRadius, primaryColor, accentColor, secondaryColor);
        break;
      case 'superposition':
        renderSuperposition2D(ctx, x, y, size, borderRadius, primaryColor, accentColor, secondaryColor);
        break;
    }
    
    ctx.restore();
  };
  
  // Heritage 3D Rendering
  const renderHeritage3D = (
    ctx: CanvasRenderingContext2D, 
    scale: number, 
    primaryColor = '#2C5F2D', 
    accentColor = '#3DFF74',
    secondaryColor = '#1B3D1A',
    glowIntensity = 3
  ) => {
    // Apply shadow for glow effect
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = glowIntensity;
    
    // Top face (Rotated Square)
    ctx.fillStyle = primaryColor;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1 * scale;
    
    ctx.beginPath();
    ctx.moveTo(0, -30 * scale);
    ctx.lineTo(40 * scale, -10 * scale);
    ctx.lineTo(0, 10 * scale);
    ctx.lineTo(-40 * scale, -10 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Right face
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.moveTo(40 * scale, -10 * scale);
    ctx.lineTo(40 * scale, 30 * scale);
    ctx.lineTo(0, 50 * scale);
    ctx.lineTo(0, 10 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Left face
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.moveTo(-40 * scale, -10 * scale);
    ctx.lineTo(0, 10 * scale);
    ctx.lineTo(0, 50 * scale);
    ctx.lineTo(-40 * scale, 30 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Pixel grid overlay
    ctx.fillStyle = 'url(#pixel-grid)';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -25 * scale);
    ctx.lineTo(35 * scale, -8 * scale);
    ctx.lineTo(0, 8 * scale);
    ctx.lineTo(-35 * scale, -8 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Heritage State Highlight Points
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(-20 * scale, -5 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(20 * scale, -5 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(0, 5 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Transitional 3D Rendering
  const renderTransitional3D = (
    ctx: CanvasRenderingContext2D, 
    scale: number, 
    primaryColor = '#331F4A', 
    accentColor = '#5AC8FA',
    secondaryColor = '#1E1F5C',
    glowIntensity = 4
  ) => {
    // Center glow effect
    ctx.fillStyle = 'none';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1 * scale;
    ctx.globalAlpha = 0.3;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = glowIntensity;
    
    ctx.beginPath();
    ctx.arc(0, 0, 36 * scale, 0, Math.PI * 2);
    ctx.stroke();
    
    // Reset shadow for main shapes
    ctx.shadowBlur = 0;
    
    // Top face
    ctx.globalAlpha = 1;
    ctx.fillStyle = primaryColor;
    ctx.strokeStyle = accentColor;
    
    ctx.beginPath();
    ctx.moveTo(0, -35 * scale);
    ctx.lineTo(45 * scale, -11.5 * scale);
    ctx.lineTo(0, 12 * scale);
    ctx.lineTo(-45 * scale, -11.5 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Right face
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.moveTo(45 * scale, -11.5 * scale);
    ctx.lineTo(45 * scale, 35 * scale);
    ctx.lineTo(0, 58 * scale);
    ctx.lineTo(0, 12 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Front face
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.moveTo(-45 * scale, -11.5 * scale);
    ctx.lineTo(0, 12 * scale);
    ctx.lineTo(0, 58 * scale);
    ctx.lineTo(-45 * scale, 35 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Energy flows
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = glowIntensity;
    
    // Circle 1
    ctx.beginPath();
    ctx.arc(-22 * scale, -5 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Circle 2
    ctx.beginPath();
    ctx.arc(22 * scale, -5 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Circle 3
    ctx.beginPath();
    ctx.arc(0, 8 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Energy particles
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(-15 * scale, -15 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(15 * scale, -15 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(-15 * scale, 15 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(15 * scale, 15 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Edge highlights
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = accentColor;
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1.2 * scale;
    
    ctx.beginPath();
    ctx.moveTo(-45 * scale, -11.5 * scale);
    ctx.lineTo(-45 * scale, 35 * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(45 * scale, -11.5 * scale);
    ctx.lineTo(45 * scale, 35 * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 12 * scale);
    ctx.lineTo(0, 58 * scale);
    ctx.stroke();
  };
  
  // Quantum 3D Rendering
  const renderQuantum3D = (
    ctx: CanvasRenderingContext2D, 
    scale: number, 
    primaryColor = '#6A3093', 
    accentColor = '#BF4080',
    secondaryColor = '#FF2D55',
    glowIntensity = 6
  ) => {
    // Background energy field
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = 'rgba(90, 200, 250, 0.2)';
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = glowIntensity;
    
    ctx.beginPath();
    ctx.arc(0, 0, 70 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Energy ripples
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 0.5 * scale;
    
    [50 * scale, 40 * scale, 30 * scale].forEach(radius => {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
    });
    
    // Main shape - more rounded quantum form
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = primaryColor;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1 * scale;
    
    // Top face (rounded)
    ctx.beginPath();
    ctx.moveTo(0, -40 * scale);
    ctx.bezierCurveTo(
      10 * scale, -40 * scale,
      40 * scale, -20 * scale,
      40 * scale, -15 * scale
    );
    ctx.bezierCurveTo(
      40 * scale, -10 * scale,
      10 * scale, 15 * scale,
      0, 15 * scale
    );
    ctx.bezierCurveTo(
      -10 * scale, 15 * scale,
      -40 * scale, -10 * scale,
      -40 * scale, -15 * scale
    );
    ctx.bezierCurveTo(
      -40 * scale, -20 * scale,
      -10 * scale, -40 * scale,
      0, -40 * scale
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Right face with rounded edges
    ctx.beginPath();
    ctx.moveTo(40 * scale, -15 * scale);
    ctx.bezierCurveTo(
      40 * scale, -10 * scale,
      40 * scale, 40 * scale,
      40 * scale, 40 * scale
    );
    ctx.bezierCurveTo(
      40 * scale, 45 * scale,
      10 * scale, 65 * scale,
      0, 60 * scale
    );
    ctx.bezierCurveTo(
      -5 * scale, 55 * scale,
      0, 15 * scale,
      0, 15 * scale
    );
    ctx.bezierCurveTo(
      0, 10 * scale,
      35 * scale, -15 * scale,
      40 * scale, -15 * scale
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Quantum energy core
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = secondaryColor;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = glowIntensity;
    
    ctx.beginPath();
    ctx.arc(0, 0, 15 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Orbital particles
    const particleCount = 4;
    const radius = 28 * scale;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Energy connections
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 0.5 * scale;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  
  // Superposition 3D Rendering
  const renderSuperposition3D = (
    ctx: CanvasRenderingContext2D, 
    scale: number, 
    primaryColor = '#FFFFFF', 
    accentColor = '#5AC8FA',
    secondaryColor = '#FF2D55',
    glowIntensity = 8
  ) => {
    // Hyperdimensional field
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = glowIntensity;
    
    ctx.beginPath();
    ctx.arc(0, 0, 80 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Heritage state (shifted and rotated)
    ctx.save();
    ctx.translate(-10 * scale, -10 * scale);
    ctx.rotate(-Math.PI / 36); // -5 degrees
    ctx.globalAlpha = 0.6;
    
    ctx.fillStyle = '#2C5F2D'; // Heritage Green
    ctx.strokeStyle = '#3DFF74'; // Heritage Pixel Green
    ctx.lineWidth = 0.8 * scale;
    
    ctx.beginPath();
    ctx.moveTo(0, -30 * scale);
    ctx.bezierCurveTo(
      8 * scale, -30 * scale,
      30 * scale, -15 * scale,
      30 * scale, -12 * scale
    );
    ctx.bezierCurveTo(
      30 * scale, -10 * scale,
      8 * scale, 10 * scale,
      0, 10 * scale
    );
    ctx.bezierCurveTo(
      -8 * scale, 10 * scale,
      -30 * scale, -10 * scale,
      -30 * scale, -12 * scale
    );
    ctx.bezierCurveTo(
      -30 * scale, -15 * scale,
      -8 * scale, -30 * scale,
      0, -30 * scale
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
    
    // Transitional state (centered)
    ctx.globalAlpha = 0.7;
    
    ctx.fillStyle = '#331F4A'; // Dimensional Eggplant
    ctx.strokeStyle = '#5AC8FA'; // Subtle Cyan
    ctx.lineWidth = 0.8 * scale;
    
    ctx.beginPath();
    ctx.moveTo(0, -35 * scale);
    ctx.bezierCurveTo(
      10 * scale, -35 * scale,
      35 * scale, -18 * scale,
      35 * scale, -15 * scale
    );
    ctx.bezierCurveTo(
      35 * scale, -12 * scale,
      10 * scale, 15 * scale,
      0, 15 * scale
    );
    ctx.bezierCurveTo(
      -10 * scale, 15 * scale,
      -35 * scale, -12 * scale,
      -35 * scale, -15 * scale
    );
    ctx.bezierCurveTo(
      -35 * scale, -18 * scale,
      -10 * scale, -35 * scale,
      0, -35 * scale
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Quantum state (shifted and rotated opposite)
    ctx.save();
    ctx.translate(10 * scale, 10 * scale);
    ctx.rotate(Math.PI / 36); // 5 degrees
    ctx.globalAlpha = 0.6;
    
    ctx.fillStyle = '#6A3093'; // Quantum Violet
    ctx.strokeStyle = '#FF2D55'; // Quantum Pulse Pink
    ctx.lineWidth = 0.8 * scale;
    
    ctx.beginPath();
    ctx.moveTo(0, -30 * scale);
    ctx.bezierCurveTo(
      8 * scale, -30 * scale,
      30 * scale, -15 * scale,
      30 * scale, -12 * scale
    );
    ctx.bezierCurveTo(
      30 * scale, -10 * scale,
      8 * scale, 10 * scale,
      0, 10 * scale
    );
    ctx.bezierCurveTo(
      -8 * scale, 10 * scale,
      -30 * scale, -10 * scale,
      -30 * scale, -12 * scale
    );
    ctx.bezierCurveTo(
      -30 * scale, -15 * scale,
      -8 * scale, -30 * scale,
      0, -30 * scale
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
    
    // Quantum Superposition Core
    ctx.globalAlpha = 1;
    ctx.fillStyle = primaryColor;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = glowIntensity;
    
    ctx.beginPath();
    ctx.arc(0, 0, 15 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Energy transfer particles
    ctx.globalAlpha = 0.9;
    
    // Heritage to Transitional particles
    ctx.fillStyle = '#3DFF74'; // Heritage Pixel Green
    ctx.beginPath();
    ctx.arc(-20 * scale, -20 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Transitional to Quantum particles
    ctx.fillStyle = '#5AC8FA'; // Subtle Cyan
    ctx.beginPath();
    ctx.arc(20 * scale, 20 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Quantum to Heritage particles
    ctx.fillStyle = '#FF2D55'; // Quantum Pulse Pink
    ctx.beginPath();
    ctx.arc(20 * scale, -20 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Probability wave ripples
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5 * scale;
    
    ctx.beginPath();
    ctx.moveTo(-40 * scale, 0);
    ctx.bezierCurveTo(
      -30 * scale, 10 * scale,
      -15 * scale, 15 * scale,
      0, 10 * scale
    );
    ctx.bezierCurveTo(
      15 * scale, 5 * scale,
      30 * scale, 0,
      40 * scale, 10 * scale
    );
    ctx.stroke();
  };
  
  // Heritage 2D Rendering
  const renderHeritage2D = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    borderRadius: number,
    primaryColor = '#2C5F2D', 
    accentColor = '#3DFF74'
  ) => {
    // Main pixel shape
    ctx.fillStyle = primaryColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 3;
    
    roundRect(ctx, x, y, size, size, borderRadius);
    ctx.fill();
    
    // Highlight edge
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    roundRect(ctx, x + 3, y + 3, size - 6, size - 6, borderRadius - 1);
    ctx.stroke();
  };
  
  // Transitional 2D Rendering
  const renderTransitional2D = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    borderRadius: number,
    primaryColor = '#331F4A', 
    accentColor = '#5AC8FA'
  ) => {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Main pixel shape with partial materialization
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, size / 2
    );
    gradient.addColorStop(0, accentColor + '05'); // Very transparent
    gradient.addColorStop(0.8, primaryColor + 'B3'); // 70% opacity
    gradient.addColorStop(1, primaryColor + 'CC'); // 80% opacity
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 4;
    
    roundRect(ctx, x, y, size, size, borderRadius);
    ctx.fill();
    
    // Edge detail to suggest partial materialization
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 2]);
    ctx.globalAlpha = 0.6;
    roundRect(ctx, x + 1, y + 1, size - 2, size - 2, borderRadius);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Energy highlights
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.6;
    
    // Particle 1
    ctx.beginPath();
    ctx.arc(x + size * 0.25, y + size * 0.25, size * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    // Particle 2
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(x + size * 0.75, y + size * 0.65, size * 0.06, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Quantum 2D Rendering
  const renderQuantum2D = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    borderRadius: number,
    primaryColor = '#6A3093', 
    accentColor = '#BF4080',
    secondaryColor = '#FF2D55'
  ) => {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Energy background
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, size / 2
    );
    gradient.addColorStop(0, secondaryColor + 'E6'); // 90% opacity
    gradient.addColorStop(0.3, accentColor + 'B3'); // 70% opacity
    gradient.addColorStop(0.8, primaryColor + 'B3'); // 70% opacity
    gradient.addColorStop(1, primaryColor + '80'); // 50% opacity
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 6;
    
    // Create mask for energy ripple effect
    ctx.save();
    roundRect(ctx, x, y, size, size, borderRadius);
    ctx.fill();
    ctx.restore();
    
    // Inner energy pulse
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.8;
    
    const innerSize = size * 0.5;
    const innerX = centerX - innerSize / 2;
    const innerY = centerY - innerSize / 2;
    roundRect(ctx, innerX, innerY, innerSize, innerSize, borderRadius / 2);
    ctx.stroke();
    
    // Energy particles
    ctx.fillStyle = secondaryColor;
    
    // Animated particles
    const particlePositions = [
      { x: x + size * 0.2, y: y + size * 0.3 },
      { x: x + size * 0.8, y: y + size * 0.3 },
      { x: x + size * 0.5, y: y + size * 0.8 }
    ];
    
    particlePositions.forEach((pos, i) => {
      ctx.globalAlpha = 0.6 + (i * 0.1);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size * 0.05, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Superposition 2D Rendering
  const renderSuperposition2D = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    borderRadius: number,
    primaryColor = '#FFFFFF', 
    accentColor = '#5AC8FA',
    secondaryColor = '#FF2D55'
  ) => {
    // Layer 3 (background layer)
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.2;
    
    roundRect(ctx, 
      x + size * 0.2, 
      y + size * 0.2, 
      size * 0.6, 
      size * 0.6, 
      borderRadius * 0.8
    );
    ctx.fill();
    
    // Layer 2 (middle layer)
    ctx.fillStyle = primaryColor;
    ctx.globalAlpha = 0.3;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 8;
    
    roundRect(ctx, 
      x + size * 0.1, 
      y + size * 0.1, 
      size * 0.8, 
      size * 0.8, 
      borderRadius * 0.9
    );
    ctx.fill();
    
    // Layer 1 (primary layer)
    const gradient = ctx.createLinearGradient(
      x, y,
      x + size, y + size
    );
    gradient.addColorStop(0, accentColor + '4D'); // 30% opacity
    gradient.addColorStop(0.5, primaryColor + 'B3'); // 70% opacity
    gradient.addColorStop(1, secondaryColor + '4D'); // 30% opacity
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8;
    
    roundRect(ctx, x, y, size, size, borderRadius);
    ctx.fill();
    
    // Position indicator lines
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 1]);
    ctx.globalAlpha = 0.6;
    
    // Line 1
    ctx.beginPath();
    ctx.moveTo(x + size * 0.2, y + size * 0.2);
    ctx.lineTo(x + size * 0.8, y + size * 0.8);
    ctx.stroke();
    
    // Line 2
    ctx.beginPath();
    ctx.moveTo(x + size * 0.8, y + size * 0.2);
    ctx.lineTo(x + size * 0.2, y + size * 0.8);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Quantum state indicators
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 5;
    
    // Indicator 1
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.beginPath();
    ctx.arc(x + size * 0.2, y + size * 0.2, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Indicator 2
    ctx.fillStyle = secondaryColor;
    ctx.shadowColor = secondaryColor;
    ctx.beginPath();
    ctx.arc(x + size * 0.8, y + size * 0.8, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Helper function to draw rounded rectangles
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  
  // Generate implementation code for the current pixel type
  const getImplementationCode = (): string => {
    const colors = stateColors[activeState][colorScheme];
    
    return `
// Import the pixel generator
import { ${activeDimension === '3d' ? 'generateVolumetricPixel' : 'generateQuantumPixel'} } from '@9bit/quantum-spatial';

// Generate a ${activeState} pixel with ${activeDimension} rendering
const pixel = ${activeDimension === '3d' ? 'generateVolumetricPixel' : 'generateQuantumPixel'}({
  state: '${activeState}',
  size: 200,
  primaryColor: '${colors.primary}',
  accentColor: '${colors.accent}',
  secondaryColor: '${colors.secondary}',
  ${activeDimension === '3d' ? `glowIntensity: ${glowIntensities[activeState]},` : ''}
  ${activeDimension === '3d' ? `animationDuration: 4,` : ''}
});

// Apply to DOM element
document.getElementById('pixel-container').innerHTML = pixel;
`;
  };

  return (
    <div className="quantum-pixel-viewer">
      <div className="dimensional-grid"></div>
      
      <main>
        <header>
          <h1>Quantum-Spatial {activeDimension === '3d' ? 'Volumetric' : 'Flat'} Pixel System</h1>
          <p>
            {activeDimension === '3d' 
              ? 'Advanced 3D/4D volumetric pixels that visually represent different energy states in the quantum-spatial design system.' 
              : 'Interactive viewer for the core pixel states in the Quantum-Spatial design system.'}
          </p>
        </header>
        
        {/* Primary state tabs */}
        <div className="tabs">
          <button 
            className={`tab-button heritage ${activeState === 'heritage' ? 'active' : ''}`} 
            onClick={() => setActiveState('heritage')}
          >
            Heritage State
          </button>
          <button 
            className={`tab-button transitional ${activeState === 'transitional' ? 'active' : ''}`}
            onClick={() => setActiveState('transitional')}
          >
            Transitional State
          </button>
          <button 
            className={`tab-button quantum ${activeState === 'quantum' ? 'active' : ''}`}
            onClick={() => setActiveState('quantum')}
          >
            Quantum State
          </button>
          <button 
            className={`tab-button superposition ${activeState === 'superposition' ? 'active' : ''}`}
            onClick={() => setActiveState('superposition')}
          >
            Superposition State
          </button>
        </div>
        
        {/* Dimension toggle */}
        <div className="dimension-toggle">
          <button 
            className={`dimension-btn ${activeDimension === '2d' ? 'active' : ''}`}
            onClick={() => setActiveDimension('2d')}
          >
            2D Flat
          </button>
          <button 
            className={`dimension-btn ${activeDimension === '3d' ? 'active' : ''}`}
            onClick={() => setActiveDimension('3d')}
          >
            3D Volumetric
          </button>
        </div>
        
        {/* Main content */}
        <div id={activeState} className="tab-content active">
          <div className="pixel-showcase">
            <div className="pixel-display">
              <canvas 
                ref={mainCanvasRef}
                width={300}
                height={300}
                className="pixel-canvas"
              />
            </div>
            
            <div className={`pixel-info pixel-info-${activeState}`}>
              <h3>{activeState === 'heritage' && 'Heritage State'}
                  {activeState === 'transitional' && 'Transitional State'}
                  {activeState === 'quantum' && 'Quantum State'}
                  {activeState === 'superposition' && 'Superposition State'}</h3>
              
              {activeState === 'heritage' && (
                <p>The Heritage state represents the foundational 8-bit pixel aesthetic with volumetric dimension. This state features clean edges, structured layout, and subtle energy highlights that reference the retro heritage of pixel art while adding modern depth through isometric projection.</p>
              )}
              
              {activeState === 'transitional' && (
                <p>The Transitional state shows the evolution from structured heritage to quantum fluidity. Features softened edges, increased dimensional depth, and animated energy particles that indicate transformation in process. This state blends structure with energy movement.</p>
              )}
              
              {activeState === 'quantum' && (
                <p>The fully evolved Quantum state represents advanced energy materialization with organic, fluid forms. Features a glowing energy core, orbiting particles, and dimensional ripples that extend beyond the pixel's boundaries. The cubic structure has evolved into a more rounded, organic form.</p>
              )}
              
              {activeState === 'superposition' && (
                <p>The Superposition state represents the simultaneous existence of multiple states, truly embracing quantum principles. Features overlapping forms from all three states (Heritage, Transitional, and Quantum) that shift and morph dynamically, with probabilistic wave patterns and energy transfer between states.</p>
              )}
            </div>
          </div>
          
          <h3>Size Variants</h3>
          <div className="size-variants">
            <div className={`size-variant size-variant-${activeState}`}>
              <div className="size-64">
                <canvas 
                  ref={size64CanvasRef}
                  width={64}
                  height={64}
                  className="pixel-canvas-small"
                />
              </div>
              <span className="size-variant-label">64px</span>
            </div>
            
            <div className={`size-variant size-variant-${activeState}`}>
              <div className="size-128">
                <canvas 
                  ref={size128CanvasRef}
                  width={128}
                  height={128}
                  className="pixel-canvas-small"
                />
              </div>
              <span className="size-variant-label">128px</span>
            </div>
            
            <div className={`size-variant size-variant-${activeState}`}>
              <div className="size-200">
                <canvas 
                  ref={size200CanvasRef}
                  width={200}
                  height={200}
                  className="pixel-canvas-small"
                />
              </div>
              <span className="size-variant-label">200px</span>
            </div>
          </div>
        </div>
        
        {/* Secondary Controls */}
        <div className="secondary-controls">
          <h3>Color Variants</h3>
          <div className="color-variants">
            <button 
              className={`color-variant-btn ${colorScheme === 'default' ? 'active' : ''}`}
              onClick={() => setColorScheme('default')}
            >
              <div className="color-sample default"></div>
              <span>Default</span>
            </button>
            
            <button 
              className={`color-variant-btn ${colorScheme === 'heritage' ? 'active' : ''}`}
              onClick={() => setColorScheme('heritage')}
            >
              <div className="color-sample heritage"></div>
              <span>Heritage</span>
            </button>
            
            <button 
              className={`color-variant-btn ${colorScheme === 'transitional' ? 'active' : ''}`}
              onClick={() => setColorScheme('transitional')}
            >
              <div className="color-sample transitional"></div>
              <span>Transitional</span>
            </button>
            
            <button 
              className={`color-variant-btn ${colorScheme === 'quantum' ? 'active' : ''}`}
              onClick={() => setColorScheme('quantum')}
            >
              <div className="color-sample quantum"></div>
              <span>Quantum</span>
            </button>
          </div>
        </div>
        
        {/* Implementation */}
        <div className="implementation-section">
          <h3>Implementation</h3>
          <div className="code-example">
            <pre className="code-block">
              <code>{getImplementationCode()}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PixelViewer;