const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  getUsersWithAccess,
  getUsersWithoutAccess,
  addUsersToDocument,
  addUsersToFolder,
} = require("../controllers/user");

router.route("/all").get(getUsers);
router.route("/withAccess").get(getUsersWithAccess);
router.route("/withoutAccess").get(getUsersWithoutAccess);
router.route("/addUsersToDocument").post(addUsersToDocument);
router.route("/addUsersToFolder").post(addUsersToFolder);
router.route("/:userId").get(getUser);
module.exports = router;
