const db = require("../db/models");
const { User, Document, UserDocumentAccess, UserFolderAccess, Folder } = db;
const { Op } = require("sequelize");
const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const document = await Document.findByPk(documentId, {
    include: {
      model: User,
      as: "creator",
      attributes: {
        exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
      },
    },
  });
  return res.status(200).json({ document });
};

async function findDocument(documentId, username) {
  const documentWithCreator = await Document.findByPk(documentId, {
    include: {
      model: User,
      as: "creator",
      attributes: {
        exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
      },
    },
  });
  return documentWithCreator;
}
async function createDocument(req, res) {
  const { title, folderId, createdBy } = req.body;
  try {
    const parentFolder = await Folder.findByPk(folderId);
    const document = await Document.create({
      parent: folderId,
      createdBy: parentFolder.createdBy,
      text: title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const users = await UserFolderAccess.findAll({
      attributes: ["userId", "role"],
      where: { folderId: folderId, role: { [Op.ne]: "creator" } },
    }); // find users with the access to the parent folder, and add them into this document with the same permission settings
    for (const user of users)
      await UserDocumentAccess.create({
        userId: user.userId,
        documentId: document.id,
        role: user.role,
      });

    return res.status(201).json({ document, type: "document" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
async function editDocument(req, res) {
  // for edit title and drag and drop functionality
  const { title, parent } = req.body;

  const { documentId } = req.params;
  const document = await Document.findByPk(documentId);
  if (title) document.text = title;
  if (parent) document.parent = parent;

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
  findDocument,
  editDocument,
  createDocument,
  deleteDocument,
};
