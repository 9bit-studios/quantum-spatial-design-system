'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Flex } from './GridSystem';

// Modern Navigation System - Oil Slick Dark Mode with Apple Buttons
// Based on excellent patterns from DashboardDesigns

export interface NavigationProps {
  children?: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export interface MegaDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterBarProps {
  activeFilters: Array<{ id: string; label: string }>;
  onFilterRemove: (filterId: string) => void;
  onFilterOpen: () => void;
  onSortChange: (sort: string) => void;
  resultCount?: number;
}

// Navigation Component with Oil Slick Backdrop
export const ModernNavigation: React.FC<NavigationProps> = ({
  children,
  currentPage = 'home',
  onPageChange
}) => {
  const [isMegaDropdownOpen, setIsMegaDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (page: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
    setIsMegaDropdownOpen(false);
  };

  return (
    <nav className="nav-enhanced">
      <Container>
        <Flex direction="row" justify="between" align="center" className="py-4">
          {/* Brand Section */}
          <Flex direction="row" align="center" gap="lg">
            <button
              onClick={() => handleNavigation('home')}
              className="text-xl font-bold text-primary hover:text-accent transition-colors duration-200"
            >
              Petersen Games
            </button>
            
            {/* Mega Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsMegaDropdownOpen(!isMegaDropdownOpen)}
                className="dropdown-toggle flex items-center gap-3 bg-glass-deep-indigo border border-white/10 rounded-xl px-5 py-3 text-white hover:bg-glass-cosmic-purple hover:border-white/20 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
                <span className="font-medium">Browse Games</span>
                <motion.svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  animate={{ rotate: isMegaDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </motion.svg>
              </button>

              {/* Mega Dropdown */}
              <MegaDropdown 
                isOpen={isMegaDropdownOpen}
                onClose={() => setIsMegaDropdownOpen(false)}
              />
            </div>
          </Flex>

          {/* Action Buttons */}
          <Flex direction="row" gap="sm">
            <button className="nav-action">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            
            <button className="nav-action relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1z"/>
              </svg>
              <span className="cart-count">0</span>
            </button>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

// Mega Dropdown Component
export const MegaDropdown: React.FC<MegaDropdownProps> = ({ isOpen, onClose }) => {
  const gameLines = [
    { name: 'Cthulhu Wars', icon: '🐙', featured: true },
    { name: 'Planet Apocalypse', icon: '🌍' },
    { name: 'Hyperspace', icon: '🦄' },
    { name: 'Evil High Priest', icon: '⚡' },
    { name: 'Orcs Must Die', icon: '⚔️' },
    { name: 'The Gods War', icon: '⚡' }
  ];

  const productTypes = [
    'Core Games',
    'Expansions', 
    'Faction Packs',
    'Miniatures',
    'Deluxe Components',
    'Accessories',
    'RPG Materials'
  ];

  const specialCollections = [
    { name: 'New Releases', icon: '🆕' },
    { name: 'On Sale', icon: '🔥' },
    { name: 'Pre-Orders', icon: '📦' },
    { name: 'Limited Edition', icon: '⭐' },
    { name: 'Bundle Deals', icon: '🎁' },
    { name: 'Gift Cards', icon: '💳' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mega-dropdown') && !target.closest('.dropdown-toggle')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mega-dropdown absolute top-full left-0 mt-3 min-w-[650px] bg-glass-cosmic-purple backdrop-blur-[40px] border border-white/15 rounded-2xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] z-50"
        >
          <div className="grid grid-cols-3 gap-10">
            {/* Game Lines */}
            <div className="dropdown-column">
              <div className="column-header text-accent text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                Game Lines
              </div>
              {gameLines.map((game) => (
                <button
                  key={game.name}
                  className={`dropdown-item w-full text-left flex items-center gap-2 p-3 rounded-lg transition-all duration-200 mb-1 ${
                    game.featured 
                      ? 'bg-blue-900/20 border border-blue-700/40 text-blue-300 hover:bg-blue-900/30 hover:text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <span>{game.icon}</span>
                  {game.name}
                </button>
              ))}
            </div>

            {/* Product Types */}
            <div className="dropdown-column">
              <div className="column-header text-accent text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                Product Types
              </div>
              {productTypes.map((type) => (
                <button
                  key={type}
                  className="dropdown-item w-full text-left p-3 rounded-lg text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1 transition-all duration-200 mb-1"
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Special Collections */}
            <div className="dropdown-column">
              <div className="column-header text-accent text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                Special Collections
              </div>
              {specialCollections.map((collection) => (
                <button
                  key={collection.name}
                  className="dropdown-item w-full text-left flex items-center gap-2 p-3 rounded-lg text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1 transition-all duration-200 mb-1"
                >
                  <span>{collection.icon}</span>
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Modern Filter Bar
export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters,
  onFilterRemove,
  onFilterOpen,
  onSortChange,
  resultCount = 0
}) => {
  return (
    <div className="filter-control-bar border-b border-white/5 py-4">
      <Container>
        <Flex direction="row" align="center" gap="md" className="flex-wrap">
          {/* Filter Button */}
          <button
            onClick={onFilterOpen}
            className="filter-button flex items-center gap-2 bg-glass-deep-indigo border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-glass-cosmic-purple hover:translate-y-[-1px] transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filter</span>
            {activeFilters.length > 0 && (
              <span className="filter-count bg-accent text-white rounded-lg px-2 py-1 text-xs font-semibold min-w-[18px] text-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <select 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-dropdown bg-glass-deep-indigo border border-white/10 rounded-lg px-4 py-3 text-white cursor-pointer min-w-[180px] focus:border-accent focus:bg-glass-cosmic-purple outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="newest">Newest First</option>
            <option value="best-selling">Best Selling</option>
          </select>

          {/* View Toggles */}
          <Flex direction="row" gap="sm" className="view-toggles">
            <button className="view-toggle active bg-blue-900/30 border border-blue-700/50 text-blue-300 rounded-lg p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button className="view-toggle bg-glass-deep-indigo border border-white/10 text-white/60 hover:bg-white/10 hover:text-white rounded-lg p-2 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </Flex>

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <Flex direction="row" gap="sm" className="active-filter-tags flex-wrap ml-auto">
              {activeFilters.map((filter) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="filter-tag bg-blue-900/30 border border-blue-700/50 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2"
                >
                  {filter.label}
                  <button
                    onClick={() => onFilterRemove(filter.id)}
                    className="text-white hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-200"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </Flex>
          )}
        </Flex>

        {/* Results Count */}
        {resultCount > 0 && (
          <div className="mt-3 text-white/60 text-sm">
            {resultCount} {resultCount === 1 ? 'product' : 'products'} found
          </div>
        )}
      </Container>
    </div>
  );
};