#!/bin/bash

# Quick Fix: Create config directory and copy schema file
# Run this from your design-system root directory

AUTOMATION_PATH="automation/siri-automation-orchestrator"

echo "🔧 Creating missing directories..."

# Create directories
mkdir -p "$AUTOMATION_PATH/config"
mkdir -p "$AUTOMATION_PATH/scripts"

echo "✅ Directories created"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Copy design-system-registry-schema.json to:"
echo "   $AUTOMATION_PATH/config/"
echo ""
echo "2. Then run the setup script again:"
echo "   ./setup-quantum-spatial-notion-sync.sh"
echo ""
echo "Or follow the manual setup instructions below:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "MANUAL SETUP (if script continues to fail):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. I'll give you 2 files:"
echo "   - design-system-registry-schema.json"
echo "   - sync-components-to-notion.js"
echo ""
echo "2. Place them here:"
echo "   $AUTOMATION_PATH/config/design-system-registry-schema.json"
echo "   $AUTOMATION_PATH/scripts/sync-components-to-notion.js"
echo ""
echo "3. Create .env file:"
echo "   $AUTOMATION_PATH/.env"
echo ""
echo "   With contents:"
echo "   NOTION_API_KEY=your-key-here"
echo "   DESIGN_SYSTEM_DB_ID=your-db-id-here"
echo "   REPO_PATH=/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system"
echo ""
echo "4. Update package.json (add to scripts section):"
echo '   "sync:notion": "node automation/siri-automation-orchestrator/scripts/sync-components-to-notion.js",'
echo '   "sync:notion:install": "npm install @notionhq/client chokidar dotenv"'
echo ""
echo "5. Install and run:"
echo "   npm run sync:notion:install"
echo "   npm run sync:notion"
echo ""
