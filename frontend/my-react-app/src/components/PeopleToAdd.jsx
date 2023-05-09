import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const PeopleToAdd = ({ addUsers }) => {
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
              color: "black",
              padding: "5px 8px",
              backgroundColor: "#f1f1f1",
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PeopleToAdd;
