import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  sku: { type: String, required: true },  // unique per supplier
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
}, { timestamps: true });

// Ensure sku is unique per supplier (compound index)
ProductSchema.index({ supplier: 1, sku: 1 }, { unique: true });

// Index for supplier queries (pagination)
ProductSchema.index({ supplier: 1, createdAt: -1 });

const Product = mongoose.model('Product', ProductSchema);
export default Product;