const db = require("../db/models");
const { User, Folder, UserFolderAccess, UserDocumentAccess, Document } = db;
const { Op } = require("sequelize");
const { queryFolders } = require("../sequelize_queries/index");
const getFolders = async (req, res) => {
  try {
    const { userId } = req.query;
    const { myFolders, sharedFolders } = await queryFolders(userId);

    res.status(200).json({ myFolders, sharedFolders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching folders" });
  }
};
const createFolder = async (req, res) => {
  const { title, folderId, createdBy, accessType } = req.body;

  try {
    const parentFolder = Folder.findByPk(folderId);
    const folder = await Folder.create({
      createdBy: accessType === "creator" ? createdBy : parentFolder.createdBy,
      parent: folderId,
      text: title,
    });
    await UserFolderAccess.create({
      userId: accessType === "creator" ? createdBy : parentFolder.createdBy,
      folderId: folder.id,
      role: "creator",
    });

    const users = await UserFolderAccess.findAll({
      attributes: ["userId", "role"],
      where: { folderId: folderId, role: { [Op.ne]: "creator" } },
    });
    for (const user of users) {
      await UserFolderAccess.create({
        userId: user.userId,
        folderId: folder.id,
        role: user.role,
      });
    }
    // Send a response back to the client with the created folder and UserFolderAccess record
    res.status(201).json({
      folder,
      type: "folder",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  try {
    await Folder.destroy({ where: { id: folderId } });
    return res.status(200).json({ message: "Folder deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const editFolder = async (req, res) => {
  const { parent } = req.body;
  const { folderId } = req.params;
  const folder = await Folder.findByPk(folderId);
  if (parent) folder.parent = parent;
  await folder.save();
  return res.status(201).send("All changes saved!");
};
module.exports = { createFolder, deleteFolder, editFolder, getFolders };
