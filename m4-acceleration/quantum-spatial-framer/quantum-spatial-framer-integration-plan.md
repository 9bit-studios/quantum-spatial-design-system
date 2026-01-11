# Quantum-Spatial Design System: Framer Integration Plan

**Version**: 1.0  
**Date**: May 3, 2025  
**Status**: Implementation Ready

## Overview

This document outlines the detailed plan for integrating the 9Bit Studios Quantum-Spatial Design System with Framer, enabling professional design management and presentation. The integration will allow designers to access and utilize our design system components while ensuring consistency across all products.

## Integration Goals

1. **Design Token Synchronization**: Export and synchronize all design tokens to Framer
2. **Component Library**: Create a comprehensive component library in Framer
3. **State Management**: Enable state transitions between heritage, transitional, and quantum
4. **Documentation**: Provide clear usage guidelines and examples for designers
5. **Automation**: Implement automated processes for keeping Framer in sync with code

## Integration Steps

### 1. Design Token Export (Day 1)

#### 1.1 Create Token Structure

```javascript
// design-tokens.js
module.exports = {
  version: "1.0.0",
  
  colors: {
    // Heritage state colors
    heritage: {
      primary: "#2C5F2D",
      secondary: "#3D8B40",
      accent: "#3DFF74",
      background: {
        deep: "#0A0D0A",
        space: "#0F1A0F"
      }
    },
    
    // Transitional state colors
    transitional: {
      primary: "#5AC8FA",
      secondary: "#1F2C58",
      accent: "#126D71",
      background: {
        deep: "#0A0D15",
        space: "#131A36"
      }
    },
    
    // Quantum state colors
    quantum: {
      primary: "#6A3093",
      secondary: "#331F4A",
      accent: "#BF4080",
      background: {
        deep: "#0D0D15",
        space: "#131A36"
      }
    },
    
    // Common colors across states
    common: {
      white: "#FFFFFF",
      black: "#000000",
      error: "#FF3B30",
      success: "#34C759",
      warning: "#FF9500"
    }
  },
  
  typography: {
    fontFamilies: {
      heading: "SF Pro Display, system-ui, sans-serif",
      body: "SF Pro Text, system-ui, sans-serif",
      mono: "SF Mono, monospace"
    },
    fontSizes: {
      base: 16,
      scale: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.625
    }
  },
  
  spacing: {
    base: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  },
  
  grid: {
    types: {
      background: {
        opacity: 0.1,
        size: 40
      },
      interface: {
        opacity: 0.15,
        size: 20
      },
      feature: {
        opacity: 0.2,
        size: 10
      }
    },
    densities: {
      fine: 0.5,
      medium: 1,
      coarse: 2
    }
  },
  
  animation: {
    durations: {
      fast: 150,
      normal: 300,
      slow: 500,
      verySlow: 1000
    },
    easings: {
      standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
      accelerate: "cubic-bezier(0.4, 0.0, 1, 1)"
    },
    states: {
      heritage: {
        particleCount: 5,
        glowIntensity: 0.2,
        transitionSpeed: 0.8
      },
      transitional: {
        particleCount: 15,
        glowIntensity: 0.5,
        transitionSpeed: 1
      },
      quantum: {
        particleCount: 30,
        glowIntensity: 0.8,
        transitionSpeed: 1.2
      }
    }
  },
  
  // Vision Pro specific properties
  spatial: {
    depth: {
      heritage: 0,
      transitional: 4,
      quantum: 8
    },
    materials: {
      heritage: {
        roughness: 0.7,
        metallic: 0.1,
        emission: 0.2
      },
      quantum: {
        roughness: 0.3,
        metallic: 0.4,
        emission: 0.5
      }
    }
  }
};
```

#### 1.2 Export Token Scripts

Create a script to transform tokens for specific platforms:

```javascript
// scripts/export-tokens.js
const tokens = require('../design-tokens');
const fs = require('fs');
const path = require('path');

// Export to JSON for general usage
function exportToJson() {
  fs.writeFileSync(
    path.join(__dirname, '../tokens.json'),
    JSON.stringify(tokens, null, 2)
  );
  console.log('✅ Tokens exported to JSON');
}

// Export to CSS variables
function exportToCss() {
  // Implementation...
}

// Export specifically for Framer format
function exportToFramer() {
  // Transform tokens to Framer's expected format
  const framerTokens = {
    colors: transformColorsForFramer(tokens.colors),
    typography: transformTypographyForFramer(tokens.typography),
    spacing: transformSpacingForFramer(tokens.spacing),
    // Other transformations...
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../framer-tokens.json'),
    JSON.stringify(framerTokens, null, 2)
  );
  console.log('✅ Tokens exported for Framer');
}

// Run exports
exportToJson();
exportToCss();
exportToFramer();
```

