const db = require("../db/models");
const { User, Document } = db;
const { queryUsersWithAccess } = require("../sequelize_queries/index");
const getUser = async (req, res) => {
  const { userId } = req.params;
  const userWithDocuments = await User.findByPk(userId, {
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

  res.status(200).json({ documents: userWithDocuments });
};
const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name"],
  });
  return res.status(200).json(users);
};
const getUsersWithAccess = async (req, res) => {
  const { documentId } = req.params;

  const usersWithAccess = await queryUsersWithAccess(documentId);

  return res.status(200).json(usersWithAccess);
};
module.exports = { getUser, getUsers, getUsersWithAccess };
