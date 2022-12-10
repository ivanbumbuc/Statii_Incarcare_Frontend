import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7121",
    timeout: 0,
});

export const logInCall = async (url: string,email:string,password:string) => {
    return await axiosInstance.post(url,{email:email,password:password});
};