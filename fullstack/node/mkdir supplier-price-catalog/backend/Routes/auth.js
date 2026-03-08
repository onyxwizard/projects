import express from 'express';
import jwt from 'jsonwebtoken';
import Supplier from '../Models/Supplier.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.json(req.supplier);
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if supplier exists
    const existing = await Supplier.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new supplier
    const supplier = new Supplier({ name, email, password });
    await supplier.save();

    // Generate token
    const token = jwt.sign(
      { supplierId: supplier._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      supplier: {
        id: supplier._id,
        name: supplier.name,
        email: supplier.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err); // This will print in terminal
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;