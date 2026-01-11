'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { QuantumSpatialCard } from './QuantumSpatialCard';
import { QuantumSpatialButton } from './QuantumSpatialButton';

interface GameStats {
  players: string;
  playTime: string;
  ageRange: string;
  complexity?: number; // 1-5 scale
}

interface QuantumSpatialProduct {
  id: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  category: string;
  tags?: string[];
  gameStats?: GameStats;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  variants?: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;
}

interface QuantumSpatialProductCardProps {
  product: QuantumSpatialProduct;
  onAddToCart?: (productId: string, variantId?: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
  quantum?: boolean;
}

/**
 * Apple HIG Compliant QuantumSpatial Games Product Card
 * - Optimized for gaming product display
 * - Game statistics prominently featured
 * - Quantum-spatial design aesthetic
 * - 44px minimum touch targets
 * - Full accessibility support
 */
export const QuantumSpatialProductCard: React.FC<QuantumSpatialProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  className,
  quantum = true,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    id,
    title,
    description,
    price,
    compareAtPrice,
    image,
    images = [image],
    category,
    tags = [],
    gameStats,
    inStock,
    featured,
    new: isNew,
    variants = []
  } = product;

  const isOnSale = compareAtPrice && compareAtPrice > price;
  const discountPercentage = isOnSale 
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (inStock && onAddToCart) {
      // Find the first available variant or use product ID
      const availableVariant = variants.find(v => v.availableForSale);
      const variantId = availableVariant?.id;
      onAddToCart(id, variantId);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(id);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <QuantumSpatialCard
      variant="glass"
      padding="none"
      quantum={quantum}
      hover={true}
      className={cn("group overflow-hidden", className)}
      {...props}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-900/50 overflow-hidden">
        {/* Product Image */}
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={title}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>

        {/* Image Navigation (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10 4L6 8l4 4V4z" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 4l4 4-4 4V4z" />
              </svg>
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <motion.span
              className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              NEW
            </motion.span>
          )}
          {featured && (
            <motion.span
              className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              FEATURED
            </motion.span>
          )}
          {isOnSale && (
            <motion.span
              className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              -{discountPercentage}%
            </motion.span>
          )}
        </div>

        {/* Stock status */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Quick view button */}
        <motion.button
          onClick={handleQuickView}
          className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Quick view"
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-blue-400 font-medium uppercase tracking-wide">
          {category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Game Stats */}
        {gameStats && (
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10">
            <div className="text-center">
              <div className="text-xs text-gray-400">Players</div>
              <div className="text-sm font-semibold text-white">{gameStats.players}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Time</div>
              <div className="text-sm font-semibold text-white">{gameStats.playTime}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Age</div>
              <div className="text-sm font-semibold text-white">{gameStats.ageRange}</div>
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-300 line-clamp-2">
            {description}
          </p>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">
                ${price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through">
                  ${compareAtPrice!.toFixed(2)}
                </span>
              )}
            </div>
            {isOnSale && (
              <span className="text-xs text-green-400">
                Save ${(compareAtPrice! - price).toFixed(2)}
              </span>
            )}
          </div>

          <QuantumSpatialButton
            variant={inStock ? "primary" : "secondary"}
            size="sm"
            disabled={!inStock}
            onClick={handleAddToCart}
            quantum={quantum}
            aria-label={`Add ${title} to cart`}
          >
            {inStock ? "Add to Cart" : "Notify Me"}
          </QuantumSpatialButton>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </QuantumSpatialCard>
  );
};

export default QuantumSpatialProductCard;