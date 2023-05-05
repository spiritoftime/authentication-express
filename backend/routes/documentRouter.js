const express = require("express");
const router = express.Router();
const {
  getDocument,
  editDocument,
  createDocument,
  deleteDocument,
} = require("../controllers/document");
router.route("/").post(createDocument);
router
  .route("/:documentId")
  .get(getDocument)
  .patch(editDocument)
  .delete(deleteDocument);
module.exports = router;
