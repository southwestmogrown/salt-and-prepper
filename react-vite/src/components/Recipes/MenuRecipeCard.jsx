import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import { NavLink } from "react-router-dom";

function MenuRecipeCard({ recipe }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={
          <NavLink to={`/recipes/${recipe.id}`}>
            {recipe.name}
          </NavLink>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
     
    </Card>
  )
}

export default MenuRecipeCard
