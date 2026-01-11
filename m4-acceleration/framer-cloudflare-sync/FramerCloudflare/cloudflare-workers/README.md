# 9Bit Studios Cloudflare Worker Integration

This Cloudflare Worker serves as a central integration layer for 9Bit Studios applications, facilitating interactions between various services and systems.

## Features

- **Design System Integration**: Deliver tokens, components, and assets to Framer projects
- **Notion Integration**: Interface with Notion for content management
- **Content Intelligence**: Process and enhance content using Grid API
- **Oksana Creator Portal Accelerator API**: Backend services for the Oksana Creator Portal Accelerator
- **Asset Management**: Integration with Cloudinary
- **Email Services**: Integration with Fastmail
- **Deployment Automation**: Integration with Vercel API

## Architecture

The worker is organized into modular services:

```
cloudflare-worker/
├── src/
│   └── worker.js       # Main entry point and request router
├── functions/          # Shared utility functions
├── services/           # Service-specific handlers
├── examples/           # Example integrations
├── scripts/            # Deployment and testing scripts
├── wrangler.toml       # Worker configuration
└── package.json        # Project dependencies
```

## Enhanced Framer Integration

The worker now includes enhanced support for Framer integration, providing direct access to design system resources without requiring API keys. This implementation has been significantly improved with better CORS support and simplified token access.

Key features:

- **Enhanced CORS Support**: Improved support for Framer domains with proper preflight handling
- **Direct Token Access**: Simplified `/design-system/tokens` endpoint for easier integration
- **State-based Design Tokens**: Access design tokens for all four states (Heritage, Transitional, Quantum, Superposition)
- **Component Definitions**: Retrieve component properties and configurations
- **M4 Optimization**: Advanced detection and configuration for Apple Silicon devices
- **Asset Management**: Access design assets with appropriate metadata

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Cloudflare account with Workers subscription
- Access to required API keys (Supabase, Notion, Grid, Cloudinary, Fastmail, Vercel)

### Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd cloudflare-worker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your actual API keys and tokens.

5. Log in to Cloudflare with Wrangler:
   ```
   wrangler login
   ```

6. Update `wrangler.toml` with your Cloudflare account ID.

### Development

Run the worker locally for development:

```
npm run dev
```

This will start a local server, typically at http://localhost:8787.

### DNS Setup

To set up the DNS records for the Cloudflare Worker with the domains `api.9bitstudios.io` (production) and `staging-api.9bitstudios.io` (staging), use the included DNS setup script:

1. Ensure you have the following environment variables in your `.env` file:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Zone:DNS:Edit permissions
   - `CLOUDFLARE_ZONE_ID`: The Zone ID for the 9bitstudios.io domain
   - `CF_ACCOUNT_ID`: Your Cloudflare account ID

2. Run the setup script:
   ```
   npm run setup-dns
   ```

This script will:
- Create or update CNAME records for the API domains
- Create Worker routes to route traffic to the appropriate environment
- Configure proxying through Cloudflare for added security

### Secret Management

You can add your secrets to Cloudflare Worker in two ways:

#### Option 1: Using the automated script

The deployment script can automatically set all secrets from your `.env` file:

```
./scripts/deploy.sh --secrets
```

#### Option 2: Manually setting secrets

Add each secret individually:

```bash
# Core Authentication
wrangler secret put JWT_SECRET

# Supabase Integration
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_KEY

# Notion Integration
wrangler secret put NOTION_API_KEY
wrangler secret put NOTION_DATABASE_ID

# Grid API
wrangler secret put GRID_API_KEY

# Cloudinary Asset Management
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY
wrangler secret put CLOUDINARY_API_SECRET

# Fastmail Integration
wrangler secret put FASTMAIL_API_KEY
wrangler secret put FASTMAIL_ACCOUNT_ID
wrangler secret put FASTMAIL_SMTP_HOST
wrangler secret put FASTMAIL_SMTP_PORT

# Vercel Integration
wrangler secret put VERCEL_API_TOKEN
wrangler secret put VERCEL_TEAM_ID
wrangler secret put VERCEL_PROJECT_ID
```

### Deployment

### Using Dedicated Deployment Scripts

#### Staging Deployment

```bash
# Make the script executable (if needed)
chmod +x ./scripts/deploy-staging.sh

# Deploy to staging
./scripts/deploy-staging.sh
```

#### Production Deployment

```bash
# Make the script executable (if needed)
chmod +x ./scripts/deploy-production.sh

# Deploy to production
./scripts/deploy-production.sh
```

### Using Specialized Deployment Scripts

For Framer integration deployment:
```
./scripts/deploy-framer-integration.sh
```
This script will deploy the worker with enhanced Framer support and automatically update your configuration file with the correct worker URL.

### Using Standard Deployment Scripts

For staging deployment:
```
./scripts/deploy.sh --staging
```

