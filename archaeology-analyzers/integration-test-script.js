#!/usr/bin/env node

// scripts/integration-test.js
// Integration tests for data flow and API routing

const { spawn } = require('child_process');
const { setTimeout } = require('timers/promises');

class IntegrationTester {
  constructor() {
    this.serverProcess = null;
    this.results = [];
  }

  log(type, message) {
    const icons = { pass: '✅', fail: '❌', info: 'ℹ️' };
    console.log(`${icons[type]} ${message}`);
    this.results.push({ type, message });
  }

  async startServer() {
    this.log('info', 'Starting development server...');
    
    return new Promise((resolve, reject) => {
      this.serverProcess = spawn('npm', ['run', 'dev'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false
      });

      let output = '';
      this.serverProcess.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('Ready') || output.includes('localhost:3000')) {
          resolve();
        }
      });

      this.serverProcess.stderr.on('data', (data) => {
        const error = data.toString();
        if (error.includes('Error') || error.includes('Failed')) {
          reject(new Error(`Server failed to start: ${error}`));
        }
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        reject(new Error('Server start timeout'));
      }, 30000);
    });
  }

  async stopServer() {
    if (this.serverProcess) {
      this.log('info', 'Stopping development server...');
      this.serverProcess.kill('SIGTERM');
      await setTimeout(2000); // Wait for graceful shutdown
    }
  }

  async testAPI(endpoint, expectedFields = []) {
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`);
      
      if (!response.ok) {
        this.log('fail', `${endpoint} returned ${response.status}`);
        return false;
      }

      const data = await response.json();
      this.log('pass', `${endpoint} responding correctly`);

      // Check response structure
      for (const field of expectedFields) {
        if (data[field]) {
          this.log('pass', `${endpoint} has required field: ${field}`);
        } else {
          this.log('fail', `${endpoint} missing field: ${field}`);
          return false;
        }
      }

      return { data, success: true };
    } catch (error) {
      this.log('fail', `${endpoint} failed: ${error.message}`);
      return false;
    }
  }

  async testShopifyDataFlow() {
    this.log('info', 'Testing Shopify data flow...');

    // Test products API
    const productsResult = await this.testAPI('/api/products', ['products', 'source']);
    if (productsResult && productsResult.data.products.length > 0) {
      this.log('pass', `Products API returned ${productsResult.data.products.length} products`);
      
      // Validate product structure
      const product = productsResult.data.products[0];
      const requiredProductFields = ['id', 'title', 'handle', 'price', 'images'];
      
      for (const field of requiredProductFields) {
        if (product[field]) {
          this.log('pass', `Product has required field: ${field}`);
        } else {
          this.log('fail', `Product missing field: ${field}`);
        }
      }

      // Check if data is from Shopify (not mock)
      if (productsResult.data.source === 'shopify') {
        this.log('pass', 'Products are from Shopify (not mock data)');
      } else {
        this.log('fail', 'Products are mock data - Shopify integration not working');
      }
    } else {
      this.log('fail', 'Products API returned no data');
    }

    // Test collections API
    const collectionsResult = await this.testAPI('/api/collections', ['collections']);
    if (collectionsResult && collectionsResult.data.collections.length > 0) {
      this.log('pass', `Collections API returned ${collectionsResult.data.collections.length} collections`);
    } else {
      this.log('fail', 'Collections API returned no data');
    }

    // Test individual product fetch
    if (productsResult && productsResult.data.products.length > 0) {
      const firstProduct = productsResult.data.products[0];
      const productResult = await this.testAPI(`/api/products/${firstProduct.handle}`, ['product']);
      
      if (productResult) {
        this.log('pass', `Individual product fetch working for: ${firstProduct.handle}`);
      } else {
        this.log('fail', `Individual product fetch failed for: ${firstProduct.handle}`);
      }
    }
  }

  async testDesignSystemIntegration() {
    this.log('info', 'Testing design system integration...');

    // Test homepage loads
    try {
      const response = await fetch('http://localhost:3000');
      if (response.ok) {
        const html = await response.text();
        
        // Check for key design system elements
        if (html.includes('quantum') || html.includes('design-system')) {
          this.log('pass', 'Homepage contains design system references');
        } else {
          this.log('fail', 'Homepage missing design system integration');
        }

        // Check for React hydration
        if (html.includes('__NEXT_DATA__')) {
          this.log('pass', 'React hydration data present');
        } else {
          this.log('fail', 'React hydration data missing');
        }

        // Check for product data in page
        if (html.includes('product') || html.includes('game')) {
          this.log('pass', 'Product data appears to be rendering');
        } else {
          this.log('fail', 'No product data found in rendered page');
        }

      } else {
        this.log('fail', `Homepage returned ${response.status}`);
      }
    } catch (error) {
      this.log('fail', `Homepage test failed: ${error.message}`);
    }
  }

  async testCartFunctionality() {
    this.log('info', 'Testing cart functionality...');

    // Test adding to cart (if cart API exists)
    const cartResult = await this.testAPI('/api/cart', []);
    if (cartResult) {
      this.log('pass', 'Cart API accessible');
    } else {
      this.log('info', 'Cart API not implemented (using client-side cart)');
    }
  }

  async testEnvironmentVariables() {
    this.log('info', 'Testing environment variables...');

    // Test debug endpoint if it exists
    const debugResult = await this.testAPI('/api/debug-env', []);
    if (debugResult) {
      this.log('pass', 'Environment debug endpoint working');
      
      if (debugResult.data.environmentVariables?.allDefined) {
        this.log('pass', 'All required environment variables defined');
      } else {
        this.log('fail', 'Some environment variables missing');
      }
    } else {
      this.log('info', 'Debug endpoint not available');
    }
  }

  async runTests() {
    console.log('🧪 Starting Integration Tests');

    try {
      // Start the development server
      await this.startServer();
      await setTimeout(3000); // Give server time to fully start

      // Run test suites
      await this.testShopifyDataFlow();
      await this.testDesignSystemIntegration();
      await this.testCartFunctionality();
      await this.testEnvironmentVariables();

      // Stop the server
      await this.stopServer();

      // Generate report
      console.log('' + '='.repeat(50));
      console.log('🧪 Integration Test Results:');
      
      const passed = this.results.filter(r => r.type === 'pass').length;
      const failed = this.results.filter(r => r.type === 'fail').length;
      const info = this.results.filter(r => r.type === 'info').length;
      
      console.log(`✅ Passed: ${passed}`);
      console.log(`❌ Failed: ${failed}`);
      console.log(`ℹ️  Info: ${info}`);

      const success = failed === 0;
      console.log(`🤓 Overall: ${success ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

      if (!success) {
        console.log('❌ Failed Tests:');
        this.results
          .filter(r => r.type === 'fail')
          .forEach(r => console.log(`   ${r.message}`));
      }

      console.log('='.repeat(50));

      return success;

    } catch (error) {
      console.error('❌ Integration tests failed:', error.message);
      await this.stopServer();
      return false;
    }
  }
}

// CLI Runner
async function main() {
  const tester = new IntegrationTester();
  const success = await tester.runTests();
  
  process.exit(success ? 0 : 1);
}

// Handle cleanup on exit
process.on('SIGINT', async () => {
  console.log('🛑 Tests interrupted, cleaning up...');
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Tests terminated, cleaning up...');
  process.exit(1);
});

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Integration test runner failed:', error);
    process.exit(1);
  });
}

module.exports = IntegrationTester;