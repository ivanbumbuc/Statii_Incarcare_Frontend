import { Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { ApplicationState } from "../reducers/type";
import BasicMap from "./BasicMap";

function HomePage () {
    const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;
    console.log(userStates.user.id);
    const navigate = useNavigate();

    const [statiiList, setStatii] = useState([
        {
            id: null,
            name: "cv",
            km: 12,
            city:"Timisoara",
            address:"",
            latitude : 45.75554707085215,
            longitude : 21.22867584228516,
        },
    ]);

    const [center,setCenter] = useState({lat: 45.75554707085215,lng:21.22867584228516});

    useEffect(() => {
        getStatii("Timisoara").then((res) =>
        setStatii(res));
    }, []); /* <-- add this */
    
    useEffect(() => {
      const interval = setInterval(() => {
          getStatii("Timisoara").then((res) =>
          setStatii(res));
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
            <Box marginBottom={10}>
      <BasicMap statiiList={statiiList} hasPopup={true} center={center}/>
             </Box>
    </div>
    );
}
export default HomePage;