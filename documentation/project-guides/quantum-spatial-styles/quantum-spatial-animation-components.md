# Quantum-Spatial Animation Components

## M4-Optimization Animation Techniques

- This file provides practical implementation guidance for creating quantum-spatial components
- These techniques are specifically designed to leverage the M4 chip's Neural Engine for optimal performance when rendering complex quantum-spatial animations.

```jsx

/**
 * M4-Optimization Techniques
 * 
 * These techniques are specifically designed to leverage the M4 chip's Neural Engine
 * for optimal performance when rendering complex quantum-spatial animations.
 */

// 1. Filter Optimization

// RECOMMENDED: Apply filters at component level
const OptimizedFilterExample = () => {
  return (
    <div className="component-container" style={{ filter: 'drop-shadow(0 0 5px rgba(90, 200, 250, 0.5))' }}>
      <div className="quantum-element"></div>
      <div className="quantum-element"></div>
      <div className="quantum-element"></div>
    </div>
  );
}

// NOT RECOMMENDED: Filters on individual elements
const UnoptimizedFilterExample = () => {
  return (
    <div className="component-container">
      <div className="quantum-element" style={{ filter: 'drop-shadow(0 0 5px rgba(90, 200, 250, 0.5))' }}></div>
      <div className="quantum-element" style={{ filter: 'drop-shadow(0 0 5px rgba(90, 200, 250, 0.5))' }}></div>
      <div className="quantum-element" style={{ filter: 'drop-shadow(0 0 5px rgba(90, 200, 250, 0.5))' }}></div>
    </div>
  );
}

// 2. Animation Performance

// RECOMMENDED: Group animations with the same timing
const OptimizedAnimationExample = () => {
  return (
    <div className="animation-container">
      {/* All elements have the same 4s animation cycle */}
      <style jsx>{`
        .pulse-element {
          animation: opacityPulse 4s infinite;
        }
        
        @keyframes opacityPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div className="pulse-element"></div>
      <div className="pulse-element"></div>
      <div className="pulse-element"></div>
    </div>
  );
}

// 3. SVG Structure Optimization

// RECOMMENDED: Use <defs> for repeatable patterns
const OptimizedSVGExample = () => {
  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      <defs>
        {/* Define once, use many times */}
        <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#131A36" />
          <stop offset="50%" stopColor="#331F4A" />
          <stop offset="100%" stopColor="#6A3093" />
        </linearGradient>
        
        <filter id="quantumGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Using the defined patterns */}
      <rect x="10" y="10" width="80" height="80" fill="url(#quantumGradient)" filter="url(#quantumGlow)" />
      <rect x="110" y="10" width="80" height="80" fill="url(#quantumGradient)" filter="url(#quantumGlow)" />
      <rect x="210" y="10" width="80" height="80" fill="url(#quantumGradient)" filter="url(#quantumGlow)" />
    </svg>
  );
}

```

## Practical Implementation Examples

### 1. Quantum Button Component

```tsx
// 1. Quantum Button Component

import React, { useState } from 'react';

export const QuantumButton = ({ 
  children, 
  state = 'transitional',  // heritage, transitional, quantum
  onClick,
  disabled = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Define gradient based on state
  const getGradient = () => {
    switch(state) {
      case 'heritage':
        return 'linear-gradient(135deg, #1B3D1A, #2C5F2D, #3D8B40)';
      case 'quantum':
        return 'linear-gradient(135deg, #6A3093, #BF4080, #FF2D55)';
      case 'transitional':
      default:
        return 'linear-gradient(135deg, #331F4A, #405de5, #613FE7)';
    }
  };
  
  // Define glow color based on state
  const getGlowColor = () => {
    switch(state) {
      case 'heritage':
        return 'rgba(61, 255, 116, 0.5)';
      case 'quantum':
        return 'rgba(191, 64, 128, 0.5)';
      case 'transitional':
      default:
        return 'rgba(90, 200, 250, 0.5)';
    }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        background: getGradient(),
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered && !disabled ? `0 4px 12px ${getGlowColor()}` : '0 2px 4px rgba(10, 6, 33, 0.2)',
      }}
    >
      {children}
    </button>
  );
};

