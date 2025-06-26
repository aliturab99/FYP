"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NoSSR from "../components/NoSSR";

// Admin email list - you can modify this to include your admin emails
const ADMIN_EMAILS = [
  "syedyawaraliturab@gmail.com", // Replace with your actual admin email
  // Add more admin emails as needed
];

const AdminDashboard = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    averagePrice: 0
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  // Check if user is admin
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = isSignedIn && userEmail && 
    (ADMIN_EMAILS.includes(userEmail) || 
     userEmail.endsWith("@medmagic.com")); // Allow any @medmagic.com email

  // Debug logging (remove in production)
  useEffect(() => {
    if (isSignedIn && user) {
      console.log('User email:', userEmail);
      console.log('Admin emails:', ADMIN_EMAILS);
      console.log('Is admin:', isAdmin);
    }
  }, [isSignedIn, user, userEmail, isAdmin]);

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      fetchProducts();
    }
  }, [isSignedIn, isAdmin]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      
      // Calculate stats
      const categories = new Set(data.map(p => p.category)).size;
      const avgPrice = data.length > 0 ? data.reduce((sum, p) => sum + p.price, 0) / data.length : 0;
      
      setStats({
        totalProducts: data.length,
        totalCategories: categories,
        averagePrice: avgPrice
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        fetchProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-6">Please sign in to access the admin dashboard.</p>
          <Link href="/sign-in" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You do not have admin privileges.</p>
          
          {/* Debug info - remove in production */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Debug Info:</h3>
            <p className="text-xs text-gray-400">Your email: {userEmail || 'Not found'}</p>
            <p className="text-xs text-gray-400">Admin emails: {ADMIN_EMAILS.join(', ')}</p>
            <p className="text-xs text-gray-400">Signed in: {isSignedIn ? 'Yes' : 'No'}</p>
            <p className="text-xs text-gray-400">Is admin: {isAdmin ? 'Yes' : 'No'}</p>
          </div>
          
          <Link href="/" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <NoSSR fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <Head>
        <title>Admin Dashboard - medMagic</title>
        <meta name="description" content="Admin dashboard for managing products and store" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {user?.firstName}</span>
                <div className="flex space-x-2">
                  <Link 
                    href="/admin/categories"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Manage Categories
                  </Link>
                  <Link 
                    href="/store/add-product"
                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-emerald-400">{stats.totalProducts}</p>
                </div>
                <div className="bg-emerald-600/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.totalCategories}</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Price</p>
                  <p className="text-3xl font-bold text-purple-400">${stats.averagePrice.toFixed(2)}</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded-full">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-emerald-600/20 text-emerald-400 border-b-2 border-emerald-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Products Management
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-emerald-600/20 text-emerald-400 border-b-2 border-emerald-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Analytics
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'products' && (
                <div>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                      <p className="mt-4 text-gray-400">Loading products...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.map(product => (
                        <div key={product._id} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-gray-400">{product.category} • ${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(product._id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Products by Category</h3>
                    <div className="space-y-3">
                      {[...new Set(products.map(p => p.category))].map(category => {
                        const count = products.filter(p => p.category === category).length;
                        const percentage = (count / products.length * 100).toFixed(1);
                        return (
                          <div key={category} className="flex justify-between items-center">
                            <span className="capitalize">{category.replace('-', ' ')}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-emerald-500 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-400">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Price Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { range: '$0 - $25', count: products.filter(p => p.price <= 25).length },
                        { range: '$26 - $50', count: products.filter(p => p.price > 25 && p.price <= 50).length },
                        { range: '$51 - $100', count: products.filter(p => p.price > 50 && p.price <= 100).length },
                        { range: '$100+', count: products.filter(p => p.price > 100).length }
                      ].map(({ range, count }) => {
                        const percentage = products.length > 0 ? (count / products.length * 100).toFixed(1) : 0;
                        return (
                          <div key={range} className="flex justify-between items-center">
                            <span>{range}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-400">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                updateProduct(editingProduct._id, {
                  name: formData.get('name'),
                  price: parseFloat(formData.get('price')),
                  image: formData.get('image'),
                  link: formData.get('link'),
                  category: formData.get('category')
                });
              }} className="space-y-4">
                <input
                  name="name"
                  defaultValue={editingProduct.name}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Product Name"
                  required
                />
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingProduct.price}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Price"
                  required
                />
                <input
                  name="image"
                  defaultValue={editingProduct.image}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Image URL"
                  required
                />
                <input
                  name="link"
                  defaultValue={editingProduct.link}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Purchase Link"
                  required
                />
                <select
                  name="category"
                  defaultValue={editingProduct.category}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  required
                >
                  <option value="medications">Medications</option>
                  <option value="medical-supplies">Medical Supplies</option>
                  <option value="devices">Medical Devices</option>
                  <option value="first-aid">First Aid</option>
                  <option value="hygiene">Hygiene Products</option>
                  <option value="baby-care">Baby Care</option>
                </select>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md text-center">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => deleteProduct(deleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NoSSR>
  );
};

export default AdminDashboard;
