
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex border-b dark:border-gray-700">
        <button
          onClick={() => setActiveTab('login')}
          className={`w-1/2 py-4 text-center font-semibold ${activeTab === 'login' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`w-1/2 py-4 text-center font-semibold ${activeTab === 'signup' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
        >
          Sign Up
        </button>
      </div>
      <div className="p-8 bg-white dark:bg-gray-800 rounded-b-lg shadow-md">
        {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState('zoe@example.com'); // Pre-fill for demo
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email);
    if(success) {
      navigate('/account');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium mb-1">Email</label>
        <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label htmlFor="login-password"  className="block text-sm font-medium mb-1">Password</label>
        <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">Login</button>
    </form>
  );
};

const SignUpForm = () => {
  return (
    <form className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" required className="w-full p-2 rounded-md border bg-transparent dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">Sign Up</button>
    </form>
  );
};

export default AuthPage;
