import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unifiedDesignTokens } from './UnifiedDesignSystem';

// Types
interface CategoryItem {
  id: string;
  name: string;
  shopifyTag: string;
  count?: number;
  subcategories?: SubcategoryItem[];
}

interface SubcategoryItem {
  id: string;
  name: string;
  tag: string;
  count?: number;
}

interface FilterState {
  activeCategory: string;
  activeSubcategory: string | null;
  searchTerm: string;
  viewMode: 'grid' | 'list';
  isFilterExpanded: boolean;
}

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  tags: string[];
}

// Enhanced Apple Quantum Design System
const quantumDesignSystem = {
  colors: {
    // Enhanced Deep Void + Oil Slick Foundation (from globals.css)
    voidBlack: '#000000',
    deepSpaceIndigo: '#0A0A0F',
    ultraIndigo: '#15151D',
    cardBackground: 'rgba(10, 10, 15, 0.85)',
    elevatedBackground: 'rgba(21, 21, 29, 0.9)',
    
    // Oil Slick Purple & Indigo Palette
    oilSlickPurple: '#2D1B69',
    oilSlickIndigo: '#1E1B4B',
    deepCosmicPurple: '#4C1D95',
    cosmicIndigo: '#312E81',
    subtleViolet: '#6366F1',
    electricIndigo: '#4F46E5',
    
    // Apple System Colors - Enhanced for Deep Theme
    appleBlueBright: '#007AFF',
    appleBlueHover: '#409CFF',
    applePurple: '#8B5CF6',
    appleTeal: '#64D2FF',
    
    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.7)',
    textQuaternary: 'rgba(255, 255, 255, 0.6)',
    textPlaceholder: 'rgba(255, 255, 255, 0.45)',
    
    // Glassmorphic Surfaces
    glassDeepIndigo: 'rgba(30, 27, 75, 0.85)',
    glassCosmicPurple: 'rgba(45, 27, 105, 0.9)',
    glassElectricIndigo: 'rgba(79, 70, 229, 0.8)',
    
    // Border & Accent
    borderPrimary: 'rgba(255, 255, 255, 0.1)',
    borderSecondary: 'rgba(255, 255, 255, 0.08)',
    borderActive: 'rgba(99, 102, 241, 0.6)',
  },
  
  typography: {
    // Apple System Typography - Enhanced
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    letterSpacing: '-0.022em',
    lineHeight: 1.47059,
    
    // Font Sizes (Apple Hierarchy)
    large: '32px',      // Hero
    title3: '20px',     // Section headers
    headline: '17px',   // Primary text
    body: '14px',       // Body text
    subheadline: '12px', // Secondary text  
    caption: '11px',    // Captions
  },
  
  spacing: {
    // Apple Standard Spacing
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    xxxxl: '44px',   // Apple nav height
  },
  
  animations: {
    // Apple-style easing
    fast: '150ms',
    medium: '250ms',
    slow: '350ms',
    appleEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    quantumEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
    
    // Apple spring presets
    gentle: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
    responsive: {
      type: 'spring', 
      stiffness: 400,
      damping: 25,
    },
  },
  
  effects: {
    backdropBlur: 'saturate(180%) blur(20px)',
    glassEffect: 'blur(20px) saturate(150%)',
    quantumShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
    appleShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  }
};

// Sample Categories Data (Petersen Games specific)
const PETERSEN_CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    name: 'All Products',
    shopifyTag: 'all',
    count: 24,
  },
  {
    id: 'core-games',
    name: 'Core Games',
    shopifyTag: 'core-games',
    count: 8,
    subcategories: [
      { id: 'board-games', name: 'Board Games', tag: 'board-games', count: 4 },
      { id: 'card-games', name: 'Card Games', tag: 'card-games', count: 2 },
      { id: 'rpg-core', name: 'RPG Core Rules', tag: 'rpg-core', count: 2 },
    ]
  },
  {
    id: 'miniatures', 
    name: 'Miniatures',
    shopifyTag: 'miniatures',
    count: 12,
    subcategories: [
      { id: 'fantasy', name: 'Fantasy', tag: 'fantasy-miniatures', count: 6 },
      { id: 'sci-fi', name: 'Sci-Fi', tag: 'sci-fi-miniatures', count: 3 },
      { id: 'horror', name: 'Horror', tag: 'horror-miniatures', count: 3 },
    ]
  },
  {
    id: 'expansions',
    name: 'Expansions',
    shopifyTag: 'expansions',
    count: 4,
    subcategories: [
      { id: 'expansion-packs', name: 'Expansion Packs', tag: 'expansion-packs', count: 2 },
      { id: 'campaign-books', name: 'Campaign Books', tag: 'campaign-books', count: 2 },
    ]
  }
];

