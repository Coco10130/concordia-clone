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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
