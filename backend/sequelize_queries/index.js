const { text } = require("express");
const db = require("../db/models");
const { Op, col } = require("sequelize");
const { User, Document, UserDocumentAccess, Folder } = db;
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
async function queryUsersWithAccess(documentId) {
  const usersWithAccess = await db.User.findAll({
    attributes: [
      "id",
      "name",
      [col("accessibleDocuments->UserDocumentAccess.role"), "role"],
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

  return usersWithAccess;
}
async function queryUsersWithoutAccess(documentId) {
  const usersWithoutAccess = await db.User.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: db.Document,
        as: "accessibleDocuments",
        through: {
          model: UserDocumentAccess,
          where: {
            document_id: {
              [Op.eq]: documentId,
            },
          },
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
  return usersWithoutAccess;
}
module.exports = {
  queryUserDetails,
  queryUsersWithAccess,
  queryUsersWithoutAccess,
};
