import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../context/appContext";
const PeopleToAdd = ({ addUsers, setAddUsers }) => {
  const { isDarkMode } = useAppContext();
  return (
    <>
      <Typography variant="h6" component="h6">
        People to add
      </Typography>
      <Box display="flex" gap={2}>
        {addUsers.map((name, idx) => (
          <Box
            key={idx}
            sx={{
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "#1e1e1e",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 8px",
            }}
          >
            {name}
            <IconButton
              onClick={() =>
                setAddUsers((prev) => prev.filter((user) => user !== name))
              }
              aria-label="close"
            >
              <CloseIcon color="warning" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PeopleToAdd;
