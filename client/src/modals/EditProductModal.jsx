import { useState } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function EditProductModal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: product.name,
    type: product.type,
    quantityStock: product.quantityStock,
    mrp: product.mrp,
    sellingPrice: product.sellingPrice,
    brandName: product.brandName,
    exchangeEligibility: product.exchangeEligibility
  });
  const [existingImages, setExistingImages] = useState(product.images || []);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const productTypes = ['Foods', 'Electronics', 'Clothes', 'Beauty Products', 'Others'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please enter product name';
    if (!formData.type) newErrors.type = 'Please select product type';
    if (!formData.quantityStock) newErrors.quantityStock = 'Please enter quantity stock';
    if (!formData.mrp) newErrors.mrp = 'Please enter MRP';
    if (!formData.sellingPrice) newErrors.sellingPrice = 'Please enter selling price';
    if (!formData.brandName) newErrors.brandName = 'Please enter brand name';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + newImages.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    setNewImages(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setNewImagePreviews(prev => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      newImages.forEach(image => formDataToSend.append('images', image));

      await api.put(`/products/${product._id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Product updated successfully');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Edit Product</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                errors.name ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Product Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors appearance-none cursor-pointer ${
                errors.type ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="" disabled>Select product type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          {/* Quantity Stock */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Quantity Stock</label>
            <input
              type="number"
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                errors.quantityStock ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.quantityStock && <p className="text-red-500 text-xs mt-1">{errors.quantityStock}</p>}
          </div>

          {/* MRP */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">MRP</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                errors.mrp ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.mrp && <p className="text-red-500 text-xs mt-1">{errors.mrp}</p>}
          </div>

          {/* Selling Price */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                errors.sellingPrice ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>}
          </div>

          {/* Brand Name */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                errors.brandName ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.brandName && <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>}
          </div>

          {/* Upload Images */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-semibold text-gray-800">Upload Product Images</label>
              <label className="text-[13px] text-[#1a1a6c] font-semibold cursor-pointer hover:underline">
                Add More Photos
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative w-[72px] h-[72px]">
                  <img src={image} alt="" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              {newImagePreviews.map((preview, index) => (
                <div key={`new-${index}`} className="relative w-[72px] h-[72px]">
                  <img src={preview} alt="" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              {(existingImages.length + newImages.length) < 5 && (
                <label className="flex flex-col items-center justify-center w-[72px] h-[72px] border border-gray-300 rounded-lg cursor-pointer hover:border-[#1a1a6c] transition-colors">
                  <span className="text-[10px] text-gray-400">Enter</span>
                  <span className="text-[10px] text-gray-800 font-semibold">Description</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Exchange Eligibility */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Exchange or return eligibility</label>
            <select
              name="exchangeEligibility"
              value={formData.exchangeEligibility}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[15px] text-gray-800 bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors appearance-none cursor-pointer"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1a1a6c] text-white py-2.5 px-7 rounded-xl font-semibold text-[15px] hover:bg-[#12125a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
