#!/usr/bin/env node

// scripts/quick-validate.js
// Quick runtime validation for design system health checks

import fs from 'fs';.promises;
import path from 'path';

class QuickValidator {
  constructor() {
    this.results = [];
    this.criticalErrors = 0;
  }

  log(type, message, critical = false) {
    const icons = { pass: '✅', fail: '❌', warn: '⚠️' };
    console.log(`${icons[type]} ${message}`);
    
    this.results.push({ type, message, critical });
    if (type === 'fail' && critical) {
      this.criticalErrors++;
    }
  }

  async checkFile(filePath, name) {
    try {
      await fs.access(filePath);
      this.log('pass', `${name} exists`);
      return true;
    } catch {
      this.log('fail', `${name} missing`, true);
      return false;
    }
  }

  async checkFileContent(filePath, name, searchStrings) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      for (const [search, description] of searchStrings) {
        if (content.includes(search)) {
          this.log('pass', `${name}: ${description} found`);
        } else {
          this.log('fail', `${name}: ${description} missing`, true);
        }
      }
      return true;
    } catch {
      this.log('fail', `Cannot read ${name}`, true);
      return false;
    }
  }

  async checkEnvVars() {
    console.log('🔐 Environment Variables:');
    
    const required = [
      'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN',
      'SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    ];

    for (const envVar of required) {
      if (process.env[envVar] && !process.env[envVar].includes('your_')) {
        this.log('pass', `${envVar} configured`);
      } else {
        this.log('fail', `${envVar} missing or has placeholder value`, true);
      }
    }
  }

  async checkAPIEndpoints() {
    console.log('🌐 API Endpoints:');
    
    const endpoints = [
      'http://localhost:3000/api/products',
      'http://localhost:3000/api/collections'
    ];

    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(endpoint, { 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          this.log('pass', `${endpoint} responding`);
          
          // Check data structure
          if (endpoint.includes('products') && data.products) {
            this.log('pass', 'Products API returns valid data');
          } else if (endpoint.includes('collections') && data.collections) {
            this.log('pass', 'Collections API returns valid data');
          }
        } else {
          this.log('fail', `${endpoint} returned ${response.status}`);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          this.log('warn', `${endpoint} timeout (server may not be running)`);
        } else {
          this.log('warn', `${endpoint} unreachable (${error.message})`);
        }
      }
    }
  }

  async validate() {
    console.log('🦄 Quick Design System Validation');

    // Check critical files
    console.log('📁 Core Files:');
    await this.checkFile('package.json', 'package.json');
    await this.checkFile('.env.local', '.env.local');
    await this.checkFile('app/layout.tsx', 'app/layout.tsx');
    await this.checkFile('lib/providers/UnifiedProvider.tsx', 'UnifiedProvider');
    await this.checkFile('lib/shopify-graphql.ts', 'Shopify GraphQL');

    // Check API routes
    console.log('📡 API Routes:');
    await this.checkFile('app/api/products/route.ts', 'Products API');
    await this.checkFile('app/api/collections/route.ts', 'Collections API');

    // Check core imports/exports
    console.log('📦 Imports/Exports:');
    if (await this.checkFile('lib/providers/UnifiedProvider.tsx', 'UnifiedProvider file')) {
      await this.checkFileContent('lib/providers/UnifiedProvider.tsx', 'UnifiedProvider', [
        ['export function UnifiedProvider', 'UnifiedProvider export'],
        ['export function useDesignSystem', 'useDesignSystem hook'],
        ['QuantumSpatialProvider', 'QuantumSpatialProvider'],
        ['ContentProvider', 'ContentProvider']
      ]);
    }

    if (await this.checkFile('lib/shopify-graphql.ts', 'Shopify GraphQL file')) {
      await this.checkFileContent('lib/shopify-graphql.ts', 'Shopify GraphQL', [
        ['fetchProducts', 'fetchProducts function'],
        ['fetchCollections', 'fetchCollections function'],
        ['PRODUCTS_QUERY', 'Products GraphQL query'],
        ['interface Product', 'Product type definition']
      ]);
    }

    // Check layout integration
    if (await this.checkFile('app/layout.tsx', 'Layout file')) {
      await this.checkFileContent('app/layout.tsx', 'Layout', [
        ['UnifiedProvider', 'UnifiedProvider integration'],
        ['import', 'Import statements']
      ]);
    }

    // Environment variables
    await this.checkEnvVars();

    // API connectivity (if server is running)
    await this.checkAPIEndpoints();

    // Summary
    console.log('' + '='.repeat(50));
    console.log('📊 Validation Summary:');
    
    const passed = this.results.filter(r => r.type === 'pass').length;
    const failed = this.results.filter(r => r.type === 'fail').length;
    const warnings = this.results.filter(r => r.type === 'warn').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log(`🚨 Critical Errors: ${this.criticalErrors}`);

    const isReady = this.criticalErrors === 0;
    console.log(`🦄 Status: ${isReady ? '✅ READY FOR DEPLOYMENT' : '❌ NEEDS FIXES'}`);

    if (!isReady) {
      console.log(`🔧 Fix ${this.criticalErrors} critical error(s) before deployment.`);
    }

    console.log('='.repeat(50));

    return {
      ready: isReady,
      passed,
      failed,
      warnings,
      criticalErrors: this.criticalErrors
    };
  }
}

// CLI Runner
async function main() {
  // Change to project directory if provided
  if (process.argv[2]) {
    process.chdir(process.argv[2]);
  }

  const validator = new QuickValidator();
  const result = await validator.validate();

  // Exit with appropriate code
  process.exit(result.criticalErrors > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  });
}

export default QuickValidator;