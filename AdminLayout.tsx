
import React, { ReactNode } from 'react';
// Fix: Import the 'Link' component from react-router-dom to be used for navigation.
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icons } from '../../components/ui/Icons';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { useAppContext } from '../../hooks/useAppContext';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logout, user } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { to: 'dashboard', icon: Icons.Dashboard, label: 'Dashboard' },
    { to: 'manage/products', icon: Icons.Product, label: 'Products' },
    { to: 'manage/orders', icon: Icons.Order, label: 'Orders' },
    { to: 'manage/users', icon: Icons.Users, label: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b dark:border-gray-700">
          <h1 className="text-2xl font-black text-primary-600 dark:text-primary-400">VibeCart</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === 'dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-3 py-2 rounded-md font-medium text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Icons.Logout className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
           <div className="flex items-center gap-4">
             <Link to="/" target="_blank" className="text-sm font-medium text-primary-600 hover:underline flex items-center gap-1">
                View Store <Icons.ExternalLink className="h-4 w-4" />
             </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right">
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
