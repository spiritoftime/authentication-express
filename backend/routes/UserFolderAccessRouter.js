const express = require("express");
const router = express.Router();
const {
  addUsersToFolder,
  editAccessFolder,
} = require("../controllers/UserFolderAccess");
router.route("/addUsersToFolder").post(addUsersToFolder);
router.route("/editFolderAccess").patch(editAccessFolder);

module.exports = router;
