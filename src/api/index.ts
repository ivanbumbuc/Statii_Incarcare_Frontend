import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5091",
    timeout: 0,
});


export const logInCall = async (url: string,email:string,password:string) => {
    return await axiosInstance.post(url,{email:email,password:password});
};

export const getAllStatiiMap = async (url: string,city:string) => {
    return await axiosInstance.get(url,{params: {city:city}});
}

export const getPlugs = async (url: string, id: string) => {
    return await axiosInstance.get(url, {params: {id: id}});
}

export const getStartHours = async (url: string, plugId: string) => {
    return await axiosInstance.get(url, {params: {plugId: plugId}});
}

export const getEndHours = async (url: string,startHour: string, plugId: string) => {
    return await axiosInstance.get(url, {params: {startingHour:startHour, plugId: plugId}});
}

export const addBooking = async (url: string, userId:string,plugId:string,startinHour:string,endingHour:string) => {
    return await axiosInstance.post(url,{userId:userId, plugId:plugId, startingHour:startinHour, endingHour:endingHour});
};

export const getAccount = async (url: string, userId: string) => {
    return await axiosInstance.get(url, {params: {userId: userId}});
}
export const getAccountBooking = async (url: string, userId: string) => {
    return await axiosInstance.get(url, {params: {userId: userId}});
}

export const getAccountCars = async (url: string, userId: string) => {
    return await axiosInstance.get(url, {params: {userId: userId}});
}

export const editCar = async (url: string, carId:string, car_plate:string) => {
    return await axiosInstance.put(url,{carId:carId, car_plate:car_plate});
}

export const deleteCar = async (url: string, carId:string) => {
    return await axiosInstance.delete(url,{params:{carId:carId}});
}

export const addStation = async (url: string, name:string, city:string, address:string, coordx:number, coordy:number,idUser:string) => {
    return await axiosInstance.post(url,{name:name, city:city, address:address, coordX:coordx, coordY:coordy, idUser:idUser});
};

export const addPlugToStation = async (url: string,stationId:string, plugType:string,power:number,price:number) => {
    return await axiosInstance.post(url,{stationId:stationId,plugType:plugType, power:power, price:price});
};

export const getPlugsType = async (url: string) => {
    return await axiosInstance.get(url);
}

export const addPlugType = async (url: string,name:string, power:number) => {
    return await axiosInstance.post(url,{name:name, power:power});
};

export const getAllStationsAdmin = async (url: string,id: string) => {
    return await axiosInstance.get(url,{params: {id:id}});
}

export const addPlugAdmin = async (url: string, idStation:string, idType:string, price: number) => {
    return await axiosInstance.post(url,{idStation: idStation, idType: idType, price: price});
};

export const getPlugsStationsAdmin = async (url: string, id: string) => {
    return await axiosInstance.get(url, {params: {id: id}});
}

export const deleteStation = async (url: string, stationId:string) => {
    return await axiosInstance.delete(url,{params:{id:stationId}});
}
