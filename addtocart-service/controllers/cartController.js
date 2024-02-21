const cartService = require("../services/cartServices");

exports.addItemToCart = (req, res) => {
  try {
    const { id, name, price, quantity } = req.body;
    if (!id || !name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing required fields." });
    }

    const item = {
      id,
      name,
      price,
      quantity,
    };

    cartService.addItemToCart(item);
    return res
      .status(200)
      .json({ message: "Item added to cart successfully.", item });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.viewCart = (req, res) => {
  try {
    const cart = cartService.viewCart();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error viewing cart:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.updateCartQuantity = (req, res) => {
  try {
    const { id, quantity } = req.body;
    if (!id || !quantity) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing required fields." });
    }

    cartService.updateCartQuantity(id, quantity);
    return res
      .status(200)
      .json({ message: "Cart quantity updated successfully." });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.removeItemFromCart = (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing required fields." });
    }

    cartService.removeItemFromCart(id);
    return res
      .status(200)
      .json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