```

### 2. Quantum Card Component with Glassmorphism

```tsx
// 2. Quantum Card Component with Glassmorphism

export const QuantumCard = ({
  children,
  state = 'transitional', // heritage, transitional, quantum
  glassIntensity = 'medium', // subtle, medium, prominent
}) => {
  // Define background based on state
  const getGlassBackground = () => {
    switch(state) {
      case 'heritage':
        return `rgba(44, 95, 45, ${getOpacity()})`;
      case 'quantum':
        return `rgba(106, 48, 147, ${getOpacity()})`;
      case 'transitional':
      default:
        return `rgba(19, 26, 54, ${getOpacity()})`;
    }
  };
  
  // Define border color based on state
  const getBorderColor = () => {
    switch(state) {
      case 'heritage':
        return 'rgba(61, 255, 116, 0.2)';
      case 'quantum':
        return 'rgba(255, 45, 85, 0.2)';
      case 'transitional':
      default:
        return 'rgba(90, 200, 250, 0.2)';
    }
  };
  
  // Define blur intensity
  const getBlurIntensity = () => {
    switch(glassIntensity) {
      case 'subtle':
        return '5px';
      case 'prominent':
        return '15px';
      case 'medium':
      default:
        return '10px';
    }
  };
  
  // Define background opacity
  const getOpacity = () => {
    switch(glassIntensity) {
      case 'subtle':
        return 0.4;
      case 'prominent':
        return 0.8;
      case 'medium':
      default:
        return 0.6;
    }
  };
  
  return (
    <div
      style={{
        background: getGlassBackground(),
        backdropFilter: `blur(${getBlurIntensity()})`,
        WebkitBackdropFilter: `blur(${getBlurIntensity()})`, // Safari support
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 30px rgba(10, 6, 33, 0.1)',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {children}
    </div>
  );
};

```

### 3. Quantum Grid Background

```tsx
// 3. Quantum Grid Background

export const QuantumGrid = ({
  opacity = 'medium',  // subtle, medium, prominent
  perspective = true,
  state = 'transitional', // heritage, transitional, quantum
}) => {
  // Define grid color based on state
  const getGridColor = () => {
    switch(state) {
      case 'heritage':
        return 'rgba(61, 255, 116, ';
      case 'quantum':
        return 'rgba(191, 64, 128, ';
      case 'transitional':
      default:
        return 'rgba(90, 200, 250, ';
    }
  };
  
  // Define grid opacity
  const getOpacityValue = () => {
    switch(opacity) {
      case 'subtle':
        return '0.05)';
      case 'prominent':
        return '0.15)';
      case 'medium':
      default:
        return '0.1)';
    }
  };
  
  // Combine color and opacity
  const gridColor = `${getGridColor()}${getOpacityValue()}`;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        transform: perspective ? 'perspective(1000px) rotateX(60deg) scale(2)' : 'none',
        transformOrigin: 'center bottom',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
};

```

### 4. Energy Flow Connection Component

```tsx
// 4. Energy Flow Connection Component

export const EnergyFlow = ({
  startState = 'heritage', // heritage, transitional, quantum
  endState = 'quantum',    // heritage, transitional, quantum
  thickness = 2,
  animationDuration = 4,   // seconds
  pulsate = true,
}) => {
  // Define gradient based on states
  const getGradient = () => {
    let startColor, endColor;
    
    switch(startState) {
      case 'heritage':
        startColor = '#3DFF74';
        break;
      case 'quantum':
        startColor = '#FF2D55';
        break;
      case 'transitional':
      default:
        startColor = '#5AC8FA';
        break;
    }
    
    switch(endState) {
      case 'heritage':
        endColor = '#3DFF74';
        break;
      case 'quantum':
        endColor = '#FF2D55';
        break;
      case 'transitional':
      default:
        endColor = '#5AC8FA';
        break;
    }
    
    return `linear-gradient(90deg, ${startColor}, ${endColor})`;
  };
  
  return (
    <div
      style={{
        height: `${thickness}px`,
        width: '100%',
        background: getGradient(),
        borderRadius: `${thickness}px`,
        filter: 'drop-shadow(0 0 5px rgba(90, 200, 250, 0.5))',
        animation: pulsate ? `opacityPulse ${animationDuration}s infinite ease-in-out` : 'none',
      }}
    >
      <style jsx>{`
        @keyframes opacityPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

```

### 5. Particle System Component

```tsx
// 5. Particle System Component

export const QuantumParticleSystem = ({
  particleCount = 10,
  particleSize = 8,
  state = 'transitional', // heritage, transitional, quantum
  containerWidth = 300,
  containerHeight = 200,
}) => {
  // Generate particles
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(i);
  }
  
  // Define particle color based on state
  const getParticleColor = () => {
    switch(state) {
      case 'heritage':
        return '#3DFF74';
      case 'quantum':
        return '#FF2D55';
      case 'transitional':
      default:
        return '#5AC8FA';
    }
  };
  
  return (
    <div style={{ position: 'relative', width: containerWidth, height: containerHeight }}>
      <style jsx>{`
        @keyframes orbit {
          0% { 
            transform: rotate(0deg) translateX(40px) rotate(0deg); 
          }
          100% { 
            transform: rotate(360deg) translateX(40px) rotate(-360deg); 
          }
        }
        
        @keyframes opacityPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .quantum-particle {
          position: absolute;
          width: ${particleSize}px;
          height: ${particleSize}px;
          background-color: ${getParticleColor()};
          border-radius: 50%;
          filter: drop-shadow(0 0 4px ${getParticleColor()}80);
          animation: orbit 6s infinite linear, opacityPulse 4s infinite ease-in-out;
        }
      `}</style>
      
      {particles.map(index => {
        // Calculate random positions and animation delays
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const delay = (index / particleCount) * 6; // Stagger the animations
        const orbitRadius = 20 + (Math.random() * 40); // Random orbit radius
        
        return (
          <div
            key={index}
            className="quantum-particle"
            style={{
              top: centerY,
              left: centerX,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

```

### 6. Liquid Effect Component

```tsx
// 6. Liquid Effect Component

export const LiquidAnimation = ({
  size = 100,
  color = '#5AC8FA',
  animationDuration = 8, // seconds
}) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
    >
      <style jsx>{`
        div {
          animation: fluidMotion ${animationDuration}s infinite ease-in-out;
        }
        
        @keyframes fluidMotion {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 40% 60% 30% 70% / 60% 40% 60% 30%;
          }
          75% {
            border-radius: 70% 30% 40% 60% / 30% 60% 70% 40%;
          }
        }
      `}</style>
    </div>
  );
};

```

### 7. SwiftUI Implementation Examples

### SwiftUI Quantum-Spatial Implementation

The following code snippets demonstrate how to implement the quantum-spatial design system in SwiftUI for iOS and Vision Pro.

```swift
// SwiftUI Color Extension for Quantum-Spatial Palette
/*
import SwiftUI

extension Color {
    // Primary Foundation Colors
    static let voidBlack = Color(hex: "0A0621")
    static let deepSpaceIndigo = Color(hex: "131A36")
    static let ultraIndigo = Color(hex: "1E1F5C")
    static let dimensionalEggplant = Color(hex: "331F4A")
    static let midnightRichness = Color(hex: "0D0D15")
    static let quantumViolet = Color(hex: "6A3093")
    static let ultraViolet = Color(hex: "613FE7")
    
    // Secondary Accent Colors
    static let subtleAqua = Color(hex: "00FFC8")
    static let subtleCyan = Color(hex: "5AC8FA")
    static let dimensionalTeal = Color(hex: "126D71")
    static let roseEnergy = Color(hex: "BF4080")
    static let quantumPulsePink = Color(hex: "FF2D55")
    static let dimensionalOrange = Color(hex: "FF6B6B")
    static let heritageGreen = Color(hex: "2C5F2D")
    static let heritageGreenLight = Color(hex: "33FF66")
    static let heritageGreenDark = Color(hex: "1B3D1A")
    static let heritagePixelGreen = Color(hex: "3DFF74")
    
    // Initialize color from hex string
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

```

```swift
// SwiftUI Gradient Extension for Quantum States
extension LinearGradient {
    static let quantumDepth = LinearGradient(
        gradient: Gradient(colors: [.deepSpaceIndigo, .dimensionalEggplant, .quantumViolet]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let heritageState = LinearGradient(
        gradient: Gradient(colors: [.heritageGreenDark, .heritageGreen, .heritageGreenLight]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let transitionalState = LinearGradient(
        gradient: Gradient(colors: [.dimensionalEggplant, .ultraIndigo, .ultraViolet]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let quantumState = LinearGradient(
        gradient: Gradient(colors: [.quantumViolet, .roseEnergy, .quantumPulsePink]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
```

```swift
// SwiftUI QuantumButton Component
struct QuantumButton: View {
    enum State {
        case heritage, transitional, quantum
    }
    
    let title: String
    let action: () -> Void
    let state: State
    let disabled: Bool
    
    @State private var isPressed: Bool = false
    
    init(title: String, state: State = .transitional, disabled: Bool = false, action: @escaping () -> Void) {
        self.title = title
        self.state = state
        self.disabled = disabled
        self.action = action
    }
    
    private var gradient: LinearGradient {
        switch state {
        case .heritage:
            return .heritageState
        case .transitional:
            return .transitionalState
        case .quantum:
            return .quantumState
        }
    }
    
    private var glowColor: Color {
        switch state {
        case .heritage:
            return .heritagePixelGreen.opacity(0.5)
        case .transitional:
            return .subtleCyan.opacity(0.5)
        case .quantum:
            return .roseEnergy.opacity(0.5)
        }
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .medium))
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(gradient)
                .foregroundColor(.white)
                .cornerRadius(8)
                .shadow(color: isPressed ? glowColor.opacity(0.3) : glowColor, radius: isPressed ? 4 : 8)
                .scaleEffect(isPressed ? 0.98 : 1)
                .opacity(disabled ? 0.5 : 1)
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(disabled)
        .onLongPressGesture(minimumDuration: .infinity, maximumDistance: .infinity, pressing: { pressing in
            withAnimation(.easeInOut(duration: 0.15)) {
                isPressed = pressing
            }
        }, perform: {})
    }
}

```

```swift
// SwiftUI QuantumGlassCard Component
struct QuantumGlassCard<Content: View>: View {
    enum State {
        case heritage, transitional, quantum
    }
    
    enum GlassIntensity {
        case subtle, medium, prominent
    }
    
    let state: State
    let glassIntensity: GlassIntensity
    let content: Content
    
    init(state: State = .transitional, 
         glassIntensity: GlassIntensity = .medium,
         @ViewBuilder content: () -> Content) {
        self.state = state
        self.glassIntensity = glassIntensity
        self.content = content()
    }
    
    private var backgroundColor: Color {
        let opacity: Double
        switch glassIntensity {
        case .subtle:
            opacity = 0.4
        case .medium:
            opacity = 0.6
        case .prominent:
            opacity = 0.8
        }
        
        switch state {
        case .heritage:
            return Color.heritageGreen.opacity(opacity)
        case .transitional:
            return Color.deepSpaceIndigo.opacity(opacity)
        case .quantum:
            return Color.quantumViolet.opacity(opacity)
        }
    }
    
    private var borderColor: Color {
        switch state {
        case .heritage:
            return Color.heritagePixelGreen.opacity(0.2)
        case .transitional:
            return Color.subtleCyan.opacity(0.2)
        case .quantum:
            return Color.quantumPulsePink.opacity(0.2)
        }
    }
    
    var body: some View {
        content
            .padding(24)
            .background(backgroundColor)
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(borderColor, lineWidth: 1)
            )
            .shadow(color: Color.voidBlack.opacity(0.1), radius: 15, x: 0, y: 4)
    }
}
*/
```

### Supporting files

[](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)

[https://www.notion.so](https://www.notion.so)

<aside>
<img src="https://www.notion.so/icons/triangle-two-thirds_gray.svg" alt="https://www.notion.so/icons/triangle-two-thirds_gray.svg" width="40px" />

### Appendices

- Reference to Detailed Documentation
    - Glossary
</aside>

---

- **Document History**
    
    
    | Version | Date | Author | Changes |
    | --- | --- | --- | --- |
    | 0.1 | May 1, 2025  | @Penny Platt  | Initial Creation |
    
    *This document follows 9Bit Studios' quantum-spatial design principles and documentation standards.*
    

*© 2025 9Bit Studios. All rights reserved.*
