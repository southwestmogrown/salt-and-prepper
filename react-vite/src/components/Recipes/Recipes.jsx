import { Box, List, ListItem, ListItemText } from "@mui/material"
import { useSelector } from "react-redux"


function Recipes() {
  const recipes = useSelector(state => state.recipes.allRecipes);

  return (
    <Box>
      <List>
        {recipes.map(recipe => (
          <ListItem key={recipe.id}>
            <ListItemText primary={recipe.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Recipes
