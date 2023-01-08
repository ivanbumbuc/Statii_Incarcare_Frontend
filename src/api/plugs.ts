import {getEndHours, getPlugs, getStartHours} from "./index";

export const getPlugsStation = (id:string) => {
    return getPlugs('/Plug/getAvailablePlugs', id);
}

export const getStartingHours = (plugId: string) => {
    return getStartHours('/Booking/getAvailableStartingHours',plugId);
}

export const getEndingHours = (startHour:string, plugId: string) => {
    return getEndHours('/Booking/getAvailableEndingHours',startHour,plugId);
}
