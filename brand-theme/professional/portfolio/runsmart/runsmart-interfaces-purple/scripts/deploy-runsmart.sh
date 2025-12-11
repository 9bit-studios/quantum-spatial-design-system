#!/bin/bash
# RunSmart Prototype - Cloudflare Pages Deployment
# Execute with Claude Code for rapid publishing

set -e

echo "🚀 RunSmart Prototype → Cloudflare Pages"
echo "========================================="
echo ""

# Step 1: Create project structure
echo "📁 Creating project directory..."
mkdir -p ~/Desktop/runsmart-prototype
cd ~/Desktop/runsmart-prototype

# Step 2: Copy prototype files
echo "📋 Organizing prototype files..."
# Claude Code will need to copy your HTML/CSS files here
# Expected structure:
# - runsmart-design-system.css
# - index.html (main entry)
# - dashboard.html
# - mobile-coach-dashboard.html
# - mobile-app-today.html
# - [other HTML pages]

# Step 3: Create minimal wrangler.toml for Pages
echo "⚙️  Creating Pages configuration..."
cat > wrangler.toml << 'EOF'
name = "runsmart-prototype"
compatibility_date = "2025-01-01"

# This is a static site deployment
# No build step needed - deploying HTML/CSS as-is
EOF

# Step 4: Create deployment package.json (optional but helpful)
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "runsmart-prototype",
  "version": "1.0.0",
  "description": "RunSmart Analytics Case Study - Interactive Prototype",
  "scripts": {
    "deploy": "wrangler pages deploy . --project-name=runsmart-prototype",
    "deploy:custom": "wrangler pages deploy . --project-name=runsmart-prototype --branch=main"
  },
  "author": "Penny Platt - 9Bit Studios",
  "license": "UNLICENSED"
}
EOF

# Step 5: Create README for future reference
echo "📝 Creating README..."
cat > README.md << 'EOF'
# RunSmart Prototype - Cloudflare Pages

Interactive HTML prototype for RunSmart Analytics case study.

## Live URL
Production: https://runsmart-prototype.pages.dev
Custom: https://runsmart.9bitstudios.io (if configured)

## Local Development
Open any HTML file in browser:
- `index.html` - Main landing page
- `dashboard.html` - Analytics dashboard view
- `mobile-coach-dashboard.html` - Mobile coach view
- `mobile-app-today.html` - Mobile app interface

## Deployment
```bash
npm run deploy
```

Or manually:
```bash
npx wrangler pages deploy . --project-name=runsmart-prototype
```

## Update Custom Domain
Cloudflare Dashboard > Pages > runsmart-prototype > Custom domains

## Assets
- CSS: Local file (runsmart-design-system.css)
- Images: Cloudinary CDN (external)
EOF

echo ""
echo "✅ Project structure ready!"
echo ""
echo "Next steps for Claude Code:"
echo "1. Copy all HTML files to ~/Desktop/runsmart-prototype/"
echo "2. Copy runsmart-design-system.css to ~/Desktop/runsmart-prototype/"
echo "3. Verify index.html exists (or create from best landing page)"
echo "4. Run: cd ~/Desktop/runsmart-prototype && npx wrangler pages deploy . --project-name=runsmart-prototype"
echo ""
