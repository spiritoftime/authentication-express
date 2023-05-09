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
async function queryUsersWithAccess(documentId, folderId) {
  console.log(documentId, folderId);
  if (!folderId)
    return await db.User.findAll({
      attributes: [
        "id",
        "name",
        [col("accessibleDocuments->UserDocumentAccess.role"), "documentRole"],
      ],
      include: [
        {
          model: db.Document,
          as: "accessibleDocuments",
          where: { id: documentId },
          attributes: [],
          through: {
            model: db.UserDocumentAccess,
            attributes: ["role"],
          },
          required: true, // inner join
        },
      ],
    });
  return await db.User.findAll({
    attributes: [
      "id",
      "name",
      [col("accessibleDocuments->UserDocumentAccess.role"), "documentRole"],
      [col("accessibleFolders->UserFolderAccess.role"), "folderRole"],
    ],
    include: [
      {
        model: db.Document,
        as: "accessibleDocuments",
        where: { id: documentId },
        attributes: [],
        through: {
          model: db.UserDocumentAccess,
          attributes: ["role"],
        },
        required: false,
      },
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
    where: {
      [Op.or]: [
        { "$accessibleDocuments.id$": { [Op.eq]: documentId } },
        { "$accessibleFolders.id$": { [Op.eq]: folderId } },
      ],
    },
  });
}
async function queryUsersWithoutAccess(documentId, folderId) {
  if (!folderId)
    return await db.User.findAll({
      attributes: [
        "id",
        "name",
        [col("accessibleDocuments->UserDocumentAccess.role"), "documentRole"],
      ],
      include: [
        {
          model: db.Document,
          as: "accessibleDocuments",
          through: {
            model: UserDocumentAccess,
            attributes: ["role"],
          },
          attributes: [],
          required: false, // LEFT JOIN
        },
      ],
      where: {
        // findAll returns all users in the user db. hence, filter again to just return only the people without access.
        "$accessibleDocuments.id$": null,
      },
    });
  return await db.User.findAll({
    attributes: [
      "id",
      "name",
      [col("accessibleDocuments->UserDocumentAccess.role"), "documentRole"],
      [col("accessibleFolders->UserFolderAccess.role"), "folderRole"],
    ],
    include: [
      {
        model: db.Document,
        as: "accessibleDocuments",
        through: {
          model: UserDocumentAccess,
          attributes: ["role"],
        },
        attributes: [],
        required: false,
      },
      {
        model: db.Folder,
        as: "accessibleFolders",
        through: {
          model: UserFolderAccess,
          attributes: ["role"],
        },
        attributes: [],
        required: false,
      },
    ],
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { "$accessibleDocuments.id$": { [Op.is]: null } },
            { "$accessibleFolders.id$": { [Op.is]: null } },
          ],
        },
        {
          [Op.and]: [
            { "$accessibleDocuments.id$": { [Op.eq]: documentId } },
            { "$accessibleFolders.id$": { [Op.is]: null } },
          ],
        },
        {
          [Op.and]: [
            { "$accessibleDocuments.id$": { [Op.is]: null } },
            { "$accessibleFolders.id$": { [Op.eq]: folderId } },
          ],
        },
      ],
    },
  });
}
module.exports = {
  queryUserDetails,
  queryUsersWithAccess,
  queryUsersWithoutAccess,
};
