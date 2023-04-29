const db = require("../db/models");
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
module.exports = {
  getUserWithDocuments,
  queryUsersWithAccess,
};
