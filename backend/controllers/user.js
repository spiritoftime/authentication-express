const db = require("../db/models");
const { User, Document, Folder } = db;
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
        attributes: ["id"],
      },
      {
        model: Document,
        as: "accessibleDocuments",
        attributes: ["id,title"],
        through: { attributes: [] },
      },
      {
        model: Folder,
        as: "accessibleFolders",
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
const getUsersWithoutAccess = async (req, res) => {
  const { documentId } = req.params;
  const usersWithoutAccess = await queryUsersWithoutAccess(documentId);

  return res.status(200).json(usersWithoutAccess);
};
const addUserToDocument = async (req, res) => {
  const { name, documentId } = req.body;

  const user = await User.findOne({ where: { name: name } });

  const document = await Document.findOne({ where: { id: documentId } });

  await user.addAccessibleDocument(document);
  return res.status(200).send("Users added to document!");
};
module.exports = {
  getUser,
  getUsers,
  getUsersWithAccess,
  getUsersWithoutAccess,
  addUserToDocument,
};
