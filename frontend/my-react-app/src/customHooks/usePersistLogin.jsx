import { useEffect } from "react";
import { persistLogin } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../context/appContext";
import { axiosInstance } from "../services/makeRequest";
const usePersistLogin = () => {
  const { authDetails, setAuthDetails, setIsLoadingAuth } = useAppContext();

  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: () => {
      return persistLogin();
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });
      const accessToken = res.headers.authorization.split(" ")[1];

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    },
    onSettled: () => setIsLoadingAuth(false), // Set loading state to false after checking
  });
  useEffect(() => {
    if (Object.keys(authDetails).length === 0) {
      // currently not logged in but previously logged in
      setIsLoadingAuth(true);
      persistLoginMutation();
    }
  }, []);
};

export default usePersistLogin;
