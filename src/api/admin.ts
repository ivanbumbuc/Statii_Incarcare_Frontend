import {addPlugToStation, addStation} from "./index";

export const addStationAdmin= (name:string, city:string, address:string, coordx:number, coordy:number,idUser:string) => {
    return addStation('/Station/addStation',name,city,address,coordx,coordy,idUser);
}

export const addPlugStation = (stationId:string,plugType:string,power:number,price:number) => {
    return addPlugToStation('Plug/addPlug',stationId,plugType,power,price);
}
