const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['Foods', 'Electronics', 'Clothes', 'Beauty Products', 'Others']
  },
  quantityStock: {
    type: Number,
    required: [true, 'Quantity stock is required'],
    min: 0
  },
  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: 0
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: 0
  },
  brandName: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  images: [{
    type: String
  }],
  exchangeEligibility: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
