import React, { useEffect } from "react";
import { persistLogin } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../context/appContext";
import { protectedApi } from "../services/makeProtectedRequest";
const usePersistLogin = () => {
  const { authDetails, setAuthDetails } = useAppContext();
  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: (accessToken) => {
      return persistLogin(accessToken);
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.user });
      const accessToken = res.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
      protectedApi.interceptors.request.use((config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      });
    },
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (Object.keys(authDetails).length === 0 && accessToken) {
      persistLoginMutation(accessToken);
    }
  }, []);
};

export default usePersistLogin;
