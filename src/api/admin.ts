import {
    addPlugAdmin,
    addPlugToStation,
    addStation,
    deleteStation,
    getAllStationsAdmin,
    getPlugsStationsAdmin
} from "./index";

export const addStationAdmin= (name:string, city:string, address:string, coordx:number, coordy:number,idUser:string) => {
    return addStation('/Station/addStation',name,city,address,coordx,coordy,idUser);
}

export const addPlugStation = (stationId:string,plugType:string,power:number,price:number) => {
    return addPlugToStation('Plug/addPlug',stationId,plugType,power,price);
}

export const getStationsAdmin = (id:string) => {
    return getAllStationsAdmin('Station/getAllStationsAdmin',id);
}

export const addPlugToStationAdmin = (idStation: string, idType: string, price: number) => {
    return addPlugAdmin('Plug/addPlugAdmin',idStation, idType, price);
}

export const getPlugsAdmin = (id:string) => {
    return getPlugsStationsAdmin('Plug/getStationPlugsAdmin',id);
}

export const deleteStationAdmin = (idStation: string) => {
    return deleteStation('Station/deleteStation',idStation);
}
