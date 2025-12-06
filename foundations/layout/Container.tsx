/**
 * CONTAINER COMPONENT
 * Responsive Container with Max-Width
 */

import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  padding?: boolean;
  className?: string;
}

const CONTAINER_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  centered = true,
  padding = true,
  className = '',
}) => {
  return (
    <div
      className={`container container--${size} ${className}`}
      style={{
        maxWidth: typeof CONTAINER_SIZES[size] === 'number' ? `${CONTAINER_SIZES[size]}px` : CONTAINER_SIZES[size],
        marginLeft: centered ? 'auto' : undefined,
        marginRight: centered ? 'auto' : undefined,
        paddingLeft: padding ? '24px' : undefined,
        paddingRight: padding ? '24px' : undefined,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
