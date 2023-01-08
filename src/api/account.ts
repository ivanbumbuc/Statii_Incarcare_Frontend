import {deleteCar, editCar, getAccount, getAccountBooking, getAccountCars} from "./index";

export const getAccountUserInformation = (userId: string) => {
    return getAccount('/User/getUserProfile',userId);
}

export const getAccountBookingInformation = (userId: string) => {
    return getAccountBooking('/Booking/getBookings',userId);
}

export const getAccountCarsInformation = (userId: string) => {
    return getAccountCars('/Car/getCars',userId);
}

export const editAccountCarsInformation = (carId: string, name:string) => {
    return editCar('/Car/updateCars',carId,name);
}
export const deleteAccountCarsInformation = (carId: string) => {
    return deleteCar('/Car/deleteCar',carId);
}
