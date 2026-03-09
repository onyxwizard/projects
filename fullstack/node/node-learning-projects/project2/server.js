const express = require('express');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the todo routes
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json(`welcome visit this page http://localhost:${PORT}/todos`);

})
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});