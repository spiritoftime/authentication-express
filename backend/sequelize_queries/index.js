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
        attributes: ["id", "text", "parent", "createdBy", "updatedAt"],
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
        attributes: ["id", "text", "parent", "createdBy", "updatedAt"],
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
          model: UserFolderAccess,
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
          attributes: [],
        },
        required: false,
      },
    ],
    where: { "$accessibleFolders.id$": { [Op.is]: null } },
  });
}
async function queryFolders(userId) {
  const myFolders = await Folder.findAll({
    where: { createdBy: userId },
    attributes: ["text", "updatedAt"],
    include: [
      {
        model: User,
        as: "foldersAccessibleTo",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        model: db.Document,
        as: "documents",
        attributes: ["id"],
        limit: 1,
      },
    ],
  });
  const sharedFolders = await db.Folder.findAll({
    where: {
      createdBy: {
        [Op.ne]: userId,
      },
    },
    attributes: ["text", "updatedAt"],
    include: [
      {
        model: User,
        as: "foldersAccessibleTo",
        where: {
          id: userId,
        },
        attributes: ["id", "name"],
        through: {
          model: UserFolderAccess,
          attributes: ["role"],
          where: {
            role: {
              [Op.and]: [{ [Op.ne]: "creator" }, { [Op.ne]: null }], // Not equal to 'creator'
            },
          },
        },
      },
      {
        model: User,
        as: "creator",
        attributes: ["name", "id"],
      },
      {
        model: Document,
        as: "documents",
        attributes: ["id"],
        limit: 1,
      },
    ],
  });
  return { sharedFolders, myFolders };
}
module.exports = {
  queryUserDetails,
  queryFolders,
  queryUsersWithAccess,
  queryUsersWithoutAccess,
};
