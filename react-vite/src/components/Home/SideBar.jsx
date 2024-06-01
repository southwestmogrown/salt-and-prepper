import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useMenuContext } from "../../context/MenuContext";
import { useState } from "react";
import Recipes from "../Recipes/Recipes";

import AddButton from "./AddButton";

const drawerWidth = 240;

function SideBar() {
  const [anchor, setAnchor] = useState(null)
  const [open, setOpen] = useState(null)
  const { showRecipes, setShowRecipes } = useMenuContext()

  const handleClick = (e, text) => {
    setOpen(true)
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
    setShowRecipes(false);
    setOpen(null)
    setAnchor(null);
  };

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
                {open && 
                  <Popover
                    
                    id={open ? 'simple-popover' : undefined}
                    open={open}
                    anchorEl={anchor}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    {showRecipes && <Recipes setOpen={setOpen} />}
                  </Popover>
                
                }
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <AddButton text="Add A Recipe"/>
            <AddButton text="Add A Meal Plan" />
            <AddButton text="Add To Pantry" />
            <AddButton text="Add To Shopping List" />
          </List>
        </Box>
      </Drawer>

  )
}

export default SideBar
