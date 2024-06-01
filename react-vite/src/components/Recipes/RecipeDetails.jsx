import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkDeleteRecipe, thunkGetRecipes } from "../../redux/recipe";
import OpenModalButton from "../OpenModalButton";
import AddRecipeForm from "../AddRecipeForm";

function RecipeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const recipes = useSelector(state => state.recipes);
  const recipe = recipes[id]

  useEffect(() => {
    dispatch(thunkGetRecipes(sessionUser?.id))
  }, [dispatch, sessionUser])

  const handleDelete = async () => {
    dispatch(thunkDeleteRecipe(sessionUser.id, id))
    navigate('/home')
  }


  return ( sessionUser && recipes && 
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
      <Typography variant="h1">{recipe?.name}</Typography>
      <Typography variant="h2">{recipe?.recipe_type}</Typography>
      <Typography variant="body2">{recipe?.description}</Typography>
      <Typography variant="body">{recipe?.instructions}</Typography>
      <Container 
        sx={{
          display:"flex",
          justifyContent: "space-around",
          width: "100vw",
          marginTop: "3rem"
        }}
      >
        <Button variant="contained" onClick={() => handleDelete()}>Delete</Button>
        <OpenModalButton modalComponent={<AddRecipeForm recipe={recipe}/>} buttonText="Update"  />
      </Container>
    </Box>
  )
}

export default RecipeDetails
