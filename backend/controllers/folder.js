const db = require("../db/models");
const { User, Folder, UserFolderAccess } = db;
const createFolder = async (req, res) => {
  const { title, folderId, createdBy } = req.body;

  try {
    const folder = await Folder.create({
      createdBy: createdBy,
      parentFolderId: folderId === "null" ? null : folderId,
      folderName: title,
    });

    const userFolderAccess = await UserFolderAccess.create({
      userId: createdBy,
      folderId: folder.id,
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
module.exports = { createFolder, deleteFolder };
