import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todos.js';
import dotenv from 'dotenv';
import Todo from './models/Todo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);


// After mongoose.connect
const seedIfEmpty = async () => {
  const count = await Todo.countDocuments();
  if (count === 0) {
    console.log('No todos found, seeding database...');
    await Todo.insertMany([
      { text: 'Learn Express', completed: true },
      { text: 'Build a REST API', completed: true },
      { text: 'Connect to MongoDB', completed: false },
    ]);
    console.log('Seeded with initial todos');
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedIfEmpty(); // seed only if empty
  })
  .catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});