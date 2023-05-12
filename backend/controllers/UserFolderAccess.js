const db = require("../db/models");
const { User, Document, Folder, UserDocumentAccess, UserFolderAccess } = db;
const { Op } = require("sequelize");
const addUsersToFolder = async (req, res) => {
  const { people, folderId } = req.body;
  for (const person of people) {
    const user = await User.findOne({ where: { name: person } });
    await UserFolderAccess.create({
      userId: user.id,
      folderId: folderId,
      role: "collaborator",
    });
  }
  return res.status(200).send("Users added to folder!");
};
const editAccessFolder = async (req, res) => {
  const { changeAccess, folderId } = req.body;
  for (const [userId, accessType] of Object.entries(changeAccess)) {
    const userAccess = await UserFolderAccess.findOne({
      where: { userId: +userId, folderId: folderId },
    });
    userAccess.role = accessType;
    await userAccess.save();
  }
  return res.status(200).send("Access changed for users!");
};

module.exports = { addUsersToFolder, editAccessFolder };
