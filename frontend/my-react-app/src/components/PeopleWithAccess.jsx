import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../helper_functions/muiAvatar";
import SelectOption from "./SelectOption";
const PeopleWithAccess = ({
  isAccessFetching,
  userAccess,
  setChangeAccess,
}) => {
  return (
    <>
      <Typography variant="h6" component="h6">
        People with access
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {!isAccessFetching &&
          userAccess &&
          userAccess.map((user) => {
            return (
              <Box key={user.id} display="flex" gap={2}>
                <Avatar {...stringAvatar(user.name)} />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Typography variant="h6" component="h6">
                    {user.name}
                  </Typography>
                  {user.folderRole === "creator" ? (
                    <Typography variant="h6" component="h6">
                      {user.folderRole}
                    </Typography>
                  ) : (
                    <SelectOption
                      setChangeAccess={setChangeAccess}
                      currentUser={user}
                      role={user.folderRole}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default PeopleWithAccess;
