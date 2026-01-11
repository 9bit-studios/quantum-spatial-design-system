/**
 * GRID COMPONENT
 * Responsive Grid System - 8pt Base
 */

import React from 'react';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap = 16,
  rowGap,
  columnGap,
  className = '',
}) => {
  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    // Responsive columns handled via CSS
    return `repeat(${columns.md || 12}, 1fr)`;
  };

  return (
    <div
      className={`grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        rowGap: rowGap ? (typeof rowGap === 'number' ? `${rowGap}px` : rowGap) : undefined,
        columnGap: columnGap ? (typeof columnGap === 'number' ? `${columnGap}px` : columnGap) : undefined,
      }}
    >
      {children}
    </div>
  );
};

export interface GridItemProps {
  children: React.ReactNode;
  span?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  className = '',
}) => {
  const gridColumn = typeof span === 'number' ? `span ${span}` : `span ${span.md || 1}`;

  return (
    <div
      className={`grid-item ${className}`}
      style={{
        gridColumn,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
