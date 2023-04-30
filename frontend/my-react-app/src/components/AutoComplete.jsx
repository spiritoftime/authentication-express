import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const AutoComplete = ({ usersWithoutAccess, setAddUsers }) => {
  return (
    <Autocomplete
      onChange={(e) => {
        setAddUsers((prev) => {
          if (!prev.includes(e.target.innerText)) {
            return [...prev, e.target.innerText];
          } else {
            return prev;
          }
        });
      }}
      getOptionLabel={(option) => option.name}
      options={usersWithoutAccess.data}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Add People" />}
    />
  );
};

export default AutoComplete;
