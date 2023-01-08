import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import {useNavigate} from "react-router-dom";
import {Cookies, getCookie} from "typescript-cookie";
import {useEffect, useState} from "react";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

function AppBarResponsive() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);

    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigate = useNavigate();
    const [path,setPath] = useState('/home');
    const [isAdmin,setIsAdmin] = useState('');
    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        let y = getCookie("isAdmin");
        if(setting === "Profile")
        {
            if(y === "true")
                navigate("/viewstations")
            else
                navigate('/myaccount')
        }
        else
        {
            Cookies.remove('id');
            Cookies.remove('isAdmin');
            navigate('/');
        }
    };
    useEffect(() => {
        let y = getCookie("isAdmin");
        if(y==="true")
            setPath('/addstation');
        else
            setPath('/home');
        setIsAdmin(y as string);
    },[isAdmin])

    return (
        <AppBar position="static" style={{backgroundColor: "#79d279"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ElectricalServicesOutlinedIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={path}
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Stations
                    </Typography>


                    <ElectricalServicesOutlinedIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Sations
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Account" src=""/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    {setting === 'Profile' && isAdmin === 'true' ?
                                    <Typography textAlign="center">Admin</Typography>
                                        :
                                        <Typography textAlign="center">{setting}</Typography>
                                    }
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppBarResponsive;
