
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { Icons } from './ui/Icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 pr-2">
              {product.name}
            </h3>
            <p className="text-base font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
            </div>
            <p className="ml-2 text-xs text-gray-500 dark:text-gray-400">{product.reviews} reviews</p>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2">
         <button onClick={handleWishlistToggle} className="p-2 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          <Icons.Heart className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
        </button>
      </div>
       {product.isEcoFriendly && (
        <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                <Icons.Leaf className="h-3 w-3 mr-1"/> Eco-Friendly
            </span>
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
        <button 
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
