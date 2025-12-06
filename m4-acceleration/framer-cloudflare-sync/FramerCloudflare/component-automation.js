#!/usr/bin/env node

/**
 * Real Component Automation System
 * Generates React components with Framer-ready exports
 */

const fs = require('fs');
const path = require('path');

// Quantum-spatial design tokens
const designTokens = {
  colors: {
    deepSpaceIndigo: '#131A36',
    voidBlack: '#0A0621', 
    dimensionalEggplant: '#331F4A',
    subtleCyan: '#5AC8FA',
    roseEnergy: '#BF4080',
    dimensionalTeal: '#126D71'
  },
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  fonts: {
    primary: 'SF Pro Display',
    mono: 'SF Mono'
  }
};

// Component templates with Framer-ready exports
const componentTemplates = {
  button: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

export default function QuantumButton(props) {
  const { text = "Button", variant = "primary", ...rest } = props;
  
  const variants = {
    primary: {
      background: "${designTokens.colors.deepSpaceIndigo}",
      color: "white",
      border: "1px solid ${designTokens.colors.subtleCyan}"
    },
    secondary: {
      background: "transparent", 
      color: "${designTokens.colors.subtleCyan}",
      border: "1px solid ${designTokens.colors.subtleCyan}"
    }
  };

  return (
    <motion.button
      style={{
        ...variants[variant],
        padding: "${designTokens.spacing.md} ${designTokens.spacing.lg}",
        borderRadius: "6px",
        fontFamily: "${designTokens.fonts.primary}",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {text}
    </motion.button>
  );
}

// Framer property controls
addPropertyControls(QuantumButton, {
  text: { type: ControlType.String, defaultValue: "Button" },
  variant: { 
    type: ControlType.Enum,
    options: ["primary", "secondary"],
    defaultValue: "primary"
  }
});
`,

  card: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

export default function QuantumCard(props) {
  const { title = "Card Title", children, elevated = false, ...rest } = props;
  
  return (
    <motion.div
      style={{
        background: "${designTokens.colors.dimensionalEggplant}",
        border: "1px solid ${designTokens.colors.subtleCyan}20",
        borderRadius: "12px",
        padding: "${designTokens.spacing.lg}",
        boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        fontFamily: "${designTokens.fonts.primary}",
        color: "white"
      }}
      whileHover={{ y: elevated ? -2 : 0 }}
      {...rest}
    >
      {title && (
        <h3 style={{ 
          margin: "0 0 ${designTokens.spacing.md} 0",
          fontSize: "18px",
          fontWeight: "600"
        }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
    </motion.div>
  );
}

addPropertyControls(QuantumCard, {
  title: { type: ControlType.String, defaultValue: "Card Title" },
  elevated: { type: ControlType.Boolean, defaultValue: false }
});
`,

  input: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useState } from "react";

export default function QuantumInput(props) {
  const { placeholder = "Enter text...", label, ...rest } = props;
  const [focused, setFocused] = useState(false);
  
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label style={{
          display: "block",
          marginBottom: "${designTokens.spacing.sm}",
          fontFamily: "${designTokens.fonts.primary}",
          fontSize: "14px",
          color: "${designTokens.colors.subtleCyan}"
        }}>
          {label}
        </label>
      )}
      <motion.input
        style={{
          width: "100%",
          padding: "${designTokens.spacing.md}",
          background: "${designTokens.colors.voidBlack}",
          border: \`2px solid \${focused ? "${designTokens.colors.subtleCyan}" : "${designTokens.colors.dimensionalEggplant}"}\`,
          borderRadius: "8px",
          fontFamily: "${designTokens.fonts.primary}",
          fontSize: "16px",
          color: "white",
          outline: "none",
          transition: "border-color 0.2s ease"
        }}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </div>
  );
}

addPropertyControls(QuantumInput, {
  placeholder: { type: ControlType.String, defaultValue: "Enter text..." },
  label: { type: ControlType.String, defaultValue: "" }
});
`
};

// Generate component files
function generateComponents(outputDir) {
  console.log('🦄 Generating Quantum-Spatial Components...');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate each component
  Object.entries(componentTemplates).forEach(([name, template]) => {
    const filename = `${name.charAt(0).toUpperCase() + name.slice(1)}.tsx`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, template.trim());
    console.log(`✅ Generated: ${filename}`);
  });
  
  // Generate index file
  const indexContent = Object.keys(componentTemplates)
    .map(name => {
      const componentName = name.charAt(0).toUpperCase() + name.slice(1);
      return `export { default as Quantum${componentName} } from './${componentName}';`;
    })
    .join('');
    
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log('✅ Generated: index.ts');
  
  // Generate package.json
  const packageJson = {
    name: "@9bit/quantum-components",
    version: "1.0.0",
    description: "Quantum-Spatial Design System Components",
    main: "index.ts",
    peerDependencies: {
      "react": "^18.0.0",
      "framer-motion": "^10.0.0",
      "framer": "^2.0.0"
    }
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
  );
  console.log('✅ Generated: package.json');
  
  // Generate README with Framer installation instructions
  const readme = `# Quantum-Spatial Components

## Installation in Framer

1. **Copy component files** to your Framer project:
   - Drag each .tsx file into your Framer project
   - Components will appear in your component library

2. **Install dependencies** in Framer:
   - Go to Settings > Package Manager
   - Add: framer-motion@^10.0.0

3. **Use components**:
   - Drag from component library onto canvas
   - Customize via property controls panel

## Components

- **QuantumButton** - Interactive buttons with hover animations
- **QuantumCard** - Content cards with elevation effects  
- **QuantumInput** - Form inputs with focus states

## Design Tokens

Colors: Deep Space Indigo, Void Black, Dimensional Eggplant, Subtle Cyan, Rose Energy
Typography: SF Pro Display, SF Mono
Spacing: 4px, 8px, 16px, 24px, 32px
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
  console.log('✅ Generated: README.md');
  
  console.log('🎉 Component library generated!');
  console.log(`📁 Location: ${outputDir}`);
  console.log('📋 Next steps:');
  console.log('1. Copy .tsx files to your Framer project');
  console.log('2. Install framer-motion in Framer package manager');
  console.log('3. Start using components from library');
}

// Run if called directly
if (require.main === module) {
  const outputDir = process.argv[2] || './quantum-components';
  generateComponents(outputDir);
}

module.exports = { generateComponents, designTokens, componentTemplates };