import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('unpublished');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredProducts = products.filter(product =>
    activeTab === 'published' ? product.isPublished : !product.isPublished
  );

  const handleProductUpdate = () => {
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Home" showSearch={false} />

        {/* Tabs */}
        <div className="px-8 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('published')}
              className={`pb-3 text-[15px] font-medium transition-colors relative ${
                activeTab === 'published'
                  ? 'text-[#1a1a6c]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Published
              {activeTab === 'published' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a6c]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('unpublished')}
              className={`pb-3 text-[15px] font-medium transition-colors relative ${
                activeTab === 'unpublished'
                  ? 'text-[#1a1a6c]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Unpublished
              {activeTab === 'unpublished' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a6c]" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-[#1a1a6c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              {/* Empty State Icon */}
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
                No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Products
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Products will appear here
                <br />
                Create your first product to {activeTab}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdate={handleProductUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
