import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { getStatiiMap } from "../api/statii";
import { ApplicationState } from "../reducers/type";
import AppBarResponsive from "./AppBarResponsive";
import BasicMap from "./BasicMap";
import ListofStatii from "./ListofStatii";

function HomePage () {
    const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;
    
    const navigate = useNavigate();

    const [statiiList, setStatii] = useState([
        {
            id: null,
            name: "cv",
            city: "Timisoara",
            address: "",
            prize: "1:dc, 2:pt, 5:ac",
            latitude: 45.75554707085215,
            longitude: 21.22867584228516,
        }
    ]);

    const [center,setCenter] = useState({lat: 45.75554707085215,lng:21.22867584228516});

    useEffect(() => {

        getStatiiMap("Timisoara").then((res) =>
        setStatii(res.data))
    .catch(err => {
console.log(err.message);
    });

    }, []); /* <-- add this */
    
    useEffect(() => {
      const interval = setInterval(() => {
          getStatiiMap("Timisoara").then((res) =>
          setStatii(res.data));
      }, 5000);
      return () => clearInterval(interval);
    }, []);

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
             <ListofStatii statiiList={statiiList}></ListofStatii>
        </div>
        
    );
}
export default HomePage;