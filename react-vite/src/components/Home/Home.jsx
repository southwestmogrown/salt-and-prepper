import {  Box} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { thunkGetRecipes } from "../../redux/recipe";
// import RecipeCard from "../RecipeCard";



function Home() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const recipes = useSelector(state => state.recipes.allRecipes)
  console.log(recipes)

  useEffect(() => {
    dispatch(thunkGetRecipes(sessionUser.id))
  }, [dispatch, sessionUser])

  return (
          sessionUser
        ? 
          <Box sx={{ 
            bgcolor: "grey.500",
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}>

            <Box>
              <h1>Recipes</h1>
              {recipes.map(recipe => (
                <>
                
                <h1>{recipe.name}</h1>
                </>
              ))}
            </Box>
          </Box>
        : 
        <Navigate to='/' replace={true} />
  )
}

export default Home
