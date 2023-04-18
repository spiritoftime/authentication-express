const db = require("../db/models");
const { User, Document } = db;
const getUser = async (req, res) => {
  const { userId } = req.params;
  const userWithDocuments = await User.findByPk(userId, {
    include: { model: Document, as: "documents" },
  });
  res.status(200).json({ documents: userWithDocuments });
};
