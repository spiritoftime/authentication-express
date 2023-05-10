const db = require("../db/models");
const { User, Folder, UserFolderAccess } = db;
const createFolder = async (req, res) => {
  const { title, folderId, createdBy } = req.body;

  try {
    const folder = await Folder.create({
      createdBy: createdBy,
      parent: folderId,
      text: title,
    });

    const userFolderAccess = await UserFolderAccess.create({
      userId: createdBy,
      folderId: folder.id,
      role: "creator",
    });

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
  if (parent) folder.parent = parent === "root" ? null : parent;
  await folder.save();
  return res.status(201).send("All changes saved!");
};
module.exports = { createFolder, deleteFolder, editFolder };
