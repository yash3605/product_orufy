import { X } from 'lucide-react';

export default function DeleteConfirmModal({ productName, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Delete Product</h2>
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
            Are you sure you really want to delete this Product&nbsp;
            <span className="font-bold text-gray-800">"{productName}"</span>&nbsp;?
          </p>

          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              disabled={loading}
              className="bg-[#1a1a6c] text-white py-2.5 px-6 rounded-xl font-semibold text-[15px] hover:bg-[#12125a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
