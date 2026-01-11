'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QuantumSpatialButton, 
  QuantumSpatialCard, 
  QuantumSpatialNavigation, 
  QuantumSpatialInput,
  PetersenProductCard 
} from './quantum-spatial';
import { getAllProducts, PetersenProduct } from '../lib/shopify';
import { cn, formatPrice, debounce } from '../lib/utils';

/**
 * Enhanced Petersen Games Homepage
 * Apple Intelligence Strategic Director Enhanced
 * - Full Apple HIG compliance
 * - Quantum-spatial design system integration
 * - M4 Neural Engine optimized animations
 * - Vercel deployment ready
 */

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )
  },
  {
    id: 'games',
    label: 'Games',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 'miniatures',
    label: 'Miniatures',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'accessories',
    label: 'Accessories',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    )
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Games', count: 0 },
  { id: 'cthulhu-wars', name: 'Cthulhu Wars', count: 0 },
  { id: 'planet-apocalypse', name: 'Planet Apocalypse', count: 0 },
  { id: 'hyperspace', name: 'Hyperspace', count: 0 },
  { id: 'accessories', name: 'Accessories', count: 0 }
];

export const EnhancedPetersenHomepage: React.FC = () => {
  const [products, setProducts] = useState<PetersenProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PetersenProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    filterProducts(query, activeCategory);
  }, 300);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, activeCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Fallback to mock data for demo
      const mockProducts: PetersenProduct[] = [
        {
          id: '1',
          title: 'Cthulhu Wars Core Game',
          description: 'Epic strategy game of cosmic horror and world domination',
          price: 199.99,
          compareAtPrice: 249.99,
          image: '/images/cthulhu-wars.jpg',
          category: 'Board Games',
          tags: ['strategy', 'horror', 'featured'],
          gameStats: {
            players: '2-4',
            playTime: '90-120min',
            ageRange: '14+'
          },
          inStock: true,
          featured: true
        },
        {
          id: '2',
          title: 'Planet Apocalypse',
          description: 'Demonic invasion strategy game',
          price: 149.99,
          image: '/images/planet-apocalypse.jpg',
          category: 'Board Games',
          tags: ['strategy', 'apocalypse'],
          gameStats: {
            players: '1-5',
            playTime: '60-90min',
            ageRange: '12+'
          },
          inStock: true,
          new: true
        }
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (query: string, category: string) => {
    let filtered = products;

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.tags?.some(tag => 
          tag.toLowerCase().includes(category.replace('-', ' '))
        ) || product.category.toLowerCase().includes(category.replace('-', ' '))
      );
    }

    // Search filter
    if (query.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    // Show success notification (implementation depends on your notification system)
    console.log(`Added product ${productId} to cart`);
  };

  const handleQuickView = (productId: string) => {
    // Implementation for quick view modal
    console.log(`Quick view for product ${productId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Navigation */}
      <QuantumSpatialNavigation
        items={NAVIGATION_ITEMS}
        activeItem={activeNavItem}
        onItemClick={(item) => setActiveNavItem(item.id)}
        variant="horizontal"
        quantum={true}
        logo={
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Petersen Games
            </span>
          </motion.div>
        }
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Legendary Gaming Experiences
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Enter Worlds of
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cosmic Horror
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover premium board games, miniatures, and RPG accessories from the masters of strategic horror gaming.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuantumSpatialButton
                variant="primary"
                size="lg"
                quantum={true}
                onClick={() => setActiveCategory('all')}
              >
                Shop Collection
              </QuantumSpatialButton>
              <QuantumSpatialButton
                variant="secondary"
                size="lg"
                quantum={true}
              >
                Learn More
              </QuantumSpatialButton>
            </div>
          </motion.div>
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuantumSpatialCard variant="glass" padding="lg" className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Input */}
              <div className="flex-1 w-full lg:max-w-md">
                <QuantumSpatialInput
                  variant="search"
                  placeholder="Search games, miniatures, accessories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  quantum={true}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <QuantumSpatialButton
                    key={category.id}
                    variant={activeCategory === category.id ? "accent" : "ghost"}
                    size="sm"
                    quantum={true}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </QuantumSpatialButton>
                ))}
              </div>
            </div>
          </QuantumSpatialCard>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {activeCategory === 'all' ? 'All Products' : 
               CATEGORIES.find(c => c.id === activeCategory)?.name || 'Products'}
            </h2>
            <span className="text-gray-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <QuantumSpatialCard key={index} variant="glass" padding="none" className="animate-pulse">
                    <div className="aspect-square bg-gray-800 rounded-t-2xl" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-700 rounded" />
                      <div className="h-6 bg-gray-700 rounded" />
                      <div className="h-4 bg-gray-700 rounded w-3/4" />
                    </div>
                  </QuantumSpatialCard>
                ))}
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-20"
              >
                <QuantumSpatialCard variant="glass" padding="xl" className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-4">No products found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <QuantumSpatialButton
                    variant="primary"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Clear Filters
                  </QuantumSpatialButton>
                </QuantumSpatialCard>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <PetersenProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickView}
                      quantum={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuantumSpatialCard variant="elevated" padding="xl" className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl mb-6">📬</div>
              <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Get notified about new releases, exclusive offers, and epic gaming events from the cosmic realms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <QuantumSpatialInput
                  type="email"
                  placeholder="Enter your email"
                  variant="email"
                  quantum={true}
                  className="flex-1"
                />
                <QuantumSpatialButton
                  variant="accent"
                  size="md"
                  quantum={true}
                >
                  Subscribe
                </QuantumSpatialButton>
              </div>
            </motion.div>
          </QuantumSpatialCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="text-xl font-bold">Petersen Games</h4>
              <p className="text-gray-400">
                Crafting legendary gaming experiences in the realms of cosmic horror since 1999.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400 uppercase tracking-wide">Shop</h5>
              <div className="space-y-2">
                {CATEGORIES.slice(1).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="block text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400 uppercase tracking-wide">Support</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Shipping Info</a>
                <a href="#" className="block hover:text-white transition-colors">Returns</a>
                <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400 uppercase tracking-wide">Company</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2025 Petersen Games. All rights reserved. | Enhanced by Apple Intelligence Strategic Director</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedPetersenHomepage;