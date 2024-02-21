// src/index.js
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));


// Routes
app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
