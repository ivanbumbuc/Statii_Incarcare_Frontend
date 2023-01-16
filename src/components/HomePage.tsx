import {Box, Divider, InputBase} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { getStatiiMap } from "../api/statii";
import { ApplicationState } from "../reducers/type";
import AppBarResponsive from "./AppBarResponsive";
import BasicMap from "./BasicMap";
import ListofStatii from "./ListofStatii";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
function HomePage () {
    const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;

    const navigate = useNavigate();

    const [statiiList, setStatii] = useState([
    ]);

    const [center,setCenter] = useState({lat: 45.75554707085215,lng:21.22867584228516});
    const [city,setCity] = useState('');
    const handleCity = (event:any) => {
        setCity(event.target.value);
    }
    useEffect(() => {
        getStatiiMap(city).then((res) =>
        setStatii(res.data))
    .catch(err => {
console.log(err.message);
    });

    }, [city]); /* <-- add this */

    useEffect(() => {
      const interval = setInterval(() => {
          getStatiiMap(city).then((res) =>
          setStatii(res.data));
      }, 2000);
      return () => clearInterval(interval);
    }, [city]);

    React.useEffect(() => {
        let x = getCookie("id");
        if(x == undefined)
          navigate('/')
    },[userStates]);
    return(
        <div>
            <AppBarResponsive></AppBarResponsive>
            <Box marginTop={0.5}  >
      <BasicMap statiiList={statiiList} hasPopup={true} center={center}/>
             </Box>
            <Search style={{right:'0px',position:'absolute'}}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search city"
                    inputProps={{ 'aria-label': 'search' }}
                    value={city}
                    onChange={handleCity}
                />
            </Search>
             <ListofStatii statiiList={statiiList}></ListofStatii>
        </div>

    );
}
export default HomePage;
