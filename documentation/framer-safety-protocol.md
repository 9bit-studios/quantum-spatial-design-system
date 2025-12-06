# Framer Project Safety Protocol

**Status:** ACTIVE
**Last Updated:** 2025-11-18
**Authority Level:** CRITICAL

## 🚨 IMMEDIATE SAFETY MEASURES 🚨

### Path Protection Rules

**ALL operations in the following path are RESTRICTED:**
```
/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/framer/**
```

### Prohibited Operations

❌ **NEVER** run `npm install` or any package manager commands in Framer directories
❌ **NEVER** execute `.js` or `.ts` files directly from Framer directories
❌ **NEVER** create `node_modules` folders in Framer directories
❌ **NEVER** modify `package.json` files in Framer directories
❌ **NEVER** run build scripts from Framer directories

### Safe Operations (READ-ONLY)

✅ **READ files** for reference and color extraction
✅ **ANALYZE** TypeScript components for structure
✅ **EXTRACT** color values and design tokens
✅ **REFERENCE** component patterns

---

## Error Handling Protocol

### Safety Wrapper Function

```typescript
function safeFramerOperation<T>(
  operation: () => T,
  path: string
): T | null {
  // Check if path contains Framer directory
  const FRAMER_PATHS = [
    '/framer/',
    '/FramerCloudflare/',
    'framer-output/',
    'framer-cloudflare-sync/'
  ];

  const isFramerPath = FRAMER_PATHS.some(p => path.includes(p));

  if (isFramerPath) {
    console.error(`🚨 BLOCKED: Operation attempted on Framer path: ${path}`);
    console.error('Framer directories are READ-ONLY for safety.');
    return null;
  }

  try {
    return operation();
  } catch (error) {
    console.error(`Error in operation: ${error}`);
    return null;
  }
}
```

### Path Validation

```typescript
function validatePath(filePath: string): {
  isValid: boolean;
  isSafe: boolean;
  reason?: string;
} {
  const UNSAFE_PATTERNS = [
    /node_modules/,
    /package\.json$/,
    /\.npmrc$/,
    /\.yarnrc$/,
    /package-lock\.json$/,
    /yarn\.lock$/,
  ];

  const FRAMER_PATTERNS = [
    /\/framer\//,
    /\/FramerCloudflare\//,
    /framer-output/,
    /framer-cloudflare-sync/,
  ];

  // Check for framer paths
  const isFramerPath = FRAMER_PATTERNS.some(pattern => pattern.test(filePath));

  // Check for unsafe patterns
  const hasUnsafePattern = UNSAFE_PATTERNS.some(pattern => pattern.test(filePath));

  if (isFramerPath && hasUnsafePattern) {
    return {
      isValid: false,
      isSafe: false,
      reason: 'Framer path with package management files detected'
    };
  }

  if (isFramerPath) {
    return {
      isValid: true,
      isSafe: true,
      reason: 'Framer path - READ-ONLY mode'
    };
  }

  return {
    isValid: true,
    isSafe: true
  };
}
```

---

## Deprecation Issues in Framer Project

### Known Deprecated Code

1. **React Patterns**
   - Old Context API usage
   - Class components (should be hooks)
   - Deprecated lifecycle methods

2. **CommonJS Modules**
   - `require()` statements
   - `module.exports` syntax
   - Should be ES6 `import/export`

3. **Environment Variables**
   - Old `.env` file format
   - Missing validation
   - No type safety

### Color System Issues

#### Problems Identified:
```typescript
// ❌ OLD FRAMER COLORS (INCORRECT)
colors: {
  primary: "#131A36",  // Too light
  secondary: "#666666", // Generic gray
  accent: "#888888",   // Another generic gray
}
```

#### Solution (Use Source of Truth):
```typescript
// ✅ SOURCE OF TRUTH COLORS
colors: {
  voidBlack: "#000000",
  deepSpaceIndigo: "#0A0A0F",
  ultraIndigo: "#15151D",
  dimensionalEggplant: "#331F4A",
  subtleCyan: "#5AC8FA",
  roseEnergy: "#BF4080",
  // ... (see updated style guide)
}
```

---

## Color Theme Migration Plan

