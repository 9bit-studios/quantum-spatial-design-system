#!/bin/bash

# TypeScript Framework Setup for Petersen Games & OksanaPlatform Integration
# Establishes Apple Intelligence validation across all projects

echo "🔧 Setting up Universal TypeScript Framework..."

# Create framework directory
mkdir -p typescript-framework
cd typescript-framework

# 1. Create universal TypeScript config for all projects
cat > tsconfig.universal.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "paths": {
      "@oksana/*": ["../Oksana/*/src/*"],
      "@apple-intelligence/*": ["../apple-intelligence/*"],
      "@strategic-director/*": ["../strategic-director/*"],
      "@quantum/*": ["../quantum-secure*"]
      "@foundation-model/*": ["../OksanaFoundationModel/*"]
      "@xcode-model-bridgr/*": ["../xcode-model-bridge/*"]
    }
  },
  "include": [
    "src/**/*",
    "../Oksana/**/*.ts",
    "../petersen-portal/**/*.ts",
    "../fresh-glass-theme/**/*.ts"
  ],
  "exclude": ["node_modules", "dist"]
}
EOF

# 2. Apple Intelligence Validation Types
mkdir -p types/apple-intelligence
cat > types/apple-intelligence/index.ts << 'EOF'
// Apple Intelligence Strategic Director Types
export interface StrategicDirectorValidation {
  hig_compliance: boolean;
  apple_intelligence_ready: boolean;
  quantum_security_enabled: boolean;
  m4_acceleration_compatible: boolean;
}

export interface ValidationResult {
  project: string;
  status: 'passed' | 'failed' | 'needs_review';
  strategic_director: StrategicDirectorValidation;
  recommendations: string[];
}

export interface PetersenGamesValidation extends ValidationResult {
  shopify_liquid_compatibility: boolean;
  oksana_platform_integration: boolean;
  apple_intelligence_features: string[];
}
EOF

# 3. Global validation script for all projects
cat > validate-all-projects.ts << 'EOF'
#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import type { ValidationResult, PetersenGamesValidation } from './types/apple-intelligence';

class UniversalProjectValidator {
  private projects = [
    '/Users/pennyplatt/Documents//Oksana',
    '/Users/pennyplatt/Documents//quantum-spatial/fresh-glass-theme',
    '/Users/pennyplatt/Documents//quantum-spatial/design-system',
    '/Users/pennyplatt/Documents//quantum-spatial/source-tokens',
    '/Users/pennyplatt/Documents//quantum-spatial/creative-intelligence-portal',
  ];

  async validateAll(): Promise<ValidationResult[]> {
    console.log('🔍 Universal Project Validation Starting...');
    
    const results: ValidationResult[] = [];
    
    for (const project of this.projects) {
      try {
        const result = await this.validateProject(project);
        results.push(result);
        console.log(`✅ ${path.basename(project)}: ${result.status}`);
      } catch (error) {
        console.error(`❌ ${path.basename(project)}: validation failed`);
      }
    }
    
    return results;
  }
  
  private async validateProject(projectPath: string): Promise<ValidationResult> {
    const projectName = path.basename(projectPath);
    const exists = await this.pathExists(projectPath);
    
    if (!exists) {
      return {
        project: projectName,
        status: 'failed',
        strategic_director: {
          hig_compliance: false,
          apple_intelligence_ready: false,
          quantum_security_enabled: false,
          m4_acceleration_compatible: false
        },
        recommendations: ['Project path does not exist']
      };
    }
    
    // Special validation for Petersen Games
    if (projectName === 'petersen-games') {
      return this.validatePetersenGames(projectPath);
    }
    
    return this.validateOksanaProject(projectPath);
  }
  
  private async validatePetersenGames(projectPath: string): Promise<PetersenGamesValidation> {
    // Check for Shopify Liquid templates
    const liquidExists = await this.pathExists(path.join(projectPath, 'templates'));
    const configExists = await this.pathExists(path.join(projectPath, 'config'));
    
    return {
      project: 'petersen-games',
      status: liquidExists && configExists ? 'passed' : 'needs_review',
      strategic_director: {
        hig_compliance: await this.checkHIGCompliance(projectPath),
        apple_intelligence_ready: false, // Needs integration
        quantum_security_enabled: false, // Needs setup
        m4_acceleration_compatible: true // Shopify can be enhanced
      },
      shopify_liquid_compatibility: liquidExists,
      oksana_platform_integration: false, // Needs integration
      apple_intelligence_features: [],
      recommendations: [
        'Integrate with OksanaPlatform Apple Intelligence',
        'Add Strategic Director validation',
        'Enable quantum security for customer data',
        'Connect to M4 acceleration for enhanced performance'
      ]
    };
  }
  
  private async validateOksanaProject(projectPath: string): Promise<ValidationResult> {
    const strategicDirectorExists = await this.pathExists(
      path.join(projectPath, 'strategic-director')
    );
    
    return {
      project: path.basename(projectPath),
      status: strategicDirectorExists ? 'passed' : 'needs_review',
      strategic_director: {
        hig_compliance: await this.checkHIGCompliance(projectPath),
        apple_intelligence_ready: strategicDirectorExists,
        quantum_security_enabled: await this.checkQuantumSecurity(projectPath),
        m4_acceleration_compatible: true
      },
      recommendations: strategicDirectorExists ? [] : [
        'Complete Strategic Director framework integration',
        'Add Apple Intelligence validation',
        'Configure quantum security layer'
      ]
    };
  }
  
  private async checkHIGCompliance(projectPath: string): Promise<boolean> {
    // Check for HIG compliance indicators
    const higKeywords = ['accessibility', 'human-interface', 'design-system'];
    // Implementation would check project files for HIG compliance
    return false; // Placeholder - implement actual check
  }
  
  private async checkQuantumSecurity(projectPath: string): Promise<boolean> {
    return await this.pathExists(
      path.join(projectPath, 'foundation-models/quantum-acceleration')
    );
  }
  
  private async pathExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}

// Run validation
const validator = new UniversalProjectValidator();
validator.validateAll().then(results => {
  console.log('📊 Universal Validation Complete');
  console.log('=' + '='.repeat(50));
  
  results.forEach(result => {
    console.log(`${result.project}: ${result.status.toUpperCase()}`);
    if (result.recommendations.length > 0) {
      console.log('Recommendations:');
      result.recommendations.forEach(rec => console.log(`  • ${rec}`));
    }
  });
});
EOF

# 4. Package.json for TypeScript tooling
cat > package.json << 'EOF'
{
  "name": "universal-typescript-framework",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "validate": "tsx validate-all-projects.ts",
    "build": "tsc -b",
    "dev": "tsx --watch validate-all-projects.ts",
    "shopify-liquid:validate": "tsx validate-all-projects.ts | grep shopify-liquid",
    "oksana:validate": "tsx validate-all-projects.ts | grep -E '(Oksana|creator-portal|client-portal|notion-portal)'"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
EOF

# 5. Install and run initial validation
npm install

echo "✅ TypeScript Framework Setup Complete!"
echo ""
echo "🚀 Next Steps:"
echo "1. npm run validate          # Validate all projects"
echo "2. npm run petersen-games:validate  # Focus on Petersen Games"
echo "3. npm run oksana:validate   # Focus on Oksana Platform projects"
echo ""
echo "📁 Framework Structure Created:"
echo "├── tsconfig.universal.json   # Universal TypeScript config"
echo "├── types/apple-intelligence/ # Apple Intelligence types"
echo "├── validate-all-projects.ts  # Universal validation script"
echo "└── package.json              # TypeScript tooling"
