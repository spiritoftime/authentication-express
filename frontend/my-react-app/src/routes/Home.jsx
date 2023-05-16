import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFolders } from "../services/folder";
import { useAppContext } from "../context/appContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import FolderTable from "../components/FolderTable";
import { useTheme } from "@mui/material/styles";
const Home = () => {
  const { authDetails, isLoadingAuth } = useAppContext();
  console.log("authDetails", authDetails);
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: folders,
    isLoading: isFetching,
    isError: error,
  } = useQuery({
    queryKey: ["getFolders"],
    queryFn: () => {
      console.log("check", authDetails.id);
      return getFolders(authDetails.id);
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <Box sx={{ padding: { xs: 2, s: 4, sm: "64px 64px 0 64px", lg: 8 } }}>
      <Box display="flex" flexDirection="column">
        <FolderTable
          header={"Owned By me"}
          tableType={"created"}
          data={folders.data.myFolders}
        />
        <FolderTable
          header={"Shared with me"}
          tableType={"shared"}
          data={folders.data.sharedFolders}
        />
      </Box>
    </Box>
  );
};

export default Home;
