#!/bin/bash

# APPLE FONT CONVERTER - Quick Start
# Convert all fonts to Apple SF Pro family

set -e

cd "$(dirname "$0")/.."

echo "🍎 Apple Font Converter"
echo "======================="
echo ""

# Check if dry-run flag is passed
if [[ "$1" == "--dry-run" ]]; then
    echo "👀 DRY RUN MODE - Preview changes without modifying files"
    echo ""
    node scripts/convert-to-apple-fonts.mjs --all --dry-run
else
    echo "⚠️  This will modify files in your design system"
    echo "   Press Ctrl+C to cancel, or Enter to continue..."
    read

    echo ""
    echo "🚀 Converting fonts to Apple SF Pro..."
    echo ""
    node scripts/convert-to-apple-fonts.mjs --all
fi

echo ""
echo "=================================================="
echo "✅ Done!"
echo ""
echo "Usage:"
echo "  ./convert-fonts.sh              # Convert all files"
echo "  ./convert-fonts.sh --dry-run    # Preview changes only"
echo ""
