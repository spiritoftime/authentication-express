import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../services/folder";
import { useAppContext } from "../context/appContext";
import Box from "@mui/material/Box";

import FolderTable from "../components/FolderTable";
import { useTheme } from "@mui/material/styles";
const Home = () => {
  const { authDetails } = useAppContext();
  const theme = useTheme();
  const { data: folders, isLoading: isFetching } = useQuery({
    queryKey: ["getFolders"],
    queryFn: () => {
      return getFolders(authDetails.id);
    },
    refetchOnWindowFocus: false,
  });
  if (isFetching) return <div>Loading...</div>;
  console.log(folders.data);
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
