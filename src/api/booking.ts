import {addBooking } from "./index";

export const addBookingPlug = (userId:string,plugId:string,startinHour:string,endingHour:string) => {
    return addBooking('/Booking/addBooking',userId,plugId,startinHour,endingHour);
}
