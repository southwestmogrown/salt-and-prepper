import "./Mealplan.css";
import { Box } from "@mui/material";
function Mealplan() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <h1>Mealplan</h1>
    </Box>
  );
}

export default Mealplan;
