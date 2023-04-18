import { v4 as uuidV4 } from "uuid";
import { Navigate } from "react-router-dom";
const Redirect = () => {
  return <Navigate to={`/documents/${uuidV4()}`} />;
};

export default Redirect;
