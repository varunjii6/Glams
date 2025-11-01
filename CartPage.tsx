
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Icons } from '../components/ui/Icons';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useAppContext();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const shippingCost = cartTotal > 50 ? 0 : 10;
  const totalWithShipping = cartTotal + shippingCost;
  
  if (isOrderPlaced) {
    return (
        <div className="text-center py-20">
            <Icons.PartyPopper className="h-16 w-16 mx-auto text-primary-500" />
            <h2 className="mt-4 text-3xl font-bold">Order Placed!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Thanks for your purchase! A confirmation email is on its way.</p>
            <Link to="/shop" className="mt-8 inline-block bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors">
                Continue Shopping
            </Link>
        </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {showCheckout ? 'Checkout' : `Your Cart (${cartCount} items)`}
      </h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <Icons.ShoppingCart className="h-16 w-16 mx-auto text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="mt-8 inline-block bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            {!showCheckout ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
                {cart.map(item => <CartItemRow key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />)}
              </div>
            ) : (
              <CheckoutForm onOrderPlaced={() => setIsOrderPlaced(true)} />
            )}
          </div>

          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="border-t dark:border-gray-600 my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalWithShipping.toFixed(2)}</span>
              </div>
            </div>
            
            {!showCheckout ? (
                <button onClick={() => setShowCheckout(true)} className="w-full mt-6 bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">
                    Proceed to Checkout
                </button>
            ) : (
                 <button onClick={() => setShowCheckout(false)} className="w-full mt-6 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 font-semibold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    Back to Cart
                </button>
            )}
             <div className="mt-4 text-center">
                 <Link to="/shop" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    Continue Shopping
                 </Link>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CartItemRowProps {
  item: CartItem;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center gap-4 py-2 border-b dark:border-gray-700 last:border-b-0">
      <img src={item.images[0]} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.id)} className="mt-1 text-xs text-red-500 hover:underline">
          Remove
        </button>
      </div>
      <div className="flex items-center border rounded-lg dark:border-gray-600">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Icons.Minus className="h-4 w-4"/></button>
        <span className="px-3 text-sm">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Icons.Plus className="h-4 w-4"/></button>
      </div>
      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  )
}

const CheckoutForm: React.FC<{onOrderPlaced: () => void}> = ({onOrderPlaced}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onOrderPlaced(); }}>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                 <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Shipping Address</label>
                    <input type="text" id="address" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                        <input type="text" id="city" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                        <input type="text" id="state" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</label>
                        <input type="text" id="zip" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                </div>
                <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Payment (Test Mode)</h3>
                    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <p className="text-sm">This is a test checkout. No real payment will be processed.</p>
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">
                    Place Order
                </button>
            </form>
        </div>
    )
}

export default CartPage;
