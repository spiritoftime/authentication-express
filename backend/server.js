require("dotenv").config();
const authenticateToken = require("./middleware/authenticateToken");
const express = require("express");
const db = require("./db/models");
const { Document } = require("./db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { login, register } = require("./controllers/auth");
const documentRouter = require("./routes/documentRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const { findOrCreateDocument } = require("./controllers/document");
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json());
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId, username) => {
    const document = await findOrCreateDocument(documentId, username);
    console.log(document);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (document) => {
      await Document.update({ data: document }, { where: { id: documentId } });

      io.to(documentId).emit("document-saved", "All changes saved!");
    });
  });
});
app.use("/", authRouter);
app.use("/documents", documentRouter);
app.use("/users", userRouter);
// app.get("/posts", authenticateToken, (req, res) => {
//   res.status(200).json({ message: "you made it!" });
// });

app.listen(3000, () => console.log("app running on port 3000"));
