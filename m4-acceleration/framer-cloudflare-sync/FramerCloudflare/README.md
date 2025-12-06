# Quantum-Spatial Design System - Framer Cloudflare Integration

A comprehensive, M4-optimized design system with automatic Cloudflare Worker integration for Framer projects, featuring direct deployment without manual imports and a Web Page component auto-deployer for zero-import integration.

## Overview

This repository contains a complete implementation of the Quantum-Spatial Design System with Cloudflare Worker integration for Framer. It includes:

- **Cloudflare Worker**: Serves design tokens and components from a centralized API
- **Auto-Deployer**: Zero-import integration using Framer's Web Page component
- **Direct Framer Integration**: Automatically deploy components and tokens to Framer without manual imports
- **Framer Components**: Ready-to-use React components with M4 optimizations
- **Demo Implementation**: Example implementation showcasing the design system

## Repository Structure

```
framer-cloudflare-demo/
├── cloudflare-worker/                 # Cloudflare Worker implementation
│   ├── services/                      # Worker services
│   │   ├── design-system.js           # Design system service
│   │   ├── framer-integration.js      # Legacy Framer integration
│   │   ├── framer-direct-integration.js # Direct Framer API integration
│   │   └── auto-deployer.js           # Web Page component auto-deployer
│   └── worker.js                      # Main worker entry point
├── framer-output/                     # Components ready for Framer import
│   ├── Button.tsx                     # Button component
│   ├── Card.tsx                       # Card component
│   ├── DashboardLayout.tsx            # Dashboard layout component
│   ├── DemoPage.tsx                   # Complete demo page
│   ├── QuantumSpatialProvider.tsx     # Core provider component
│   └── index.tsx                      # Component exports
├── scripts/                           # Utility scripts
│   ├── package-for-framer.js          # Package components for Framer
│   └── verify-deployment.js           # Verify deployments
├── framer-auto-deployer.html          # Auto-deployer HTML template
├── framer-cloudflare-demo.html        # Browser component demo
└── framer-direct-integration-test.html # Direct integration demo
```

## Deployment Status

The design system is deployed to the following endpoints:

- **Production**: [https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev](https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev)
- **Admin Interface**: [https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/admin](https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/admin)

## Getting Started

### Running the Demo

1. Open the component demo in your browser:
   ```bash
   open framer-cloudflare-demo.html
   ```

2. Open the direct integration demo:
   ```bash
   open framer-direct-integration-test.html
   ```

3. Explore the different design states and components.

### Deploying the Cloudflare Worker

1. Navigate to the cloudflare-worker directory:
   ```bash
   cd cloudflare-worker
   ```

2. Deploy to Cloudflare:
   ```bash
   wrangler deploy --env production
   ```

### Using the Auto-Deployer (Recommended)

Follow the instructions in [AUTO_DEPLOYER_GUIDE.md](AUTO_DEPLOYER_GUIDE.md) to use the Web Page component auto-deployer, which allows you to:

- Add the design system to Framer with zero manual imports
- Simply drag & drop a Web Page component and set the URL
- Get immediate access to all components and layouts
- Automatically detect and optimize for M4 devices

### Using the Direct Integration

Follow the instructions in [DIRECT_INTEGRATION_GUIDE.md](DIRECT_INTEGRATION_GUIDE.md) to use the direct Framer integration, which allows you to:

- Deploy design tokens directly to your Framer project
- Push components to Framer without manual imports
- Deploy the complete design system in one step
- Inject the design system into existing Framer projects

### Legacy Manual Import

For legacy manual import, follow the instructions in [FRAMER_IMPORT_GUIDE.md](FRAMER_IMPORT_GUIDE.md).

## Key Features

- **Web Page Auto-Deployer**: Zero-import integration using Framer's Web Page component
- **Direct Framer Integration**: Deploy design tokens, components, and layouts directly to Framer without manual imports
- **Auto-Detection**: Automatically detects device capabilities and optimizes for M4 processors
- **Multiple Design States**: Heritage, Transitional, Quantum, and Superposition states
- **Cloudflare Integration**: Fetches design tokens and components from Cloudflare Workers
- **Full Offline Fallbacks**: Works even when Cloudflare Worker is unreachable
- **Automated Component Generation**: Creates React components from design tokens
- **Layout Templates**: Ready-to-use layout templates for different scenarios
- **M4-Specific Optimizations**: Enhanced visuals and performance on Apple Silicon M4 devices

## API Reference

The Cloudflare Worker exposes the following endpoints:

### Design System Endpoints
- `/health`: Health check endpoint
- `/design-system/tokens?state={state}`: Get design tokens for a specific state
- `/tokens/{state}`: Alternative endpoint for design tokens
- `/design-system/components?state={state}`: Get components for a specific state

### Legacy Integration Endpoints
- `/framer-integration/direct-import?projectId={projectId}&state={state}`: Import components directly to Framer
- `/framer-integration/component-code?name={name}&state={state}`: Get code for a specific component
- `/framer-integration/available-components`: Get a list of available components

### Direct Integration Endpoints
- `/framer/deploy`: Deploy complete design system to Framer
- `/framer/tokens`: Deploy design tokens to Framer
- `/framer/components`: Deploy components to Framer
- `/framer/inject`: Inject design system into existing Framer project

### Auto-Deployer Endpoints
- `/auto-deployer`: Web Page component auto-deployer HTML interface
- `/framer/auto-deploy`: Auto-deployment API endpoint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

© 2025 9Bit Studios. All rights reserved.