const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: false,
      default: "user",
    },

    cartItems: {
      type: Number,
      required: false,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },

    contact: {
      type: String,
      required: false,
    },

    birthdate: {
      type: String,
      required: false,
    },

    isSeller: {
      type: Boolean,
      required: false,
      default: false,
    },

    shopName: {
      type: String,
      required: false,
    },

    shopContact: {
      type: String,
      required: false,
    },

    shopEmail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
