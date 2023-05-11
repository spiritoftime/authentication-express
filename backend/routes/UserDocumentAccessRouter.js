const express = require("express");
const router = express.Router();
const {
  addUsersToDocument,
  editAccessDocument,
} = require("../controllers/UserDocumentAccess");
router.route("/addUsersToDocument").post(addUsersToDocument);
router.route("/editDocumentAccess").patch(editAccessDocument);

module.exports = router;
