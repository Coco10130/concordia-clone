const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userProfile = await User.findOne({ _id: user.id }).select(
      "-password"
    );

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
};
