const db = require("../db/models");
const { User, Document, Folder, UserDocumentAccess, UserFolderAccess } = db;
const { Op } = require("sequelize");
const addUsersToDocument = async (req, res) => {
  const { people, documentId } = req.body; // add type and change documentId to nodeId
  for (const person of people) {
    const user = await User.findOne({ where: { name: person } });
    await UserDocumentAccess.create({
      userId: user.id,
      documentId: documentId,
      role: "collaborator",
    });
  }
  return res.status(200).send("Users added to document!");
};
const editAccessDocument = async (req, res) => {
  const { changeAccess, documentId } = req.body;
  for (const [userId, accessType] of Object.entries(changeAccess)) {
    const userAccess = await UserDocumentAccess.findOne({
      where: { userId: +userId, documentId: documentId },
    });
    userAccess.role = accessType;
    await userAccess.save();
  }
  return res.status(200).send("Access changed for users!");
};
const getAccessType = async (documentId, username) => {
  const { id: userId } = await User.findOne({ where: { username: username } });
  const { role } = await UserDocumentAccess.findOne({
    where: { userId: userId, documentId: documentId },
  });
  return role;
};
module.exports = { addUsersToDocument, editAccessDocument, getAccessType };
