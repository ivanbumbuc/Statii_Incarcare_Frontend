import { getAllStatiiMap } from ".";

export const getStatiiMap = (city:string) => {
    return getAllStatiiMap('/Station/getAvailable', city);
}