// ===================================================
// ALIGNED TAG-BASED EXAMPLE - SAME DESIGN, TAG DATA
// ===================================================

import React, { useState } from 'react';
import AlignedTagNavigation from './components/AlignedTagNavigation';

// Same product structure, but with tags array instead of collection URLs
const sampleProductsWithTags = [
  {
    id: 'tcho-tcho-tribes',
    title: 'Tcho-Tcho Tribes',
    description: 'Strategic depth meets cosmic horror in this legendary board game experience.',
    price: 6.99,
    comparePrice: 9.99,
    image: '/images/tcho-tcho-tribes.jpg',
    imageAlt: 'Tcho-Tcho Tribes game box',
    href: '/products/tcho-tcho-tribes',
    // KEY DIFFERENCE: Using tags for filtering instead of collection membership
    tags: ['collection-cw', 'type-faction', 'miniature-great-old-one', 'new-release'],
    badge: 'new' as const,
    inStock: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: 'rock-a-bye-cthulhu',
    title: 'Rock-a-Bye Cthulhu',
    description: 'From cosmic horror to strategic warfare, each game delivers unforgettable terror.',
    price: 9.99,
    comparePrice: 12.99,
    image: '/images/rock-a-bye-cthulhu.jpg',
    imageAlt: 'Rock-a-Bye Cthulhu game',
    href: '/products/rock-a-bye-cthulhu',
    tags: ['collection-cw', 'type-miniature', 'on-sale'],
    badge: 'sale' as const,
    inStock: true,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: 'planet-apocalypse-deluxe',
    title: 'Planet Apocalypse (5e RPG) Deluxe Edition',
    description: 'Strategic mastery. Legendary gameplay. Personal terror.',
    price: 74.99,
    image: '/images/planet-apocalypse-deluxe.jpg',
    imageAlt: 'Planet Apocalypse Deluxe Edition',
    href: '/products/planet-apocalypse-deluxe',
    tags: ['collection-pa', 'type-core-game', 'featured'],
    badge: 'featured' as const,
    inStock: true,
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: 'hyperspace-core',
    title: 'Hyperspace Core Game',
    description: 'Strategic depth meets cosmic horror in this legendary experience.',
    price: 45.99,
    image: '/images/hyperspace-core.jpg',
    imageAlt: 'Hyperspace Core Game',
    href: '/products/hyperspace-core',
    tags: ['collection-hs', 'type-core-game'],
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'evil-high-priest',
    title: 'Evil High Priest Expansion',
    description: 'From the mind of Sandy Petersen comes legendary terror.',
    price: 19.99,
    image: '/images/evil-high-priest.jpg',
    imageAlt: 'Evil High Priest Expansion',
    href: '/products/evil-high-priest',
    tags: ['collection-ehp', 'type-expansion', 'bundle'],
    badge: 'bundle' as const,
    inStock: false,
    rating: 4.5,
    reviewCount: 74
  },
  {
    id: 'great-old-one-set',
    title: 'Great Old One Miniature Set',
    description: 'Legendary gameplay. Personal terror. Strategic mastery.',
    price: 89.99,
    image: '/images/great-old-one-set.jpg',
    imageAlt: 'Great Old One Miniature Set',
    href: '/products/great-old-one-set',
    tags: ['collection-cw', 'type-miniature', 'miniature-great-old-one', 'limited-edition'],
    badge: 'limited' as const,
    inStock: true,
    rating: 4.8,
    reviewCount: 91
  }
];

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(3);

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    setCartCount(prev => prev + 1);
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
  };

  const handleSearch = () => {
    console.log('Search clicked');
  };

  return (
    <AlignedTagNavigation
      products={sampleProductsWithTags}
      cartCount={cartCount}
      onAddToCart={handleAddToCart}
      onQuickView={handleQuickView}
      onSearch={handleSearch}
    />
  );
};

