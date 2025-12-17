#!/bin/bash
# RunSmart Prototype - Cloudflare Pages Deployment
# Quick deployment script for ongoing development

set -e

PROJECT_DIR="/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/runsmart-interfaces-purple"

echo "🚀 RunSmart → Cloudflare Pages Deployment"
echo "=========================================="
echo ""

# Change to project directory
cd "$PROJECT_DIR"

# Check if wrangler is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npm/npx not found"
    echo "   Install Node.js first"
    exit 1
fi

# Optional: Run local test first
echo "🧪 Quick syntax check..."
if [ -f "index.html" ]; then
    echo "✅ index.html found"
else
    echo "⚠️  Warning: index.html not found (using first HTML file as entry)"
fi

if [ -f "assets/runsmart-design-system.css" ]; then
    echo "✅ Design system CSS found"
else
    echo "❌ Error: Design system CSS not found"
    exit 1
fi

echo ""
echo "📦 Deploying to Cloudflare Pages..."
echo ""

# Deploy to Cloudflare Pages
# Uses wrangler from node_modules
npx wrangler pages deploy . \
  --project-name=runsmart-prototype \
  --branch=production

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 Available URLs:"
echo "   Production: https://runsmart-prototype.pages.dev"
echo "   Custom (after DNS): https://runsmart.9bitstudios.io"
echo ""
echo "🔧 Next Steps:"
echo "   1. Test the live URL above"
echo "   2. Configure custom domain in Cloudflare Dashboard if desired"
echo "   3. Share in portfolio!"
echo ""
echo "💡 Quick Deploy Command:"
echo "   npm run deploy"
echo ""
