import {  Box} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { thunkGetRecipes } from "../../redux/recipe";
// import RecipeCard from "../RecipeCard";



function Home() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const flatRecipes = useSelector(state => state.recipes);
  const recipes = Object.values(flatRecipes)

  useEffect(() => {
      dispatch(thunkGetRecipes(sessionUser.id))
  }, [dispatch, sessionUser.id])

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
                <div key={recipe.name}>
                  <h1>{recipe.name}</h1>
                </div>
              ))}
            </Box>
          </Box>
        : 
        <Navigate to='/' replace={true} />
  )
}

export default Home
