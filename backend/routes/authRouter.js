const express = require("express");
const {
  register,
  login,
  logout,
  persistLogin,
} = require("../controllers/auth");
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/persist").get(persistLogin);

module.exports = router;
