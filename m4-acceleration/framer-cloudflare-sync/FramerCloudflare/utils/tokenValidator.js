/**
 * Token Validator
 * 
 * Validates design tokens fetched from Cloudflare Workers to ensure
 * they match the expected schema and contain all required properties.
 * This helps prevent runtime errors from malformed or incomplete tokens.
 */

// Required token structure for each design state
const TOKEN_SCHEMA = {
  colors: {
    required: ['primary', 'secondary', 'accent', 'text', 'background', 'surface'],
    optional: ['rose', 'teal', 'quantum', 'success', 'warning', 'error', 'energy']
  },
  typography: {
    required: ['fontFamily'],
    optional: ['baseSize', 'scale', 'headings', 'body']
  },
  spacing: {
    required: ['xs', 'sm', 'md', 'lg', 'xl'],
    optional: ['2xs', '3xs', '2xl', '3xl', '4xl', 'unit', 'grid', 'scale']
  },
  borderRadius: {
    required: [],
    optional: ['none', 'xs', 'small', 'medium', 'large', 'xl', 'pill', 'circle']
  },
  shadows: {
    required: [],
    optional: ['none', 'xs', 'small', 'medium', 'large', 'xl', 'inner', 'glow']
  },
  motion: {
    required: [],
    optional: ['duration', 'easing']
  },
  effects: {
    required: [],
    optional: ['dimensional', 'animations', 'depth', 'particles']
  },
  quantum: {
    required: [],
    optional: ['pixelDensity', 'energyStates', 'dimensionGrid', 'transitions', 'filters']
  },
  m4: {
    required: [],
    optional: ['optimizations', 'rendering', 'neural']
  }
};

// Minimum required tokens for a valid design state
const REQUIRED_CATEGORIES = ['colors', 'typography', 'spacing'];

/**
 * Validates tokens against the schema
 * @param {Object} tokens - The tokens to validate
 * @returns {Object} Validation result with isValid and errors
 */
function validateTokens(tokens) {
  const errors = [];
  let isValid = true;
  
  // Check if tokens exist
  if (!tokens) {
    return { isValid: false, errors: ['Tokens object is null or undefined'] };
  }
  
  // Validate required categories
  for (const category of REQUIRED_CATEGORIES) {
    if (!tokens[category]) {
      errors.push(`Missing required category: ${category}`);
      isValid = false;
    }
  }
  
  // Validate each category against schema
  for (const [category, schema] of Object.entries(TOKEN_SCHEMA)) {
    if (tokens[category]) {
      // Check required properties
      for (const required of schema.required) {
        if (!tokens[category][required]) {
          errors.push(`Missing required property: ${category}.${required}`);
          isValid = false;
        }
      }
    }
  }
  
  return { isValid, errors };
}

/**
 * Merges fallback tokens with partial tokens to ensure all required fields exist
 * @param {Object} tokens - The tokens to complete
 * @param {Object} fallbackTokens - The fallback tokens to use for missing properties
 * @returns {Object} Complete tokens
 */
function completeTokens(tokens, fallbackTokens) {
  if (!tokens) return fallbackTokens;
  
  const result = { ...tokens };
  
  // Fill in missing categories from fallback
  for (const category of REQUIRED_CATEGORIES) {
    if (!result[category] && fallbackTokens[category]) {
      result[category] = { ...fallbackTokens[category] };
    }
  }
  
  // Fill in missing required properties in each category
  for (const [category, schema] of Object.entries(TOKEN_SCHEMA)) {
    if (result[category] && fallbackTokens[category]) {
      for (const required of schema.required) {
        if (!result[category][required] && fallbackTokens[category][required]) {
          result[category][required] = fallbackTokens[category][required];
        }
      }
    }
  }
  
  return result;
}

/**
 * Verifies a token set for all states and ensures they are complete
 * @param {Object} tokenSet - All token states to verify
 * @param {Object} fallbackTokens - Fallback tokens to use for missing properties
 * @returns {Object} Verified and completed tokens
 */
function verifyTokenSet(tokenSet, fallbackTokens) {
  const result = {};
  const stateValidations = {};
  
  // Check each design state
  for (const [state, tokens] of Object.entries(tokenSet)) {
    // Validate the tokens
    const validation = validateTokens(tokens);
    stateValidations[state] = validation;
    
    // Complete the tokens if needed
    const fallbackForState = fallbackTokens[state] || fallbackTokens.quantum;
    result[state] = validation.isValid
      ? tokens
      : completeTokens(tokens, fallbackForState);
  }
  
  // Log validation results
  if (Object.values(stateValidations).some(v => !v.isValid)) {
    console.warn('Token validation issues detected:', stateValidations);
  }
  
  return result;
}

/**
 * Processes a complex token to a simple CSS-compatible value
 * @param {any} value - The token value to process
 * @param {string} defaultValue - Default value if processing fails
 * @returns {string} Processed value
 */
function processCssTokenValue(value, defaultValue = '') {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  // Handle different value types
  if (typeof value === 'object') {
    // If it has dark/light variants, use the appropriate one
    if (value.dark && value.light) {
      // Check for dark mode preference (simplified)
      const prefersDarkMode = 
        typeof window !== 'undefined' && 
        window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
        
      return prefersDarkMode ? value.dark : value.light;
    }
    
    // Otherwise, stringify the object
    return JSON.stringify(value);
  }
  
  return String(value);
}

/**
 * Creates a set of CSS variables from tokens
 * @param {Object} tokens - The tokens to convert to CSS variables
 * @returns {Object} CSS variable strings
 */
function tokensToCssVariables(tokens) {
  const cssVars = {};
  
  // Process each token category
  for (const [category, values] of Object.entries(tokens)) {
    // Skip complex objects that shouldn't be CSS variables
    if (['effects', 'm4', 'quantum'].includes(category)) continue;
    
    // Process flat token categories
    if (typeof values === 'object') {
      for (const [key, value] of Object.entries(values)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Handle nested objects
          for (const [subKey, subValue] of Object.entries(value)) {
            cssVars[`--${category}-${key}-${subKey}`] = processCssTokenValue(subValue);
          }
        } else {
          // Handle flat values
          cssVars[`--${category}-${key}`] = processCssTokenValue(value);
        }
      }
    }
  }
  
  return cssVars;
}

// Export functions
export {
  validateTokens,
  completeTokens,
  verifyTokenSet,
  tokensToCssVariables,
  TOKEN_SCHEMA,
  REQUIRED_CATEGORIES
};