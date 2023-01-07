import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7121",
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
