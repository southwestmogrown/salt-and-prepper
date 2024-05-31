import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddCircleOutlineOutlinedIcon  from '@mui/icons-material/AddCircleOutlineOutlined';
import { useMenuContext } from "../../context/MenuContext";
import { useState } from "react";
import Recipes from "../Recipes/Recipes";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddRecipeForm from "../AddRecipeForm";

const drawerWidth = 240;

function SideBar() {
  const [anchor, setAnchor] = useState(null)
  const { showRecipes, setShowRecipes } = useMenuContext()

  const handleClick = (e, text) => {
    switch (text) {
      case "Recipes": {
        setShowRecipes(true);
        break;
      }
      default:
        break;
    }
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setShowRecipes(false)
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },

        }}
      >
        <Box
          sx={{ 
            overflow: 'auto', 
            bgcolor: "grey.500",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: drawerWidth,
          }}
          >
          <List>
            {['Recipes', 'Meal Plans', 'Pantry', 'Shopping List', 'Favorites'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton aria-describedby={id} onClick={(e) => handleClick(e, text)}>
                  <ListItemIcon >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText  primary={text} />
                </ListItemButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchor}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  {showRecipes && <Recipes />}
                </Popover>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Add A Recipe', 'Add A Meal Plan', 'Add To Pantry', 'Add To Shopping List'].map((text) => (
              
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon >
                    <AddCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <OpenModalMenuItem itemText={text} modalComponent={<AddRecipeForm />} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

  )
}

export default SideBar
