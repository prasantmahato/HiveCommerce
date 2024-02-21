const cartModel = require("../models/model");

exports.addItemToCart = (item) => {
  const cart = cartModel.getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex !== -1) {
    // If item already exists in cart, update quantity
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // If item does not exist in cart, add it
    cart.push(item);
  }

  cartModel.updateCart(cart);
};

exports.viewCart = () => {
  return cartModel.getCart();
};

exports.updateCartQuantity = (itemId, quantity) => {
  const cart = cartModel.getCart();
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
    cartModel.updateCart(cart);
  } else {
    throw new Error("Item not found in cart.");
  }
};

exports.removeItemFromCart = (itemId) => {
  const cart = cartModel.getCart();
  const updatedCart = cart.filter((item) => item.id !== itemId);
  cartModel.updateCart(updatedCart);
};
