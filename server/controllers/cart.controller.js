const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addToCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId } = req.params;
    const { quantity } = req.body;
    const formattedQuantity = parseInt(quantity);
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const product = await Product.findById(productId);
    const cart = await Cart.findOne({
      productId: productId,
      createdBy: decode.id,
    });
    const existingCart = await Cart.findOne({ createdBy: decode.id });
    const user = await User.findOne({ _id: decode.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (formattedQuantity > parseInt(product.quantity)) {
      return res.status(404).json({ message: "Not enough stock" });
    }

    const subTotal = formattedQuantity * parseInt(product.price);

    if (cart) {
      if (!existingCart) {
        const data = {
          productName: product.productName,
          price: product.price,
          quantity: formattedQuantity,
          image: product.image,
          productId: productId,
          createdBy: decode.id,
          subTotal,
        };
        user.cartItems += 1;

        await user.save();
        await Cart.create(data);
        res.status(201).json({ success: "Product added to cart", user: user });
      }

      cart.quantity += formattedQuantity;
      cart.subTotal += product.price;

      await cart.save();
      res.status(201).json({ success: "Product added to cart" });
    } else {
      const data = {
        productName: product.productName,
        price: product.price,
        quantity: formattedQuantity,
        image: product.image,
        productId: productId,
        createdBy: decode.id,
        subTotal,
      };
      user.cartItems += 1;

      await user.save();
      await Cart.create(data);
      res.status(201).json({ success: "Product added to cart", user: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const cart = await Cart.find({ createdBy: user.id });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { cartId } = req.params;

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);

    user.cartItems -= 1;

    await user.save();

    await Cart.findByIdAndDelete(cartId);

    const cart = await Cart.find({ createdBy: decode.id });

    res
      .status(200)
      .json({ success: "Product deleted successfully", cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  showCart,
  deleteProductCart,
};
