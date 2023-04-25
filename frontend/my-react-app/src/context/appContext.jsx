import { useContext, useState } from "react";
import React from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  return (
    <AppContext.Provider
      value={{
        authDetails,
        setAuthDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
