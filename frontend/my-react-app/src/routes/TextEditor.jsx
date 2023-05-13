import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { io } from "socket.io-client";
import { useAppContext } from "../context/appContext";
import DocumentBar from "../components/DocumentBar";
import NestedFolders from "../components/NestedFolders";
import { useNavigate } from "react-router-dom";
import ReactQuillBar, { formats, modules } from "../components/ReactQuillBar";
import useReLoginMutation from "../../reactQueryMutations/useReLoginMutation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SAVE_INTERVAL_MS = 1000;

export default function TextEditor() {
  const { authDetails, setAuthDetails, setIsLoadingAuth, isDarkMode } =
    useAppContext();
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [accessType, setAccessType] = useState("");
  const { id: documentId } = useParams();
  const [users, setUsers] = useState([]);
  const reloginMutation = useReLoginMutation();
  const [documentSaved, setDocumentSaved] = useState("All changes saved!");
  const navigate = useNavigate();
  const quillRef = useRef();
  const saveTimeout = useRef(null);
  const [socket, setSocket] = useState();
  const [scrolled, setScrolled] = useState(false);

  const [residingFolder, setResidingFolder] = useState(null);
  const paddingTop = scrolled ? "80px" : "16px";
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [showNested, setShowNested] = useState(isMdDown ? false : true);
  const switchRoom = (newDocumentId, socket) => {
    if (socket && newDocumentId !== documentId) {
      // Emit a 'switch-room' event to the server with the old and new documentId
      socket.emit(
        "switch-document",
        documentId,
        newDocumentId,
        authDetails.username
      );
      navigate(`/documents/${newDocumentId}`);
    }
  };
  // mount the socket.io
  useEffect(() => {
    const s = io("http://localhost:3001"); // connect to backend URI
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    setSocket(s);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      s.disconnect();
      setSocket(false);
    };
  }, []);
  useEffect(() => {
    if (socket == null || quillRef == null) return;
    const quillInstance = quillRef.current.getEditor();
    socket.emit("get-document", documentId, authDetails.username);
    quillInstance.setText("Loading...");
    quillInstance.disable();
    socket.emit("join-document", documentId);
    socket.once(
      "load-document",
      (document, title, residingFolder, accessType) => {
        setDocumentTitle(title);
        setResidingFolder(residingFolder);
        setIsLoadingAuth(true);
        reloginMutation();
        setAccessType(accessType);
        setIsLoadingAuth(false);
        quillInstance.setContents(document);
        if (accessType !== "viewer") quillInstance.enable();
      }
    );

    const sendChangehandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta, documentId);
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      // Set new save timeout
      saveTimeout.current = setTimeout(() => {
        socket.emit("save-document", quillInstance.getContents(), documentId);

        setDocumentSaved("saving document....");
      }, SAVE_INTERVAL_MS);
    };
    socket.on("users", (users) => {
      setUsers(users);
    });
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
  }, [documentId, quillRef, socket]);

  return (
    <Box display="flex" sx={{ overflowX: "hidden" }} flexDirection="column">
      <Box display="flex">
        <Box paddingTop={2}>
          {showNested !== true && (
            <IconButton onClick={() => setShowNested(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: isDarkMode
              ? "hsl(160, 0%, 20%)"
              : "hsl(160, 0%, 92%)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            className={showNested === true ? "animate-show" : "animate-hide"}
            position="sticky" // not working
            sx={{
              backgroundColor: isDarkMode
                ? "hsl(160, 0%, 20%)"
                : "hsl(160, 0%, 92%)",
              padding: `${paddingTop} 16px 0 `,
              transition: "padding-top 0.3s ease",
              top: 0,
              height: "400px",

              display: {
                xs: showNested ? "flex" : "none",
                sm: showNested ? "flex" : "none",
                md: showNested ? "flex" : "none",
              },
            }}
            flexDirection="column"
          >
            {showNested !== false && (
              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => setShowNested(false)}
              >
                <CloseIcon />
              </IconButton>
            )}
            <NestedFolders
              accessType={"creator"}
              type="personal"
              socket={socket}
              switchRoom={switchRoom}
            />
            <NestedFolders
              type="shared"
              accessType={accessType}
              socket={socket}
              switchRoom={switchRoom}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{ padding: "0 16px", flexGrow: 1 }}
          flexDirection="column"
        >
          <Box
            sx={{
              flexDirection: "column",

              flexGrow: 1,
            }}
          >
            <DocumentBar
              accessType={accessType}
              residingFolder={residingFolder}
              users={users}
              setDocumentSaved={setDocumentSaved}
              setDocumentTitle={setDocumentTitle}
              documentTitle={documentTitle}
              documentId={documentId}
              documentSaved={documentSaved}
            />
            <ReactQuillBar />
          </Box>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            formats={formats}
            theme="snow"
          />
        </Box>
      </Box>
    </Box>
  );
}
