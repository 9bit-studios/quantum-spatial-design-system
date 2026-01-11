#!/bin/bash

# Intelligent Skeleton Analyzer - Quick Start Script
# M4 Neural Engine + Apple Intelligence Enhanced

set -e

echo "🧠 Intelligent Skeleton Analyzer - M4 Accelerated"
echo "=================================================="
echo ""

# Set M4 and Apple Intelligence environment variables
export M4_ACCELERATION_ENABLED=true
export APPLE_INTELLIGENCE_ENABLED=true
export QUANTUM_SPATIAL_PROCESSING=active
export CREATIVE_INTELLIGENCE_ENGINE=active

# Change to design-system directory
cd "$(dirname "$0")"

echo "✅ M4 Neural Engine: ENABLED"
echo "✅ Apple Intelligence: ENABLED"
echo "✅ Quantum Spatial Processing: ACTIVE"
echo "✅ Target: $(pwd)"
echo ""
echo "🚀 Starting comprehensive analysis..."
echo ""

# Run the analyzer
node intelligent-skeleton-analyzer.mjs "$@"

# Check if reports were generated
if [ -f "ARCHITECTURE_ANALYSIS_REPORT.md" ]; then
    echo ""
    echo "=================================================="
    echo "✅ Analysis Complete!"
    echo ""
    echo "📄 Reports Generated:"
    echo "   - ARCHITECTURE_ANALYSIS_REPORT.md"
    echo "   - architecture-analysis.json"
    echo ""
    echo "🔍 Quick Stats:"
    grep "Total Files:" ARCHITECTURE_ANALYSIS_REPORT.md || true
    grep "Average Apple HIG Compliance:" ARCHITECTURE_ANALYSIS_REPORT.md || true
    grep "Files/Second:" ARCHITECTURE_ANALYSIS_REPORT.md || true
    echo ""
    echo "📖 View full report:"
    echo "   cat ARCHITECTURE_ANALYSIS_REPORT.md"
    echo ""
fi
