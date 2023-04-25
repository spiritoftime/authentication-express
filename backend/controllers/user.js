const db = require("../db/models");
const { User, Document } = db;
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
module.exports = { getUser };
