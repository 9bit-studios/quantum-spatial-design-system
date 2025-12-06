/**
 * Modular UI Components
 * Extracted from DesignSystemDemo.tsx
 * 
 * Higher-level components that compose the core UI components.
 */

import React, { useState } from 'react';
import { useDesignSystem } from './DesignSystemProvider';

// 7. MODULAR UI COMPONENTS

// Navigation Component
export interface NavigationItem {
  id: string;
  label: string;
}

export interface NavigationProps {
  items?: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  items = [], 
  activeItem, 
  onItemClick 
}) => {
  const { tokens, utils } = useDesignSystem();
  
  return (
    <nav style={{
      display: 'flex',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      ...utils.glass(0.1),
      borderRadius: tokens.radius.lg,
    }}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item)}
          style={{
            background: activeItem === item.id 
              ? utils.gradient(tokens.colors.primary, tokens.colors.secondary)
              : 'transparent',
            border: 'none',
            borderRadius: tokens.radius.md,
            padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
            color: tokens.colors.text,
            fontWeight: activeItem === item.id ? '600' : '400',
            cursor: 'pointer',
            transition: `all ${tokens.animation.medium}`,
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

// Carousel Component
export interface CarouselProps<T> {
  items?: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function Carousel<T>({ items = [], renderItem }: CarouselProps<T>) {
  const { tokens } = useDesignSystem();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
    }}>
      <div style={{
        display: 'flex',
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: `transform ${tokens.animation.medium} ${tokens.animation.easing}`,
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ minWidth: '100%' }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {items.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: tokens.spacing.md,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: tokens.spacing.sm,
        }}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: currentIndex === index 
                  ? tokens.colors.primary 
                  : tokens.colors.glass,
                cursor: 'pointer',
                transition: `all ${tokens.animation.fast}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Component
export interface FilterCategory {
  id: string;
  label: string;
}

export interface FilterProps {
  categories?: FilterCategory[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ 
  categories = [], 
  activeCategory, 
  onCategoryChange,
  searchValue = '',
  onSearchChange 
}) => {
  const { tokens, utils } = useDesignSystem();
  
  return (
    <div style={{
      ...utils.glass(0.1),
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
    }}>
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        style={{
          width: '100%',
          background: utils.glass(0.05).background,
          border: `1px solid ${tokens.colors.glassBorder}`,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          color: tokens.colors.text,
          fontSize: tokens.typography.body.size,
          marginBottom: tokens.spacing.md,
          outline: 'none',
        }}
      />
      
      {/* Categories */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: tokens.spacing.sm,
      }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange?.(category.id)}
            style={{
              background: activeCategory === category.id
                ? utils.gradient(tokens.colors.primary, tokens.colors.secondary)
                : utils.glass(0.05).background,
              border: `1px solid ${
                activeCategory === category.id 
                  ? tokens.colors.primary 
                  : tokens.colors.glassBorder
              }`,
              borderRadius: tokens.radius.md,
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              color: tokens.colors.text,
              fontWeight: activeCategory === category.id ? '600' : '400',
              cursor: 'pointer',
              transition: `all ${tokens.animation.medium}`,
            }}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};