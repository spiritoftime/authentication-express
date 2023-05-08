import React from "react";
import { useMutation } from "@tanstack/react-query";
import { persistLogin } from "../src/services/auth";
import { useAppContext } from "../src/context/appContext";
import { api } from "../src/services/makeRequest";
const useReLoginMutation = () => {
  const { setIsLoadingAuth, setAuthDetails } = useAppContext();
  // takes in a callback to update authDetails to whatever is the desired state
  const { mutate: reloginMutation } = useMutation({
    mutationFn: () => {
      return persistLogin();
    },
    onSuccess: (res) => {
      setAuthDetails((prev) => ({
        ...res.data.userWithDocuments,
      }));
      const accessToken = res.headers.authorization.split(" ")[1];

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoadingAuth(false); // Set loading state to false after checking
    },
  });
  return reloginMutation;
};

export default useReLoginMutation;
