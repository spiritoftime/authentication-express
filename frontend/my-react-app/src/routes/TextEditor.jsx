import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { api } from "../services/makeRequest";
import { useMutation } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { useAppContext } from "../context/appContext";
import { persistLogin } from "../services/auth";
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
  const { authDetails, setAuthDetails, setIsLoadingAuth } = useAppContext();
  const { id: documentId } = useParams();
  console.log(documentId);

  const [documentSaved, setDocumentSaved] = useState("All changes saved!");
  const quillRef = useRef();
  const saveTimeout = useRef(null);
  const [socket, setSocket] = useState();
  // mount the socket.io
  const { mutate: reloginMutation } = useMutation({
    // this is needed so that authDetails.accessibleDocuments and createdBy is updated when you create a new document
    mutationFn: (accessToken) => {
      return persistLogin(accessToken);
    },
    onSuccess: (res) => {
      setAuthDetails((prev) => ({
        ...res.data.userWithDocuments,
        isNewDocument: prev.isNewDocument,
      }));
      const accessToken = res.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoadingAuth(false); // Set loading state to false after checking
    },
  });
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
    console.log(documentId);
    socket.emit("get-document", documentId, authDetails.username);
    quillInstance.setText("Loading...");
    quillInstance.disable();
    socket.once("load-document", (document) => {
      setIsLoadingAuth(true);
      reloginMutation(localStorage.getItem("accessToken"));
      setIsLoadingAuth(false);
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
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      // Set new save timeout
      saveTimeout.current = setTimeout(() => {
        socket.emit("save-document", quillInstance.getContents());
        setDocumentSaved("saving document....");
      }, 1000);
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
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

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
