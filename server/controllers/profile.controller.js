const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const { deleteFile } = require("../utilities/deleteFile.util");

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

    res.status(200).json({ success: true, user: userProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, contact, birthdate } = req.body;
    const { profileId } = req.params;
    let formattedBirthdate;

    if (birthdate) {
      const dateObject = new Date(birthdate);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      formattedBirthdate = `${
        monthNames[dateObject.getMonth()]
      } ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    }

    let formattedContact = contact;

    if (formattedContact) {
      formattedContact = formattedContact.replace(/[^0-9]/g, "");
      if (
        formattedContact.length !== 11 ||
        !formattedContact.startsWith("09")
      ) {
        return res.status(200).json({ message: "Invalid contact number" });
      }
    }

    const data = {
      name,
      contact: formattedContact,
      birthdate: formattedBirthdate,
    };

    const user = await User.findByIdAndUpdate(profileId, data);

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const image = req.file.filename;
    const { id } = req.params;

    const user = await User.findById(id);

    if (user && user.image) {
      const oldImagePath = path.join(
        __dirname,
        `../../client/public/images/${user.image}`
      );
      deleteFile(oldImagePath);
    }

    user.image = image;
    await user.save();

    res
      .status(200)
      .json({ success: "Profile updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerSeller = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { shopName, shopContact, shopEmail } = req.body;

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    let formattedContact = shopContact;

    formattedContact = formattedContact.replace(/[^0-9]/g, "");
    if (formattedContact.length !== 11 || !formattedContact.startsWith("09")) {
      return res.status(200).json({ message: "Invalid contact number" });
    }

    const data = {
      shopName,
      shopContact: formattedContact,
      shopEmail,
      isSeller: true,
    };

    const user = await User.findByIdAndUpdate(decode.id, data);

    res
      .status(201)
      .json({ success: "Shop registration successful", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfileImage,
  registerSeller,
};
