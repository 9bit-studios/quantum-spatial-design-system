'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Flex, Card } from './GridSystem';
import { Headline, BodyText, Badge } from './Typography';

// Filter Modal Component - Referenced in the guide

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  gameLines: string[];
  playerCount: string[];
  priceRange: { min: number; max: number };
  productType: string[];
  availability: string[];
}

const FILTER_OPTIONS = {
  gameLines: [
    { id: 'cthulhu-wars', name: 'Cthulhu Wars', icon: '🐙', count: 12 },
    { id: 'planet-apocalypse', name: 'Planet Apocalypse', icon: '🌍', count: 8 },
    { id: 'hyperspace', name: 'Hyperspace', icon: '🦄', count: 6 },
    { id: 'evil-high-priest', name: 'Evil High Priest', icon: '⚡', count: 4 },
    { id: 'orcs-must-die', name: 'Orcs Must Die', icon: '⚔️', count: 3 },
    { id: 'gods-war', name: 'The Gods War', icon: '⚡', count: 5 }
  ],
  playerCount: [
    { id: '1-2', name: '1-2 Players', count: 8 },
    { id: '3-4', name: '3-4 Players', count: 15 },
    { id: '5-6', name: '5-6 Players', count: 6 },
    { id: '7+', name: '7+ Players', count: 3 }
  ],
  productType: [
    { id: 'core-games', name: 'Core Games', count: 12 },
    { id: 'expansions', name: 'Expansions', count: 18 },
    { id: 'faction-packs', name: 'Faction Packs', count: 8 },
    { id: 'miniatures', name: 'Miniatures', count: 25 },
    { id: 'deluxe-components', name: 'Deluxe Components', count: 6 },
    { id: 'accessories', name: 'Accessories', count: 10 },
    { id: 'rpg-materials', name: 'RPG Materials', count: 7 }
  ],
  availability: [
    { id: 'in-stock', name: 'In Stock', count: 42 },
    { id: 'pre-order', name: 'Pre-Order', count: 8 },
    { id: 'limited-edition', name: 'Limited Edition', count: 3 },
    { id: 'on-sale', name: 'On Sale', count: 12 }
  ]
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {
    gameLines: [],
    playerCount: [],
    priceRange: { min: 0, max: 500 },
    productType: [],
    availability: []
  }
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [tempPriceRange, setTempPriceRange] = useState(initialFilters.priceRange);

  const handleFilterToggle = (category: keyof Omit<FilterState, 'priceRange'>, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setTempPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleApplyFilters = () => {
    const finalFilters = {
      ...filters,
      priceRange: tempPriceRange
    };
    onApplyFilters(finalFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      gameLines: [],
      playerCount: [],
      priceRange: { min: 0, max: 500 },
      productType: [],
      availability: []
    };
    setFilters(clearedFilters);
    setTempPriceRange(clearedFilters.priceRange);
  };

  const getTotalActiveFilters = () => {
    return filters.gameLines.length + 
           filters.playerCount.length + 
           filters.productType.length + 
           filters.availability.length;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] mx-4"
          >
            <Card variant="elevated" className="overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <Flex direction="row" justify="between" align="center">
                  <div>
                    <Headline>Filter Products</Headline>
                    <BodyText color="secondary" className="mt-1">
                      {getTotalActiveFilters()} filters active
                    </BodyText>
                  </div>
                  
                  <Flex direction="row" gap="sm">
                    <button
                      onClick={handleClearAll}
                      className="btn-secondary-glass text-sm"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={onClose}
                      className="nav-action"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </Flex>
                </Flex>
              </div>

              {/* Filter Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Game Lines */}
                  <div>
                    <div className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
                      Game Lines
                    </div>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.gameLines.map((option) => (
                        <FilterOption
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          icon={option.icon}
                          count={option.count}
                          isSelected={filters.gameLines.includes(option.id)}
                          onToggle={() => handleFilterToggle('gameLines', option.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Player Count */}
                  <div>
                    <div className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
                      Player Count
                    </div>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.playerCount.map((option) => (
                        <FilterOption
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          count={option.count}
                          isSelected={filters.playerCount.includes(option.id)}
                          onToggle={() => handleFilterToggle('playerCount', option.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Type */}
                  <div>
                    <div className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
                      Product Type
                    </div>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.productType.map((option) => (
                        <FilterOption
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          count={option.count}
                          isSelected={filters.productType.includes(option.id)}
                          onToggle={() => handleFilterToggle('productType', option.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
                      Price Range
                    </div>
                    <div className="space-y-4">
                      <Flex direction="row" gap="md">
                        <div className="flex-1">
                          <label className="block text-xs text-white/60 mb-1">Min</label>
                          <input
                            type="number"
                            value={tempPriceRange.min}
                            onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value) || 0)}
                            className="input-enhanced text-sm"
                            placeholder="$0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-white/60 mb-1">Max</label>
                          <input
                            type="number"
                            value={tempPriceRange.max}
                            onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value) || 500)}
                            className="input-enhanced text-sm"
                            placeholder="$500"
                          />
                        </div>
                      </Flex>
                      
                      <div className="text-xs text-white/60">
                        ${tempPriceRange.min} - ${tempPriceRange.max}
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <div className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
                      Availability
                    </div>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.availability.map((option) => (
                        <FilterOption
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          count={option.count}
                          isSelected={filters.availability.includes(option.id)}
                          onToggle={() => handleFilterToggle('availability', option.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <Flex direction="row" justify="between" align="center">
                  <BodyText color="secondary" size="sm">
                    {getTotalActiveFilters()} filters selected
                  </BodyText>
                  
                  <Flex direction="row" gap="md">
                    <button
                      onClick={onClose}
                      className="btn-secondary-glass"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleApplyFilters}
                      className="btn-accent-gradient"
                    >
                      Apply Filters
                    </motion.button>
                  </Flex>
                </Flex>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Filter Option Component
interface FilterOptionProps {
  id: string;
  name: string;
  icon?: string;
  count: number;
  isSelected: boolean;
  onToggle: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  name,
  icon,
  count,
  isSelected,
  onToggle
}) => {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
        isSelected
          ? 'bg-accent/20 border border-accent/40 text-white'
          : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Flex direction="row" align="center" gap="sm">
        {icon && <span>{icon}</span>}
        <span className="text-sm font-medium">{name}</span>
      </Flex>
      
      <Badge variant={isSelected ? 'info' : 'default'} size="sm">
        {count}
      </Badge>
    </motion.button>
  );
};