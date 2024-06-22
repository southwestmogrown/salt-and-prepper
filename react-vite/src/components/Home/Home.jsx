import { Box, Container, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { thunkGetRecipes } from "../../redux/recipe";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useModal } from "../../context/Modal";
import { thunkLoadMealplans } from "../../redux/mealplan";
import Mealplan, { MealplanForm } from "../Mealplan";

function Home() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userMealplans = useSelector((state) => state.mealplans?.plans);
  const { setModalContent } = useModal();

  const [mpDate, setMpDate] = useState(null);

  useEffect(() => {
    dispatch(thunkGetRecipes(sessionUser.id));
    dispatch(thunkLoadMealplans(sessionUser.id));
  }, [dispatch]);

  const handleDatePick = (value) => {
    setMpDate(value);

    for (let plan of userMealplans) {
      const dateArr = plan.date.split(" ");
      const dateStr = `${dateArr[3]}/${dateArr[2]}/${dateArr[1]}`;
      const date = new Date(dateStr);

      if (value.$d.toDateString() === date.toDateString()) {
        setModalContent(<Mealplan plan={plan} />);
        return;
      }
    }
    setModalContent(<MealplanForm date={value.$d} />);
  };

  return sessionUser ? (
    <Box
      sx={{
        bgcolor: "grey.500",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10rem",
      }}
    >
      <Typography variant="h2">
        Pick a date to start setting up a meal plan!
      </Typography>
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        <StaticDatePicker
          value={mpDate}
          onChange={(newVal) => handleDatePick(newVal)}
          disablePast={true}
        />
      </Container>
    </Box>
  ) : (
    <Navigate to="/" replace={true} />
  );
}

export default Home;
