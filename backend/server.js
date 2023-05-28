require("dotenv").config();
const authenticateToken = require("./middleware/authenticateToken");
const express = require("express");
const db = require("./db/models");
const { Document } = require("./db/models");
const cors = require("cors");
const app = express();
const documentRouter = require("./routes/documentRouter");
const userRouter = require("./routes/userRouter");
const folderRouter = require("./routes/folderRouter");
const authRouter = require("./routes/authRouter");
const documentAccessRouter = require("./routes/UserDocumentAccessRouter");
const folderAccessRouter = require("./routes/UserFolderAccessRouter");
const cookieParser = require("cookie-parser");
const { getAccessType } = require("./controllers/UserDocumentAccess");
const { findDocument } = require("./controllers/document");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://commondocs.vercel.app", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://commondocs.vercel.app", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
let documentToUsers = {};
app.use(express.json());
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId, username) => {
    console.count("connect ran");
    socket.username = username;
    if (documentToUsers[documentId]) {
      documentToUsers[documentId].add(username);
    } else {
      documentToUsers[documentId] = new Set([username]);
    }
    const document = await findDocument(documentId, username);
    const accessType = await getAccessType(documentId, username);
    socket.emit(
      "load-document",
      document.data,
      document.text,
      document.parent,
      accessType
    );
  });
  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    socket.lastDocument = documentId;
    io.to(documentId).emit("users", [...documentToUsers[documentId]]);
  });
  socket.on("disconnect", () => {
    console.count("disconnect ran");
    if (documentToUsers[socket.lastDocument].has(socket.username)) {
      documentToUsers[socket.lastDocument].delete(socket.username);
    }
    io.to(socket.lastDocument).emit("users", [
      ...documentToUsers[socket.lastDocument],
    ]);
  });
  socket.on("send-changes", (delta, documentId) => {
    socket.broadcast.to(documentId).emit("receive-changes", delta);
  });
  socket.on("save-document", async (document, documentId) => {
    await Document.update({ data: document }, { where: { id: documentId } });
    io.to(documentId).emit("document-saved", "All changes saved!");
  });
  socket.on("switch-document", (oldDocumentId, newDocumentId, username) => {
    // Leave the old room
    socket.leave(oldDocumentId);
    // Remove the user from the old room's user list
    if (documentToUsers[oldDocumentId]) {
      documentToUsers[oldDocumentId].delete(username);
      io.to(oldDocumentId).emit("users", [...documentToUsers[oldDocumentId]]);
    }
    // Join the new room
    socket.join(newDocumentId);
    socket.lastDocument = newDocumentId;
    // Add the user to the new room's user list
    if (documentToUsers[newDocumentId]) {
      documentToUsers[newDocumentId].add(username);
    } else {
      documentToUsers[newDocumentId] = new Set([username]);
    }
    // Emit the updated user list for the new room
    io.to(newDocumentId).emit("users", [...documentToUsers[newDocumentId]]);
  });
});
app.use("/", authRouter);
app.use("/documents", authenticateToken, documentRouter);
app.use("/users", authenticateToken, userRouter);
app.use("/folders", authenticateToken, folderRouter);
app.use("/folderAccess", authenticateToken, folderAccessRouter);
app.use("/documentAccess", authenticateToken, documentAccessRouter);
// app.get("/posts", authenticateToken, (req, res) => {
//   res.status(200).json({ message: "you made it!" });
// });

const port =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.PORT;

server.listen(port, () => console.log(`server running on port ${port}`));
