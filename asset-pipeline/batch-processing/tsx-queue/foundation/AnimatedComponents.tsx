'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Card } from './GridSystem';

// Animated Components with Oil Slick Effects
// Based on excellent animation patterns from DashboardDesigns

export interface AnimatedFilterButtonProps {
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    count?: number;
    subcategories?: string[];
  }>;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export interface AnimatedProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    badge?: string;
    category?: string;
  };
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
}

export interface AnimatedSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

// Animated Category Filter with Quantum Effects
export const AnimatedCategoryFilter: React.FC<AnimatedFilterButtonProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className={`flex flex-wrap gap-4 justify-center items-center ${className}`}>
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const isHovered = hoveredCategory === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            onHoverStart={() => setHoveredCategory(category.id)}
            onHoverEnd={() => setHoveredCategory(null)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`tab-item-enhanced ${isActive ? 'active' : ''} relative overflow-hidden`}
          >
            {/* Sliding shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              {category.icon && <span>{category.icon}</span>}
              {category.name}
              {category.count !== undefined && (
                <motion.span 
                  className="bg-accent/20 text-accent px-2 py-1 rounded-md text-xs font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {category.count}
                </motion.span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

// Animated Product Card with Oil Slick Hover
export const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product.id);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`product-card-enhanced group cursor-pointer ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center text-white/50 text-4xl">
            🎮
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-lg text-xs font-semibold"
          >
            {product.badge}
          </motion.div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleQuickView}
            className="text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/30 transition-all duration-200"
          >
            Quick View
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="text-accent font-bold text-xl">
            ${product.price.toFixed(2)}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="btn-primary-glass px-4 py-2 text-sm"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Search Bar with Quantum Focus Effect
export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search products...',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="input-enhanced w-full pl-12 pr-16"
        />

        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        {/* Search Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-white rounded-lg px-3 py-2 text-sm font-medium"
        >
          Search
        </motion.button>

        {/* Focus Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isFocused ? 1 : 0, 
            scale: isFocused ? 1 : 0.8 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-400/20 rounded-2xl -z-10 blur-lg"
        />
      </div>
    </motion.form>
  );
};

// Page Transition Wrapper
export interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading Skeleton Component
export interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'button';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
  className = ''
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => {
    switch (type) {
      case 'card':
        return (
          <Card key={index} variant="glass" className={`animate-pulse ${className}`}>
            <div className="aspect-square bg-white/10 rounded-lg mb-4" />
            <div className="h-4 bg-white/10 rounded mb-2" />
            <div className="h-3 bg-white/10 rounded w-2/3" />
          </Card>
        );
      case 'text':
        return (
          <div key={index} className={`animate-pulse ${className}`}>
            <div className="h-4 bg-white/10 rounded mb-2" />
            <div className="h-3 bg-white/10 rounded w-3/4" />
          </div>
        );
      case 'button':
        return (
          <div key={index} className={`h-10 bg-white/10 rounded-lg animate-pulse ${className}`} />
        );
      default:
        return null;
    }
  });

  return <>{skeletons}</>;
};

// Intersection Observer Hook for Animations
export const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px -100px 0px' 
  });

  return { ref, isInView };
};