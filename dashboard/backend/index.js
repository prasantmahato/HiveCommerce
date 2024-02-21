// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./src/Router/productsroutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
