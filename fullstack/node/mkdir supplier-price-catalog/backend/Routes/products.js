import express from 'express';
import Product from '../Models/Product.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

// Get all products for logged-in supplier (with pagination)
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find({ supplier: req.supplier._id })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({ supplier: req.supplier._id });

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a single product (for testing)
router.post('/', protect, async (req, res) => {
  try {
    const { sku, name, price, category } = req.body;
    const product = new Product({
      supplier: req.supplier._id,
      sku,
      name,
      price,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'SKU already exists for this supplier' });
    }
    res.status(400).json({ error: err.message });
  }
});

// Update, delete routes can be added similarly (omitted for brevity)

export default router;