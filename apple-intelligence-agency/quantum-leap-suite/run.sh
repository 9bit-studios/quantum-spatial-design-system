#!/bin/bash

# Quantum Leap Suite Runner
# Bypasses parent tsconfig issues by using absolute paths with tsx

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$1" ]; then
  echo "Usage: ./run.sh <script-name.ts>"
  echo ""
  echo "Available scripts:"
  echo "  - list-skills.ts"
  echo "  - agent-skill-registry.ts"
  echo "  - example-usage.ts"
  echo "  - AppleIntelligenceStrategicDirectorCoordinator.js"
  echo "  - agents/agent-coordinator.ts"
  echo "  - agents/content-acceleration-workflow.ts"
  echo "  - agents/strategic-director-orchestrator.ts"
  exit 1
fi

SCRIPT_NAME="$1"

# CRITICAL: Use absolute path to bypass parent tsconfig path mapping issues
ABSOLUTE_SCRIPT_PATH="$SCRIPT_DIR/$SCRIPT_NAME"

if [ ! -f "$ABSOLUTE_SCRIPT_PATH" ]; then
  echo "❌ Script not found: $ABSOLUTE_SCRIPT_PATH"
  exit 1
fi

echo "🚀 Running: $SCRIPT_NAME"
echo "📁 Path: $ABSOLUTE_SCRIPT_PATH"
echo ""

npx tsx "$ABSOLUTE_SCRIPT_PATH"
