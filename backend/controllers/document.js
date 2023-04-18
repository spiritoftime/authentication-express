const db = require("../db/models");
const { User, Document } = db;

const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const document = await findOrCreateDocument(documentId);
  return res.status(200).json({ document });
};

async function findOrCreateDocument(documentId) {
  if (documentId == null) return;
  const documentWithCreator = await Document.findByPk(documentId, {
    include: { model: User, as: "user" },
    attributes: {
      exclude: ["password", "refreshToken"],
    },
  });

  if (documentWithCreator) return documentWithCreator;
  return await Document.create({ id: documentId, data: "" });
}
module.exports = { getDocument, findOrCreateDocument };
