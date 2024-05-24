const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getProfile } = require("../controllers/profile.controller");

router.use(authMiddleware);

router.get("/", getProfile);

module.exports = router;
