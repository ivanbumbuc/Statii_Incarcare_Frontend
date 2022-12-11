import osm from "../api/osm-provider"
import L from "leaflet";
import StatieIcon from "../assets/StatieIcon.png";
import user from "../assets/user.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

function distance(lat1:any,
    lat2:any, lon1:any, lon2:any)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
return(c * r).toFixed(2);
}

function BasicMap() {

    const [userlatitude, setUserlatitude] = useState(0.2222222)
    const [userlongitude, setUserLongitude] = useState(0.2222222)
    navigator.geolocation.getCurrentPosition((pos)=>{setUserlatitude(pos.coords.latitude);setUserLongitude(pos.coords.longitude)})
   
    const ZOOM_LEVEL = 13;
    const markerIcon = new L.Icon(
        {
            iconUrl: StatieIcon,
            iconSize: [60, 60],
        }
    )
    const userIcon = new L.Icon(
        {
            iconUrl: user,
            iconSize: [40, 40],
        }
    )

    return(
        <div></div>
    //     <MapContainer center={center} zoom={ZOOM_LEVEL}>
    //     <TileLayer
    //         url={osm.maptiler.url}
    //         attribution={osm.maptiler.attribution}
    //     />
    //  <div>{statiiList?.map((sc)=>{
    //         return( 
    //         <Marker position={{lat: sc===undefined ? 0 : sc.latitude ,lng: sc===undefined? 0 : sc.longitude}} icon={markerIcon} key={Math.random()}>
    //             {hasPopup ? 
    //             <Popup>
    //                 <b>Statie: </b> {sc?.name}<br/>
                    
    //                 <b>{distance(userlatitude,sc.latitude,userlongitude,sc.longitude) } KM away</b>
    //             </Popup> : null}
    //         </Marker>)
    //     })
    //     }
    //     </div>
    //     <Marker position={{lat:userlatitude, lng : userlongitude}}icon={userIcon}></Marker>
        

    // </MapContainer>
    );

}
export default BasicMap;