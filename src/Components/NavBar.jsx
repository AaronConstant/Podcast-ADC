import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import  "../Styling/NavbarStyling.scss";
import { useTheme } from "@mui/material/styles";
import {StyledButton,} from "../Styling/theme.jsx";
export default function NavBar() {
    const theme = useTheme();
  return (
    <AppBar position="static" className='nav_bar' color="secondary">
      <Toolbar>
        <Typography variant="h6">My App</Typography>
        <Box className="nav_buttons_container">
        <StyledButton className='nav_buttons' LinkComponent={Link} to='/home'>Home</StyledButton>
        <StyledButton className='nav_buttons' LinkComponent={Link} to='/about'>About Us</StyledButton>
        <StyledButton className='nav_buttons' LinkComponent={Link} to='/contact'>Contact</StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
