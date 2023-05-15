const express = require("express");
const router = express.Router();
const {
  createFolder,
  getFolders,
  deleteFolder,
  editFolder,
} = require("../controllers/folder");
router.route("/").post(createFolder).get(getFolders);
router.route("/:folderId").delete(deleteFolder).patch(editFolder);
module.exports = router;
