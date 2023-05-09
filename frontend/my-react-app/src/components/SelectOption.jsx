import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectOption = ({ setOption, option, residingFolder }) => {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-standard-label">
        Grant Access to:
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        label="grant access to"
      >
        <MenuItem value={"document"}>Current Document</MenuItem>
        {residingFolder && <MenuItem value={"folder"}>Current Folder</MenuItem>}
      </Select>
    </FormControl>
  );
};

export default SelectOption;
