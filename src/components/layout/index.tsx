import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

type Props = {
    children: JSX.Element,
};


const Layout = ({ children }: Props) => {
    return <>
        <AppBar position="absolute">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    AccuWeather
                </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={{
            display:'flex',
            height:'100vh',
            width:'100vw',
            alignItems:'center',
            justifyContent:'center'
        }}>
            {children}
        </Box>
    </>
}

export default Layout;