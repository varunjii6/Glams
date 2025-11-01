
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useAppContext } from '../hooks/useAppContext';
import { Icons } from '../components/ui/Icons';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="mt-4 inline-block text-primary-600 hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }
  
  const isWishlisted = isInWishlist(product.id);
  const handleWishlistToggle = () => {
    if(isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border dark:border-gray-700 mb-4">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setActiveImage(index)} className={`w-1/4 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-primary-500' : 'border-transparent'}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-3xl text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <Icons.Star className="w-5 h-5 text-yellow-400" fill="currentColor"/>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>
          
           {product.isEcoFriendly && (
            <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    <Icons.Leaf className="h-4 w-4 mr-1.5"/> Eco-Friendly Product
                </span>
            </div>
          )}

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
              <p>{product.description}</p>
            </div>
          </div>
          
          <div className="mt-auto pt-8">
            <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg dark:border-gray-600">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Icons.Minus className="h-4 w-4"/></button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="p-3"><Icons.Plus className="h-4 w-4"/></button>
                </div>
                <button 
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    Add to Cart
                </button>
                 <button onClick={handleWishlistToggle} className="p-3 border rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                     <Icons.Heart className={`h-6 w-6 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                 </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">{product.stock} in stock</p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
