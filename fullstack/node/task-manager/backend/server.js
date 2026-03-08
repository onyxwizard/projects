/**
 * @author onyxwizard
 * @date 02-03-2026
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

require('dotenv').config();

const app = express();


// connect to mongo db

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch(err => console.log(err));


// middle ware
app.use(cors());
app.use(express.json());

// Routes config
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);





app.get('/', (req, res) => {
  res.send("Task Manager API");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

