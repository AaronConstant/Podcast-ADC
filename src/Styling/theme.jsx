import { createTheme, Box,Button,Typography, Container, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(62, 211, 222)', 
        },
        secondary: {
            main: 'rgb(32, 61, 160)', 
        },
        error: {
            main: 'rgb(210, 62, 51)',
        },
        warning: {
            main: 'rgb(195, 106, 22)', 
        },
        info: {
            main: 'rgb(101, 138, 219)', 
        },
        success: {
            main: 'rgb(21, 156, 21)', 
        },
    },
});

 const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    
}));
 const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    fontSize: '1.8rem',
    fontWeight: 'bold',
}));
 const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
}));
 const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(3)
    
}));
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(3)    
}));

export { StyledBox,theme,StyledButton, StyledTypography, StyledContainer, StyledPaper};

