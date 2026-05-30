const Product = require('../models/Product');
const { cloudinary, uploadToCloudinary } = require('../utils/cloudinary');

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            type,
            quantityStock,
            mrp,
            sellingPrice,
            brandName,
            exchangeEligibility
        } = req.body;

        if (!name || !type || !quantityStock || !mrp || !sellingPrice || !brandName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let images = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file));
            images = await Promise.all(uploadPromises);
        }

        const product = await Product.create({
            name,
            type,
            quantityStock: Number(quantityStock),
            mrp: Number(mrp),
            sellingPrice: Number(sellingPrice),
            brandName,
            images,
            exchangeEligibility: exchangeEligibility || 'Yes',
            user: req.userId
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json({ products });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ product });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const {
            name,
            type,
            quantityStock,
            mrp,
            sellingPrice,
            brandName,
            exchangeEligibility
        } = req.body;

        const product = await Product.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file));
            const newImages = await Promise.all(uploadPromises);
            product.images = [...product.images, ...newImages];
        }

        product.name = name || product.name;
        product.type = type || product.type;
        product.quantityStock = quantityStock ? Number(quantityStock) : product.quantityStock;
        product.mrp = mrp ? Number(mrp) : product.mrp;
        product.sellingPrice = sellingPrice ? Number(sellingPrice) : product.sellingPrice;
        product.brandName = brandName || product.brandName;
        product.exchangeEligibility = exchangeEligibility || product.exchangeEligibility;

        await product.save();

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.togglePublish = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.isPublished = !product.isPublished;
        await product.save();

        res.json({
            message: `Product ${product.isPublished ? 'published' : 'unpublished'} successfully`,
            product
        });
    } catch (error) {
        console.error('Toggle publish error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        const products = await Product.find({
            user: req.userId,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { brandName: { $regex: q, $options: 'i' } },
                { type: { $regex: q, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.json({ products });
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
