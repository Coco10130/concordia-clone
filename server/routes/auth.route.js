const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getProfile,
  logout,
} = require("../controllers/auth.controller");
const {
  getProducts,
  getProductsByCategory,
} = require("../controllers/product.controller");

router.post("/login", login);

router.post("/register", register);

router.get("/", getProfile);

router.get("/logout", logout);

router.get("/products", getProducts);

router.get("/products/:category", getProductsByCategory);

module.exports = router;
