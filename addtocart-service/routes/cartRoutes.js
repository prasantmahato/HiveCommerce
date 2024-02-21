const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addItemToCart);

router.get("/", cartController.viewCart);

router.put("/", cartController.updateCartQuantity);

router.delete("/", cartController.removeItemFromCart);

module.exports = router;
