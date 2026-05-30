import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../modals/AddProductModal';
import api from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchProducts();
      return;
    }
    try {
      const response = await api.get(`/products/search?q=${query}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Products" onSearch={handleSearch} />

        <div className="flex-1 p-8">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[22px] font-bold text-gray-900">Products</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 text-[#1a1a6c] font-semibold text-[15px] hover:underline"
            >
              <span className="text-xl leading-none">+</span>
              Add Products
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-[#1a1a6c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="mb-6">
                <svg className="w-[72px] h-[72px]" viewBox="0 0 72 72" fill="none">
                  <rect x="8" y="8" width="22" height="22" rx="4" stroke="#1a1a6c" strokeWidth="2.5" fill="none"/>
                  <rect x="42" y="8" width="22" height="22" rx="4" stroke="#1a1a6c" strokeWidth="2.5" fill="none"/>
                  <rect x="8" y="42" width="22" height="22" rx="4" stroke="#1a1a6c" strokeWidth="2.5" fill="none"/>
                  <rect x="42" y="42" width="16" height="16" rx="3" stroke="#1a1a6c" strokeWidth="2.5" fill="none"/>
                  <line x1="50" y1="50" x2="60" y2="60" stroke="#1a1a6c" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="60" y1="50" x2="50" y2="60" stroke="#1a1a6c" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Feels a little empty over here...
              </h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                You can create products without connecting store
                <br />
                you can add products to store anytime
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#1a1a6c] text-white py-3 px-8 rounded-xl font-semibold text-[15px] hover:bg-[#12125a] transition-colors"
              >
                Add your Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdate={fetchProducts}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}
