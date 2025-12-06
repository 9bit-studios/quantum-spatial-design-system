'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Flex, Card } from './GridSystem';
import { DisplayText, Headline, BodyText, Badge } from './Typography';
import { AnimatedProductCard, LoadingSkeleton } from './AnimatedComponents';
import { ProductGrid } from './EcommerceFlow';
import { useResponsiveGrid } from './ResponsiveHooks';

// Category Pages Component - Category-specific product displays

export interface CategoryPageProps {
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  categoryImage?: string;
  products: CategoryProduct[];
  subcategories?: Subcategory[];
  loading?: boolean;
  onSubcategoryChange?: (subcategoryId: string) => void;
  activeSubcategory?: string;
}

export interface CategoryProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  tags: string[];
  availableForSale: boolean;
  vendor: string;
  productType: string;
  featured?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  count: number;
  image?: string;
}

// Mock category data
const CATEGORY_INFO = {
  'core-games': {
    name: 'Core Games',
    description: 'Complete standalone games that provide hours of strategic gameplay',
    image: '/images/categories/core-games.jpg'
  },
  'expansions': {
    name: 'Expansions',
    description: 'Enhance your favorite games with new content and mechanics',
    image: '/images/categories/expansions.jpg'
  },
  'miniatures': {
    name: 'Miniatures',
    description: 'Detailed figures and models for tabletop gaming',
    image: '/images/categories/miniatures.jpg'
  },
  'accessories': {
    name: 'Accessories',
    description: 'Essential gaming accessories and components',
    image: '/images/categories/accessories.jpg'
  }
};

