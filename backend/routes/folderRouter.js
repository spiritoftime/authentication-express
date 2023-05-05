const express = require("express");
const router = express.Router();
const {
  createFolder,
  deleteFolder,
  editFolder,
} = require("../controllers/folder");
router.route("/").post(createFolder);
router.route("/:folderId").delete(deleteFolder).patch(editFolder);
module.exports = router;
