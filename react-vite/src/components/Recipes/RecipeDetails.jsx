import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams()
  const recipes = useSelector(state => state.recipes);
  const recipe = recipes[id]

  console.log(recipe)


  return (
    <Box
      sx={{
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <Typography variant="h1">{recipe.name}</Typography>
      <Typography variant="h2">{recipe.recipe_type}</Typography>
      <Typography variant="body">{recipe.instructions}</Typography>
    </Box>
  )
}

export default RecipeDetails
