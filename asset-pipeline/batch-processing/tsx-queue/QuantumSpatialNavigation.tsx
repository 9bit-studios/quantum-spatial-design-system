'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
}

interface QuantumSpatialNavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  variant?: 'horizontal' | 'vertical' | 'tab-bar';
  className?: string;
  logo?: React.ReactNode;
  quantum?: boolean;
}

/**
 * Apple HIG Compliant Quantum-Spatial Navigation Component
 * - Platform-appropriate navigation patterns
 * - 44px minimum touch targets
 * - Quantum-spatial glassmorphism for Petersen Games
 * - Supports hierarchical navigation
 * - Full accessibility and keyboard navigation
 */
export const QuantumSpatialNavigation: React.FC<QuantumSpatialNavigationProps> = ({
  items,
  activeItem,
  onItemClick,
  variant = 'horizontal',
  className,
  logo,
  quantum = true,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      onItemClick?.(item);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: NavigationItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    }
  };

  const NavigationItem: React.FC<{ 
    item: NavigationItem; 
    level?: number; 
    isLast?: boolean;
  }> = ({ item, level = 0, isLast = false }) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div className="relative">
        <motion.div
          className={cn(
            "relative flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-xl transition-all duration-200",
            "hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "cursor-pointer select-none",
            isActive && "bg-blue-600/30 text-blue-300",
            level > 0 && "ml-6 pl-6 border-l border-white/10"
          )}
          tabIndex={0}
          role="button"
          aria-expanded={hasChildren ? isExpanded : undefined}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute left-0 top-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              layoutId="activeIndicator"
            />
          )}

          {/* Icon */}
          {item.icon && (
            <div className="flex-shrink-0 w-5 h-5 text-current">
              {item.icon}
            </div>
          )}

          {/* Label */}
          <span className="flex-1 text-sm font-medium">
            {item.label}
          </span>

          {/* Badge */}
          {item.badge && (
            <motion.div
              className="flex-shrink-0 px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-full min-w-[20px] text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={item.badge}
            >
              {item.badge}
            </motion.div>
          )}

          {/* Expand/collapse arrow */}
          {hasChildren && (
            <motion.div
              className="flex-shrink-0 w-4 h-4 text-current"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 4l4 4-4 4V4z" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Submenu */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {item.children!.map((child, index) => (
                <NavigationItem
                  key={child.id}
                  item={child}
                  level={level + 1}
                  isLast={index === item.children!.length - 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const containerStyles = {
    horizontal: "flex items-center gap-1 p-2",
    vertical: "flex flex-col gap-1 p-4 w-64",
    'tab-bar': "flex items-center justify-around p-2 border-t border-white/10"
  };

  const quantumStyles = quantum ? {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: variant === 'horizontal' ? "1px solid rgba(255, 255, 255, 0.1)" : undefined,
    borderRight: variant === 'vertical' ? "1px solid rgba(255, 255, 255, 0.1)" : undefined,
  } : {};

  return (
    <motion.nav
      className={cn(
        "relative text-white",
        containerStyles[variant],
        variant === 'horizontal' && "sticky top-0 z-50",
        variant === 'vertical' && "h-screen overflow-y-auto",
        variant === 'tab-bar' && "fixed bottom-0 left-0 right-0 z-50",
        className
      )}
      style={quantumStyles}
      initial={{ opacity: 0, y: variant === 'tab-bar' ? 100 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      {/* Logo section for horizontal nav */}
      {variant === 'horizontal' && logo && (
        <div className="flex-shrink-0 mr-8">
          {logo}
        </div>
      )}

      {/* Navigation items */}
      <div className={cn(
        variant === 'horizontal' && "flex items-center gap-1 flex-1",
        variant === 'vertical' && "flex flex-col gap-1 flex-1",
        variant === 'tab-bar' && "flex items-center justify-around flex-1"
      )}>
        {items.map((item, index) => (
          <NavigationItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>

      {/* Quantum particle effects */}
      {quantum && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{ top: '20%', left: '10%' }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{ top: '60%', left: '80%' }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: 1
            }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60"
            style={{ top: '80%', left: '30%' }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: 2
            }}
          />
        </div>
      )}
    </motion.nav>
  );
};

export default QuantumSpatialNavigation;