import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const SelectOption = ({ role, currentUser, setChangeAccess }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentRole, setCurrentRole] = useState(role);
  useEffect(() => {
    setCurrentRole(role);
  }, [role]);
  return (
    <FormControl variant="standard">
      <Select
        onChange={(e) => {
          setChangeAccess((prev) => ({
            ...prev,
            [currentUser.id]: e.target.value,
          }));
          setCurrentRole(e.target.value);
        }}
        displayEmpty
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Access Type"
        value={currentRole}
      >
        <MenuItem value={"collaborator"}>Collaborator</MenuItem>
        <MenuItem value={"viewer"}>Viewer</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectOption;
