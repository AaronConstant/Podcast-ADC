import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/NavbarStyling.scss";
import { useTheme } from "@mui/material/styles";
import { StyledButton } from "../Styling/theme.jsx";
import CCPLogo from '../assets/RemovedCCPLogo.png';

export default function NavBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="static" className='nav_bar' color="primary">
      <Toolbar>
        <Box component='img' src={CCPLogo} className="img_logo" />
        <Box className="nav_buttons_container">
          <Button className='nav_buttons' LinkComponent={Link} to='/'>Home</Button>
          <Button className='nav_buttons' LinkComponent={Link} to='/about'>About Us</Button>
          <Button className='nav_buttons' LinkComponent={Link} to='/contact'>Contact</Button>

          <Box className="sign_forms">
            {isAuthenticated ? (
              <StyledButton onClick={handleLogout}>Log Out</StyledButton>
            ) : (
              <>
                <StyledButton LinkComponent={Link} to='/login'>Log In</StyledButton>
                <StyledButton LinkComponent={Link} to='/signup'>Sign Up</StyledButton>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
