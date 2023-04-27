import { useContext, useState } from "react";
import React from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  return (
    <AppContext.Provider
      value={{
        authDetails,
        setAuthDetails,
        isLoadingAuth,
        setIsLoadingAuth,
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
