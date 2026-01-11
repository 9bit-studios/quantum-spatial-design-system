// Example usage of Petersen Games components
// App.tsx or your main layout component

import React, { useState } from 'react';
import NavLayout from './components/NavLayout';
import { ProductCard, ProductGrid, FilterModal } from './components/NavLayout';

// Sample product data - replace with your Shopify data
const sampleProducts = [
  {
    id: 'tcho-tcho-tribes',
    title: 'Tcho-Tcho Tribes',
    description: 'Strategic depth meets cosmic horror in this legendary board game experience.',
    price: 6.99,
    comparePrice: 9.99,
    image: '/images/tcho-tcho-tribes.jpg',
    imageAlt: 'Tcho-Tcho Tribes game box',
    href: '/products/tcho-tcho-tribes',
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
// Shopify Integration Example
// ===================================================

// If integrating with Shopify, here's how you might fetch and transform data:

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
  tags: string[];
  availableForSale: boolean;
}

const transformShopifyProduct = (shopifyProduct: ShopifyProduct) => ({
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
  badge: getBadgeFromTags(shopifyProduct.tags),
  inStock: shopifyProduct.availableForSale
});

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