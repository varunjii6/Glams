
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminManagePage from './pages/admin/AdminManagePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="manage/:tab" element={<AdminManagePage />} />
                    <Route path="/" element={<Navigate to="dashboard" />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

const MainApp = () => (
  <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100">
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/account/:tab" 
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/account" element={<Navigate to="/account/profile" />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
