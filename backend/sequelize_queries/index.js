const db = require("../db/models");
const { Op } = require("sequelize");
const { User, Document, UserDocumentAccess } = db;
async function getUserWithDocuments(username) {
  const userWithDocuments = await User.findOne({
    where: { username: username },
    attributes: {
      exclude: ["refreshToken", "password"],
    },
    include: [
      {
        model: Document,
        as: "createdDocuments",
        attributes: ["id"],
      },
      {
        model: Document,
        as: "accessibleDocuments",
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  });
  return userWithDocuments;
}
async function queryUsersWithAccess(documentId) {
  const usersWithAccess = await db.User.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: db.Document,
        as: "accessibleDocuments",
        through: {
          model: UserDocumentAccess,
          where: { document_id: documentId },
        },
        attributes: [],
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
  getUserWithDocuments,
  queryUsersWithAccess,
  queryUsersWithoutAccess,
};
