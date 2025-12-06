// TagBasedNavigation.tsx - Simplified tag-based filtering system
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, Filter, X } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  imageAlt: string;
  href: string;
  tags: string[]; // This is the key - all filtering based on tags
  inStock: boolean;
  badge?: 'new' | 'sale' | 'featured' | 'bundle' | 'limited';
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface TagBasedNavProps {
  products: Product[];
  cartCount?: number;
}

const TagBasedNavigation: React.FC<TagBasedNavProps> = ({ products, cartCount = 0 }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Define filter groups based on your existing tag structure
  const filterGroups: FilterGroup[] = [
    {
      id: 'gameLines',
      label: 'Game Lines',
      options: [
        { value: 'collection-cw', label: 'Cthulhu Wars' },
        { value: 'collection-pa', label: 'Planet Apocalypse' },
        { value: 'collection-hs', label: 'Hyperspace' },
        { value: 'collection-ehp', label: 'Evil High Priest' },
        { value: 'collection-omd', label: 'Orcs Must Die' },
        { value: 'collection-tgw', label: 'The Gods War' }
      ]
    },
    {
      id: 'productTypes',
      label: 'Product Types',
      options: [
        { value: 'type-core-game', label: 'Core Games' },
        { value: 'type-expansion', label: 'Expansions' },
        { value: 'type-faction', label: 'Faction Packs' },
        { value: 'type-miniature', label: 'Miniatures' },
        { value: 'type-bling', label: 'Deluxe Components' },
        { value: 'type-accessory', label: 'Accessories' }
      ]
    },
    {
      id: 'special',
      label: 'Special',
      options: [
        { value: 'new-release', label: 'New Releases' },
        { value: 'on-sale', label: 'On Sale' },
        { value: 'featured', label: 'Featured' }
      ]
    }
  ];

  // Filter products based on active filters and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply tag filters
    Object.entries(activeFilters).forEach(([groupId, selectedTags]) => {
      if (selectedTags.length > 0) {
        filtered = filtered.filter(product =>
          selectedTags.some(tag => product.tags.includes(tag))
        );
      }
    });

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name-az':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
        return filtered.filter(p => p.tags.includes('new-release')).concat(
          filtered.filter(p => !p.tags.includes('new-release'))
        );
      default:
        return filtered;
    }
  }, [products, activeFilters, searchTerm, sortBy]);

  // Update filter counts dynamically
  const filterGroupsWithCounts = useMemo(() => {
    return filterGroups.map(group => ({
      ...group,
      options: group.options.map(option => ({
        ...option,
        count: products.filter(product => product.tags.includes(option.value)).length
      }))
    }));
  }, [products]);

  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const currentGroupFilters = prev[groupId] || [];
      
      if (checked) {
        return {
          ...prev,
          [groupId]: [...currentGroupFilters, value]
        };
      } else {
        return {
          ...prev,
          [groupId]: currentGroupFilters.filter(v => v !== value)
        };
      }
    });
  };

  const removeFilter = (groupId: string, value: string) => {
    handleFilterChange(groupId, value, false);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
  };

  const getActiveFilterTags = () => {
    const tags: Array<{ groupId: string; value: string; label: string }> = [];
    
    Object.entries(activeFilters).forEach(([groupId, values]) => {
      const group = filterGroups.find(g => g.id === groupId);
      if (group) {
        values.forEach(value => {
          const option = group.options.find(opt => opt.value === value);
          if (option) {
            tags.push({ groupId, value, label: option.label });
          }
        });
      }
    });
    
    return tags;
  };

  return (
    <div className="tag-nav-layout">
      {/* Simplified Header */}
      <header className="tag-nav-header">
        <div className="tag-nav-top">
          <a href="/" className="tag-brand-logo">Petersen Games</a>
          
          <div className="tag-search-container">
            <Search size={20} className="tag-search-icon" />
            <input
              type="text"
              placeholder="Search games, miniatures, expansions..."
              className="tag-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="tag-cart-button">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="tag-cart-count">{cartCount}</span>}
          </button>
        </div>

        {/* Filter Bar */}
        <div className="tag-filter-bar">
          <button 
            className="tag-filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter</span>
            {getActiveFilterTags().length > 0 && (
              <span className="tag-filter-count">{getActiveFilterTags().length}</span>
            )}
          </button>

          <select 
            className="tag-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Active Filter Tags */}
          <div className="tag-active-filters">
            {getActiveFilterTags().map(({ groupId, value, label }) => (
              <div key={`${groupId}-${value}`} className="tag-filter-chip">
                {label}
                <button onClick={() => removeFilter(groupId, value)}>
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {getActiveFilterTags().length > 0 && (
              <button className="tag-clear-all" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterOpen && (
          <div className="tag-filter-panel">
            {filterGroupsWithCounts.map(group => (
              <div key={group.id} className="tag-filter-group">
                <h3 className="tag-filter-group-title">{group.label}</h3>
                <div className="tag-filter-options">
                  {group.options.map(option => (
                    <label key={option.value} className="tag-filter-option">
                      <input
                        type="checkbox"
                        checked={activeFilters[group.id]?.includes(option.value) || false}
                        onChange={(e) => handleFilterChange(group.id, option.value, e.target.checked)}
                      />
                      <span>{option.label}</span>
                      <span className="tag-option-count">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Results */}
      <main className="tag-main-content">
        <div className="tag-results-header">
          <h1>Strategic Horror Collection</h1>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="tag-product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={(id) => console.log('Add to cart:', id)}
              onQuickView={(id) => console.log('Quick view:', id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="tag-no-results">
            <h2>No products found</h2>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearAllFilters} className="tag-clear-filters-btn">
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// Simplified ProductCard for tag-based system
const ProductCard: React.FC<{
  id: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  imageAlt: string;
  href: string;
  badge?: string;
  inStock: boolean;
  onAddToCart: (id: string) => void;
  onQuickView: (id: string) => void;
}> = ({ id, title, description, price, comparePrice, image, imageAlt, href, badge, inStock, onAddToCart, onQuickView }) => {
  return (
    <div className="tag-product-card">
      <a href={href} className="tag-product-link">
        <div className="tag-product-image-container">
          {badge && <div className={`tag-product-badge tag-badge-${badge}`}>{badge}</div>}
          <img src={image} alt={imageAlt} className="tag-product-image" />
        </div>
        
        <div className="tag-product-info">
          <h3 className="tag-product-title">{title}</h3>
          <p className="tag-product-description">{description}</p>
          
          <div className="tag-product-pricing">
            {comparePrice && <span className="tag-price-compare">${comparePrice.toFixed(2)}</span>}
            <span className="tag-price-current">${price.toFixed(2)}</span>
          </div>
        </div>
      </a>
      
      <button 
        className={`tag-add-cart ${!inStock ? 'tag-add-cart-disabled' : ''}`}
        onClick={() => inStock && onAddToCart(id)}
        disabled={!inStock}
      >
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default TagBasedNavigation;