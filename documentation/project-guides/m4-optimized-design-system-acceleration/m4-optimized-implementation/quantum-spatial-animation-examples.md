```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quantum-Spatial Animation Examples</title>
  <style>
    /* Base Styles */
    body {
      background: linear-gradient(135deg, #0A0621, #131A36);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      min-height: 100vh;
      margin: 0;
      padding: 32px;
    }
    
  </style>
</head>
<body>
  <h1>Quantum-Spatial Animation Examples</h1>
  
  <section>
    <h2>1. Pulse Animations & Gentle Glows</h2>
    <div class="example-container">
      <div class="example">
        <div class="opacity-pulse"></div>
      </div>
      <div class="example">
        <div class="scale-pulse"></div>
      </div>
      <div class="example">
        <div class="staggered-pulse-container">
          <div class="staggered-pulse"></div>
          <div class="staggered-pulse"></div>
          <div class="staggered-pulse"></div>
          <div class="staggered-pulse"></div>
        </div>
      </div>
      <div class="example">
        <div class="standard-glow"></div>
      </div>
      <div class="example">
        <div class="quantum-glow"></div>
      </div>
    </div>
  </section>
  
  <section>
    <h2>2. Color Theme Implementation</h2>
    <div class="example-container">
      <div class="example">
        <div class="void-gradient"></div>
      </div>
      <div class="example">
        <div class="heritage-gradient"></div>
      </div>
      <div class="example">
        <div class="transitional-gradient"></div>
      </div>
      <div class="example">
        <div class="quantum-gradient"></div>
      </div>
      <div class="example">
        <div class="energy-flow-gradient"></div>
      </div>
    </div>
  </section>
  
  <section>
    <h2>3. Particle Systems & Energy Flows</h2>
    <div class="example-container">
      <div class="example">
        <div class="particle-system">
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
        </div>
      </div>
      <div class="example">
        <div class="color-transition-particle"></div>
      </div>
      <div class="example">
        <div class="connection-line"></div>
      </div>
      <div class="example">
        <div class="energy-ripple">
          <div class="ripple"></div>
          <div class="ripple"></div>
          <div class="ripple"></div>
        </div>
      </div>
    </div>
  </section>
  
  <section>
    <h2>4. Dimensional Grid System</h2>
    <div class="example-container">
      <div class="example">
        <div class="perspective-grid">
          <div class="grid"></div>
        </div>
      </div>
      <div class="example">
        <div class="state-grid">
          <div class="quantum-state-grid"></div>
        </div>
      </div>
    </div>
  </section>
  
  <section>
    <h2>5. Glassmorphism Effects</h2>
    <div class="example-container">
      <div class="example">
        <div class="quantum-glass">Quantum Glass</div>
      </div>
      <div class="example">
        <div class="heritage-glass">Heritage Glass</div>
      </div>
      <div class="example">
        <div class="quantum-state-glass">Quantum State Glass</div>
      </div>
    </div>
  </section>
  
  <section>
    <h2>6. Liquid Effects</h2>
    <div class="example-container">
      <div class="example">
        <div class="fluid-animation"></div>
      </div>
      <div class="example">
        <div class="liquid-transition-container">
          <div class="liquid-fill"></div>
        </div>
      </div>
    </div>
  </section>
  
  <script>
    // This script adds an explanation of what the user is seeing
    document.addEventListener('DOMContentLoaded', function() {
      const examples = document.querySelectorAll('.example');
      
      examples.forEach(example => {
        const originalContent = example.innerHTML;
        
        example.addEventListener('mouseenter', function() {
          // Get the class name of the first child element
          const firstChildClass = example.querySelector('div').className;
          example.setAttribute('data-original', originalContent);
          
          // Create explanation text based on class name
          let explanation = '';
          if (firstChildClass.includes('opacity-pulse')) {
            explanation = '<p>Opacity Pulse: 0.7 to 1 opacity cycle over 4s</p>';
          } else if (firstChildClass.includes('scale-pulse')) {
            explanation = '<p>Scale Pulse: 1 to 1.08 scale over 3s</p>';
          } else if (firstChildClass.includes('staggered-pulse-container')) {
            explanation = '<p>Staggered Timing: 0.7s delay between elements</p>';
          } else if (firstChildClass.includes('standard-glow')) {
            explanation = '<p>Standard Glow: 5px blur shadow with 50% opacity</p>';
          } else if (firstChildClass.includes('quantum-glow')) {
            explanation = '<p>Quantum Glow: 8px blur shadow with 70% opacity</p>';
          } else if (firstChildClass.includes('void-gradient')) {
            explanation = '<p>Void Gradient: Deep space colors with 135° angle</p>';
          } else if (firstChildClass.includes('heritage-gradient')) {
            explanation = '<p>Heritage State: Green tones connecting to gaming roots</p>';
          } else if (firstChildClass.includes('transitional-gradient')) {
            explanation = '<p>Transitional State: Purple tones showing evolution</p>';
          } else if (firstChildClass.includes('quantum-gradient')) {
            explanation = '<p>Quantum State: Violet/magenta showing full evolution</p>';
          } else if (firstChildClass.includes('energy-flow-gradient')) {
            explanation = '<p>Energy Flow: Cross-state transition with 90° angle</p>';
          } else if (firstChildClass.includes('particle-system')) {
            explanation = '<p>Orbital Particles: Following circular paths with staggering</p>';
          } else if (firstChildClass.includes('color-transition-particle')) {
            explanation = '<p>Color Transition: State changes shown through color</p>';
          } else if (firstChildClass.includes('connection-line')) {
            explanation = '<p>Pulsing Connection: Energy pathways with glow effect</p>';
          } else if (firstChildClass.includes('energy-ripple')) {
            explanation = '<p>Energy Ripples: Expanding waves with fading opacity</p>';
          } else if (firstChildClass.includes('perspective-grid')) {
            explanation = '<p>Perspective Grid: 3D effect with 60° rotation</p>';
          } else if (firstChildClass.includes('state-grid')) {
            explanation = '<p>State Grid: Quantum-aligned with 10° skew</p>';
          } else if (firstChildClass.includes('quantum-glass')) {
            explanation = '<p>Quantum Glass: 60% opacity with 10px blur</p>';
          } else if (firstChildClass.includes('heritage-glass')) {
            explanation = '<p>Heritage Glass: 40% opacity with 8px blur</p>';
          } else if (firstChildClass.includes('quantum-state-glass')) {
            explanation = '<p>Quantum State Glass: 40% opacity with 12px blur</p>';
          } else if (firstChildClass.includes('fluid-animation')) {
            explanation = '<p>Fluid Animation: Border radius modulation over 8s</p>';
          } else if (firstChildClass.includes('liquid-transition-container')) {
            explanation = '<p>Liquid Fill: Mask-based rising liquid effect</p>';
          }
          
          example.innerHTML = explanation;
        });
        
        example.addEventListener('mouseleave', function() {
          example.innerHTML = example.getAttribute('data-original');
        });
      });
    });
  </script>
</body>
</html>
    
```

