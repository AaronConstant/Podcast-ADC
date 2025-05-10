import { createTheme } from "@mui/material";

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

export default theme;