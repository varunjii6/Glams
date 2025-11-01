
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { mockOrders } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Icons } from '../components/ui/Icons';
import { Order } from '../types';

const AccountPage: React.FC = () => {
  const { tab = 'profile' } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'My Orders' },
    { id: 'wishlist', label: 'Wishlist' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4">
        <nav className="flex flex-row md:flex-col gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => navigate(`/account/${t.id}`)}
              className={`text-left px-4 py-2 rounded-lg font-medium text-sm w-full ${
                tab === t.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="w-full md:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {tab === 'profile' && <ProfileTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'wishlist' && <WishlistTab />}
      </main>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Name</label>
          <p className="text-lg">{user.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-lg">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Member Since</label>
          <p className="text-lg">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const OrdersTab: React.FC = () => {
    const { user } = useAppContext();
    const userOrders = mockOrders.filter(o => o.userId === user?.id);

    return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {userOrders.length > 0 ? (
          <div className="space-y-6">
              {userOrders.map(order => <OrderCard key={order.id} order={order}/>)}
          </div>
      ) : (
          <p>You haven't placed any orders yet.</p>
      )}
    </div>
    )
};

const OrderCard: React.FC<{order: Order}> = ({order}) => {
    const statusColor = {
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    }
    return (
        <div className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                    <p className="font-bold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <p className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>{order.status}</span>
                </div>
            </div>
            <p className="text-sm text-gray-500">Items: {order.products.reduce((sum, p) => sum + p.quantity, 0)}</p>
        </div>
    )
}

const WishlistTab: React.FC = () => {
  const { wishlist } = useAppContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Icons.Heart className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4">Your wishlist is empty.</p>
          <p className="text-sm text-gray-500">Click the heart on products to save them for later.</p>
        </div>
      )}
    </div>
  );
};


export default AccountPage;
