import { Box, List, ListItem } from "@mui/material"
import { useSelector } from "react-redux"
import MenuRecipeCard from "./MenuRecipeCard";


function Recipes({setOpen}) {
  const flatRecipes = useSelector(state => state.recipes);
  const recipes = Object.values(flatRecipes)

  return (
    <Box>
      <List>
        {recipes.map(recipe => (
            <ListItem key={recipe.id}>
              <MenuRecipeCard setOpen={setOpen} recipe={recipe}/>
            </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Recipes
