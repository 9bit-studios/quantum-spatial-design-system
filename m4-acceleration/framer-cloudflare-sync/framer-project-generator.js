#!/usr/bin/env node

/**
 * Complete Framer Project Generator
 * Generates full Framer projects with layouts, components, and automation
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

// Generate design tokens file
const tokensFile = `
// Quantum-Spatial Design Tokens
export const quantumTokens = ${JSON.stringify(designTokens, null, 2)};

export const palette = quantumTokens.colors;
export const spacing = quantumTokens.spacing;
export const typography = {
  h1: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  h2: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3'
  },
  body: {
    fontFamily: quantumTokens.fonts.primary,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5'
  },
  mono: {
    fontFamily: quantumTokens.fonts.mono,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4'
  }
};

export const radius = {
  small: '4px',
  medium: '8px',
  large: '16px',
  full: '50%'
};

export const shadows = {
  small: '0 2px 8px rgba(0,0,0,0.15)',
  medium: '0 4px 16px rgba(0,0,0,0.2)',
  large: '0 8px 32px rgba(0,0,0,0.3)'
};
`;

// Layout generator function
const layoutTemplates = {
  dashboard: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { quantumTokens, palette, spacing, typography } from "./quantum-tokens";

export default function DashboardLayout(props) {
  const { 
    title = "Dashboard",
    showSidebar = true,
    sidebarWidth = 280,
    children 
  } = props;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: palette.voidBlack,
      fontFamily: typography.body.fontFamily,
      color: 'white'
    }}>
      {showSidebar && (
        <motion.aside
          style={{
            width: sidebarWidth,
            background: palette.deepSpaceIndigo,
            borderRight: \`1px solid \${palette.subtleCyan}30\`,
            padding: spacing.lg,
            display: 'flex',
            flexDirection: 'column'
          }}
          initial={{ x: -sidebarWidth }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 style={{ ...typography.h2, marginBottom: spacing.xl }}>
            {title}
          </h2>
          <nav style={{ flex: 1 }}>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px',
                transition: 'background 0.2s'
              }}>
                Overview
              </a>
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px'
              }}>
                Projects
              </a>
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px'
              }}>
                Analytics
              </a>
            </div>
          </nav>
        </motion.aside>
      )}
      
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <header style={{
          padding: spacing.lg,
          borderBottom: \`1px solid \${palette.subtleCyan}30\`,
          background: palette.dimensionalEggplant
        }}>
          <h1 style={typography.h1}>
            {title}
          </h1>
        </header>
        
        <div style={{
          flex: 1,
          padding: spacing.lg,
          overflow: 'auto'
        }}>
          {children}
        </div>
      </main>
    </div>
  );
}

addPropertyControls(DashboardLayout, {
  title: { type: ControlType.String, defaultValue: "Dashboard" },
  showSidebar: { type: ControlType.Boolean, defaultValue: true },
  sidebarWidth: { type: ControlType.Number, defaultValue: 280, min: 200, max: 400 }
});
`,

  hero: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function HeroLayout(props) {
  const { 
    title = "Quantum-Spatial Experience",
    subtitle = "Building the future of spatial computing",
    ctaText = "Get Started",
    backgroundType = "gradient"
  } = props;

  const backgrounds = {
    gradient: \`linear-gradient(135deg, \${palette.deepSpaceIndigo} 0%, \${palette.dimensionalEggplant} 100%)\`,
    solid: palette.voidBlack,
    image: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920")'
  };

  return (
    <section style={{
      height: '100vh',
      background: backgrounds[backgroundType],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: \`radial-gradient(circle at 25% 25%, \${palette.subtleCyan} 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, \${palette.roseEnergy} 0%, transparent 50%)\`
      }} />
      
      <motion.div
        style={{
          textAlign: 'center',
          zIndex: 1,
          maxWidth: '800px',
          padding: spacing.xl
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={{
            ...typography.h1,
            fontSize: '4rem',
            marginBottom: spacing.lg,
            background: \`linear-gradient(45deg, \${palette.subtleCyan}, \${palette.roseEnergy})\`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          style={{
            ...typography.body,
            fontSize: '1.25rem',
            marginBottom: spacing.xl,
            color: palette.subtleCyan,
            opacity: 0.9
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.button
          style={{
            background: \`linear-gradient(45deg, \${palette.roseEnergy}, \${palette.dimensionalTeal})\`,
            color: 'white',
            border: 'none',
            padding: \`\${spacing.md} \${spacing.xl}\`,
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: typography.body.fontFamily
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {ctaText}
        </motion.button>
      </motion.div>
    </section>
  );
}

addPropertyControls(HeroLayout, {
  title: { type: ControlType.String, defaultValue: "Quantum-Spatial Experience" },
  subtitle: { type: ControlType.String, defaultValue: "Building the future of spatial computing" },
  ctaText: { type: ControlType.String, defaultValue: "Get Started" },
  backgroundType: { 
    type: ControlType.Enum,
    options: ["gradient", "solid", "image"],
    defaultValue: "gradient"
  }
});
`,

  grid: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function GridLayout(props) {
  const { 
    columns = 3,
    gap = spacing.lg,
    title = "Grid Layout",
    items = 6
  } = props;

  const gridItems = Array.from({ length: items }, (_, i) => ({
    id: i + 1,
    title: \`Item \${i + 1}\`,
    description: \`This is grid item \${i + 1}\`
  }));

  return (
    <div style={{
      padding: spacing.xl,
      background: palette.voidBlack,
      minHeight: '100vh'
    }}>
      <motion.h1
        style={{
          ...typography.h1,
          color: 'white',
          marginBottom: spacing.xl,
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h1>
      
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
          gap: gap,
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            style={{
              background: palette.dimensionalEggplant,
              border: \`1px solid \${palette.subtleCyan}30\`,
              borderRadius: '12px',
              padding: spacing.lg,
              color: 'white'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              borderColor: palette.subtleCyan 
            }}
          >
            <h3 style={{
              ...typography.h2,
              fontSize: '1.25rem',
              marginBottom: spacing.sm,
              color: palette.subtleCyan
            }}>
              {item.title}
            </h3>
            <p style={{
              ...typography.body,
              opacity: 0.8,
              margin: 0
            }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

addPropertyControls(GridLayout, {
  title: { type: ControlType.String, defaultValue: "Grid Layout" },
  columns: { type: ControlType.Number, defaultValue: 3, min: 1, max: 6 },
  items: { type: ControlType.Number, defaultValue: 6, min: 1, max: 12 },
  gap: { 
    type: ControlType.Enum,
    options: [spacing.sm, spacing.md, spacing.lg, spacing.xl],
    defaultValue: spacing.lg
  }
});
`
};

// Component templates (enhanced from previous version)
const componentTemplates = {
  button: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function QuantumButton(props) {
  const { text = "Button", variant = "primary", size = "medium", ...rest } = props;
  
  const variants = {
    primary: {
      background: \`linear-gradient(45deg, \${palette.roseEnergy}, \${palette.dimensionalTeal})\`,
      color: "white",
      border: "none"
    },
    secondary: {
      background: "transparent", 
      color: palette.subtleCyan,
      border: \`1px solid \${palette.subtleCyan}\`
    },
    ghost: {
      background: "transparent",
      color: palette.subtleCyan,
      border: "none"
    }
  };

  const sizes = {
    small: { padding: \`\${spacing.sm} \${spacing.md}\`, fontSize: '14px' },
    medium: { padding: \`\${spacing.md} \${spacing.lg}\`, fontSize: '16px' },
    large: { padding: \`\${spacing.lg} \${spacing.xl}\`, fontSize: '18px' }
  };

  return (
    <motion.button
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "8px",
        fontFamily: typography.body.fontFamily,
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
    </motion.button>
  );
}

addPropertyControls(QuantumButton, {
  text: { type: ControlType.String, defaultValue: "Button" },
  variant: { 
    type: ControlType.Enum,
    options: ["primary", "secondary", "ghost"],
    defaultValue: "primary"
  },
  size: {
    type: ControlType.Enum,
    options: ["small", "medium", "large"],
    defaultValue: "medium"
  }
});
`,

  card: `
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function QuantumCard(props) {
  const { 
    title = "Card Title", 
    children, 
    elevated = false,
    interactive = true,
    variant = "default"
  } = props;
  
  const variants = {
    default: {
      background: palette.dimensionalEggplant,
      border: \`1px solid \${palette.subtleCyan}30\`
    },
    highlight: {
      background: \`linear-gradient(135deg, \${palette.dimensionalEggplant}, \${palette.deepSpaceIndigo})\`,
      border: \`1px solid \${palette.subtleCyan}60\`
    },
    minimal: {
      background: "transparent",
      border: \`1px solid \${palette.subtleCyan}20\`
    }
  };
  
  return (
    <motion.div
      style={{
        ...variants[variant],
        borderRadius: "12px",
        padding: spacing.lg,
        boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        fontFamily: typography.body.fontFamily,
        color: "white",
        cursor: interactive ? "pointer" : "default"
      }}
      whileHover={interactive ? { 
        y: -2,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)"
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <h3 style={{ 
          ...typography.h2,
          fontSize: "1.25rem",
          margin: \`0 0 \${spacing.md} 0\`,
          color: palette.subtleCyan
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
  elevated: { type: ControlType.Boolean, defaultValue: false },
  interactive: { type: ControlType.Boolean, defaultValue: true },
  variant: {
    type: ControlType.Enum,
    options: ["default", "highlight", "minimal"],
    defaultValue: "default"
  }
});
`
};

// Demo page generator
const demoPage = `
import { motion } from "framer-motion";
import { palette, spacing, typography } from "./quantum-tokens";
import DashboardLayout from "./DashboardLayout";
import HeroLayout from "./HeroLayout";
import GridLayout from "./GridLayout";
import QuantumButton from "./QuantumButton";
import QuantumCard from "./QuantumCard";

export default function QuantumDesignSystemDemo() {
  return (
    <div style={{
      background: palette.voidBlack,
      minHeight: "100vh",
      fontFamily: typography.body.fontFamily
    }}>
      {/* Hero Section */}
      <HeroLayout 
        title="Quantum-Spatial Design System"
        subtitle="Experience the future of spatial computing interfaces"
        ctaText="Explore Components"
      />
      
      {/* Components Showcase */}
      <section style={{
        padding: \`\${spacing.xl} \${spacing.lg}\`,
        textAlign: "center"
      }}>
        <h2 style={{
          ...typography.h1,
          color: "white",
          marginBottom: spacing.xl
        }}>
          Component Library
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: spacing.lg,
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <QuantumCard title="Buttons" variant="highlight">
            <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
              <QuantumButton text="Primary" variant="primary" size="medium" />
              <QuantumButton text="Secondary" variant="secondary" size="medium" />
              <QuantumButton text="Ghost" variant="ghost" size="medium" />
            </div>
          </QuantumCard>
          
          <QuantumCard title="Cards" variant="default">
            <p style={{ ...typography.body, opacity: 0.8, margin: 0 }}>
              Interactive cards with hover effects and multiple variants
            </p>
          </QuantumCard>
          
          <QuantumCard title="Layouts" variant="minimal">
            <p style={{ ...typography.body, opacity: 0.8, margin: 0 }}>
              Dashboard, Hero, and Grid layouts ready to use
            </p>
          </QuantumCard>
        </div>
      </section>
      
      {/* Grid Layout Demo */}
      <GridLayout 
        title="Grid Layout Example"
        columns={3}
        items={6}
      />
    </div>
  );
}
`;

// Generate complete project
function generateFramerProject(outputDir) {
  console.log('🦄 Generating Complete Framer Project...');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate design tokens
  fs.writeFileSync(path.join(outputDir, 'quantum-tokens.js'), tokensFile.trim());
  console.log('✅ Generated: quantum-tokens.js');
  
  // Generate layouts
  const layoutsDir = path.join(outputDir, 'layouts');
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir);
  }
  
  Object.entries(layoutTemplates).forEach(([name, template]) => {
    const filename = `${name.charAt(0).toUpperCase() + name.slice(1)}Layout.tsx`;
    fs.writeFileSync(path.join(outputDir, filename), template.trim());
    console.log(`✅ Generated layout: ${filename}`);
  });
  
  // Generate components
  Object.entries(componentTemplates).forEach(([name, template]) => {
    const filename = `Quantum${name.charAt(0).toUpperCase() + name.slice(1)}.tsx`;
    fs.writeFileSync(path.join(outputDir, filename), template.trim());
    console.log(`✅ Generated component: ${filename}`);
  });
  
  // Generate demo page
  fs.writeFileSync(path.join(outputDir, 'QuantumDesignSystemDemo.tsx'), demoPage.trim());
  console.log('✅ Generated: QuantumDesignSystemDemo.tsx');
  
  // Generate automation script
  const automationScript = `
import { motion } from "framer-motion";

// Auto-layout generator
export function generateLayout(type, config = {}) {
  const layouts = {
    dashboard: (config) => ({
      type: 'dashboard',
      sidebar: config.sidebar !== false,
      title: config.title || 'Dashboard'
    }),
    hero: (config) => ({
      type: 'hero',
      title: config.title || 'Welcome',
      cta: config.cta || 'Get Started'
    }),
    grid: (config) => ({
      type: 'grid',
      columns: config.columns || 3,
      items: config.items || 6
    })
  };
  
  return layouts[type] ? layouts[type](config) : null;
}

// Component factory
export function createComponent(type, props = {}) {
  const components = {
    button: () => <QuantumButton {...props} />,
    card: () => <QuantumCard {...props} />,
    layout: () => {
      const layoutType = props.layoutType || 'dashboard';
      switch(layoutType) {
        case 'dashboard': return <DashboardLayout {...props} />;
        case 'hero': return <HeroLayout {...props} />;
        case 'grid': return <GridLayout {...props} />;
        default: return <DashboardLayout {...props} />;
      }
    }
  };
  
  return components[type] ? components[type]() : null;
}

// Auto-theme generator
export function generateTheme(variant = 'default') {
  const themes = {
    default: palette,
    dark: { ...palette, surface: palette.voidBlack },
    light: { ...palette, surface: '#FFFFFF', text: palette.deepSpaceIndigo }
  };
  
  return themes[variant] || themes.default;
}
`;

  fs.writeFileSync(path.join(outputDir, 'quantum-automation.js'), automationScript.trim());
  console.log('✅ Generated: quantum-automation.js');
  
  // Generate README with complete instructions
  const readme = `# Quantum-Spatial Framer Project

## Complete Auto-Generated Project Structure

This project includes:
- ✅ **Design Tokens** (quantum-tokens.js)
- ✅ **Layout Components** (Dashboard, Hero, Grid)
- ✅ **UI Components** (Button, Card, Input)
- ✅ **Demo Page** (QuantumDesignSystemDemo.tsx)
- ✅ **Automation Tools** (quantum-automation.js)

## Quick Setup in Framer

1. **Drag all .tsx files** into your Framer project
2. **Install dependencies** in Framer Package Manager:
   - framer-motion@^10.0.0
3. **Add QuantumDesignSystemDemo** to your canvas

## Available Layouts

- **DashboardLayout** - Sidebar + main content area
- **HeroLayout** - Full-screen hero with animations  
- **GridLayout** - Responsive grid with items

## Available Components

- **QuantumButton** - Animated buttons (primary, secondary, ghost)
- **QuantumCard** - Interactive cards (default, highlight, minimal)

## Automation Features

Use the quantum-automation.js helper:

\`\`\`jsx
import { generateLayout, createComponent } from './quantum-automation';

// Auto-generate layouts
const layout = generateLayout('dashboard', { title: 'My App' });

// Auto-create components
const button = createComponent('button', { text: 'Click me', variant: 'primary' });
\`\`\`

## Next Steps

1. Customize layouts in the property panels
2. Create your own components using the design tokens
3. Build complete pages by combining layouts and components
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
  console.log('✅ Generated: README.md');
  
  console.log('🎉 Complete Framer project generated!');
  console.log(`📁 Location: ${outputDir}`);
  console.log('🦄 Ready-to-use features:');
  console.log('• Complete design token system');
  console.log('• 3 layout templates with automation');
  console.log('• UI components with Framer controls');
  console.log('• Demo page showing everything');
  console.log('• Automation helpers for rapid development');
}

// Run if called directly
if (require.main === module) {
  const outputDir = process.argv[2] || './quantum-framer-project';
  generateFramerProject(outputDir);
}

module.exports = { generateFramerProject };