import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/Landing";
import Home from "../components/Home";
import Navigation from "../components/Navigation";
import { RecipeDetails } from "../components/Recipes";
import { MealplanDetails } from "../components/Mealplan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Navigation />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "recipes/:id",
        element: <RecipeDetails />,
      },
      {
        path: "mealplans/:id",
        element: <MealplanDetails />,
      },
    ],
  },
]);
