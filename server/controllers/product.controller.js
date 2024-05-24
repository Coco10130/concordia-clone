const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");

const addProduct = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { productName, price, quantity, category } = req.body;

    if (!productName) {
      return res.status(200).json({ message: "Product name is required" });
    }
    if (isNaN(price)) {
      return res.status(200).json({
        message: "Product price is required and should be in numerical format",
      });
    }
    if (isNaN(quantity)) {
      return res.status(200).json({
        message:
          "Product quantity is required and should be in numerical format",
      });
    }

    const formattedProductName = productName.trim();
    const formattedPrice = parseFloat(price);
    const formattedQuantity = parseFloat(quantity);
    const imageFile = req.file.filename;

    const formattedData = {
      productName: formattedProductName,
      price: formattedPrice,
      quantity: formattedQuantity,
      image: imageFile,
      createdBy: user.id,
      category: category,
    };

    await Product.create(formattedData);

    res.status(201).json({ success: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductsByCategory,
};
