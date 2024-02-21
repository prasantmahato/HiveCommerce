// src/controllers/productsController.js
let products = require("../../PRODUCTS");

// Function to generate a unique ID for new products
const generateProductId = () => {
  // Find the maximum ID currently in use
  const maxId = products.reduce((max, product) => {
    return product.id > max ? product.id : max;
  }, 0);

  // Increment the maximum ID to generate a new unique ID
  return maxId + 1;
};

// Controller for getting all products
const getAllProducts = (req, res) => {
  res.json(products);
};

// Controller for getting product by ID
const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
};

// Controller for adding a new product
const addProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: generateProductId(), // Generate a unique ID for the new product
    name,
    price
  };
  products.push(newProduct);
  console.log(products);
  res.status(201).json(newProduct);
  
};

// Controller for updating a product
const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    products[productIndex] = { id: productId, name, price };
    res.json(products[productIndex]);
  }
};

// Controller for deleting a product
const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    products.splice(productIndex, 1);
    res.status(204).send();
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
