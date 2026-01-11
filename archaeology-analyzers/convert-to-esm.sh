#!/bin/bash

# COMMONJS → ES MODULE CONVERTER - Quick Start
# Batch convert JavaScript files to ES Modules

set -e

cd "$(dirname "$0")/.."

echo "🔄 CommonJS → ES Module Converter"
echo "=================================="
echo ""

# Check if dry-run flag is passed
if [[ "$1" == "--dry-run" ]]; then
    echo "👀 DRY RUN MODE - Preview changes without modifying files"
    echo ""
    node scripts/convert-to-esm.mjs --dry-run
elif [[ "$1" == "--rename" ]]; then
    echo "⚠️  This will convert AND rename .js files to .mjs"
    echo "   Press Ctrl+C to cancel, or Enter to continue..."
    read
    echo ""
    echo "🚀 Converting and renaming files..."
    echo ""
    node scripts/convert-to-esm.mjs --rename
else
    echo "⚠️  This will modify JavaScript files in your project"
    echo "   Press Ctrl+C to cancel, or Enter to continue..."
    read
    echo ""
    echo "🚀 Converting to ES Modules..."
    echo ""
    node scripts/convert-to-esm.mjs
fi

echo ""
echo "=================================================="
echo "✅ Done!"
echo ""
echo "Usage:"
echo "  ./convert-to-esm.sh              # Convert files (keep .js)"
echo "  ./convert-to-esm.sh --dry-run    # Preview changes only"
echo "  ./convert-to-esm.sh --rename     # Convert AND rename to .mjs"
echo ""
echo "📝 Don't forget to add to package.json:"
echo '   "type": "module"'
echo ""