export default App;
  {
    id: 'rock-a-bye-cthulhu',
    title: 'Rock-a-Bye Cthulhu',
    description: 'From cosmic horror to strategic warfare, each game delivers unforgettable terror.',
    price: 9.99,
    comparePrice: 12.99,
    image: '/images/rock-a-bye-cthulhu.jpg',
    imageAlt: 'Rock-a-Bye Cthulhu game',
    href: '/products/rock-a-bye-cthulhu',
    badge: 'sale' as const,
    inStock: true,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: 'planet-apocalypse-deluxe',
    title: 'Planet Apocalypse (5e RPG) Deluxe Edition',
    description: 'Strategic mastery. Legendary gameplay. Personal terror.',
    price: 74.99,
    image: '/images/planet-apocalypse-deluxe.jpg',
    imageAlt: 'Planet Apocalypse Deluxe Edition',
    href: '/products/planet-apocalypse-deluxe',
    badge: 'featured' as const,
    inStock: true,
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: 'hyperspace-core',
    title: 'Hyperspace Core Game',
    description: 'Strategic depth meets cosmic horror in this legendary experience.',
    price: 45.99,
    image: '/images/hyperspace-core.jpg',
    imageAlt: 'Hyperspace Core Game',
    href: '/products/hyperspace-core',
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'evil-high-priest',
    title: 'Evil High Priest Expansion',
    description: 'From the mind of Sandy Petersen comes legendary terror.',
    price: 19.99,
    image: '/images/evil-high-priest.jpg',
    imageAlt: 'Evil High Priest Expansion',
    href: '/products/evil-high-priest',
    badge: 'bundle' as const,
    inStock: false,
    rating: 4.5,
    reviewCount: 74
  },
  {
    id: 'great-old-one-set',
    title: 'Great Old One Miniature Set',
    description: 'Legendary gameplay. Personal terror. Strategic mastery.',
    price: 89.99,
    image: '/images/great-old-one-set.jpg',
    imageAlt: 'Great Old One Miniature Set',
    href: '/products/great-old-one-set',
    badge: 'limited' as const,
    inStock: true,
    rating: 4.8,
    reviewCount: 91
  }
];

const App: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState([
    { id: 'cthulhu-wars', label: 'Cthulhu Wars' },
    { id: '2-4-players', label: '2-4 Players' }
  ]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const handleFilterRemove = (filterId: string) => {
    setActiveFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    setCartCount(prev => prev + 1);
    // Add your cart logic here
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    // Add your quick view modal logic here
  };

  const handleSearch = () => {
    console.log('Search clicked');
    // Add your search modal logic here
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applying filters:', filters);
    // Add your filter logic here
    setIsFilterModalOpen(false);
  };

  return (
    <NavLayout
      cartCount={cartCount}
      activeFilters={activeFilters}
      onFilterRemove={handleFilterRemove}
      onFilterOpen={() => setIsFilterModalOpen(true)}
      onSearch={handleSearch}
    >
      <ProductGrid
        title="Strategic Horror Collection"
        subtitle="From the mind of Sandy Petersen"
        productCount={sampleProducts.length}
      >
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        ))}
      </ProductGrid>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      >
        {/* Filter content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Game Lines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Cthulhu Wars', 'Planet Apocalypse', 'Hyperspace', 'Evil High Priest'].map((line) => (
                <label key={line} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  <input type="checkbox" />
                  {line}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Player Count</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['1-2 Players', '2-4 Players', '3+ Players'].map((count) => (
                <label key={count} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  <input type="checkbox" />
                  {count}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="200" 
              defaultValue="100"
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              <span>$0</span>
              <span>$200</span>
            </div>
          </div>
        </div>
      </FilterModal>
    </NavLayout>
  );
};

export default App;

// ===================================================
// SHOPIFY IMAGE INTEGRATION - IMPORTANT!
// ===================================================

// The images come from the `image` prop you pass to ProductCard
// Here's how to connect them to your Shopify product images:

// ===================================================
// NEXT.JS + SHOPIFY IMAGE INTEGRATION
// ===================================================

// 1. SHOPIFY STOREFRONT API QUERY
const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url          # <- Your product image URL from Shopify CDN
            altText      # <- Alt text for accessibility
            width
            height
          }
          images(first: 5) {
            edges {
              node {
                url      # <- Additional product images
                altText
              }
            }
          }
          tags
          availableForSale
        }
      }
    }
  }
`;

// 2. FETCH PRODUCTS IN NEXT.JS
export async function getStaticProps() {
  const { data } = await shopifyClient.query({
    query: GET_PRODUCTS_QUERY,
    variables: { first: 50 }
  });

  const products = data.products.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    comparePrice: node.compareAtPriceRange?.minVariantPrice
      ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
      : undefined,
    // REAL SHOPIFY IMAGES - These are your actual product photos
    image: node.featuredImage?.url || '/placeholder-product.jpg',
    imageAlt: node.featuredImage?.altText || node.title,
    // Additional images for gallery
    images: node.images.edges.map((edge: any) => ({
      url: edge.node.url,
      altText: edge.node.altText
    })),
    href: `/products/${node.handle}`,
    badge: getBadgeFromTags(node.tags),
    inStock: node.availableForSale
  }));

  return {
    props: { products },
    revalidate: 3600 // Revalidate every hour
  };
}

// 3. NEXT.JS IMAGE OPTIMIZATION
import Image from 'next/image';

// Update the ProductCard component to use Next.js Image:
const ProductCard: React.FC<ProductCardProps> = ({ image, imageAlt, title, ...props }) => {
  return (
    <div className="product-card">
      <div className="product-card-image-container">
        {/* Next.js optimized image */}
        <Image
          src={image || '/placeholder-product.jpg'}
          alt={imageAlt || title}
          width={300}
          height={300}
          className="product-card-image"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={false} // Set to true for above-the-fold images
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      {/* ... rest of component */}
    </div>
  );
};
interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    url: string;        // <- This is your product image URL from Shopify CDN
    altText: string;    // <- This is your alt text
  };
  handle: string;
  tags: string[];
  availableForSale: boolean;
}

