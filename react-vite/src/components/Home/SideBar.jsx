import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useMenuContext } from "../../context/MenuContext";
import { useState } from "react";
import Recipes from "../Recipes/Recipes";

import AddButton from "./AddButton";
import { Mealplans } from "../Mealplan";

const drawerWidth = 240;

function SideBar() {
  const [anchor, setAnchor] = useState(null);
  const [openRecipes, setOpenRecipes] = useState(null);
  const [openMealplans, setOpenMealplans] = useState(null);
  const { showRecipes, setShowRecipes, showMealplans, setShowMealplans } =
    useMenuContext();

  const handleClick = (e, text) => {
    switch (text) {
      case "Recipes": {
        setOpenRecipes(true);
        setShowRecipes(true);
        break;
      }
      case "Meal Plans": {
        setOpenMealplans(true);
        setShowMealplans(true);
        break;
      }
      default:
        break;
    }
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setShowRecipes(false);
    setShowMealplans(false);
    setOpenRecipes(null);
    setOpenMealplans(null);
    setAnchor(null);
  };

  const id = openRecipes ? "simple-popover" : undefined;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          bgcolor: "grey.500",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: drawerWidth,
        }}
      >
        <List>
          {[
            "Recipes",
            "Meal Plans",
            "Pantry",
            "Shopping List",
            "Favorites",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                aria-describedby={id}
                onClick={(e) => handleClick(e, text)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              {(openRecipes || openMealplans) && (
                <Popover
                  id={
                    openRecipes || openMealplans ? "simple-popover" : undefined
                  }
                  open={openRecipes || openMealplans}
                  anchorEl={anchor}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  {showRecipes && <Recipes setOpen={setOpenRecipes} />}
                  {showMealplans && <Mealplans setOpen={setOpenMealplans} />}
                </Popover>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <AddButton text="Add A Recipe" />
          <AddButton text="Add A Meal Plan" />
          <AddButton text="Add To Pantry" />
          <AddButton text="Add To Shopping List" />
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
