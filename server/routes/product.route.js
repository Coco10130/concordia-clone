const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const {
  getProducts,
  addProduct,
} = require("../controllers/product.controller");

router.use(authMiddleware);

router.post("/", uploadMiddleware.single("image"), addProduct);

module.exports = router;
