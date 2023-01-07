import {getPlugs} from "./index";

export const getPlugsStation = (id:string) => {
    return getPlugs('/Plug/getAvailablePlugs', id);
}
