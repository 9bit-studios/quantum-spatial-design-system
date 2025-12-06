#!/bin/bash

# ===================================================================
# Quantum Leap Suite - Skill Lister (No SDK Required)
# ===================================================================
# Lists available skills without Claude Agent SDK dependency
# Usage: ./list-skills.sh
# ===================================================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Quantum Leap Suite - Available Skills (No SDK)          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

SKILL_DIRS=(
    "svg-generation"
    "vision-pro-ui-kit"
    "design-system-automation"
    "hexecute-game"
    "brand-voice-validation"
    "strategic-planning"
    "m4-code-generator"
)

SUPPORT_DIRS=(
    "agents"
    "api-clients"
    "config"
    "foundation-resources"
)

echo -e "${YELLOW}Design & Generation Skills:${NC}"
echo ""

count=1
for skill in "${SKILL_DIRS[@]}"; do
    if [ -d "$skill" ]; then
        echo -e "${GREEN}$count. $skill${NC}"

        # Check for SKILL.md
        if [ -f "$skill/SKILL.md" ]; then
            echo -e "   ${BLUE}📄${NC} Documentation: SKILL.md"

            # Try to extract first heading
            first_heading=$(grep -m 1 "^# " "$skill/SKILL.md" | sed 's/^# //' 2>/dev/null)
            if [ -n "$first_heading" ]; then
                echo -e "   ${BLUE}📖${NC} $first_heading"
            fi
        else
            echo -e "   ⚠️  No SKILL.md found"
        fi

        # Check for README
        if [ -f "$skill/README.md" ]; then
            echo -e "   ${BLUE}📄${NC} Also has: README.md"
        fi

        echo ""
        ((count++))
    fi
done

echo -e "${YELLOW}Support & Infrastructure:${NC}"
echo ""

for dir in "${SUPPORT_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "  ${BLUE}•${NC} $dir/"
    fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}💡 To view skill details:${NC}"
echo -e "   cat <skill-directory>/SKILL.md"
echo ""
echo -e "${GREEN}💡 Integration Status:${NC}"
echo -e "   ✅ No Claude Agent SDK required"
echo -e "   ✅ Skills ready for pseudo-skill implementation"
echo -e "   ✅ Direct access to design system tokens"
echo -e "   ✅ Integrated into /design-system/apple-intelligence-agency/"
echo ""
