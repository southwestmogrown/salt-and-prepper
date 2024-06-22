import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkDeleteMealplan, thunkLoadMealplans } from "../../redux/mealplan";

function MealplanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mealplans = useSelector((state) => state.mealplans.plans);
  const mealplan = mealplans.find((plan) => plan.id === +id);
  console.log(mealplans);

  useEffect(() => {
    dispatch(thunkLoadMealplans());
  }, [dispatch]);

  const handleDelete = async () => {
    dispatch(thunkDeleteMealplan(id));
    navigate("/home");
  };

  return (
    mealplans && (
      <Box
        sx={{
          marginTop: "240px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Typography variant="h1">{mealplan?.name}</Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100vw",
            marginTop: "3rem",
          }}
        >
          <Button variant="contained" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Container>
      </Box>
    )
  );
}

export default MealplanDetails;
