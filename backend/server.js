require("dotenv").config();
const authenticateToken = require("./middleware/authenticateToken");
const express = require("express");
const db = require("./db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const { login, register } = require("./controllers/auth");
const authRouter = require("./routes/authRouter");

app.use("/", authRouter);
app.get("/posts", authenticateToken, (req, res) => {
  res.status(200).json({ message: "you made it!" });
});

app.listen(3000, () => console.log("app running on port 3000"));
