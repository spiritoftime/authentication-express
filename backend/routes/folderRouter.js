const express = require("express");
const router = express.Router();
const { createFolder } = require("../controllers/folder");
router.route("/").post(createFolder);
module.exports = router;
