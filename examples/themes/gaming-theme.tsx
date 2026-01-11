/**
 * REACT COMPONENT
 * Generated template with Apple HIG compliance
 */

import React from 'react';

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  'aria-label'?: string;
}

export const Component: React.FC<ComponentProps> = ({
  children,
  className = '',
  variant = 'primary',
  'aria-label': ariaLabel
}) => {
  return (
    <div
      className={`component component--${variant} ${className}`}
      aria-label={ariaLabel}
      style={{
        minHeight: '44px', // Apple HIG minimum touch target
        fontFamily: '-apple-system, SF Pro Display'
      }}
    >
      {children}
    </div>
  );
};

export default Component;
