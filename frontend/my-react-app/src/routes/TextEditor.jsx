import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";
const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];
export default function TextEditor() {
  const { id: documentId } = useParams();
  const [saveTimeout, setSaveTimeout] = useState(null);
  const [documentSaved, setDocumentSaved] = useState("All changes saved!");
  const quillRef = useRef();
  const [socket, setSocket] = useState();
  // mount the socket.io
  useEffect(() => {
    const s = io("http://localhost:3001"); // connect to backend URI
    setSocket(s);
    return () => {
      s.disconnect();
      setSocket(false);
    };
  }, []);

  useEffect(() => {
    if (socket == null || quillRef == null) return;
    const quillInstance = quillRef.current.getEditor();
    socket.emit("get-document", documentId);
    quillInstance.setText("Loading...");
    quillInstance.disable();
    socket.once("load-document", (document) => {
      quillInstance.setContents(document);
      quillInstance.enable();
    });
  }, [documentId, quillRef, socket]);
  // all the socket logic
  useEffect(() => {
    if (socket == null || quillRef == null) return;
    const quillInstance = quillRef.current.getEditor();

    const sendChangehandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set new save timeout
      const newSaveTimeout = setTimeout(() => {
        socket.emit("save-document", quillInstance.getContents());
        setDocumentSaved("saving document....");
      }, 2000); // 2000 ms delay after the user stops typing

      setSaveTimeout(newSaveTimeout);
    };
    const updateHandler = (delta, oldDelta, source) => {
      quillInstance.updateContents(delta);
    };
    socket.on("document-saved", (message) => {
      setDocumentSaved(message);
    });
    quillInstance.on("text-change", sendChangehandler);
    socket.on("receive-changes", updateHandler);
    return () => {
      quillInstance.off("text-change", sendChangehandler);
    };
  }, [socket, quillRef]);

  return (
    <Box display="flex" flexDirection="column" padding={2}>
      <Typography variant="h5" component="h1">
        {documentSaved}
      </Typography>
      <ReactQuill
        ref={quillRef}
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        theme="snow"
      />
    </Box>
  );
}