### Phase 1: Analysis (Current State)
**Status:** ✅ COMPLETE

Identified components needing color updates:
- `QuantumSpatialProvider.tsx` - Fallback tokens
- `Button.tsx` - Component styling
- `Card.tsx` - Surface colors
- `DashboardLayout.tsx` - Background gradients

### Phase 2: Token Extraction (Current State)
**Status:** 🔄 IN PROGRESS

Extract correct colors from:
- ✅ `/tokens/brand/quantumspatial-tokens.css`
- ✅ `/tokens/brand/framer-buttons.css`
- ✅ `/fresh-glass-theme/tokens/variables-colors.css`

### Phase 3: Update QuantumSpatialProvider
**Status:** ⏳ PENDING

Replace fallback tokens with source of truth colors.

### Phase 4: Staged HTML Design System
**Status:** ⏳ PENDING

Build HTML prototypes with correct colors:
1. Color palette showcase
2. Component variations
3. State demonstrations
4. Gradient systems

### Phase 5: Component Updates
**Status:** ⏳ PENDING

Update Framer components (CREATE NEW VERSIONS):
- Copy to new location outside `/framer/`
- Apply source of truth colors
- Test in isolation
- Validate against HIG

---

## Implementation Strategy

### DO NOT Modify Framer Files Directly

Instead, follow this workflow:

1. **Read** Framer file for structure
2. **Extract** component logic
3. **Create NEW file** outside Framer directory
4. **Apply** source of truth colors
5. **Test** new component
6. **Validate** against HIG standards

### Directory Structure for New Components

```
quantum-spatial/design-system/
├── components/          # NEW safe components
│   ├── quantum-buttons/
│   ├── quantum-cards/
│   └── quantum-layouts/
├── tokens/             # Source of truth
│   ├── brand/
│   ├── core/
│   └── themes/
└── framer/            # READ-ONLY (deprecated)
    └── FramerCloudflare/
```

---

## Automated Safety Checks

### Pre-Operation Validation

```typescript
async function safeFileOperation(
  operation: 'read' | 'write' | 'execute',
  filePath: string
): Promise<boolean> {
  const validation = validatePath(filePath);

  if (!validation.isValid) {
    throw new Error(`Invalid path: ${validation.reason}`);
  }

  if (!validation.isSafe) {
    throw new Error(`Unsafe path: ${validation.reason}`);
  }

  const isFramerPath = filePath.includes('/framer/');

  if (isFramerPath && operation !== 'read') {
    throw new Error(
      `Operation '${operation}' not allowed on Framer path. ` +
      `Framer directories are READ-ONLY.`
    );
  }

  return true;
}
```

---

## Emergency Procedures

### If Accidental Modification Occurs

1. **STOP** all operations immediately
2. **DO NOT** run `git commit`
3. **Review** `git status` to see changes
4. **Revert** using `git restore <file>`
5. **Document** what happened
6. **Update** this protocol if needed

### If Package Installation Triggered

1. **STOP** the process (Ctrl+C)
2. **DELETE** any generated `node_modules` folders
3. **DELETE** any generated lock files
4. **Verify** no system changes occurred
5. **Document** the incident

---

## Monitoring & Logging

### File Access Logging

```typescript
function logFileAccess(
  operation: string,
  filePath: string,
  success: boolean
) {
  const timestamp = new Date().toISOString();
  const isFramerPath = filePath.includes('/framer/');

  console.log({
    timestamp,
    operation,
    filePath,
    success,
    isFramerPath,
    safetyProtocol: 'ACTIVE'
  });
}
```

---

## Summary

✅ **Framer directories:** READ-ONLY
✅ **No package operations:** Ever
✅ **No direct execution:** Of Framer scripts
✅ **Safe extraction:** Colors and patterns only
✅ **New components:** Created outside Framer paths
✅ **Source of truth:** Updated style guide colors

**This protocol ensures:**
- No accidental dependency installation
- No execution of deprecated code
- Safe color extraction for migration
- Proper isolation of new components
- HIG-compliant development workflow

---

© 2025 9Bit Studios
**SAFETY PROTOCOL STATUS:** ACTIVE AND ENFORCED
