import { v4 as uuidV4 } from "uuid";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Redirect = () => {
  const documentId = uuidV4();
  return <Navigate to={`/documents/${uuidV4()}`} />;
};

export default Redirect;
