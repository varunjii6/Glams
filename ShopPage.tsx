
import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { mockProducts, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Icons } from '../components/ui/Icons';

const ShopPage: React.FC = () => {
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: categoryParam || 'All',
    price: 'all',
    rating: 0,
  });

  const [sort, setSort] = useState('trending');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let products: Product[] = [...mockProducts];

    // Search filter
    if (searchQuery) {
        products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category filter
    if (filters.category !== 'All') {
      products = products.filter(p => p.category === filters.category);
    }

    // Price filter
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number);
      products = products.filter(p => p.price >= min && (max ? p.price <= max : true));
    }
    
    // Rating filter
    if(filters.rating > 0) {
        products = products.filter(p => Math.round(p.rating) >= filters.rating);
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
      default:
        products.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
    }

    return products;
  }, [searchQuery, filters, sort]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingFilter = (rating: number) => {
    setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }));
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="All">All</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <select
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-9999">$200+</option>
        </select>
      </div>
       <div>
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => handleRatingFilter(star)} className="flex items-center space-x-1 p-2 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className={filters.rating >= star ? 'text-yellow-400' : 'text-gray-400'}>{star}</span>
                    <Icons.Star className={`h-4 w-4 ${filters.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" />
                </button>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <FiltersPanel />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4 xl:w-4/5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : filters.category === 'All' ? 'All Products' : filters.category}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{filteredAndSortedProducts.length} items found</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => setIsFiltersOpen(true)} className="lg:hidden flex items-center gap-2 p-2 border rounded-md dark:border-gray-600">
              <Icons.Filter className="h-4 w-4"/>
              <span>Filters</span>
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="trending">Trending</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No products found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>

      {/* Mobile Filters Drawer */}
       {isFiltersOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setIsFiltersOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setIsFiltersOpen(false)}><Icons.X className="h-6 w-6" /></button>
            </div>
            <FiltersPanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
