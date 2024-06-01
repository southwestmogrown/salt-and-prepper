import { Box, FormLabel, Select, TextField, MenuItem, Button, IconButton, Snackbar } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close'
import { thunkAddRecipe, thunkUpdateRecipe } from "../../redux/recipe";
import { useModal } from "../../context/Modal";

function AddRecipeForm({recipe}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const { closeModal } = useModal()
  const [name, setName] = useState(recipe?.name || '');
  const [recipeType, setRecipeType] = useState(recipe?.recipe_type || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '')
  const [description, setDescription] = useState(recipe?.description || '')
  const [open, setOpen] = useState(false)


  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )


  const handleSubmit = async (e) => {
    e.preventDefault()

    const recipeObj = {
      userId: sessionUser.id,
      name,
      recipe_type: recipeType,
      instructions,
      description
    }

    if (recipe) {
      recipeObj.id = recipe.id
    }
    console.log(recipeObj)

    const errors = recipe ? await dispatch(thunkUpdateRecipe(recipeObj)) : await dispatch(thunkAddRecipe(recipeObj))
    if (!errors) {
      setOpen(true)
      closeModal()
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      onSubmit={handleSubmit}
    >
      <Box>
        <TextField
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What is the name of your recipe?"
        />
        <FormLabel htmlFor="recipe-type">
          What type of recipe is this?
        </FormLabel>
        <Select
          value={recipeType}
          id="recipe-type"
          onChange={(e) => setRecipeType(e.target.value)}
        >
        
        {["Breakfast", "Brunch", "Lunch", "Snack", "Dinner", "Brinner", "Dessert"].map(text => (
          <MenuItem key={text} value={text}>{text}</MenuItem>
        ))}
        </Select>
        <TextField
          id="description"
          multiline
          value={description}
          placeholder="Describe your dish!"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="instructions"
          multiline
          value={instructions}
          placeholder="How do you prepare this recipe?"
          onChange={(e) => setInstructions(e.target.value)}
        />
        <Button type="submit" variant="outlined">{recipe ? "Update Recipe" : "Add Recipe"}</Button>
        <Snackbar 
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={`Successfully created a new recipe for ${name}`}
          action={action}
        />
      </Box>
    </Box>
  )
}

export default AddRecipeForm
