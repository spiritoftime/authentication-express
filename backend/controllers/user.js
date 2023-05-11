const db = require("../db/models");
const { User, Document, Folder, UserDocumentAccess, UserFolderAccess } = db;
const { Op } = require("sequelize");
const {
  queryUsersWithAccess,
  queryUsersWithoutAccess,
} = require("../sequelize_queries/index");
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

  res.status(200).json({ documents: userWithDocuments });
};
const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name"],
  });
  return res.status(200).json(users);
};
const getUsersWithAccess = async (req, res) => {
  const { folderId } = req.query;

  const usersWithAccess = await queryUsersWithAccess(folderId);

  return res.status(200).json(usersWithAccess);
};
const getUsersWithoutAccess = async (req, res) => {
  const { folderId } = req.query;

  const usersWithoutAccess = await queryUsersWithoutAccess(folderId);

  return res.status(200).json(usersWithoutAccess);
};

module.exports = {
  getUser,
  getUsers,
  getUsersWithAccess,
  getUsersWithoutAccess,
};
