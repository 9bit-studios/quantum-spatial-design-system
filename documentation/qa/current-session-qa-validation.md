# Current Session QA Validation & Sources of Truth

**Session Date**: June 14, 2025  
**Authority Level**: PRIMARY SESSION VALIDATION  
**Context**: Petersen Games 48-Hour Launch with Quantum-Spatial Integration

---

## 🎯 ACTIVE PROJECT STATUS (CURRENT TRUTH)

### **✅ CURRENT ACTIVE PROJECT**
**Project**: `/petersen-portal/`  
**Status**: ACTIVE DEVELOPMENT - 48-hour launch timeline  
**Framework**: Next.js 15.3.3 + npm + turbo  
**Integration**: Quantum-Spatial Design System rehabilitation  
**Vercel**: `petersen-portal.vercel.app` (Project ID: prj_MrjJxkMUMPn3FmXFsROl8savQi6O)

### **🔧 QUANTUM-SPATIAL DESIGN SYSTEM**
**Project**: `/Claude-Quantum-Design-Framework/quantum-spatial-design-system/`  
**Status**: REHABILITATION IN PROGRESS  
**Approach**: Clean existing system + re-establish git + integrate with petersen-portal  
**Priority**: Preserve sophisticated eCommerce Edition components

### **🗄️ DEPRECATED (DO NOT USE)**
- `/petersen-games/shopify-unified/` - **DEPRECATED**
- `/petersen-games-clean/` - **ARCHIVED**
- Commerce template approaches - **AVOIDED**
- Previous Vercel deployments with corruption - **DEPRECATED**

---

## 🔒 QA VALIDATION SOURCES OF TRUTH

### **PRIMARY AUTHORITY ROUTES**

#### 1. **Sources-of-Truth Authentication**
**Route**: `/apple-intelligence/foundation/sources-of-truth/`  
**Authority**: PRIMARY  
**Documents**:
- `enhanced-qa-validation-framework.md` ✅ ACTIVE
- `CLAUDE.md` ✅ ACTIVE  
- `project-transition-log.md` ✅ ACTIVE

#### 2. **Technical Standards Validation**
**Route**: `/Apple-Intelligence-Strategic-Director/validation/`  
**Authority**: ENHANCED QA FRAMEWORK  
**Focus**: Apple HIG compliance, TypeScript validation, inline CSS prevention

#### 3. **Cross-Project Integration Validation**
**Route**: `/apple-intelligence/foundation/validated-foundations/qa-validation/`  
**Authority**: OPERATIONAL PROCEDURES  
**Focus**: Build success, design system integration, cross-project consistency

---

## 🚨 CRITICAL QA REQUIREMENTS (MANDATORY)

### **1. TypeScript Compliance Validation**
```bash
# REQUIRED: Zero build errors
cd /petersen-portal/
npm build  # Must succeed with zero errors
npm lint   # Must pass without warnings
```

### **2. Inline CSS Prevention Protocol**
```bash
# AUTOMATED DETECTION (ZERO TOLERANCE)
rg 'style\s*=\s*\{' --type typescript --type tsx /petersen-portal/
rg 'style\s*=\s*"' --type typescript --type tsx /petersen-portal/

# ANY matches = IMMEDIATE FAILURE
```

### **3. Apple HIG Compliance**
```bash
# Typography validation
rg "font-family.*(?!SF Pro)" --type css /petersen-portal/

# Touch target validation (48px minimum)
rg "min-h-\[4[0-7]px\]" --type typescript --type tsx /petersen-portal/

# Accessibility validation
rg "aria-" --type typescript --type tsx /petersen-portal/
```

### **4. Design System Token Usage**
```bash
# Validate component-based styling
rg "className.*quantum-" /petersen-portal/
rg "bg-\[.*\]" /petersen-portal/ | grep -v "tokens\."  # Should be minimal

# Check for hard-coded colors (discouraged)
rg "#[0-9a-fA-F]{6}" /petersen-portal/ | grep -v "design-tokens"
```

