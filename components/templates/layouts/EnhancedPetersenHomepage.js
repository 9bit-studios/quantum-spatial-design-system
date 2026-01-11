'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuantumSpatialButton, QuantumSpatialCard, QuantumSpatialNavigation, QuantumSpatialInput, PetersenProductCard } from './quantum-spatial';
import { getAllProducts } from '../lib/shopify';
import { debounce } from '../lib/utils';
const NAVIGATION_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        icon: (_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }) }))
    },
    {
        id: 'games',
        label: 'Games',
        icon: (_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" }) }))
    },
    {
        id: 'miniatures',
        label: 'Miniatures',
        icon: (_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }))
    },
    {
        id: 'accessories',
        label: 'Accessories',
        icon: (_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) }))
    }
];
const CATEGORIES = [
    { id: 'all', name: 'All Games', count: 0 },
    { id: 'cthulhu-wars', name: 'Cthulhu Wars', count: 0 },
    { id: 'planet-apocalypse', name: 'Planet Apocalypse', count: 0 },
    { id: 'hyperspace', name: 'Hyperspace', count: 0 },
    { id: 'accessories', name: 'Accessories', count: 0 }
];
export const EnhancedPetersenHomepage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState('home');
    const [cartItems, setCartItems] = useState([]);
    // Debounced search function
    const debouncedSearch = debounce((query) => {
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
        }
        catch (error) {
            console.error('Failed to load products:', error);
            // Fallback to mock data for demo
            const mockProducts = [
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
        }
        finally {
            setLoading(false);
        }
    };
    const filterProducts = (query, category) => {
        let filtered = products;
        // Category filter
        if (category !== 'all') {
            filtered = filtered.filter(product => product.tags?.some(tag => tag.toLowerCase().includes(category.replace('-', ' '))) || product.category.toLowerCase().includes(category.replace('-', ' ')));
        }
        // Search filter
        if (query.trim()) {
            filtered = filtered.filter(product => product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description?.toLowerCase().includes(query.toLowerCase()) ||
                product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
        }
        setFilteredProducts(filtered);
    };
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleAddToCart = (productId) => {
        setCartItems(prev => [...prev, productId]);
        // Show success notification (implementation depends on your notification system)
        console.log(`Added product ${productId} to cart`);
    };
    const handleQuickView = (productId) => {
        // Implementation for quick view modal
        console.log(`Quick view for product ${productId}`);
    };
    return (_jsxs("div", { className: "min-h-screen bg-black text-white", children: [_jsx(QuantumSpatialNavigation, { items: NAVIGATION_ITEMS, activeItem: activeNavItem, onItemClick: (item) => setActiveNavItem(item.id), variant: "horizontal", quantum: true, logo: _jsxs(motion.div, { className: "flex items-center gap-3", whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "P" }) }), _jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent", children: "Petersen Games" })] }) }), _jsxs("section", { className: "relative py-20 lg:py-32 overflow-hidden", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { className: "text-center max-w-4xl mx-auto", initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, children: [_jsx(motion.div, { className: "inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-6", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2, duration: 0.6 }, children: "Legendary Gaming Experiences" }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight", children: ["Enter Worlds of", _jsx("br", {}), _jsx("span", { className: "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "Cosmic Horror" })] }), _jsx("p", { className: "text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto", children: "Discover premium board games, miniatures, and RPG accessories from the masters of strategic horror gaming." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(QuantumSpatialButton, { variant: "primary", size: "lg", quantum: true, onClick: () => setActiveCategory('all'), children: "Shop Collection" }), _jsx(QuantumSpatialButton, { variant: "secondary", size: "lg", quantum: true, children: "Learn More" })] })] }) }), _jsxs("div", { className: "absolute inset-0 -z-10", children: [_jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" }), _jsx("div", { className: "absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" })] })] }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(QuantumSpatialCard, { variant: "glass", padding: "lg", className: "mb-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-center", children: [_jsx("div", { className: "flex-1 w-full lg:max-w-md", children: _jsx(QuantumSpatialInput, { variant: "search", placeholder: "Search games, miniatures, accessories...", value: searchQuery, onChange: handleSearchChange, leftIcon: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }), quantum: true }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((category) => (_jsx(QuantumSpatialButton, { variant: activeCategory === category.id ? "accent" : "ghost", size: "sm", quantum: true, onClick: () => handleCategoryChange(category.id), children: category.name }, category.id))) })] }) }) }) }), _jsx("section", { className: "py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold", children: activeCategory === 'all' ? 'All Products' :
                                        CATEGORIES.find(c => c.id === activeCategory)?.name || 'Products' }), _jsxs("span", { className: "text-gray-400", children: [filteredProducts.length, " ", filteredProducts.length === 1 ? 'product' : 'products'] })] }), _jsx(AnimatePresence, { mode: "wait", children: loading ? (_jsx(motion.div, { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: Array.from({ length: 8 }).map((_, index) => (_jsxs(QuantumSpatialCard, { variant: "glass", padding: "none", className: "animate-pulse", children: [_jsx("div", { className: "aspect-square bg-gray-800 rounded-t-2xl" }), _jsxs("div", { className: "p-4 space-y-3", children: [_jsx("div", { className: "h-4 bg-gray-700 rounded" }), _jsx("div", { className: "h-6 bg-gray-700 rounded" }), _jsx("div", { className: "h-4 bg-gray-700 rounded w-3/4" })] })] }, index))) })) : filteredProducts.length === 0 ? (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, className: "text-center py-20", children: _jsxs(QuantumSpatialCard, { variant: "glass", padding: "xl", className: "max-w-md mx-auto", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDD0D" }), _jsx("h3", { className: "text-2xl font-bold mb-4", children: "No products found" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Try adjusting your search or filter criteria" }), _jsx(QuantumSpatialButton, { variant: "primary", onClick: () => {
                                                setSearchQuery('');
                                                setActiveCategory('all');
                                            }, children: "Clear Filters" })] }) })) : (_jsx(motion.div, { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: filteredProducts.map((product, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: {
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.16, 1, 0.3, 1]
                                    }, children: _jsx(PetersenProductCard, { product: product, onAddToCart: handleAddToCart, onQuickView: handleQuickView, quantum: true }) }, product.id))) })) })] }) }), _jsx("section", { className: "py-20 border-t border-white/10", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(QuantumSpatialCard, { variant: "elevated", padding: "xl", className: "text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("div", { className: "text-4xl mb-6", children: "\uD83D\uDCEC" }), _jsx("h3", { className: "text-3xl font-bold mb-4", children: "Stay in the Loop" }), _jsx("p", { className: "text-gray-300 mb-8 max-w-2xl mx-auto", children: "Get notified about new releases, exclusive offers, and epic gaming events from the cosmic realms." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 max-w-lg mx-auto", children: [_jsx(QuantumSpatialInput, { type: "email", placeholder: "Enter your email", variant: "email", quantum: true, className: "flex-1" }), _jsx(QuantumSpatialButton, { variant: "accent", size: "md", quantum: true, children: "Subscribe" })] })] }) }) }) }), _jsx("footer", { className: "py-16 border-t border-white/10 bg-black/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-12", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-xl font-bold", children: "Petersen Games" }), _jsx("p", { className: "text-gray-400", children: "Crafting legendary gaming experiences in the realms of cosmic horror since 1999." })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h5", { className: "font-semibold text-purple-400 uppercase tracking-wide", children: "Shop" }), _jsx("div", { className: "space-y-2", children: CATEGORIES.slice(1).map((category) => (_jsx("button", { onClick: () => handleCategoryChange(category.id), className: "block text-gray-400 hover:text-white transition-colors text-left", children: category.name }, category.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h5", { className: "font-semibold text-purple-400 uppercase tracking-wide", children: "Support" }), _jsxs("div", { className: "space-y-2 text-gray-400", children: [_jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Help Center" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Shipping Info" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Returns" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Contact Us" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h5", { className: "font-semibold text-purple-400 uppercase tracking-wide", children: "Company" }), _jsxs("div", { className: "space-y-2 text-gray-400", children: [_jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "About" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Terms of Service" }), _jsx("a", { href: "#", className: "block hover:text-white transition-colors", children: "Careers" })] })] })] }), _jsx("div", { className: "pt-8 border-t border-white/10 text-center text-gray-400", children: _jsx("p", { children: "\u00A9 2025 Petersen Games. All rights reserved. | Enhanced by Apple Intelligence Strategic Director" }) })] }) })] }));
};
export default EnhancedPetersenHomepage;
//# sourceMappingURL=EnhancedPetersenHomepage.js.map