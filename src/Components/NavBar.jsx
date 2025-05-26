import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import "../Styling/NavbarStyling.scss";
import { StyledButton } from "../Styling/theme.jsx";
import CCPLogo from '../assets/RemovedCCPLogo.png';
import { useAuth } from "../contexts/AuthContext.jsx";
export default function NavBar() {
  const { isAuthenticated, logout} = useAuth()


  return (
    <AppBar position="static" className='nav_bar' color="secondary">
      <Toolbar>
        <Box component='img' src={CCPLogo} className="img_logo" />
        <Box className="nav_buttons_container">
          <Button className='nav_buttons' LinkComponent={Link} to='/'>Home</Button>
          <Button className='nav_buttons' LinkComponent={Link} to='/about'>About Us</Button>
          <Button className='nav_buttons' LinkComponent={Link} to='/contact'>Contact</Button>

          <Box className="sign_forms">
            {isAuthenticated ? (
              <StyledButton onClick={()=>{logout()}}>Log Out</StyledButton>
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
