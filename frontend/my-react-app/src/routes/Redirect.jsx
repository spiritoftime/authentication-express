import { v4 as uuidV4 } from "uuid";
import { Navigate } from "react-router-dom";

const Redirect = () => {
  const documentId = uuidV4();
  return <Navigate to={`/documents/${documentId}`} />;
};

export default Redirect;
