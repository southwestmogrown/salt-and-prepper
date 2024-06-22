import { Box, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import MealplanCard from "./MealplanCard";
function Mealplans({ setOpen }) {
  const userMealplans = useSelector((state) => state.mealplans.plans);

  return (
    <Box>
      <List>
        {userMealplans.map((mealplan) => (
          <ListItem key={mealplan.id}>
            <MealplanCard setOpen={setOpen} mealplan={mealplan} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Mealplans;
