#!/bin/bash
# deploy-quantum-spatial-worker.sh
# Automated deployment script for Quantum-Spatial Design System to Cloudflare Workers

set -e  # Exit on any error

# Configuration
CONFIG_FILE=".cf-config.json"
WORKER_DIR="./cloudflare-worker"
DESIGN_TOKENS_DIR="./tokens"
COMPONENTS_DIR="./components"

# Default environment
ENVIRONMENT="staging"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --production) ENVIRONMENT="production"; shift ;;
    --staging) ENVIRONMENT="staging"; shift ;;
    --config=*) CONFIG_FILE="${1#*=}"; shift ;;
    --help) 
      echo "Usage: ./deploy-quantum-spatial-worker.sh [options]"
      echo "Options:"
      echo "  --production         Deploy to production environment"
      echo "  --staging            Deploy to staging environment (default)"
      echo "  --config=FILE        Specify config file (default: .cf-config.json)"
      echo "  --help               Show this help message"
      exit 0
      ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
done

# Check for config file
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Config file $CONFIG_FILE not found"
  echo "Create a config file with the following structure:"
  echo '{
  "environments": {
    "production": {
      "name": "quantum-spatial-api",
      "account_id": "your-cf-account-id",
      "api_token": "your-cf-api-token",
      "routes": ["api.9bitstudios.io/*"]
    },
    "staging": {
      "name": "quantum-spatial-api-staging",
      "account_id": "your-cf-account-id",
      "api_token": "your-cf-api-token",
      "routes": ["staging-api.9bitstudios.io/*"]
    }
  }
}'
  exit 1
fi

# Load configuration
CONFIG=$(cat "$CONFIG_FILE")
NAME=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.name")
ACCOUNT_ID=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.account_id")
API_TOKEN=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.api_token")
ROUTES=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.routes[]")

echo "🦄 Deploying Quantum-Spatial API to $ENVIRONMENT environment"
echo "Worker: $NAME"

# Check for required directories
if [ ! -d "$WORKER_DIR" ]; then
  echo "Error: Worker directory $WORKER_DIR not found"
  exit 1
fi
if [ ! -d "$DESIGN_TOKENS_DIR" ]; then
  echo "Error: Design tokens directory $DESIGN_TOKENS_DIR not found"
  exit 1
fi
if [ ! -d "$COMPONENTS_DIR" ]; then
  echo "Error: Components directory $COMPONENTS_DIR not found"
  exit 1
fi

# Create temporary build directory
BUILD_DIR=$(mktemp -d)
echo "Using temporary build directory: $BUILD_DIR"

# Copy worker files
cp -r "$WORKER_DIR/"* "$BUILD_DIR/"

# Process and bundle design tokens
echo "📦 Bundling design tokens..."
mkdir -p "$BUILD_DIR/data"
node scripts/bundle-tokens.js --input="$DESIGN_TOKENS_DIR" --output="$BUILD_DIR/data/tokens.json"

# Process and bundle components
echo "📦 Bundling components..."
node scripts/bundle-components.js --input="$COMPONENTS_DIR" --output="$BUILD_DIR/data/components.json"

# Build worker with wrangler
echo "🔨 Building Cloudflare Worker..."
cd "$BUILD_DIR"

# Create wrangler.toml
cat > wrangler.toml << EOF
name = "$NAME"
main = "worker.js"
compatibility_date = "$(date +%Y-%m-%d)"

[vars]
ENVIRONMENT = "$ENVIRONMENT"

[[kv_namespaces]]
binding = "QUANTUM_SPATIAL_STORAGE"
id = "$(wrangler kv:namespace list | grep "QUANTUM_SPATIAL_STORAGE" | awk '{print $1}')" 

[env.production]
route = "api.9bitstudios.io/*"

[env.staging]
route = "staging-api.9bitstudios.io/*"
EOF

# Deploy with wrangler
echo "🦄 Deploying to Cloudflare..."
CLOUDFLARE_API_TOKEN="$API_TOKEN" CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID" npx wrangler publish

# Set up routes
for ROUTE in $ROUTES; do
  echo "Setting up route: $ROUTE"
  curl -X POST "https://api.cloudflare.com/client/v4/zones/$ACCOUNT_ID/workers/routes" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"pattern\":\"$ROUTE\",\"script\":\"$NAME\"}"
done

# Clean up
echo "🧹 Cleaning up..."
rm -rf "$BUILD_DIR"

echo "✅ Deployment complete! The Quantum-Spatial API is now available at:"
for ROUTE in $ROUTES; do
  echo "https://$ROUTE"
done

# Additional helper scripts