// ===================================================
// SHOPIFY INTEGRATION - ALIGNED WITH TAG SYSTEM
// ===================================================

// Same Shopify product structure, but we use the tags field
interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    url: string;
    altText: string;
  };
  handle: string;
  tags: string[];  // This is the key - Shopify's existing tags field!
  availableForSale: boolean;
}

// Transform Shopify data for tag-based navigation (same as before, just using tags)
const transformShopifyProductForTags = (shopifyProduct: ShopifyProduct) => ({
  id: shopifyProduct.id,
  title: shopifyProduct.title,
  description: shopifyProduct.description,
  price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
  comparePrice: shopifyProduct.compareAtPriceRange 
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : undefined,
  image: shopifyProduct.featuredImage.url,
  imageAlt: shopifyProduct.featuredImage.altText,
  href: `/products/${shopifyProduct.handle}`,
  tags: shopifyProduct.tags, // Direct use of Shopify tags - no transformation needed!
  badge: getBadgeFromTags(shopifyProduct.tags),
  inStock: shopifyProduct.availableForSale
});

// Same badge logic, just checking tags array
const getBadgeFromTags = (tags: string[]): 'new' | 'sale' | 'featured' | 'bundle' | 'limited' | undefined => {
  if (tags.includes('new-release')) return 'new';
  if (tags.includes('on-sale')) return 'sale';
  if (tags.includes('featured')) return 'featured';
  if (tags.includes('bundle')) return 'bundle';
  if (tags.includes('limited-edition')) return 'limited';
  return undefined;
};

// ===================================================
// NEXT.JS IMPLEMENTATION - TAG-BASED SINGLE PAGE
// ===================================================

// pages/products.tsx - Single page instead of multiple collection pages
import { GetStaticProps } from 'next';
import { shopifyClient } from '../lib/shopify';
import AlignedTagNavigation from '../components/AlignedTagNavigation';

interface ProductsPageProps {
  products: any[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <AlignedTagNavigation
      products={products}
      cartCount={0}
      onAddToCart={(id) => console.log('Add to cart:', id)}
      onQuickView={(id) => console.log('Quick view:', id)}
      onSearch={() => console.log('Search')}
    />
  );
};

// Single data fetch instead of multiple collection pages
export const getStaticProps: GetStaticProps = async () => {
  // Fetch ALL products once (instead of per-collection)
  const products = await fetchAllProducts();

  return {
    props: {
      products: products.map(transformShopifyProductForTags)
    },
    revalidate: 3600
  };
};

// No getStaticPaths needed - single page instead of dynamic routes
export default ProductsPage;

