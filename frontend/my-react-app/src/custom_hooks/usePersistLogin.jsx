import React, { useEffect } from "react";
import { persistLogin } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../context/appContext";
import { api } from "../services/makeRequest";
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
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
