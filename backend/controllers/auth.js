require("dotenv").config();
const db = require("../db/models");
const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const { User } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // store in the db
  const payload = { name: username, isRefreshed: false };
  const accessToken = generateToken(payload, "access", "15s");
  const refreshToken = generateToken(payload, "refresh", "3h");
  let newUser;
  try {
    newUser = await User.create({
      updated_at: new Date(),
      created_at: new Date(),
      username: username,
      password: hashedPassword,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Username already exists" });
    }
    return res
      .status(400)
      .json({ error: `Unable to create user. ${err.name}` });
  }
  res.cookie("refreshToken", refreshToken, {
    httpOnly: process.env.NODE_ENV === "production" ? false : true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // since we are using react to render frontend and not client side render
  });

  res.setHeader("Authorization", "Bearer " + accessToken);
  res.status(200).json({ user: { username: username, id: newUser.id } });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  // first check if username is in the db.
  // next check the hashed password
  const user = await User.findOne({
    where: { username: username },
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: `User with username '${username}' not found` });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }
  // once both are correct, create the tokens
  const payload = { name: username, isRefreshed: false };
  const accessToken = generateToken(payload, "access", "15s");
  const refreshToken = generateToken(payload, "refresh", "3h");
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: process.env.NODE_ENV === "production" ? false : true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // since we are using react to render frontend and not client side render
  });

  res.setHeader("Authorization", "Bearer " + accessToken);
  res.status(200).json({ user: { username: username, id: user.id } });
};
function generateToken(payload, tokenType, expiresIn) {
  // access - 15mins, refresh - 3h
  return jwt.sign(
    payload,
    tokenType === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: expiresIn, // typically, this is 5-15mins
    }
  );
}
module.exports = { register, login };
