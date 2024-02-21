const fs = require("fs");
const path = require("path");

const CART_DATA_FILE = path.join(__dirname, "../data/cart.json");

exports.getCart = () => {
  try {
    const cartData = fs.readFileSync(CART_DATA_FILE, "utf8");
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Error reading cart data:", error);
    return [];
  }
};

exports.updateCart = (cart) => {
  try {
    fs.writeFileSync(CART_DATA_FILE, JSON.stringify(cart, null, 2));
    console.log("Cart data updated successfully.");
  } catch (error) {
    console.error("Error updating cart data:", error);
  }
};