# Create bundle-tokens.js script if it doesn't exist
if [ ! -f "scripts/bundle-tokens.js" ]; then
  mkdir -p scripts
  cat > scripts/bundle-tokens.js << 'EOF'
#!/usr/bin/env node
// Bundle design tokens for Cloudflare Worker deployment

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .option('-i, --input <directory>', 'Input tokens directory')
  .option('-o, --output <file>', 'Output bundled JSON file')
  .parse(process.argv);

const options = program.opts();
const inputDir = options.input || './tokens';
const outputFile = options.output || './data/tokens.json';

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process all token files and combine them
function processTokens(directory) {
  const result = {
    version: "1.0.0",
    generated: new Date().toISOString(),
    states: {
      heritage: {},
      transitional: {},
      quantum: {},
      superposition: {}
    }
  };

  // Read all JSON files in the directory
  const files = fs.readdirSync(directory)
    .filter(file => file.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(directory, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const category = path.basename(file, '.json');

    // Process each state
    for (const state in result.states) {
      if (content[state]) {
        result.states[state][category] = content[state];
      }
    }
  }

  return result;
}

// Bundle the tokens
const bundledTokens = processTokens(inputDir);

// Write the output file
fs.writeFileSync(outputFile, JSON.stringify(bundledTokens, null, 2));
console.log(`✅ Tokens bundled to ${outputFile}`);
EOF
  chmod +x scripts/bundle-tokens.js
  echo "📝 Created scripts/bundle-tokens.js"
fi

# Create bundle-components.js script if it doesn't exist
if [ ! -f "scripts/bundle-components.js" ]; then
  mkdir -p scripts
  cat > scripts/bundle-components.js << 'EOF'
#!/usr/bin/env node
// Bundle components for Cloudflare Worker deployment

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .option('-i, --input <directory>', 'Input components directory')
  .option('-o, --output <file>', 'Output bundled JSON file')
  .parse(process.argv);

const options = program.opts();
const inputDir = options.input || './components';
const outputFile = options.output || './data/components.json';

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process component directories
function processComponents(directory) {
  const result = {
    version: "1.0.0",
    generated: new Date().toISOString(),
    components: {}
  };

  // Get all subdirectories in the components directory
  const componentTypes = fs.readdirSync(directory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const type of componentTypes) {
    const typePath = path.join(directory, type);
    result.components[type] = {};

    // Get all component files in the type directory
    const componentFiles = fs.readdirSync(typePath)
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));

    for (const file of componentFiles) {
      const filePath = path.join(typePath, file);
      const componentName = path.basename(file, path.extname(file));
      const content = fs.readFileSync(filePath, 'utf8');

      // Extract component props and metadata from JSDoc comments
      const metadata = extractMetadata(content);
      
      result.components[type][componentName] = {
        name: componentName,
        code: content,
        metadata
      };
    }
  }

  return result;
}

// Extract component metadata from JSDoc comments
function extractMetadata(code) {
  const metadata = {
    description: "",
    props: {},
    states: []
  };

  // Extract JSDoc comments with basic parsing
  const docRegex = /\/\*\*([\s\S]*?)\*\//g;
  const propRegex = /@prop\s+{([^}]+)}\s+(\w+)(?:\s+-\s+(.*))?/g;
  const stateRegex = /@state\s+(\w+)(?:\s+-\s+(.*))?/g;
  
  let docMatch;
  while ((docMatch = docRegex.exec(code)) !== null) {
    const docContent = docMatch[1];
    
    // Extract description (first line after /** and before any @tags)
    const descMatch = docContent.match(/^\s*\*\s*([^@\r]+)/);
    if (descMatch) {
      metadata.description = descMatch[1].trim();
    }
    
    // Extract props
    let propMatch;
    while ((propMatch = propRegex.exec(docContent)) !== null) {
      const propType = propMatch[1].trim();
      const propName = propMatch[2].trim();
      const propDesc = propMatch[3] ? propMatch[3].trim() : "";
      
      metadata.props[propName] = {
        type: propType,
        description: propDesc
      };
    }
    
    // Extract states
    let stateMatch;
    while ((stateMatch = stateRegex.exec(docContent)) !== null) {
      const stateName = stateMatch[1].trim();
      const stateDesc = stateMatch[2] ? stateMatch[2].trim() : "";
      
      metadata.states.push({
        name: stateName,
        description: stateDesc
      });
    }
  }
  
  return metadata;
}

// Bundle the components
const bundledComponents = processComponents(inputDir);

// Write the output file
fs.writeFileSync(outputFile, JSON.stringify(bundledComponents, null, 2));
console.log(`✅ Components bundled to ${outputFile}`);
EOF
  chmod +x scripts/bundle-components.js
  echo "📝 Created scripts/bundle-components.js"
fi