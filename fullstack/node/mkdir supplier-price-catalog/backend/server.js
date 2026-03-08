import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './Routes/auth.js';
import productRoutes from './Routes/products.js';
import uploadRoutes from './Routes/upload.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err.message));



app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);


// Basic Route
app.get('/', (req, res) => {
  res.send('Supplier Price Catalog API')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})