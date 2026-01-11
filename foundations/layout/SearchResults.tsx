'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Flex, Card } from './GridSystem';
import { DisplayText, Headline, BodyText, Badge } from './Typography';
import { AnimatedProductCard, LoadingSkeleton } from './AnimatedComponents';
import { useResponsiveGrid } from './ResponsiveHooks';
import { useDebouncedSearch } from './PerformanceComponents';

// Search Results Component - Enhanced search experience

export interface SearchResultsProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: SearchResult[];
  loading?: boolean;
  categories?: SearchCategory[];
  onCategoryFilter?: (category: string) => void;
  activeCategory?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type: 'product' | 'article' | 'page';
  relevanceScore: number;
  tags: string[];
}

export interface SearchCategory {
  id: string;
  name: string;
  count: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  onQueryChange,
  results,
  loading = false,
  categories = [],
  onCategoryFilter,
  activeCategory = 'all'
}) => {
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'price'>('relevance');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(results);
  const { isMobile, gridColumns } = useResponsiveGrid();
  const debouncedQuery = useDebouncedSearch(query, 300);

  useEffect(() => {
    let filtered = [...results];

    // Category filter
    if (activeCategory && activeCategory !== 'all') {
      filtered = filtered.filter(result => result.category === activeCategory);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredResults(filtered);
  }, [results, activeCategory, sortBy]);

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return '🎮';
      case 'article': return '📄';
      case 'page': return '🔗';
      default: return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product': return 'Product';
      case 'article': return 'Article';
      case 'page': return 'Page';
      default: return 'Content';
    }
  };

  if (loading) {
    return (
      <Container className="py-12">
        <div className="space-y-8">
          <div className="text-center">
            <DisplayText className="mb-4">Searching...</DisplayText>
            <BodyText color="secondary">Finding the best results for "{query}"</BodyText>
          </div>
          <LoadingSkeleton type="card" count={6} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <DisplayText className="mb-4">
            Search Results
          </DisplayText>
          <BodyText color="secondary" size="lg">
            {filteredResults.length} results for "{query}"
          </BodyText>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card variant="secondary" className="p-6">
            <Flex 
              direction={isMobile ? "column" : "row"} 
              justify="between" 
              align={isMobile ? "start" : "center"} 
              gap="md"
            >
              {/* Category Filters */}
              {categories.length > 0 && (
                <div>
                  <BodyText weight="semibold" className="mb-3">
                    Filter by Category:
                  </BodyText>
                  <Flex direction="row" gap="sm" wrap>
                    <button
                      onClick={() => onCategoryFilter?.('all')}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        activeCategory === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      All ({results.length})
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => onCategoryFilter?.(category.id)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          activeCategory === category.id
                            ? 'bg-accent text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </Flex>
                </div>
              )}

              {/* Sort Controls */}
              <div>
                <BodyText weight="semibold" className="mb-3">
                  Sort by:
                </BodyText>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                  className="input-enhanced text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </Flex>
          </Card>
        </motion.div>

        {/* Results */}
        {filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <Headline className="mb-4">No results found</Headline>
            <BodyText color="secondary" className="mb-6 max-w-md mx-auto">
              We couldn't find anything matching "{query}". Try different keywords or browse our categories.
            </BodyText>
            <button
              onClick={() => onQueryChange('')}
              className="btn-accent-gradient"
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Grid columns={gridColumns} gap="lg">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {result.type === 'product' ? (
                    <AnimatedProductCard
                      product={{
                        id: result.id,
                        name: result.title,
                        price: result.price,
                        image: result.image,
                        description: result.description,
                        availableForSale: true
                      }}
                      onAddToCart={() => {}}
                      onQuickView={() => {}}
                    />
                  ) : (
                    <Card variant="elevated" className="h-full">
                      <div className="p-6 space-y-4">
                        <Flex direction="row" justify="between" align="start">
                          <Badge variant="info" size="sm">
                            {getTypeIcon(result.type)} {getTypeLabel(result.type)}
                          </Badge>
                          <BodyText size="xs" color="secondary">
                            {Math.round(result.relevanceScore * 100)}% match
                          </BodyText>
                        </Flex>

                        <div>
                          <Headline size="sm" className="mb-2 line-clamp-2">
                            {result.title}
                          </Headline>
                          <BodyText color="secondary" size="sm" className="line-clamp-3">
                            {result.description}
                          </BodyText>
                        </div>

                        {result.tags.length > 0 && (
                          <Flex direction="row" gap="xs" wrap>
                            {result.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="default" size="xs">
                                {tag}
                              </Badge>
                            ))}
                          </Flex>
                        )}

                        <button className="btn-secondary-glass w-full text-sm">
                          View {getTypeLabel(result.type)}
                        </button>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        )}

        {/* Search Suggestions */}
        {filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <BodyText color="secondary" size="sm">
              Didn't find what you're looking for? Try searching for:{' '}
              {['miniatures', 'strategy games', 'expansions', 'accessories'].map((suggestion, index) => (
                <span key={suggestion}>
                  <button
                    onClick={() => onQueryChange(suggestion)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {suggestion}
                  </button>
                  {index < 3 && ', '}
                </span>
              ))}
            </BodyText>
          </motion.div>
        )}
      </div>
    </Container>
  );
};