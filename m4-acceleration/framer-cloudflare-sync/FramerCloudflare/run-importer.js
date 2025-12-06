// Run the Framer Cloudflare Auto Importer
const path = require('path');
const fs = require('fs');

// Configuration
const CLOUDFLARE_WORKER_URL = "https://design-system-staging.9bitstudios.io";
const FALLBACK_WORKER_URL = "https://quantum-spatial-design-system.9bitstudios.workers.dev";

// Load the importer
console.log('🦄 Starting Framer Cloudflare Auto Importer...');

// Mock the Framer environment
global.Framer = {
  PropertyControls: {
    Boolean: 'Boolean',
    Enum: 'Enum',
    String: 'String'
  }
};

// Mock React and Framer dependencies for testing
const mockReact = {
  useState: (initial) => [initial, () => {}],
  useEffect: (fn) => fn(),
  createContext: () => ({}),
  useContext: () => ({})
};

// Mock Framer Motion
const mockFramerMotion = {
  motion: {
    div: (props) => props,
    button: (props) => props
  }
};

// Mock addPropertyControls function
function mockAddPropertyControls(component, controls) {
  console.log(`✅ Property controls added to ${component.name}`);
  return component;
}

// Test fetching tokens from worker
async function testWorkerConnection() {
  console.log('🔄 Testing connection to Cloudflare Worker...');
  
  try {
    // Try primary URL
    const response = await fetch(`${CLOUDFLARE_WORKER_URL}/health`);
    
    if (response.ok) {
      console.log(`✅ Connected to primary worker (${CLOUDFLARE_WORKER_URL})`);
      return CLOUDFLARE_WORKER_URL;
    } else {
      console.warn(`⚠️ Primary worker returned ${response.status}`);
      throw new Error('Primary worker unavailable');
    }
  } catch (error) {
    console.warn(`⚠️ Could not connect to primary worker: ${error.message}`);
    
    try {
      // Try fallback URL
      console.log('🔄 Trying fallback worker...');
      const fallbackResponse = await fetch(`${FALLBACK_WORKER_URL}/health`);
      
      if (fallbackResponse.ok) {
        console.log(`✅ Connected to fallback worker (${FALLBACK_WORKER_URL})`);
        return FALLBACK_WORKER_URL;
      } else {
        console.warn(`⚠️ Fallback worker returned ${fallbackResponse.status}`);
        throw new Error('Fallback worker unavailable');
      }
    } catch (fallbackError) {
      console.error(`❌ Could not connect to any worker: ${fallbackError.message}`);
      return null;
    }
  }
}

// Fetch tokens from worker
async function fetchTokens(workerUrl, designState) {
  try {
    console.log(`🔄 Fetching tokens for ${designState} from ${workerUrl}...`);
    
    // Try different endpoints that might exist on the worker
    const endpoints = [
      `/design-system/tokens?state=${designState}`,
      `/tokens/${designState}`,
      `/api/tokens/${designState}`
    ];
    
    let successResponse = null;
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${workerUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          successResponse = response;
          console.log(`✅ Successfully fetched tokens from ${endpoint}`);
          break;
        }
      } catch (err) {
        console.warn(`⚠️ Endpoint ${endpoint} failed: ${err.message}`);
      }
    }
    
    if (successResponse) {
      const data = await successResponse.json();
      return data;
    } else {
      throw new Error('All endpoints failed');
    }
  } catch (err) {
    console.warn(`⚠️ Failed to fetch tokens: ${err.message}`);
    return getFallbackTokens(designState);
  }
}

