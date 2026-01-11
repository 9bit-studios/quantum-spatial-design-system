/**
 * VALIDATION SYSTEM
 * Apple HIG + Design System validation
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  higCompliance?: number;
}

export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return {
      valid: false,
      errors: [`${fieldName} is required`],
      warnings: []
    };
  }

  return { valid: true, errors: [], warnings: [] };
};

export const validateAppleHIGTouchTarget = (size: number): ValidationResult => {
  const minSize = 44; // Apple HIG minimum

  if (size < minSize) {
    return {
      valid: false,
      errors: [`Touch target size ${size}px is below Apple HIG minimum of 44px`],
      warnings: [],
      higCompliance: (size / minSize) * 100
    };
  }

  return { valid: true, errors: [], warnings: [], higCompliance: 100 };
};

export const validateTokenSystem = (tokens: any): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!tokens.colors) errors.push('Colors are required');
  if (!tokens.spacing) errors.push('Spacing is required');
  if (!tokens.typography) warnings.push('Typography recommended');

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
};