### 2. Framer API Setup (Day 1)

#### 2.1 Framer API Configuration

```javascript
// scripts/framer-config.js
require('dotenv').config();

module.exports = {
  FRAMER_API_KEY: process.env.FRAMER_API_KEY,
  FRAMER_TEAM_ID: process.env.FRAMER_TEAM_ID,
  FRAMER_PROJECT_ID: process.env.FRAMER_PROJECT_ID,
  API_BASE_URL: 'https://api.framer.com/v1'
};
```

#### 2.2 Token Synchronization Script

```javascript
// scripts/sync-framer-tokens.js
const fetch = require('node-fetch');
const framerConfig = require('./framer-config');
const tokens = require('../framer-tokens.json');

async function syncDesignTokens() {
  console.log('Syncing design tokens to Framer...');
  
  try {
    const response = await fetch(
      `${framerConfig.API_BASE_URL}/teams/${framerConfig.FRAMER_TEAM_ID}/projects/${framerConfig.FRAMER_PROJECT_ID}/variables`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${framerConfig.FRAMER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokens)
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to sync tokens: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Design tokens synced successfully!');
    console.log(`Updated ${Object.keys(result).length} token categories`);
    
  } catch (error) {
    console.error('❌ Error syncing tokens:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncDesignTokens();
```

### 3. Component Library Creation (Day 2-3)

#### 3.1 Component Export Script

```javascript
// scripts/export-components.js
const fs = require('fs');
const path = require('path');
const componentDir = path.join(__dirname, '../components');

// List of components to export
const componentsToExport = [
  {
    name: 'QuantumStateButton',
    category: 'Inputs',
    description: 'Button with quantum state transitions',
    path: path.join(componentDir, 'QuantumStateButton.tsx')
  },
  {
    name: 'DimensionalGrid',
    category: 'Foundations',
    description: 'Grid system with perspective transformation',
    path: path.join(componentDir, 'DimensionalGrid.tsx')
  },
  // Additional components...
];

// Export components for Framer
async function exportComponents() {
  // For each component, create a Framer-compatible export
  for (const component of componentsToExport) {
    try {
      const componentCode = fs.readFileSync(component.path, 'utf8');
      
      // Transform component code for Framer if needed
      const transformedCode = transformComponentForFramer(componentCode, component.name);
      
      // Save to framer-components directory
      const outputPath = path.join(__dirname, '../framer-components', `${component.name}.tsx`);
      fs.writeFileSync(outputPath, transformedCode);
      
      console.log(`✅ Exported ${component.name}`);
    } catch (error) {
      console.error(`❌ Error exporting ${component.name}:`, error.message);
    }
  }
}

// Transform component code for Framer compatibility
function transformComponentForFramer(code, componentName) {
  // Implementation of any necessary transformations...
  return code;
}

// Create components manifest
function createComponentsManifest() {
  const manifest = componentsToExport.map(component => ({
    name: component.name,
    category: component.category,
    description: component.description,
    previewImageUrl: `./previews/${component.name}.png`
  }));
  
  fs.writeFileSync(
    path.join(__dirname, '../framer-components/manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ Created components manifest');
}

// Run exports
exportComponents().then(() => {
  createComponentsManifest();
});
```

#### 3.2 Component Library Setup in Framer

```javascript
// scripts/setup-framer-library.js
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const framerConfig = require('./framer-config');
const FormData = require('form-data');

async function createComponentLibrary() {
  console.log('Setting up component library in Framer...');
  
  try {
    // Read components manifest
    const manifest = require('../framer-components/manifest.json');
    
    // Create component library in Framer
    const libraryResponse = await fetch(
      `${framerConfig.API_BASE_URL}/teams/${framerConfig.FRAMER_TEAM_ID}/component-libraries`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${framerConfig.FRAMER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Quantum-Spatial Design System',
          description: 'Official component library for the 9Bit Studios Quantum-Spatial design system'
        })
      }
    );
    
    if (!libraryResponse.ok) {
      throw new Error(`Failed to create library: ${libraryResponse.status}`);
    }
    
    const library = await libraryResponse.json();
    console.log(`✅ Created library: ${library.name} (ID: ${library.id})`);
    
    // Upload components to library
    for (const component of manifest) {
      await uploadComponent(library.id, component);
    }
    
    console.log('✅ Component library setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up component library:', error.message);
    process.exit(1);
  }
}

async function uploadComponent(libraryId, component) {
  // Implementation for uploading individual components to Framer...
}

// Run setup
createComponentLibrary();
```

