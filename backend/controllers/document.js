const db = require("../db/models");
const { User, Document, UserDocumentAccess } = db;

const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const document = await Document.findByPk(documentId);
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
    text: "Untitled Document",
  });
  await user.addAccessibleDocument(newDocument);
  return newDocument;
}
async function createDocument(req, res) {
  const { title, folderId, createdBy } = req.body;
  try {
    const document = await Document.create({
      parent: folderId === "null" ? null : folderId,
      createdBy: createdBy,
      text: title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const userDocumentAccess = await UserDocumentAccess.create({
      userId: createdBy,
      documentId: document.id,
    });
    return res.status(201).json({ document, type: "document" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
async function editDocument(req, res) {
  const { title } = req.body;

  const { documentId } = req.params;
  const document = await Document.findByPk(documentId);
  document.text = title;
  await document.save();
  return res.status(200).send("All changes saved!");
}
const deleteDocument = async (req, res) => {
  const { documentId } = req.params;
  try {
    await Document.destroy({ where: { id: documentId } });

    return res.status(200).json({ message: "Document deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getDocument,
  findOrCreateDocument,
  editDocument,
  createDocument,
  deleteDocument,
};
