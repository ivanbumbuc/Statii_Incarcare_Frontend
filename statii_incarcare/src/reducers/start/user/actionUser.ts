import * as actionTypes from "./actionTypes";
import {Dispatch} from "react";


export const setUser = (user: IUser) =>{
    return (dispatch: Dispatch<ActionTypeUser>) =>{
        dispatch(
            {
                type: actionTypes.ADD_USER,
                data: user
            }
        )
    }
}