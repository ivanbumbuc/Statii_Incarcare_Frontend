import * as actionTypes from "./actionTypes";
import {Dispatch} from "react";


export const setStatie = (statie: IStatie) =>{
    return (dispatch: Dispatch<ActionTypeStatie>) =>{
        dispatch(
            {
                type: actionTypes.ADD_STATIE,
                data: statie
            }
        )
    }
}
