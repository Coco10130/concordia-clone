const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// import Routers
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const productRouter = require("./routes/product.route.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

///default routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/product", productRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
