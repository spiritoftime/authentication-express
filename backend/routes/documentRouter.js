const express = require("express");
const router = express.Router();
const { getDocument, editDocument } = require("../controllers/document");
router.route("/:documentId").get(getDocument).post(editDocument);
module.exports = router;
