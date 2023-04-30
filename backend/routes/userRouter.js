const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  getUsersWithAccess,
  getUsersWithoutAccess,
  addUserToDocument,
} = require("../controllers/user");

router.route("/all").get(getUsers);
router.route("/:userId").get(getUser);
router.route("/withAccess/:documentId").get(getUsersWithAccess);
router.route("/withoutAccess/:documentId").get(getUsersWithoutAccess);
router.route("/addUserToDocument").post(addUserToDocument);
module.exports = router;
