const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

router.use(auth);

router.get('/search', productController.searchProducts);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', upload.array('images', 5), productController.createProduct);
router.put('/:id', upload.array('images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/toggle-publish', productController.togglePublish);

module.exports = router;
