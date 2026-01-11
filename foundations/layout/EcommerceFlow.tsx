'use client';

import React from 'react';
import { Container, Grid, Flex, Card } from './GridSystem';
import { Typography, Price, Badge, Link } from './Typography';

// Ecommerce Foundation Components - No Inline Styles

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    price: number;
    images: Array<{ url: string; altText?: string }>;
    tags?: string[];
    availableForSale: boolean;
  };
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = ''
}) => {
  const handleAddToCart = () => {
    if (onAddToCart && product.availableForSale) {
      onAddToCart(product.id);
    }
  };

  return (
    <Card variant="product" className={`group ${className}`}>
      {/* Product Image */}
      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
        {product.images[0] && (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Product Info */}
      <Flex direction="col" gap="sm">
        <Typography variant="title" className="line-clamp-2">
          {product.title}
        </Typography>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <Flex direction="row" gap="sm" className="flex-wrap">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </Flex>
        )}

        {/* Price and Add to Cart */}
        <Flex direction="row" justify="between" align="center">
          <Price amount={product.price} size="md" />
          
          {product.availableForSale ? (
            <Link variant="button" onClick={handleAddToCart}>
              Add to Cart
            </Link>
          ) : (
            <Badge variant="error">Sold Out</Badge>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export interface ProductGridProps {
  products: Array<ProductCardProps['product']>;
  onAddToCart?: (productId: string) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  loading = false,
  emptyState,
  className = ''
}) => {
  if (loading) {
    return (
      <Grid columns="auto" gap="lg" className={className}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} variant="glass" className="animate-pulse">
            <div className="aspect-square bg-gray-800 rounded-lg mb-4" />
            <div className="h-4 bg-gray-800 rounded mb-2" />
            <div className="h-3 bg-gray-800 rounded w-2/3" />
          </Card>
        ))}
      </Grid>
    );
  }

  if (products.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <Grid columns="auto" gap="lg" className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </Grid>
  );
};

export interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    count?: number;
  }>;
  activeCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  return (
    <Flex direction="row" gap="sm" className={`flex-wrap ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`tab-item-enhanced ${
            activeCategory === category.id ? 'active' : ''
          }`}
        >
          {category.name}
          {category.count && (
            <Badge variant="default" size="sm" className="ml-2">
              {category.count}
            </Badge>
          )}
        </button>
      ))}
    </Flex>
  );
};

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
  className = ''
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Flex direction="row" gap="sm">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-enhanced flex-1"
        />
        <button
          type="submit"
          className="btn-primary-glass"
        >
          Search
        </button>
      </Flex>
    </form>
  );
};

export interface CartSummaryProps {
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  onCheckout?: () => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  total,
  onCheckout,
  onUpdateQuantity,
  className = ''
}) => {
  return (
    <Card variant="elevated" className={className}>
      <Typography variant="title" className="mb-4">
        Cart Summary
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body" color="secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          {/* Cart Items */}
          <Flex direction="col" gap="sm" className="mb-6">
            {items.map((item) => (
              <Flex key={item.id} direction="row" justify="between" align="center">
                <Flex direction="col" gap="sm" className="flex-1">
                  <Typography variant="body" className="line-clamp-1">
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Qty: {item.quantity}
                  </Typography>
                </Flex>
                <Price amount={item.price * item.quantity} size="sm" />
              </Flex>
            ))}
          </Flex>

          {/* Total */}
          <Flex direction="row" justify="between" align="center" className="pt-4 border-t border-gray-800 mb-6">
            <Typography variant="title">Total</Typography>
            <Price amount={total} size="lg" />
          </Flex>

          {/* Checkout Button */}
          {onCheckout && (
            <Link variant="button" onClick={onCheckout} className="w-full justify-center">
              Proceed to Checkout
            </Link>
          )}
        </>
      )}
    </Card>
  );
};

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  onCtaClick,
  className = ''
}) => {
  return (
    <section className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <Container>
        <Flex direction="col" align="center" gap="lg" className="text-center relative z-10">
          {subtitle && (
            <Typography variant="label" color="accent" className="uppercase tracking-wide">
              {subtitle}
            </Typography>
          )}
          
          <DisplayText className="max-w-4xl">
            {title}
          </DisplayText>
          
          {description && (
            <Typography variant="body" size="lg" color="secondary" className="max-w-2xl">
              {description}
            </Typography>
          )}
          
          {ctaText && onCtaClick && (
            <Link variant="button" onClick={onCtaClick} className="btn-accent-gradient mt-4">
              {ctaText}
            </Link>
          )}
        </Flex>
      </Container>
    </section>
  );
};