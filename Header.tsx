
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Icons } from './ui/Icons';
import ThemeToggle from './ui/ThemeToggle';

const Header: React.FC = () => {
  const { cartCount, wishlistCount, isAuthenticated } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { path: '/shop/Streetwear & Fashion', label: 'Streetwear' },
    { path: '/shop/Tech Gadgets', label: 'Tech' },
    { path: '/shop/Skincare & Beauty', label: 'Beauty' },
    { path: '/shop/Sneakers', label: 'Sneakers' },
    { path: '/shop/Accessories', label: 'Accessories' },
  ];
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    if (query) {
      navigate(`/shop?search=${query}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-black text-primary-600 dark:text-primary-400">
              VibeCart
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-500 ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <input 
                name="search"
                type="search" 
                placeholder="Search products..." 
                className="w-40 lg:w-64 pl-10 pr-4 py-2 text-sm rounded-full border bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <ThemeToggle />
            <Link to="/account/wishlist" className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Icons.Heart className="h-5 w-5" />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Icons.ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-xs text-white">{cartCount}</span>}
            </Link>
            <Link to={isAuthenticated ? "/account" : "/auth"} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Icons.User className="h-5 w-5" />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              {isMenuOpen ? <Icons.X className="h-5 w-5" /> : <Icons.Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
             <form onSubmit={handleSearch} className="mt-4 sm:hidden relative">
              <input 
                name="search"
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full border bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
