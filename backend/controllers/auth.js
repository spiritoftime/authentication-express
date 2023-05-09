require("dotenv").config();
const db = require("../db/models");
const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const { User } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryUserDetails } = require("../sequelize_queries/index.js");
const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // store in the db

  let newUser;
  try {
    newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Username already exists" });
    }
    return res
      .status(400)
      .json({ error: `Unable to create user. ${err.name}` });
  }
  const { refreshToken } = generateTokensAndCookies(username, false, res);
  newUser.refreshToken = refreshToken;
  await newUser.save();
  res.status(201).json({ user: { username: username, id: newUser.id } });
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
  const { refreshToken } = generateTokensAndCookies(username, false, res);
  user.refreshToken = refreshToken;
  await user.save();
  const userWithDocuments = await queryUserDetails(username);

  return res.status(201).json({ userWithDocuments });
};
const logout = async (req, res) => {
  const { userId } = req.body;

  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const user = await User.findByPk(userId);
    user.refreshToken = null;
    await user.save();
  }

  // Delete the refresh token cookie
  res.clearCookie("refreshToken");
  res.status(201).send("Logged out");
};
// const persistLogin = authenticateToken;
const persistLogin = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return;

  try {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findOne({
      where: { username: decodedRefreshToken.name },
    });
    const { refreshToken: newRefreshToken } = generateTokensAndCookies(
      decodedRefreshToken.name,
      true,
      res
    );

    user.refreshToken = newRefreshToken;
    await user.save();
    const userWithDocuments = await queryUserDetails(user.username);
    return res.status(201).json({ userWithDocuments });
  } catch (refreshTokenError) {
    return res
      .status(403)
      .json({ error: "Invalid refresh token, please relogin." });
  }
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
function generateTokensAndCookies(username, isRefresh, res) {
  const payload = { name: username, isRefreshed: isRefresh };
  const accessToken = generateToken(payload, "access", "5s");
  const refreshToken = generateToken(payload, "refresh", "3h");
  res.cookie("refreshToken", refreshToken, {
    httpOnly: process.env.NODE_ENV === "production" ? false : true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // since we are using react to render frontend and not client side render
  });

  res.setHeader("Authorization", "Bearer " + accessToken);
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  return { refreshToken, accessToken };
}
module.exports = { register, login, logout, persistLogin };