For production deployment:
```
./scripts/deploy.sh --production
```

For deployment with automatic secret setup:
```
./scripts/deploy.sh --staging --secrets
```

### Using npm Scripts

For staging deployment:
```
npm run deploy:staging
```

For production deployment:
```
npm run deploy:production
```

### Viewing Logs

You can view the worker logs in real-time using:

```bash
wrangler tail --format=pretty
```

### Testing

Run the test script to validate the implementation:

```
npm test
```

This will test connections to:
- Local development server (http://localhost:8787)
- Staging environment (https://staging-api.9bitstudios.io)
- Production environment (https://api.9bitstudios.io)

You can also test a specific endpoint manually:

```bash
# Test the Framer Fetch endpoint
curl -s "https://api.9bitstudios.io/design-system/framer-fetch?type=tokens&state=quantum" | jq
```

## API Documentation

### Design System API

#### Design Tokens

- **Endpoint**: `/design-system/tokens`
- **Method**: GET
- **Authentication**: Bearer token required for non-public endpoints
- **Response**: JSON object containing design token categories

#### Components

- **Endpoint**: `/design-system/components`
- **Method**: GET
- **Authentication**: Bearer token required
- **Response**: JSON array of component definitions

#### Design Assets

- **Endpoint**: `/design-system/assets`
- **Method**: GET
- **Authentication**: Bearer token required
- **Response**: JSON array of asset information

#### Direct Token Access (Enhanced for Framer)

- **Endpoint**: `/design-system/tokens`
- **Method**: GET
- **Parameters**:
  - `state`: Design state (heritage, transitional, quantum, superposition)
- **Authentication**: None required
- **Response**: JSON object containing design tokens for the specified state

#### Framer Fetch (Public API)

- **Endpoint**: `/design-system/framer-fetch`
- **Method**: GET
- **Parameters**:
  - `type`: Resource type (tokens, components, assets)
  - `state`: Design state (heritage, transitional, quantum, superposition)
- **Authentication**: None required
- **Response**: JSON object containing requested resources

#### M4 Optimization

- **Endpoint**: `/m4-optimization`
- **Method**: GET
- **Parameters**:
  - `state`: Design state (heritage, transitional, quantum, superposition)
- **Authentication**: None required
- **Response**: JSON object containing M4 optimization parameters

### Quantum-Spatial Components

#### PixelViewer Component

- **Endpoint**: `/pixel-viewer`
- **Method**: GET
- **Parameters**:
  - `state`: Initial quantum state (heritage, transitional, quantum, superposition)
  - `format`: Output format (json, html, react)
  - `m4`: Enable M4 optimization (true/false)
- **Authentication**: None required
- **Response Format**: 
  - `json` (default): Full component definition in JSON format
  - `html`: Interactive HTML preview
  - `react`: React component code

The PixelViewer component provides an interactive visualization of the quantum-spatial pixel system with support for all four quantum states:
- Heritage: Flat orthogonal representation with structured layout
- Transitional: Emerging dimension with softened edges
- Quantum: Fully dimensional with organic, fluid forms
- Superposition: Multiple states simultaneously with overlapping forms

#### QuantumPixel Component

- **Endpoint**: `/quantum-pixel`
- **Method**: GET
- **Parameters**:
  - `state`: Quantum state (heritage, transitional, quantum, superposition)
  - `m4`: Enable M4 optimization (true/false)
- **Authentication**: None required
- **Response**: Component definition in JSON format

#### DimensionalGrid Component

- **Endpoint**: `/dimensional-grid`
- **Method**: GET
- **Parameters**:
  - `state`: Quantum state (heritage, transitional, quantum)
  - `m4`: Enable M4 optimization (true/false)
- **Authentication**: None required
- **Response**: Component definition in JSON format

#### Framer Components Registry

- **Endpoint**: `/framer-components`
- **Method**: GET
- **Authentication**: None required
- **Response**: JSON array of component definitions in Framer-compatible format

The Framer Components Registry provides a direct integration point for Framer projects. Use this endpoint with the Framer CLI to sync components:

```bash
framer sync setup --url https://design-system-staging.9bitstudios.io/framer-components
framer sync pull
```

## Integration with Framer

### Using Quantum-Spatial Components in Framer

After syncing the components using the Framer CLI, you can use them in your Framer projects:

```jsx
import * as React from "react";
import { PixelViewer, QuantumPixel, DimensionalGrid } from "design-system";

export function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "SF Pro Text, system-ui, sans-serif" }}>
      <h1>Quantum-Spatial Design System</h1>
      
      <h2>PixelViewer Component</h2>
      <div style={{ width: "600px", height: "400px", marginBottom: "20px" }}>
        <PixelViewer 
          initialState="transitional"
          columns={8}
          rows={6}
          pixelSize="sm"
          showControls={true}
        />
      </div>
      
      <h2>Quantum Pixel Examples</h2>
      <div style={{ display: "flex", gap: "24px", marginBottom: "30px" }}>
        <div>
          <h3>Heritage</h3>
          <QuantumPixel state="heritage" size={64} />
        </div>
        <div>
          <h3>Transitional</h3>
          <QuantumPixel state="transitional" size={64} />
        </div>
        <div>
          <h3>Quantum</h3>
          <QuantumPixel state="quantum" size={64} />
        </div>
        <div>
          <h3>Superposition</h3>
          <QuantumPixel state="superposition" size={64} />
        </div>
      </div>
      
      <h2>Dimensional Grid</h2>
      <div style={{ width: "600px", height: "300px", border: "1px solid #eee" }}>
        <DimensionalGrid
          state="transitional"
          density="medium"
          enableFalloff={true}
        />
      </div>
    </div>
  );
}
```

## Testing

Test the endpoints with curl commands:

```bash
# Test Framer Fetch endpoint (public)
curl -X GET "https://design-system-staging.9bitstudios.io/design-system/framer-fetch?type=tokens&state=transitional"

# Test design tokens endpoint (authenticated)
curl -X GET https://design-system-staging.9bitstudios.io/design-system/tokens \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test PixelViewer component (JSON format)
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=quantum"

# Test PixelViewer HTML preview
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=transitional&format=html" > pixel-viewer-preview.html

# Test PixelViewer React component code
curl -X GET "https://design-system-staging.9bitstudios.io/pixel-viewer?state=heritage&format=react" > PixelViewer.tsx

# Test Framer components registry
curl -X GET "https://design-system-staging.9bitstudios.io/framer-components"
```

You can also test the endpoints directly in your browser by visiting:
- https://design-system-staging.9bitstudios.io/pixel-viewer?state=quantum&format=html
- https://design-system-staging.9bitstudios.io/design-system/tokens?state=transitional

## Enhanced Integration with Framer

The system now provides a simplified and more direct integration with Framer:

### Using the DesignSystemProvider Component

```jsx
import * as React from "react";
import { useEffect, useState } from "react";

// DesignSystemProvider component
export function DesignSystemProvider({ children, initialState = "transitional" }) {
  const [state, setState] = useState(initialState);
  const [designSystem, setDesignSystem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch tokens from the worker
  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
      
      try {
        const response = await fetch(
          `https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev/design-system/tokens?state=${state}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch design tokens: ${response.status}`);
        }
        
        const data = await response.json();
        setDesignSystem(data);
        
        // Apply CSS variables
        applyTokensToCSS(data);
      } catch (err) {
        console.error("Error fetching design tokens:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTokens();
  }, [state]);
  
  // Apply tokens as CSS variables
  function applyTokensToCSS(tokens) {
    if (!tokens) return;
    
    const root = document.documentElement;
    
    // Apply colors
    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === "string") {
          root.style.setProperty(`--color-${key}`, value);
        }
      });
    }
    
    // Apply spacing, typography, etc.
    // ... additional CSS variable application
  }
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <div>Loading design system...</div>
      ) : (
        <div data-state={state}>
          {children}
        </div>
      )}
    </div>
  );
}
```

### Using Design Tokens in Components

```jsx
function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-medium)"
      }}
    >
      This component uses the Quantum-Spatial Design System
    </div>
  );
}
```

A complete example implementation can be found in the `framer-output/DesignSystemProvider.tsx` and `framer-output/SamplePage.tsx` files.

## Environment Variables

The following environment variables are required:

### Authentication
- `JWT_SECRET`: Secret key for JWT authentication

### Supabase Integration
- `SUPABASE_URL`: URL for your Supabase instance
- `SUPABASE_KEY`: API key for Supabase authentication

### Notion Integration
- `NOTION_API_KEY`: API key for Notion
- `NOTION_DATABASE_ID`: ID of the Notion database

### Grid API
- `GRID_API_KEY`: API key for Grid content intelligence

### Cloudinary Asset Management
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: API key for Cloudinary
- `CLOUDINARY_API_SECRET`: API secret for Cloudinary

### Email Configuration (Fastmail)
- `FASTMAIL_USER`: Your Fastmail username/email
- `FASTMAIL_PASSWORD`: Your Fastmail app-specific password
- `FASTMAIL_SMTP_HOST`: SMTP host for Fastmail (typically smtp.fastmail.com)
- `FASTMAIL_SMTP_PORT`: SMTP port for Fastmail (typically 587)
- `NOTIFICATION_EMAIL`: Email address to send notifications to

### Vercel Integration
- `VERCEL_API_TOKEN`: API token for Vercel
- `VERCEL_TEAM_ID`: Your Vercel team ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## License

This project is proprietary software of 9Bit Studios.

## Contact

For support or questions about this implementation, contact the engineering team at engineering@9bitstudios.com.