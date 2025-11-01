
import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Icons } from '../components/ui/Icons';

const HomePage: React.FC = () => {
  const trendingProducts = mockProducts.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-700 dark:to-purple-800 text-white rounded-2xl p-8 md:p-16 flex items-center justify-center text-center overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">CATCH THE VIBE</h1>
          <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-primary-100">
            The freshest drops in fashion, tech, and more. Curated for your generation.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map(category => (
            <Link key={category} to={`/shop/${category}`} className="group relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden block">
               <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/seed/${category}/400/400)`}}></div>
               <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <h3 className="text-white text-lg font-bold text-center p-2">{category.split(' & ')[0]}</h3>
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
         <div className="text-center mt-8">
            <Link
                to="/shop"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
                View all products &rarr;
            </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <Icons.Leaf className="h-10 w-10 mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-semibold">Eco-Friendly Choices</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Shop sustainably with our collection of eco-conscious products.</p>
        </div>
        <div className="p-6">
          <Icons.ShoppingCart className="h-10 w-10 mx-auto text-primary-500" />
          <h3 className="mt-4 text-xl font-semibold">Fast & Free Shipping</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Get your new favorites delivered to your door, on us.</p>
        </div>
        <div className="p-6">
           <Icons.Users className="h-10 w-10 mx-auto text-purple-500" />
          <h3 className="mt-4 text-xl font-semibold">Student Discount</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Unlock exclusive discounts just for students. It's a vibe.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
