
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-black text-primary-600 dark:text-primary-400">VibeCart</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Your one-stop shop for Gen Z trends.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop/Streetwear & Fashion" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Streetwear</Link></li>
              <li><Link to="/shop/Sneakers" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Sneakers</Link></li>
              <li><Link to="/shop/Tech Gadgets" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Tech</Link></li>
              <li><Link to="/shop/Accessories" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Shipping</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} VibeCart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {/* Social media links would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
