const express = require("express");
const router = express.Router();
const { getDocument } = require("../controllers/document");
router.route("/:documentId").get(getDocument);
module.exports = router;