// Production-ready fallback tokens (extracted from CloudflareAutoImporter.js)
function getFallbackTokens(designState) {
  console.log(`🔄 Using fallback tokens for ${designState}`);
  
  const PRODUCTION_TOKENS = {
    heritage: {
      colors: {
        primary: "#131A36", secondary: "#666666", accent: "#888888",
        surface: "#F5F5F5", text: "#333333", background: "#FFFFFF"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { dimensional: false, animations: "minimal", depth: "flat" }
    },
    
    transitional: {
      colors: {
        primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
        surface: "#F8F9FA", text: "#2D3748", background: "#FFFFFF"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { dimensional: "emerging", animations: "subtle", depth: "layered" }
    },
    
    quantum: {
      colors: {
        primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
        surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15",
        rose: "#BF4080", teal: "#126D71"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { dimensional: true, animations: "rich", depth: "spatial", particles: true }
    },
    
    superposition: {
      colors: {
        primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
        surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15",
        rose: "#BF4080", teal: "#126D71", quantum: "#6A3093"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
      typography: {
        fontFamily: "SF Pro Display",
        sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
      },
      effects: { 
        dimensional: "advanced", animations: "fluid", depth: "multi-dimensional",
        particles: "advanced", neuralEngine: true 
      }
    }
  };

  return PRODUCTION_TOKENS[designState] || PRODUCTION_TOKENS.quantum;
}

// Detect device capabilities
function detectDeviceCapabilities() {
  console.log('🔄 Detecting device capabilities...');
  
  // Simple detection in Node environment
  const os = require('os');
  const cpus = os.cpus();
  const platform = os.platform();
  const isApple = platform === 'darwin';
  const cpuModel = cpus[0]?.model || '';
  const isM4 = isApple && (cpuModel.includes('Apple') || cpus.length >= 8);
  
  const capabilities = {
    platform,
    cpuModel,
    cpuCount: cpus.length,
    totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + 'GB',
    isAppleSilicon: isApple && cpuModel.includes('Apple'),
    isM4Detected: isM4,
    recommendedState: isM4 ? 'superposition' : 'quantum'
  };
  
  console.log('✅ Device capabilities detected:');
  console.log(JSON.stringify(capabilities, null, 2));
  
  return capabilities;
}

// Generate components based on tokens (simplified for this test)
function generateComponents(tokens) {
  console.log('🔄 Generating components based on tokens...');
  
  const components = {
    Button: (props) => {
      console.log(`Generated Button with props: ${JSON.stringify(props)}`);
      return {
        type: 'Button',
        style: {
          background: `linear-gradient(45deg, ${tokens.colors.accent}, ${tokens.colors.secondary})`,
          color: tokens.colors.text,
          padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
          borderRadius: '8px',
          fontSize: tokens.typography.sizes?.md || '16px'
        },
        text: props.text || 'Button'
      };
    },
    
    Card: (props) => {
      console.log(`Generated Card with props: ${JSON.stringify(props)}`);
      return {
        type: 'Card',
        style: {
          background: tokens.colors.surface,
          color: tokens.colors.text,
          padding: tokens.spacing.lg,
          borderRadius: '12px'
        },
        title: props.title,
        children: props.children
      };
    },
    
    Layout: (props) => {
      console.log(`Generated Layout with props: ${JSON.stringify(props)}`);
      return {
        type: 'Layout',
        variant: props.type || 'dashboard',
        style: {
          background: tokens.colors.background,
          color: tokens.colors.text
        },
        title: props.title,
        children: props.children
      };
    }
  };
  
  console.log('✅ Components generated successfully');
  return components;
}

// Main function to run the importer
async function runImporter() {
  console.log('🦄 Running CloudflareAutoImporter...');
  
  // Step 1: Test worker connection
  const workerUrl = await testWorkerConnection();
  
  // Step 2: Detect device capabilities
  const deviceInfo = detectDeviceCapabilities();
  
  // Step 3: Fetch tokens
  const designState = deviceInfo.recommendedState;
  const tokens = workerUrl ? await fetchTokens(workerUrl, designState) : getFallbackTokens(designState);
  
  // Step 4: Generate components
  const components = generateComponents(tokens);
  
  // Step 5: Create demo content
  console.log('🔄 Creating demo content...');
  
  const demo = {
    type: 'AutoGeneratedContent',
    layout: components.Layout({
      type: 'dashboard',
      title: 'Quantum-Spatial Design System',
      children: [
        components.Card({
          title: 'About This Demo',
          children: 'This content was generated automatically using the Framer Cloudflare Auto Importer'
        }),
        components.Button({
          text: 'Primary Action',
          variant: 'primary'
        }),
        components.Card({
          title: 'Device Information',
          children: `Detected: ${deviceInfo.isM4Detected ? 'M4-Capable Device' : 'Standard Device'}`
        })
      ]
    })
  };
  
  // Step 6: Output results
  const outputPath = path.join(__dirname, 'importer-output.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    tokens,
    deviceInfo,
    components: Object.keys(components),
    demo
  }, null, 2));
  
  console.log(`✅ Importer ran successfully! Output saved to: ${outputPath}`);
  
  // Generate HTML preview
  generateHtmlPreview(tokens, deviceInfo, components);
}

// Generate HTML preview
function generateHtmlPreview(tokens, deviceInfo, components) {
  console.log('🔄 Generating HTML preview...');
  
  const previewPath = path.join(__dirname, 'preview.html');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Framer Cloudflare Auto Importer Preview</title>
  <style>
    :root {
      /* Colors */
      --color-primary: ${tokens.colors.primary};
      --color-secondary: ${tokens.colors.secondary};
      --color-accent: ${tokens.colors.accent};
      --color-surface: ${tokens.colors.surface};
      --color-text: ${tokens.colors.text};
      --color-background: ${tokens.colors.background};
      --color-rose: ${tokens.colors.rose || '#BF4080'};
      --color-teal: ${tokens.colors.teal || '#126D71'};
      
      /* Spacing */
      --spacing-xs: ${tokens.spacing.xs};
      --spacing-sm: ${tokens.spacing.sm};
      --spacing-md: ${tokens.spacing.md};
      --spacing-lg: ${tokens.spacing.lg};
      --spacing-xl: ${tokens.spacing.xl};
      
      /* Typography */
      --font-family: ${tokens.typography.fontFamily || 'system-ui, sans-serif'};
      --font-size-xs: ${tokens.typography.sizes?.xs || '12px'};
      --font-size-sm: ${tokens.typography.sizes?.sm || '14px'};
      --font-size-md: ${tokens.typography.sizes?.md || '16px'};
      --font-size-lg: ${tokens.typography.sizes?.lg || '18px'};
      --font-size-xl: ${tokens.typography.sizes?.xl || '24px'};
    }
    
    body {
      font-family: var(--font-family);
      background-color: var(--color-background);
      color: var(--color-text);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-xl);
    }
    
    h1 {
      color: var(--color-accent);
      font-size: var(--font-size-xl);
    }
    
    h2 {
      color: var(--color-rose);
    }
    
    h3 {
      color: var(--color-teal);
    }
    
    .card {
      background: var(--color-surface);
      padding: var(--spacing-lg);
      border-radius: 12px;
      margin-bottom: var(--spacing-lg);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .card h3 {
      margin-top: 0;
    }
    
    .button {
      background: linear-gradient(45deg, var(--color-accent), var(--color-secondary));
      color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
    }
    
    pre {
      background: rgba(0, 0, 0, 0.1);
      padding: var(--spacing-md);
      border-radius: 8px;
      overflow: auto;
      max-height: 300px;
      font-size: var(--font-size-sm);
    }
    
    .token-switcher {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
    }
    
    .token-btn {
      background: var(--color-surface);
      color: var(--color-accent);
      border: 1px solid var(--color-accent);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: 4px;
      cursor: pointer;
    }
    
    .token-btn.active {
      background: var(--color-accent);
      color: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Framer Cloudflare Auto Importer</h1>
    <p>This preview was automatically generated using the design tokens from Cloudflare Worker</p>
    
    <div class="card">
      <h3>Device Information</h3>
      <p>Platform: ${deviceInfo.platform}</p>
      <p>CPU: ${deviceInfo.cpuModel}</p>
      <p>M4 Detected: ${deviceInfo.isM4Detected ? '✓ Yes' : '✗ No'}</p>
      <p>Recommended State: ${deviceInfo.recommendedState}</p>
    </div>
    
    <h2>Auto-Generated Components</h2>
    
    <div class="grid">
      <div class="card">
        <h3>Button Component</h3>
        <button class="button">Primary Button</button>
      </div>
      
      <div class="card">
        <h3>Card Component</h3>
        <p>This is an example of the Card component that was auto-generated based on the design tokens.</p>
      </div>
    </div>
    
    <h2>Design Tokens</h2>
    <pre>${JSON.stringify(tokens, null, 2)}</pre>
  </div>
  
  <script>
    // Simple script to highlight that this is interactive
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('click', () => {
        alert('Button clicked! In a real Framer component, this would trigger an action.');
      });
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(previewPath, html);
  console.log(`✅ HTML preview generated at: ${previewPath}`);
}

// Run the importer
runImporter().catch(error => {
  console.error('❌ Error running importer:', error);
});