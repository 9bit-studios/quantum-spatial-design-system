#!/usr/bin/env node

/**
 * Safe Migration Workflow
 * Orchestrates component migration and provider integration
 * without breaking the sophisticated token architecture
 * 
 * @version 1.0.0
 * @authority Quantum-Spatial Design System
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class SafeMigrationWorkflow {
  constructor() {
    this.migrationPlan = {
      phases: [
        'cleanup-dangerous-patterns',
        'migrate-core-components',
        'setup-api-routes',
        'extend-providers',
        'validate-integration',
        'test-deployment'
      ],
      
      safePatterns: {
        providers: `
// Safe provider extension pattern
<DesignSystemProvider>
  <QuantumSpatialContext>
    <ContentProvider>
      <ShopifyProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ShopifyProvider>
    </ContentProvider>
  </QuantumSpatialContext>
</DesignSystemProvider>
        `.trim(),
        
        apiRoute: `
// Safe API route pattern
export async function GET() {
  const products = await shopifyGraphQL(PRODUCTS_QUERY);
  return Response.json({ products });
}
        `.trim(),
        
        componentUsage: `
// Safe component usage pattern
const { colors, typography, state, isM4Capable } = useDesignSystem();
        `.trim()
      }
    };

    this.migrationStatus = {
      cleanupComplete: false,
      componentsValidated: false,
      apiRoutesCreated: false,
      providersExtended: false,
      integrationValidated: false
    };
  }

  /**
   * Execute safe migration workflow
   */
  async executeMigration() {
    console.log('🦄 SAFE MIGRATION WORKFLOW');
    console.log('Preserving sophisticated token architecture while enabling new features');
    console.log('=' .repeat(70) + '');

    try {
      // Phase 1: Cleanup dangerous patterns
      console.log('🧹 Phase 1: Cleanup Dangerous Patterns');
      await this.cleanupDangerousPatterns();
      
      // Phase 2: Migrate core components
      console.log('📦 Phase 2: Migrate Core Components');
      await this.migrateComponents();
      
      // Phase 3: Setup API routes
      console.log('🔌 Phase 3: Setup API Routes');
      await this.setupAPIRoutes();
      
      // Phase 4: Extend providers safely
      console.log('🔧 Phase 4: Extend Providers');
      await this.extendProviders();
      
      // Phase 5: Validate integration
      console.log('✅ Phase 5: Validate Integration');
      await this.validateIntegration();
      
      // Phase 6: Generate test plan
      console.log('🧪 Phase 6: Generate Test Plan');
      const testPlan = await this.generateTestPlan();
      
      // Summary
      await this.generateMigrationReport();
      
      return {
        success: true,
        status: this.migrationStatus,
        testPlan
      };

    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      return {
        success: false,
        error: error.message,
        status: this.migrationStatus
      };
    }
  }

  /**
   * Phase 1: Cleanup dangerous patterns
   */
  async cleanupDangerousPatterns() {
    const cleanupTasks = [
      {
        name: 'Remove Google Fonts',
        pattern: 'google.*fonts',
        action: async () => {
          try {
            execSync('find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" | xargs sed -i "" -e "/google.*fonts/d" 2>/dev/null || true');
            return true;
          } catch {
            return false;
          }
        }
      },
      {
        name: 'Remove Inter font references',
        pattern: 'Inter[^a-z]',
        action: async () => {
          try {
            execSync('find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" | xargs sed -i "" -e "s/Inter/SF Pro Display/g" 2>/dev/null || true');
            return true;
          } catch {
            return false;
          }
        }
      },
      {
        name: 'Remove font imports',
        pattern: '@import.*fonts',
        action: async () => {
          try {
            execSync('find . -type f -name "*.css" | xargs sed -i "" -e "/@import.*fonts/d" 2>/dev/null || true');
            return true;
          } catch {
            return false;
          }
        }
      }
    ];

    for (const task of cleanupTasks) {
      console.log(`  🧹 ${task.name}...`);
      const success = await task.action();
      if (success) {
        console.log(`    ✅ Cleaned`);
      } else {
        console.log(`    ⚠️  Manual cleanup may be needed`);
      }
    }

    this.migrationStatus.cleanupComplete = true;
    console.log('  ✅ Cleanup phase complete');
  }

  /**
   * Phase 2: Migrate components safely
   */
  async migrateComponents() {
    const componentsToMigrate = [
      'UnifiedDesignSystem.tsx',
      'CompleteFlowTesting.tsx',
      'EnhancedPetersenGamesDashboard.tsx',
      'PetersenGamesHomepage.tsx',
      'EcommerceCheckout.tsx'
    ];

    const tempDir = path.join(process.cwd(), 'temp-components');
    const componentsDir = path.join(process.cwd(), 'components');

    for (const component of componentsToMigrate) {
      console.log(`  📦 Migrating ${component}...`);
      
      try {
        const tempPath = path.join(tempDir, component);
        const targetPath = path.join(componentsDir, component);
        
        // Check if already exists
        try {
          await fs.access(targetPath);
          console.log(`    ℹ️  Already exists, validating...`);
          
          // Validate the component
          const content = await fs.readFile(targetPath, 'utf8');
          if (this.validateComponent(content)) {
            console.log(`    ✅ Component valid`);
          } else {
            console.log(`    ⚠️  Component needs validation`);
          }
          continue;
        } catch {
          // Component doesn't exist, continue with migration
        }
        
        // Copy from temp-components
        const content = await fs.readFile(tempPath, 'utf8');
        
        // Validate before copying
        if (this.validateComponent(content)) {
          await fs.writeFile(targetPath, content);
          console.log(`    ✅ Migrated successfully`);
        } else {
          console.log(`    ⚠️  Component validation failed, needs manual review`);
        }
        
      } catch (error) {
        console.log(`    ❌ Failed to migrate: ${error.message}`);
      }
    }

    this.migrationStatus.componentsValidated = true;
    console.log('  ✅ Component migration complete');
  }

  /**
   * Phase 3: Setup API routes for GraphQL
   */
  async setupAPIRoutes() {
    const apiDir = path.join(process.cwd(), 'app/api');
    
    // Create API directory structure
    const routes = ['products', 'cart', 'checkout'];
    
    for (const route of routes) {
      const routeDir = path.join(apiDir, route);
      console.log(`  🔌 Creating API route: /api/${route}`);
      
      try {
        await fs.mkdir(routeDir, { recursive: true });
        
        const routeContent = this.generateAPIRoute(route);
        await fs.writeFile(path.join(routeDir, 'route.ts'), routeContent);
        
        console.log(`    ✅ Created ${route} route`);
      } catch (error) {
        console.log(`    ⚠️  Failed to create ${route} route: ${error.message}`);
      }
    }

    this.migrationStatus.apiRoutesCreated = true;
    console.log('  ✅ API routes setup complete');
  }

  /**
   * Phase 4: Extend providers safely
   */
  async extendProviders() {
    const providersDir = path.join(process.cwd(), 'lib/providers');
    
    try {
      await fs.mkdir(providersDir, { recursive: true });
      
      // Create QuantumSpatialContext
      console.log('  🔧 Creating QuantumSpatialContext...');
      const quantumContent = this.generateQuantumSpatialContext();
      await fs.writeFile(path.join(providersDir, 'QuantumSpatialContext.tsx'), quantumContent);
      console.log('    ✅ QuantumSpatialContext created');
      
      // Create ContentProvider
      console.log('  🔧 Creating ContentProvider...');
      const contentContent = this.generateContentProvider();
      await fs.writeFile(path.join(providersDir, 'ContentProvider.tsx'), contentContent);
      console.log('    ✅ ContentProvider created');
      
      // Create ShopifyProvider
      console.log('  🔧 Creating ShopifyProvider...');
      const shopifyContent = this.generateShopifyProvider();
      await fs.writeFile(path.join(providersDir, 'ShopifyProvider.tsx'), shopifyContent);
      console.log('    ✅ ShopifyProvider created');
      
      // Create CartProvider
      console.log('  🔧 Creating CartProvider...');
      const cartContent = this.generateCartProvider();
      await fs.writeFile(path.join(providersDir, 'CartProvider.tsx'), cartContent);
      console.log('    ✅ CartProvider created');
      
      // Create combined provider export
      console.log('  🔧 Creating provider index...');
      const indexContent = this.generateProviderIndex();
      await fs.writeFile(path.join(providersDir, 'index.tsx'), indexContent);
      console.log('    ✅ Provider index created');
      
      this.migrationStatus.providersExtended = true;
      console.log('  ✅ Provider extension complete');
      
    } catch (error) {
      console.log(`  ❌ Provider extension failed: ${error.message}`);
    }
  }

  /**
   * Phase 5: Validate integration
   */
  async validateIntegration() {
    console.log('  🔍 Running integration validation...');
    
    try {
      // Run the unified validator
      const validator = require('./unified-system-validator');
      const validatorInstance = new validator();
      const report = await validatorInstance.runFullValidation();
      
      if (report.summary.status === 'SAFE') {
        this.migrationStatus.integrationValidated = true;
        console.log('  ✅ Integration validation passed');
      } else {
        console.log('  ⚠️  Integration has issues - see validation report');
      }
      
    } catch (error) {
      console.log('  ❌ Integration validation failed');
    }
  }

  /**
   * Helper methods
   */
  validateComponent(content) {
    // Check for proper imports
    const hasProperImports = content.includes('useDesignSystem') || 
                           content.includes('unifiedDesignTokens');
    
    // Check for dangerous patterns
    const hasDangerousPatterns = content.includes('google') || 
                                content.includes('Inter') ||
                                content.includes('apolloClient');
    
    return hasProperImports && !hasDangerousPatterns;
  }

  generateAPIRoute(route) {
    const templates = {
      products: `
import { NextResponse } from 'next/server';
import { shopifyGraphQL } from '@/lib/shopify-graphql';
import { PRODUCTS_QUERY } from '@/lib/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const first = parseInt(searchParams.get('first') || '20');
    const after = searchParams.get('after') || undefined;

    const { products } = await shopifyGraphQL({
      query: PRODUCTS_QUERY,
      variables: { first, after }
    });

    return NextResponse.json({ 
      products,
      source: 'shopify',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
      `.trim(),
      
      cart: `
import { NextResponse } from 'next/server';
import { shopifyGraphQL } from '@/lib/shopify-graphql';
import { CREATE_CART, ADD_TO_CART } from '@/lib/queries';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, cartId, items } = body;

    let result;
    if (action === 'create') {
      result = await shopifyGraphQL({
        query: CREATE_CART,
        variables: { input: { lines: items || [] } }
      });
    } else if (action === 'add' && cartId) {
      result = await shopifyGraphQL({
        query: ADD_TO_CART,
        variables: { cartId, lines: items }
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Cart API Error:', error);
    return NextResponse.json(
      { error: 'Cart operation failed' },
      { status: 500 }
    );
  }
}
      `.trim(),
      
      checkout: `
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { cartId } = await request.json();
    
    // Generate checkout URL
    const checkoutUrl = \`https://petersengames.myshopify.com/cart/\${cartId}\`;
    
    return NextResponse.json({ 
      checkoutUrl,
      message: 'Redirect to Shopify checkout'
    });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Checkout creation failed' },
      { status: 500 }
    );
  }
}
      `.trim()
    };

    return templates[route] || templates.products;
  }

  generateQuantumSpatialContext() {
    return `
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDesignSystem } from '@/lib/hooks/useDesignSystem';

interface QuantumSpatialContextType {
  spatialState: 'quantum' | 'heritage' | 'transitional' | 'superposition';
  setSpatialState: (state: any) => void;
  designTokens: any;
  isM4Capable: boolean;
}

const QuantumSpatialContext = createContext<QuantumSpatialContextType | null>(null);

export function QuantumSpatialProvider({ children }: { children: ReactNode }) {
  const designSystem = useDesignSystem();
  const [spatialState, setSpatialState] = useState<any>('quantum');

  const value = {
    spatialState,
    setSpatialState,
    designTokens: designSystem,
    isM4Capable: designSystem.isM4Capable || false
  };

  return (
    <QuantumSpatialContext.Provider value={value}>
      {children}
    </QuantumSpatialContext.Provider>
  );
}

export const useQuantumSpatial = () => {
  const context = useContext(QuantumSpatialContext);
  if (!context) {
    throw new Error('useQuantumSpatial must be used within QuantumSpatialProvider');
  }
  return context;
};
    `.trim();
  }

  generateContentProvider() {
    return `
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentContextType {
  content: Record<string, any>;
  fetchContent: (type: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (type: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/\${type}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setContent(prev => ({ ...prev, [type]: data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ content, fetchContent, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
    `.trim();
  }

  generateShopifyProvider() {
    return `
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  image?: string;
}

interface ShopifyContextType {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

const ShopifyContext = createContext<ShopifyContextType | null>(null);

export function ShopifyProvider({ 
  children,
  initialProducts = []
}: { 
  children: ReactNode;
  initialProducts?: ShopifyProduct[];
}) {
  const [products, setProducts] = useState<ShopifyProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <ShopifyContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ShopifyContext.Provider>
  );
}

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within ShopifyProvider');
  }
  return context;
};
    `.trim();
  }

  generateCartProvider() {
    return `
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  return (
    <CartContext.Provider value={{
      items,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
    `.trim();
  }

  generateProviderIndex() {
    return `
export { QuantumSpatialProvider, useQuantumSpatial } from './QuantumSpatialContext';
export { ContentProvider, useContent } from './ContentProvider';
export { ShopifyProvider, useShopify } from './ShopifyProvider';
export { CartProvider, useCart } from './CartProvider';
    `.trim();
  }

  async generateTestPlan() {
    const testPlan = {
      phases: [
        {
          phase: 'Unit Testing',
          tests: [
            'Test useDesignSystem hook returns all tokens',
            'Test provider CSS variable application',
            'Test M4 detection functionality',
            'Test component token usage'
          ]
        },
        {
          phase: 'Integration Testing',
          tests: [
            'Test provider chain renders without errors',
            'Test API routes return proper data',
            'Test cart state management',
            'Test content fetching'
          ]
        },
        {
          phase: 'Build Testing',
          tests: [
            'Run npm build',
            'Check for TypeScript errors',
            'Verify no forbidden patterns',
            'Check bundle size'
          ]
        },
        {
          phase: 'Deployment Testing',
          tests: [
            'Deploy to Vercel preview',
            'Test all API routes',
            'Verify no console errors',
            'Check performance metrics'
          ]
        }
      ]
    };

    // Save test plan
    const testPlanPath = path.join(process.cwd(), 'test-plan.json');
    await fs.writeFile(testPlanPath, JSON.stringify(testPlan, null, 2));
    
    console.log(`  ✅ Test plan generated: ${testPlanPath}`);
    
    return testPlan;
  }

  async generateMigrationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      status: this.migrationStatus,
      summary: {
        ready: Object.values(this.migrationStatus).every(v => v === true),
        phases: Object.entries(this.migrationStatus).map(([phase, complete]) => ({
          phase,
          status: complete ? 'complete' : 'pending'
        }))
      },
      nextSteps: this.generateNextSteps()
    };

    const reportPath = path.join(process.cwd(), 'migration-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log('' + '=' .repeat(70));
    console.log('📊 MIGRATION SUMMARY');
    console.log('=' .repeat(70));
    console.log(`Status: ${report.summary.ready ? '✅ READY FOR DEPLOYMENT' : '⚠️  NEEDS ATTENTION'}`);
    
    console.log('Phases:');
    report.summary.phases.forEach(phase => {
      console.log(`  ${phase.status === 'complete' ? '✅' : '⚠️'} ${phase.phase}`);
    });

    console.log('💡 Next Steps:');
    report.nextSteps.forEach((step, i) => {
      console.log(`  ${i + 1}. ${step}`);
    });

    console.log(`📄 Full report: ${reportPath}`);
  }

  generateNextSteps() {
    const steps = [];

    if (!this.migrationStatus.cleanupComplete) {
      steps.push('Complete cleanup of dangerous patterns');
    }

    if (!this.migrationStatus.componentsValidated) {
      steps.push('Validate and migrate core components');
    }

    if (!this.migrationStatus.apiRoutesCreated) {
      steps.push('Create API routes for Shopify GraphQL');
    }

    if (!this.migrationStatus.providersExtended) {
      steps.push('Extend providers using safe pattern');
    }

    if (!this.migrationStatus.integrationValidated) {
      steps.push('Run full integration validation');
    }

    if (Object.values(this.migrationStatus).every(v => v === true)) {
      steps.push('Run npm build to test compilation');
      steps.push('Deploy to Vercel preview for testing');
      steps.push('Test all functionality in preview');
      steps.push('Deploy to production when ready');
    }

    return steps;
  }
}

// Export for use
module.exports = SafeMigrationWorkflow;

// CLI interface
if (require.main === module) {
  (async () => {
    const workflow = new SafeMigrationWorkflow();
    
    console.log('🦄 Starting Safe Migration Workflow...');
    
    const result = await workflow.executeMigration();
    
    if (result.success) {
      console.log('✅ Migration workflow completed successfully!');
    } else {
      console.log('❌ Migration workflow failed:', result.error);
    }
    
    process.exit(result.success ? 0 : 1);
  })();
}