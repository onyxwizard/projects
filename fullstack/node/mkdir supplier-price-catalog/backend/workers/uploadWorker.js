import 'dotenv/config'; // load env vars
import mongoose from 'mongoose';
import { Readable } from 'stream';
import csv from 'csv-parser';
import uploadQueue from '../Jobs/uploadQueue.js';
import Product from '../Models/Product.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Worker connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Process jobs
uploadQueue.process(async (job) => {
  const { supplierId, fileBuffer } = job.data;
  const buffer = Buffer.from(fileBuffer, 'base64');

  const results = [];
  const errors = [];
  const stream = Readable.from(buffer.toString());

  // Parse CSV
  await new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', (data) => {
        const sku = data.sku?.trim();
        const name = data.name?.trim();
        const price = parseFloat(data.price);
        const category = data.category?.trim();

        if (!sku || !name || isNaN(price)) {
          errors.push({ row: data, error: 'Missing required fields (sku, name, price) or invalid price' });
        } else {
          results.push({ sku, name, price, category });
        }
      })
      .on('end', resolve)
      .on('error', reject);
  });

  if (errors.length > 0) {
    throw new Error(`CSV contains invalid rows: ${JSON.stringify(errors)}`);
  }

  // --- Comparison logic (same as before) ---
  const existingProducts = await Product.find(
    { supplier: supplierId },
    'sku price'
  ).lean();

  const existingMap = new Map(existingProducts.map(p => [p.sku, p]));

  const newProducts = [];
  const priceChanges = [];
  const matches = [];
  const processedSkus = new Set();

  for (const item of results) {
    processedSkus.add(item.sku);
    const existing = existingMap.get(item.sku);
    if (!existing) {
      newProducts.push(item);
    } else {
      if (existing.price !== item.price) {
        priceChanges.push({
          sku: item.sku,
          oldPrice: existing.price,
          newPrice: item.price
        });
      } else {
        matches.push(item.sku);
      }
    }
  }

  const discontinued = [];
  existingMap.forEach((_, sku) => {
    if (!processedSkus.has(sku)) {
      discontinued.push(sku);
    }
  });

  // Apply DB updates
  if (newProducts.length > 0) {
    await Product.insertMany(
      newProducts.map(p => ({ ...p, supplier: supplierId }))
    );
  }

  for (const change of priceChanges) {
    await Product.updateOne(
      { supplier: supplierId, sku: change.sku },
      { $set: { price: change.newPrice } }
    );
  }

  if (discontinued.length > 0) {
    await Product.deleteMany({
      supplier: supplierId,
      sku: { $in: discontinued }
    });
  }

  // Return summary (this becomes job.returnvalue)
  return {
    summary: {
      totalRows: results.length,
      new: newProducts.length,
      priceChanges: priceChanges.length,
      matches: matches.length,
      discontinued: discontinued.length
    },
    details: {
      newProducts,
      priceChanges,
      discontinued
    }
  };
});

console.log('Worker started...');