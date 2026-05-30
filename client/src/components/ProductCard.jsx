import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import EditProductModal from '../modals/EditProductModal';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';

export default function ProductCard({ product, onUpdate }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTogglePublish = async () => {
        setLoading(true);
        try {
            await api.patch(`/products/${product._id}/toggle-publish`);
            toast.success(`Product ${product.isPublished ? 'unpublished' : 'published'} successfully`);
            onUpdate();
        } catch (error) {
            toast.error('Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await api.delete(`/products/${product._id}`);
            toast.success('Product deleted successfully');
            setShowDeleteModal(false);
            onUpdate();
        } catch (error) {
            toast.error('Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Image */}
                <div className="relative h-[200px] bg-gray-100">
                    {product.images && product.images.length > 0 ? (
                        <>
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.images.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                                    {product.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-[7px] h-[7px] rounded-full transition-colors ${index === currentImageIndex ? 'bg-blue-500' : 'bg-white/60'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-[15px] mb-3">{product.name}</h3>

                    <div className="space-y-[6px] text-[13px]">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Product type -</span>
                            <span className="text-gray-800 font-medium">{product.type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Quantity Stock -</span>
                            <span className="text-gray-800 font-medium">{product.quantityStock}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">MRP -</span>
                            <span className="text-gray-800 font-medium">₹ {product.mrp}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Selling Price -</span>
                            <span className="text-gray-800 font-medium">₹ {product.sellingPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Brand Name -</span>
                            <span className="text-gray-800 font-bold">{product.brandName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Number of images -</span>
                            <span className="text-gray-800 font-medium">{product.images?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Exchange Eligibility -</span>
                            <span className="text-gray-800 font-medium uppercase">{product.exchangeEligibility}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2.5 mt-4">
                        <button
                            onClick={handleTogglePublish}
                            disabled={loading}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${product.isPublished
                                    ? 'bg-[#22c55e] text-white hover:bg-[#16a34a]'
                                    : 'bg-[#1a1a6c] text-white hover:bg-[#12125a]'
                                } disabled:opacity-50`}
                        >
                            {product.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="py-2.5 px-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <EditProductModal
                    product={product}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={() => {
                        setShowEditModal(false);
                        onUpdate();
                    }}
                />
            )}

            {showDeleteModal && (
                <DeleteConfirmModal
                    productName={product.name}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    loading={loading}
                />
            )}
        </>
    );
}
