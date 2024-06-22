import { Box, TextField, Button, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useModal } from "../../context/Modal";
import { thunkAddMealplan } from "../../redux/mealplan";

function MealplanForm({ date }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(thunkAddMealplan(name, date));

    setOpen(true);
    closeModal();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      onSubmit={handleSubmit}
    >
      <Box>
        <TextField
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What is the name of this mealplan?"
        />

        <Button type="submit" variant="outlined">
          Add Mealplan
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={`Successfully created a new mealplan for ${name}`}
          action={action}
        />
      </Box>
    </Box>
  );
}

export default MealplanForm;
