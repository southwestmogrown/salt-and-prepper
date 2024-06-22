import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

function MenuRecipeCard({ setOpen, recipe }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={
          <NavLink onClick={() => setOpen(false)} to={`/recipes/${recipe.id}`}>
            {recipe.name}
          </NavLink>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MenuRecipeCard;
