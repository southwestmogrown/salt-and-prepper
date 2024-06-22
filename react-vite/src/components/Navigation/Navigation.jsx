import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Typography,
} from "@mui/material";

import { Image } from "mui-image";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkAuthenticate, thunkLogout } from "../../redux/session";
import SideBar from "../Home/SideBar";
import { useEffect } from "react";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  const recipes = useSelector((state) => state.recipes);
  const recipe_count = Object.values(recipes).length;

  useEffect(() => {
    dispatch(thunkAuthenticate());
  }, [dispatch]);

  const onLogout = async () => {
    await dispatch(thunkLogout());
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            bgcolor: "grey.800",
            boxShadow: 1,
          }}
        >
          <Container
            sx={{ display: "flex", justifyContent: "center", padding: "10px" }}
          >
            <NavLink to="/home">
              <Image
                alt="salt-and-prepper-logo"
                src="../../s&p_logo.png"
                height="100px"
              />
            </NavLink>
          </Container>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography variant="h4">
              Greetings, {sessionUser?.username}
            </Typography>
            <Typography variant="h6">
              You have {recipe_count} recipe{recipe_count === 1 ? "" : "s"}{" "}
              saved.
            </Typography>
          </Container>
          <Container
            sx={{ display: "flex", justifyContent: "center", padding: "10px" }}
          >
            <Button
              onClick={onLogout}
              variant="contained"
              sx={{
                bgcolor: "grey.900",
              }}
            >
              Log Out
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <SideBar />
      <Outlet />
    </Box>
  );
}

export default Navigation;