```css
    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 32px;
      letter-spacing: -0.2px;
    }
    
    section {
      margin-bottom: 48px;
    }
    
    h2 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
      letter-spacing: -0.1px;
    }
    
    .example-container {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }
    
    .example {
      background: rgba(19, 26, 54, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(90, 200, 250, 0.2);
      border-radius: 12px;
      padding: 24px;
      width: 300px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    
    /* 1. Pulse Animations & Gentle Glows */
    .opacity-pulse {
      width: 100px;
      height: 100px;
      background-color: #5AC8FA;
      border-radius: 50%;
      animation: opacityPulse 4s infinite ease-in-out;
    }
    
    @keyframes opacityPulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
    
    .scale-pulse {
      width: 80px;
      height: 80px;
      background-color: #BF4080;
      border-radius: 50%;
      animation: scalePulse 3s infinite ease-in-out;
    }
    
    @keyframes scalePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    
    .staggered-pulse-container {
      display: flex;
      gap: 16px;
    }
    
    .staggered-pulse {
      width: 24px;
      height: 24px;
      background-color: #613FE7;
      border-radius: 50%;
      animation: combinedPulse 4s infinite ease-in-out;
    }
    
    .staggered-pulse:nth-child(2) {
      animation-delay: 0.7s;
    }
    
    .staggered-pulse:nth-child(3) {
      animation-delay: 1.4s;
    }
    
    .staggered-pulse:nth-child(4) {
      animation-delay: 2.1s;
    }
    
    @keyframes combinedPulse {
      0%, 100% { 
        opacity: 0.7; 
        transform: scale(1);
      }
      50% { 
        opacity: 1; 
        transform: scale(1.1);
      }
    }
    
    /* Glow Filters */
    .standard-glow {
      width: 80px;
      height: 80px;
      background-color: #5AC8FA;
      border-radius: 8px;
      filter: drop-shadow(0 0 5px rgba(90, 200, 250, 0.5));
    }
    
    .quantum-glow {
      width: 80px;
      height: 80px;
      background-color: #BF4080;
      border-radius: 8px;
      filter: drop-shadow(0 0 8px rgba(191, 64, 128, 0.7));
    }
    
    /* 2. Color Theme Implementation */
    .void-gradient {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0A0621, #131A36, #1E1F5C);
      border-radius: 8px;
    }
    
    .heritage-gradient {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1B3D1A, #2C5F2D, #3D8B40);
      border-radius: 8px;
    }
    
    .transitional-gradient {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #331F4A, #405de5, #613FE7);
      border-radius: 8px;
    }
    
    .quantum-gradient {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #6A3093, #BF4080, #FF2D55);
      border-radius: 8px;
    }
    
    .energy-flow-gradient {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #2C5F2D, #00FFC8, #FF2D55);
      border-radius: 8px;
    }
    
    /* 3. Particle Systems & Energy Flows */
    .particle-system {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #5AC8FA;
      border-radius: 50%;
    }
    
    .particle:nth-child(1) {
      top: 30%;
      left: 20%;
      animation: orbit 6s infinite linear;
    }
    
    .particle:nth-child(2) {
      top: 40%;
      left: 40%;
      animation: orbit 6s infinite linear reverse;
      animation-delay: 1s;
    }
    
    .particle:nth-child(3) {
      top: 60%;
      left: 30%;
      animation: orbit 6s infinite linear;
      animation-delay: 2s;
    }
    
    .particle:nth-child(4) {
      top: 50%;
      left: 60%;
      animation: orbit 6s infinite linear reverse;
      animation-delay: 3s;
    }
    
    @keyframes orbit {
      0% { 
        transform: rotate(0deg) translateX(40px) rotate(0deg); 
      }
      100% { 
        transform: rotate(360deg) translateX(40px) rotate(-360deg); 
      }
    }
    
    .color-transition-particle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      animation: colorTransition 8s infinite ease-in-out;
    }
    
    @keyframes colorTransition {
      0%, 100% { background-color: #3DFF74; }
      33% { background-color: #00FFC8; }
      66% { background-color: #5AC8FA; }
    }
    
    .connection-line {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .connection-line::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 10%;
      width: 80%;
      height: 2px;
      background-color: #5AC8FA;
      filter: drop-shadow(0 0 5px rgba(90, 200, 250, 0.5));
      animation: opacityPulse 4s infinite ease-in-out;
    }
    
    .energy-ripple {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .ripple {
      position: absolute;
      border: 2px solid #5AC8FA;
      border-radius: 50%;
      animation: ripple 6s infinite ease-out;
      opacity: 0;
    }
    
    .ripple:nth-child(2) {
      animation-delay: 2s;
    }
    
    .ripple:nth-child(3) {
      animation-delay: 4s;
    }
    
    @keyframes ripple {
      0% {
        width: 0;
        height: 0;
        opacity: 0.5;
      }
      100% {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
    
    /* 4. Dimensional Grid System */
    .perspective-grid {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .grid {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background-image: 
        linear-gradient(to right, rgba(90, 200, 250, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(90, 200, 250, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      transform: perspective(500px) rotateX(60deg);
      transform-origin: center center;
    }
    
    .state-grid {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .quantum-state-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(to right, rgba(191, 64, 128, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(191, 64, 128, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      transform: skew(10deg, 5deg);
    }
    
    /* 5. Glassmorphism Effects */
    .quantum-glass {
      width: 80%;
      height: 80%;
      background: rgba(19, 26, 54, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(90, 200, 250, 0.2);
      border-radius: 12px;
      box-shadow: 0 4px 30px rgba(10, 6, 33, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }
    
    .heritage-glass {
      width: 80%;
      height: 80%;
      background: rgba(44, 95, 45, 0.4);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(61, 255, 116, 0.2);
      border-radius: 12px;
      box-shadow: 0 4px 30px rgba(10, 6, 33, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }
    
    .quantum-state-glass {
      width: 80%;
      height: 80%;
      background: rgba(106, 48, 147, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 45, 85, 0.2);
      border-radius: 12px;
      box-shadow: 0 4px 30px rgba(10, 6, 33, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }
    
    /* 6. Liquid Effects */
    .fluid-animation {
      width: 100px;
      height: 100px;
      background-color: #5AC8FA;
      animation: fluidMotion 8s infinite ease-in-out;
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
    
    .liquid-transition-container {
      position: relative;
      width: 80px;
      height: 150px;
      border: 2px solid #5AC8FA;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .liquid-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 75%;
      background-color: #5AC8FA;
      mask-image: linear-gradient(to bottom, transparent, black 50%, black);
      animation: liquidRise 3s ease-out infinite;
    }
    
    @keyframes liquidRise {
      0%, 100% { 
        height: 25%;
        mask-position: 0 100%; 
      }
      50% { 
        height: 75%;
        mask-position: 0 0%; 
      }
    }
```
