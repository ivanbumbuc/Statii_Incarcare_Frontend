import { getAllStatiiMap } from ".";

export const getStatiiMap = (city:string) => {
    return getAllStatiiMap('/Statii/getAvailable',city);
}