const SUBCATEGORIES = {
  'core-games': [
    { id: 'strategy', name: 'Strategy Games', count: 8, description: 'Deep strategic gameplay' },
    { id: 'cooperative', name: 'Cooperative Games', count: 4, description: 'Work together to win' },
    { id: 'war-games', name: 'War Games', count: 6, description: 'Military strategy and tactics' }
  ],
  'miniatures': [
    { id: 'painted', name: 'Pre-painted', count: 12, description: 'Ready to play miniatures' },
    { id: 'unpainted', name: 'Unpainted', count: 18, description: 'Hobby painting projects' },
    { id: 'limited', name: 'Limited Edition', count: 5, description: 'Exclusive collectibles' }
  ],
  'expansions': [
    { id: 'factions', name: 'New Factions', count: 10, description: 'Additional player factions' },
    { id: 'mechanics', name: 'New Mechanics', count: 6, description: 'Enhanced gameplay systems' },
    { id: 'maps', name: 'New Maps', count: 4, description: 'Additional battlefields' }
  ],
  'accessories': [
    { id: 'storage', name: 'Storage Solutions', count: 8, description: 'Organize your games' },
    { id: 'tokens', name: 'Premium Tokens', count: 12, description: 'Upgrade game components' },
    { id: 'dice', name: 'Custom Dice', count: 6, description: 'Specialized gaming dice' }
  ]
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  categoryName,
  categoryDescription,
  categoryImage,
  products,
  subcategories = SUBCATEGORIES[categoryId as keyof typeof SUBCATEGORIES] || [],
  loading = false,
  onSubcategoryChange,
  activeSubcategory = 'all'
}) => {
  const [filteredProducts, setFilteredProducts] = useState<CategoryProduct[]>(products);
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'price-low' | 'price-high'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { isMobile, gridColumns } = useResponsiveGrid();

  const categoryInfo = CATEGORY_INFO[categoryId as keyof typeof CATEGORY_INFO];

  useEffect(() => {
    let filtered = [...products];

    // Subcategory filter
    if (activeSubcategory && activeSubcategory !== 'all') {
      filtered = filtered.filter(product =>
        product.tags.includes(activeSubcategory) ||
        product.productType.toLowerCase().includes(activeSubcategory)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, activeSubcategory, sortBy]);

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
  };

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingSkeleton type="card" count={8} />
      </Container>
    );
  }

  return (
    <div className="space-y-12">
      {/* Category Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90" />
        {(categoryImage || categoryInfo?.image) && (
          <img
            src={categoryImage || categoryInfo?.image}
            alt={categoryName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        <Container className="relative py-20">
          <div className="max-w-3xl">
            <Badge variant="info" size="lg" className="mb-4">
              {categoryName}
            </Badge>
            <DisplayText className="mb-6 text-white">
              {categoryInfo?.name || categoryName}
            </DisplayText>
            <BodyText size="lg" color="secondary" className="max-w-2xl">
              {categoryDescription || categoryInfo?.description}
            </BodyText>
            
            <Flex direction="row" gap="md" className="mt-8">
              <BodyText color="secondary">
                {products.length} products available
              </BodyText>
              {featuredProducts.length > 0 && (
                <BodyText color="secondary">
                  • {featuredProducts.length} featured
                </BodyText>
              )}
            </Flex>
          </div>
        </Container>
      </motion.div>

      <Container>
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Headline className="mb-8 text-center">Featured Products</Headline>
            <Grid columns={isMobile ? "1" : "3"} gap="lg">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AnimatedProductCard
                    product={{
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      compareAtPrice: product.compareAtPrice,
                      image: product.image,
                      description: product.description,
                      availableForSale: product.availableForSale,
                      badge: 'Featured'
                    }}
                    onAddToCart={() => {}}
                    onQuickView={() => {}}
                  />
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        )}

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Headline className="mb-8">Browse by Type</Headline>
            <Grid columns={isMobile ? "1" : "auto"} gap="md">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSubcategoryChange?.('all')}
                className={`p-4 rounded-lg border transition-all text-left ${
                  activeSubcategory === 'all'
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                }`}
              >
                <BodyText weight="semibold">All Products</BodyText>
                <BodyText size="sm" color="secondary">
                  {products.length} items
                </BodyText>
              </motion.button>

              {subcategories.map((subcategory) => (
                <motion.button
                  key={subcategory.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSubcategoryChange?.(subcategory.id)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    activeSubcategory === subcategory.id
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                  }`}
                >
                  <BodyText weight="semibold">{subcategory.name}</BodyText>
                  <BodyText size="sm" color="secondary" className="mb-1">
                    {subcategory.description}
                  </BodyText>
                  <Badge variant="default" size="xs">
                    {subcategory.count} items
                  </Badge>
                </motion.button>
              ))}
            </Grid>
          </motion.div>
        )}

        {/* Product Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card variant="secondary" className="p-6">
            <Flex 
              direction={isMobile ? "column" : "row"} 
              justify="between" 
              align={isMobile ? "start" : "center"} 
              gap="md"
            >
              {/* Results Count */}
              <BodyText color="secondary">
                Showing {filteredProducts.length} of {products.length} products
                {activeSubcategory !== 'all' && (
                  <span> in {subcategories.find(s => s.id === activeSubcategory)?.name}</span>
                )}
              </BodyText>

              {/* Controls */}
              <Flex direction="row" align="center" gap="md">
                {/* View Mode Toggle */}
                <div className="flex border border-white/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-accent text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm transition-colors ${
                      viewMode === 'list'
                        ? 'bg-accent text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    List
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                  className="input-enhanced text-sm"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </Flex>
            </Flex>
          </Card>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <Headline className="mb-4">No products found</Headline>
              <BodyText color="secondary" className="mb-6">
                No products match your current selection. Try browsing other subcategories.
              </BodyText>
              <button
                onClick={() => onSubcategoryChange?.('all')}
                className="btn-accent-gradient"
              >
                View All Products
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <ProductGrid
              products={filteredProducts.map(product => ({
                id: product.id,
                name: product.title,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                image: product.image,
                description: product.description,
                availableForSale: product.availableForSale,
                badge: product.featured ? 'Featured' : undefined
              }))}
              onAddToCart={() => {}}
              onQuickView={() => {}}
              loading={false}
              columns={gridColumns}
            />
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card variant="elevated" className="overflow-hidden">
                    <Flex direction="row" gap="md" className="p-6">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <Flex direction="row" justify="between" align="start" className="mb-2">
                          <Headline size="sm" className="line-clamp-1">
                            {product.title}
                          </Headline>
                          <div className="text-right flex-shrink-0 ml-4">
                            <BodyText weight="bold" size="lg" className="text-accent">
                              ${product.price}
                            </BodyText>
                            {product.compareAtPrice && (
                              <BodyText size="sm" color="secondary" className="line-through">
                                ${product.compareAtPrice}
                              </BodyText>
                            )}
                          </div>
                        </Flex>
                        
                        <BodyText color="secondary" size="sm" className="line-clamp-2 mb-3">
                          {product.description}
                        </BodyText>
                        
                        <Flex direction="row" justify="between" align="center">
                          <Flex direction="row" gap="xs">
                            {product.featured && (
                              <Badge variant="info" size="xs">Featured</Badge>
                            )}
                            {!product.availableForSale && (
                              <Badge variant="warning" size="xs">Out of Stock</Badge>
                            )}
                            {product.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="default" size="xs">
                                {tag}
                              </Badge>
                            ))}
                          </Flex>
                          
                          <button
                            disabled={!product.availableForSale}
                            className="btn-accent-gradient text-sm px-4 py-2"
                          >
                            {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </Flex>
                      </div>
                    </Flex>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};