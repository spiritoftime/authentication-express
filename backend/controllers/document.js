const db = require("../db/models");
const { User, Document } = db;

const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const document = await document.findByPk(documentId);
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

  const newDocument = await user.createCreatedDocument({
    id: documentId,
    title: "Untitled Document",
  });
  await user.addAccessibleDocument(newDocument);
  return newDocument;
}
async function editDocument(req, res) {
  const { title } = req.body;

  const { documentId } = req.params;
  const document = await Document.findByPk(documentId);
  document.title = title;
  await document.save();
  return res.status(200).send("All changes saved!");
}
module.exports = { getDocument, findOrCreateDocument, editDocument };
