
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import ThemeToggle from '../../components/ui/ThemeToggle';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAdmin } = useAppContext();
    const [email, setEmail] = useState('admin@vibecart.com'); // Pre-fill for demo
    const [password, setPassword] = useState('adminpass');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email);
        if (success) {
            // This is a simplified check. In a real app, the isAdmin flag would come from the login response.
            if (email === 'admin@vibecart.com') { // Mocking the admin check
                 navigate('/admin/dashboard');
            } else {
                 setError('Access denied. Not an admin user.');
            }
        } else {
            setError('Invalid email or password.');
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
             <h1 className="text-3xl font-black text-primary-600 dark:text-primary-400">VibeCart Admin</h1>
             <p className="mt-2 text-gray-500 dark:text-gray-400">Sign in to manage your store</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