// Mock Products Data
const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Cthulhu Wars', category: 'core-games', subcategory: 'board-games', price: 199.99, image: '🐙', tags: ['strategy', 'horror', 'board-games'] },
  { id: 2, name: 'Sandy Petersen\'s Planet Apocalypse', category: 'core-games', subcategory: 'board-games', price: 149.99, image: '👹', tags: ['strategy', 'sci-fi', 'board-games'] },
  { id: 3, name: 'Zombie Miniatures Pack', category: 'miniatures', subcategory: 'horror', price: 49.99, image: '🧟', tags: ['miniatures', 'horror', 'undead'] },
  { id: 4, name: 'Space Marines Squad', category: 'miniatures', subcategory: 'sci-fi', price: 79.99, image: '🦄', tags: ['miniatures', 'sci-fi', 'military'] },
  { id: 5, name: 'Elder Thing Expansion', category: 'expansions', subcategory: 'expansion-packs', price: 89.99, image: '⚡', tags: ['expansion', 'cthulhu-wars', 'cosmic-horror'] },
  { id: 6, name: 'Dragon Miniatures Set', category: 'miniatures', subcategory: 'fantasy', price: 129.99, image: '🐲', tags: ['miniatures', 'fantasy', 'dragons'] },
];

// Main Enhanced Apple Quantum Filter Component
const EnhancedAppleQuantumFilter: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    activeCategory: 'all',
    activeSubcategory: null,
    searchTerm: '',
    viewMode: 'grid',
    isFilterExpanded: true,
  });

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter products based on current state
  useEffect(() => {
    let filtered = [...SAMPLE_PRODUCTS];

    // Filter by category
    if (filterState.activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterState.activeCategory);
    }

    // Filter by subcategory
    if (filterState.activeSubcategory) {
      filtered = filtered.filter(product => product.subcategory === filterState.activeSubcategory);
    }

    // Filter by search term
    if (filterState.searchTerm.trim()) {
      const searchLower = filterState.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredProducts(filtered);
  }, [filterState]);

  // Handle category change with smooth transition
  const handleCategoryChange = (categoryId: string) => {
    setFilterState(prev => ({
      ...prev,
      activeCategory: categoryId,
      activeSubcategory: null, // Reset subcategory when changing main category
    }));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryTag: string | null) => {
    setFilterState(prev => ({
      ...prev,
      activeSubcategory: subcategoryTag,
    }));
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isExpanded = (categoryId: string) => expandedCategories.has(categoryId);

  return (
    <div style={{
      fontFamily: quantumDesignSystem.typography.fontFamily,
      background: quantumDesignSystem.colors.voidBlack,
      color: quantumDesignSystem.colors.textPrimary,
      lineHeight: quantumDesignSystem.typography.lineHeight,
      letterSpacing: quantumDesignSystem.typography.letterSpacing,
      minHeight: '100vh',
    }}>
      
      {/* Apple-style Navigation Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: quantumDesignSystem.effects.backdropBlur,
          borderBottom: `0.5px solid ${quantumDesignSystem.colors.borderPrimary}`,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `0 ${quantumDesignSystem.spacing.xl}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: quantumDesignSystem.spacing.xxxxl, // 44px Apple standard
        }}>
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: quantumDesignSystem.typography.title3,
              fontWeight: 600,
              color: quantumDesignSystem.colors.textPrimary,
              textDecoration: 'none',
              letterSpacing: '-0.5px',
            }}
          >
            Petersen Games
          </motion.a>

          {/* Search Input */}
          <div style={{ flex: 1, maxWidth: '400px', margin: `0 ${quantumDesignSystem.spacing.xl}` }}>
            <SearchInput 
              value={filterState.searchTerm}
              onChange={(value) => setFilterState(prev => ({ ...prev, searchTerm: value }))}
              width="100%"
            />
          </div>

          {/* Navigation Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: quantumDesignSystem.spacing.lg,
          }}>
            <ViewToggleButton
              icon="▦"
              isActive={filterState.viewMode === 'grid'}
              onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'grid' }))}
            />
            <ViewToggleButton
              icon="☰"
              isActive={filterState.viewMode === 'list'}
              onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'list' }))}
            />
          </div>
        </div>
      </motion.nav>

      <div style={{
        display: 'flex',
        gap: quantumDesignSystem.spacing.xl,
        padding: quantumDesignSystem.spacing.xl,
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        
        {/* Enhanced Sidebar Filter */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ 
            x: filterState.isFilterExpanded ? 0 : -250, 
            opacity: filterState.isFilterExpanded ? 1 : 0.3,
            width: filterState.isFilterExpanded ? '320px' : '80px'
          }}
          transition={{ 
            duration: 0.4, 
            ease: quantumDesignSystem.animations.appleEase
          }}
          style={{
            background: quantumDesignSystem.colors.glassDeepIndigo,
            borderRadius: quantumDesignSystem.spacing.xl,
            padding: quantumDesignSystem.spacing.xl,
            backdropFilter: quantumDesignSystem.effects.glassEffect,
            border: `1px solid ${quantumDesignSystem.colors.borderPrimary}`,
            height: 'fit-content',
            position: 'sticky',
            top: `calc(${quantumDesignSystem.spacing.xxxxl} + ${quantumDesignSystem.spacing.xl})`,
            overflow: 'hidden',
            boxShadow: quantumDesignSystem.effects.quantumShadow,
          }}
        >
          {/* Filter Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterState(prev => ({ ...prev, isFilterExpanded: !prev.isFilterExpanded }))}
            style={{
              background: 'none',
              border: 'none',
              color: quantumDesignSystem.colors.textPrimary,
              fontSize: quantumDesignSystem.typography.headline,
              cursor: 'pointer',
              marginBottom: quantumDesignSystem.spacing.xl,
              padding: quantumDesignSystem.spacing.sm,
              borderRadius: quantumDesignSystem.spacing.sm,
              transition: `all ${quantumDesignSystem.animations.fast}`,
            }}
          >
            {filterState.isFilterExpanded ? '◀' : '▶'}
          </motion.button>

          <AnimatePresence>
            {filterState.isFilterExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Navigation */}
                <div>
                  <h3 style={{
                    fontSize: quantumDesignSystem.typography.body,
                    fontWeight: 600,
                    marginBottom: quantumDesignSystem.spacing.lg,
                    color: quantumDesignSystem.colors.textTertiary,
                  }}>
                    Categories
                  </h3>
                  
                  {PETERSEN_CATEGORIES.map((category) => (
                    <CategoryButton
                      key={category.id}
                      category={category}
                      isActive={filterState.activeCategory === category.id}
                      isExpanded={isExpanded(category.id)}
                      hasSubcategories={!!category.subcategories?.length}
                      onCategoryClick={() => handleCategoryChange(category.id)}
                      onExpandClick={() => toggleCategory(category.id)}
                      activeSubcategory={filterState.activeSubcategory}
                      onSubcategoryClick={handleSubcategoryChange}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          {/* Header with Results Count */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: quantumDesignSystem.spacing.xxxl,
              background: quantumDesignSystem.colors.elevatedBackground,
              borderRadius: quantumDesignSystem.spacing.lg,
              padding: quantumDesignSystem.spacing.xl,
              backdropFilter: quantumDesignSystem.effects.glassEffect,
              border: `1px solid ${quantumDesignSystem.colors.borderPrimary}`,
            }}
          >
            <div>
              <h1 style={{
                fontSize: quantumDesignSystem.typography.large,
                fontWeight: 700,
                margin: 0,
                marginBottom: quantumDesignSystem.spacing.xs,
              }}>
                {PETERSEN_CATEGORIES.find(cat => cat.id === filterState.activeCategory)?.name || 'Products'}
              </h1>
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: quantumDesignSystem.colors.textTertiary,
                  margin: 0,
                  fontSize: quantumDesignSystem.typography.body,
                }}
              >
                {filteredProducts.length} products found
                {filterState.activeSubcategory && ` in ${filterState.activeSubcategory}`}
              </motion.p>
            </div>
          </motion.div>

          {/* Animated Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filterState.activeCategory}-${filterState.activeSubcategory}-${filterState.viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: quantumDesignSystem.animations.quantumEase }}
              style={{
                display: filterState.viewMode === 'grid' ? 'grid' : 'flex',
                gridTemplateColumns: filterState.viewMode === 'grid' 
                  ? 'repeat(auto-fill, minmax(280px, 1fr))' 
                  : 'none',
                flexDirection: filterState.viewMode === 'list' ? 'column' : 'row',
                gap: quantumDesignSystem.spacing.xl,
              }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  viewMode={filterState.viewMode}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: quantumDesignSystem.spacing.xxxl,
                background: quantumDesignSystem.colors.elevatedBackground,
                borderRadius: quantumDesignSystem.spacing.xl,
                backdropFilter: quantumDesignSystem.effects.glassEffect,
                border: `1px solid ${quantumDesignSystem.colors.borderPrimary}`,
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: quantumDesignSystem.spacing.xl }}>
                🔍
              </div>
              <h3 style={{
                fontSize: quantumDesignSystem.typography.headline,
                fontWeight: 600,
                marginBottom: quantumDesignSystem.spacing.md,
              }}>
                No products found
              </h3>
              <p style={{
                color: quantumDesignSystem.colors.textTertiary,
                fontSize: quantumDesignSystem.typography.body,
              }}>
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

// Search Input Component
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  width: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, width }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'relative',
        width,
      }}
    >
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search products..."
        style={{
          background: isFocused 
            ? quantumDesignSystem.colors.glassElectricIndigo 
            : quantumDesignSystem.colors.elevatedBackground,
          border: `1px solid ${isFocused 
            ? quantumDesignSystem.colors.borderActive 
            : quantumDesignSystem.colors.borderPrimary}`,
          borderRadius: quantumDesignSystem.spacing.md,
          padding: `${quantumDesignSystem.spacing.md} ${quantumDesignSystem.spacing.md} ${quantumDesignSystem.spacing.md} ${quantumDesignSystem.spacing.xxxl}`,
          fontSize: quantumDesignSystem.typography.subheadline,
          color: quantumDesignSystem.colors.textPrimary,
          width: '100%',
          outline: 'none',
          transition: `all ${quantumDesignSystem.animations.medium}`,
          boxShadow: isFocused ? quantumDesignSystem.effects.quantumShadow : 'none',
        }}
      />
    </motion.div>
  );
};

// Category Button Component
interface CategoryButtonProps {
  category: CategoryItem;
  isActive: boolean;
  isExpanded: boolean;
  hasSubcategories: boolean;
  onCategoryClick: () => void;
  onExpandClick: () => void;
  activeSubcategory: string | null;
  onSubcategoryClick: (subcategoryTag: string | null) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  category, 
  isActive, 
  isExpanded, 
  hasSubcategories, 
  onCategoryClick, 
  onExpandClick,
  activeSubcategory,
  onSubcategoryClick 
}) => (
  <div style={{ marginBottom: quantumDesignSystem.spacing.sm }}>
    <motion.button
      whileHover={{ x: 4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCategoryClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: isActive 
          ? `linear-gradient(135deg, ${quantumDesignSystem.colors.glassElectricIndigo}, ${quantumDesignSystem.colors.glassCosmicPurple})`
          : quantumDesignSystem.colors.elevatedBackground,
        border: `1px solid ${isActive ? quantumDesignSystem.colors.borderActive : quantumDesignSystem.colors.borderSecondary}`,
        borderRadius: quantumDesignSystem.spacing.md,
        padding: quantumDesignSystem.spacing.lg,
        color: quantumDesignSystem.colors.textPrimary,
        fontSize: quantumDesignSystem.typography.body,
        fontWeight: isActive ? 600 : 500,
        cursor: 'pointer',
        backdropFilter: quantumDesignSystem.effects.glassEffect,
        transition: `all ${quantumDesignSystem.animations.medium}`,
        boxShadow: isActive ? quantumDesignSystem.effects.quantumShadow : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: quantumDesignSystem.spacing.md }}>
        <span>{category.name}</span>
        {category.count && (
          <span style={{
            background: quantumDesignSystem.colors.glassDeepIndigo,
            borderRadius: quantumDesignSystem.spacing.md,
            padding: `${quantumDesignSystem.spacing.xs} ${quantumDesignSystem.spacing.sm}`,
            fontSize: quantumDesignSystem.typography.caption,
            fontWeight: 500,
          }}>
            {category.count}
          </span>
        )}
      </div>
      
      {hasSubcategories && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onExpandClick();
          }}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          whileHover={{ scale: 1.1 }}
          style={{
            background: 'none',
            border: 'none',
            color: quantumDesignSystem.colors.textSecondary,
            cursor: 'pointer',
            padding: quantumDesignSystem.spacing.xs,
          }}
        >
          ›
        </motion.button>
      )}
    </motion.button>

    {/* Subcategories */}
    <AnimatePresence>
      {hasSubcategories && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: quantumDesignSystem.spacing.sm,
            paddingLeft: quantumDesignSystem.spacing.lg,
            borderLeft: `1px solid ${quantumDesignSystem.colors.borderSecondary}`,
          }}
        >
          {category.subcategories?.map((subcategory, index) => (
            <motion.button
              key={subcategory.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSubcategoryClick(
                activeSubcategory === subcategory.tag ? null : subcategory.tag
              )}
              style={{
                display: 'block',
                width: '100%',
                background: activeSubcategory === subcategory.tag 
                  ? quantumDesignSystem.colors.glassElectricIndigo
                  : 'transparent',
                border: 'none',
                borderRadius: quantumDesignSystem.spacing.sm,
                padding: quantumDesignSystem.spacing.md,
                color: quantumDesignSystem.colors.textPrimary,
                fontSize: quantumDesignSystem.typography.subheadline,
                textAlign: 'left',
                cursor: 'pointer',
                marginBottom: quantumDesignSystem.spacing.xs,
                transition: `all ${quantumDesignSystem.animations.medium}`,
              }}
            >
              {subcategory.name}
              {subcategory.count && (
                <span style={{
                  marginLeft: quantumDesignSystem.spacing.sm,
                  color: quantumDesignSystem.colors.textTertiary,
                  fontSize: quantumDesignSystem.typography.caption,
                }}>
                  ({subcategory.count})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// View Toggle Button Component
interface ViewToggleButtonProps {
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ icon, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      background: isActive 
        ? quantumDesignSystem.colors.glassElectricIndigo
        : quantumDesignSystem.colors.elevatedBackground,
      border: `1px solid ${isActive ? quantumDesignSystem.colors.borderActive : quantumDesignSystem.colors.borderSecondary}`,
      borderRadius: quantumDesignSystem.spacing.sm,
      padding: `${quantumDesignSystem.spacing.sm} ${quantumDesignSystem.spacing.md}`,
      color: quantumDesignSystem.colors.textPrimary,
      fontSize: quantumDesignSystem.typography.body,
      cursor: 'pointer',
      transition: `all ${quantumDesignSystem.animations.medium}`,
    }}
  >
    {icon}
  </motion.button>
);

// Product Card Component
interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, viewMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.4, 
      delay: index * 0.05,
      ease: quantumDesignSystem.animations.quantumEase
    }}
    whileHover={{ 
      y: -8, 
      scale: viewMode === 'grid' ? 1.03 : 1.01,
      transition: { duration: 0.2 }
    }}
    style={{
      background: quantumDesignSystem.colors.elevatedBackground,
      borderRadius: quantumDesignSystem.spacing.lg,
      padding: quantumDesignSystem.spacing.xl,
      backdropFilter: quantumDesignSystem.effects.glassEffect,
      border: `1px solid ${quantumDesignSystem.colors.borderPrimary}`,
      cursor: 'pointer',
      display: viewMode === 'list' ? 'flex' : 'block',
      alignItems: viewMode === 'list' ? 'center' : 'stretch',
      gap: viewMode === 'list' ? quantumDesignSystem.spacing.xl : 0,
      boxShadow: quantumDesignSystem.effects.appleShadow,
      transition: `all ${quantumDesignSystem.animations.medium}`,
    }}
  >
    <div style={{
      fontSize: viewMode === 'grid' ? '3rem' : '2rem',
      textAlign: 'center',
      marginBottom: viewMode === 'grid' ? quantumDesignSystem.spacing.lg : 0,
      flexShrink: 0,
    }}>
      {product.image}
    </div>
    
    <div style={{ flex: viewMode === 'list' ? 1 : 'none' }}>
      <h3 style={{
        fontSize: viewMode === 'grid' ? quantumDesignSystem.typography.headline : quantumDesignSystem.typography.title3,
        fontWeight: 600,
        marginBottom: quantumDesignSystem.spacing.md,
        textAlign: viewMode === 'grid' ? 'center' : 'left',
      }}>
        {product.name}
      </h3>
      
      <div style={{
        display: 'flex',
        justifyContent: viewMode === 'grid' ? 'center' : 'space-between',
        alignItems: 'center',
        gap: quantumDesignSystem.spacing.lg,
      }}>
        <span style={{
          fontSize: quantumDesignSystem.typography.headline,
          fontWeight: 700,
          color: quantumDesignSystem.colors.appleTeal,
        }}>
          ${product.price}
        </span>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: `linear-gradient(135deg, ${quantumDesignSystem.colors.electricIndigo}, ${quantumDesignSystem.colors.appleBlueBright})`,
            border: 'none',
            borderRadius: quantumDesignSystem.spacing.sm,
            padding: `${quantumDesignSystem.spacing.sm} ${quantumDesignSystem.spacing.lg}`,
            color: 'white',
            fontSize: quantumDesignSystem.typography.subheadline,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// Search Icon Component
const SearchIcon: React.FC = () => (
  <svg
    style={{
      position: 'absolute',
      left: quantumDesignSystem.spacing.md,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '14px',
      height: '14px',
      opacity: 0.6,
    }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

export default EnhancedAppleQuantumFilter;