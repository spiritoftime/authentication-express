const db = require("../db/models");
const { User, Document } = db;
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
module.exports = {
  getUserWithDocuments,
};