### 4. Documentation & Examples (Day 3-4)

#### 4.1 Create Documentation Site in Framer

Prepare a documentation project in Framer that includes:

- Design system overview
- State transition explanations
- Component usage examples
- Color and typography guidelines
- Implementation guidelines

#### 4.2 Example Presets

Create example presets for each component showing:

- Different states (heritage, transitional, quantum)
- Size variations
- Color theme options
- Common use cases

### 5. Automation & Webhooks (Day 5)

#### 5.1 Setup GitHub Action for Synchronization

```yaml
# .github/workflows/sync-framer.yml
name: Sync Design System to Framer

on:
  push:
    branches: [main]
    paths:
      - 'components/**'
      - 'design-tokens.js'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Export tokens
        run: node scripts/export-tokens.js
      
      - name: Export components
        run: node scripts/export-components.js
      
      - name: Sync to Framer
        run: |
          node scripts/sync-framer-tokens.js
          node scripts/setup-framer-library.js
        env:
          FRAMER_API_KEY: ${{ secrets.FRAMER_API_KEY }}
          FRAMER_TEAM_ID: ${{ secrets.FRAMER_TEAM_ID }}
          FRAMER_PROJECT_ID: ${{ secrets.FRAMER_PROJECT_ID }}
```

#### 5.2 Create Webhook Handler for Real-Time Updates

```javascript
// pages/api/webhooks/framer-sync.js
import { exportTokens, syncFramerTokens } from '../../../scripts/framer-sync';

export default async function handler(req, res) {
  // Verify webhook signature
  if (req.headers['x-webhook-signature'] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  try {
    // Export tokens and sync to Framer
    await exportTokens();
    await syncFramerTokens();
    
    return res.status(200).json({ success: true, message: 'Framer sync complete' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

## Integration Testing

### 1. Token Synchronization Test

Verify that all design tokens are correctly synchronized to Framer:

1. Run the token export script
2. Run the Framer synchronization script
3. Check in Framer that all tokens are available and correctly categorized
4. Verify that token changes are reflected in the Framer project

### 2. Component Library Test

Verify that the component library is correctly set up in Framer:

1. Export components using the export script
2. Set up the component library in Framer
3. Verify that components are available in the Framer components panel
4. Test each component to ensure it functions correctly

### 3. Documentation Test

Verify that the documentation is clear and useful:

1. Review the documentation site in Framer
2. Test links and navigation
3. Ensure all component examples work correctly
4. Verify that state transitions are clearly explained

### 4. Automation Test

Verify that the automation works correctly:

1. Make a change to a component or token file
2. Push the change to the main branch
3. Verify that the GitHub Action runs successfully
4. Check in Framer that the changes are reflected

## Framer Project Structure

The Framer project will be organized as follows:

```
Quantum-Spatial Design System (Framer Project)
├── Design Tokens
│   ├── Colors
│   │   ├── Heritage
│   │   ├── Transitional
│   │   ├── Quantum
│   │   └── Common
│   ├── Typography
│   ├── Spacing
│   └── Animation
├── Components
│   ├── Foundations
│   │   ├── QuantumPixel
│   │   └── DimensionalGrid
│   ├── Inputs
│   │   ├── QuantumStateButton
│   │   └── DimensionalInput
│   ├── Navigation
│   │   ├── QuantumPortalNavigation
│   │   └── DimensionalProgressTracker
│   └── Content
│       ├── CosmicFragmentCard
│       └── DimensionalContentCard
├── States
│   ├── Heritage
│   ├── Transitional
│   └── Quantum
└── Documentation
    ├── Overview
    ├── Getting Started
    ├── Component Guidelines
    └── Examples
```

## Access & Permissions

The Framer project will have the following access levels:

1. **Admin**: Project maintainers with full editing rights
2. **Editor**: Designers who need to modify components
3. **Viewer**: Team members who need reference access

## Next Steps After Integration

Once the Framer integration is complete, we will:

1. Conduct a design system workshop for the team
2. Set up regular design review sessions
3. Implement an ongoing improvement process
4. Expand the component library based on product needs
5. Develop additional examples and templates

---

*© 2025 9Bit Studios. All rights reserved.*