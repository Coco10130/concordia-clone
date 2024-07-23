const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const {
  getProfile,
  updateProfile,
  updateProfileImage,
  registerSeller,
} = require("../controllers/profile.controller");

router.use(authMiddleware);

router.get("/", getProfile);

router.put("/:profileId", updateProfile);

router.put(
  "/updateImage/:id",
  uploadMiddleware.single("image"),
  updateProfileImage
);

router.post("/register/seller", registerSeller);

module.exports = router;
