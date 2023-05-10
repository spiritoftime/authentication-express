const { text } = require("express");
const db = require("../db/models");
const { Op, col } = require("sequelize");
const { User, Document, UserDocumentAccess, Folder, UserFolderAccess } = db;
async function queryUserDetails(username) {
  const userDetails = await User.findOne({
    where: { username: username },
    attributes: {
      exclude: ["refreshToken", "password"],
    },
    include: [
      {
        model: Document,
        as: "createdDocuments",
        attributes: ["id", "text", "parent", "createdBy"],
      },
      {
        model: Document,
        as: "accessibleDocuments",
        attributes: ["id", "text", "parent", "createdBy"],
        through: {
          attributes: [],
          where: {
            role: {
              [Op.ne]: "creator",
            },
          },
        },
      },
      {
        model: Folder,
        as: "accessibleFolders",
        attributes: ["id", "text", "parent", "createdBy"],
        through: {
          attributes: [],
          where: {
            role: {
              [Op.ne]: "creator",
            },
          },
        },
      },
      {
        model: Folder,
        as: "createdFolders",
        attributes: ["id", "text", "parent", "createdBy"],
      },
    ],
  });
  return userDetails;
}
async function queryUsersWithAccess(folderId) {
  return await db.User.findAll({
    attributes: [
      "id",
      "name",
      [col("accessibleFolders->UserFolderAccess.role"), "folderRole"],
    ],
    include: [
      {
        model: db.Folder,
        as: "accessibleFolders",
        where: { id: folderId },
        attributes: [],
        through: {
          model: db.UserFolderAccess,
          attributes: ["role"],
        },
        required: false,
      },
    ],
    where: { "$accessibleFolders.id$": { [Op.eq]: folderId } },
  });
}
async function queryUsersWithoutAccess(folderId) {
  return await db.User.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: db.Folder,
        as: "accessibleFolders",
        where: { id: folderId },
        attributes: [],
        through: {
          model: db.UserFolderAccess,
          attributes: ["role"],
        },
        required: false,
      },
    ],
    where: { "$accessibleFolders.id$": { [Op.is]: null } },
  });
}
module.exports = {
  queryUserDetails,
  queryUsersWithAccess,
  queryUsersWithoutAccess,
};
