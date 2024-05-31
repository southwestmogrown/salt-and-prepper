import { Box, AppBar, Toolbar, Container, Button } from "@mui/material"
import { Image } from "mui-image"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";


function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(thunkLogout());
    navigate('/')
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="static"
      >
        <Toolbar
          sx={{
            bgcolor: 'grey.800',
            boxShadow: 4
          }}
        >
          <Container sx={{ display: "flex", justifyContent: "center", padding: "10px"}} >
            <NavLink to="/home">
              <Image
                alt="salt-and-prepper-logo"
                src="../../s&p_logo.png"
                height="100px"
              />
            </NavLink>
          </Container>
          <Container sx={{ display: "flex", justifyContent: "center", padding: "10px"}}>
            <Button 
              onClick={onLogout}
              variant="contained"
              sx={{
                bgcolor: 'grey.900'
              }}
            >Log Out</Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default Navigation;
