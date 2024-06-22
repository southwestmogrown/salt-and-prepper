import { Avatar, Card, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

function MealplanCard({ setOpen, mealplan }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="mealplan">
            M
          </Avatar>
        }
        title={
          <NavLink
            onClick={() => setOpen(false)}
            to={`/mealplans/${mealplan.id}`}
          >
            {mealplan.name}
          </NavLink>
        }
      />
    </Card>
  );
}

export default MealplanCard;
