/**
 * Core UI Components
 * Extracted from DesignSystemDemo.tsx
 * 
 * Pre-built, reusable components that use the design system.
 */

import React from 'react';
import { useDesignSystem } from './DesignSystemProvider';

// 6. PRE-BUILT COMPONENTS

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled,
  style = {},
  ...props 
}) => {
  const { styles } = useDesignSystem();
  
  const buttonStyle = {
    ...styles.button[variant],
    ...style,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = styles.button[variant].boxShadow.replace('0.2', '0.4');
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = styles.button[variant].boxShadow;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  children, 
  style = {},
  ...props 
}) => {
  const { styles } = useDesignSystem();
  
  return (
    <div 
      style={{ ...styles.card[variant], ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

// Container Component
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, style = {}, ...props }) => {
  const { styles } = useDesignSystem();
  
  return (
    <div 
      style={{ ...styles.layout.container, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

// Grid Component
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: string;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ 
  columns = 'repeat(auto-fit, minmax(300px, 1fr))', 
  children, 
  style = {},
  ...props 
}) => {
  const { styles } = useDesignSystem();
  
  return (
    <div 
      style={{ 
        ...styles.layout.grid, 
        gridTemplateColumns: columns,
        ...style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Flex Component
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  children: React.ReactNode;
}

export const Flex: React.FC<FlexProps> = ({ 
  direction = 'row', 
  align = 'center', 
  justify = 'flex-start',
  children, 
  style = {},
  ...props 
}) => {
  const { styles } = useDesignSystem();
  
  return (
    <div 
      style={{ 
        ...styles.layout.flex,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        ...style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};