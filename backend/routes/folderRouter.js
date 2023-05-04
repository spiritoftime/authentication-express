const express = require("express");
const router = express.Router();
const { createFolder, deleteFolder } = require("../controllers/folder");
router.route("/").post(createFolder);
router.route("/:folderId").delete(deleteFolder);
module.exports = router;
