// src/routes/routes.js
const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController");

// Define routes
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.addProduct); // Route to add a new product
router.put('/products/:id', productsController.updateProduct); // Route to update a product
router.delete('/products/:id', productsController.deleteProduct); // Route to delete a product

module.exports = router;