---

## 📋 FRAMEWORK PRESETS (VERCEL COMPLIANCE)

### **Required Configuration**
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

### **Environment Validation**
```bash
# Required environment variables
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=petersengames.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=[required]
NEXT_PUBLIC_SITE_NAME="Petersen Games"
COMPANY_NAME="Petersen Games"

# Forbidden variables (contamination check)
# TWITTER_CREATOR - MUST NOT BE PRESENT
# google-fonts references - MUST NOT BE PRESENT
# @next/commerce imports - MUST NOT BE PRESENT
```

---

## 🔄 VALIDATION WORKFLOW

### **Pre-Implementation Validation**
1. **Sources Authentication**: Validate against `/sources-of-truth/` first
2. **Technical Standards**: Apple HIG compliance check
3. **Framework Validation**: Next.js 15.3.3 + npm presets
4. **Environment Clean**: No Google/Twitter/Commerce contamination

### **Implementation Validation**
1. **Build Success**: `npm build` completes without errors
2. **TypeScript Compliance**: Zero type errors
3. **Inline CSS Check**: Zero inline styling detected
4. **Component Usage**: Design system token compliance

### **Post-Implementation Validation**
1. **Integration Test**: Quantum-Spatial components working
2. **Performance Check**: Lighthouse score >90
3. **Mobile Validation**: Apple HIG touch targets
4. **Deployment Ready**: Vercel configuration correct

---

## 🚀 INTEGRATION STRATEGY

### **Phase 1: Petersen Portal Cleanup**
```bash
# Remove contamination
cd /petersen-portal/
# Clean Google/Twitter/Commerce references
# Update to correct framework presets
# Validate environment variables
```

### **Phase 2: Quantum-Spatial Rehabilitation**  
```bash
# Restore design system
cd /Claude-Quantum-Design-Framework/quantum-spatial-design-system/
# Re-establish git
# Install correct dependencies  
# Validate eCommerce components
```

### **Phase 3: Integration Setup**
```bash
# Connect systems
# Copy/symlink Quantum-Spatial components to petersen-portal
# Create integration provider
# Test combined build
```

### **Phase 4: Production Deployment**
```bash
# Final validation
# Deploy to staging
# Performance testing
# Production launch
```

---

## ⚠️ DEPRECATED SCRIPTS & ROUTES (AVOID)

### **DO NOT USE**
- Any scripts referencing `/petersen-games/shopify-unified/`
- Commerce template setup approaches
- Google Fonts or Twitter integration scripts
- Old Vercel deployment configurations
- Previous Claude Code scripts for deprecated projects

### **USE INSTEAD**
- Fresh Next.js approach with clean dependencies
- Quantum-Spatial Design System rehabilitation
- Direct Shopify Storefront API integration
- Component-based styling with design tokens

---

## 🎯 SUCCESS CRITERIA (48-HOUR TIMELINE)

### **Day 1: Foundation**
- [ ] Petersen Portal cleaned and building
- [ ] Quantum-Spatial system rehabilitated
- [ ] Integration provider created
- [ ] Basic Shopify connection working

### **Day 2: Launch Ready**
- [ ] All components integrated
- [ ] Performance optimized
- [ ] QA validation passed
- [ ] Production deployment successful

### **Quality Gates**
- [ ] Zero TypeScript build errors
- [ ] Zero inline CSS violations  
- [ ] Apple HIG compliance maintained
- [ ] Design system tokens used consistently
- [ ] Performance score >90 on Lighthouse

---

**Authority Declaration**: This document serves as the PRIMARY AUTHORITY for current session validation. All development activities must reference these routes and requirements.

**Validation Status**: ✅ Current routes established | ✅ QA framework active | ✅ Integration strategy defined

---

*Session-specific validation framework ensuring clean 48-hour launch timeline while maintaining quality standards.*