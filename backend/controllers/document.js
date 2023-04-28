const db = require("../db/models");
const { User, Document } = db;

const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const document = await findOrCreateDocument(documentId, username);
  return res.status(200).json({ document });
};

async function findOrCreateDocument(documentId, username) {
  if (documentId == null) return;
  const documentWithCreator = await Document.findByPk(documentId, {
    include: {
      model: User,
      as: "creator",
      attributes: {
        exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
      },
    },
  });

  if (documentWithCreator) return documentWithCreator;
  const user = await User.findOne({ where: { username: username } });
  const newDocument = await user.createCreatedDocument({ id: documentId });
  await user.addAccessibleDocument(newDocument);
  return newDocument;
}
module.exports = { getDocument, findOrCreateDocument };
