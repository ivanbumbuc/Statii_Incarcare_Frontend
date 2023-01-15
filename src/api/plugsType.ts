import {addPlugType, getPlugsType} from "./index";

export const getAllPlugsType = () => {
    return getPlugsType('/PlugType/getAllPlugsType')
}

export const addPlugTypeNew = (name:string, power:number) => {
    return addPlugType('/PlugType/addPlugType',name,power)
}
