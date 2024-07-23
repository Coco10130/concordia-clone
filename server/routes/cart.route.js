const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  addToCart,
  showCart,
  deleteProductCart,
} = require("../controllers/cart.controller.js");

router.use(authMiddleware);

router.post("/:productId", addToCart);

router.get("/", showCart);

router.delete("/:cartId", deleteProductCart);

module.exports = router;
