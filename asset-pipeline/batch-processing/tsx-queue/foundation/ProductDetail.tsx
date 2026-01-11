'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Grid, Flex, Card } from './GridSystem';
import { DisplayText, Headline, BodyText, Price, Badge } from './Typography';
import { AnimatedButton } from './PerformanceComponents';
import { useResponsiveGrid } from './ResponsiveHooks';

// Product Detail Component - Full product view with enhanced UI

export interface ProductDetailProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: ProductData, quantity: number) => void;
}

export interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  availableForSale: boolean;
  vendor: string;
  productType: string;
  specs?: Record<string, string>;
  reviews?: ProductReview[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

export interface ProductReview {
  id: string;
  rating: number;
  author: string;
  content: string;
  date: string;
}

// Mock product data - replace with actual Shopify integration
const MOCK_PRODUCT: ProductData = {
  id: 'cthulhu-wars-core',
  title: 'Cthulhu Wars: Core Game',
  description: 'The most successful Lovecraftian board game ever made! Take control of alien races seeded across the galaxy to harvest human populations for energy. Command mighty armies across the cosmos.',
  price: 149.99,
  compareAtPrice: 179.99,
  images: [
    '/images/cthulhu-wars-main.jpg',
    '/images/cthulhu-wars-pieces.jpg',
    '/images/cthulhu-wars-board.jpg',
    '/images/cthulhu-wars-box.jpg'
  ],
  variants: [
    {
      id: 'standard',
      title: 'Standard Edition',
      price: 149.99,
      availableForSale: true,
      selectedOptions: [{ name: 'Edition', value: 'Standard' }]
    },
    {
      id: 'deluxe',
      title: 'Deluxe Edition',
      price: 199.99,
      availableForSale: true,
      selectedOptions: [{ name: 'Edition', value: 'Deluxe' }]
    }
  ],
  tags: ['strategy', 'horror', 'miniatures', 'new'],
  availableForSale: true,
  vendor: 'Petersen Games',
  productType: 'Board Game',
  specs: {
    'Players': '2-4',
    'Play Time': '90-120 minutes',
    'Age': '14+',
    'Complexity': 'High',
    'Components': '100+ miniatures, game board, cards, tokens'
  },
  reviews: [
    {
      id: '1',
      rating: 5,
      author: 'BoardGameGeek User',
      content: 'Absolutely incredible game with amazing miniatures and strategic depth.',
      date: '2024-01-15'
    },
    {
      id: '2', 
      rating: 4,
      author: 'Strategy Gamer',
      content: 'Love the asymmetric gameplay and Lovecraftian theme.',
      date: '2024-01-10'
    }
  ]
};

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const { isMobile } = useResponsiveGrid();

  useEffect(() => {
    if (isOpen && productId) {
      // In real implementation, fetch product data from Shopify
      setProduct(MOCK_PRODUCT);
      setSelectedVariant(MOCK_PRODUCT.variants[0]);
    }
  }, [isOpen, productId]);

  const handleAddToCart = () => {
    if (product && selectedVariant && onAddToCart) {
      const productWithVariant = {
        ...product,
        price: selectedVariant.price,
        selectedVariant
      };
      onAddToCart(productWithVariant, quantity);
    }
  };

  const getDiscountPercentage = () => {
    if (product?.compareAtPrice && product.price) {
      return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    }
    return 0;
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <Container className="relative min-h-screen py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="elevated" className="overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <Flex direction="row" justify="between" align="center">
                    <div>
                      <Badge variant="info" size="sm" className="mb-2">
                        {product.productType}
                      </Badge>
                      <Headline className="text-white">{product.title}</Headline>
                      <BodyText color="secondary" size="sm">
                        by {product.vendor}
                      </BodyText>
                    </div>
                    
                    <button
                      onClick={onClose}
                      className="nav-action"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </Flex>
                </div>

                {/* Main Content */}
                <div className="p-6">
                  <Grid columns={isMobile ? "1" : "2"} gap="xl">
                    {/* Images */}
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                        <motion.img
                          key={selectedImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          src={product.images[selectedImage]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Thumbnail Gallery */}
                      <Flex direction="row" gap="sm" wrap>
                        {product.images.map((image, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                              selectedImage === index 
                                ? 'border-accent' 
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </Flex>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                      {/* Pricing */}
                      <div>
                        <Flex direction="row" align="center" gap="md">
                          <Price amount={selectedVariant?.price || product.price} size="xl" />
                          {product.compareAtPrice && (
                            <>
                              <span className="text-white/50 line-through text-lg">
                                ${product.compareAtPrice}
                              </span>
                              <Badge variant="success" size="sm">
                                {getDiscountPercentage()}% off
                              </Badge>
                            </>
                          )}
                        </Flex>
                        
                        {product.availableForSale ? (
                          <Badge variant="success" size="sm" className="mt-2">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="warning" size="sm" className="mt-2">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      {/* Variants */}
                      {product.variants.length > 1 && (
                        <div>
                          <BodyText weight="semibold" className="mb-3">
                            Edition:
                          </BodyText>
                          <Flex direction="row" gap="sm" wrap>
                            {product.variants.map((variant) => (
                              <motion.button
                                key={variant.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 rounded-lg border transition-all ${
                                  selectedVariant?.id === variant.id
                                    ? 'border-accent bg-accent/20 text-white'
                                    : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                                }`}
                              >
                                <BodyText size="sm" weight="medium">
                                  {variant.title}
                                </BodyText>
                                <BodyText size="sm" color="secondary">
                                  ${variant.price}
                                </BodyText>
                              </motion.button>
                            ))}
                          </Flex>
                        </div>
                      )}

                      {/* Quantity */}
                      <div>
                        <BodyText weight="semibold" className="mb-3">
                          Quantity:
                        </BodyText>
                        <Flex direction="row" align="center" gap="md">
                          <div className="flex items-center border border-white/20 rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="px-3 py-2 text-white hover:bg-white/10 transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 text-white border-x border-white/20">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="px-3 py-2 text-white hover:bg-white/10 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </Flex>
                      </div>

                      {/* Add to Cart */}
                      <div className="space-y-3">
                        <AnimatedButton
                          onClick={handleAddToCart}
                          disabled={!product.availableForSale}
                          className="btn-accent-gradient w-full"
                          size="lg"
                        >
                          Add to Cart - ${((selectedVariant?.price || product.price) * quantity).toFixed(2)}
                        </AnimatedButton>
                        
                        <AnimatedButton
                          variant="secondary"
                          className="w-full"
                        >
                          Add to Wishlist
                        </AnimatedButton>
                      </div>

                      {/* Tags */}
                      <Flex direction="row" gap="sm" wrap>
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </Flex>
                    </div>
                  </Grid>

                  {/* Tabs Section */}
                  <div className="mt-12">
                    {/* Tab Navigation */}
                    <Flex direction="row" gap="md" className="border-b border-white/10 mb-6">
                      {[
                        { id: 'description', label: 'Description' },
                        { id: 'specs', label: 'Specifications' },
                        { id: 'reviews', label: 'Reviews' }
                      ].map((tab) => (
                        <motion.button
                          key={tab.id}
                          whileHover={{ y: -2 }}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`pb-3 relative ${
                            activeTab === tab.id
                              ? 'text-accent'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <BodyText weight="medium">{tab.label}</BodyText>
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="tab-indicator"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                            />
                          )}
                        </motion.button>
                      ))}
                    </Flex>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === 'description' && (
                          <BodyText color="secondary" className="leading-relaxed">
                            {product.description}
                          </BodyText>
                        )}

                        {activeTab === 'specs' && product.specs && (
                          <div className="space-y-4">
                            {Object.entries(product.specs).map(([key, value]) => (
                              <Flex key={key} direction="row" justify="between" align="start">
                                <BodyText weight="medium" className="text-white">
                                  {key}:
                                </BodyText>
                                <BodyText color="secondary" className="text-right flex-1 ml-4">
                                  {value}
                                </BodyText>
                              </Flex>
                            ))}
                          </div>
                        )}

                        {activeTab === 'reviews' && (
                          <div className="space-y-6">
                            {product.reviews?.map((review) => (
                              <div key={review.id} className="p-4 bg-white/5 rounded-lg">
                                <Flex direction="row" justify="between" align="start" className="mb-3">
                                  <div>
                                    <BodyText weight="medium">{review.author}</BodyText>
                                    <Flex direction="row" gap="xs" className="mt-1">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                          key={i}
                                          className={`text-sm ${
                                            i < review.rating ? 'text-yellow-400' : 'text-white/20'
                                          }`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </Flex>
                                  </div>
                                  <BodyText size="sm" color="secondary">
                                    {new Date(review.date).toLocaleDateString()}
                                  </BodyText>
                                </Flex>
                                <BodyText color="secondary">
                                  {review.content}
                                </BodyText>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};