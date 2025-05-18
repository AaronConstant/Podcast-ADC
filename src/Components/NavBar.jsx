import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import  "../Styling/NavbarStyling.scss";
import { useTheme } from "@mui/material/styles";
import {StyledButton,StyledBox} from "../Styling/theme.jsx";
export default function NavBar() {
    const theme = useTheme();
  return (
    <AppBar position="static" className='nav_bar' color="secondary">
      <Toolbar>
        <Typography variant="h6">Chit Chat Logo</Typography>
        <Box className="nav_buttons_container">
        <Button className='nav_buttons' LinkComponent={Link} to='/home'>Home</Button>
        <Button className='nav_buttons' LinkComponent={Link} to='/about'>About Us</Button>
        <Button className='nav_buttons' LinkComponent={Link} to='/contact'>Contact</Button>
        <StyledBox className="sign_forms">
        <StyledButton LinkComponent={Link} to='/login'>Log In</StyledButton>
        <StyledButton LinkComponent={Link} to='/signup'>Sign Up</StyledButton>
        </StyledBox>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