// 3. FOR YOUR UPLOADED CSV DATA:
// If using the enhanced CSV you uploaded, the images would come from the "Image Src" column
const transformCSVProduct = (csvRow: any) => ({
  id: csvRow.Handle,
  title: csvRow.Title,
  description: csvRow['Body (HTML)'],
  price: parseFloat(csvRow['Variant Price']),
  // CSV IMAGE SOURCE - From your "Image Src" column
  image: csvRow['Image Src'],  // Example: "https://cdn.shopify.com/s/files/1/0234/5678/products/your-image.jpg"
  imageAlt: csvRow['Image Alt Text'] || csvRow.Title,
  href: `/products/${csvRow.Handle}`,
  inStock: csvRow['Variant Inventory Qty'] !== '0'
});

// 4. SHOPIFY IMAGE OPTIMIZATION:
// Shopify provides automatic image resizing, so you can optimize like this:
const getOptimizedShopifyImage = (originalUrl: string, size: string = '600x600') => {
  if (!originalUrl) return '/placeholder-image.jpg';
  
  // Shopify images can be resized by adding size parameters
  if (originalUrl.includes('cdn.shopify.com')) {
    // Remove existing size parameters and add new ones
    const baseUrl = originalUrl.split('?')[0];
    return `${baseUrl}?v=${Date.now()}&width=600&height=600&crop=center`;
  }
  
  return originalUrl;
};

// 4. NEXT.JS CONFIGURATION FOR SHOPIFY IMAGES
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.shopify.com',
      // Add your specific Shopify domain
      'petersengames.myshopify.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig;

// 5. SHOPIFY CLIENT SETUP
// lib/shopify.ts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'https://petersengames.myshopify.com',
  apiVersion: '2024-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

export { client as shopifyClient };

// 6. ENVIRONMENT VARIABLES
// .env.local
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_STORE_DOMAIN=petersengames.myshopify.com

// 7. COMPLETE PAGE IMPLEMENTATION
// pages/collections/[handle].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { shopifyClient } from '../../lib/shopify';
import NavLayout from '../../components/NavLayout';
import { ProductCard, ProductGrid } from '../../components/NavLayout';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;      // <- This comes from Shopify CDN
  imageAlt: string;
  href: string;
  badge?: 'new' | 'sale' | 'featured' | 'bundle' | 'limited';
  inStock: boolean;
}

interface CollectionPageProps {
  products: Product[];
  collection: {
    title: string;
    description: string;
  };
}

export default function CollectionPage({ products, collection }: CollectionPageProps) {
  return (
    <NavLayout cartCount={0} activeFilters={[]}>
      <ProductGrid
        title={collection.title}
        subtitle={collection.description}
        productCount={products.length}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onQuickView={(id) => console.log('Quick view:', id)}
          />
        ))}
      </ProductGrid>
    </NavLayout>
  );
}

const getBadgeFromTags = (tags: string[]): 'new' | 'sale' | 'featured' | 'bundle' | 'limited' | undefined => {
  if (tags.includes('new')) return 'new';
  if (tags.includes('sale')) return 'sale';
  if (tags.includes('featured')) return 'featured';
  if (tags.includes('bundle')) return 'bundle';
  if (tags.includes('limited')) return 'limited';
  return undefined;
};

// ===================================================
// Next.js Page Example
// ===================================================

// pages/collections/[handle].tsx
import { GetStaticProps, GetStaticPaths } from 'next';

interface CollectionPageProps {
  collection: {
    title: string;
    description: string;
    handle: string;
  };
  products: any[]; // Replace with your product type
}

const CollectionPage: React.FC<CollectionPageProps> = ({ collection, products }) => {
  return (
    <NavLayout cartCount={0} activeFilters={[]}>
      <ProductGrid
        title={collection.title}
        subtitle={collection.description}
        productCount={products.length}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onQuickView={(id) => console.log('Quick view:', id)}
          />
        ))}
      </ProductGrid>
    </NavLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch collection and products from Shopify
  const collection = await fetchCollection(params?.handle as string);
  const products = await fetchCollectionProducts(params?.handle as string);

  return {
    props: {
      collection,
      products: products.map(transformShopifyProduct)
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await fetchAllCollections();
  
  return {
    paths: collections.map((collection: any) => ({
      params: { handle: collection.handle }
    })),
    fallback: 'blocking'
  };
};

export default CollectionPage;